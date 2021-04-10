/*Example from: https://cs.lmu.edu/~ray/notes/javanetexamples/*/
const express = require('express');
const mongoose = require('mongoose');
const schema = require('./schema');
const { ApolloServer } = require('apollo-server-express');
// Url del servidor de la base de datos
const url = "mongodb://localhost:27017/moviesdb";
// Se crea y configura la conexión con la base de datos
const connect = mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

connect.then((db) => {
	console.log('Connected correctly to server!');
}, (err) => {
	console.log(err);
});
/*
	Se crea una instancia de ApolloServer, que será el que a
	API Reference at https://www.apollographql.com/docs/apollo-server/api/apollo-server/
 */
const server = new ApolloServer({
	typeDefs: schema.typeDefs,
	resolvers: schema.resolvers
});

const app = express();
// Conecta el servidor de apolloServer al framework express
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`));