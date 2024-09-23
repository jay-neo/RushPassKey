mod accounts;
mod app;
mod commands;
mod db;
mod security;
mod types;
mod utils;

use commands::get_all_accounts::*;
use commands::new_account::*;
use commands::verify_user::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            new_account,
            get_all_accounts,
            verify_user
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
