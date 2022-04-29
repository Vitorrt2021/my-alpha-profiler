import { Navigate } from "react-router-dom";

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
