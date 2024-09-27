import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home'
import PopUp from './partials/PopUp/PopUp';
import './App.css'
import Header from './partials/Header/Header';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/popup' element={<PopUp/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
