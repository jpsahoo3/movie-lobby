import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import moviesRoutes from './routes/movies.routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/movies', moviesRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

export default app