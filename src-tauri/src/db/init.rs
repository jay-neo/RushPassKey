use std::fs::{self, OpenOptions};
use std::path::PathBuf;

use crate::{app::cache::ACCOUNTS, types::AccountCache};

use super::{
    accounts::read::get_accounts,
    config::{ACCOUNTS_FILENAME, ACCOUNTS_FILEPATH},
};

pub fn init_db(password: &str) -> bool {
    init_files();
    init_accounts(&password)
}

pub fn init_files() -> Option<()> {
    let home_dir: PathBuf = dirs::home_dir().expect("Cannot find home directory");
    let file_dir: PathBuf = home_dir.join(ACCOUNTS_FILEPATH);

    if fs::create_dir_all(&file_dir).is_err() {
        println!("Failed to create main directory: {:?}", file_dir);
        return None;
    }

    let account_file_path: PathBuf = file_dir.join(ACCOUNTS_FILENAME);
    let _file = match OpenOptions::new()
        .create(true)
        .write(true)
        .read(true)
        .open(&account_file_path)
    {
        Ok(f) => f,
        Err(_) => {
            println!(
                "Failed to create or open account file: {:?}",
                account_file_path
            );
            return None;
        }
    };

    Some(())
}

fn init_accounts(password: &str) -> bool {
    let accounts: Vec<AccountCache> = get_accounts(&password);

    let mut accounts_cache: std::sync::RwLockWriteGuard<'_, Option<Vec<AccountCache>>> =
        ACCOUNTS.write().unwrap();
    *accounts_cache = Some(accounts);
    true
}
