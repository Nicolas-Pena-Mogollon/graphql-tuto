/*Example from: https://cs.lmu.edu/~ray/notes/javanetexamples/*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* Se define el esquema que tendrá en la base de datos de Mongodb*/
const movieSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	producer: {
		type: String,
		required: true
	}
}, {
	// Registro de la fecha y hora de modificación o creación del registro
	timestamps: true
});
/*Se define el modelo peliculas con el esquema*/
var Movies = mongoose.model('Movie', movieSchema);
module.exports = { Movies, movieSchema };