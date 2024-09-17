use serde::Deserialize;

#[derive(Deserialize)]
pub struct Account {
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

#[derive(Deserialize)]
pub struct PasswordConfig {
    pub alphabet: bool,
    pub number: bool,
    pub symbols: bool,
    pub casing_enabled: bool,
    pub casing: String,
    pub min_password_value: usize,
    pub max_password_value: usize,
}