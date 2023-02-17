const tripService = require(`../services/tripService`);

module.exports.findById = async (req, res) => {
    const responseObj = { status: 500, message: `Internal server error` };
    try {
        const tripId = req.params.id;
        const responseFromService = await tripService.findById(tripId);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = `Trip fetched successfully`;
                responseObj.status = 200;
            } else {
                responseObj.message = `Trip not found`;
                responseObj.status = 404;
            }
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-tripController-findById: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
};

module.exports.getAll = async (req, res) => {
    const responseObj = { status: 500, message: `Internal server error` };
    try {
        const skip = req.query.skip;
        const limit = req.query.limit;
        const tripId = req.params.id;
        const responseFromService = await tripService.getAll(skip, limit);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = `Trips fetched successfully`;
                responseObj.status = 200;
            } else {
                responseObj.message = `Trips not found`;
                responseObj.status = 404;
            }
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-tripController-getAll: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
};

module.exports.create = async (req, res) => {
    const response = { status: 500, message: 'Server error'};
    try {
        const trip = req.body;

        const responseFromService = await tripService.create(trip);
        if (responseFromService.status) {
            response.status = 201;
            response.message = 'Trip created successfully!';
            response.result = responseFromService.result;
        }
    } catch (err) {
        console.log('tripController-create:', err);
    }
    return res.status(response.status).send(response);
}

module.exports.update = async (req, res) => {
    const response = { status: 500, message: 'Server error'};
    try {
    const trip = req.body;
    trip.id = req.params.id;

    const responseFromService = await tripService.update(trip);
    if (responseFromService.status) {
        response.status = 200;
        response.message = 'Trip updated successfully!';
        response.result = responseFromService.result;
    }
    } catch (err) {
    console.log('TripController-update:', err);
    }
    return res.status(response.status).send(response);
}

module.exports.delete = async (req, res) => {
    const response = { status: 500, message: 'Server error'};
    try {
    const tripId = req.params.id;

    const responseFromService = await tripService.delete(tripId);
    if (responseFromService.status) {
        response.status = 200;
        response.message = 'Trip deleted successfully!';
        response.result = responseFromService.result;
    } else {
        response.status = 404;
        response.message = 'Trip id not found';
    }
    } catch (err) {
    console.log('TripController-delete:', err);
    }
    return res.status(response.status).send(response);
}