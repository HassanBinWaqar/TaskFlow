import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import './app.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const [todoItem] = todos.filter(item => item.id === id);
    setTodo(todoItem.todo);
    setTodos(todos.filter(item => item.id !== id));
    saveToLS();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="container mx-auto my-5 p-6">
        <h1 className='font-bold text-3xl mb-6'>TaskFlow - Organize Your Tasks with Ease</h1>
        <div className="addTodo mb-6">
          <h2 className='text-xl font-semibold mb-3'>Add a Task</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className='w-full p-3 border border-gray-300 rounded-md'
            placeholder="Enter your task..."
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className='mt-3 w-full p-3 bg-blue-600 text-white rounded-md disabled:bg-blue-400'
          >
            Save
          </button>
        </div>
        <label className='flex items-center mb-6'>
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className='mr-3'
          />
          Show Finished
        </label>
        <h2 className='text-xl font-semibold mb-3'>Your Tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className='text-gray-500'>No Tasks to display</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between items-center mb-4 p-4 border border-gray-300 rounded-md">
                <div className='flex items-center'>
                  <input
                    name={item.id}
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                    className='mr-3'
                  />
                  <span className={item.isCompleted ? "line-through text-gray-500" : ""}>
                    {item.todo}
                  </span>
                </div>
                <div className="buttons flex space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='bg-red-600 text-white p-2 rounded-md hover:bg-red-700'
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      <footer className="footer">
        <p className="footer-text">Created by Hassan Bin Waqar</p>
        <p className="footer-text">Email: hassan.binnwaqar@protonmail.com</p>
      </footer>
    </>
  );
}

export default App;
