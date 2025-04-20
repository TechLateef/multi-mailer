import { createTransport, Transporter } from "nodemailer";
import TemplateService from "./templateService";
import { join, extname } from "path";
import { existsSync, readdirSync } from "fs";
import dotenv from "dotenv"; // Load environment variables from .env file

dotenv.config();



class EmailService {
    private transporter: Transporter;
    private templateService: TemplateService;
    private templatePath: string;


    
    constructor(
        private to: string,
        private subject: string,
        private from?: string,
        templatePath: string = process.env.TEMPLATE_PATH || "src/examples/mails/",
       
    ) {
        this.transporter = this.createTransporter();
        this.templatePath = templatePath; // Store templatePath as a class property
        this.templateService = new TemplateService(this.templatePath);
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
     * Sends an email using the specified template and parameters.
     * @param template - The name of the template file (e.g., "welcome.pug" or "welcome.html").
     * @param params - An object containing dynamic data to replace placeholders in the template.
     * @param attachments - An array of attachments to include in the email.
     * @throws Will throw an error if the template format is unsupported or if sending fails.
     */
    public async sendEmail(template: string, params: any = {}, attachments: any[] = []): Promise<void> {
        try {
            let html: string;
            // console.log("Base template path:", this.templatePath);

            // Dynamically resolve the template file with its extension
            const filesInPath = readdirSync(this.templatePath); // Get all files in the template directory
            const matchingFile = filesInPath.find(file => file.startsWith(template) && (file.endsWith(".pug") || file.endsWith(".html")));

            if (!matchingFile) {
                throw new Error(`Template not found: ${template}. Ensure the template exists in the specified path.`);
            }

            const fullTemplatePath = join(this.templatePath, matchingFile); // Construct the full path to the template
            console.log("Resolved template path:", fullTemplatePath);

            // Render the template based on its extension
            const extension = extname(fullTemplatePath); // Get the file extension
            if (extension === ".pug") {
                html = this.templateService.renderPugTemplate(template, params);
            } else if (extension === ".html") {
                const rawTemplate = this.templateService.loadTemplate(template);
                html = this.templateService.replacePlaceholders(rawTemplate, params);
            } else {
                throw new Error("Unsupported template format. Use .pug or .html.");
            }

            const mailOptions = {
                from:process.env.MAIL_FROM || this.from,
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