import "./Sidebar.scss";
import { useState } from "react";
import { FacebookLogo, LinkedinLogo, TwitterLogo, InstagramLogo, X } from 'phosphor-react'

export function Sidebar() {
  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const [animation, setAnimation] = useState("");

  const toggleSidebar = () => {
    if (!sidebarDisplay) {
      setSidebarDisplay(true);
      setTimeout(() => setAnimation("active"), 0);
    } else {
      setAnimation("none");
      setTimeout(() => setSidebarDisplay(false), 300);
    }
  };  

  return (
    <>
      <div className={`hamburger ${sidebarDisplay ? "active" : ""}`} onClick={toggleSidebar}>
        <div className="line" id="line1"></div>
        <div className="line" id="line2"></div>
        <div className="line" id="line3"></div>
      </div>
      <aside className={`sidebar ${animation}`} style={{ visibility: sidebarDisplay ? "visible" : "hidden" }}>
        <nav>
          <div className="sidebarHeader">
            <X size={32} onClick={toggleSidebar} color="white" weight="bold" id="btnFechar" />
            <h2>MENU</h2>
          </div>
          <div className="menuHolder">
            <div>
              <ul className="menu">
                <li className="menu-item"><a href="#" className="menu-link">Criar conta</a></li>
                <hr />
                <li className="menu-item"><a href="#" className="menu-link">Fazer login</a></li>
              </ul>
            </div>
            <div className="socialMidia">
              <a href="#"><FacebookLogo size={28} weight="fill" /></a>
              <a href="#"><LinkedinLogo size={25} weight="bold" /></a>
              <a href="#"><TwitterLogo size={24} weight="fill" /></a>
              <a href="#"><InstagramLogo size={25} /></a>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}