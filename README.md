# Multi-Mailer

Multi-Mailer is a flexible and easy-to-use email sending package that supports multiple providers like Brevo, Mailjet, SendGrid, and Mailgun. It allows you to send emails using HTML and Pug templates with ease.

## Features

- Support for multiple email providers (e.g., Brevo, Mailjet, SendGrid, Mailgun).
- Send emails with dynamic data using HTML or Pug templates.
- Easy configuration using environment variables.
- Attachments support.

## Installation

To install the package, run:

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory of your project and configure the following variables based on your SMTP provider.

### For Brevo

```env
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USERNAME=your_brevo_username
MAIL_PASSWORD=your_brevo_password
MAIL_SECURE=false
MAIL_FROM=your_email@example.com
TEMPLATE_PATH=src/core/helpers/mails/
```

### For Mailjet

```env
MAIL_HOST=in-v3.mailjet.com
MAIL_PORT=587
MAIL_USERNAME=your_mailjet_public_api_key
MAIL_PASSWORD=your_mailjet_private_api_key
MAIL_SECURE=false
MAIL_FROM=your_email@example.com
TEMPLATE_PATH=src/core/helpers/mails/
```

### For SendGrid

```env
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey # Use "apikey" as the username for SendGrid
MAIL_PASSWORD=your_sendgrid_api_key
MAIL_SECURE=false
MAIL_FROM=your_email@example.com
TEMPLATE_PATH=src/core/helpers/mails/
```

### For Mailgun

```env
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=your_mailgun_username
MAIL_PASSWORD=your_mailgun_password
MAIL_SECURE=false
MAIL_FROM=your_email@example.com
TEMPLATE_PATH=src/core/helpers/mails/
```

## Usage

### Sending an Email

Here's an example of how to send a welcome email:

```typescript
import EmailService from "./src/services/emailService";

async function sendWelcomeEmail() {
    const emailService = new EmailService(
        "recipient@example.com", // Recipient email
        "no-reply@example.com"   // Sender email
    );

    const template = "welcome"; // Name of the template file (e.g., welcome.html)
    const params = { name: "John Doe" };

    try {
        await emailService.sendEmail(template, "Welcome to Our Service", params);
        console.log("Welcome email sent successfully!");
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
}

sendWelcomeEmail();
```

### Templates

Place your email templates in the directory specified by the `TEMPLATE_PATH` environment variable. Supported formats are `.html` and `.pug`.

Example `welcome.html`:

```html
<html>
  <body>
    <h1>Welcome, {{name}}!</h1>
    <p>Thank you for joining our service.</p>
  </body>
</html>
```

## Running Tests

To run the tests, use:

```bash
npm test
```

## Publishing to npm

This project includes a GitHub Actions workflow to publish the package to npm when a new version tag is pushed. Ensure you have set the `NPM_TOKEN` secret in your repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Author

Abdullateef Mubarak