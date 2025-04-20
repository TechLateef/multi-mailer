"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pug_1 = __importDefault(require("pug"));
/**
 * TemplateService handles loading and rendering email templates.
 */
class TemplateService {
    /**
     * Creates an instance of TemplateService.
     * @param templatePath - The base path for email templates.
     */
    constructor(templatePath) {
        this.templatePath = templatePath;
    }
    /**
     * Updates the base path for templates.
     * @param path - The new template path.
     */
    setTemplatePath(path) {
        this.templatePath = path;
    }
    /**
     * Loads an HTML template file from the specified path.
     * @param templateName - The name of the template file (without extension).
     * @returns The content of the HTML template as a string.
     * @throws Will throw an error if the file cannot be read.
     */
    loadTemplate(templateName) {
        const fullPath = path_1.default.join(this.templatePath, `${templateName}.html`);
        return fs_1.default.readFileSync(fullPath, 'utf-8');
    }
    /**
     * Renders a Pug template into an HTML string.
     * @param templateName - The name of the Pug template file (without extension).
     * @param data - An object containing dynamic data to inject into the template.
     * @returns The rendered HTML string.
     * @throws Will throw an error if the file cannot be read or compiled.
     */
    renderPugTemplate(templateName, data) {
        const fullPath = path_1.default.join(this.templatePath, `${templateName}.pug`);
        const compiledFunction = pug_1.default.compile(fs_1.default.readFileSync(fullPath, 'utf-8'));
        return compiledFunction(data);
    }
    /**
     * Replaces placeholders in a template string with dynamic data.
     * @param template - The template string containing placeholders (e.g., "{{key}}").
     * @param params - An object containing key-value pairs to replace placeholders.
     * @returns The template string with placeholders replaced by actual values.
     */
    replacePlaceholders(template, params) {
        return Object.keys(params).reduce((acc, key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            return acc.replace(regex, params[key]);
        }, template);
    }
}
exports.default = TemplateService;
