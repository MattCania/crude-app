import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home'
import Add from './partials/Add/Add';
import Header from './partials/Header/Header';

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
