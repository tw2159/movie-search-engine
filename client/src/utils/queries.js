import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      movieCount
      savedMovies {
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
