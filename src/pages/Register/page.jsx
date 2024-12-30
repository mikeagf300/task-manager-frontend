import { useState } from 'react';
import api from '../../services/api';

export default function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      setMessage(`Usuario registrado con exito`);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Registro</h1>
      <form onSubmit={handleSubmit} className="mt-6 w-80">
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md"
        >
          Registrarse
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

  