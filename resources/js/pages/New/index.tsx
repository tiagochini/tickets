import React, {useContext, useEffect, useState} from 'react';
import './new.css';
import Header from "../../components/Header";
import Title from "../../components/Title";
import {FiPlusCircle} from "react-icons/all";
import api from "../../services/api";
import {AuthContext} from "../../contexts/auth";
import {useNavigate, useParams} from "react-router-dom"
import {toast} from "react-toastify";

type customersList = {
    city: string | null;
    cnpj: string;
    complement: string | null;
    fantasy_name: string;
    id: number;
    name: string;
    neighborhood: string | null;
    number: string | null;
    phone: string | null;
    state: string | null;
    street: string | null;
    zipcode: string | null;
}

export function New() {
    const navigate = useNavigate();
    //@ts-ignore
    const {id} = useParams();
    const {user} = useContext(AuthContext);

    const [ticketEdit, setTicketEdit] = useState(false);
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customers, setCustomers] = useState<customersList[]>([]);

    const [title, setTitle] = useState('Novo Chamado');
    const [customer, setCustomer] = useState(0);
    const [subject, setSubject] = useState('support');
    const [status, setStatus] = useState('Aberto');
    const [description, setDescription] = useState('');


    function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            customer_id: customers[customer].id,
            customer_name: customers[customer].name,
            subject,
            status,
            description,
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + user?.token,
            }
        };

        if (ticketEdit) {
            api.put(`/tickets/` + id, data, headers
            ).then(response => {
                toast.success('Chamado atualizado com sucesso!');
                navigate("/dashboard");
            }).catch(err => {
                    toast.error('Erro ao atualizar chamado!');
                    console.log(err);
                }
            );
        } else {
            api.post('/tickets', data, headers
            ).then(response => {
                console.log(response);
            }).catch(err => {
                    console.log(err);

                }
            ).finally(() => {
                setTitle('Novo Chamado');
                setCustomer(0);
                setSubject('support');
                setStatus('Aberto');
                setDescription('');
            });
        }
    }

    function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSubject(e.target.value);
    }

    function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStatus(e.target.value);
    }

    function handleChangeCustomer(e: React.ChangeEvent<HTMLSelectElement>) {
        setCustomer(parseInt(e.target.value));
    }

    async function loadTicket(id: string | undefined) {
        api.get(`/tickets/${id}`, {
            headers: {
                Authorization: 'Bearer ' + user?.token,
            }
        }).then(response => {
            setSubject(response.data.subject);
            setStatus(response.data.status);
            setDescription(response.data.description);

            let index = customers.findIndex(customer => customer.id == response.data.customer_id);
            setCustomer(index);
            setTicketEdit(true);
        }).catch(err => {
                console.log(err);
                setTitle('Novo Chamado');
                setCustomer(0);
                setSubject('support');
                setStatus('Aberto');
                setDescription('');
                setTicketEdit(false);
            }
        );
    }

    useEffect(() => {
        api.get('/customers', {
            headers: {
                Authorization: 'Bearer ' + user?.token,
                accept: "application/json",
            }
        }).then(response => {
                setCustomers(response.data);
                setLoadCustomer(false);
                if (response.data.length === 0) {
                    setCustomers([{
                        id: 0,
                        fantasy_name: 'Freela',
                        name: 'Freela',
                        cnpj: '',
                        street: '',
                        number: '',
                        complement: '',
                        neighborhood: '',
                        city: '',
                        state: '',
                        zipcode: '',
                        phone: ''
                    }]);
                }
            }
        ).catch(error => {
            console.log(error);
            setCustomers([{
                id: 0,
                fantasy_name: 'Freela 1',
                name: 'Freela',
                cnpj: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                zipcode: '',
                phone: ''
            }]);
            setLoadCustomer(false);
        });
    }, []);

    useEffect(() => {
        if (customers.length > 0) {
            if (id) {
                setTitle('Editar Chamado #' + id);
                loadTicket(id);
            }
        }
    }, [customers]);

    return (
        <div>
            <Header/>
            <div className={'content'}>
                <Title name={title}>
                    <FiPlusCircle size={25}/>
                </Title>

                <div className={"container"}>

                    <form className={"formProfile"} onSubmit={handleRegister}>
                        <label>Cliente</label>
                        {loadCustomer ? (
                            <input type={"text"} disabled={true} value={"Carregando clientes ..."}/>
                        ) : (
                            <select value={customer} onChange={handleChangeCustomer}>
                                {customers && (
                                    customers.map((customer: any) => (
                                        <option key={customer.id}
                                                value={customer.id}>{customer.fantasy_name} - {customer.name}</option>
                                    )))}
                            </select>
                        )}

                        <label>Assunto</label>
                        <select value={subject} onChange={handleChangeSelect}>
                            <option value="support">Suporte</option>
                            <option value="visita">Visita Técnica</option>
                            <option value="finances">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className={'status'}>
                            <input
                                type="radio"
                                name={"radio"}
                                value={"Aberto"}
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name={"radio"}
                                value={"Progresso"}
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>Em Progresso</span>

                            <input
                                type="radio"
                                name={"radio"}
                                value={"Atendido"}
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>

                        </div>

                        <label>Complemento</label>
                        <textarea
                            placeholder={'Descreva o problema...(opcional)'}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description ?? ""}
                        />

                        <button type="submit" className="btnProfile">Salvar</button>
                    </form>

                </div>
            </div>

        </div>
    );
}
;
