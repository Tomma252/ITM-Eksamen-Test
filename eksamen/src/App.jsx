import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Teams from './Components/Teams';
import Type from './Components/Type';
import SearchResult from './Components/SearchResult';
import Pokemon from './Components/Pokemon';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/type/:slug" element={<Type />}></Route>
        <Route path="/search" element={<SearchResult />}></Route>
        <Route path="/pokemon/:slug" element={<Pokemon />}></Route>
      </Routes>
    </Router>
  );
};

export default App;