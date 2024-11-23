## Pull Request

### Description

<!-- Provide a clear and concise description of what this PR accomplishes -->

### Type of Change

<!-- Mark the appropriate option(s) with [x] -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🎨 Style/UI improvements
- [ ] ♻️ Code refactoring
- [ ] ⚡ Performance improvements
- [ ] ✅ Test additions or updates
- [ ] 🔧 Configuration changes
- [ ] 🚀 Build/CI improvements
- [ ] 🔒 Security improvements

### Related Issues

<!-- Link to any related issues using #issue_number -->

Closes #(issue)
Related to #(issue)

### Screenshots

<!-- If applicable, add screenshots to help explain your changes -->

### Checklist

<!-- Mark all items that apply with [x] -->

#### Code Quality
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested my changes on multiple platforms (if applicable)

#### Security
- [ ] My changes do not introduce new security vulnerabilities
- [ ] I have reviewed the security implications of my changes
- [ ] My changes maintain or improve the security posture of the application
- [ ] I have not hardcoded any sensitive information (passwords, API keys, etc.)

#### Testing
- [ ] I have added unit tests for new functionality
- [ ] I have updated existing tests to cover my changes
- [ ] All tests pass locally
- [ ] I have tested my changes manually
- [ ] I have tested on the target platform(s)

#### Documentation
- [ ] I have updated the README if needed
- [ ] I have updated the technical documentation if needed
- [ ] I have added inline documentation for complex code
- [ ] I have updated API documentation if applicable

#### Platform Compatibility
- [ ] My changes work on Windows
- [ ] My changes work on macOS
- [ ] My changes work on Linux
- [ ] My changes work on Android (if applicable)
- [ ] My changes work on iOS (if applicable)

### Breaking Changes

<!-- If this PR introduces breaking changes, describe them here -->

### Additional Notes

<!-- Add any other context about the PR here -->

### Testing Instructions

<!-- Provide step-by-step instructions for testing your changes -->

1. **Setup**: Describe any special setup required
2. **Test Case 1**: Describe the first test case
3. **Test Case 2**: Describe the second test case
4. **Expected Result**: What should happen after testing

### Performance Impact

<!-- Describe any performance implications of your changes -->

- **Memory usage**: Any changes in memory consumption?
- **CPU usage**: Any changes in CPU usage?
- **Startup time**: Any impact on application startup?
- **Response time**: Any impact on user interactions?

### Security Considerations

<!-- Describe any security implications of your changes -->

- **Data exposure**: Does this change expose any sensitive data?
- **Authentication**: Does this change affect authentication mechanisms?
- **Authorization**: Does this change affect access control?
- **Input validation**: Does this change affect input validation?

### Dependencies

<!-- List any new dependencies or changes to existing dependencies -->

- **Added**: List new dependencies
- **Updated**: List updated dependencies
- **Removed**: List removed dependencies

### Migration Guide

<!-- If this PR requires data migration, provide a guide -->

### Rollback Plan

<!-- Describe how to rollback these changes if needed -->

---

## Review Guidelines

### For Reviewers

- [ ] Code follows project standards
- [ ] Security implications have been considered
- [ ] Performance impact has been assessed
- [ ] Tests are comprehensive and appropriate
- [ ] Documentation is clear and complete
- [ ] Platform compatibility has been verified

### Review Checklist

#### Code Review
- [ ] Code is readable and well-structured
- [ ] Error handling is appropriate
- [ ] Logging is adequate
- [ ] No hardcoded values
- [ ] No commented-out code
- [ ] No debugging code left in

#### Security Review
- [ ] No security vulnerabilities introduced
- [ ] Input validation is adequate
- [ ] Authentication/authorization is maintained
- [ ] Sensitive data is properly handled
- [ ] No information disclosure

#### Performance Review
- [ ] No performance regressions
- [ ] Efficient algorithms used
- [ ] No unnecessary database queries
- [ ] Memory usage is reasonable
- [ ] No resource leaks

### Review Comments

<!-- Reviewers can add their comments here -->

### Approval

<!-- Mark when approved -->

- [ ] **Frontend Review**: Approved by frontend maintainer
- [ ] **Backend Review**: Approved by backend maintainer
- [ ] **Security Review**: Approved by security maintainer
- [ ] **Final Approval**: Ready to merge

---

## Commit Message

<!-- The commit message should follow conventional commit format -->

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Examples:**
- `feat: add password strength indicator`
- `fix: resolve memory leak in encryption`
- `docs: update API documentation`
- `test: add integration tests for user auth`

---

## Questions for Contributors

<!-- Answer these questions to help reviewers understand your changes -->

### What problem does this solve?

<!-- Describe the problem you're solving -->

### Why is this the best solution?

<!-- Explain why you chose this approach -->

### What alternatives did you consider?

<!-- Describe other approaches you considered -->

### How did you test this?

<!-- Describe your testing approach -->

---

## Additional Resources

- [Contributing Guidelines](../CONTRIBUTING.md)
- [Code of Conduct](../CODE_OF_CONDUCT.md)
- [Security Policy](../SECURITY.md)
- [Development Guide](../docs/README.md)

---

**Thank you for contributing to RushPassKey! 🚀**
