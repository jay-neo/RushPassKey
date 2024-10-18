use aes_gcm::aead::{Aead, KeyInit}; // Import the KeyInit trait to use `new_from_slice`
use aes_gcm::{Aes256Gcm, Nonce}; // Import AES-GCM encryption and decryption
use base64::{engine::general_purpose, Engine as _}; // For base64 encoding/decoding
use rand::Rng; // For generating random salt and nonce
use ring::pbkdf2;
use std::num::NonZeroU32;

const SALT_SIZE: usize = 16;
const NONCE_SIZE: usize = 12; // AES-GCM uses 96-bit (12 bytes) nonces
const PBKDF2_ITERATIONS: u32 = 100_000;
const KEY_SIZE: usize = 32; // For AES-256-GCM (32 bytes = 256 bits)

// Helper function to derive a key from password and salt using `ring::pbkdf2`
fn derive_key(password: &str, salt: &[u8]) -> [u8; KEY_SIZE] {
    let mut key = [0u8; KEY_SIZE];

    let iterations = NonZeroU32::new(PBKDF2_ITERATIONS).unwrap();

    // Use PBKDF2 from the `ring` crate to derive a key
    pbkdf2::derive(
        pbkdf2::PBKDF2_HMAC_SHA256, // HMAC-SHA256 as the hashing algorithm
        iterations,
        salt,
        password.as_bytes(),
        &mut key,
    );

    key
}

pub fn encrypt_account(plaintext: &str, password: &str) -> String {
    // Generate a random salt and nonce
    let salt: [u8; SALT_SIZE] = rand::thread_rng().gen();
    let nonce: [u8; NONCE_SIZE] = rand::thread_rng().gen();

    // Derive the key from the password and salt
    let key = derive_key(password, &salt);

    // Create an AES-GCM instance
    let cipher = Aes256Gcm::new_from_slice(&key).expect("key length should be valid"); // Use the key directly
    let nonce = Nonce::from_slice(&nonce); // 96-bit nonce (12 bytes)

    // Encrypt the plaintext
    let ciphertext = cipher
        .encrypt(nonce, plaintext.as_bytes())
        .expect("encryption failure!");

    // Combine salt + nonce + ciphertext for output
    let mut result = Vec::new();
    result.extend_from_slice(&salt);
    result.extend_from_slice(&nonce);
    result.extend_from_slice(&ciphertext);

    // Return as base64 encoded string
    general_purpose::STANDARD.encode(&result) // Updated to use Engine::encode
}


pub fn decrypt_account(ciphertext_b64: &str, password: &str) -> Option<String> {
    // Decode the base64 input
    let decoded = general_purpose::STANDARD.decode(ciphertext_b64).ok()?; // Updated to use Engine::decode

    // Extract the salt, nonce, and ciphertext
    if decoded.len() < SALT_SIZE + NONCE_SIZE {
        return None;
    }

    let salt = &decoded[..SALT_SIZE];
    let nonce = &decoded[SALT_SIZE..SALT_SIZE + NONCE_SIZE];
    let ciphertext = &decoded[SALT_SIZE + NONCE_SIZE..];

    // Derive the key from the password and salt
    let key = derive_key(password, salt);

    // Create an AES-GCM instance
    let cipher = Aes256Gcm::new_from_slice(&key).expect("key length should be valid");
    let nonce = Nonce::from_slice(nonce); // 96-bit nonce

    // Decrypt the ciphertext
    let plaintext = cipher.decrypt(nonce, ciphertext).ok()?;

    // Convert the plaintext to a string
    String::from_utf8(plaintext).ok()
}

