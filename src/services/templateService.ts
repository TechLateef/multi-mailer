import fs from 'fs';
import path from 'path';
import pug from 'pug';

/**
 * TemplateService handles loading and rendering email templates.
 */
class TemplateService {
    private templatePath: string;

    /**
     * Creates an instance of TemplateService.
     * @param templatePath - The base path for email templates.
     */
    constructor(templatePath: string) {
        this.templatePath = templatePath;
    }

    /**
     * Updates the base path for templates.
     * @param path - The new template path.
     */
    public setTemplatePath(path: string): void {
        this.templatePath = path;
    }

    /**
     * Loads an HTML template file from the specified path.
     * @param templateName - The name of the template file (without extension).
     * @returns The content of the HTML template as a string.
     * @throws Will throw an error if the file cannot be read.
     */
    public loadTemplate(templateName: string): string {
        const fullPath = path.join(this.templatePath, `${templateName}.html`);
        return fs.readFileSync(fullPath, 'utf-8');
    }

    /**
     * Renders a Pug template into an HTML string.
     * @param templateName - The name of the Pug template file (without extension).
     * @param data - An object containing dynamic data to inject into the template.
     * @returns The rendered HTML string.
     * @throws Will throw an error if the file cannot be read or compiled.
     */
    public renderPugTemplate(templateName: string, data: any): string {
        const fullPath = path.join(this.templatePath, `${templateName}.pug`);
        const compiledFunction = pug.compile(fs.readFileSync(fullPath, 'utf-8'));
        return compiledFunction(data);
    }

    /**
     * Replaces placeholders in a template string with dynamic data.
     * @param template - The template string containing placeholders (e.g., "{{key}}").
     * @param params - An object containing key-value pairs to replace placeholders.
     * @returns The template string with placeholders replaced by actual values.
     */
    public replacePlaceholders(template: string, params: any): string {
        return Object.keys(params).reduce((acc, key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            return acc.replace(regex, params[key]);
        }, template);
    }
}

export default TemplateService;