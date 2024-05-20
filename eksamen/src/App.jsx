import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Teams from './Components/Teams';
import Type from './Components/Type';
import SearchResult from './Components/Pokemon';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/type/:slug" element={<Type />}></Route>
        <Route path="/search" element={<SearchResult />}></Route>
      </Routes>
    </Router>
  );
};

export default App;