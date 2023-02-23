import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";


export function ProtectedRoute({
    redirectPath = '/home',
    children,
}) {
    //como verificar se esse jwt é válido para esse usuário???
    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to={redirectPath} replace />;
    }
    return children;
}