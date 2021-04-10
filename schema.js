/*Example from: https://cs.lmu.edu/~ray/notes/javanetexamples/*/
const { gql } = require('apollo-server-express');
const Movie = require('./models/movie').Movies;
/*
	Se construye el esquema usando el lenguaje de esquemas de GraphQL,
	Tipo sistema (Objeto), Query con campos getMovies y getMovie, 
	y por último Mutation con campos addMovie, updateMovie y deleteMovie
*/
const typeDefs = gql`
   type Movie {
     id: ID!
     name: String!
     producer: String!
     rating: Float!
   }
   type Query {
     getMovies: [Movie]
     getMovie(id: ID!): Movie
   }
   type Mutation {
     addMovie(name: String!, producer: String!, rating: Float!): Movie
     updateMovie(id: ID!, name: String!, producer: String!, rating: Float): Movie
     deleteMovie(id: ID!): Movie
   }
`
/*
	Se declaran los resolvers (funciones que se encargan de completar los datos 
	de un solo campo en el esquema), parent es el objeto.
*/
const resolvers = {
	Query: {
		getMovies: () => {
			// Retorna todas las peliculas de la base de datos
			return Movie.find({});
		},
		getMovie: (parent, args) => {
			// Retorna una pelicula con determinado ID
			return Movie.findById(args.id);
		}
	},
	Mutation: {
		// Añade una película a la base de datos
		addMovie: (parent, args) => {
			// Crea la película
			var movie = new Movie({
				name: args.name,
				producer: args.producer,
				rating: args.rating,
			});
			return movie.save();
		},
		// Actualiza la información de una película con el ID
		updateMovie: (parent, args) => {
			if (!args.id) return;
			return Movie.findOneAndUpdate(
				{
					_id: args.id
				},
				{// Le otorga los nuevos valores a la película
					$set: {
						name: args.name,
						producer: args.producer,
						rating: args.rating,
					}
				}, { new: true }, (err, Movie) => {
					if (err) {
						console.log('Something went wrong when updating the movie');
					}
				}
			);
		},
		// Busca una película por ID y la elimina
		deleteMovie: (parent, args) => {
			if (!args.id) return;
			return Movie.findByIdAndRemove({
				_id: args.id
			},
				function(err, Movie) {
					if (err) {
						return console.log(err);
					}
				});
		}
	}
}
module.exports = { resolvers, typeDefs };