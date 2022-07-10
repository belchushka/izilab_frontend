import React, {useCallback, useState} from 'react';
import s from "./SupportModal.module.scss"
import Modal from "../modal/Modal";
import CustomButton from "../custom_button/CustomButton";
import CustomInput from "../custom_input/CustomInput";
import {useTypedDispatch} from "../../store/hooks";
import {sendSupportRequest} from "../../store/actions/userActions";

interface ISupportModal {
    zIndex: number,
    hide: () => void,
    isVisible: boolean
}

const SupportModal: React.FC<ISupportModal> = ({zIndex, hide, isVisible}) => {
    const [name, setName] = useState<string>("")
    const [nameError, setNameError] = useState<boolean>(false)
    const [phone, setPhone] = useState<string>("")
    const [phoneError, setPhoneError] = useState<boolean>(false)
    const dispatch = useTypedDispatch()
    const sendRequest = useCallback((name, phone) => {
        if (name.trim().length > 0 && phone.trim().length > 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(sendSupportRequest(name, phone))
        }
        if (name.trim().length == 0) setNameError(true)
        if (phone.trim().length == 0) setPhoneError(true)


    }, [])
    return (
        <Modal isVisible={isVisible} zIndex={zIndex} hide={hide} className={s.modal_body}>
            <h4>Помощь в оформлении заказа</h4>
            <p>Мы свяжемся с Вами в WhatsApp/Telegram,
                чтобы уточнить анализы и их стоимость</p>
            <CustomInput value={name} error={nameError} setError={setNameError} className={s.modal_body_input} placeholder={"Как Вас зовут?"} onInput={(val) => setName(val)}/>
            <CustomInput value={phone} error={phoneError} mask={"+7(999)999-99-99"} setError={setPhoneError} className={s.modal_body_input} placeholder={"Ваш контактный телефон"}
                         onInput={(val) => setPhone(val)}/>
            <div className={s.modal_body_button_wrapper}>
                <CustomButton className={s.modal_body_button} type={"order"} onClick={()=>sendRequest(name,phone)}>
                    <p>Отправить</p>
                </CustomButton>
            </div>

            <span>Нажимая на кнопку, вы принимаете Оферту об оказании услуг и даете
согласие на обработку персональных данных в соответствии
с Политикой конфиденциальности.</span>
        </Modal>
    );
};

export default SupportModal;