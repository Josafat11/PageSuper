import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UseContext'; // Importa el contexto de usuario
import { CONFIGURACIONES } from '../config/confing';

const UserProfile = () => {
  const { user } = useUser(); // Obtiene el usuario del contexto
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  // Función para manejar cambios en los campos de usuario editados
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  // Función para cargar el perfil de usuario desde el servidor
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + `/auth/profile/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user); // Almacena los datos del usuario en el estado
        setEditedUserData(data.user); // Almacena los datos del usuario editados
      } else {
        console.error('Error al obtener el perfil del usuario:', response.status);
      }
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  // Función para enviar los cambios del perfil de usuario al servidor
  const updateUserProfile = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + `/auth/profile/${user.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserData),
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user); // Actualiza los datos del usuario en el estado
        setEditedUserData(data.user); // Actualiza los datos del usuario editados
      } else {
        console.error('Error al actualizar el perfil del usuario:', response.status);
      }
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
    }
  };

  // Cargar el perfil del usuario al cargar el componente
  useEffect(() => {
    fetchUserProfile();
  }, []); // Se ejecuta una vez al cargar el componente

  return (
    <div className="mx-auto bg-sky-200 p-20"> {/* Ajuste del margen superior */}
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
      {userData ? (
        <div>
          <p className="pt-2 pb-2" ><strong>Nombre:</strong> {userData.name}</p>
          <p className="pt-2 pb-2"><strong>Apellidos:</strong> {userData.lastName}</p>
          <p className="pt-2 pb-2"> <strong>Correo Electrónico:</strong> {userData.email}</p>
          <p className="pt-2 pb-2"><strong>Teléfono:</strong> {userData.telefono}</p>
          {/* Agrega más campos de usuario según tu modelo */}
          <hr />
          <h3 className="font-bold pt-10 pb-5 text-center" > Editar Perfil </h3>
          <form onSubmit={updateUserProfile} className="w-full max-w-md mx-auto">
            <div className="mb-4 flex flex-col">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
              <input type="text" id="name" name="name" value={editedUserData.name || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Apellidos</label>
              <input type="text" id="lastName" name="lastName" value={editedUserData.lastName || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
              <input type="email" id="email" name="email" value={editedUserData.email || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
              <input type="text" id="telefono" name="telefono" value={editedUserData.telefono || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {/* Agrega más campos de usuario para editar según tu modelo */}
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Guardar Cambios</button>
            </div>
          </form>

        </div>
      ) : (
        <p>Cargando perfil de usuario...</p>
      )}
    </div>
  );
};

export default UserProfile;
