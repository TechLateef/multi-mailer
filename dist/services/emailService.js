"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const templateService_1 = __importDefault(require("./templateService"));
/**
 * EmailService handles sending emails using nodemailer and supports dynamic templates.
 */
class EmailService {
    /**
     * Creates an instance of EmailService.
     * @param from - The sender's email address.
     * @param to - The recipient's email address.
     * @param subject - The subject of the email.
     * @param templatePath - The base path for email templates.
     */
    constructor(from, to, subject, templatePath = process.env.TEMPLATE_PATH || "src/core/helpers/mails/") {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.transporter = this.createTransporter();
        this.templateService = new templateService_1.default(templatePath);
    }
    /**
     * Creates a nodemailer transporter instance.
     * @returns A configured Transporter instance.
     */
    createTransporter() {
        return (0, nodemailer_1.createTransport)({
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
    setTemplatePath(path) {
        this.templateService.setTemplatePath(path);
    }
    /**
     * Sends an email using the specified template and parameters.
     * @param template - The name of the template file (e.g., "welcome.pug" or "welcome.html").
     * @param params - An object containing dynamic data to replace placeholders in the template.
     * @param attachments - An array of attachments to include in the email.
     * @throws Will throw an error if the template format is unsupported or if sending fails.
     */
    async sendEmail(template, params = {}, attachments = []) {
        try {
            let html;
            if (template.endsWith(".pug")) {
                html = this.templateService.renderPugTemplate(template, params);
            }
            else if (template.endsWith(".html")) {
                const rawTemplate = this.templateService.loadTemplate(template);
                html = this.templateService.replacePlaceholders(rawTemplate, params);
            }
            else {
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
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}
exports.default = EmailService;
