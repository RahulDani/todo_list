import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* If no token, go to login */}
        <Route path="/" element={token ? <TodoApp /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
