const crudRepository = require(`../db/crudRepository`);
const Film = require(`../models/db/filmModel`);
const mongoose = require(`mongoose`);

module.exports.findById = async (userId) => {
    const responseObj = { status: false };
    try {
        const data = {
            _id:  mongoose.Types.ObjectId(userId),
            model: Film,
            projection: { __v: false }
        };
        const responseFromRepository = await crudRepository.findById(data);
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result;
            responseObj.status = true;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-userService-findById: ${error}`);
    }
    return responseObj;
};

module.exports.getAll = async (skip, limit) => {
    const responseObj = { status: false };
    try {
        const data = {
            model: Film,
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
        console.log(`ERROR-userService-getAll: ${error}`);
    }
    return responseObj;
};
