use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct AccountServer {
    pub account_name: String,
    pub website_url: String,
    pub email: String,
    pub username: String,
    pub phone: String,
    pub alphabet: bool,
    pub number: bool,
    pub symbols: bool,
    pub casing_enabled: bool,
    pub casing: String,
    pub min_password_value: usize,
    pub max_password_value: usize,
}

#[derive(Serialize, Clone, Debug)]
pub struct AccountCache {
    pub id: String,
    pub account_name: String,
    pub website_url: String,
    pub email: String,
    pub username: String,
    pub phone: String,
    pub password: String,
    pub last_updated: String,
    pub last_used: String,
}

#[derive(Serialize, Clone)]
pub struct AccountClient {
    pub id: String,
    pub account_name: String,
    pub website_url: String,
    pub email: String,
    pub username: String,
    pub phone: String,
    pub last_updated: String,
    pub last_used: String,
}

#[derive(Deserialize)]
pub struct AccountPassConfig {
    pub alphabet: bool,
    pub number: bool,
    pub symbols: bool,
    pub casing_enabled: bool,
    pub casing: String,
    pub min_password_value: usize,
    pub max_password_value: usize,
}

// Implementations
impl From<AccountCache> for AccountClient {
    fn from(account_cache: AccountCache) -> Self {
        AccountClient {
            id: account_cache.id,
            account_name: account_cache.account_name,
            website_url: account_cache.website_url,
            email: account_cache.email,
            username: account_cache.username,
            phone: account_cache.phone,
            last_updated: account_cache.last_updated,
            last_used: account_cache.last_used,
        }
    }
}

#[derive(Serialize)]
pub struct CopyPasswordResult {
    pub password: String,
    pub last_used: String,
}
