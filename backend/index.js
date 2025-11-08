import express from 'express';
import eventRoute from './routes/eventRoutes.js';
import taskRoute from './routes/taskRoutes.js';
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/events', eventRoute);
app.use('/api/tasks', taskRoute)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});