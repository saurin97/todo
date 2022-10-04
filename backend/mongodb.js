// CRUD create read update delete

const { MongoClient } = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://192.168.1.98:27017';
const databaseName = 'saurin';

const client = async () => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(
			connectionURL,
			{ useNewUrlParser: true },
			(err, client) => {
				if (err) {
					reject(err);
				}
				console.log('Connected');
				resolve(client);
			}
		);
	});
};

const getTodoList = async (callback) => {
	const cli = await client();
	const db = await cli.db(databaseName);

	const data = await db.collection('todo').find({}).toArray();
	// db.close();s
	return callback(data);
};

const addTodo = async (item, callback) => {
	const cli = await client();
	const db = await cli.db(databaseName);

	const data = await db.collection('todo').insertOne(item);
	callback(data.ops[0]);
};

const updateTodo = async (item, callback) => {
	const cli = await client();
	const db = await cli.db(databaseName);

	const myquery = { _id: item._id };

	const data = await db.collection('todo').updateOne(myquery, item);

	callback(data.ops);
};

module.exports = {
	getTodoList,
	addTodo,
	updateTodo,
};
