use once_cell::sync::Lazy;
use std::sync::{Mutex, RwLock};

use crate::types::AccountCache;

pub static CURRENT_USER_PASSWORD: Lazy<Mutex<Option<String>>> = Lazy::new(|| Mutex::new(None));

pub static ACCOUNTS: Lazy<RwLock<Option<Vec<AccountCache>>>> = Lazy::new(|| RwLock::new(None));
