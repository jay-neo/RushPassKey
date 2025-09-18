# RushPassKey Technical Documentation

---

## Architecture Overview

### System Architecture

RushPassKey follows a **client-server architecture** where:
- **Frontend**: React-based UI built with TypeScript and Tailwind CSS
- **Backend**: Rust-based Tauri application with File System as database
- **Communication**: Tauri commands for frontend-backend communication

### Technology Stack

```
Frontend Layer:
├── React 18 + TypeScript
├── Tailwind CSS (styling)
├── React Router (navigation)
└── Sonner (notifications)

Backend Layer:
├── Rust (core logic)
├── Tauri 2.0 (desktop framework)
├── File System (data storage)
└── AES-256 (encryption)

Build Tools:
├── Vite (frontend bundler)
├── Cargo (Rust package manager)
└── Tauri CLI (build system)
```

---

## Security Implementation

### Encryption Architecture

#### 1. Machine Identification
Each device generates a unique identifier using platform-specific methods:

```rust
// Linux: /etc/machine-id
// macOS: Hardware UUID via ioreg
// Windows: BIOS serial number via wmic
// Android: Device properties + settings database
// iOS: System properties via sysctl
```

#### 2. Key Derivation
Uses PBKDF2 (Password-Based Key Derivation Function 2) with:
- **Salt**: Machine-specific identifier
- **Iterations**: 100,000+ rounds
- **Hash Algorithm**: SHA-256
- **Output Length**: 256 bits (32 bytes)

#### 3. Data Encryption
- **Algorithm**: AES-256-GCM
- **Key**: Derived from user password + machine ID
- **Mode**: Galois/Counter Mode for authenticated encryption
- **IV**: Randomly generated for each encryption

### Security Features

- **Local Storage Only**: No cloud dependencies
- **End-to-End Encryption**: All data encrypted before storage
- **Machine Binding**: Data can only be decrypted on the same device
- **Password Hashing**: User passwords never stored in plain text
- **Secure Random Generation**: Cryptographically secure random numbers

---


## API Reference

### Tauri Commands

#### User Management

```rust
// Check if user is new
#[tauri::command]
pub async fn check_new_user() -> Result<String, String>

// Verify user credentials
#[tauri::command]
pub async fn verify_user(password: String) -> Result<bool, String>

// Create new user
#[tauri::command]
pub async fn create_user(username: String, password: String) -> Result<bool, String>
```

#### Account Management

```rust
// Get all accounts for user
#[tauri::command]
pub async fn get_all_accounts() -> Result<Vec<Account>, String>

// Create new account
#[tauri::command]
pub async fn new_account(account: NewAccount) -> Result<bool, String>

// Update existing account
#[tauri::command]
pub async fn update_account(account: Account) -> Result<bool, String>

// Delete account
#[tauri::command]
pub async fn delete_account(id: i32) -> Result<bool, String>

// Regenerate account password
#[tauri::command]
pub async fn regenerate_account_password(id: i32) -> Result<String, String>
```

#### Utility Commands

```rust
// Copy password to clipboard
#[tauri::command]
pub async fn copy_account_password(password: String) -> Result<bool, String>

// Generate new password
#[tauri::command]
pub async fn generate_password(params: PasswordParams) -> Result<String, String>
```

### Data Types

#### Account Structure
```typescript
interface Account {
  id: number;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface NewAccount {
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
}
```

#### Password Generation Parameters
```typescript
interface PasswordParams {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
}
```

---

## Component Documentation

### Core Components

#### AppLockScreen
- **Purpose**: Authentication screen for new and existing users
- **Features**: Password input, new user setup, error handling
- **State**: Manages authentication flow and user status

#### MainPage
- **Purpose**: Main application interface after authentication
- **Features**: Account management, search, navigation
- **State**: Manages accounts data and UI state

#### AccountsList
- **Purpose**: Displays list of saved accounts
- **Features**: Search, filter, sort, CRUD operations
- **State**: Manages accounts display and interactions

#### AccountTab
- **Purpose**: Form for creating/editing accounts
- **Features**: Password generation, validation, submission
- **State**: Manages form data and submission state

### UI Components

#### Dialog
- **Purpose**: Modal dialog component
- **Props**: `isOpen`, `onClose`, `title`, `children`
- **Features**: Backdrop click to close, responsive design

#### Loader
- **Purpose**: Loading indicator components
- **Variants**: `Loader`, `Loader2`
- **Features**: Spinning animation, customizable size

---

## Deployment Guide

### Building for Production

#### Desktop Applications
```bash
# Build for current platform
npm run tauri build

# Build for specific platform
npm run tauri build -- --target x86_64-unknown-linux-gnu
npm run tauri build -- --target x86_64-pc-windows-msvc
npm run tauri build -- --target x86_64-apple-darwin
```

#### Mobile Applications
```bash
# Android
npm run tauri android build

# iOS
npm run tauri ios build
```

### Distribution

#### Desktop
- **Windows**: MSI installer, portable executable
- **macOS**: DMG package, App Store
- **Linux**: AppImage, DEB/RPM packages

#### Mobile
- **Android**: APK, AAB for Play Store
- **iOS**: IPA for App Store

### Updates

Implement automatic updates using Tauri's update system:

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": ["https://releases.example.com/{{target}}/{{current_version}}"],
      "dialog": true,
      "pubkey": "your-public-key-here"
    }
  }
}
```

---

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

### Code Review Process
- All changes require review
- Tests must pass
- Code must follow style guidelines
- Documentation must be updated

### Testing
- Unit tests for Rust functions
- Integration tests for Tauri commands
- Component tests for React components
- End-to-end tests for critical flows

---

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

---

## Support

For technical support and questions:
- **GitHub Issues**: [Create an issue](https://github.com/jay-neo/RushPassKey/issues)
- **Discussions**: [Join discussions](https://github.com/jay-neo/RushPassKey/discussions)
- **Email**: jay-neo@outlook.com


