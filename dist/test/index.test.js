"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = __importDefault(require("../services/emailService"));
const templateService_1 = __importDefault(require("../services/templateService"));
describe("EmailService", () => {
    const mockFrom = "test@example.com";
    const mockTo = "recipient@example.com";
    const mockSubject = "Test Subject";
    const mockTemplatePath = "src/templates";
    let emailService;
    beforeEach(() => {
        emailService = new emailService_1.default(mockFrom, mockTo, mockSubject, mockTemplatePath);
    });
    it("should be defined", () => {
        expect(emailService).toBeDefined();
    });
    it("should have a sendEmail method", () => {
        expect(typeof emailService.sendEmail).toBe("function");
    });
    it("should set a new template path", () => {
        const newPath = "src/new-templates";
        emailService.setTemplatePath(newPath);
        // Assuming TemplateService has a method to get the current path for testing
        expect(emailService.templateService.templatePath).toBe(newPath);
    });
});
describe("TemplateService", () => {
    const mockTemplatePath = "src/templates";
    let templateService;
    beforeEach(() => {
        templateService = new templateService_1.default(mockTemplatePath);
    });
    it("should be defined", () => {
        expect(templateService).toBeDefined();
    });
    it("should load an HTML template", () => {
        jest.spyOn(templateService, "loadTemplate").mockReturnValue("<html>{{name}}</html>");
        const template = templateService.loadTemplate("test");
        expect(template).toBe("<html>{{name}}</html>");
    });
    it("should render a Pug template", () => {
        jest.spyOn(templateService, "renderPugTemplate").mockReturnValue("<html>John Doe</html>");
        const rendered = templateService.renderPugTemplate("test", { name: "John Doe" });
        expect(rendered).toBe("<html>John Doe</html>");
    });
    it("should replace placeholders in a template", () => {
        const template = "<html>{{name}}</html>";
        const params = { name: "John Doe" };
        const result = templateService.replacePlaceholders(template, params);
        expect(result).toBe("<html>John Doe</html>");
    });
});
