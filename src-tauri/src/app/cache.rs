use once_cell::sync::Lazy;
use std::sync::{Mutex, RwLock};

use crate::{db::account::get_accounts, types::AccountClient};

pub static GLOBAL_MESSAGE: Lazy<Mutex<String>> =
    Lazy::new(|| Mutex::new(String::from("Hello, World!")));

pub static CURRENT_USER_PASSWORD: Lazy<Mutex<String>> =
    Lazy::new(|| Mutex::new(String::from("&GLOBAL_USER_PASSWORD")));

pub static ACCOUNTS: Lazy<RwLock<Option<Vec<AccountClient>>>> = Lazy::new(|| RwLock::new(None));

////////////////////////////////////////////////////////////////////////////////////////

pub fn initialize_cache() -> Result<(), String> {
    let user_password: std::sync::MutexGuard<'_, String> = CURRENT_USER_PASSWORD.lock().unwrap();
    let accounts: Vec<AccountClient> = get_accounts(&user_password);

    let mut cache: std::sync::RwLockWriteGuard<'_, Option<Vec<AccountClient>>> =
        ACCOUNTS.write().unwrap();
    *cache = Some(accounts);
    Ok(())
}
