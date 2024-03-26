import React, { useState, useEffect } from "react";
import { CONFIGURACIONES } from "../config/confing";

const DispositivoIoT = () => {
  const [petDoorData, setPetDoorData] = useState(null);
  const [newClosingTime, setNewClosingTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ubicacion, setUbicacion] = useState(false);

  const fetchPetDoorData = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + "/petdoor/65f3aa4b4a8f1b582066b244");
      if (response.ok) {
        const data = await response.json();
        setPetDoorData(data);
        setUbicacion(data.ubicacion);
      } else {
        console.error("Error al obtener los datos del dispositivo IoT:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener los datos del dispositivo IoT:", error);
    }
  };

  useEffect(() => {
    // Realizar la primera solicitud cuando el componente se monta
    fetchPetDoorData();

    // Establecer un intervalo para realizar solicitudes periódicas
    const intervalId = setInterval(fetchPetDoorData, 5000); // Solicitar cada 5 segundos

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

      const response = await fetch(CONFIGURACIONES.BASEURL + "/petdoor/update-closing-time/65f3aa4b4a8f1b582066b244", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ closingTime: newClosingTime }),
      });

      if (response.ok) {
        // Si la solicitud fue exitosa, actualiza los datos de la puerta
        await fetchPetDoorData();
      } else {
        console.error("Error al enviar la nueva hora de cierre:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar la nueva hora de cierre:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendUnlockTimeToBackend = async () => {
    try {
      const response = await fetch(CONFIGURACIONES.BASEURL + "/petdoor/update-closing-time/65f3aa4b4a8f1b582066b244", {
        method: "PUT",
        headers: {
          "Content-Type": "text/plain", // Cambiar el tipo de contenido a text/plain
        },
        body: "00:00", // Mandar solo el dato de 00:00
      });
  
      if (response.ok) {
        console.log("Hora de desbloqueo enviada al backend: 00:00");
        await fetchPetDoorData(); // Actualizar los datos de la puerta después de enviar la hora de desbloqueo
      } else {
        console.error("Error al enviar la hora de desbloqueo al backend. Código de respuesta:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar la hora de desbloqueo al backend:", error);
    }
  };
  
  
  return (
    <div className="bg-sky-200 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Detalles del Dispositivo IoT</h2>
        {petDoorData ? (
          <div>
            <p className="text-sm font-medium text-slate-700">Estado: {petDoorData.state ? "Cerrado" : "Abierto"}</p>
            <p className="text-sm font-medium text-slate-700">Peligro: {petDoorData.danger ? "Sí" : "No"}</p>
            <p className="text-sm font-medium text-slate-700">Modo Automático: {petDoorData.automaticMode ? "Sí" : "No"}</p>
            <p className="text-sm font-medium text-slate-700">Nombre: {petDoorData.name}</p>
            <p className="text-sm font-medium text-slate-700">Hora de Cierre: {petDoorData.closingTime}</p>
            <p className="text-sm font-medium text-slate-700">Ubicación: {ubicacion ? "Fuera" : "Dentro"}</p> {/* Mostrar ubicación */}
          </div>
        ) : (
          <p className="text-sm font-medium text-red-500">Cargando datos del dispositivo IoT...</p>
        )}

        {/* Formulario para ingresar la nueva hora de cierre */}
        <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="newClosingTime" className="block text-sm font-medium text-slate-700">
            En cuanto se mande la hora se cerra y abrira hasta esa hora la puerta:
          </label>
          <label htmlFor="newClosingTime" className="block text-sm font-medium text-slate-700">
            Nueva Hora de Cierre (Formato 24 horas):
          </label>
          <input
            type="text"
            id="newClosingTime"
            value={newClosingTime}
            onChange={handleNewClosingTimeChange}
            className="input border border-gray-300 p-2 w-full rounded-md"
            pattern="(?:2[0-3]|[01][0-9]):[0-5][0-9]"
            required
          />
          <button
            type="submit"
            className="btn bg-teal-700 rounded-lg p-2 w-full mt-2"
            disabled={!newClosingTime || isLoading}
          >

            {isLoading ? "Enviando..." : "Actualizar Hora de Cierre"}
          </button>
          <button
          onClick={sendUnlockTimeToBackend}
          className="btn bg-red-700 rounded-lg p-2 w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Desbloquear"}
        </button>
        </form>
      </div>
    </div>
  );
};

export default DispositivoIoT;
