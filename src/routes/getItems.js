'use strict';
const mockDBCalls = require('../database/index.js');

const getItemsHandler = async (request, response, next) => {
    try {
        const data = await mockDBCalls.getListofAllItems();
        return response.status(200).send(JSON.stringify(data));
    } catch (err) {
        next(err);
    }
};

module.exports = (app) => {
    app.get('/items', getItemsHandler);
};
