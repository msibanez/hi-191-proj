const knex = require('knex');
require('dotenv').config()

const db = knex({
    client: 'pg',

    connection: {
    	host : '127.0.0.1',
    	port : 5432,
    	user : 'postgres',
    	password : '1234',
    	database : 'postgres'
	}

})

module.exports = db;