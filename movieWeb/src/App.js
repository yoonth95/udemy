import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from "pages/Main";
import Moives from "pages/Moives";

import Header from 'components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies/:moviename' element={<Moives />} />
      </Routes>
    </Router>
  )
}

export default App;
