import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PlayList from './components/PlayList';
import Video from './components/Video';
import PlayListDetail from './components/PlayListDetail';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<PlayList/>}/>
          <Route path='/playlist' element={<PlayList/>}/>
          <Route path='/playlistdetail/:id' element={<PlayListDetail/>}/>
          <Route path='/video' element={<Video/>}/>
        </Routes>
    </div>
  );
}

export default App;
