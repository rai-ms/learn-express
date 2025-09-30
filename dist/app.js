"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./utils/logger");
const prisma_1 = __importDefault(require("./utils/prisma"));
const app = (0, express_1.default)();
// Logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger_1.logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    });
    next();
});
// CORS configuration
app.use((0, cors_1.default)({
    origin: config_1.default.cors.origin,
    optionsSuccessStatus: 200,
}));
// Middleware
app.use(express_1.default.json());
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
// Projects routes
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await prisma_1.default.project.findMany();
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});
app.post('/api/projects', async (req, res) => {
    try {
        const { title, description, imageUrl, githubUrl, demoUrl, tags } = req.body;
        const project = await prisma_1.default.project.create({
            data: {
                title,
                description,
                imageUrl,
                githubUrl,
                demoUrl,
                tags,
            },
        });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create project' });
    }
});
exports.default = app;
