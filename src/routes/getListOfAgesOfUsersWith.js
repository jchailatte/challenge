'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
    const itemToLookup = request.query.item;
    //console.log(itemToLookup);
    
    //400 error code if missing query param
    //also handle error

    const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
    return response.status(200).send(JSON.stringify(data));
};

module.exports = (app) => {
    app.get('/users/age', getListOfAgesOfUsersWithHandler);
};
