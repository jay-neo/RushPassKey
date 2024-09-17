use base64::{engine::general_purpose::STANDARD, Engine};
use openssl::pkcs5::pbkdf2_hmac;
use openssl::sha::Sha256;
use openssl::symm::{Cipher, Crypter, Mode};
use rand::{rngs::OsRng, RngCore};
use std::error::Error;

// Generate a random salt
pub fn generate_salt() -> Vec<u8> {
    let mut salt = vec![0u8; 16];
    OsRng.fill_bytes(&mut salt);
    salt
}

// Derive a key from a password and salt using PBKDF2
fn derive_key(
    password: &Lazy<Mutex<String>>,
    salt: &[u8],
) -> Result<[u8; 32], Box<dyn std::error::Error>> {
    let mut key = [0u8; 32]; // AES-256 needs a 32-byte key

    // Use OpenSSL's pbkdf2_hmac function with the appropriate MessageDigest
    pbkdf2_hmac(
        password.lock().unwrap().as_bytes(),
        salt,
        100_000,
        MessageDigest::sha256(), // Use OpenSSL's MessageDigest
        &mut key,
    )?;

    Ok(key)
}

// Encrypt data using AES-256-CBC
pub fn encrypt(
    data: &str,
    password: &once_cell::sync::Lazy<std::sync::Mutex<std::string::String>>,
) -> Result<String, Box<dyn Error>> {
    let salt = generate_salt(); // Random salt
    let key = derive_key(password, &salt)?; // Derive encryption key

    // Generate a random IV (initialization vector)
    let mut iv = vec![0u8; 16];
    OsRng.fill_bytes(&mut iv);

    // Initialize AES-256-CBC encryption
    let cipher = Cipher::aes_256_cbc();
    let mut crypter = Crypter::new(cipher, Mode::Encrypt, &key, Some(&iv))?;
    crypter.pad(true);

    // Prepare the buffer for encryption
    let mut ciphertext = vec![0u8; data.len() + cipher.block_size()];
    let mut count = crypter.update(data.as_bytes(), &mut ciphertext)?;
    count += crypter.finalize(&mut ciphertext[count..])?;
    ciphertext.truncate(count);

    // Encode salt, IV, and encrypted data to base64
    let salt_encoded = STANDARD.encode(&salt);
    let iv_encoded = STANDARD.encode(&iv);
    let encrypted_data_encoded = STANDARD.encode(&ciphertext);

    Ok(format!(
        "{}:{}:{}",
        salt_encoded, iv_encoded, encrypted_data_encoded
    ))
}

// Decrypt data using AES-256-CBC
pub fn decrypt(
    encrypted_data: &str,
    password: &once_cell::sync::Lazy<std::sync::Mutex<std::string::String>>,
) -> Result<String, Box<dyn Error>> {
    let parts: Vec<&str> = encrypted_data.split(':').collect();
    if parts.len() != 3 {
        return Err("Invalid encrypted data format".into());
    }

    let salt = STANDARD.decode(parts[0])?;
    let iv = STANDARD.decode(parts[1])?;
    let encrypted_data = STANDARD.decode(parts[2])?;

    let key = derive_key(password, &salt)?; // Derive decryption key

    // Initialize AES-256-CBC decryption
    let cipher = Cipher::aes_256_cbc();
    let mut crypter = Crypter::new(cipher, Mode::Decrypt, &key, Some(&iv))?;
    crypter.pad(true);

    // Prepare the buffer for decryption
    let mut decrypted_data = vec![0u8; encrypted_data.len() + cipher.block_size()];
    let mut count = crypter.update(&encrypted_data, &mut decrypted_data)?;
    count += crypter.finalize(&mut decrypted_data[count..])?;
    decrypted_data.truncate(count);

    Ok(String::from_utf8(decrypted_data)?)
}
