import React from 'react';
import ContainerComponent from "../container_component/ContainerComponent";
import s from "./AboutComponent.module.scss"
import Doctor from "../../assets/images/like_doctor.jpg"
import BlockHeader from "../block_header/BlockHeader";

const AboutComponent = () => {
    return (
        <ContainerComponent className={`block ${s.container}`}>
            <div className={s.container_section}>
                <BlockHeader title={"О лаборатории"} alignment={"left"}/>
                <p>Медицинская лаборатория IZILAB специализируется на лабораторной диагностике, интерпретации результатов исследований, телемедицине, medtech.
                    <br/>
                    <br/>
                    Благодаря сотрудничеству с ведущими лабораторными комплексами России вы можете сдать свыше 1500 видов исследований, с гарантией высокой точности получаемых результатов.
                    <br/>
                    <br/>
                    Медицинская лаборатория IZILAB осуществляет свою деятельность с 2020 года, и за это время мы обслужили более 4000 клиентов и выполнили свыше 27000 исследований.</p>
            </div>
            <div className={s.container_section}>
                <img src={Doctor} alt=""/>
            </div>
        </ContainerComponent>
    );
};

export default AboutComponent;
