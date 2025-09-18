use std::path::PathBuf;

use crate::{db::config::ACCOUNTS_FILEPATH, utils::machine_password::get_machine_password};

#[tauri::command]
pub fn check_new_user() -> Option<String> {
    let home_dir: PathBuf = dirs::home_dir().expect("Cannot find home directory");
    let file_dir: PathBuf = home_dir.join(ACCOUNTS_FILEPATH);

    // if file exist then true, else false
    if std::fs::metadata(file_dir).is_ok() {
        return None;
    }
    Some(get_machine_password())
}
