import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';   // 🔑 use our custom axios with JWT
import '../App.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [activeTodoId, setActiveTodoId] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();

  // ✅ Load todos on mount
  useEffect(() => {
    api.get("/todos/")
      .then(res => setTodos(res.data))
      .catch(err => {
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        }
      });
  }, [navigate]);

  // ✅ Logout clears JWT
  const signOut = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  const addTodo = () => {
    if (!text.trim()) return;
    api.post("/todos/", { text }).then(() => {
      setText('');
      setShowInput(false);
      api.get("/todos/").then(res => setTodos(res.data));
    });
  };

  const cancelAdd = () => {
    setText('');
    setShowInput(false);
  };

  const toggleTodo = (id) => {
    api.put(`/todos/toggle/${id}`).then(() => {
      api.get("/todos/").then(res => setTodos(res.data));
    });
  };

  const deleteTodo = (id) => {
    api.delete(`/todos/${id}`).then(() => {
      api.get("/todos/").then(res => setTodos(res.data));
    });
  };

  const saveEdit = (id) => {
    api.put(`/todos/modify/${id}`, { text: editText }).then(() => {
      setEditText("");
      setActiveTodoId(null);
      api.get("/todos/").then(res => setTodos(res.data));
    });
  };

  return (
    <div className="container">
      <div className="top-bar">
        <button className="signout-btn" onClick={signOut}>Sign Out</button>
      </div>

      <h1>📝 My To-Do Lists</h1>
      {todos.length === 0 ? (
        <p>No list found.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {activeTodoId === todo.id && editText !== "" ? (
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
              ) : (
                <span
                  onClick={() => setActiveTodoId(todo.id)}
                  className={`todo-text ${activeTodoId === todo.id ? "expanded" : ""} ${todo.done ? "done" : ""}`}
                >
                  {todo.text}
                </span>
              )}

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
  );
}

export default TodoApp;
