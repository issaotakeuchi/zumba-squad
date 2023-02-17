import { useEffect, useState } from "react";
import './CreateUser.scss'
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from 'phosphor-react'






export function CreateUser() {
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirnPassword, setConfirnPassword] = useState("");
    const [show, setShow] = useState(false);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })


    function changeVisibility() {
        setShow(!show)
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        console.log(firstName);
        console.log(surname);
        console.log(email);
        console.log(password);
        console.log(confirnPassword);

        setFirstName('')
        setSurname('')
        setEmail('')
        setPassword('')
        setConfirnPassword('')
    }

    function validate() {
        /* if (
            firstName === '' ||
            surname === '' ||
            email === '' ||
            password === '' ||
            confirnPassword === ''
        ) return setStatus({ type: 'error', message: 'Este campo é obrigatório' }); */
        //if (valueLoginUser.loginUser.length < 5) return setStatus({ type: 'error', message: 'Login deve ser maior ou igual a que 5' });
        //if (valueLoginUser.password === '') return setStatus({ type: 'error', message: 'Necessario preencher o campo senha' });
        //if (valueLoginUser.password.length < 8) return setStatus({ type: 'error', message: 'Tamanho minimo da senha insuficiente' });


        if (firstName === '') return setStatus({ type: 'firstNameNull', message: 'Este campo é obrigatório' });
        if (surname === '') return setStatus({ type: 'surnameNull', message: 'Este campo é obrigatório' });
        if (email === '') return setStatus({ type: 'emailNull', message: 'Este campo é obrigatório' });
        if (password === '') return setStatus({ type: 'passwordNull', message: 'Este campo é obrigatório' });
        if (confirnPassword === '') return setStatus({ type: 'confirnPasswordNull', message: 'Este campo é obrigatório' });











        
        //apagar o status da mensagen
        setStatus({
            type: '',
            message: ''
        })
        return true;
    }




    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <h1>Criar conta</h1>
            <div className="containerInputs">
                <div className="errorContainer">
                    <div className="inputs">
                        <label htmlFor="firstName" className="text-small">Nome</label>
                        <input
                            className="text-small"
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    {status.type === 'firstNameNull' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                    {status.type === 'surnameNull' ? <p className="text-small" style={{color: '#ffffff00'}}>{status.message}</p> : ""}
                </div>

                <div className="errorContainer">
                    <div className="inputs">
                        <label htmlFor="surname" className="text-small">Sobrenome</label>
                        <input
                            className="text-small"
                            type="text"
                            name="surname"
                            id="surname"
                            value={surname} onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                    {status.type === 'surnameNull' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                    {status.type === 'firstNameNull' ? <p className="text-small" style={{color: '#ffffff00'}}>{status.message}</p> : ""}
                </div>
            </div>


            <div className="inputs">
                <label htmlFor="email" className="text-small">Email</label>
                <input
                    className="text-small"
                    type="email"
                    name="email"
                    id="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {status.type === 'emailNull' ? <p className="text-small errorMsg">{status.message}</p> : ""}

            <div className="inputs">
                <label htmlFor="password" className="text-small">Senha</label>
                <input
                    className="text-small"
                    type={show ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <div className="icontainer">
                    {
                        show ?
                            <Eye size={24} className="iconStyle" onClick={changeVisibility} /> :
                            <EyeSlash size={24}  className="iconStyle" onClick={changeVisibility} />
                    }
                </div>
            </div>
            {status.type === 'passwordNull' ? <p className="text-small errorMsg">{status.message}</p> : ""}

            <div className="inputs">
                <label htmlFor="confirnPassword" className="text-small">Confirmar senha</label>
                <input
                    className="text-small"
                    type={show ? 'text' : 'Password'}
                    name="confirnPassword"
                    id="confirnPassword"
                    value={confirnPassword} onChange={(e) => setConfirnPassword(e.target.value)}
                />
            </div>
            {status.type === 'confirnPasswordNull' ? <p className="text-small errorMsg" style={{ alignSelf: 'flex-end' }}>{status.message}</p> : ""}

            <button className="btn" type="submit"> Criar conta </button>

            <p className="text-small">
                Já tem uma conta?
                <Link to={'/login'} className='linkStyle'>Iniciar sessão</Link>
            </p>
        </form>

    )
}