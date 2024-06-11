use crate::accounts::password::generate;
use crate::db::account::create;
use crate::globals::GLOBAL_USER_PASSWORD;
use crate::security::account::encrypt;
use crate::types::{Account, PasswordConfig};

#[tauri::command]
pub fn new_account(data: Account) -> bool {
    let password_config: PasswordConfig = PasswordConfig {
        alphabet: data.alphabet,
        number: data.number,
        symbols: data.symbols,
        casing_enabled: data.casing_enabled,
        casing: data.casing,
        min_password_value: data.min_password_value,
        max_password_value: data.max_password_value,
    };

    let password: String = generate(&password_config);

    let entry: String = format!(
        "Account: {}\nWebsite: {}\nEmail: {}\nUsername: {}\nPhone: {}\nPassword: {}\n\n",
        data.account_name, data.website_url, data.email, data.username, data.phone, password
    );

    let encrypted_data: String = encrypt(&entry, "&GLOBAL_USER_PASSWORD");
    // match decrypt(&entry, password) {
    //     Some(decrypted) => decrypted,
    //     None => false,
    // }

    create(&encrypted_data)
}
