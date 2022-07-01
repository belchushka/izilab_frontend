import React from 'react';
import s from "./SemplingCard.module.scss"

interface ISemplingCard {
    price: number,
    title: string
}

const SemplingCard: React.FC<ISemplingCard> = ({title,price}) => {
    return (
        <div className={s.card}>
            <p>{title}</p>
            <p>{price} P</p>
        </div>
    );
};

export default React.memo(SemplingCard);