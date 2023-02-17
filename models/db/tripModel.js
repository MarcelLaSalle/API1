const mongoose = require(`mongoose`);
// const userSchema = mongoose.Schema({
//     email: String,
//     firstName: String,
//     lastName: String,
// });

const tripSchema = mongoose.Schema({
    aeropuertoOrigen: String,
    aeropuertoDestino: String,
    fechaSalida: String,
    fechaLlegada: String,    
    precio: Number,
    nombrePasajero:String
});

module.exports = mongoose.model(`Trip`, tripSchema);