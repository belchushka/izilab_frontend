import React, {useRef, useState} from 'react';
import BlockHeader from "../block_header/BlockHeader";
import ContainerComponent from "../container_component/ContainerComponent";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {ProgressBar, Step} from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import s from "./OrderBlock.module.scss"
import AnalysisSelectBlock from "../analysis_select_block/AnalysisSelectBlock";
import CartBlock from "../cart_block/CartBlock";
import NextStepContext from "../../contexts/NextStepContext";
import PersonalInfoBlock from "../personal_info_block/PersonalInfoBlock";
import PaymentForm from "../payment_form/PaymentForm";


const OrderBlock = () => {
    const [step, setStep] = useState<number>(0)
    const orderBlockRef=  useRef<HTMLDivElement>(null)
    const nextStep = ()=>{
        if (step<3){
            setStep(state=>state+1)
            if (orderBlockRef.current) orderBlockRef.current.scrollIntoView()

        }
    }

    const prevStep = ()=>{
        if (step>0){
            setStep(state=>state-1)
            if (orderBlockRef.current) orderBlockRef.current.scrollIntoView()
        }
    }
    return (
        <div ref={orderBlockRef} id={"order"} className={`block`}>
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
            <NextStepContext.Provider value={{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                nextStep: nextStep,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                prevStep: prevStep
            }}>
                {step == 0 &&  <AnalysisSelectBlock/>}
                {step == 1 && <CartBlock/>}
                {step == 2 && <PersonalInfoBlock/>}
                {step == 3 && <PaymentForm/>}
            </NextStepContext.Provider>


        </div>
    );
};

export default OrderBlock;
