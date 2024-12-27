import { Schema, model } from 'mongoose';

interface Movie {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const movieSchema = new Schema<Movie>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  streamingLink: { type: String, required: true }
});

const MovieModel = model<Movie>('Movie', movieSchema);
export default MovieModel;
