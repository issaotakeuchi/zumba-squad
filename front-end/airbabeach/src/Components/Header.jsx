import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { X } from 'phosphor-react'
import "./Header.scss";
import { useAuth } from "../contexts/auth";

export function Header() {
  const { auth, user, deleteUser } = useAuth();
  const navigate = useNavigate();

  
  function logout() {
    deleteUser()
    navigate('/home')
  }

  function changeScreen(type) {
    if (type === 'login') {
      navigate('/login')
    }
    if (type === 'createUser') {
      navigate('/createUser')
    }
  }


  return (
    <section className="headerFull">

      <img src="src/img/logo.png" alt="logotipo" />
      <h2 className="logoTagline">Sinta-se em casa</h2>

      <div className="asideHolder">

        {user !== '' && (
          <div className="loggedIn">
            <p className="profilePicture">{user.shortName}</p>

            <div className="greetingAndName">
              <p className="">Olá,</p>
              <p className="greetingAndNameGreen">Bruno Rocha</p>
            </div>
            <X size={26} onClick={logout} alt="Sair" weight="bold" className="btnLoggout" />
          </div>
        )}

        {user=='' &&
          <>
            <button className='btnHeader' onClick={() => changeScreen('createUser')}>Criar conta</button>
            <button className='btnHeader' onClick={() => changeScreen('login')}>Iniciar sessão</button>
          </>
        }

      </div>
    </section>
  );
}
