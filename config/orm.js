const connection = require('../config/connection.js');
//connection to database
//db goes onto handlebars
function objToSql(ob) {
    const array = [];
    for (let key in ob) {
        let value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    return array.toString();
};

const orm = {
    selectAll: function(tableInput, cb) {
        const queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        const queryString = 'INSERT INTO ' + table + ' (' + cols + ')' + ' VALUES (' + vals + ')';
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function(table, value, condition, cb) {
        const queryString = 'UPDATE ' + table + ' SET ' + objToSql(value) + ' WHERE ' + condition;
        console.log(queryString);
        connection.query(queryString, function(err, result) {
        	if (err) throw err;
        	cb(result);
        });
    }
};

module.exports = orm;