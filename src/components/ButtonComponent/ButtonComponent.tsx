import React from "react";
import style from './ButtonComponent.module.scss'
interface IProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type: 'button' | 'submit' | 'reset'
}

const ButtonComponent = ({children, onClick, type = 'button', ...props} : IProps) => {
    return (
        <button className={style.button}
            onClick={onClick}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

export default ButtonComponent;