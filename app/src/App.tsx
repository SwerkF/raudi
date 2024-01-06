import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Customise from './pages/Customise';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Home from './pages/Home'
import Modele from './pages/modele'
import ModeleDetail from './pages/ModeleDetail'

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicule/:id/customise" element={<Customise />} />
          <Route path="/modele" element={<Modele />} />
          <Route path="/modele/:id" element={<ModeleDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
