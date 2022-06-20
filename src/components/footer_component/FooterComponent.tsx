import React from 'react';
import {GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import s from "./FooterComponent.module.scss";
import ContainerComponent from "../container_component/ContainerComponent";
import Telegram from "../../assets/icons/tg_icon.svg"
import Whatsapp from "../../assets/icons/ws_icon.svg"
import Inst from "../../assets/icons/inst_icon.svg"
import Vk from "../../assets/icons/vk_icon.svg"

const FooterComponent = () => {
    return (
        <div className={s.container}>
            <ContainerComponent id={"contacts"} className={s.container_contacts_wrapper}>
                <div className={s.container_contacts_wrapper_form}>
                    <h6>Контакты</h6>
                    <p><a href="">8 (937) 000-40-81</a> - WhatsApp</p>
                    <p><a href="">8 (843) 558-00-16</a> - тех. поддержка</p>
                    <p><a href="">info@izilab.ru</a></p>
                    <p>Офис: г. Казань, ул. Петербургская, 52</p>
                    <p>Лицензия №ЛО-66-01-003681 <br/> от 06.11.2015</p>
                    <div className={s.container_contacts_wrapper_form_socials}>
                        <a href=""><img src={Vk} alt=""/></a>
                        <a href=""><img src={Inst} alt=""/></a>
                        <a href=""><img src={Telegram} alt=""/></a>
                        <a href=""><img src={Whatsapp} alt=""/></a>
                    </div>

                </div>
            </ContainerComponent>
            <YMaps>
                <div>
                    <Map className={s.container_map} defaultState={{center: [55.78874 ,49.12214], zoom: 12 }}  width={"100%"} height={"100%"}>
                        <ZoomControl/>
                        <GeolocationControl/>
                        <Placemark geometry={[55.78874 ,49.12214]}  properties = {{
                            balloonContent: 'г. Казань, ул. Даурская, 25 Сдача биоматериала: Пн-Пт - с 7:00 до 10:00 Сб - с 7:30 до 10:00 Вс - с 8:00 до 10:00'
                        }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                        />
                    </Map>
                </div>
            </YMaps>
        </div>
    );
};

export default React.memo(FooterComponent);
