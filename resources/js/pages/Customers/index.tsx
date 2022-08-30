import React, {useState, useContext} from 'react';
import './customers.css';
import Header from "../../components/Header";
import Title from "../../components/Title";
import {FiUser} from "react-icons/fi";
import api from "../../services/api";
import {toast} from "react-toastify";
import {AuthContext} from "../../contexts/auth";

export function Customers() {
    const {signed, user} = useContext(AuthContext);
    const [nameFantasy, setNameFantasy] = useState('');
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telephone, setTelephone] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!nameFantasy || !name || !cnpj || !telephone) {
            toast.error("Preencha pelo menos o nome fantasia, nome, CNPJ e telefone");
            return;
        }
        await api.post('/customers', {
            fantasy_name: nameFantasy,
            name: name,
            cnpj: cnpj,
            phone: telephone,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
            zipcode: zipCode
        },{
            headers: {
                Authorization: 'Bearer ' + user?.token,
            }
            }
            ).then(() => {
            setNameFantasy('');
            setName('');
            setCnpj('');
            setTelephone('');
            setStreet('');
            setNumber('');
            setComplement('');
            setNeighborhood('');
            setCity('');
            setState('');
            setZipCode('');
            toast.success("Cliente cadastrado com sucesso");
        }).catch((error) => {
            console.log(error);
            toast.error("Erro ao cadastrar cliente");
        });
    }

    return (
        <div>
            <Header/>

            <div className='content'>
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>

                <div className='container'>
                    <form className={"formProfile"} onSubmit={handleSave}>

                        <label>Empresa</label>
                        <input type="text" placeholder="Nome Fantasia da Empresa" value={nameFantasy}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameFantasy(e.target.value)}/>

                        <label>Razão Social</label>
                        <input type="text" placeholder="Razão Social da Empresa" value={name}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>

                        <label>CNPJ</label>
                        <input type="text" placeholder="CNPJ da Empresa" value={cnpj}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCnpj(e.target.value)}/>

                        <label>Telefone</label>
                        <input type="text" placeholder="Telefone da Empresa" value={telephone}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelephone(e.target.value)}/>

                        <div className="address-form">
                            <label>Endereço</label>
                        </div>

                        <label>CEP</label>
                        <input type="text" placeholder="00000-000" value={zipCode}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZipCode(e.target.value)}/>

                        <label>Logradouro</label>
                        <input type="text" placeholder="Logradouro da Empresa" value={street}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}/>

                        <label>Número</label>
                        <input type="text" placeholder="Número da Empresa" value={number}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}/>

                        <label>Complemento</label>
                        <input type="text" placeholder="Casa, Apto, ..." value={complement}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComplement(e.target.value)}/>

                        <label>Bairro</label>
                        <input type="text" placeholder="Bairro da Empresa" value={neighborhood}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNeighborhood(e.target.value)}/>

                        <label>Cidade</label>
                        <input type="text" placeholder="Cidade da Empresa" value={city}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}/>

                        <label>Estado</label>
                        <input type="text" placeholder="Estado da Empresa" value={state}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value)}/>


                        <button type="submit" className="btnProfile">Salvar</button>
                    </form>
                </div>
            </div>

        </div>
    );
};
