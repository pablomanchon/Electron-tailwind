import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Main from './layout/Main'
import PageHome from './pages/PageHome'
import PageMoves from './pages/PageMoves'
import PageUsers from './pages/PageUsers'
import PageData from './pages/PageData'
import { ToastContainer } from 'react-toastify'
import Modal from './layout/Modal'
import PageCtasCtes from './pages/PageCtasCtes'

export default function App2() {
  return (
    <Router>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[auto_1fr] items-center justify-center bg-gray-900 w-full text-white">
        <Navbar />
        <Main>
          <Routes>
            <Route path="/" element={
              <PageHome />} />
            <Route path="/moves" element={
              <PageMoves />} />
            <Route path="/users" element={
              <PageUsers />} />
            <Route path="/data" element={
              <PageData />} />
            <Route path="/ctas-ctes" element={
              <PageCtasCtes />} />
          </Routes>
           <Modal />
        </Main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>)
}
