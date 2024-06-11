use std::fs::{create_dir_all, File, OpenOptions};
use std::io::Write;
use std::path::PathBuf;

pub fn create(encrypted_data: &str) -> bool {
    let home_dir: PathBuf = dirs::home_dir().expect("Cannot find home directory");
    let path: PathBuf = home_dir.join(".rasspasskey");

    if create_dir_all(&path).is_err() {
        return false;
    }

    let file_path: PathBuf = path.join("passwords.db");
    let mut file: File = match OpenOptions::new()
        .create(true)
        .append(true)
        .open(&file_path)
    {
        Ok(f) => f,
        Err(_) => return false,
    };

    if file
        .write_all(format!("{}\n", encrypted_data).as_bytes())
        .is_err()
    {
        return false;
    }

    true
}
