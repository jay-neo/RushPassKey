use crate::app::cache::{ACCOUNTS};

#[tauri::command]
pub fn get_all_accounts() -> String {
    // let user_password: std::sync::MutexGuard<'_, String> = CURRENT_USER_PASSWORD.lock().unwrap();
    // let accounts: Vec<crate::types::AccountClient> = get_accounts(&user_password);
    // serde_json::to_string(&accounts).expect("Failed to serialize accounts");
    let accounts = ACCOUNTS.read().unwrap();
    serde_json::to_string(&*accounts).expect("Failed to serialize accounts")
}
