use crate::{
    db::accounts::create::create_account,
    security::accounts::parser::parse_account_for_encryption,
    types::{AccountCache, AccountClient, AccountServer},
};

#[tauri::command]
pub fn new_account(data: AccountServer) -> Option<AccountClient> {
    let parsed_data: AccountCache = parse_account_for_encryption(&data);
    create_account(&parsed_data)
}
