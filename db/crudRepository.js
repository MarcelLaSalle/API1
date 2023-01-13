module.exports.findById = async (data) => {
    let responseObj = { status: false };
    try {
        const doc = await data.model.findById(data._id, data.projection);
        responseObj = {
            result: doc,
            status: true
        };
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-crudRepository-findById: ${error}`);
    }
    return responseObj;
};

module.exports.getAll = async (data) => {
    let responseObj = { status: false };
    try {
        const doc = await data.model.find(data.findQuery, data.projection).skip(data.skip).limit(data.limit);
        responseObj = {
            result: doc,
            status: true
        };
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-crudRepository-getAll: ${error}`);
    }
    return responseObj;
};