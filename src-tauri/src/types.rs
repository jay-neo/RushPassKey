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

#[derive(Serialize)]
pub struct AccountClient {
    // pub id: String,
    pub account_name: String,
    pub website_url: String,
    pub email: String,
    pub username: String,
    pub phone: String,
    pub password: String,
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
