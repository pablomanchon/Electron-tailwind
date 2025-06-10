import { Activity, FileBarChart, Home, User } from 'lucide-react'
import logo from '../../assets/logo.webp';


const navItems = [
  { name: "Inicio", href: "/", icon: <Home size={20} /> },
  { name: "Movimientos", href: "/moves", icon: <Activity size={20} /> },
  { name: "Usuarios", href: "/users", icon: <User size={20} /> },
  { name: "Informes", href: "/data", icon: <FileBarChart size={20} /> }
]

export default function PanelHome() {
  return (
    <div className='flex items-center w-full h-full overflow-hidden'>
        <div>
          <img src={logo} alt="Logo" className="m-auto animate-spin-slower" />
        </div>
    </div>
  )
}
