use crate::{db::accounts::update::update_account_for_copy_password, types::CopyPasswordResult};

#[tauri::command]
pub fn copy_account_password(id: String) -> Option<CopyPasswordResult> {
    update_account_for_copy_password(&id)
}
