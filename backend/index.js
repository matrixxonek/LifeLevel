import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import eventRoute from './routes/eventRoutes.js';
import authRoute from './routes/authRoutes.js';
import taskRoute from './routes/taskRoutes.js';
import setupAssociations from './models/associations.js';
import sequelize from './config/db.js';
import internalRoute from './routes/internalRoutes.js';

const app = express();
const PORT = process.env.PORT;

setupAssociations();
sequelize.sync({ alter: true })
  .then(() => console.log("Baza zsynchronizowana"))
  .catch(err => console.log("Błąd:", err));

app.use(cors({
    origin: ['http://localhost:5173']
}));

app.use(express.json());

app.use('/api/events', eventRoute);
app.use('/api/tasks', taskRoute)
app.use('/api/auth', authRoute);
app.use('/api/internal', internalRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});