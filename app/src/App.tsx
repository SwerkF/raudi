import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Customise from './pages/Customise';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Home from './pages/Home'
import Modele from './pages/modele'
import ModeleDetail from './pages/ModeleDetail'

import AchatsParMoisChart from './components/AchatsParMoisChart'
import AchatsUtilisateurs from './components/AchatAdmin'
import OptionsAdmin from './components/OptionsAdmin'
import MoteursAdmin from './components/MoteurAdmin'
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
          <Route path="/achat" element={<AchatsUtilisateurs />} />
          <Route path="/options" element={<OptionsAdmin />} />
          <Route path="/roles" element={<OptionsAdmin />} />
          <Route path="/moteur" element={<MoteursAdmin />} />
          <Route path="/mensuel" element={<AchatsParMoisChart />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
