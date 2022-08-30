import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "./../../contexts/auth";
import './signup.css';
//@ts-ignore
import logo from './../../assets/logo.png';


function SingUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signUp,loading} = useContext(AuthContext);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(name === '' || email === '' || password === '') {
            return;
        }

        signUp({name, email, password});
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Sistema Logo"/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="Fulano de Tal" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder='email@email.com' value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='*********' value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">{loading ? "Carregando ..." : "Cadastrar"}</button>
                </form>

                <Link to='/'>Ja tenho uma conta! Entre</Link>
            </div>
        </div>
    );
}

export default SingUp;
