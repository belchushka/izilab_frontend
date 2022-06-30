import React from 'react';
import ContainerComponent from "../container_component/ContainerComponent";
import s from "./CitySelectModal.module.scss"
import CityModalCross from "../../assets/icons/city_modal_cross_lg.svg"
import CustomInput from "../custom_input/CustomInput";
import LetterSelectComponent from "../letter_select_component/LetterSelectComponent";

interface ICitySelectModal {
    hide: ()=>void
}

const CitySelectModal: React.FC<ICitySelectModal> = ({hide}) => {
    return (
        <div className={s.modal_body} style={{
            height: window.innerHeight+"px"
        }}>
            <ContainerComponent className={s.modal_body_container}>
                <div className={s.modal_body_container_header}>
                    <CustomInput className={s.modal_body_input} onInput={()=>""} placeholder={"Выберите город"}/>
                    <button onClick={hide}>
                        <img src={CityModalCross} alt=""/>
                    </button>
                </div>
                <div className={s.modal_body_container_body}>
                    <div className="">
                        <LetterSelectComponent/>
                    </div>
                    <div className=""></div>
                </div>


            </ContainerComponent>
        </div>

    );
};

export default CitySelectModal;
