import express, { Application, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import config from './config';
import { logger } from './utils/logger';

const app: Application = express();
const prisma = new PrismaClient();

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// CORS configuration
app.use(cors({
  origin: config.cors.origin,
  optionsSuccessStatus: 200,
}));

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Projects routes
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    const { title, description, imageUrl, githubUrl, demoUrl, tags } = req.body;
    const project = await prisma.project.create({
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
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project' });
  }
});

export default app;
