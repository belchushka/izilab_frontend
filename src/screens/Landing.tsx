import React, {useState} from 'react';
import HeaderComponent from "../components/header_component/HeaderComponent";
import BannerComponent from "../components/banner_component/BannerComponent";
import LandingSteps from "../components/landing_steps/LandingSteps";
import AdvantagesComponent from "../components/advantages_component/AdvantagesComponent";
import AboutComponent from "../components/about_component/AboutComponent";
import FaqComponent from "../components/faq_component/FaqComponent";
import ServiceComponent from "../components/service_component/ServiceComponent";
import FeedbackComponent from "../components/feedback_component/FeedbackComponent";
import FooterComponent from "../components/footer_component/FooterComponent";
import ContainerComponent from "../components/container_component/ContainerComponent";
import Screen from "../assets/images/screen.png"
import MobileMenu from "../components/mobile_menu/MobileMenu";
import MenuContext from "../contexts/MenuContext";

const Landing = () => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <>
            <MenuContext.Provider value={{
                showMenu,
                setShowMenu
            }}>
                <HeaderComponent/>
                <MobileMenu/>
            </MenuContext.Provider>
                <BannerComponent/>
                <LandingSteps/>
                <ContainerComponent className={"block"}>
                    <img style={{
                        maxWidth:"100%"
                    }} src={Screen} alt=""/>
                </ContainerComponent>
                <AdvantagesComponent/>
                <AboutComponent/>
                <ServiceComponent/>
                <FaqComponent/>
                <FeedbackComponent/>
                <FooterComponent/>
        </>
    );
};

export default Landing;
