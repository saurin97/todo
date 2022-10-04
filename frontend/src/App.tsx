import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from './todo.model';
import TodoList from './components/TodoList';
import NewTodo from './components/newTodo';
import './components/todolist.css';

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [selectedTask, setSelectedTask] = useState({} as Todo);

	const baseURL = 'http://localhost:3001';

	const todoAddHandler = (text: string) => {
		if (text.trim() === '') {
			alert("You can't add Empty TodO");

			return;
		}

		if (!!selectedTask._id) {
			axios
				.put(`${baseURL}/todo/update`, { ...selectedTask, title: text })
				.then((res) => {
					const todoList = [...todos];
					const index = todoList.findIndex(
						(todo) => todo._id === selectedTask._id
					);

					todoList[index] = { ...selectedTask, title: text };

					setTodos(todoList);
				});
		} else {
			axios.post(`${baseURL}/todo/add`, { title: text }).then((res) => {
				console.log(res.data, 'res');
				setTodos((prevTodos) => [...prevTodos, res.data]);
			});
		}
	};

	const deleteTodoHandler = (todoId: string) => {
		axios.delete(`${baseURL}/todo/${todoId}`).then((res) => {
			console.log(res);
			setTodos((prevTodos) => {
				return prevTodos.filter((todo) => todo._id !== todoId);
			});
		});
	};

	useEffect(() => {
		getTodoList();
	}, []);

	const getTodoList = () => {
		axios.get(`${baseURL}/todo`).then((res) => {
			console.log(res.data, 'res');
			setTodos(res.data);
		});
	};

	const editTodo = (id: string) => {
		const data = todos.find((item) => item._id === id) as Todo;
		setSelectedTask(data);
	};

	return (
		<div className="App">
			<NewTodo selectedTask={selectedTask} onAddTodo={todoAddHandler} />
			<TodoList
				editTodo={editTodo}
				items={todos}
				onTodoDelete={deleteTodoHandler}
			/>
		</div>
	);
};

export default App;
