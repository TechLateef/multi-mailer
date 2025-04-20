import EmailService from "../services/emailService";
import TemplateService from "../services/templateService";

describe("EmailService", () => {
    const mockFrom = "test@example.com";
    const mockTo = "recipient@example.com";
    const mockSubject = "Test Subject";
    const mockTemplatePath = "src/templates";

    let emailService: EmailService;

    beforeEach(() => {
        emailService = new EmailService(mockFrom, mockTo, mockSubject, mockTemplatePath);
    });

    it("should be defined", () => {
        expect(emailService).toBeDefined();
    });

    it("should have a sendEmail method", () => {
        expect(typeof emailService.sendEmail).toBe("function");
    });
    it("should create a nodemailer transporter", () => {
        const transporter = emailService["createTransporter"]();
        expect(transporter).toBeDefined();
    });
});

describe("TemplateService", () => {
    const mockTemplatePath = "src/templates";
    let templateService: TemplateService;

    beforeEach(() => {
        templateService = new TemplateService(mockTemplatePath);
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