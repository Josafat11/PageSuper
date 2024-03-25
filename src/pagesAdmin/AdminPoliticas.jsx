import React, { useEffect, useState } from 'react';
import { CONFIGURACIONES } from '../config/confing';

const AdminPoliticas = () => {
  const [politicas, setPoliticas] = useState([]);
  const [editPolitica, setEditPolitica] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPoliticaData, setNewPoliticaData] = useState({
    titulo: '',
    descripcion: ''
  });

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        const response = await fetch(CONFIGURACIONES.BASEURL + "/politicas/", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPoliticas(data);
        } else {
          console.error('Error al obtener las políticas:', response.status);
        }
      } catch (error) {
        console.error('Error al obtener las políticas:', error);
      }
    };
    fetchPoliticas();
  }, []);

  const handleDelete = async (politicaId) => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + `/politicas/${politicaId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        setPoliticas(politicas.filter(politica => politica._id !== politicaId));
      } else {
        console.error('Error al eliminar la política:', response.status);
      }
    } catch (error) {
      console.error('Error al eliminar la política:', error);
    }
  };

  const handleUpdate = (politicaId) => {
    const selectedPolitica = politicas.find(politica => politica._id === politicaId);
    setEditPolitica(selectedPolitica);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setEditPolitica(null);
    setNewPoliticaData({
      titulo: '',
      descripcion: ''
    });
  };

  const handleEditSubmit = async (updatedPoliticaData) => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + `/politicas/${editPolitica._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPoliticaData)
      });
      if (response.ok) {
        const updatedPoliticas = politicas.map(politica => {
          if (politica._id === editPolitica._id) {
            return { ...politica, ...updatedPoliticaData };
          }
          return politica;
        });
        setPoliticas(updatedPoliticas);
        handleCloseModal();
      } else {
        console.error('Error al actualizar la política:', response.status);
      }
    } catch (error) {
      console.error('Error al actualizar la política:', error);
    }
  };

  const handleAddPolitica = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + '/politicas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPoliticaData)
      });
      if (response.ok) {
        const newPolitica = await response.json();
        setPoliticas([...politicas, newPolitica]);
        handleCloseModal();
      } else {
        console.error('Error al agregar la política:', response.status);
      }
    } catch (error) {
      console.error('Error al agregar la política:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPoliticaData({ ...newPoliticaData, [name]: value });
  };

  return (
    <div className="bg-sky-100 pt-36 pb-72">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">Administración de Políticas</h2>
        <button onClick={() => setShowAddModal(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Agregar Política</button>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {politicas.map((politica) => (
              <tr key={politica._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{politica.titulo}</td>
                <td className="px-4 py-2">{politica.descripcion}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleUpdate(politica._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Actualizar</button>
                  <button onClick={() => handleDelete(politica._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEditModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Editar Política</h2>
              {/* Aquí va el formulario de edición */}
              <form onSubmit={(e) => {
                e.preventDefault();
                // Aquí puedes obtener los datos actualizados del formulario y pasarlos a handleEditSubmit
                const updatedPoliticaData = {
                  titulo: e.target.titulo.value,
                  descripcion: e.target.descripcion.value
                };
                handleEditSubmit(updatedPoliticaData);
              }}>
                <input type="text" name="titulo" defaultValue={editPolitica.titulo} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <textarea name="descripcion" defaultValue={editPolitica.descripcion} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Guardar Cambios</button>
                <button onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
              </form>
            </div>
          </div>
        )}
        {showAddModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Agregar Política</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleAddPolitica();
              }}>
                <input type="text" name="titulo" value={newPoliticaData.titulo} onChange={handleInputChange} placeholder="Título" className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <textarea name="descripcion" value={newPoliticaData.descripcion} onChange={handleInputChange} placeholder="Descripción" className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Agregar</button>
                  <button onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPoliticas;
