import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './layout/Navbar'
import Main from './layout/Main'
import PrimaryButton from './components/PrimaryButton'

function App() {
      return (
            <Router>
                  <div className="min-h-screen grid grid-cols-1 md:grid-cols-[auto_1fr] items-center justify-center bg-gray-900 w-full text-white">
                        <Navbar />
                        <Main>
                              <Routes>
                                    <Route path="/" element={<PrimaryButton functionClick={()=>console.log("click")} />} />
                              </Routes>
                        </Main>
                  </div>
            </Router>)
}

export default App
