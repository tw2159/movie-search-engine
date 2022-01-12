const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(input: movieInput): User
    removeMovie(movieId: String!): User
  }
  input movieInput {
    movieId: String
    title: String
    poster: String
    genre: String
    year: String
    runtime: String
    rated: String
    plot: String
    actors: String
    director: String
    writer: String
  }
  type User {
    _id: ID
    username: String
    email: String
    movieCount: Int
    savedMovies: [Movie]
  }
  type Movie {
    movieId: String
    title: String
    poster: String
    genre: String
    year: String
    runtime: String
    rated: String
    plot: String
    actors: String
    director: String
    writer: String
  }
  type Auth {
    token: ID
    user: User
  }
`;

module.exports = typeDefs; 
