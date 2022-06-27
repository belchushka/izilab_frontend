import React from 'react';
import ContainerComponent from "../container_component/ContainerComponent";
import {SearchInput} from "../custom_input/CustomInput";
import s from "./AnalysisSelectBlock.module.scss";
import CategorySelectSlider from "../category_select_slider/CategorySelectSlider";

const AnalysisSelectBlock = () => {
    return (
        <div className={s.block_wrapper}>
            <ContainerComponent>
                <SearchInput containerClassName={s.block_wrapper_search_input} onInput={(val)=>""} placeholder={"Введите название анализа"}/>
            </ContainerComponent>
            <ContainerComponent className={s.block_wrapper_category_slider}>
                <CategorySelectSlider/>
            </ContainerComponent>
        </div>
    );
};

export default AnalysisSelectBlock;
