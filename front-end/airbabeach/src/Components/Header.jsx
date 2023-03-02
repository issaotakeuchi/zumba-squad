import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from 'phosphor-react'
import "./Header.scss";
import { useAuth } from "../contexts/auth";
import Swal from 'sweetalert2'


export function Header() {
  const { auth, user, deleteUser } = useAuth();
  const navigate = useNavigate();
  const [urlPath, setUrlPath] = useState(window.location.pathname);

  useEffect(() => {
    setUrlPath(window.location.pathname)
  }, [urlPath])


  function logout() {

    Swal.fire({
      title: 'Deseja realmente sair?',
      width: '360',
      color: '#545776',
      icon: 'question',
      focusCancel: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser()
        navigate('/home')
      } else {
        return
      }
    })
  }

  function changeScreen(type) {

    if (type === 'login') {
      navigate('/login')
    }
    if (type === 'createUser') {
      navigate('/createUser')
    }
    if (type === 'home') {
      navigate('/home')
    }

    setTimeout(() => { setUrlPath('') }, 1)
  }



  //devemos trocar o 'user' pelo 'auth' na verificação para ver se tem alguém logado
  return (
    <section className="headerFull">
      <section className="logoSection">
        <img onClick={() => changeScreen('home')} className="logoImg" src="src/assets/logo1-3.svg" alt="logotipo" />
        <h2 className="logoTagline">Sinta-se em casa</h2>
      </section>

      <div className="asideHolder" type={urlPath}>

        {user !== '' && (
          <div className="loggedIn">
            <p className="profilePicture">{user.shortName}</p>

            <div className="greetingAndName">
              <p className="">Olá,</p>
              <p className="greetingAndNameGreen">{user.name}</p>
            </div>
            <X size={26} onClick={logout} alt="Sair" weight="bold" className="btnLoggout" />
          </div>
        )}

        {user == '' &&
          <>
            {(urlPath === '/login' || urlPath === '/home') &&
              <button className='btnHeader' onClick={() => changeScreen('createUser')}>Criar conta</button>
            }

            {(urlPath === '/createUser' || urlPath === '/home') &&
              <button className='btnHeader' onClick={() => changeScreen('login')}>Iniciar sessão</button>
            }

          </>

        }

      </div>
    </section>
  );
}
