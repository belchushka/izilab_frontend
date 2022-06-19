import React from 'react';
import HeaderComponent from "../components/header_component/HeaderComponent";
import BannerComponent from "../components/banner_component/BannerComponent";
import LandingSteps from "../components/landing_steps/LandingSteps";
import AdvantagesComponent from "../components/advantages_component/AdvantagesComponent";
import AboutComponent from "../components/about_component/AboutComponent";
import FaqComponent from "../components/faq_component/FaqComponent";

const Landing = () => {
    return (
        <>
            <HeaderComponent/>
            <BannerComponent/>
            <LandingSteps/>
            <AdvantagesComponent/>
            <AboutComponent/>
            <FaqComponent/>
        </>
    );
};

export default Landing;
