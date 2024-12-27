import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app'
import MovieModel from '../models/movie.model';

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.MONGODB_URI!);
});

afterAll(async () => {
  // Clean up and close the connection
  await MovieModel.deleteMany({});
  await mongoose.connection.close();
});

describe('Movies API', () => {
  
  it('should list all movies', async () => {
    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should add a new movie', async () => {
    const newMovie = {
      title: "The Matrix",
      genre: "Sci-Fi",
      rating: 8.7,
      streamingLink: "http://example.com/matrix"
    };

    const response = await request(app).post('/movies').send(newMovie);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newMovie.title);
  });

  it('should search for a movie by title', async () => {
    const response = await request(app).get('/search?q=Matrix');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].title).toBe("The Matrix");
  });

  it('should update an existing movie', async () => {
    const movie = await MovieModel.create({
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      streamingLink: "http://example.com/inception"
    });

    const updatedData = { rating: 9.0 };
    const response = await request(app).put(`/movies/${movie._id}`).send(updatedData);
    
    expect(response.status).toBe(200);
    expect(response.body.rating).toBe(updatedData.rating);
  });

  it('should delete a movie', async () => {
    const movie = await MovieModel.create({
      title: "Interstellar",
      genre: "Sci-Fi",
      rating: 8.6,
      streamingLink: "http://example.com/interstellar"
    });

    const response = await request(app).delete(`/movies/${movie._id}`);
    
    expect(response.status).toBe(204);

    // Verify deletion
    const deletedMovie = await MovieModel.findById(movie._id);
    expect(deletedMovie).toBeNull();
  });
});
