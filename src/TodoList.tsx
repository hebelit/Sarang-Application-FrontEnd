import React from 'react';

interface Todo {
  title: string;
  description: string;
  id: number;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  markTaskComplete: (id: number) => void; // Add markTaskComplete function to props
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, markTaskComplete }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <h4 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</h4>
          <p>{todo.description}</p>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={() => markTaskComplete(todo.id)}>
            {todo.completed ? 'Completed' : 'Mark as Completed'}
          </button>
          <input type="checkbox" checked={todo.completed} readOnly />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
