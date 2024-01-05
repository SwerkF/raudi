import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Customise from './pages/Customise'

import AchatsParMoisChart from './components/AchatsParMoisChart'
import AchatsUtilisateurs from './components/AchatAdmin'
import OptionsAdmin from './components/OptionsAdmin'
import MoteursAdmin from './components/MoteurAdmin'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/vehicule/:id/customise" element={<Customise />} />
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
