import React, {MouseEventHandler} from 'react';
import s from "./CustomButton.module.scss"

interface ICustomButton {
    onClick:(()=>void) | MouseEventHandler<HTMLButtonElement> | undefined,
    disabled?: boolean,
    children:React.ReactNode,
    color?: "pink" | "blue",
    className?:string,
    type: "landing" | "order" | "cart"
}

const CustomButton: React.FC<ICustomButton> = ({onClick,children, color, className, type}) => {
    return (
        <button onClick={onClick} className={`${s.button} ${(color=="pink") ?  type=="landing" ? s.button_pink : s.button_blue : ""} ${type=="order" && s.button_order} ${className}`}>
            {children}
        </button>
    );
};

export default React.memo(CustomButton);
