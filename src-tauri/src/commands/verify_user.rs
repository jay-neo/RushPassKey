use crate::app::startup::startup;

#[tauri::command]
pub fn verify_user(password: String) -> bool {
    if password != "jayneo" {
        return false;
    }
    return startup(password);
}
