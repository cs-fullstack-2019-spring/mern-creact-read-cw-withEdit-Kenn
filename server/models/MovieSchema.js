// These are default MongoDB and Mongoose requirements for the schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a temporary variable to store your new schema
var MovieSchema = new Schema(
    {
        movieName: String,
        genre: String,
        cast: {
            mainActor: String,
            mainActress: String,
            supportingActor: String,
            supportingActress: String,
        },
    }
);

//Export model with the temporary variable
module.exports = mongoose.model('movie', MovieSchema);