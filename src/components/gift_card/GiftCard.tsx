import React from 'react';
import s from  "./GiftCard.module.scss"

interface IGiftCard {
    data:any
}

const GiftCard: React.FC<IGiftCard> = ({data}) => {
    return (
        <div className={s.gift_body}>
            <div className={s.gift_body_content}>
                <p>Витамин D (25-) isjd soadj aosdjoij usd sa8du</p>
                {/*<OrderButton className={`${s.gift_body_content_button}`} onClick={()=>null} ><p>Выбрать</p></OrderButton>*/}
            </div>

        </div>
    );
};

export default GiftCard;