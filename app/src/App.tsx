import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Customise from './pages/Customise';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Home from './pages/Home'
import Modele from './pages/Modele'
import ModeleDetail from './pages/ModeleDetail'
import Admin from './pages/Admin'
import Contact from './pages/Contact';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modele/:id/customise" element={<Customise />} />
          <Route path="/modele" element={<Modele />} />
          <Route path="/modele/:id" element={<ModeleDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/profile/:id" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
    
        </Routes>
      </Router>
    </>
  )
};

export default App;
