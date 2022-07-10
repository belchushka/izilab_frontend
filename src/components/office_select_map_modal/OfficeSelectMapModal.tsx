import React, {useEffect, useRef, useState} from 'react';
import Modal from "../modal/Modal";
import s from "../city_select_modal/CitySelectModal.module.scss";
import CityModalCross from "../../assets/icons/city_modal_cross_lg.svg";
import s_upd from "./OfficeSelectMapModal.module.scss"
import {GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import {useTypedSelector} from "../../store/hooks";

interface IOfficeSelectMapModal {
    hide: () => void,
    onSelect: (id: number) => void,
    isVisible: boolean
}


const OfficeSelectMapModal: React.FC<IOfficeSelectMapModal> = ({hide, onSelect, isVisible}) => {
    const [isVisibleLocal, setIsVisibleLocal] = useState(isVisible)
    const city_offices = useTypedSelector(state => state.city.offices)
    const ModalRef = useRef(null)
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.setOffice = function (point) {
            onSelect(point)
            ModalRef.current.handleHide()
            setTimeout(()=>{
                hide()
            }, 100)
        }

    }, [])
    return (
        <Modal ref={ModalRef} isVisible={isVisibleLocal} zIndex={1000} hide={hide} className={s_upd.body} showCross={false}>
            <div className={`${s.modal_body_container_header} ${s_upd.body_header}`}>
                <h4>Выбор медицинского офиса</h4>
                <button onClick={()=> ModalRef.current.handleHide()}>
                    <img src={CityModalCross} alt=""/>
                </button>
            </div>
            <div className={s_upd.body_content}>
                <YMaps>
                    <div>
                        <Map className={s_upd.body_content_map} defaultState={{center: [55.78874, 49.12214], zoom: 12}}
                             width={"100%"}>
                            <ZoomControl/>
                            <GeolocationControl/>
                            {city_offices?.map((el: any) => {
                                return <Placemark key={el.id} geometry={[el.latitude, el.longitude]} properties={{
                                    balloonContentHeader:`<h3 class="custom_baloon_title">${el.address}</h3>`,
                                    balloonContentFooter:`<button onclick="window.setOffice(${el.id})" class="custom_baloon">Выбрать офис</button>`,

                                }} options={{
                                    iconLayout: "default#image",
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
        </Modal>
    );
};

export default OfficeSelectMapModal;