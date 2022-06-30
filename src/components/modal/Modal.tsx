import React from 'react';
import s from "./Modal.module.scss"
import Cross from "../../assets/icons/cross.svg";

interface IModal {
    className?: string
    children: React.ReactNode,
    zIndex: number,
    hide: ()=>void,
}

const Modal: React.FC<IModal> = ({className, children, hide, zIndex}) => {
    return (
        <div className={`${s.modal_wrapper}`} style={{
            zIndex,
            height: window.innerHeight + 'px',
        }}>
            <div className={`${s.modal_body} ${className}`}>
                <div onClick={hide} className={s.modal_body_cross}>
                    <img src={Cross} alt=""/>
                </div>
                 {children}
            </div>
        </div>
    );
};

export default Modal;