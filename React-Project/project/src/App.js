import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './Main';
import Project1 from './Project1/Project1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project1" element={<Project1 />} />
      </Routes>
    </Router>
  );
}
export default App;
