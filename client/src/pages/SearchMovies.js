import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchMovies, getMovieDetails } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

import { useMutation } from '@apollo/react-hooks';
import { SAVE_MOVIE } from '../utils/mutations';

const SearchMovies = () => {
  // create state for holding returned movie data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved movieId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
  const [saveMovie] = useMutation(SAVE_MOVIE);

  // save `savedMovieIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // create method to search for movies and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      // clear the SearchedMovies state before performing the search
      setSearchedMovies([]);
      const response = await searchMovies(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const items = response.json();
      const results = (await items).Search;

      if(results === undefined) {
        return false;
      }
     
      for(let i = 0; i < results.length; i++) {
        getMovieData(results[i].imdbID);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await getMovieDetails(movieId);
      const items = response.json();
      const results = (await items)

      const movieData = {
        movieId: results.imdbID,
        title: results.Title,
        poster: results.Poster,
        genre: results.Genre,
        year: results.Year,
        runtime: results.Runtime,
        rated: results.Rated,
        plot: results.Plot,
        actors: results.Actors,
        director: results.Director,
        writer: results.Writer
      }
      setSearchedMovies(searchedMovies => [...searchedMovies, movieData]);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a movie to our database
  const handleSaveMovie = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await saveMovie({
        variables: { input: movieToSave }
      });

      // if movie successfully saves to user's account, save movie id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light'>
        <Container>
          <h1>Search for Movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={9}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                />
              </Col>
              <Col xs={12} md={3}>
                <Button type='submit' size='lg' className="search-button">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : ''}
        </h2>
        <div className="results">
          {searchedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.poster !== "N/A" ? (
                  <img src={movie.poster} className="movie-poster" alt={`${movie.title}`} />
                ) : (
                  <div className="movie-empty-poster"></div>
                )}
                <Card.Body>
                  <h3>{movie.title}</h3>
                  <span className="movie-details">{movie.genre} • {movie.year} • {movie.runtime} • {movie.rated}</span>
                  <div className="about">{movie.plot}</div>
                  <div className="cast">{movie.actors}</div>
                  <div className="director">{movie.director}</div>
                  <div className="writer">{movie.writer}</div>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie been saved!'
                        : 'Save this movie!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default SearchMovies;
