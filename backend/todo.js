const mongodb = require('./mongodb');
const mongo = require('mongodb');

class todo {
	ObjectId = mongo.ObjectId;

	getTodoList = async (callback) => {
		const db = await mongodb.getDb();
		const data = await db.collection('todo').find({}).toArray();
		return callback(data);
	};

	addTodo = async (item, callback) => {
		try {
			const db = await mongodb.getDb();
			const data = await db.collection('todo').insertOne(item);
			callback(data.ops[0]);
		} catch (error) {
			callback(error);
		}
	};

	updateTodo = async (item, callback) => {
		try {
			const db = await mongodb.getDb();
			const myquery = { _id: this.ObjectId(item._id) };

			const data = await db
				.collection('todo')
				.findOneAndUpdate(
					myquery,
					{ $set: { title: item.title } },
					{ returnOriginal: false, upsert: false }
				);

			console.log(data, 'data');
			callback(data.ops);
		} catch (error) {
			callback(error);
		}
	};

	deleteTodo = async (id, callback) => {
		try {
			const db = await mongodb.getDb();
			const data = await db
				.collection('todo')
				.deleteOne({ _id: this.ObjectId(id) });

			callback(data.ops);
		} catch (error) {
			callback(error);
		}
	};
}

// const getTodoList = async (callback) => {
// 	const db = await mongodb.getDb();
// 	const data = await db.collection('todo').find({}).toArray();
// 	return callback(data);
// };

// const addTodo = async (item, callback) => {
// 	const db = await mongodb.getDb();
// 	const data = await db.collection('todo').insertOne(item);
// 	callback(data.ops[0]);
// };

// const updateTodo = async (item, callback) => {
// 	const db = await mongodb.getDb();
// 	const myquery = { _id: ObjectId(item._id) };

// 	const data = await db
// 		.collection('todo')
// 		.findOneAndUpdate(
// 			myquery,
// 			{ $set: { title: item.title } },
// 			{ returnOriginal: false, upsert: false }
// 		);

// 	console.log(data, 'data');
// 	callback(data.ops);
// };

// const deleteTodo = async (id, callback) => {
// 	const db = await mongodb.getDb();
// 	const data = await db.collection('todo').deleteOne({ _id: ObjectId(id) });

// 	callback(data.ops);
// };

module.exports = new todo();
