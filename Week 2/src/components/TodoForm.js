import React, { useState } from 'react'

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    if (!value) {
      setError('Task cannot be empty.');
      return;
    }
    if (value.length > 100) {
      setError('Task cannot exceed 100 characters.');
      return;
    }
    setError('');
    if (value) {
      // add todo
      addTodo(value);
      // clear form after submission
      setValue('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">

      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
      <button type="submit" className='todo-btn'>Add Task</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
