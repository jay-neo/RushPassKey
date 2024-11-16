use chrono::Local;

use crate::{
    app::cache::ACCOUNTS,
    db::{accounts::utils::save_accounts_to_file, config::DB_DATE_FORMAT},
    types::{AccountCache, AccountClient, CopyPasswordResult},
};

pub fn update_account_for_copy_password(id: &String) -> Option<CopyPasswordResult> {
    let mut accounts_cache: std::sync::RwLockWriteGuard<'_, Option<Vec<AccountCache>>> =
        match ACCOUNTS.write() {
            Ok(guard) => guard,
            Err(_) => return None,
        };

    // Check if the accounts cache is present
    let accounts: &mut Vec<AccountCache> = match &mut *accounts_cache {
        Some(accounts) => accounts,
        None => return None, // Return None if there are no accounts
    };

    let mut left: usize = 0;
    let mut right: usize = accounts.len();

    while left < right {
        let mid: usize = left + (right - left) / 2;
        let mid_id: &String = &accounts[mid].id;

        if mid_id == id {
            accounts[mid].last_used = Local::now().format(DB_DATE_FORMAT).to_string();
            match save_accounts_to_file(accounts) {
                Some(()) => {
                    return Some(CopyPasswordResult {
                        password: accounts[mid].password.clone(),
                        last_used: accounts[mid].last_used.clone(),
                    });
                }
                None => {
                    println!("Failed to save account: {:?}", accounts[mid]);
                    return None;
                }
            }
        } else if mid_id < id {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    println!("Account not found!");
    None
}

pub fn update_account_for_regenerate_password(
    id: &String,
    password: String,
) -> Option<AccountClient> {
    let mut accounts_cache: std::sync::RwLockWriteGuard<'_, Option<Vec<AccountCache>>> =
        match ACCOUNTS.write() {
            Ok(guard) => guard,
            Err(_) => return None,
        };

    let accounts: &mut Vec<AccountCache> = match &mut *accounts_cache {
        Some(accounts) => accounts,
        None => return None,
    };

    let mut left: usize = 0;
    let mut right: usize = accounts.len();

    while left < right {
        let mid: usize = left + (right - left) / 2;
        let mid_id: &String = &accounts[mid].id;

        if mid_id == id {
            accounts[mid].password = password;
            accounts[mid].last_updated = Local::now().format(DB_DATE_FORMAT).to_string();
            match save_accounts_to_file(accounts) {
                Some(()) => {
                    return Some(AccountClient {
                        id: accounts[mid].id.clone(),
                        account_name: accounts[mid].account_name.clone(),
                        website_url: accounts[mid].website_url.clone(),
                        email: accounts[mid].email.clone(),
                        username: accounts[mid].username.clone(),
                        phone: accounts[mid].phone.clone(),
                        last_updated: accounts[mid].last_updated.clone(),
                        last_used: accounts[mid].last_used.clone(),
                    })
                }
                None => return None,
            };
        } else if mid_id < id {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    None
}
