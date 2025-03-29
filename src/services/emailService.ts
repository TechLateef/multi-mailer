import { createTransport, Transporter } from "nodemailer";
import TemplateService from "./templateService";

/**
 * EmailService handles sending emails using nodemailer and supports dynamic templates.
 */
class EmailService {
    private transporter: Transporter;
    private templateService: TemplateService;

    /**
     * Creates an instance of EmailService.
     * @param from - The sender's email address.
     * @param to - The recipient's email address.
     * @param subject - The subject of the email.
     * @param templatePath - The base path for email templates.
     */
    constructor(
        private from: string,
        private to: string,
        private subject: string,
        templatePath: string = process.env.TEMPLATE_PATH || "src/core/helpers/mails/"
    ) {
        this.transporter = this.createTransporter();
        this.templateService = new TemplateService(templatePath);
    }

    /**
     * Creates a nodemailer transporter instance.
     * @returns A configured Transporter instance.
     */
    private createTransporter(): Transporter {
        return createTransport({
            host: process.env.MAIL_HOST || "",
            port: Number(process.env.MAIL_PORT) || 587,
            secure: process.env.MAIL_SECURE === "true",
            auth: {
                user: process.env.MAIL_USERNAME || "",
                pass: process.env.MAIL_PASSWORD || "",
            },
        });
    }

    /**
     * Updates the template path for the TemplateService.
     * @param path - The new template path.
     */
    public setTemplatePath(path: string): void {
        this.templateService.setTemplatePath(path);
    }

    /**
     * Sends an email using the specified template and parameters.
     * @param template - The name of the template file (e.g., "welcome.pug" or "welcome.html").
     * @param params - An object containing dynamic data to replace placeholders in the template.
     * @param attachments - An array of attachments to include in the email.
     * @throws Will throw an error if the template format is unsupported or if sending fails.
     */
    public async sendEmail(template: string, params: any = {}, attachments: any[] = []): Promise<void> {
        try {
            let html: string;

            if (template.endsWith(".pug")) {
                html = this.templateService.renderPugTemplate(template, params);
            } else if (template.endsWith(".html")) {
                const rawTemplate = this.templateService.loadTemplate(template);
                html = this.templateService.replacePlaceholders(rawTemplate, params);
            } else {
                throw new Error("Unsupported template format. Use .pug or .html.");
            }

            const mailOptions = {
                from: this.from,
                to: this.to,
                subject: this.subject,
                html,
                attachments,
            };

            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}

export default EmailService;