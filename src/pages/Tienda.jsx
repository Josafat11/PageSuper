import React, { useEffect, useState } from "react";
import { CONFIGURACIONES } from "../config/confing";
import background from "../assets/logox.svg"

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage] = useState(9); // Cambiamos a 9 productos por página para mantener 3 por fila

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch(CONFIGURACIONES.BASEURL2 + "/products/");
        if (response.ok) {
          const data = await response.json();
          setProductos(data);

          // Extraer y guardar las categorías únicas de los productos
          const categoriasUnicas = [
            ...new Set(data.map((producto) => producto.category)),
          ];
          setCategorias(categoriasUnicas);
        } else {
          console.error("Error al obtener los productos:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    obtenerProductos();
  }, []);

  // Filtrar los productos por categoría seleccionada
  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(
        (producto) => producto.category === categoriaSeleccionada
      )
    : productos;

  // Obtener los productos de la página actual
  const indexOfLastProduct = currentPage * productosPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="bg-sky-100 pt-20 pb-20 bg-cover bg-center min-h-screen "
      style={{
        backgroundImage: `url(${background})` , backgroundSize: '150px 150px', backgroundColor: 'rgba(0, 0, 0, 0.01)'
      }} >
        <div className="container mx-auto px-4 ">
          <h2 className="text-5xl font-semibold mb-16 text-center text-white">
            Catálogo de Productos
          </h2>
          <div className="flex">
            {/* Selector de categoría */}
            <div className="mr-28">
              <h3 className="text-xl font-semibold mb-2 text-white">Categorías</h3>
              <select
                className="p-2 pr-12 border border-gray-300 rounded-md"
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            {/* Mostrar productos por categoría */}
            <div className="grid grid-cols-3 gap-12">
              {currentProducts.map((producto) => (
                <div
                  key={producto._id}
                  className="w-full bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-center justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-300 transition-shadow"
                  onClick={() => {
                    setSelectedProduct(producto);
                    setModalOpen(true);
                  }}
                >
                  <img
                    src={producto.imgURL}
                    alt={producto.name}
                    className="w-full h-60 object-cover rounded-2xl mb-4"
                  />
                  <div className="text-center">
                    <p className="pb-12 pt-5">{producto.name}</p>
                    <span className="text-sky-100 font-semibold hover:text-gray-400 cursor-pointer">
                      Ver más
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Paginación */}
          <div className="flex justify-center mt-8">
            <ul className="flex">
              {Array.from({ length: Math.ceil(productosFiltrados.length / productosPerPage) }, (_, i) => (
                <li key={i} className="mx-1">
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1 ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Modal */}
      {modalOpen && selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-600 p-8 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-white text-center">
              {selectedProduct.name}
            </h2>
            <img
              src={selectedProduct.imgURL}
              alt={selectedProduct.name}
              className="w-full h-50 object-cover rounded-2xl mb-4"
            />
            <p className="font-bold text-white pb-5" >Descripcion</p>
            <p className="text-white mb-4">
              {selectedProduct.description}
            </p>
            <p className="font-bold text-white" >Precio</p>
            <p className="text-white mb-4"> $ {selectedProduct.price}.00 MXN</p>
            <button
              className="bg-sky-700 font-bold p-2 text-white px-6 rounded-xl hover:bg-sky-500 transition-colors"
              onClick={() => setModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tienda;
