import express, { Request, Response } from 'express';
import MovieModel from '../models/movie.model';

// List all movies
export const listMovies = async (req: Request, res: Response) => {
  try {
    const movies = await MovieModel.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Search for a movie by title or genre
export const searchMovies = async (req: Request, res: Response) => {
  try {
    const query = req.query.q;
    if (typeof query !== 'string') {
        return res.status(400).json({ message: 'Query must be a string' });
      }
    const movies = await MovieModel.find
    ({
    $or: [
        { title: { $regex: new RegExp(query, 'i') } },
        { genre: { $regex: new RegExp(query, 'i') } }
      ]
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Add a new movie
export const addMovie = async (req: Request, res: Response) => {
  try {
    const newMovie = new MovieModel(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Update an existing movie
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
    
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Delete a movie
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(req.params.id);
    
    if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
