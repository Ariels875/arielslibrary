import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';
import loanRoutes from './routes/loanRoutes';
import userRoutes from './routes/userRoutes';
import scheduler from './utils/scheduler';


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/loans', loanRoutes);
app.use('/users', userRoutes);

scheduler.scheduleBackups(); // Programar backups automáticos

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
