import React, { useEffect, useState } from 'react';
import { CONFIGURACIONES } from '../config/confing';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(CONFIGURACIONES.BASEURL + "/auth/users", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Error al obtener los usuarios:', response.status);
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(CONFIGURACIONES.BASEURL + `/auth/users/${userId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        console.error('Error al eliminar el usuario:', response.status);
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleUpdate = (userId) => {
    const selectedUser = users.find(user => user._id === userId);
    setEditUser(selectedUser);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditUser(null);
  };

  const handleEditSubmit = async (updatedUserData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(CONFIGURACIONES.BASEURL + `/auth/users/${editUser._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedUserData)
      });
      if (response.ok) {
        const updatedUsers = users.map(user => {
          if (user._id === editUser._id) {
            return { ...user, ...updatedUserData };
          }
          return user;
        });
        setUsers(updatedUsers);
        handleCloseModal();
      } else {
        console.error('Error al actualizar el usuario:', response.status);
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <div className="bg-sky-100 pt-36 pb-56 mt-30 mb-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">Administrar Usuarios</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo Electrónico</th>
              <th className="px-4 py-2 text-left">Rol</th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleUpdate(user._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Actualizar</button>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEditModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Editar Usuario</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const updatedUserData = {
                  name: e.target.name.value,
                  email: e.target.email.value,
                  role: e.target.role.value
                };
                handleEditSubmit(updatedUserData);
              }}>
                <input type="text" name="name" defaultValue={editUser.name} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <input type="email" name="email" defaultValue={editUser.email} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <select name="role" defaultValue={editUser.role} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Guardar Cambios</button>
                <button onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
