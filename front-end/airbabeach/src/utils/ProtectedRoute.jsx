import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Swal from 'sweetalert2'

export function ProtectedRoute({
    redirectPath = '/home',
    children,
}) {
    const { compareToken } = useAuth();

    if (!compareToken()) {

        Swal.fire({
            title: 'Acesso não autorizado!',
            width: '360',
            color: '#545776',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
        return <Navigate to={redirectPath} replace />;
    }
    return children;
}