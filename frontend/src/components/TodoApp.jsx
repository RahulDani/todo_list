import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const API_BASE = 'http://localhost:5000';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/todos`).then(res => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (!text.trim()) return;
    axios.post(`${API_BASE}/todos`, { text }).then(() => {
      setText('');
      setShowInput(false);
      axios.get(`${API_BASE}/todos`).then(res => setTodos(res.data));
    });
  };

  const cancelAdd = () => {
    setText('');
    setShowInput(false);
  };

  const toggleTodo = (id) => {
    axios.put(`${API_BASE}/todos/${id}`).then(() => {
    axios.get(`${API_BASE}/todos`).then(res => setTodos(res.data));
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_BASE}/todos/${id}`).then(() => {
      axios.get(`${API_BASE}/todos`).then(res => setTodos(res.data));
    });
  };

  return (
    <>
    <div className="container">
      <h1>📝 My To-Do Lists</h1>
      {todos.length === 0 ? (
        <p>No list found.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}

      {showInput && (
        <div className="input-box">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter list name..."
          />
          <div className="btn-group">
            <button onClick={addTodo}>Save</button>
            <button onClick={cancelAdd}>Cancel</button>
          </div>
        </div>
      )}

      <button className="add-btn" onClick={() => setShowInput(true)}>➕</button>
    </div>
    </>
  );
}

export default TodoApp;
