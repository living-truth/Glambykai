import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Home />
          </>
        } />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
      {/* <Route path="/Getstarted" element={<Getstarted />} /> external links*/}

    </Router>
  )
}

export default App
