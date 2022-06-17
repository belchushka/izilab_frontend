import React from 'react';
import ContainerComponent from "../container_component/ContainerComponent";
import Logo from "../../assets/images/logo.png"
import s from "./HeaderComponent.module.scss"
import SocialButton from "../social_button/SocialButton";
import CustomButton from "../custom_button/CustomButton";
import DesktopNavigation from "../desktop_navigation/DesktopNavigation";

const links = [
    {
        title:"О лаборатории",
        link:"",
    },
    {
        title:"Акции",
        link:"",
        primary:true
    },
    {
        title:"Отзывы",
        link:"",
    },
    {
        title:"Услуги и цены",
        link:"",
    },
    {
        title:"Вопрос-ответ",
        link:"",
    },
    {
        title:"Выезд на дом",
        link:"",
    },
    {
        title:"Расшифровка анализов",
        link:"",
    },
    {
        title:"Контакты",
        link:"",
    },
]

const HeaderComponent: React.FC = () => {
    return (
        <div  className={s.header_wrapper}>
            <ContainerComponent>
                <header className={s.header}>
                    <div className={s.header_leftside}>
                        <img className={s.header_leftside_logo} src={Logo} alt=""/>
                        <p className={s.header_leftside_text}>
                            x медофисов в Казани
                            <br/>
                            <a href="">смотреть на карте</a>
                        </p>
                    </div>
                    <div className={s.header_rightside}>
                        <SocialButton link={"/"} className={s.header_rightside_social_button} type={"telegram"}/>
                        <SocialButton link={"/"} className={s.header_rightside_social_button} type={"whatsapp"}/>
                        <div className={s.header_rightside_content_desktop}>
                            <p className={s.header_rightside_text}>
                                На связи в мессенджерах
                                <br/>
                                <strong>с 7:00 до 22:00</strong>
                            </p>
                            <CustomButton className={s.header_rightside_button} onClick={()=>null} color={"pink"} text={"Записаться онлайн"}/>
                        </div>
                    </div>
                </header>
                <DesktopNavigation links={links}/>
            </ContainerComponent>
        </div>

    );
};

export default HeaderComponent;
