import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente envuelve la ruta y renderiza condicionalmente
const PrivateRoute = ({ element }) => {
  const { token } = useAuth();

  // Espera a que el token esté disponible
  if (token === undefined) {
    return <div>Loading...</div>;  // Puedes mostrar un loading mientras se recupera el token
  }

  return token ? element : <Navigate to="/login" />;
};




export default PrivateRoute;






