import React from 'react';
import Modal from "../modal/Modal";
import s from "./PaymentStatusModal.module.scss"
import PaymentError from "../../assets/images/payment_error.png"
import PaymentSuccess from "../../assets/images/payment_success.png"
import CustomButton from "../custom_button/CustomButton";
import {useTypedSelector} from "../../store/hooks";

interface IPaymentStatusModal {
    type: "error" | "success",
    onClick: ()=>void
}

const PaymentStatusModal: React.FC<IPaymentStatusModal> = ({type, onClick}) => {
    const email = useTypedSelector(state=>state.user.email)
    return (
        <Modal className={s.modal_body} zIndex={10000} hide={() => null} showCross={false}>
            <img src={type=="error" ? PaymentError : PaymentSuccess} alt=""/>
            <h4>{type=="error" ? 'Ошибка при оплате!' : 'Успешная оплата!'}</h4>
            <p>
                {type=="error" ? 'Похоже, это был технический сбой — попробуйте ещё\n' +
                    '                раз, пожалуйста. В случае повтора ошибки попробуйте\n' +
                    '                обратиться в банк, выпустивший вашу карту,\n' +
                    '                либо сменить способ оплаты.' : `На ваш e-mail ${email} отправлено направление в партнерский медофис.\n` +
                    '\n' +
                    'Пожалуйста, ознакомьтесь \n' +
                    'с инструкцией в направлении.'}
                </p>
            <CustomButton onClick={onClick} className={s.button} type={'order'}>
                <p>{type=="error" ? 'Вернуться к оплате' : 'Вернуться на сайт'}</p>
            </CustomButton>
        </Modal>
    );
};

export default PaymentStatusModal;