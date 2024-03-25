import React, { useEffect, useState } from 'react';
import { CONFIGURACIONES } from '../config/confing';
import { useDropzone } from 'react-dropzone'; // Importa la librería

const AdminProd = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    imgURL: ''
  });
  const [imagen, setImagen] = useState(null); // Estado para almacenar la imagen seleccionada

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(CONFIGURACIONES.BASEURL2 + "/products/", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Error al obtener los productos:', response.status);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    fetchProducts();
  }, []);


    // Función para manejar la subida del archivo de imagen
    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0]; // Selecciona el primer archivo de la lista de archivos aceptados
      setImagen(file); // Almacena el archivo de imagen en el estado
    };

     // Configuración de react-dropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL2 + `/products/${productId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
      } else {
        console.error('Error al eliminar el producto:', response.status);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleUpdate = (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    setEditProduct(selectedProduct);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setEditProduct(null);
    setNewProductData({
      name: '',
      category: '',
      price: '',
      description: '',
      imgURL: ''
    });
  };

  const handleEditSubmit = async (updatedProductData) => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL2 + `/products/${editProduct._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProductData)
      });
      if (response.ok) {
        const updatedProducts = products.map(product => {
          if (product._id === editProduct._id) {
            return { ...product, ...updatedProductData };
          }
          return product;
        });
        setProducts(updatedProducts);
        handleCloseModal();
      } else {
        console.error('Error al actualizar el producto:', response.status);
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProductData.name);
      formData.append('category', newProductData.category);
      formData.append('price', newProductData.price);
      formData.append('description', newProductData.description);
      formData.append('imagen', imagen); // Agrega la imagen al formData
      
      // Mostrar contenido de formData
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
      
      const response = await fetch(CONFIGURACIONES.BASEURL2 + '/products/', {
        method: 'POST',
        body: formData, // Envía el formData en lugar de JSON.stringify(newProductData)
      });
      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        handleCloseModal();
      } else {
        console.error('Error al agregar el producto:', response.status);
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData({ ...newProductData, [name]: value });
  };
  return (
    <div className="bg-sky-100 pt-36 pb-20 mt-30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">Administración de Productos</h2>
        <button onClick={() => setShowAddModal(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Agregar Producto</button>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleUpdate(product._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Actualizar</button>
                  <button onClick={() => handleDelete(product._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEditModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
              {/* Aquí va el formulario de edición */}
              <form onSubmit={(e) => {
                e.preventDefault();
                // Aquí puedes obtener los datos actualizados del formulario y pasarlos a handleEditSubmit
                const updatedProductData = {
                  name: e.target.name.value,
                  description: e.target.description.value,
                  price: e.target.price.value
                };
                handleEditSubmit(updatedProductData);
              }}>
                <input type="text" name="name" defaultValue={editProduct.name} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <textarea name="description" defaultValue={editProduct.description} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <input type="number" name="price" defaultValue={editProduct.price} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Guardar Cambios</button>
                <button onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
              </form>
            </div>
          </div>
        )}
        {showAddModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 w-[50%] h-[80%] rounded-lg overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}>
                <input type="text" name="name" value={newProductData.name} onChange={handleInputChange} placeholder="Nombre" className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <input type="text" name="category" value={newProductData.category} onChange={handleInputChange} placeholder="Categoría" className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <input type="number" name="price" value={newProductData.price} onChange={handleInputChange} placeholder="Precio" className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                <textarea name="description" value={newProductData.description} onChange={handleInputChange} placeholder="Descripción" className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                {/* Campo para subir imagen */}
                <div>
                  <label htmlFor="imagen" className="block mb-1">Imagen:</label>
                  <input id="imagen" type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} className="mb-2 px-4 py-2 border border-gray-300 rounded-md block w-full" />
                  {imagen && (
                    <div className="mb-2">
                      <p className="mb-1">Vista previa de la imagen:</p>
                      <img src={URL.createObjectURL(imagen)} alt="Vista previa" className="w-[50%] p-3 mt-2 h-auto" />
                    </div>
                  )}
                </div>
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

export default AdminProd;
