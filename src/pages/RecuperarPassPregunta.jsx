import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CONFIGURACIONES } from '../config/confing';
import Modal from 'react-modal';

const ExtractSecretQuestionPage = () => {
  const [email, setEmail] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleExtractQuestion = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(CONFIGURACIONES.BASEURL2 + '/auth/forgotPasswordBySecretQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (res.ok) {
        setPreguntaSecreta(json.preguntaSecreta);
        setShowModal(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: json.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error interno 500 ' + error,
      });
    }
  };

  const handleResetPassword = async () => {
    try {
        const res = await fetch(CONFIGURACIONES.BASEURL2 + '/auth/recoverPasswordBySecretQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          preguntaSecreta,
          respuestaSecreta: respuesta,
          newPassword,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: json.message,
        });
        setShowModal(false); 
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: json.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error interno 500 ' + error,
      });
    }
  };

  return (
    <div className="bg-sky-200 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Super Pet</h1>
        <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Extraer Pregunta Secreta</h2>

        <form className="flex flex-col gap-4" onSubmit={handleExtractQuestion}>
          <label className="block" htmlFor="email">
            <span className="block text-sm font-medium text-slate-700">Correo Electrónico</span>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="input border border-gray-300 p-2 w-80 rounded-md"
              placeholder="Ingresa tu Correo Electrónico"
              required
            />
          </label>

          <button
            type="submit"
            className="btn bg-teal-700 rounded-lg p-2 w-80 hover:bg-emerald-400"
          >
            Extraer Pregunta Secreta
          </button>

          <p className="text-center text-sm mt-4">
            ¿Recuperar por codigo?{' '}
            <span
              className="text-emerald-500 cursor-pointer"
              onClick={() => navigate('/recuperarpass')}
            >
              Recupéralo aquí
            </span>
          </p>
        </form>

        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Reset Password Modal"
        >
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Cambiar Contraseña</h2>

            <p className="text-center text-gray-700 mb-4">Pregunta secreta: {preguntaSecreta}</p>

            <label htmlFor="respuesta" className="block text-sm font-medium text-gray-700">
              Respuesta Secreta:
            </label>
            <input
              type="text"
              id="respuesta"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              placeholder="Ingresa tu respuesta secreta"
              required
            />

            <label htmlFor="newPassword" className="block mt-4 text-sm font-medium text-gray-700">
              Nueva Contraseña:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              placeholder="Ingresa tu nueva contraseña"
              required
            />

            <div className="text-center mt-4">
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ExtractSecretQuestionPage;
