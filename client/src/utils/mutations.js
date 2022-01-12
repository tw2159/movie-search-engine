import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($input: movieInput!) {
    saveMovie (input: $input) {
      _id
      username
      email
      movieCount
      savedMovies {
        # _id
        movieId
        title
        poster
        genre
        year
        runtime
        rated
        plot
        actors
        director
        writer     
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: String!) {
    removeMovie(movieId:$movieId) {
      _id
      username
      email
      movieCount
      savedMovies {
        # _id
        movieId
        title
        poster
        genre
        year
        runtime
        rated
        plot
        actors
        director
        writer
      }
    }
  }
`;
