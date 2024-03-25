import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../context/UseContext";
import Navbar from "../components/Navbar"; // Importa tu componente Navbar

const LayoutPrivate = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    // Verifica si el usuario no existe o no es administrador
    if (!user || user.role !== 'admin') {
      navigate('/'); // Redirige a la página de inicio si el usuario no es administrador
    }
  }, [user, navigate]);
  
  return (
    <div>
      <Navbar /> {/* Agrega tu componente Navbar aquí */}
    </div>
  );
};

export default LayoutPrivate;
