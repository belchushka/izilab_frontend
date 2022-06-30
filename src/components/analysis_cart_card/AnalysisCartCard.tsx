import React, {MouseEventHandler, useMemo, useState} from 'react';
import s from "../analysis_card/AnalysisCard.module.scss"
import * as moment from "moment";
import AnalysisInfoModal from "../analysis_info_modal/AnalysisInfoModal";
import {useTypedDispatch, useTypedSelector} from "../../store/hooks";
import {addAnalysis, removeAnalysis} from "../../store/reducers/userSlice";
import s_upd from './AnalysisCartCard.module.scss'


interface IAnalysisCard {
    className?: string,
    data: any,
    type: "stock" | "default"
}

const AnalysisCard: React.FC<IAnalysisCard> = ({className, data, type = "default"}) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useTypedDispatch()
    const onAddClickHandler:  MouseEventHandler<HTMLButtonElement> = (event)=>{
        event.stopPropagation()
        dispatch(addAnalysis(data.id))
    }
    return (
        <>
            {showModal && <AnalysisInfoModal zIndex={10000} data={data} hide={()=>setShowModal(false)}/>}

            <div onClick={()=>{setShowModal(true)}} className={`${className} ${s.card} ${type == "stock" && s.card_stock}`} style={{
                background: type == "stock" ? `linear-gradient(90deg, #${data.analysis_data.gradient_1} 0%, #${data.analysis_data.gradient_2} 100%)` : "#E8F4FF"
            }}>
                {/*{type == "default" && <>*/}
                {/*    <div className={s.right_side}>*/}
                {/*        <h6 className={s.right_side_title}>{data.analysis_data.name}</h6>*/}
                {/*        <p className={s.right_side_description}>{data.analysis_data.description}</p>*/}
                {/*    </div>*/}
                {/*    <div className={s.left_side}>*/}
                {/*        <div className={s.left_side_text}>*/}
                {/*            {data.analysis_data.has_stock ?*/}
                {/*                <p><span>{data.analysis_data.prev_stock_price}</span> {data.analysis_data.price}P</p> :*/}
                {/*                <p>{data.analysis_data.price}P</p>}*/}
                {/*            <span>до {data.analysis_data.execution_period} дней</span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</>}*/}


            </div>
        </>

    );
};

export default AnalysisCard;
