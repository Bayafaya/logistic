import React from 'react'
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {

  return (
     <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage/>}/>    
    </Routes>
  )
}

export default App
