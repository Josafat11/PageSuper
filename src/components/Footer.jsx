import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import perro from '../assets/perro.png'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { TiLocation, TiPhone, TiMail } from 'react-icons/ti';
import { CONFIGURACIONES } from "../config/confing";

const Footer = () => {
  const [contactDetails, setContactDetails] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(CONFIGURACIONES.BASEURL + "/contact/");
        if (response.ok) {
          const data = await response.json();
          setContactDetails(data);
        } else {
          console.error(
            "Error al obtener los detalles de contacto:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error al obtener los detalles de contacto:", error);
      }
    };
    fetchContactDetails();
  }, []);

  return (
    <footer className="bg-gray-700 text-white py-1">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2">Enlaces</h3>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={" hover:underline hover:text-emerald-500"}
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/nosotros"
                  className={" hover:underline hover:text-emerald-500"}
                >
                  Nosotros
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacto"
                  className={" hover:underline hover:text-emerald-500"}
                >
                  Contacto
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/politicas"
                  className={" hover:underline hover:text-emerald-500"}
                >
                  Políticas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className={" hover:underline hover:text-emerald-500"}
                >
                  FAQ
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Redes Sociales</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center"><FaFacebookF className="mr-2" /> Facebook</a>
                </li>
                <li>
                  <a href="#" className="flex items-center"><FaTwitter className="mr-2"/> Twitter </a>
                </li>
                <li>
                  <a href="#" className="flex items-center" ><FaInstagram className="mr-2" />Instagram </a>
                </li>
              </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Contacto</h3>
            {contactDetails ? (
              <ul className="space-y-2">
                <li className="flex items-center" ><TiLocation className="mr-2" /> {contactDetails.direccion}</li>
                <li className="flex items-center" ><TiPhone className="mr-2"/> {contactDetails.phone}</li>
                <li className="flex items-center" ><TiMail className="mr-2"/> {contactDetails.email}</li>
              </ul>
            ) : (
              <p>Cargando detalles de contacto...</p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <NavLink 
              to="/home"
            >
              <img src={perro} alt="Perro_Footer" className="h-32 w-auto pl-20" />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="text-center mt-1">
        <p>&copy; 2024 Super Pet. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
