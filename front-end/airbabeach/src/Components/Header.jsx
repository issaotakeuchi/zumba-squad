import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { X } from 'phosphor-react'
import "./Header.scss";

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogged, setLogged] = useState(true);

  function handleHamburgerClick() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <header className="headerFull">
      <div className="logoHolder">
        <img src="src/img/logo.png" alt="logotipo" />
        <h2 className="logoTagline">Sinta-se em casa</h2>
      </div>

      <div className="asideHolder">

        {isLogged && (
          <div className="loggedIn">
            <div className="profilePicture">
              <img src="src/img/profile.png" alt="logotipo" />
            </div>
            <div className="greetingAndName">
              <p className="">Olá,</p>
              <p className="greetingAndNameGreen">Bruno Rocha</p>
            </div>
            <div className="btnLoggout">
              <X size={26} onClick={setLogged} alt="Sair" color="var(--grey-darkest)" weight="bold" id="btnFechar" />
            </div>
          </div>
        )}


        <div className="hamburger" onClick={handleHamburgerClick}>
        <Sidebar />
        </div>

        {!isLogged && (
          <div className="btnHolder">
            <button className="btn" type="submit">
              Criar conta
            </button>
            <button className="btn" type="submit">
              Iniciar sessão
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
