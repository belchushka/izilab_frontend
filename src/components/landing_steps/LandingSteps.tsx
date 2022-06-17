import React from 'react';
import StepComponent from "../step_component/StepComponent";
import Arrow from "../../assets/icons/arrow.png"
import Lupa from "../../assets/icons/lupa.svg"
import Microscope from "../../assets/icons/microscope.svg"
import Document from "../../assets/icons/document.png"
import ContainerComponent from "../container_component/ContainerComponent";
import s from "./LandingSteps.module.scss"

const LandingSteps = () => {
    return (
        <div className={s.container_wrapper}>
            <ContainerComponent className={s.body}>
                <StepComponent className={s.body_step} text={"Выберите ближайший\n" +
                    "медофис"} id={1} icon={Lupa} color={"#f84585"}/>
                <div className={s.body_arrow}>
                    <img src={Arrow} alt=""/>
                </div>
                <StepComponent className={s.body_step} text={"Сдайте анализы\n" +
                    "в медофисе"} id={2} icon={Microscope} color={"#b158a7"}/>
                <div className={s.body_arrow}>
                    <img src={Arrow} alt=""/>
                </div>
                <StepComponent className={s.body_step} text={"Получите результаты анализов"} id={3} icon={Document} color={"#626dcd"}/>
            </ContainerComponent>

        </div>
    );
};

export default React.memo(LandingSteps);
