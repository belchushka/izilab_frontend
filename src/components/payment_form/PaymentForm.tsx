import React, {useEffect, useRef} from 'react';
import s from "../payment_form/PaymentForm.module.scss"
import CustomButton from "../custom_button/CustomButton";

interface IPaymentForm {
    confirmation_token: string | null,
    setPaymentStatus: (val: string) => void,
    onRender: ()=>void
}

const PaymentForm: React.FC<IPaymentForm> = ({confirmation_token, setPaymentStatus, onRender}) => {
    const rendered = useRef(false)
    useEffect(() => {
        if (confirmation_token !== null && !rendered.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const checkout = new window.YooMoneyCheckoutWidget({
                confirmation_token: confirmation_token,
                customization: {},
                error_callback: function (error) {
                    console.log(error)
                },
            });

            //Отображение платежной формы в контейнере
            checkout.render('payment-form').then(()=>{
                onRender()
            })
            rendered.current = true
        }
    }, [confirmation_token])
    return (
        <div className={s.payment} id={"payment-form"}></div>
    );
};

export default PaymentForm;