import EmailService from "../services/emailService";

async function sendWelcomeEmail() {

    const emailService = new EmailService(
        "techlateef@gmail.com",     // Recipient email
    );

    const template = "pugmail"; // Name of the template file (e.g., welcome.html)
    const params = {
        name: "mk yuh",
    };


    try {
        await emailService.sendEmail(template, "Welcome to Our Service", params);
        console.log("Welcome email sent successfully!");
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
}

sendWelcomeEmail();