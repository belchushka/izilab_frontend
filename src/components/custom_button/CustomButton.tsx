import React from 'react';
import s from "./CustomButton.module.scss"

interface ICustomButton {
    onClick:()=>void,
    text: string,
    color: "pink" | "blue",
    className?:string
}

const CustomButton: React.FC<ICustomButton> = ({onClick,text, color, className}) => {
    return (
        <button onClick={onClick} className={`${s.button} ${color=="pink" ? s.button_pink : s.button_blue} ${className}`}>
            {text}
        </button>
    );
};

export default React.memo(CustomButton);
