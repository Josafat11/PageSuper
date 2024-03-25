import React from 'react';
import backgroundimage from '../assets/logox.svg'

const AdminHome = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="min-h-screen flex items-center justify-center bg-sky-100 w-full" 
      style={{ backgroundImage: `url(${backgroundimage})`, backgroundSize: '100px 100px' }}>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4 ">Bienvenido Administrador</h1>
          <p className="text-lg text-center text-gray-700">En esta página podrás gestionar los productos, usuarios y otras funciones administrativas.</p>
          {/* Agrega aquí cualquier otra información o funcionalidades que desees mostrar */}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
