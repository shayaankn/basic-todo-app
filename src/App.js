import React, { useState, useEffect } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    return savedTodos;
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = { text: inputValue, completed: false };
      // setTodos([...todos, inputValue]);
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setEditIndex(index);
    // setEditText(todos[index]);
    setEditText(todos[index].text);
  };

  const saveTodo = (index) => {
    const updatedTodos = [...todos];
    // updatedTodos[index] = editText;
    updatedTodos[index] = { ...updatedTodos[index], text: editText };
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1>basic todo app</h1>
      <input
        type="text"
        placeholder="Enter a todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTodo}>add</button>

      {todos.length === 0 ? (
        <p>no todos yet!</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveTodo(index)}>save</button>
                </>
              ) : (
                <>
                  <span onClick={() => toggleTodo(index)}>{todo.text}</span>
                  <button onClick={() => editTodo(index)}>edit</button>
                  <button onClick={() => deleteTodo(index)}>delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
