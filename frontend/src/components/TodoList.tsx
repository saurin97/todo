import React from 'react';
import { Todo } from '../todo.model';

interface TodoListProps {
	items: Todo[];
	onTodoDelete: (id: string) => void;
	editTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
	return (
		<ul>
			{props.items.map((todo) => (
				<li key={todo._id}>
					<span>{todo.title}</span>
					<div>
						<button
							style={{ marginRight: '5px' }}
							onClick={() => props.editTodo(todo._id)}
						>
							Edit
						</button>
						<button
							onClick={props.onTodoDelete.bind(null, todo._id)}
						>
							Delete
						</button>
					</div>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
