import { useState } from "react";
import "./Header.scss";

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        </div>
        <div className="hamburger" onClick={handleHamburgerClick}>
        </div>

        <button className="btn" type="submit">
          Criar conta
        </button>
        <button className="btn" type="submit">
          Iniciar sessão
        </button>
      </div>
    </header>
  );
}
