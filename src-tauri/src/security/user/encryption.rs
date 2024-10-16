use base64::{engine::general_purpose::STANDARD, Engine};
use ring::rand::SecureRandom;
use ring::{aead, rand};
use std::error::Error;

const KEY_LEN: usize = 32; // 256 bits
const NONCE_LEN: usize = 12; // 96 bits

pub fn encrypt(data: &str, key: &[u8]) -> Result<String, Box<dyn Error>> {
    if key.len() != KEY_LEN {
        return Err("Invalid key length".into());
    }

    let rng: rand::SystemRandom = rand::SystemRandom::new();
    let mut nonce: [u8; 12] = [0u8; NONCE_LEN];

    // Manually map Unspecified into a Box<dyn Error>
    rng.fill(&mut nonce)
        .map_err(|_| "Failed to generate nonce")?;

    let key: aead::UnboundKey =
        aead::UnboundKey::new(&aead::AES_256_GCM, key).map_err(|_| "Failed to create key")?;
    let cipher: aead::LessSafeKey = aead::LessSafeKey::new(key);
    let mut in_out: Vec<u8> = data.as_bytes().to_vec();

    let _tag: aead::Tag = cipher
        .seal_in_place_separate_tag(
            aead::Nonce::assume_unique_for_key(nonce),
            aead::Aad::empty(),
            &mut in_out,
        )
        .map_err(|_| "Encryption failed")?;

    // Encode nonce and encrypted data to base64
    let nonce_encoded: String = STANDARD.encode(&nonce);
    let encrypted_data_encoded = STANDARD.encode(&in_out);

    Ok(format!("{}:{}", nonce_encoded, encrypted_data_encoded))
}

pub fn decrypt(encrypted_data: &str, key: &[u8]) -> Result<String, Box<dyn Error>> {
    if key.len() != KEY_LEN {
        return Err("Invalid key length".into());
    }

    let parts: Vec<&str> = encrypted_data.split(':').collect();
    if parts.len() != 2 {
        return Err("Invalid encrypted data format".into());
    }

    let nonce: Vec<u8> = STANDARD
        .decode(parts[0])
        .map_err(|_| "Invalid base64 for nonce")?;
    if nonce.len() != NONCE_LEN {
        return Err("Invalid nonce length".into());
    }

    let mut encrypted_data: Vec<u8> = STANDARD
        .decode(parts[1])
        .map_err(|_| "Invalid base64 for encrypted data")?;

    let key: aead::UnboundKey =
        aead::UnboundKey::new(&aead::AES_256_GCM, key).map_err(|_| "Failed to create key")?;
    let cipher: aead::LessSafeKey = aead::LessSafeKey::new(key);

    // Convert nonce to [u8; 12] array for use with `assume_unique_for_key`
    let mut nonce_array: [u8; 12] = [0u8; NONCE_LEN];
    nonce_array.copy_from_slice(&nonce);

    let decrypted_data: &mut [u8] = cipher
        .open_in_place(
            aead::Nonce::assume_unique_for_key(nonce_array),
            aead::Aad::empty(),
            &mut encrypted_data,
        )
        .map_err(|_| "Decryption failed")?;

    Ok(String::from_utf8(decrypted_data.to_vec())?)
}
