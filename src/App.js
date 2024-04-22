import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Upload from './components/Upload/Upload';

const App = () => {
  return (
    <>
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

