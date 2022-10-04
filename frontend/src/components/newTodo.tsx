import React, { useEffect, useState } from 'react';
import { Todo } from '../todo.model';

type NewTodoProps = {
	onAddTodo: (todoText: string) => void;
	selectedTask: Todo;
};

const NewToDo: React.FC<NewTodoProps> = (props) => {
	const [inputVal, setInputVal] = useState(props.selectedTask?.title || '');
	const todoSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		props.onAddTodo(inputVal);
		setInputVal('');
	};

	useEffect(() => {
		setInputVal(props.selectedTask?.title);
	}, [props.selectedTask]);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputVal(event.target.value);
	};

	return (
		<form onSubmit={todoSubmitHandler}>
			<div className="form-control">
				<label htmlFor="todo-text">Todo Text</label>
				<input
					type="text"
					name="title"
					id="todo-text"
					value={inputVal}
					onChange={onChange}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default NewToDo;
