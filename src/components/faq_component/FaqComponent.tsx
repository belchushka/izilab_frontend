import React from 'react';
import s from "./FaqComponent.module.scss"
import ContainerComponent from "../container_component/ContainerComponent";
import BlockHeader from "../block_header/BlockHeader";
import QuestionComponent from "../question_component/QuestionComponent";

const FaqComponent = () => {
    return (
        <div className={`${s.container} block`}>
            <ContainerComponent>
                <BlockHeader title={"Вопрос-ответ"} subtitle={<p>Задать свой вопрос вы можете на наш e-mail <a style={{
                    color:"rgb(228, 61, 117)",
                    textDecoration:"underline",
                }}>info@izilab.ru</a> либо в соцсетях</p>} alignment={"center"}/>
                <div className="">
                    <QuestionComponent title={"Нужно ли оформление договора или каких-либо документов при сдаче анализов в партнерском медофисе?"} description={"Нет, в медофисе вы не оформляете договор т.к. вы его акцептировали договор Оферты в момент онлайн-оплаты анализов. В медофисе вы подписываете согласие на медицинское вмешательство."}/>
                </div>
            </ContainerComponent>
        </div>
    );
};

export default FaqComponent;
