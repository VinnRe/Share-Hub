import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SharePage from './pages/SharePage'
import LayoutNavBar from './components/LayoutNavBar'
import ModeratePage from './pages/ModeratePage'
import AccountSettings from './pages/AccountSettings'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutNavBar />}>
          <Route index element={<Home />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/moderate" element={<ModeratePage />} />
          <Route path="/account-settings" element={<AccountSettings />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
