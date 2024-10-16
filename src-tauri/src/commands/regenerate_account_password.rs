use crate::{
    db::accounts::update::update_account_for_regenerate_password,
    security::accounts::generator::generate_account_password,
    types::{AccountClient, AccountPassConfig},
};

#[tauri::command]
pub fn regenerate_account_password(
    id: String,
    password_config: AccountPassConfig,
) -> Option<AccountClient> {
    let password: String = generate_account_password(&password_config);
    update_account_for_regenerate_password(&id, password)
}
