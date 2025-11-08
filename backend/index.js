import express from 'express';
import eventRoute from './routes/eventRoutes.js';
import taskRoute from './routes/taskRoutes.js';
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/events', eventRoute);
app.use('/api/tasks', taskRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});