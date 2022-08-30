import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../contexts/auth";

import './dashboard.css';
import Header from "../../components/Header";
import Title from "../../components/Title";
import {FiMessageSquare, FiPlus, FiSearch} from "react-icons/all";
import {Link, Navigate} from "react-router-dom";
import api from "../../services/api";
import {toast} from "react-toastify";
import {Line} from "./Line";
import {Modal} from "../../components/Modal";

type ticketsList = {
    customer_id: number | null;
    customer_name: string;
    description: null | string;
    id: number;
    status: string;
    subject: string;
    created_at: string;
}

export default function Dashboard() {
    const addOffSet = 5;
    const setLimit = 5;

    const {user} = useContext(AuthContext);
    const [loadPage, setLoadPage] = useState(true);

    const [ticketsStatus, setTicketsStatus] = useState("");

    const [isEmpty, setIsEmpty] = useState(false);
    const [offset, setOffset] = useState(0);
    const [loadTicket, setLoadTicket] = useState(true);
    const [chamados, setChamados] = useState<ticketsList[]>([]);

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState<ticketsList | null>(null);

    useEffect(() => {

        loadingTickets();

    }, []);

    if (loadPage) {
        return (
            <>
                <div>
                    <Header/>

                    <div className={'content'}>
                        <Title name={"Atendimentos"}>
                            <FiMessageSquare size={25}/>
                        </Title>

                        <div className={'container dashboard'}>
                            <h3> Carregando... </h3>
                        </div>

                    </div>
                </div>
            </>
        );
    }

    async function loadingTickets() {
        await api.get(`/tickets?offset=${offset}&limit=${setLimit}${ticketsStatus}`, {
            headers: {
                Authorization: 'Bearer ' + user?.token,
            }
        }).then(response => {
            if (response.data.length <= 0) {
                setIsEmpty(true);
                setLoadTicket(false);
                setLoadPage(false);
                return;
            }
            if (offset === 0) {
                setChamados(response.data);
            } else {
                setChamados([...chamados, ...response.data]);
            }
            setLoadTicket(false);
            setOffset(offset + addOffSet);
            setLoadPage(false);
        }).catch(err => {
            setIsEmpty(true);
            setLoadTicket(false);
            console.log(err);
            toast.error("Ops algo deu errado!");

        })
    }

    async function handleReadMore(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLoadTicket(true);
        await loadingTickets();
    }

    function handleStatusFilter(e: React.ChangeEvent<HTMLSelectElement>) {
        setTicketsStatus(e.target.value);
        setOffset(0);
    }

    async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoadTicket(true);
        await loadingTickets();
    }

    function toggleShow(item: ticketsList | null) {
        setShowPostModal(!showPostModal);
        setDetail(item);

    }

    return (
        <div>
            <Header/>

            <div className={'content'}>
                <Title name={"Atendimentos"}>
                    <FiMessageSquare size={25}/>
                </Title>

                {chamados.length === 0 ? (
                    <div className={'container dashboard'}>
                        <span>Nenhum chamado registrado ...</span>

                        <div className={"filterForm"}>
                            <form onSubmit={handleSearch}>
                                <div>
                                    <label>Status</label>
                                    <select onChange={handleStatusFilter} value={ticketsStatus}>
                                        <option value={"&status=all"}>Todos</option>
                                        <option value={"&status=Aberto"}>Aberto</option>
                                        <option value={"&status=Progresso"}>Progresso</option>
                                        <option value={"&status=Atendido"}>Atendido</option>
                                    </select>

                                    <button type="submit">Filtar</button>
                                </div>
                                <div>
                                    <Link to={'/new'} className={'new'}>
                                        <FiPlus size={25} color={"#fff"}/>
                                        Novo chamado
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={"filterForm"}>
                            <form onSubmit={handleSearch}>
                                <div>
                                    <label>Status</label>
                                    <select onChange={handleStatusFilter} value={ticketsStatus}>
                                        <option value={"&status=all"}>Todos</option>
                                        <option value={"&status=Aberto"}>Aberto</option>
                                        <option value={"&status=Progresso"}>Progresso</option>
                                        <option value={"&status=Atendido"}>Atendido</option>
                                    </select>

                                    <button type="submit">Filtar</button>
                                </div>
                                <div>
                                    <Link to={'/new'} className={'new'}>
                                        <FiPlus size={25} color={"#fff"}/>
                                        Novo chamado
                                    </Link>
                                </div>
                            </form>


                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th scope={"col"}>Cliente</th>
                                <th scope={"col"}>Assunto</th>
                                <th scope={"col"}>Status</th>
                                <th scope={"col"}>Cadastrador em</th>
                                <th scope={"col"}>#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {chamados.map((chamado, index) => (
                                <Line
                                    key={index}
                                    item={chamado}
                                    toggleShow={toggleShow}
                                />
                            ))}
                            </tbody>
                        </table>

                        {loadTicket && (
                            <div style={{
                                padding: 15,
                                marginTop: 15,
                                backgroundColor: '#6c757d',
                                display: "flex",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                borderRadius: 5
                            }}>
                                <h3> Carregando chamados ...</h3>
                            </div>
                        )}
                        {!loadTicket && !isEmpty &&
                            <button
                                onClick={handleReadMore}
                                className={'readMore'}>
                                <FiSearch size={25} color={"#fff"}/> Carregar Mais
                            </button>}
                    </>
                )}

            </div>
            {showPostModal && (
                <Modal
                    content={detail}
                    closeModal={toggleShow}
                />
            )}
        </div>
    );
}
