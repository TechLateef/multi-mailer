"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = __importDefault(require("../services/emailService"));
async function sendWelcomeEmail() {
    const emailService = new emailService_1.default("techlateef@gmail.com");
    const template = "pugmail"; // Name of the template file (e.g., welcome.html)
    const params = {
        name: "mk yuh",
    };
    try {
        await emailService.sendEmail(template, "Welcome to Our Service", params);
        console.log("Welcome email sent successfully!");
    }
    catch (error) {
        console.error("Failed to send welcome email:", error);
    }
}
sendWelcomeEmail();
