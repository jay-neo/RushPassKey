use std::{
    fs::{File, OpenOptions},
    io::Write,
    path::PathBuf,
};

use crate::{
    app::cache::CURRENT_USER_PASSWORD,
    db::config::{ACCOUNTS_FILENAME, ACCOUNTS_FILEPATH},
    security::accounts::encryption::encrypt_account,
    types::AccountCache,
};

pub fn save_accounts_to_file(accounts: &[AccountCache]) -> Option<()> {
    let user_password_guard: std::sync::MutexGuard<'_, Option<String>> =
        CURRENT_USER_PASSWORD.lock().unwrap();
    let user_password: String = match &*user_password_guard {
        Some(password) => password.clone(),
        None => {
            return None;
        }
    };

    // Re-open the file in "write" mode with "truncate(true)" to clear the file before writing
    let home_dir: PathBuf = dirs::home_dir().expect("Cannot find home directory");
    let file_path: PathBuf = home_dir.join(ACCOUNTS_FILEPATH).join(ACCOUNTS_FILENAME);

    let mut accounts_file: File = match OpenOptions::new()
        .write(true)
        .truncate(true)
        .open(&file_path)
    {
        Ok(f) => f,
        Err(_) => return None,
    };

    for account in accounts {
        let line: String = format!(
            "ID: {}\nAccount: {}\nWebsite: {}\nEmail: {}\nUsername: {}\nPhone: {}\nPassword: {}\nLast_Updated: {}\nLast_Used: {}\n",
            account.id, account.account_name, account.website_url, account.email,
            account.username, account.phone, account.password, account.last_updated,
            account.last_used
        );

        let encrypted_data: String = encrypt_account(&line, &user_password);

        if accounts_file
            .write_all(format!("{}\n", encrypted_data).as_bytes())
            .is_err()
        {
            return None;
        }
    }

    Some(())
}
