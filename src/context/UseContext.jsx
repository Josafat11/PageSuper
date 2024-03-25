import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Intentar obtener el usuario almacenado en LocalStorage al cargar la aplicación
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Solo se ejecuta una vez al cargar la aplicación
  useEffect(() => {
    // Almacenar el usuario en LocalStorage cada vez que cambie
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]); // Se ejecuta cada vez que 'user' cambia

  //Cerrar sesion del usuario
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser ,logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);
