import "./Sidebar.scss";
import { useState, useEffect } from "react";
import { FacebookLogo, LinkedinLogo, TwitterLogo, InstagramLogo, X } from 'phosphor-react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Swal from 'sweetalert2'


export function Sidebar() {
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();

  const [urlPath, setUrlPath] = useState(window.location.pathname);
  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const [animation, setAnimation] = useState("");

  //console.log(urlPath);

  useEffect(() => {
    setUrlPath(window.location.pathname)
  }, [urlPath])

  function toggleSidebar() {
    if (!sidebarDisplay) {
      setSidebarDisplay(true);
      setAnimation("active")
    } else {
      setSidebarDisplay(false)
      setAnimation("none");
    }

    setTimeout(()=>{setUrlPath('')},1)
  };

  function logout() {
    Swal.fire({
      title: 'Deseja realmente sair?',
      width: '360',
      color: '#545776',
      icon:'question',
      focusCancel: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        userLogout()
        navigate('/home')
        toggleSidebar()
      } else {
        return
      }
    })
  }


  //devemos trocar o 'user' pelo 'auth' na verificação para ver se tem alguém logado
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
              <h2 type={urlPath} className="h2Menu">MENU</h2>

              <ul className="menu">

                {urlPath !== '/createUser' && <li className="menu-item"><Link to={'/createUser'} className="menu-link" onClick={toggleSidebar}>Criar conta</Link></li>}

                {(urlPath !== '/createUser' && urlPath !== '/login') && <hr className="hrStyle1" />}

                {urlPath !== '/login' && <li className="menu-item"><Link to={'/login'} className="menu-link" onClick={toggleSidebar}>Fazer login</Link></li>}

              </ul>
            </div>
          }

          <div className="socialMidia">
            {user && <hr className="hrStyle2" />}
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