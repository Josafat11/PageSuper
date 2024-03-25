import React, { useState, useEffect } from 'react';
import { CONFIGURACIONES } from '../config/confing';

const AdminNosotros = () => {
    const [nosotrosInfo, setNosotrosInfo] = useState({
        resumen: '',
        mision: '',
        vision: ''
      });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchNosotrosInfo();
  }, []);

  const fetchNosotrosInfo = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL2 + "/nosotros/");
      if (response.ok) {
        const data = await response.json();
        setNosotrosInfo(data);
      } else {
        console.error('Error al obtener la información de Nosotros:', response.status);
      }
    } catch (error) {
      console.error('Error al obtener la información de Nosotros:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL2 + '/nosotros/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nosotrosInfo)
      });
      if (response.ok) {
        alert('Información de Nosotros actualizada exitosamente');
        setShowEditModal(false);
      } else {
        console.error('Error al actualizar la información de Nosotros:', response.status);
      }
    } catch (error) {
      console.error('Error al actualizar la información de Nosotros:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNosotrosInfo({ ...nosotrosInfo, [name]: value });
  };

  return (
    <div className="bg-sky-100 pt-16 pb-52">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">Administración de Nosotros</h2>
        <button onClick={() => setShowEditModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Editar Información de Nosotros</button>
        <div className="w-full border-collapse border border-gray-200">
          <div className="flex justify-between border-b border-gray-200 py-2 px-4">
            <span className="font-semibold">Resumen:</span>
            <span>{nosotrosInfo.resumen}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2 px-4">
            <span className="font-semibold">Misión:</span>
            <span>{nosotrosInfo.mision}</span>
          </div>
          <div className="flex justify-between py-2 px-4">
            <span className="font-semibold">Visión:</span>
            <span>{nosotrosInfo.vision}</span>
          </div>
        </div>
        {showEditModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Editar Información de Nosotros</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit();
              }}>
                <textarea name="resumen" value={nosotrosInfo.resumen} onChange={handleInputChange} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" rows="4" />
                <textarea name="mision" value={nosotrosInfo.mision} onChange={handleInputChange} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" rows="4" />
                <textarea name="vision" value={nosotrosInfo.vision} onChange={handleInputChange} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" rows="4" />
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

export default AdminNosotros;
