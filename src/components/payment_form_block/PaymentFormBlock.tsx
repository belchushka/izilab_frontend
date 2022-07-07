import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import ContainerComponent from "../container_component/ContainerComponent";
import {$host} from "../../http";
import PaymentForm from "../payment_form/PaymentForm";
import CustomButton from "../custom_button/CustomButton";
import s from "./PamentFormBlock.module.scss"
import NextStepContext from "../../contexts/NextStepContext";
import PaymentStatusModal from "../payment_status_modal/PaymentStatusModal";
import {useTypedDispatch, useTypedSelector} from "../../store/hooks";
import {clearCart} from "../../store/reducers/userSlice";

const PaymentFormBlock = () => {
    const {prevStep, setStep} = useContext(NextStepContext)
    const cart = useTypedSelector(state => state.user.cart)
    const user = useTypedSelector(state => state.user)
    const payment_id = useRef(null)
    const [paymentToken, setPaymentToken] = useState<string | null>(null)
    const [paymentStatus, setPaymentStatus] = useState<string>('pending')
    const [transactionKey, setTransactionKey] = useState(null)
    const dispatch = useTypedDispatch()
    const showModalType = useMemo(() => {
        switch (paymentStatus) {
            case 'pending':
                return null
            case 'succeeded':
                return 'success'
            case 'rejected':
                return 'error'
            default:
                return null
        }
    }, [paymentStatus])
    const create_payment = async () => {
        try {
            const data = {
                cart: cart.ids,
                officeId: cart.office_id,
                "receipt": {
                    "customer": {
                        "full_name": user.name,
                        "email": user.email,
                        "phone": user.phone
                    },
                },
                name: user.name,
                parent_name: user.parent_name,
                parent_birthday: user.parent_birthday,
                email: user.email,
                birthday: user.birthday,
                phone: user.phone,
                sex: user.sex,
                gifts: cart.gifts,
                date: cart.date.value
            }
            const payment_data: any = await $host.post('user/create_payment', data)
            setTransactionKey(payment_data.data.transaction.key)
            setPaymentToken(payment_data.data.confirmation.confirmation_token)
            payment_id.current = payment_data.data.id
        } catch (e) {
            setPaymentStatus("rejected")
        }
    }

    useEffect(() => {
        create_payment()
    }, [])

    const succesHandler = () => {
        dispatch(clearCart(''))
        setPaymentStatus(null)
        setStep(0)
    }

    const errorHandler = () => {
        setPaymentStatus(null)
        setStep(2)
    }

    const onSuccess = async () => {
        await $host.post("user/confirm_transaction", {
            transaction_key: transactionKey
        })
    }
    return (
        <ContainerComponent>
            {showModalType == "success" && <PaymentStatusModal type={'success'} onClick={succesHandler}/>}
            {showModalType == "error" && <PaymentStatusModal type={'error'} onClick={errorHandler}/>}
            {transactionKey &&
                <p className={s.transaction_key}>Ключь вашего заказа: {transactionKey} <br/> Запомните его на случай
                    технических неполадок</p>}
            <PaymentForm onSuccess={onSuccess} setPaymentStatus={setPaymentStatus} confirmation_token={paymentToken}/>
            <div className={s.button}>
                <CustomButton onClick={prevStep} type={'order'}>
                    <p>Отмена</p>
                </CustomButton>
            </div>

        </ContainerComponent>
    );
};

export default React.memo(PaymentFormBlock);