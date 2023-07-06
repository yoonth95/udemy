import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from 'pages/Landing';
import Main from 'pages/Main';
import List from 'pages/List';
import Cafe from 'pages/Cafe';
import Seat from 'pages/Seat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/main' element={<Main />} />
          <Route path='/list' element={<List />} />
          <Route path='/cafe/:id' element={<Cafe />} />
          <Route path='/cafe/:id/seat' element={<Seat />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
