import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const API_BASE = 'http://localhost:5000';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [activeTodoId, setActiveTodoId] = useState(null);
  const [editText, setEditText] = useState("");


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
    axios.put(`${API_BASE}/todos/toggle/${id}`).then(() => {
    axios.get(`${API_BASE}/todos`).then(res => setTodos(res.data));
    });
  };
  

  const deleteTodo = (id) => {
    axios.delete(`${API_BASE}/todos/${id}`).then(() => {
      axios.get(`${API_BASE}/todos`).then(res => setTodos(res.data));
    });
  };

  const saveEdit = (id) => {
  axios.put(`${API_BASE}/todos/modify/${id}`, { text: editText }).then(() => {
    setEditText("");
    setActiveTodoId(null);
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
            <li key={todo.id}>
    {/* If this todo is in "edit mode" */}
    {activeTodoId === todo.id && editText !== "" ? (
      <li>
  <div className="edit-container">
    <textarea
      value={editText}
      onChange={e => setEditText(e.target.value)}
      className="edit-box"
    />
    <div className="edit-actions">
      <button onClick={() => saveEdit(todo.id)}>Save</button>
      <button onClick={() => setActiveTodoId(null)}>Cancel</button>
    </div>
  </div>
</li>
    ) : (
      // Normal display mode
    <span
    onClick={() => setActiveTodoId(todo.id)}
    className={`todo-text ${activeTodoId === todo.id ? "expanded" : ""} ${todo.done ? "done" : ""}`}
    >
    {todo.text}
    </span>

    )}

    {/* If menu is open for this todo */}
    {activeTodoId === todo.id && editText === "" && (
  <div className="actions">
    <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
    <button onClick={() => { setEditText(todo.text); }}>Edit</button>
    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    <button onClick={() => setActiveTodoId(null)}>Close</button>
  </div>
)}

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
