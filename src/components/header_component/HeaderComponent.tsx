import React, {useContext} from 'react';
import ContainerComponent from "../container_component/ContainerComponent";
import Logo from "../../assets/images/logo.png"
import s from "./HeaderComponent.module.scss"
import SocialButton from "../social_button/SocialButton";
import CustomButton from "../custom_button/CustomButton";
import DesktopNavigation from "../desktop_navigation/DesktopNavigation";
import BurgerMenu from "../../assets/icons/burger_menu.png"
import MenuContext from "../../contexts/MenuContext";
import links from "../../utils/landing_links_dummy"
import HeaderLocation from "../header_location/HeaderLocation";
import {useTypedSelector} from "../../store/hooks";


const HeaderComponent: React.FC = () => {
    const user_city = useTypedSelector(state=>state.city)
    const city_offices = useTypedSelector(state=>state.city.offices)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore

    const {setShowMenu} = useContext(MenuContext)
    return (
        <div  className={s.header_wrapper}>
            <ContainerComponent>
                <header className={s.header}>
                    <div className={s.header_leftside}>
                        <img className={s.header_leftside_logo} src={Logo} alt=""/>
                        {user_city.id && <p className={s.header_leftside_text}>
                            {city_offices.length} медофисов в городе {user_city.name}
                            <br/>
                            <a href="">смотреть на карте</a>
                        </p>}

                    </div>
                    <div className={s.header_rightside}>
                        <HeaderLocation user_city={user_city}/>
                        <SocialButton link={"/"} className={s.header_rightside_social_button} type={"telegram"}/>
                        <SocialButton link={"/"} className={s.header_rightside_social_button} type={"whatsapp"}/>
                        <div className={s.header_rightside_content_desktop}>
                            <p className={s.header_rightside_text}>
                                На связи в мессенджерах
                                <br/>
                                <strong>с 7:00 до 22:00</strong>
                            </p>
                            <CustomButton className={s.header_rightside_button} onClick={()=>null} color={"pink"} type={"landing"}>
                                <span>Записаться онлайн</span>
                            </CustomButton>

                        </div>
                        <div onClick={()=>setShowMenu(true)} className={s.header_rightside_burger}>
                            <img src={BurgerMenu} alt=""/>
                        </div>
                    </div>
                </header>
                <DesktopNavigation links={links}/>
            </ContainerComponent>
        </div>

    );
};

export default HeaderComponent;
