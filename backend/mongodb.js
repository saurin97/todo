// CRUD create read update delete

const { MongoClient } = require('mongodb');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

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
	console.log(item, 'ITEM');
	const myquery = { _id: ObjectId(item._id) };

	const data = await db
		.collection('todo')
		.findOneAndUpdate(
			myquery,
			{ $set: { title: item.title } },
			{ returnOriginal: false, upsert: false }
		);

	console.log(data, 'data');
	callback(data.ops);
};

const deleteTodo = async (id, callback) => {
	const cli = await client();
	const db = await cli.db(databaseName);
	try {
	} catch (error) {}

	const data = await db.collection('todo').deleteOne({ _id: ObjectId(id) });

	callback(data.ops);
};

module.exports = {
	getTodoList,
	addTodo,
	updateTodo,
	deleteTodo,
};
