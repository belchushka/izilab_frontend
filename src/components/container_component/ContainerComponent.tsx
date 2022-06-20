import React from 'react';
import s from "./ContainerComponent.module.scss"

interface IContainer {
    children?:React.ReactNode,
    className?:string,
    id?:string
}

const ContainerComponent:React.FC<IContainer> =  ({children, className, id}) => {
    return (
        <div id={id} className={`${s.container} ${className}`}>
            {children}
        </div>
    );
};

export default ContainerComponent;
