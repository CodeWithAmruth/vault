import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import EncryptPage from './pages/EncryptPage'
import DecryptPage from './pages/DecryptPage'
import Nav from './components/Nav'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<Navigate to="/encrypt" />} />
        <Route path="/encrypt" element={<EncryptPage />} />
        <Route path="/decrypt" element={<DecryptPage />} />
      </Routes>
    </BrowserRouter>
  )
}
