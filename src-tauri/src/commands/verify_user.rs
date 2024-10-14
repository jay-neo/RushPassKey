use crate::app::cache::initialize_cache;

#[tauri::command]
pub fn verify_user() -> bool {
    let _ = initialize_cache();
    true
}
