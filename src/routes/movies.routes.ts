import express from 'express';
import * as MoviesController from '../controllers/movies.controller';

const router = express.Router();

// List all movies
router.get('/', MoviesController.listMovies);

// Search for a movie by title or genre
router.get('/search', MoviesController.searchMovies);

// Add a new movie (admin role check can be added)
router.post('/', MoviesController.addMovie);

// Update an existing movie
router.put('/:id', MoviesController.updateMovie);

// // Delete a movie
router.delete('/:id', MoviesController.deleteMovie);

export default router;
