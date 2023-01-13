const mongoose = require(`mongoose`);
// const userSchema = mongoose.Schema({
//     email: String,
//     firstName: String,
//     lastName: String,
// });

const filmSchema = mongoose.Schema({
    film: String,
    director: String,
    releaseDate: String
});

module.exports = mongoose.model(`Film`, filmSchema);