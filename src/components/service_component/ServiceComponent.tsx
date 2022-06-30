import React from 'react';
import ContainerComponent from "../container_component/ContainerComponent";
import BlockHeader from "../block_header/BlockHeader";
import s from "./ServiceComponent.module.scss"
import {YMaps, Map, ZoomControl, GeolocationControl, Placemark} from "react-yandex-maps";
import {useTypedSelector} from "../../store/hooks";

const ServiceComponent = () => {
    const city_offices = useTypedSelector(state=>state.city.offices)
    return (
        <ContainerComponent id={"services"} className={`${s.service_wrapper} block`}>
            <BlockHeader title={"Услуги и цены"} subtitle={<p>Ниже вы можете ознакомиться с нашим прайс-листом
                на услуги и анализы</p>} alignment={"center"}/>
            <div className={s.service_wrapper_content}>
                <a className={s.service_wrapper_content_link} href="https://izilab.ru/%D0%9F%D1%80%D0%B5%D0%B9%D1%81%D0%BA%D1%83%D1%80%D0%B0%D0%BD%D1%82_%D0%90%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2_%D0%B8_%D0%A3%D1%81%D0%BB%D1%83%D0%B3062022.pdf">Прайс-лист анализов и услуг</a>
                <div className={s.service_wrapper_content_info}>
                    <div className={s.service_wrapper_content_info_block}>
                        <h5>16 партнерских медофисов в Казани</h5>
                        <p>Как сделать заказ?</p>
                        <p>
                            1. Оставить заявку на сайте, выбрав ближайший к вам медофис и необходимые анализы
                            <br/>
                            2. Вам поступит сообщение с ссылкой для оплаты заказа в WhatsApp, Telegram или SMS. После оплаты вы получите электронное направление от IZILAB
                            <br/>
                            4. Посетить медофис для сдачи анализов показав электронное направление
                            <br/>
                            *Оплачивать анализы в медофисе уже не нужно
                            <br/>
                            5. Получить результаты анализов на вашу электронную почту
                        </p>
                    </div>
                    <div className={s.service_wrapper_content_info_block}>
                        <YMaps>
                            <div>
                                <Map className={s.service_wrapper_content_info_block_map} defaultState={{center: [55.78874 ,49.12214], zoom: 12 }}  width={"100%"} height={"100%"}>
                                    <ZoomControl/>
                                    <GeolocationControl/>
                                    {city_offices?.map((el:any)=>{
                                       return <Placemark key={el.id} geometry={[el.latitude, el.longitude]}  properties = {{
                                            balloonContent: `${el.address}`
                                        }} options={{
                                            iconLayout:"default#image",
                                            iconImageSize: [40, 40],
                                            iconShape: {
                                                type: 'Circle',
                                                coordinates: [0, 0],
                                                radius: 60
                                            },
                                            iconImageHref: 'https://media.istockphoto.com/vectors/white-caduceus-medical-symbol-icon-isolated-with-long-shadow-medicine-vector-id1182028878?k=20&m=1182028878&s=612x612&w=0&h=UGmurnUc4cq3WuiJTCh5C8BtTFe__bCJZgv3JLpxeTk=',
                                        }}
                                                   modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                        />
                                    })}

                                </Map>
                            </div>
                        </YMaps>
                    </div>
                </div>
            </div>
        </ContainerComponent>
    );
};

export default React.memo(ServiceComponent);
