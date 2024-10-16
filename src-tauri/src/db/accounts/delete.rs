use crate::{app::cache::ACCOUNTS, types::AccountCache};

use super::utils::save_accounts_to_file;

pub fn delete_account_by_id(id: &String) -> bool {
    let mut accounts_cache: std::sync::RwLockWriteGuard<'_, Option<Vec<AccountCache>>> =
        match ACCOUNTS.write() {
            Ok(guard) => guard,
            Err(_) => return false,
        };

    // Check if the accounts cache is present
    let accounts: &mut Vec<AccountCache> = match &mut *accounts_cache {
        Some(accounts) => accounts,
        None => return false, // Return None if there are no accounts
    };

    let mut left: usize = 0;
    let mut right: usize = accounts.len();

    while left < right {
        let mid: usize = left + (right - left) / 2;
        let mid_id: &String = &accounts[mid].id;

        if mid_id == id {
            accounts.remove(mid);
            match save_accounts_to_file(accounts) {
                Some(()) => {
                    return true;
                }
                None => {
                    println!("Failed to save account: {:?}", accounts[mid]);
                    return false;
                }
            }
        } else if mid_id < id {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    false
}
