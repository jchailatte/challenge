'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    //throw new Error('error');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
            //reject()
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        // fill me in :)
        console.log(item);

        //list of users with said item
        const usersWith = _.reduce(db.itemsOfUserByUsername, (arr, value, key) => {
            if (value.includes(item)) {
                arr.push(key)
            }
            return arr;
        }, []);
        console.log(usersWith);

        //frequency map for age
        const map = {};
        _.forEach(usersWith, (value) => {
            const person = _.find(db.usersById, (obj) => obj.username === value);
            if (map[person.age]) {
                map[person.age]++;
            } else {
                map[person.age] = 1;
            }
        })
        return map;
    }
    return mockDBCall(dataAccessMethod);
}

//adding this endpoint to retreive a list of all possible items
const getListofAllItems = () => {
    const dataAccessMethod = () => _.union(_.flatten(_.values(db.itemsOfUserByUsername)));
    return mockDBCall(dataAccessMethod);
};

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith,
    getListofAllItems
};
