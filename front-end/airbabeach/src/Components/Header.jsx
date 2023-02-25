import "./Header.scss"

export function Header() {
    let year = new Date().getFullYear()

    return (

        <header className="headerFull">
            <div className="logoHolder">
                <img src="src/img/logo.png" alt="logotipo" />
                <h2 className="logoTagline">Sinta-se em casa</h2>
            </div>

            <div className="btnHolder">
                <button className="btn" type="submit">Criar conta</button>
                <button className="btn" type="submit">Iniciar sessão</button>
            </div>
        </header>

    )
}