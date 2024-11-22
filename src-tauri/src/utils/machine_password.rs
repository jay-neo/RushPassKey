use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

use crate::utils::identifier::get_machine_identifier;

pub fn get_machine_password() -> String {
    let full_id = get_machine_identifier();
    let mut hasher = DefaultHasher::new();
    full_id.hash(&mut hasher);
    let hash = hasher.finish();

    let base36 = format!("{:x}", hash);
    base36[..5].to_string()
}
