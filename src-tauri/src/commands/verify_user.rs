use crate::{app::startup::startup, utils::machine_password::get_machine_password};

#[tauri::command]
pub fn verify_user(password: String) -> bool {
    if password != get_machine_password() {
        return false;
    }
    return startup(password);
}
