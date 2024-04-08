import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UseContext";
import Logo from "../assets/logox.svg";

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative bg-slate-500">
      <nav className="w-full bg-gray-600 z-20">
        <div className="flex items-center justify-between px-2 py-6 text-xl">
          <NavLink to={"/"} className={"ml-4 flex items-center"}>
            <img src={Logo} alt="Logo" className="h-20 mr-2" />
            <span className="ml-2 text-blue-200 font-bold text-3xl">
              Super Pet
            </span>
          </NavLink>
          <ul className="flex space-x-4 items-center mr-4">
            {/* Si hay un usuario autenticado */}
            {user && (
              <>
                {/* Opciones para todos los roles de usuario */}
                <li>
                  <NavLink
                    exact={true}
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/contacto"
                  >
                    Contacto
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/nosotros"
                  >
                    Nosotros
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/tienda"
                  >
                    Tienda
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to={user.door !== "ninguno" ? "/veriot" : "/petdoor"}
                  >
                    {user.door !== "ninguno" ? "Ver IoT" : "Registrar IoT"}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/perfil"
                  >
                    Perfil
                  </NavLink>
                </li>
                {/* Si el usuario es un administrador, mostrar la opción "Admin" */}
                {user.role === "admin" && (
                  <li className="relative">
                    <button
                      onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                      className="text-white hover:text-green-300 hover:font-bold"
                    >
                      Admin
                    </button>
                    {isAdminMenuOpen && (
                      <div className="absolute top-full right-0 bg-white shadow-md px-4 py-2 z-10">
                        <ul className="flex flex-col space-y-2">
                          <li>
                            <NavLink
                              activeClassName="text-green-500"
                              className="text-gray-900 hover:text-green-500 hover:font-bold"
                              to="/adminprod"
                            >
                              Productos
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              activeClassName="text-green-500"
                              className="text-gray-900 hover:text-green-500 hover:font-bold"
                              to="/adminusers"
                            >
                              Usuarios
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              activeClassName="text-green-500"
                              className="text-gray-900 hover:text-green-500 hover:font-bold"
                              to="/admincontact"
                            >
                              Contactos
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              activeClassName="text-green-500"
                              className="text-gray-900 hover:text-green-500 hover:font-bold"
                              to="/adminnosotros"
                            >
                              Nosotros
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              activeClassName="text-green-500"
                              className="text-gray-900 hover:text-green-500 hover:font-bold"
                              to="/adminpoliticas"
                            >
                              Politicas
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              activeClassName="text-green-500"
                              className="text-gray-900 hover:text-green-500 hover:font-bold"
                              to="/adminfaq"
                            >
                              FAQ
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                )}
              </>
            )}

            {/* Si no hay un usuario autenticado */}
            {!user && (
              <>
                <li>
                  <NavLink
                    exact={true}
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/contacto"
                  >
                    Contacto
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/nosotros"
                  >
                    Nosotros
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/tienda"
                  >
                    Tienda
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="text-green-500"
                    className="text-white hover:text-green-300 hover:font-bold"
                    to="/registro"
                  >
                    Registro
                  </NavLink>
                </li>
              </>
            )}

            {/* Si hay un usuario autenticado, mostrar su nombre y la opción para cerrar sesión */}
            {user && (
              <li className="flex items-center space-x-2">
                <span className="text-white text-lg">
                  Hola, {user.user || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-green-300 hover:font-bold"
                >
                  Cerrar sesión
                </button>
              </li>
            )}

            {/* Si no hay un usuario autenticado, mostrar la opción para iniciar sesión */}
            {!user && (
              <li>
                <NavLink
                  activeClassName="text-green-500"
                  className="text-white hover:text-green-300 hover:font-bold"
                  to="/login"
                >
                  Inicia Sesión
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
// Version funcional
