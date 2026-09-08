import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { AdminRestaurantProvider } from '../context/RestaurantContext';
import { AdminToastProvider } from './context/AdminToastContext';
import { AdminRoutes } from './routes';

export function AdminApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminRestaurantProvider>
          <AdminToastProvider>
            <AdminRoutes />
          </AdminToastProvider>
        </AdminRestaurantProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
