import React from 'react';
import s from "./ContainerComponent.module.scss"

interface IContainer {
    children?:React.ReactNode,
    className?:string,
}

const ContainerComponent:React.FC<IContainer> =  ({children, className}) => {
    return (
        <div className={`${s.container} ${className}`}>
            {children}
        </div>
    );
};

export default ContainerComponent;
