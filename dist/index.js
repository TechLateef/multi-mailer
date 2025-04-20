"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = exports.EmailService = void 0;
const emailService_1 = __importDefault(require("./services/emailService"));
exports.EmailService = emailService_1.default;
const templateService_1 = __importDefault(require("./services/templateService"));
exports.TemplateService = templateService_1.default;
