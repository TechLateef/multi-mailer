"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const templateService_1 = __importDefault(require("./templateService"));
const path_1 = require("path");
const fs_1 = require("fs");
const dotenv_1 = __importDefault(require("dotenv")); // Load environment variables from .env file
dotenv_1.default.config();
class EmailService {
    constructor(to, from, templatePath = process.env.TEMPLATE_PATH || "") {
        this.to = to;
        this.from = from;
        this.transporter = this.createTransporter();
        this.templatePath = templatePath; // Store templatePath as a class property
        this.templateService = new templateService_1.default(this.templatePath);
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
     * Sends an email using the specified template and parameters.
     * @param template - The name of the template file (e.g., "welcome.pug" or "welcome.html").
     * @param params - An object containing dynamic data to replace placeholders in the template.
     * @param attachments - An array of attachments to include in the email.
     * @throws Will throw an error if the template format is unsupported or if sending fails.
     */
    async sendEmail(template, subject, params = {}, attachments = []) {
        try {
            let html;
            // console.log("Base template path:", this.templatePath);
            // Dynamically resolve the template file with its extension
            const filesInPath = (0, fs_1.readdirSync)(this.templatePath); // Get all files in the template directory
            const matchingFile = filesInPath.find(file => file.startsWith(template) && (file.endsWith(".pug") || file.endsWith(".html")));
            if (!matchingFile) {
                throw new Error(`Template not found: ${template}. Ensure the template exists in the specified path.`);
            }
            const fullTemplatePath = (0, path_1.join)(this.templatePath, matchingFile); // Construct the full path to the template
            // console.log("Resolved template path:", fullTemplatePath);
            // Render the template based on its extension
            const extension = (0, path_1.extname)(fullTemplatePath); // Get the file extension
            if (extension === ".pug") {
                html = this.templateService.renderPugTemplate(template, params);
            }
            else if (extension === ".html") {
                const rawTemplate = this.templateService.loadTemplate(template);
                html = this.templateService.replacePlaceholders(rawTemplate, params);
            }
            else {
                throw new Error("Unsupported template format. Use .pug or .html.");
            }
            const mailOptions = {
                from: process.env.MAIL_FROM || this.from,
                to: this.to,
                subject: subject,
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
