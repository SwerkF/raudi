import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Customise from './pages/Customise';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';

function App() {
  
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/modele/:id/customise" element={<Customise />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
