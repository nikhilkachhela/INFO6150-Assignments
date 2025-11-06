import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'images')));

// Health
app.get('/', (req, res) => res.json({ ok: true, message: 'Assignment 8 API up' }));

// Routes (match the rubric)
app.use('/user', userRoutes);

// Swagger (loaded via fs so it works on all Node versions)
const swaggerDoc = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'swagger.json'), 'utf-8'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// 404 + error handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
});
