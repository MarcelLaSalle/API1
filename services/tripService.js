const crudRepository = require(`../db/crudRepository`);
const Trip = require(`../models/db/tripModel`);
const mongoose = require(`mongoose`);

module.exports.findById = async (tripId) => {
    const responseObj = { status: false };
    try {
        const data = {
            _id:  mongoose.Types.ObjectId(tripId),
            model: Trip,
            projection: { __v: false }
        };
        const responseFromRepository = await crudRepository.findById(data);
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result;
            responseObj.status = true;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-tripService-findById: ${error}`);
    }
    return responseObj;
};

module.exports.getAll = async (skip, limit) => {
    const responseObj = { status: false };
    try {
        const data = {
            model: Trip,
            projection: {},
            findQuery: {
            },
            skip,
            limit
        };
        const responseFromRepository = await crudRepository.getAll(data);
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result;
            responseObj.status = true;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-tripService-getAll: ${error}`);
    }
    return responseObj;
};

module.exports.create = async (trip) => {
    try {
        const tripToSave = new Trip(trip);
        const responseFromRepository = await crudRepository.create(tripToSave);
        if (responseFromRepository.status) {
            return responseFromRepository;
        }
    } catch (err) {
    console.log('tripService-create:', err);
    return { status: false };
    }
}

module.exports.update = async (trip) => {
    try {
        const data = {
            model: Trip,
            findQuery: { _id: mongoose.Types.ObjectId(trip.id) },
            findUpdate: {},
            projection: {},
        };
        if (trip.aeropuertoOrigen) data.findUpdate.aeropuertoOrigen = trip.aeropuertoOrigen;
        if (trip.aeropuertoDestino) data.findUpdate.aeropuertoDestino = trip.aeropuertoDestino;
        if (trip.fechaSalida) data.findUpdate.fechaSalida = trip.fechaSalida;
        if (trip.fechaLlegada) data.findUpdate.fechaLlegada = trip.fechaLlegada;
        if (trip.precio) data.findUpdate.precio = trip.precio;
        if (trip.nombrePasajero) data.findUpdate.nombrePasajero = trip.nombrePasajero;


        const responseFromRepository = await crudRepository.update(data);

        if (responseFromRepository.status) {
            return responseFromRepository;
        }
    } catch (err) {
        console.log('tripService-update:', err);
    }
    return { status: false };
}

module.exports.delete = async (tripId) => {
    try {
    const data = {
        model: Trip,
        findQuery: { _id: mongoose.Types.ObjectId(tripId) },
        projection: {},
    };
    const responseFromRepository = await crudRepository.delete(data);
    
    if (responseFromRepository.status) {
        return responseFromRepository;
    }
    } catch (err) {
        console.log('tripService-delete:', err);
    }
    return { status: false };
}
