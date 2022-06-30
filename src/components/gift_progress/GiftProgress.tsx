import React, {useMemo} from 'react';
import {useTypedSelector} from "../../store/hooks";
import s from "./GiftProgress.module.scss"
import GiftIcon from "../../assets/icons/gift_icon.svg"

const GiftProgress = () => {
    const cart_price = useTypedSelector(state=>state.user.cart.price)
    const cart_amount = useMemo(() => {
        return 5000 - cart_price
    }, [cart_price])
    return (
        <div className={s.gift_body}>
            {cart_amount == 0 ? <p>
                Подарок уже в корзине! Перейдите в корзину
                чтобы выбрать <span>бесплатный</span> анализ.
            </p> :  <p>
                Добавьте анализов еще на <span>{cart_amount} P</span> и получите <span>бесплатный</span> анализ в подарок
            </p>}


            <div className={s.gift_body_bar}>
                <div className={s.gift_body_bar_thumb}>
                    <div className={s.gift_body_bar_thumb_progress} style={{
                        transition:"1s",
                        width: cart_amount == 5000 ? "9px" : (100-cart_amount/5000*100)+"%"
                    }}>
                        <div className={s.gift_body_bar_thumb_track}></div>

                    </div>

                </div>
                <div className={s.gift_body_bar_indicators}>
                    <span>0</span>
                    <span>2500</span>
                    <img src={GiftIcon} alt=""/>
                </div>
            </div>

        </div>
    );
};

export default GiftProgress;
