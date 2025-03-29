export interface EmailOptions {
    to: string;
    from: string;
    subject: string;
    html?: string;
    text?: string;
    attachments?: Array<{
        filename: string;
        path: string;
    }>;
}

export interface TemplateOptions {
    templateName: string;
    params?: Record<string, any>;
}