import React from 'react';
import HeaderComponent from "../components/header_component/HeaderComponent";
import BannerComponent from "../components/banner_component/BannerComponent";
import LandingSteps from "../components/landing_steps/LandingSteps";

const Landing = () => {
    return (
        <>
            <HeaderComponent/>
            <BannerComponent/>
            <LandingSteps/>
        </>
    );
};

export default Landing;
