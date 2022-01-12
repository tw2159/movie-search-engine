const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedMovies` array in User.js
const movieSchema = new Schema({
  movieId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  genre: {
    type: String,
  },
  year: {
    type: String,
  },
  runtime: {
    type: String,
  },
  rated: {
    type: String,
  },
  plot: {
    type: String,
  },
  actors: {
    type: String,
  },
  director: {
    type: String,
  },
  writer: {
    type: String,
  },
});

module.exports = movieSchema;
