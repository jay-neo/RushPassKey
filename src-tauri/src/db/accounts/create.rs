use crate::{
    app::cache::ACCOUNTS,
    types::{AccountCache, AccountClient},
};

use super::utils::save_accounts_to_file;

pub fn create_account(new_account: &AccountCache) -> Option<AccountClient> {
    let mut accounts_cache: std::sync::RwLockWriteGuard<'_, Option<Vec<AccountCache>>> =
        ACCOUNTS.write().unwrap();
    if let Some(accounts) = accounts_cache.as_mut() {
        accounts.insert(0, new_account.clone());
    } else {
        *accounts_cache = Some(vec![new_account.clone()]);
    }

    let accounts: &mut Vec<AccountCache> = match &mut *accounts_cache {
        Some(accounts) => accounts,
        None => return None,
    };

    match save_accounts_to_file(accounts) {
        Some(()) => {
            return Some(AccountClient {
                id: new_account.id.clone(),
                account_name: new_account.account_name.clone(),
                website_url: new_account.website_url.clone(),
                email: new_account.email.clone(),
                username: new_account.username.clone(),
                phone: new_account.phone.clone(),
                last_updated: new_account.last_updated.clone(),
                last_used: new_account.last_used.clone(),
            })
        }
        None => return None,
    };
}
