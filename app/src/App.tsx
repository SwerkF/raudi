import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Customise from './pages/Customise'
import Home from './pages/Home'
import Modele from './pages/modele'
import ModeleDetail from './pages/ModeleDetail'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicule/:id/customise" element={<Customise />} />
          <Route path="/modele" element={<Modele />} />
          <Route path="/modele/:id" element={<ModeleDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
