import React from 'react';
import s from "./BannerComponent.module.scss"
import ContainerComponent from "../container_component/ContainerComponent";
import CustomButton from "../custom_button/CustomButton";
import Doctor from "../../assets/images/doctor.png"

const BannerComponent = () => {
    return (
        <div className={s.banner_container}>
            <ContainerComponent className={s.banner_container_banner_body}>
                <div className={s.banner_container_leftside}>
                    <h3 className={s.banner_container_leftside_title}>
                        Сдать анализы
                        <br/>
                        со скидкой до 60%
                    </h3>
                    <p className={s.banner_container_leftside_subtitle}>
                        16 медофисов рядом с вами.
                        <br/>
                        Выбирайте любой!
                    </p>
                    <div className={s.banner_container_leftside_buttons}>
                        <CustomButton text={"Записаться онлайн"} color={"pink"} onClick={()=>null}/>
                        <CustomButton text={"Выезд на дом"} color={"blue"} onClick={()=>null}/>
                    </div>
                </div>
                <div className={s.banner_container_rightside}>
                    <img src={Doctor} alt=""/>
                </div>
            </ContainerComponent>
        </div>
    );
};

export default BannerComponent;
