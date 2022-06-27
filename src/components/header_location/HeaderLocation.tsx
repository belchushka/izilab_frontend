import React, {useEffect} from 'react';
import MapPointer from "../../assets/icons/map_pointer.svg"
import NavigatorIcon from "../../assets/icons/nvigation_arrow.svg"
import LocationTriangle from "../../assets/icons/location_triangle.svg"
import s from "./HeaderLocation.module.scss"

interface IHeaderLocation {
    user_city:{
        id:number | null,
        name: string | null
    }
}

const HeaderLocation: React.FC<IHeaderLocation> = ({user_city}) => {
    const fetch_city_name = async ()=>{
        // const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
        // const token = process.env.REACT_APP_DADATA_TOKEN
        // const ip_address = "31.13.130.213"
        // const city = await fetch(url + ip_address,{
        //     method: "GET",
        //     mode: "cors",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json",
        //         "Authorization": "Token " + token
        //     }
        // })
        // const city_data = await city.json()
        // if (city_data.location){
        //     console.log(city_data.location.value)
        // }
    }
    useEffect(()=>{
       if (user_city.id == null){
           fetch_city_name()
       }
    },[])
    return (
        <div className={s.location_wrapper}>
            <div className={s.location_info}>
                <img src={MapPointer} alt=""/>
                <p className={s.location_info_city}>
                    {user_city.name ? user_city.name : "Не определено"}
                </p>
            </div>
            {user_city.id==null && <div className={s.location_confirm_wrapper}>
                <div className={s.location_confirm_triangle}>
                    <img src={LocationTriangle} alt=""/>
                </div>
                <div className={s.location_confirm}>
                    <div className={s.location_confirm_text_wrapper}>
                        <img src={NavigatorIcon} alt=""/>
                        <p className={s.location_confirm_text_wrapper_text}>Ваш город <span>Казань</span>?</p>
                    </div>
                    <div className={s.location_confirm_buttons}>
                        <button className={s.location_confirm_buttons_button}>Все верно</button>
                        <button className={s.location_confirm_buttons_button}>Выбрать город</button>
                    </div>
                </div>
            </div>}


        </div>
    );
};

export default HeaderLocation;
