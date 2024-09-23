use crate::accounts::password::generate;
use crate::db::account::create_account;
use crate::types::{AccountPassConfig, AccountServer};

#[tauri::command]
pub fn new_account(data: AccountServer) -> bool {
    let password_config: AccountPassConfig = AccountPassConfig {
        alphabet: data.alphabet,
        number: data.number,
        symbols: data.symbols,
        casing_enabled: data.casing_enabled,
        casing: data.casing,
        min_password_value: data.min_password_value,
        max_password_value: data.max_password_value,
    };

    let password: String = generate(&password_config);

    let refined_data: String = format!(
        "Account: {}\nWebsite: {}\nEmail: {}\nUsername: {}\nPhone: {}\nPassword: {}\n\n",
        data.account_name, data.website_url, data.email, data.username, data.phone, password
    );

    create_account(&refined_data)
}
