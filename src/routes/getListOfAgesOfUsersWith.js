'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response, next) => {
    const itemToLookup = request.query.item;
    //console.log(itemToLookup);
    
    if(!itemToLookup) {
        return res
            .status(400)
            .json({status: 400, message: "Item must be present"});
    } else {
        try {
            const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
            return response.status(200).send(JSON.stringify(data));
        } catch (err) {
            next(err);
        }
    }
};

module.exports = (app) => {
    app.get('/users/age', getListOfAgesOfUsersWithHandler);
};
