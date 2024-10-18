use std::cmp::Ordering;

use chrono::NaiveDateTime;

use crate::{
    app::cache::ACCOUNTS,
    types::{AccountCache, AccountClient},
};

#[tauri::command]
pub fn get_all_accounts() -> Vec<AccountClient> {
    let accounts: std::sync::RwLockReadGuard<'_, Option<Vec<AccountCache>>> =
        ACCOUNTS.read().unwrap();

    let mut cloned_accounts = accounts.clone().unwrap_or_default();

    cloned_accounts.sort_by(|a, b| {
        let a_last_used: Result<NaiveDateTime, chrono::ParseError> =
            NaiveDateTime::parse_from_str(&a.last_used, "%Y-%m-%d %H:%M:%S");
        let b_last_used: Result<NaiveDateTime, chrono::ParseError> =
            NaiveDateTime::parse_from_str(&b.last_used, "%Y-%m-%d %H:%M:%S");

        match (a_last_used, b_last_used) {
            (Ok(a_time), Ok(b_time)) => b_time.cmp(&a_time),
            (Err(_), Err(_)) => Ordering::Equal,
            (Ok(_), Err(_)) => Ordering::Less,
            (Err(_), Ok(_)) => Ordering::Greater,
        }
    });

    cloned_accounts
        .into_iter()
        .map(AccountClient::from)
        .collect()
}
