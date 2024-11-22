#[cfg(target_os = "linux")]
pub fn get_machine_identifier() -> String {
    // Read machine-id from file
    let machine_id =
        std::fs::read_to_string("/etc/machine-id").expect("Failed to read /etc/machine-id");
    machine_id.trim().to_string() // Trim the newline at the end
}

#[cfg(target_os = "macos")]
pub fn get_machine_identifier() -> String {
    // Use system_profiler to get the hardware UUID
    let output = std::process::Command::new("ioreg")
        .arg("-rd1")
        .arg("-c")
        .arg("IOPlatformExpertDevice")
        .output()
        .expect("Failed to get hardware UUID");
    let output_str = String::from_utf8_lossy(&output.stdout);
    let uuid_line = output_str
        .lines()
        .find(|line| line.contains("IOPlatformUUID"))
        .expect("Failed to find UUID");

    // Extract the UUID from the line
    let uuid = uuid_line
        .split('=')
        .nth(1)
        .expect("Failed to parse UUID")
        .trim()
        .replace("\"", "");
    uuid
}

#[cfg(target_os = "windows")]
pub fn get_machine_identifier() -> String {
    // Use wmic to get BIOS serial number
    let output: std::process::Output = std::process::Command::new("wmic")
        .arg("bios")
        .arg("get")
        .arg("serialnumber")
        .output()
        .expect("Failed to get BIOS serial number");

    let output_str = String::from_utf8_lossy(&output.stdout);
    let serial_number = output_str
        .lines()
        .nth(1) // Second line contains the serial number
        .expect("Failed to parse serial number")
        .trim();
    serial_number.to_string()
}

#[cfg(target_os = "android")]
pub fn get_machine_identifier() -> String {
    // For Android, we'll use a combination of available identifiers
    // This approach provides a stable identifier across app reinstalls

    // Hash the identifier to make it consistent
    use std::collections::hash_map::DefaultHasher;
    use std::hash::{Hash, Hasher};

    // Try to read from Android ID file first (if accessible)
    if let Ok(android_id) =
        std::fs::read_to_string("/data/data/com.android.providers.settings/databases/settings.db")
    {
        // Extract a hash from the settings database content
        let mut hasher = DefaultHasher::new();
        android_id.hash(&mut hasher);
        let hash = hasher.finish();

        format!("{:x}", hash)
    } else {
        // Fallback: generate a stable identifier based on system properties
        let mut identifier = String::new();

        // Try to get device model
        if let Ok(output) = std::process::Command::new("getprop")
            .arg("ro.product.model")
            .output()
        {
            if let Ok(model) = String::from_utf8(output.stdout) {
                identifier.push_str(&model.trim());
            }
        }

        // Try to get device manufacturer
        if let Ok(output) = std::process::Command::new("getprop")
            .arg("ro.product.manufacturer")
            .output()
        {
            if let Ok(manufacturer) = String::from_utf8(output.stdout) {
                identifier.push_str(&manufacturer.trim());
            }
        }

        // If we still don't have a good identifier, use a fallback
        if identifier.is_empty() {
            identifier = "android_device".to_string();
        }

        let mut hasher = DefaultHasher::new();
        identifier.hash(&mut hasher);
        let hash = hasher.finish();

        format!("{:x}", hash)
    }
}

#[cfg(target_os = "ios")]
pub fn get_machine_identifier() -> String {
    // For iOS, we'll use a combination of available identifiers
    // Note: iOS has strict limitations on device identification

    // Try to read from iOS system files (if accessible in Tauri context)
    let mut identifier = String::new();

    // Try to get device model identifier
    if let Ok(output) = std::process::Command::new("sysctl")
        .arg("-n")
        .arg("hw.machine")
        .output()
    {
        if let Ok(machine) = String::from_utf8(output.stdout) {
            identifier.push_str(&machine.trim());
        }
    }

    // Try to get device name
    if let Ok(output) = std::process::Command::new("sysctl")
        .arg("-n")
        .arg("kern.hostname")
        .output()
    {
        if let Ok(hostname) = String::from_utf8(output.stdout) {
            identifier.push_str(&hostname.trim());
        }
    }

    // If we don't have a good identifier, use a fallback
    if identifier.is_empty() {
        identifier = "ios_device".to_string();
    }

    // Hash the identifier to make it consistent and respect privacy
    use std::collections::hash_map::DefaultHasher;
    use std::hash::{Hash, Hasher};

    let mut hasher = DefaultHasher::new();
    identifier.hash(&mut hasher);
    let hash = hasher.finish();

    format!("{:x}", hash)
}
