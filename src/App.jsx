import './App.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import Nosotros from "./pages/Nosotros"
import Contacto from "./pages/Contacto"
import Registro from "./pages/Registro"
import Login from "./pages/Login"
import RecuperaPass from './pages/RecuperaPass'
import FAQ from './pages/Faq'
import Politicas from './pages/Politicas'
import Tienda from './pages/Tienda'
import RegistroDoor from './pages/PetDoor'
import Perfil from './pages/Perfil'
import Recuperar2 from './pages/RecuperarPass2'
import RecuperarP from './pages/RecuperarPassPregunta'
import IOT from './pages/IOT'
import LayoutPublic from './layouts/LayoutPublic'
import LayoutPrivate from './layouts/LayoutPrivate'
import AdminHome from './pagesAdmin/AdminHome'
import AdminProd from './pagesAdmin/AdminProd'
import AdminUser from './pagesAdmin/AdminUsers'
import AdminContact from './pagesAdmin/AdminContacto'
import AdminNosotros from './pagesAdmin/AdminNosotros'
import AdminPoliticas from './pagesAdmin/AdminPoliticas'
import AdminFaq from './pagesAdmin/AdminFaq'

function App() {
  return (
    <div>
        <Routes>
          <Route element={<LayoutPublic />}>
            <Route path='/' element={<Home />} />
            <Route path='nosotros' element={<Nosotros />} />
            <Route path='contacto' element={<Contacto />} />
            <Route path='registro' element={<Registro />} />
            <Route path='login' element={<Login />} />
            <Route path='recuperarpass' element={<RecuperaPass/>} />
            <Route path='faq' element={<FAQ/>} />
            <Route path='politicas' element={<Politicas/>} />
            <Route path="tienda" element={<Tienda />} />
            <Route path="petdoor" element={<RegistroDoor />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="recuperarpass2" element={<Recuperar2 />} />
            <Route path="recuperarpassp" element={<RecuperarP />} />
            <Route path="veriot" element={<IOT />} />
          </Route>

          <Route element={<LayoutPrivate />}>
            <Route path="adminhome" element={<AdminHome />} />
            <Route path="adminprod" element={<AdminProd />} />
            <Route path="adminusers" element={<AdminUser />} />
            <Route path="admincontact" element={<AdminContact />} />
            <Route path="adminnosotros" element={<AdminNosotros />} />
            <Route path="adminpoliticas" element={<AdminPoliticas />} />
            <Route path="adminfaq" element={<AdminFaq />} />
          </Route>

          {/* Ruta por defecto */}
          <Route path='*' element={<Home />}></Route>
        </Routes>
        <Footer></Footer>
    </div>
  )
}

export default App
