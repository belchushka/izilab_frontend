import React, {useState} from 'react';
import BlockHeader from "../block_header/BlockHeader";
import ContainerComponent from "../container_component/ContainerComponent";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {ProgressBar, Step} from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import s from "./OrderBlock.module.scss"
import AnalysisSelectBlock from "../analysis_select_block/AnalysisSelectBlock";

const OrderBlock = () => {
    const [step, setStep] = useState<number>(0)
    return (
        <div className={`block`}>
            <ContainerComponent className={s.header}>
                <BlockHeader title={"Оформить заказ"}  alignment={"center"}/>
                <div className={s.header_progress}>
                    <ProgressBar filledBackground={"#FC4483"} unfilledBackground={"#AED9FF"} height={3} percent={50*step}>
                        <Step>
                            {({ accomplished, index }: {accomplished:boolean, index:number}) => (
                                <div
                                   className={`${s.header_progress_progress_step} ${accomplished && s.header_progress_progress_step_active}`}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                        <Step>
                            {({ accomplished, index }: {accomplished:boolean, index:number}) => (
                                <div
                                    className={`${s.header_progress_progress_step} ${accomplished && s.header_progress_progress_step_active}`}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                        <Step>
                            {({ accomplished, index }: {accomplished:boolean, index:number}) => (
                                <div
                                    className={`${s.header_progress_progress_step} ${accomplished && s.header_progress_progress_step_active}`}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                    </ProgressBar>
                </div>
            </ContainerComponent>
            <AnalysisSelectBlock/>
        </div>
    );
};

export default OrderBlock;
