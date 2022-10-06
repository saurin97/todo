// CRUD create read update delete

const { MongoClient } = require('mongodb');

const connectionURL = 'mongodb://192.168.1.98:27017';
const databaseName = 'saurin';

let database;

const initDb = (callback) => {
	if (database) {
		console.warn('Trying to init DB again!');
		return callback(null, database);
	}

	MongoClient.connect(connectionURL, databaseName, (err, client) => {
		if (err) {
			return callback(err);
		}
		console.log('DB initialized - connected to: ' + databaseName);
		database = client.db(databaseName);
		return callback(null, database);
	});
};

const getDb = () => {
	return database;
};

module.exports = {
	initDb,
	getDb,
};
