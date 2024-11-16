use std::process::Command;
use std::fs;

#[cfg(target_os = "linux")]
pub fn get_machine_identifier() -> String {
    // Read machine-id from file
    let machine_id = fs::read_to_string("/etc/machine-id").expect("Failed to read /etc/machine-id");
    machine_id.trim().to_string() // Trim the newline at the end
}

#[cfg(target_os = "macos")]
pub fn get_machine_identifier() -> String {
    // Use system_profiler to get the hardware UUID
    let output = Command::new("ioreg")
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
    let output: std::process::Output = Command::new("wmic")
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
