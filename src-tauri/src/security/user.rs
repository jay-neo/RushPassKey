use crate::utils::identifier;
use aes_gcm::aead::generic_array::GenericArray;
use aes_gcm::{aead::Aead, aead::KeyInit, Aes256Gcm, Nonce}; // AES-GCM with 256-bit key
use hex::{decode, encode};
use rand::Rng;
use sha2::{Digest, Sha256};
use std::error::Error;

fn derive_key(password: &str, identifier: &String) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(password);
    hasher.update(identifier);
    let result = hasher.finalize();
    let mut key: [u8; 32] = [0u8; 32];
    key.copy_from_slice(&result[..32]);
    key
}

pub fn config(password: &str) -> Result<String, Box<dyn Error>> {
    let current_identifier: String = identifier::get_machine_identifier();
    let key: [u8; 32] = derive_key(password, &current_identifier);

    // Generate random nonce (12 bytes)
    let mut iv: [u8; 12] = [0u8; 12];
    rand::thread_rng().fill(&mut iv);

    // Create AES-256-GCM cipher instance
    let cipher = Aes256Gcm::new(GenericArray::from_slice(&key));

    // Encrypt the identifier (in this case, machine ID)
    let nonce = Nonce::from_slice(&iv); // 96-bits; unique per message
    let ciphertext = cipher
        .encrypt(nonce, current_identifier.as_bytes())
        .map_err(|e| format!("Encryption failed: {:?}", e))?;

    // Combine IV and ciphertext and encode as hex
    let mut encrypted_data: Vec<u8> = Vec::new();
    encrypted_data.extend_from_slice(&iv); // Prepend nonce (IV)
    encrypted_data.extend_from_slice(&ciphertext);

    Ok(encode(encrypted_data))
}

pub fn verify(password: &str, encrypted_hex: &str) -> Result<String, Box<dyn Error>> {
    let encrypted_data: Vec<u8> = decode(encrypted_hex)?;

    // Extract IV and ciphertext
    let (iv, ciphertext) = encrypted_data.split_at(12);

    let current_identifier: String = identifier::get_machine_identifier();
    let key: [u8; 32] = derive_key(password, &current_identifier);

    // Create AES-256-GCM cipher instance
    let cipher = Aes256Gcm::new(GenericArray::from_slice(&key));
    let nonce = Nonce::from_slice(iv); // 96-bits; nonce extracted from the encrypted data

    // Decrypt ciphertext
    let decrypted_data = cipher
        .decrypt(nonce, ciphertext)
        .map_err(|e| format!("Decryption failed: {:?}", e))?;

    // Convert decrypted data to string
    let decrypted_identifier: String = String::from_utf8(decrypted_data)?;

    // Compare decrypted identifier with current machine identifier
    if decrypted_identifier == current_identifier {
        Ok(decrypted_identifier) // Return the identifier if it matches
    } else {
        Err("Decryption failed: identifier does not match".into())
    }
}
