import React, { useState } from 'react';
import { useCreateTaskMutation } from './generated/graphql';
import "./styles.css"

interface TodoFormProps {
    addTodo: (name: string, description: string)=> void;
}

const TodoForm:React.FC = ()=> {
    const [description, setDescription] = useState<string>('');
    const [name,setName] = useState<string>('');
    const [createTaskMutation, {loading, error, data}] = useCreateTaskMutation()
    
   

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        if (!name.trim() || !description.trim()) {
            console.log("Error: Name and Description are required.");
            return;
          }
      
          try {
            await createTaskMutation({
              variables: {
                data: {
                  name: name,
                  description: description,
                },
              },
            });
            setName(''); // Clear input fields on successful submission
            setDescription('');
          } catch (error) {
            console.error("Error creating task:", error);
          }
      };

    return (
        <form onSubmit={handleSubmit}>
          <input
            className='TitleInput'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Title"
          />
          <br/>
          <input
            className='DescriptionInput'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <br/>
          <button type="submit"  disabled={loading} className='SubmitButton'>Add</button>

        </form>
      );
}

export default TodoForm