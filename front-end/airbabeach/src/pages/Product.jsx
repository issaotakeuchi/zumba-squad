import "./Product.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from "../contexts/auth";
import axios from "axios";
import { toast } from 'react-toastify';

export function Product(){
    //const { saveToken, saveUser  } = useAuth();
    const { id } = useParams()
    //const navigate = useNavigate();
    const [productData, setProductData] = useState("");

    console.log(id);

    useEffect(() => {
      
        let url = `https://www.airbabeach/product/${id}`;
       

      
        

        const options = {
            headers: { 'X-Custom-Header': 'value' }
        }

        axios.get(url, options).then((response) => {
            console.log(response);

            setProductData(response)

            if (type === 'login') {
                saveToken(response.token)
                saveUser(response.user)
                toast.success("Usuário logado com sucesso")
                navigate('/home')
            } else {
                toast.success("Usuário criado com sucesso")
                navigate('/login')
            }

        }, (error) => {
            console.log(error.code);

            if (type === 'login') {
                //if (error.status == 404) return setStatus({ type: 'loginError', message: 'Usuário não encontrado' });
                //if (error.status == 404) return setStatus({ type: 'loginError', message: 'Usuário ou senha não encontrados.' });
                saveUser()
                if (error.status == 404) return toast.error('Usuário não encontrado');
                if (error.status == 404) return toast.error('Usuário ou senha não encontrados');
                if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');

            } else {
                //if (error.status == 404) return setStatus({ type: 'loginError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
                if (error.status == 404) return toast.error('Erro ao preencher o formuário. Recarregue a página e tente novamente.');
                if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');
            }
        });



      
      
    }, [])
    






    return (
        <p>Produto {id}</p>
    )
}