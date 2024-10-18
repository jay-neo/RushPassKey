use chrono::Local;

use crate::types::{AccountCache, AccountPassConfig, AccountServer};

use super::generator::generate_account_password;

pub fn parse_account_for_encryption(data: &AccountServer) -> AccountCache {
    let password_config: AccountPassConfig = AccountPassConfig {
        alphabet: data.alphabet,
        number: data.number,
        symbols: data.symbols,
        casing_enabled: data.casing_enabled,
        casing: data.casing.clone(),
        min_password_value: data.min_password_value,
        max_password_value: data.max_password_value,
    };

    let password: String = generate_account_password(&password_config);
    let id: i64 = Local::now().timestamp_millis();

    let formatted_time: String = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();

    AccountCache {
        id: id.to_string(),
        account_name: data.account_name.clone(),
        website_url: data.website_url.clone(),
        email: data.email.clone(),
        username: data.username.clone(),
        phone: data.phone.clone(),
        password: password,
        last_updated: formatted_time.clone(),
        last_used: formatted_time,
    }
}

pub fn parse_account_for_decryption(data: &str) -> Option<AccountCache> {
    let lines: Vec<&str> = data.split('\n').collect();

    if lines.len() < 9 {
        return None;
    }

    let id: String = lines.get(0)?.replace("ID: ", "");
    let account_name: String = lines.get(1)?.replace("Account: ", "");
    let website_url: String = lines.get(2)?.replace("Website: ", "");
    let email: String = lines.get(3)?.replace("Email: ", "");
    let username: String = lines.get(4)?.replace("Username: ", "");
    let phone: String = lines.get(5)?.replace("Phone: ", "");
    let password: String = lines.get(6)?.replace("Password: ", "");
    let last_updated: String = lines.get(7)?.replace("Last_Updated: ", "");
    let last_used: String = lines.get(8)?.replace("Last_Used: ", "");

    Some(AccountCache {
        id,
        account_name,
        website_url,
        email,
        username,
        phone,
        password,
        last_updated,
        last_used,
    })
}
