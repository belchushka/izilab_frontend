import React, {useState} from 'react';
import HeaderComponent from "../components/header_component/HeaderComponent";
import BannerComponent from "../components/banner_component/BannerComponent";
import AdvantagesComponent from "../components/advantages_component/AdvantagesComponent";
import AboutComponent from "../components/about_component/AboutComponent";
import FaqComponent from "../components/faq_component/FaqComponent";
import ServiceComponent from "../components/service_component/ServiceComponent";
import FeedbackComponent from "../components/feedback_component/FeedbackComponent";
import FooterComponent from "../components/footer_component/FooterComponent";
import MobileMenu from "../components/mobile_menu/MobileMenu";
import MenuContext from "../contexts/MenuContext";
import OrderBlock from "../components/order_block/OrderBlock";

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
            <OrderBlock/>
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
