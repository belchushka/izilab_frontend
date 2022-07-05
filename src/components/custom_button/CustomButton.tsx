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

const CustomButton: React.FC<ICustomButton> = ({onClick,children, color, className, type, disabled=false}) => {
    return (
        <button onClick={disabled ? ()=>null : onClick} className={`${s.button}  ${type=="landing" && s.button_landing} ${(type=="landing" || type=="cart") ? (color=="pink")  ? s.button_pink : s.button_blue : ""} ${type=="cart" && s.button_cart} ${type=="order" && s.button_order} ${className} ${disabled && s.button_disabled}`}>
            {children}
        </button>
    );
};

export default React.memo(CustomButton);
