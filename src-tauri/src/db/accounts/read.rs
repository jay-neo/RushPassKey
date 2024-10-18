use std::{
    fs::{File, OpenOptions},
    io::{BufRead, BufReader},
    path::PathBuf,
};

use crate::{
    db::config::{ACCOUNTS_FILENAME, ACCOUNTS_FILEPATH},
    security::accounts::{encryption::decrypt_account, parser::parse_account_for_decryption},
    types::AccountCache,
};

pub fn get_accounts(password: &str) -> Vec<AccountCache> {
    let mut accounts: Vec<AccountCache> = Vec::new();

    let home_dir: PathBuf = dirs::home_dir().expect("Cannot find home directory");
    let file_path: PathBuf = home_dir.join(ACCOUNTS_FILEPATH).join(ACCOUNTS_FILENAME);
    let accounts_file = match OpenOptions::new().read(true).open(&file_path) {
        Ok(f) => f,
        Err(e) => {
            println!("Failed to open file: {}", e);
            return accounts;
        }
    };

    let reader: BufReader<File> = BufReader::new(accounts_file);

    for line in reader.lines() {
        match line {
            Ok(encrypted_data) => {
                if let Some(decrypted_account) = decrypt_account(&encrypted_data, password) {
                    if let Some(account) = parse_account_for_decryption(&decrypted_account) {
                        accounts.push(account);
                    }
                }
            }
            Err(e) => {
                println!("Failed to read line: {}", e);
            }
        }
    }

    accounts
}
