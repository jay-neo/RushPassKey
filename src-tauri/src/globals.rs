use once_cell::sync::Lazy;
use std::sync::Mutex;

pub static GLOBAL_COUNTER: Lazy<Mutex<i32>> = Lazy::new(|| Mutex::new(0));
pub static GLOBAL_MESSAGE: Lazy<Mutex<String>> =
    Lazy::new(|| Mutex::new(String::from("Hello, World!")));
pub static GLOBAL_USER_PASSWORD: Lazy<Mutex<String>> =
    Lazy::new(|| Mutex::new(String::from("Hello, World!")));
