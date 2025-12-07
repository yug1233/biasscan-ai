# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within BiasScan AI, please send an email to security@biasscan.ai. All security vulnerabilities will be promptly addressed.

Please include the following information:

* Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit the issue

## Security Measures

BiasScan AI implements several security measures:

### Client-Side Processing
* All data processing happens in the browser
* No data is transmitted to external servers
* Files are automatically deleted from memory after processing

### Authentication
* Supabase Auth with email/password and OAuth
* Row Level Security (RLS) policies on all tables
* Secure session management

### Data Protection
* GDPR compliant - zero data retention
* Encrypted connections (HTTPS)
* No sensitive data stored in logs

### Code Security
* Regular dependency updates
* ESLint for code quality
* Input validation and sanitization
* XSS protection
* CSRF protection

## Best Practices for Users

1. **Use Strong Passwords**: Create unique, complex passwords
2. **Enable 2FA**: Use Google OAuth for additional security
3. **Keep Software Updated**: Always use the latest version
4. **Review Permissions**: Check what data you're sharing
5. **Report Issues**: If you see something suspicious, report it

## Disclosure Policy

* Security issues are disclosed responsibly
* We aim to respond to security reports within 48 hours
* Fixes are released as soon as possible
* Credit is given to security researchers who report issues

## Contact

For security concerns, please email: security@biasscan.ai

For general questions: support@biasscan.ai