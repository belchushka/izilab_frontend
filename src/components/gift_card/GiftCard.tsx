import React from 'react';
import s from  "./GiftCard.module.scss"
import CustomButton from "../custom_button/CustomButton";
import {useTypedDispatch, useTypedSelector} from "../../store/hooks";
import {addCartGift, removeCartGift} from "../../store/reducers/userSlice";

interface IGiftCard {
    data:any,
    disabled?: boolean
}

const GiftCard: React.FC<IGiftCard> = ({data, disabled=false}) => {
    const cart_gifts = useTypedSelector(state=> state.user.cart.gifts)
    const in_cart = cart_gifts.indexOf(data.id) != -1
    const dispatch = useTypedDispatch()
    const clickHandler = ()=>{
        if (in_cart){
            dispatch(removeCartGift(data.id))
            return
        }

        dispatch(addCartGift(data.id))
    }
    return (
        <div className={`${s.gift_body} ${(disabled || (cart_gifts.length>0 && !in_cart)) && s.gift_body_disabled} ${in_cart && s.gift_body_in_cart}`}>
            <div className={s.gift_body_content}>
                <p>{data.analysis_data.name}</p>
                <CustomButton className={s.gift_body_content_button} type={"cart"} color={"pink"} onClick={clickHandler}>
                    <p>{in_cart ? "В корзине":"Выбрать"}</p>
                </CustomButton>
            </div>

        </div>
    );
};

export default GiftCard;