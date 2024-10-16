use crate::db::init::init_db;

use super::cache::CURRENT_USER_PASSWORD;

pub fn startup(password: String) -> bool {
    let mut current_user_password_cache: std::sync::MutexGuard<'_, Option<String>> =
        match CURRENT_USER_PASSWORD.lock() {
            Ok(guard) => guard,
            Err(_) => return false,
        };
    *current_user_password_cache = Some(password.clone());

    init_db(&password)
}