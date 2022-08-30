import React from 'react';
import "./modal.css";
import {FiX} from "react-icons/all";

type ticketsList = {
    customer_id: number | null;
    customer_name: string;
    description: null | string;
    id: number;
    status: string;
    subject: string;
    created_at: string;
}

type Props = {
    content: ticketsList | null;
    closeModal: (item: ticketsList | null) => void;
};

export function Modal(props: Props) {

    let bg;
    if (props.content?.status === 'Aberto') {
        bg = '#5fd204';
    } else if (props.content?.status === 'Progresso') {
        bg = '#f0ad4e';
    } else {
        bg = '#d9534f';
    }

    return (
        <div className={"modal"}>
            <div className={"container"}>

                <button className={"close"} onClick={() => props.closeModal(null)}>
                    <FiX size={23} color={"#181c2e"}/>
                </button>

                <div>
                    <h2>Detalhes do chamado</h2>

                    <div className={"row"}>
                    <span>
                        Cliente: <i>{props.content?.customer_name}</i>
                    </span>
                    </div>

                    <div className={"row"}>
                    <span>
                        Assunto: <i>{props.content?.subject}</i>
                    </span>

                        <span>
                        Criado em: <i>{props.content?.created_at ? new Date(props.content?.created_at).toLocaleString() : new Date().toLocaleString()}</i>
                    </span>
                    </div>

                    <div className={"row"}>
                    <span>
                        Status: <i className={'badge'} style={{backgroundColor: `${bg}`}}>{props.content?.status}</i>
                    </span>
                    </div>

                    {props.content?.description && (
                        <>
                            <h3>Complemento</h3>
                            <p>{props.content?.description}</p>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};
