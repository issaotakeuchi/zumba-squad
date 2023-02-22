import { useEffect, useState } from "react";
import './CreateUser.scss'
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from 'phosphor-react'
import axios from "axios";


export function CreateUser() {

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9]).{8,}$");
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

    function cleanForm() {
        setFirstName('')
        setSurname('')
        setEmail('')
        setPassword('')
        setConfirnPassword('')
    }

    function changeVisibility() {
        setShow(!show)
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        const options = {
            headers: { 'X-Custom-Header': 'value' }
        }

        /* axios({
            method: 'post',
            url: '/',
            data: {
                firstName: firstName,
                surname: surname,
                email: email,
                password: password
            }
        }) */

        axios.post('/ ', {

            firstName: firstName,
            surname: surname,
            email: email,
            password: password

        }, options).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });


        cleanForm();
    }

    function validate(input) {

        switch (input) {
            case 'firstName':
                if (firstName === '') return setStatus({ type: 'firstNameError', message: 'Este campo é obrigatório' });
                if (firstName.length < 4) return setStatus({ type: 'firstNameError', message: 'O nome precisa ter mais de 3 letras' });
                break;
            case 'surname':
                if (surname === '') return setStatus({ type: 'surnameError', message: 'Este campo é obrigatório' });
                if (surname.length < 4) return setStatus({ type: 'surnameError', message: 'O sobrenome precisa ter mais de 3 letras' });
                break;
            case 'email':
                if (email === '') return setStatus({ type: 'emailError', message: 'Este campo é obrigatório' });
                break;
            case 'password':
                if (password === '') return setStatus({ type: 'passwordError', message: 'Este campo é obrigatório' });
                if (!password.match(strongRegex)) return setStatus({ type: 'passwordError', message: 'A senha deve conter pelo menos um caracter especial, número, 7 letras, letra maiúscula e múscula ' });
                if (confirnPassword !== '' && confirnPassword !== password) return setStatus({ type: 'confirnPasswordError', message: 'As duas senhas devem ser iguais' });
                break;
            case 'confirnPassword':
                if (confirnPassword === '') return setStatus({ type: 'confirnPasswordError', message: 'Este campo é obrigatório' });
                if (confirnPassword !== password) return setStatus({ type: 'confirnPasswordError', message: 'As duas senhas devem ser iguais' });
                break;
            default:
                if (firstName === '') return setStatus({ type: 'firstNameError', message: 'Este campo é obrigatório' });
                if (firstName.length < 4) return setStatus({ type: 'firstNameError', message: 'O nome precisa ter mais de 3 letras' });
                if (surname === '') return setStatus({ type: 'surnameError', message: 'Este campo é obrigatório' });
                if (surname.length < 4) return setStatus({ type: 'surnameError', message: 'O sobrenome precisa ter mais de 3 letras' });
                if (email === '') return setStatus({ type: 'emailError', message: 'Este campo é obrigatório' });
                if (password === '') return setStatus({ type: 'passwordError', message: 'Este campo é obrigatório' });
                if (!password.match(strongRegex)) return setStatus({ type: 'passwordError', message: 'A senha deve conter pelo menos um caracter especial, número, 7 letras, letra maiúscula e múscula ' });
                if (confirnPassword === '') return setStatus({ type: 'confirnPasswordError', message: 'Este campo é obrigatório' });
                if (confirnPassword !== password) return setStatus({ type: 'confirnPasswordError', message: 'As duas senhas devem ser iguais' });
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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onBlur={() => validate('firstName')}
                        />
                    </div>
                    {status.type === 'firstNameError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                    {status.type === 'surnameError' ? <p className="text-small errorSpace" style={{ color: '#ffffff00' }}>{status.message}</p> : ""}
                </div>

                <div className="errorContainer">
                    <div className="inputs">
                        <label htmlFor="surname" className="text-small">Sobrenome</label>
                        <input
                            className="text-small"
                            type="text"
                            name="surname"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            onBlur={() => validate('surname')}
                        />
                    </div>
                    {status.type === 'surnameError' ? <p className="text-small errorMsg">{status.message}</p> : ""}
                    {status.type === 'firstNameError' ? <p className="text-small errorSpace" style={{ color: '#ffffff00' }}>{status.message}</p> : ""}
                </div>
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
                    onBlur={() => validate('email')}
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
                    onBlur={() => validate('password')}
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

            <div className="inputs">
                <label htmlFor="confirnPassword" className="text-small">Confirmar senha</label>
                <input
                    className="text-small"
                    type={show ? 'text' : 'Password'}
                    name="confirnPassword"
                    id="confirnPassword"
                    value={confirnPassword}
                    onChange={(e) => setConfirnPassword(e.target.value)}
                    onBlur={() => validate('confirnPassword')}
                />
            </div>
            {status.type === 'confirnPasswordError' ? <p className="text-small errorMsg" style={{ alignSelf: 'flex-end' }}>{status.message}</p> : ""}

            <button className="btn" type="submit"> Criar conta </button>

            <p className="text-small">
                Já tem uma conta?
                <Link to={'/login'} className='linkStyle'>Iniciar sessão</Link>
            </p>
        </form>

    )
}