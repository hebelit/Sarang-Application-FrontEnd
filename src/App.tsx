import {useEffect, useState} from 'react'
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useGetTasksQuery, useDeleteTaskMutation, useMarkTaskCompleteMutation} from './generated/graphql';
import './App.css'

interface Todo {
  title:string;
  description:string;
  id:number;
  completed:boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const {loading,error,data,refetch}=useGetTasksQuery();
  const [deleteTaskMutation] = useDeleteTaskMutation();
  const [markTaskCompleteMutation] = useMarkTaskCompleteMutation();

  useEffect(() => {
    if (data && data.getTasks) {
      const fetchedTodos = data.getTasks.map((task: any) => ({
        title: task.name,
        description: task.description,
        id: task.id,
        completed: task.completed
      }));
      setTodos(fetchedTodos);
    }
  }, [data]);

  const markTaskComplete = async (id: number) => {
    try {
      await markTaskCompleteMutation({
        variables: {
          markTaskCompleteId: id,
        },
      });
      refetch();
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTaskMutation({
        variables: {
          deleteTaskId: id, // Convert id to string as GraphQL expects string type
        },
      });
      // After successful deletion, refetch the task list to update UI
      refetch();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  
  return (
    <div className="App">
      <div>
        <h1>To-Do App</h1>
      </div>
      <div className='Form'>
        <TodoForm />
      </div>
      <div className='List'>
        <TodoList todos={todos} deleteTodo={deleteTodo} markTaskComplete={markTaskComplete}/>
      </div>
    </div>
  );
}
export default App;