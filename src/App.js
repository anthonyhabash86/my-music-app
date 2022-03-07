import logo from './logo.svg';
import './App.css';

import {Artist} from './Artist';
import {Album} from './Album';
import {Song} from './Song';
import {Navigation} from './Navigation';

import {BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className='mt-3 d-flex justify-content-center'>
      React JS Tutorial
      </h3>
      <Navigation/>
    <Routes>
      <Route path='/' element={<Artist />} exact/>
      <Route path='/album' element={<Album />}/>
      <Route path='/song' element={<Song />}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
