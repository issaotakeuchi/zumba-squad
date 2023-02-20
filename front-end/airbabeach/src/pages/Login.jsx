import { useEffect, useState } from "react";
import './Login.scss'
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from 'phosphor-react'


export function Login() {

  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9]).{8,}$");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const userObject = {
    emailUserInput: "",
    passwordUserInput: "",
  }

  useEffect(() => {
    if (password.match(strongRegex)) {
      console.log(true);
    }

  }, [password])

  const [status, setStatus] = useState({
    type: '',
    message: ''
  })

  function changeVisibility() {
    setShow(!show)
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateInputs()) return;
    validateLogin();

    setEmail('')
    setPassword('')
  }


  async function validateLogin() {

    function loginSuccess(jwtRecebido) {
      localStorage.setItem("jwt",jwtRecebido);
      location.href = "home"
  }
    userObject.emailUserInput = email;
    userObject.passwordUserInput = password;
    const endpointLogin = "https://nossoEndpoint.com/login";
    const loginUserJason = JSON.stringify(userObject);

    const configRequest = {
      method: 'POST',
      body: loginUserJason,
      headers: {
        'content-type': 'application/json'
      }
    }

    await fetch(endpointLogin, configRequest)
      .then(
        resultado => {
          if (resultado.status == 201) {
            return resultado.json();
          }
          throw resultado;
        })
      .then(
        resultado => {
          loginSuccess(resultado.validToken)
        })
      .catch(
        erro => {
          if (erro.status == 404) return setStatus({ type: 'loginError', message: 'Usuário não encontrado' });
          if (erro.status == 404) return setStatus({ type: 'loginError', message: 'Usuário ou senha não encontrados.' });
          { status.type === 'loginError' ? <p className="text-small errorMsg">{erro.status}</p> : "" }
        });
  }

  function validateInputs(input) {

    switch (input) {
      case 'email':
        if (email === '') return setStatus({ type: 'emailError', message: 'Este campo é obrigatório' });
        break;
      case 'password':
        if (password === '') return setStatus({ type: 'passwordError', message: 'Este campo é obrigatório' });
        break;
      default:
        if (email == undefined || email === null) return setStatus({ type: 'emailError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
        if (password == undefined || password === null) return setStatus({ type: 'passwordError', message: 'Erro ao preencher o formuário. Recarregue a página e tente novamente.' });
        break;
    }

    //apagar o status da mensagen
    setStatus({
      type: '',
      message: ''
    })
    return true;
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h1>Iniciar Sessão</h1>
      <div className="containerInputs">
      </div>
      <div className="inputs">
        <label htmlFor="email" className="text-small">Email</label>
        <input
          className="text-small"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateInputs('email')}
        />
      </div>
      {status.type === 'emailError' ? <p className="text-small errorMsg">{status.message}</p> : ""}

      <div className="inputs">
        <label htmlFor="password" className="text-small">Senha</label>
        <input
          className="text-small"
          type={show ? 'text' : 'password'}
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => validateInputs('password')}
        />
        <div className="icontainer">
          {
            show ?
              <Eye size={24} className="iconStyle" onClick={changeVisibility} /> :
              <EyeSlash size={24} className="iconStyle" onClick={changeVisibility} />
          }
        </div>
      </div>
      {status.type === 'passwordError' ? <p className="text-small errorMsg">{status.message}</p> : ""}

      <button className="btn" type="submit"> Entrar </button>
      {status.type === 'loginError' ? <p className="text-small errorMsg">{erro.status}</p> : ""}

      <p className="text-small">
        Ainda não tem conta?
        <Link to={'/login'} className='linkStyle'>Registre-se.</Link>
      </p>
    </form>

  )
}