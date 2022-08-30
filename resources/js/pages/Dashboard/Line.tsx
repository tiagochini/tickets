import React from 'react';
import {FiEdit2, FiSearch} from "react-icons/all";
import {Link} from "react-router-dom";


type ticketItem = {
    customer_id: number | null;
    customer_name: string;
    description: null | string;
    id: number;
    status: string;
    subject: string;
    created_at: string;
}

type Props = {
    item: ticketItem;
    toggleShow: (item: ticketItem) => void;
};

export function Line(props: Props) {
    let bg;
    if (props.item.status === 'Aberto') {
        bg = '#5cb85c';
    } else if (props.item.status === 'Progresso') {
        bg = '#f0ad4e';
    } else {
        bg = '#d9534f';
    }
    return (
        <tr key={props.item.id}>
            <td data-label={"Cliente"}>{props.item.customer_name}</td>
            <td data-label={"Assunto"}>{props.item.subject}</td>
            <td data-label={"Status"}>
                <span className={'badge'} style={{backgroundColor: `${bg}`}}>{props.item.status}</span>
            </td>
            <td data-label={"Cadastrador em"}>{new Date(props.item.created_at).toLocaleString()}</td>
            <td data-label={"#"}>
                <button className={"action"} style={{backgroundColor: '#3583f6'}}
                        onClick={() => props.toggleShow(props.item)}>
                    <FiSearch color={"#fff"} size={17}/>
                </button>
                <Link className={"action"} style={{backgroundColor: '#f6a935'}}
                      to={`/new/${props.item.id}`}>
                    <FiEdit2 color={"#fff"} size={17}/>
                </Link>
            </td>
        </tr>
    );
};
