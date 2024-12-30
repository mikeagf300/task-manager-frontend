import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, token, logout } = useAuth();

  // Para verificar que detecta cambios
  useEffect(() => {
    console.log("Usuario en Navbar:", user);
    console.log("Token en Navbar:", token);
  }, [user, token]);

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Bienvenido, {user.username || "Usuario"}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 rounded-md"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="mr-4">
              Iniciar Sesión
            </a>
            <a href="/register" className="px-4 py-2 bg-green-500 rounded-md">
              Registrarse
            </a>
          </>
        )}
      </div>
    </nav>
  );
  
};

export default Navbar;


