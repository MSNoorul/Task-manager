import React, { useContext } from 'react'
import {BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom'
import Home from './pages/Home'
import { UserContext } from './context/UserContext'
import Login from './pages/Login';
import Register from './pages/Register'

function App() {
  const {user} = useContext(UserContext);
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={user?<Home/>:<Navigate to='/login'/>}/>
          <Route path='/login' element={user?<Navigate to='/'/>:<Login/>}/>
          <Route path='/register' element={<Register/>}/>      
        </Routes>
      </Router>   
    </>
  )
}

export default App
