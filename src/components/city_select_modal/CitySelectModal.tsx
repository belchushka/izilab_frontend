import React, {useEffect, useState} from 'react';
import ContainerComponent from "../container_component/ContainerComponent";
import s from "./CitySelectModal.module.scss"
import CityModalCross from "../../assets/icons/city_modal_cross_lg.svg"
import CustomInput from "../custom_input/CustomInput";
import LetterSelectComponent from "../letter_select_component/LetterSelectComponent";
import {$host} from "../../http";
import {useTypedDispatch} from "../../store/hooks";
import {setCurrentCity} from "../../store/actions/cityActions";

interface ICitySelectModal {
    hide: () => void
}

const CitySelectModal: React.FC<ICitySelectModal> = ({hide}) => {
    const [selectedLetterId, setSelectedLetterId] = useState<number | null>(0)
    const [selectedValue, setSelectedValue] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [cities, setCities] = useState([])
    const dispatch = useTypedDispatch()
    const fetch = async (value: string) => {
        try {
            const {data} = await $host.get("/city/find_city", {
                params: {
                    query: value
                }
            })
            setCities(data)
        }catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (searchValue.length!=0){
            setSelectedLetterId(null)
            fetch(searchValue)
            return
        }
        if (selectedLetterId == 0){
            fetch("''")
        }else{
            fetch(selectedValue)

        }
    }, [selectedValue, selectedLetterId, searchValue])

    const setCityId = (city: any)=>{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(setCurrentCity(city))
        hide()
    }
    return (
        <div className={s.modal_body} style={{
            height: window.innerHeight + "px"
        }}>
            <ContainerComponent className={s.modal_body_container}>
                <div className={s.modal_body_container_header}>
                    <CustomInput value={searchValue} className={s.modal_body_input} onInput={(val)=>setSearchValue(val)} placeholder={"Выберите город"}/>
                    <button onClick={hide}>
                        <img src={CityModalCross} alt=""/>
                    </button>
                </div>
                <div className={s.modal_body_container_body}>
                    <div className="">
                        <LetterSelectComponent selectedId={selectedLetterId} onSelect={(id, val) => {
                            setSelectedLetterId(id);
                            setSelectedValue(val)
                        }}/>
                    </div>
                    <div className={s.cities_list}>
                        {cities.length == 0 && <p style={{width:"auto"}}>Ничего не найдено</p>}
                        {cities?.map((el:any, num)=>{
                            return <p onClick={()=>setCityId(el)} key={num}>{el.name}</p>
                        })}
                    </div>
                </div>


            </ContainerComponent>
        </div>

    );
};

export default CitySelectModal;
