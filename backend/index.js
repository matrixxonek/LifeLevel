import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import eventRoute from './routes/eventRoutes.js';
import taskRoute from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT;
app.use(cors({
    origin: ['http://localhost:5173']
}));

app.use(express.json());
app.use('/api/events', eventRoute);
app.use('/api/tasks', taskRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});