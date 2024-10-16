use crate::db::accounts::delete::delete_account_by_id;

#[tauri::command]
pub fn delete_account(id: String) -> bool {
    delete_account_by_id(&id)
}
