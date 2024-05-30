import React, { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([])
    const [error, setError] = useState('');
    const [sortCriteria, setSortCriteria] = useState('date');
    const [filterCriteria, setFilterCriteria] = useState('all');
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);
    // Adding Validation to addTodo: Ensure that the input is not empty and does not exceed a certain length.
    const addTodo = todo => {
        setError('');
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }
    // Adding Validation to EditTodoForm: Ensure that the edited input meets the same criteria.
    const editTask = (task, id) => {
        if (!task.trim()) {
            setError('Task cannot be empty.');
            return;
        }
        if (task.length > 100) {
            setError('Task cannot exceed 100 characters.');
            return;
        }
        setError('');
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };
    const handleFilterChange = (e) => {
        setFilterCriteria(e.target.value);
    };
    const sortTodos = (todos, criteria) => {
        switch (criteria) {
            case 'name':
                return [...todos].sort((a, b) => a.task.localeCompare(b.task));
            case 'date':
                return [...todos].sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'completed':
                return [...todos].sort((a, b) => a.completed - b.completed);
            default:
                return todos;
        }
    };
    const filterTodos = (todos, criteria) => {
        switch (criteria) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'incomplete':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    };
    const sortedTodos = sortTodos(todos, sortCriteria);
    const filteredTodos = filterTodos(sortedTodos, filterCriteria);
    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            {error && <p className="error">{error}</p>}
            <div>
                <label>Sort by: </label>
                <select value={sortCriteria} onChange={handleSortChange}>
                    <option value=""></option>
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                    <option value="completed">Completion Status</option>
                </select>
                <label>Filter by: </label>
                <select value={filterCriteria} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>
            {filteredTodos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} />
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            ))}
        </div>
    )
}