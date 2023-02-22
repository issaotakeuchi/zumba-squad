import axios from "axios"
import { useState } from "react"
import { createContext, useContext } from "react"

// Criação do Contexto
const AuthContext = createContext()

export function AuthProvider(props) {

  const authLocalStorage = localStorage.getItem('auth')


  const [auth, setAuth] = useState(authLocalStorage === null ? '' : authLocalStorage)

  // Função responsavel por salvar o token
  function saveToken(tokenReceived) {

    if (tokenReceived !== auth) {

      setAuth(tokenReceived)
      localStorage.setItem('auth', tokenReceived)

    }

  }
  //método 1
  //axios.defaults.headers.common['Authorization'] = 'teste'

  //método 2
  //axios.defaults.headers.common['Auth_Token'] = 'teste 2'


  //método 3
  /* //Testando interceptor de rotas
  // declare a request interceptor
  axios.interceptors.request.use(config => {
    // perform a task before the request is sent

    if (config.method == "post") {
      console.log("Enviando um post");
    }
    if (config.method == "get") {
      console.log("Enviando um get");
    }
    if (config.method == "delete") {
      console.log("Enviando um delete");
    }
    if (config.method == "patch") {
      console.log("Enviando um patch");
    }

    console.log(config);

    //método 3
    config.headers.Authorization = 'teste 3';

    return config;
  }, error => {
    // handle the error
    return Promise.reject(error);
  }); */


  return (

    <AuthContext.Provider value={{ auth, saveToken }}>
      {props.children}
    </AuthContext.Provider>

  )

}

export function useAuth() {

  const context = useContext(AuthContext)

  return context

}
