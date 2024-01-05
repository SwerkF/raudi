import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Customise from './pages/Customise'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/vehicule/:id/customise" element={<Customise />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
