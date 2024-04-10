import React, { useState, useEffect } from "react";
import { CONFIGURACIONES } from "../config/confing";
// Iconos
import { GiSteelDoor } from "react-icons/gi";
import { HiLockClosed ,  HiLockOpen } from "react-icons/hi2";
import { PiClockCountdownDuotone } from "react-icons/pi";
import { AiOutlineAlert } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import { MdOutlineMotionPhotosAuto } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";
import { GiEntryDoor } from "react-icons/gi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
// Iconos

// Imagenes widget
// import imagenCerrado from "../assets/candado_cerrado.png";
// import imagenAbierto from "../assets/candado_abierto.png";
// import imagenPeligro from "../assets/peligro.png";
// import imagenAutomatico from "../assets/modo_automatico.png";
// import imagenNombre from "../assets/puerta.png";
// import imagenCierre from "../assets/hora_cierre.png";
// import imagenUbicacion from "../assets/ubicacion.png";
//Imagenes como widget

import Swal from "sweetalert2";

const DispositivoIoT = () => {
  const [petDoorData, setPetDoorData] = useState(null);
  const [newClosingTime, setNewClosingTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ubicacion, setUbicacion] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPetDoorData = async () => {
    try {
      const response = await fetch(
        CONFIGURACIONES.BASEURL + "/petdoor/65f3aa4b4a8f1b582066b244"
      );
      if (response.ok) {
        const data = await response.json();
        setPetDoorData(data);
        setUbicacion(data.ubicacion);
      } else {
        console.error(
          "Error al obtener los datos del dispositivo IoT:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al obtener los datos del dispositivo IoT:", error);
    }
  };

  useEffect(() => {
    // Realizar la primera solicitud cuando el componente se monta
    fetchPetDoorData();

    // Establecer un intervalo para realizar solicitudes periódicas
    const intervalId = setInterval(fetchPetDoorData, 500); // Solicitar cada 5 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  const handleNewClosingTimeChange = (event) => {
    setNewClosingTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Validar que la hora ingresada esté en formato de 24 horas (HH:mm)
      const timePattern = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
      if (!timePattern.test(newClosingTime)) {
        alert("Por favor ingresa la hora en formato de 24 horas (HH:mm).");
        return;
      }

      const response = await fetch(
        CONFIGURACIONES.BASEURL +
          "/petdoor/update-closing-time/65f3aa4b4a8f1b582066b244",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ closingTime: newClosingTime }),
        }
      );

      if (response.ok) {
        // Si la solicitud fue exitosa, actualiza los datos de la puerta
        await fetchPetDoorData();
      } else {
        console.error(
          "Error al enviar la nueva hora de cierre:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al enviar la nueva hora de cierre:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendUnlockTimeToBackend = async () => {
    try {
      const unlockTimeUrl =
        CONFIGURACIONES.BASEURL +
        "/petdoor/update-closing-time/65f3aa4b4a8f1b582066b244";
      const jsonData = '{"closingTime": "00:00"}'; // Mandar 00:00 para desbloquear

      const response = await fetch(unlockTimeUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      if (response.ok) {
        console.log("Hora de desbloqueo enviada al backend: 00:00");
        await fetchPetDoorData(); // Actualizar los datos de la puerta después de enviar la hora de desbloqueo
      } else {
        console.error(
          "Error al enviar la hora de desbloqueo al backend. Código de respuesta:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al enviar la hora de desbloqueo al backend:", error);
    }
  };

  const handleRequest = async (requestBody) => {
    try {
      const response = await fetch(
        CONFIGURACIONES.BASEURL +
          "/petdoor/update-closing-time/65f3aa4b4a8f1b582066b244",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        console.log("Pet door updated successfully");
        // Si el campo 'danger' es igual a "Sí", llama a la función addToHistorial
        // Llamada a la función addToHistorial
        if (requestBody.danger === true) {
          await addToHistorial({
            name: requestBody.name,
            state: requestBody.state,
            danger: requestBody.danger,
            automaticMode: requestBody.automaticMode,
            timeOutside: requestBody.timeOutside,
            userId: requestBody.userId,
            closingTime: requestBody.closingTime,
            ubicacion: requestBody.ubicacion,
          });
        }

      } else {
        console.error("Failed to update pet door:", response.status);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Internal error 500",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Internal error 500",
      });
    }
  };
  const addToHistorial = async (data) => {
    try {
      const response = await fetch(
        CONFIGURACIONES.BASEURL + "/historia/historial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const json = await response.json();
  
      if (json.message === "Datos agregados al historial exitosamente") {
        console.log("Datos agregados al historial exitosamente");
      } else {
        console.error("Error al agregar datos al historial:", json.message);
      }
    } catch (err) {
      console.error("Error al agregar datos al historial:", err);
    }
  };
  
  const handleVerHistorial = async () => {
    try {
      const response = await fetch(
        CONFIGURACIONES.BASEURL + "/historia/historial"
      );
      const data = await response.json();
      setHistorial(data);
      setShowModal(true);
    } catch (err) {
      console.error("Error al obtener el historial:", err);
    }
  };
  

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-sky-200 flex justify-center items-center pb-24 pt-10">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-5xl font-bold text-center text-gray-700 mb-4 ">
          Detalles del Dispositivo IoT
        </h2>

        {petDoorData ? (
          <div className="grid grid-cols-5 gap-4 pt-6">
            {/* Primera fila */}
            <div className="flex items-center flex-col col-span-3">
              <p className="text-lg font-bold font-serif text-slate-700">
                Nombre Dispositivo:
              </p>
              <GiSteelDoor
                size={110}
                color="#3D3736"
                className=""
              /> {/* Icono de puerta cerrada */}
              <p className="text-lg font-medium text-slate-700">
                {petDoorData.name}
              </p>
            </div>
            
            <div className="flex items-center flex-col col-span-2">
              <p className="text-lg font-bold font-serif text-slate-700">
                Estado:
              </p>
              {petDoorData.state ? <HiLockClosed size={110} color="#3D3736" /> : <HiLockOpen size={110} color="#3D3736" />}
              <p className="text-lg font-semibold text-slate-700">
                {petDoorData.state ? "Cerrado" : "Abierto"}
              </p>
            </div>

            {/* Segunda fila */}
            <div className="flex items-center flex-col col-span-1">
              <p className="text-lg font-bold font-serif text-slate-700">
                Peligro:
              </p>
              {petDoorData.danger ? (
                // Si hay peligro, mostrar el icono lleno
                <AiFillAlert size={110} color="#B92D15" />
              ) : (
                // Si no hay peligro, mostrar el icono contorno
                <AiOutlineAlert size={110} color="#3D3736" />
              )}
              <p className="text-lg font-medium text-slate-700">
                Peligro: {petDoorData.danger ? "Sí" : "No"}
              </p>
            </div>

            <div className="flex items-center flex-col col-span-1">
              <p className="text-lg font-bold font-serif text-slate-700">
                Modo Automático:
              </p>
              <MdOutlineMotionPhotosAuto size={110} color="#3D3736" />
              <p className="text-lg font-medium text-slate-700">
                {petDoorData.automaticMode ? "Activo" : "Inactivo"}
              </p>
            </div>

            <div className="flex items-center flex-col col-span-1">
              <p className="text-lg font-bold font-serif text-slate-700">
                Hora de Cierre:
              </p>
              <PiClockCountdownDuotone
                size={110}
                color="#3D3736"
              />
              <p className="text-lg font-medium text-slate-700">
                {petDoorData.closingTime}
              </p>
            </div>

            <div className="flex items-center flex-col col-span-1">
              <p className="text-lg font-bold font-serif text-slate-700">
                Ubicación:
              </p>
              {ubicacion ? (
                <GiEntryDoor size={110} color="#3D3736" />
              ) : (
                <GiExitDoor size={110} color="#3D3736" />
              )}
              <p className="text-lg font-medium text-slate-700">
                {ubicacion ? "Fuera" : "Dentro"}
              </p>
            </div>

            {/* Resto de los elementos en la misma fila */}
            <div className="flex items-center flex-col col-span-1">
              <p className="text-lg font-bold font-serif text-slate-700">
                Temperatura:
              </p>
              <LiaTemperatureHighSolid size={110} color="#3D3736" />
              <p className="text-lg font-medium text-slate-700">
                {petDoorData.temperatura} C°
              </p>
            </div>
          </div>      
        ) : (
          <p className="text-sm font-medium text-red-500">
            Cargando datos del dispositivo IoT...
          </p>
        )}

        {/* Formulario para ingresar la nueva hora de cierre */}
        <form onSubmit={handleSubmit} className="mt-4">
          <label
            htmlFor="newClosingTime"
            className="block text-2xl font-bold text-sky-900 text-center pb-5 pt-5"
          >
            Nueva Hora de Cierre (Formato 24 horas):
          </label>
          <label
            htmlFor="newClosingTime"
            className="block text-base text-center font-medium text-slate-700 p-3"
          >
            *En cuanto se mande la hora se cerrará y abrirá hasta esa hora la
            puerta*
          </label>
          <input
            type="text"
            id="newClosingTime"
            value={newClosingTime}
            onChange={handleNewClosingTimeChange}
            className="input border border-gray-300 p-2 w-full rounded-md mb-5"
            pattern="(?:2[0-3]|[01][0-9]):[0-5][0-9]"
            placeholder="Ingresar Hora"
            required
          />
          <button
            type="submit"
            className="btn bg-teal-600 rounded-lg p-2 w-full mt-2 hover:bg-teal-700 hover:font-medium"
            disabled={!newClosingTime || isLoading}
          >
            {isLoading ? "Enviando..." : "Actualizar Hora de Cierre"}
          </button>
        </form>

        {/* Botón para desbloquear */}
        <button
          onClick={sendUnlockTimeToBackend}
          className="btn bg-red-600 rounded-lg p-2 w-full mt-2 hover:bg-red-700 hover:font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Desbloquear"}
        </button>


        {/* Modal para mostrar el historial */}
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Historial
                      </h3>
                      <div className="mt-2">
                        <ul role="list" className="divide-y divide-gray-200">
                          {historial.map((item, index) => (
                            <li key={index} className="py-4">
                              <div className="flex space-x-3">
                                <div className="flex-1 space-y-1">
                                  <p className="text-md font-medium">
                                    {item.date}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DispositivoIoT;
