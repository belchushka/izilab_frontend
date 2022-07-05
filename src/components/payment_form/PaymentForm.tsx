import React, {useEffect} from 'react';
import ContainerComponent from "../container_component/ContainerComponent";

const PaymentForm = () => {

    useEffect(()=>{

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const checkout = new window.YooMoneyCheckoutWidget({
            confirmation_token: 'ct-287e0c37-000f-5000-8000-16961d35b0fd', //Токен, который перед проведением оплаты нужно получить от ЮKassa
            return_url: 'https://example.com/', //Ссылка на страницу завершения оплаты, это может быть любая ваша страница

            //При необходимости можно изменить цвета виджета, подробные настройки см. в документации
            //customization: {
            //Настройка цветовой схемы, минимум один параметр, значения цветов в HEX
            //colors: {
            //Цвет акцентных элементов: кнопка Заплатить, выбранные переключатели, опции и текстовые поля
            //control_primary: '#00BF96', //Значение цвета в HEX

            //Цвет платежной формы и ее элементов
            //background: '#F2F3F5' //Значение цвета в HEX
            //}
            //},
            error_callback: function(error) {
                console.log(error)
            }
        });

        //Отображение платежной формы в контейнере
        checkout.render('payment-form')
    },[])
    return (
        <ContainerComponent>
            <div id={"payment-form"}></div>
        </ContainerComponent>
    );
};

export default React.memo(PaymentForm);