import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import userRoutes from './routes/userRoutes.js';
import scheduler from './utils/scheduler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Ruta para servir archivos estáticos del directorio frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de la API
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/loans', loanRoutes);
app.use('/users', userRoutes);

// Programar tareas
scheduler.scheduleBackups();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});