use std::fs::{create_dir_all, File, OpenOptions};
use std::io::{self, BufRead, Write};
use std::path::PathBuf;

use crate::app::cache::CURRENT_USER_PASSWORD;
use crate::security::account::{decrypt_acount, encrypt_account};
use crate::types::AccountClient;

use super::config::{ACCOUNTS_FILENAME, ACCOUNTS_FILEPATH};

pub fn create_account(data: &str) -> bool {
    let user_password: std::sync::MutexGuard<'_, String> = CURRENT_USER_PASSWORD.lock().unwrap();
    let encrypted_data: String = encrypt_account(&data, &user_password);

    let home_dir: PathBuf = dirs::home_dir().expect("Cannot find home directory");
    let path: PathBuf = home_dir.join(ACCOUNTS_FILEPATH);

    if create_dir_all(&path).is_err() {
        return false;
    }

    let file_path: PathBuf = path.join(ACCOUNTS_FILENAME);
    let mut file: File = match OpenOptions::new()
        .create(true)
        .append(true)
        .open(&file_path)
    {
        Ok(f) => f,
        Err(_) => return false,
    };

    if file
        .write_all(format!("{}\n", encrypted_data).as_bytes())
        .is_err()
    {
        return false;
    }

    true
}

pub fn get_accounts(password: &str) -> Vec<AccountClient> {
    let mut accounts: Vec<AccountClient> = Vec::new();

    let home_dir: PathBuf = dirs::home_dir().expect("Cannot find home directory");
    let file_path: PathBuf = home_dir.join(ACCOUNTS_FILEPATH).join(ACCOUNTS_FILENAME);

    let file: File = match File::open(&file_path) {
        Ok(f) => f,
        Err(_) => return accounts, // Return an empty vector if file can't be opened
    };

    let reader: io::BufReader<File> = io::BufReader::new(file);

    for line in reader.lines() {
        if let Ok(encrypted_data) = line {
            // Attempt to decrypt the line
            if let Some(decrypted_account) = decrypt_acount(&encrypted_data, password) {
                // Parse the decrypted string back into an Account struct
                if let Some(account) = parse_account(&decrypted_account) {
                    accounts.push(account);
                }
            }
        }
    }

    accounts
}

fn parse_account(decrypted_data: &str) -> Option<AccountClient> {
    let lines: Vec<&str> = decrypted_data.split('\n').collect();

    if lines.len() < 6 {
        return None;
    }

    // Extract each field based on the format in the `new_account` function
    let account_name: String = lines.get(0)?.replace("Account: ", "");
    let website_url: String = lines.get(1)?.replace("Website: ", "");
    let email: String = lines.get(2)?.replace("Email: ", "");
    let username: String = lines.get(3)?.replace("Username: ", "");
    let phone: String = lines.get(4)?.replace("Phone: ", "");
    let password: String = lines.get(5)?.replace("Password: ", "");

    Some(AccountClient {
        account_name,
        website_url,
        email,
        username,
        phone,
        password,
    })
}
