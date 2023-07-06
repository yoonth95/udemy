import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from 'pages/Landing';
import Main from 'pages/Main';
import List from 'pages/List';
import Detail from 'pages/Detail';
import Seat from 'pages/Seat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/main' element={<Main />} />
          <Route path='/list' element={<List />} />
          <Route path='/detail:id' element={<Detail />} />
          <Route path='/detail:id/seat' element={<Seat />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
