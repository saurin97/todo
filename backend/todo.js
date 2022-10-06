const mongodb = require('./mongodb');

const getTodoList = async (callback) => {
	const db = await mongodb.getDb();
	const data = await db.collection('todo').find({}).toArray();
	return callback(data);
};

const addTodo = async (item, callback) => {
	const db = await mongodb.getDb();
	const data = await db.collection('todo').insertOne(item);
	callback(data.ops[0]);
};

const updateTodo = async (item, callback) => {
	const db = await mongodb.getDb();
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
	const db = await mongodb.getDb();
	const data = await db.collection('todo').deleteOne({ _id: ObjectId(id) });

	callback(data.ops);
};

module.exports = {
	getTodoList,
	addTodo,
	updateTodo,
	deleteTodo,
};
