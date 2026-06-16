import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../apis/axiosInstance';
import { ROUTES } from '../constants/routes';

export default function ProtectedRoute() {
  if (!getAccessToken()) {
    return (
      <Navigate to={ROUTES.MAIN} state={{ showLoginModal: true }} replace />
    );
  }
  return <Outlet />;
}
