# Email Sender Package

A simple and flexible email sending package that supports Brevo and other mail services. This package allows you to send emails using HTML and Pug templates, with easy configuration through environment variables.

## Features

- Send emails using various mail services.
- Support for HTML and Pug templates.
- Easy configuration with environment variables.
- Template path management.

## Installation

To install the package, run:

```
npm install email-sender-package
```

## Usage

### Configuration

Create a `.env` file in your project root and add the following environment variables:

```
MAIL_SERVICE_HOST=smtp-relay.brevo.com
MAIL_SERVICE_PORT=587
MAIL_SERVICE_USERNAME=your_username
MAIL_SERVICE_PASSWORD=your_password
```

### Sending Emails

```typescript
import { EmailService } from 'email-sender-package';

const emailService = new EmailService({
  to: 'recipient@example.com',
  from: 'sender@example.com',
  subject: 'Hello World',
});

// Send an email with HTML template
emailService.sendEmail('welcome', 'Welcome to Our Service', { name: 'User' });

```

## API Reference

### EmailService

- `constructor(options: EmailOptions)`: Initializes the email service with the provided options.
- `sendEmail(template: string, subject: string, params: any)`: Sends an email using the specified HTML template.

### TemplateService

- `setTemplatePath(path: string)`: Sets the path for loading templates.
- `loadTemplate(template: string)`: Loads the specified template and returns the content.

## Contribution

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and concise messages.
4. Push your branch to your forked repository.
5. Open a pull request to the main repository.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## Supported Email Providers

This package currently supports the following email providers:

- **Brevo**: A reliable email service provider for transactional and marketing emails.
- **Mailjet**: A powerful email API for sending and tracking emails.

To use a specific provider, configure the environment variables accordingly in your `.env` file. For example, for Mailjet:

```
MAIL_SERVICE_HOST=in-v3.mailjet.com
MAIL_SERVICE_PORT=587
MAIL_SERVICE_USERNAME=your_mailjet_api_key
MAIL_SERVICE_PASSWORD=your_mailjet_secret_key
```

## Examples

Here are some additional examples to help you get started:

### Using Pug Templates

```typescript
emailService.sendEmail('welcome.pug', 'Welcome to Our Service', { name: 'User' });
```

### Using Plain Text Emails

```typescript
emailService.sendPlainTextEmail('Hello, this is a plain text email!');
```

### Customizing Template Path

```typescript
import { TemplateService } from 'email-sender-package';

const templateService = new TemplateService();
templateService.setTemplatePath('/path/to/templates');
```

Feel free to explore and adapt these examples to suit your needs!

## License

This project is licensed under the MIT License. See the LICENSE file for details.