import React,{useContext} from 'react';
import './header.css';
import {AuthContext} from "../../contexts/auth";

//@ts-ignore
import avatarImg from './../../assets/avatar.png';
import {Link} from "react-router-dom";

import { FiHome,FiUser,FiSettings, FiLogOut } from "react-icons/fi";


export default function Header() {

    const {user, signOut} = useContext(AuthContext);

    return (
        <div className="sidebar">
            <div>
                <img src={user?.cover === null? avatarImg : user?.cover} alt="Image User" />
            </div>
            <Link to={'/dashboard'}><FiHome color={"#FFF"} /> Chamados</Link>
            <Link to={'/customers'}><FiUser color={"#FFF"} /> Clientes</Link>
            <Link to={'/profile'}><FiSettings color={"#FFF"} /> Configurações</Link>
            <Link to={'/'} onClick={()=>signOut()}><FiLogOut color={"#FFF"} /> Sair</Link>
        </div>
    );
};
