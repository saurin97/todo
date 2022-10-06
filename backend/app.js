const express = require('express');
const cors = require('cors');
const query = require('./todo');
const mongodb = require('./mongodb');

const app = express();
const port = 3001;

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(express.json());

app.get('/todo', (req, res) => {
	query.getTodoList((result) => {
		res.send(result);
	});
});

app.post('/todo/add', (req, res) => {
	query.addTodo(req.body, (data) => {
		res.send(data);
	});
});

app.put('/todo/update', (req, res) => {
	query.updateTodo(req.body, (data) => {
		console.log('data', data);
		res.send(data);
	});
});

app.delete('/todo/:id', (req, res) => {
	console.log(req.baseUrl, 'log');
	query.deleteTodo(req.params.id, (data) => {
		res.send(data);
	});
});

mongodb.initDb((err) => {
	if (err) {
		return console.log(err, 'Database not connected');
	}
	app.listen(port, () => {
		console.log('Server is up on port ' + port);
	});
});
