import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../contexts/auth";
//@ts-ignore
import logo from './../../assets/logo.png';
import './signin.css';

function SingIn() {

    const {signIn, loadingAuth} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email || !password) return;
        signIn({email, password});
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Sistema Logo"/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder='email@email.com' value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='*********' value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">{loadingAuth ? "Carregando ..." : "Acessar"}</button>
                </form>

                <Link to='/register'>Criar uma conta</Link>
            </div>
        </div>
    );
}

export default SingIn;
