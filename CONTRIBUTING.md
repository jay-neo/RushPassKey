# Contributing to RushPassKey

Thank you for your interest in contributing to RushPassKey! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **Rust** (latest stable version)
- **Git** (for version control)
- **Tauri CLI** (for desktop app development)

### Platform-Specific Requirements

Refer to the [Tauri documentation](https://v2.tauri.app/start/prerequisites)

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/RushPassKey.git
cd RushPassKey

# Add the original repository as upstream
git remote add upstream https://github.com/jay-neo/RushPassKey.git
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install Rust dependencies
cd src-tauri
cargo build
cd ..
```

### 3. Verify Setup

```bash
# Start development server
npm run tauri dev
```

## Contribution Guidelines

### Types of Contributions

We welcome various types of contributions:

- **Bug Reports**: Report bugs and issues
- **Feature Requests**: Suggest new features
- **Code Contributions**: Submit code improvements
- **Documentation**: Improve or add documentation
- **Testing**: Write or improve tests
- **Translation**: Help with internationalization
- **Design**: Improve UI/UX

### Contribution Areas

#### Frontend (React/TypeScript)

- User interface components
- State management
- Routing and navigation
- Styling and animations
- Accessibility improvements

#### Backend (Rust)

- Tauri commands
- Security and encryption
- File system operations
- Cross-platform compatibility
- Performance optimization

#### Documentation

- API documentation
- User guides
- Developer documentation
- Code examples
- Troubleshooting guides

## Code Standards

### Rust Standards

#### Code Formatting

```bash
# Format Rust code
cargo fmt

# Check formatting
cargo fmt -- --check
```

#### Code Quality

```bash
# Run Clippy (Rust linter)
cargo clippy

# Run with warnings as errors
cargo clippy -- -D warnings
```

#### Code Style Guidelines

```rust
// Use snake_case for variables and functions
let user_password = "secure_password";
fn validate_password(password: &str) -> bool { /* ... */ }

// Use PascalCase for types and traits
struct UserAccount { /* ... */ }
trait PasswordValidator { /* ... */ }

// Use SCREAMING_SNAKE_CASE for constants
const MAX_PASSWORD_LENGTH: usize = 128;
const DEFAULT_ITERATIONS: u32 = 100_000;

// Use Result<T, E> for fallible operations
pub fn encrypt_data(data: &[u8], key: &[u8; 32]) -> Result<Vec<u8>, EncryptionError> { /* ... */ }

// Use Option<T> for nullable values
pub fn find_user_by_id(id: i32) -> Option<User> { /* ... */ }
```

### TypeScript/React Standards

#### Code Formatting

```bash
# Format TypeScript/React code
npm run format

# Check formatting
npm run format:check
```

#### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

#### Code Style Guidelines

```typescript
// Use camelCase for variables and functions
const userPassword = "securePassword";
const validatePassword = (password: string): boolean => {
  /* ... */
};

// Use PascalCase for components and types
interface UserAccount {
  /* ... */
}
const PasswordForm: React.FC<PasswordFormProps> = ({ onSubmit }) => {
  /* ... */
};

// Use UPPER_SNAKE_CASE for constants
const MAX_PASSWORD_LENGTH = 128;
const DEFAULT_ITERATIONS = 100000;

// Use async/await for asynchronous operations
const handleSubmit = async (data: FormData): Promise<void> => {
  try {
    const result = await createUser(data.username, data.password);
    console.log("User created:", result);
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};

// Use proper React hooks patterns
const [accounts, setAccounts] = useState<Account[]>([]);
const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAccounts();
}, []);
```

## Testing

### Frontend Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- AccountList.test.tsx
```

### Backend Testing

```bash
# Run all tests
cargo test

# Run tests with output
cargo test -- --nocapture

# Run specific test
cargo test test_encrypt_data

# Run tests with coverage (requires cargo-tarpaulin)
cargo tarpaulin
```

### Test Guidelines

- Write tests for all new functionality
- Ensure tests cover edge cases
- Use descriptive test names
- Mock external dependencies
- Test both success and failure scenarios

## Pull Request Process

### 1. Create Feature Branch

```bash
# Create and switch to feature branch
git checkout -b feature/new-feature

# Or use conventional commits
git checkout -b feat/add-password-generator
git checkout -b fix/resolve-login-issue
git checkout -b docs/update-readme
```

### 2. Make Changes

- Write code following project standards
- Add tests for new functionality
- Update documentation
- Ensure all tests pass

### 3. Commit Changes

```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat: add password generator component

- Add password generation form
- Implement strength validation
- Add unit tests for generator logic"
```

#### Conventional Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
git commit -m "feat: add password strength indicator"
git commit -m "fix: resolve memory leak in encryption"
git commit -m "docs: update API documentation"
git commit -m "test: add integration tests for user auth"
```

### 4. Push and Create PR

```bash
# Push feature branch
git push origin feature/new-feature

# Create pull request on GitHub
# Follow PR template and guidelines
```

### 5. Pull Request Requirements

- [ ] Clear title using conventional commit format
- [ ] Detailed description of changes
- [ ] Related issue linked (if applicable)
- [ ] Tests included and passing
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Code follows project standards

## Issue Reporting

### Bug Reports

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**

- OS: [e.g. Ubuntu 22.04]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

### Feature Requests

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request.
```

### Security Issues

For security-related issues, please email jay-neo@outlook.com instead of creating a public issue.

## Community

### Communication Channels

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: jay-neo@outlook.com for private matters

### Getting Help

- Check existing documentation first
- Search existing issues and discussions
- Ask questions in GitHub Discussions
- Be patient and respectful

### Recognition

Contributors will be recognized in:

- Project README
- Release notes
- Contributor hall of fame
- GitHub contributors list

## Development Workflow

### Daily Development

```bash
# Start development server
npm run tauri dev

# Make changes in src/ (frontend) or src-tauri/src/ (backend)
# Changes automatically reflect in development
```

### Code Review Process

1. **Self-review**: Review your own code first
2. **Peer review**: Request review from maintainers
3. **Address feedback**: Respond to review comments
4. **Merge**: Once approved, maintainers will merge

### Release Process

1. **Version bump**: Update version numbers
2. **Build**: Create production builds
3. **Test**: Verify functionality
4. **Release**: Tag and publish release
5. **Deploy**: Distribute to users

## Additional Resources

- [Rust Book](https://doc.rust-lang.org/book/)
- [React Documentation](https://react.dev/)
- [Tauri Documentation](https://tauri.app/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Questions?

If you have questions about contributing:

1. Check this document first
2. Search existing issues and discussions
3. Ask in GitHub Discussions
4. Contact maintainers via email

Thank you for contributing to RushPassKey! 🚀

---


