import React from 'react';
import s from "./ContainerComponent.module.scss"

interface IContainer {
    children?:React.ReactNode
}

const ContainerComponent:React.FC<IContainer> = ({children}) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    );
};

export default ContainerComponent;
