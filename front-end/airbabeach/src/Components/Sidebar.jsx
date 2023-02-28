import "./Sidebar.scss";
import { useState } from "react";
import { FacebookLogo, LinkedinLogo, TwitterLogo, InstagramLogo, X } from 'phosphor-react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";


export function Sidebar() {
  const { auth, user, deleteUser } = useAuth();
  const navigate = useNavigate();

  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const [animation, setAnimation] = useState("");

  const [isLogged, setLogged] = useState(false);


  function toggleSidebar() {
    if (!sidebarDisplay) {
      setSidebarDisplay(true);
      setAnimation("active")

    } else {
      setAnimation("none");
      setSidebarDisplay(false)

    }
  };

  function logout() {
    deleteUser()
    navigate('/home')
    toggleSidebar()

  }


  //falta reconhecer a url atual para ativar os botões de redirecionamento
  //falta criar o alert de confirmar deslogar ou não


  return (
    <section className="sideSection">
      <div className={`hamburger ${sidebarDisplay ? "active" : ""}`} onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <aside className={`sidebar ${animation}`}>
        <nav className="sidebarNav1">
          <X size={32} onClick={toggleSidebar} color="white" weight="bold" className="btnFechar" />

          {user &&
            <div className="loggedIn">
              <p className="profilePicture">{user.shortName}</p>

              <div className="greetingAndName">
                <p className="greeting">Olá,</p>
                <p className="greetingAndNameCoral">{user.name}</p>
              </div>

              <p className="loggoutText" onClick={logout} >Deseja <a href="#" className="loggoutLink">encerrar a sessão</a>?</p>
            </div>
          }

          {!user &&
            <div className="loggedOut">
              <h2 className="h2Menu">MENU</h2>
              <ul className="menu">

                <li className="menu-item"><Link to={'/createUser'} className="menu-link" onClick={toggleSidebar}>Criar conta</Link></li>
                <hr className="hrStyle1" />

                <li className="menu-item"><Link to={'/login'} className="menu-link" onClick={toggleSidebar}>Fazer login</Link></li>
              </ul>
            </div>
          }

          <div className="socialMidia">
            {isLogged && <hr className="hrStyle2" />}
            <a href="#" className="socialMediaIcon" ><FacebookLogo size={28} weight="fill" /></a>
            <a href="#" className="socialMediaIcon" ><LinkedinLogo size={25} weight="bold" /></a>
            <a href="#" className="socialMediaIcon" ><TwitterLogo size={24} weight="fill" /></a>
            <a href="#" className="socialMediaIcon" ><InstagramLogo size={25} /></a>
          </div>

        </nav>

      </aside>
    </section>
  );
}