import EmailService from "../services/emailService";

async function sendWelcomeEmail() {
    const emailService = new EmailService(
        "no-reply@example.com", // Sender email
        "user@example.com",     // Recipient email
        "Welcome to Our Service" // Email subject
    );

    const template = "welcome"; // Name of the template file (e.g., welcome.html)
    const params = {
        name: "John Doe",
    };


    try {
        await emailService.sendEmail(template, params);
        console.log("Welcome email sent successfully!");
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
}

sendWelcomeEmail();