import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';

import {useMutation, useQuery} from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';

const SavedMovies = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  const userData = data?.me || {};

  // create function that accepts the movie's mongo _id value as param and deletes the movie from the database
  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await removeMovie({
        variables: { movieId }
      });

      // upon success, remove movie's id from localStorage
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      {/*
      <Jumbotron fluid className='text-light'>
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      */}
      <Container>
        <h2 className="saved-movies-results">
          {userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${userData.savedMovies.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <div className="results">
          {userData.savedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.poster ? (
                  <img src={movie.poster} className="movie-poster" alt={`${movie.title}`} />
                ) : null}
                <Card.Body>
                  <h3>{movie.title}</h3>
                  <span className="movie-details">{movie.genre} • {movie.year} • {movie.runtime} • {movie.rated}</span>
                  <div className="about">{movie.plot}</div>
                  <div className="cast">{movie.actors}</div>
                  <div className="director">{movie.director}</div>
                  <div className="writer">{movie.writer}</div>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                    Delete this movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default SavedMovies;
