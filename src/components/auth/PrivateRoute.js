import { useUserAuthentication } from "../adverts/AdvertsList/hooks/useUserAuthentication";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useUserAuthentication();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
