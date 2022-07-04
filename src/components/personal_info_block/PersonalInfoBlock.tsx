import React, {useContext} from 'react';
import s from "./PersonalInfoBlock.module.scss"
import s_prev from "../cart_block/CartBlock.module.scss"
import ContainerComponent from "../container_component/ContainerComponent";
import CustomButton from "../custom_button/CustomButton";
import NextStepContext from "../../contexts/NextStepContext";
import {useTypedSelector} from "../../store/hooks";
import CustomRadio from "../custom_radio/CustomRadio";
import CustomInput, {CalendarInput} from "../custom_input/CustomInput";

const PersonalInfoBlock = () => {
    const {nextStep, prevStep} = useContext(NextStepContext)
    const cart = useTypedSelector(state => state.user.cart)
    const cart_price = cart.price_with_stock
    return (
        <ContainerComponent>
            <div className={s.header}>
                <h3>Ваши данные</h3>
            </div>
            <div className={s.sex_radio}>
                <CustomRadio onChange={()=>null} label={"Женщина"} name={"sex"}/>
                <CustomRadio onChange={()=>null} label={"Мужчина"} name={"sex"}/>
            </div>
            <div className={s.input_row}>
                <CustomInput placeholder={"Фамилия"} onInput={()=>null} className={s.row_input}/>
                <CustomInput placeholder={"Имя"} onInput={()=>null} className={s.row_input}/>
                <CustomInput placeholder={"Отчество"} onInput={()=>null} className={s.row_input}/>
            </div>
            <div className="">
                <CalendarInput placeholder={"Фамилия"} onInput={()=>null} containerClassName={s.expanded_input}/>
                <CustomInput placeholder={"Номер телефона"} onInput={()=>null} className={s.expanded_input}/>
                <CustomInput placeholder={"E-mail"} onInput={()=>null} className={s.expanded_input}/>
            </div>

            <div className={s.personal_info_radio}>
                <CustomRadio onChange={()=>null} label={"Согласен на обработку персональных данных"} type={"checkbox"} name={"personal_info"}/>
            </div>

            <div className={s_prev.buttons}>
                <CustomButton type={"order"} onClick={prevStep}>
                    <span>Вернуться в корзину</span>
                </CustomButton>
                <CustomButton type={"order"} onClick={()=>null}>
                    <span>Оплатить {cart_price} P</span>
                </CustomButton>
            </div>
        </ContainerComponent>
    );
};

export default PersonalInfoBlock;