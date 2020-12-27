import React from 'react';
import './ButtonCommon.css';


export const ButtonCommon = ({
    children, onClick, type
}) => {
    return (
        <button className={ `button-common ${type}`} onClick={onClick}>{children}</button>
    )
}

export default ButtonCommon;