mod app;
mod commands;
mod db;
mod security;
mod types;
mod utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            commands::new_account::new_account,
            commands::get_all_accounts::get_all_accounts,
            commands::verify_user::verify_user,
            commands::copy_account_password::copy_account_password,
            commands::regenerate_account_password::regenerate_account_password,
            commands::delete_account::delete_account,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
