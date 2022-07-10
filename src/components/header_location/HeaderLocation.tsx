import React, {useEffect, useState} from 'react';
import MapPointer from "../../assets/icons/map_pointer.svg"
import NavigatorIcon from "../../assets/icons/nvigation_arrow.svg"
import LocationTriangle from "../../assets/icons/location_triangle.svg"
import s from "./HeaderLocation.module.scss"
import CitySelectModal from "../city_select_modal/CitySelectModal";
import {useTypedDispatch} from "../../store/hooks";
import {getCitySuggestion, setCurrentCity} from "../../store/actions/cityActions";

interface IHeaderLocation {
    user_city:{
        id:number | null,
        name: string | null
    }
}

const HeaderLocation: React.FC<IHeaderLocation> = ({user_city}) => {
    const [showModal, setShowModal] = useState(false)
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [suggestion, setSuggestion] = useState<any>({})
    const dispatch = useTypedDispatch()
    const fetch_city_name = async ()=>{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const city_suggestion = await dispatch(getCitySuggestion())
        if (city_suggestion!==null){
            setSuggestion(city_suggestion);
            setShowSuggestion(true)
        }
    }
    useEffect(()=>{
       if (user_city.id == null){
           fetch_city_name()
       }
    },[])

    const submitHandler = ()=>{
        setShowSuggestion(false)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(setCurrentCity(suggestion))
    }
    return (
        <>
            {showModal && <CitySelectModal isVisible={showModal} hide={()=>setShowModal(false)}/>}
            <div className={s.location_wrapper}>
                <div className={s.location_info}>
                    <img src={MapPointer} alt=""/>
                    <p className={s.location_info_city} onClick={()=>setShowModal(true)}>
                        {user_city.name ? user_city.name : "Не определено"}
                    </p>
                </div>
                {(user_city.id==null && showSuggestion) && <div className={s.location_confirm_wrapper}>
                    <div className={s.location_confirm_triangle}>
                        <img src={LocationTriangle} alt=""/>
                    </div>
                    <div className={s.location_confirm}>
                        <div className={s.location_confirm_text_wrapper}>
                            <img src={NavigatorIcon} alt=""/>
                            <p className={s.location_confirm_text_wrapper_text}>Ваш город <span>{suggestion.name}</span>?</p>
                        </div>
                        <div className={s.location_confirm_buttons}>
                            <button onClick={submitHandler} className={s.location_confirm_buttons_button}>Все верно</button>
                            <button onClick={()=>setShowModal(true)} className={s.location_confirm_buttons_button}>Выбрать город</button>
                        </div>
                    </div>
                </div>}


            </div>
        </>

    );
};

export default HeaderLocation;
