import express, { Express } from 'express';
import cors from 'cors';
import todoRoutes from './routes';
import { sequelize } from './database';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(todoRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Unable to connect to the database:', error);
  });
