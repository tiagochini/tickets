import React from 'react';
import './title.css';

interface Props {
    children: JSX.Element;
    name: string;
}

export default function Title({children,name}: Props) {
    return (
        <div className='title'>
            {children}
            <span>{name}</span>
        </div>
    );
};
