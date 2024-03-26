import React, { useState, useEffect } from 'react';
import { CONFIGURACIONES } from '../config/confing';

const AdminContacto = () => {
  const [contactDetails, setContactDetails] = useState({
    direccion: '', // Cambiar a address
    correoElectronico: '', // Cambiar a email
    telefono: '' // Cambiar a phone
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Obtener los detalles de contacto al cargar la página
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + "/contact/");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Actualizar el nombre de las propiedades
        setContactDetails({
          direccion: data.direccion,
          correoElectronico: data.email,
          telefono: data.phone
        });
      } else {
        console.error('Error al obtener los detalles de contacto:', response.status);
      }
    } catch (error) {
      console.error('Error al obtener los detalles de contacto:', error);
    }
  };
  
  const handleEditSubmit = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + '/contact/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactDetails)
      });
      if (response.ok) {
        alert('Detalles de contacto actualizados exitosamente');
        setShowEditModal(false);
      } else {
        console.error('Error al actualizar los detalles de contacto:', response.status);
      }
    } catch (error) {
      console.error('Error al actualizar los detalles de contacto:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  return (
    <div className="bg-sky-100 pt-36 pb-64 mt-30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">Administración de Detalles de Contacto</h2>
        <button onClick={() => setShowEditModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Editar Detalles de Contacto</button>
        <div className="w-full border-collapse border border-gray-200">
          <div className="flex justify-between border-b border-gray-200 py-2 px-4">
            <span className="font-semibold">Dirección:</span>
            <span>{contactDetails.direccion}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2 px-4">
            <span className="font-semibold">Correo Electrónico:</span>
            <span>{contactDetails.correoElectronico}</span>
          </div>
          <div className="flex justify-between py-2 px-4">
            <span className="font-semibold">Teléfono:</span>
            <span>{contactDetails.telefono}</span>
          </div>
        </div>
        {showEditModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Editar Detalles de Contacto</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit();
              }}>
                <p className='font-bold pb-2'>Direccion Empresa: </p>
                <input type="text" name="direccion" value={contactDetails.direccion} onChange={handleInputChange} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <p className='font-bold pb-2'>Correo Empresa:</p>                
                <input type="text" name="correoElectronico" value={contactDetails.correoElectronico} onChange={handleInputChange} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <p className='font-bold pb-2'>Telefono Empresa: </p>
                <input type="text" name="telefono" value={contactDetails.telefono} onChange={handleInputChange} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Guardar Cambios</button>
                  <button onClick={() => setShowEditModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacto;
