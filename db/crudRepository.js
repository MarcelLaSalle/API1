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

module.exports.create = async(objToSave) => {
    try {
        const doc = await objToSave.save();
        return {
            status: true,
            result: doc
        }
    } catch (err) {
    console.log('Repository-create:', err);
    return { status: false };
    }
}

module.exports.update = async (data) => {
    try {
    const doc = await data.model.findOneAndUpdate(data.findQuery, data.findUpdate, {
        projection: data.projection,
        new: true,
        useFindAndModify: false,
    });
    if (doc) {
        return {
        status: true,
        result: doc
        };
    }
    } catch (err) {
    console.log('Repository-update:', err);
    }
    return { status: false };
}

module.exports.delete = async (data) => {
    try {
    const doc = await data.model.findOneAndDelete(data.findQuery, { projection: data.projection });
    if (doc) {
        return {
        status: true,
        result: doc
        }
    }
    } catch (err) {
    console.log('Repository-delete:', err);
    }
    return { status: false };
}