import React, {MouseEventHandler, useMemo, useState} from 'react';
import s from "./AnalysisCard.module.scss"
import * as moment from "moment";
import AnalysisInfoModal from "../analysis_info_modal/AnalysisInfoModal";
import {useTypedDispatch, useTypedSelector} from "../../store/hooks";
import {addAnalysis, removeAnalysis} from "../../store/reducers/userSlice";
import {countCartPriceWithoutData} from "../../store/actions/userActions";


interface IAnalysisCard {
    className?: string,
    data: any,
    type: "stock" | "default"
}

const AnalysisCard: React.FC<IAnalysisCard> = ({className, data, type = "default"}) => {
    const [showModal, setShowModal] = useState(false)
    const cart = useTypedSelector(state=>state.user.cart.ids)
    const dispatch = useTypedDispatch()
    const stock_endtime = useMemo(()=>{
        if (type!=="stock") return 0
        const start = moment.default(new Date())
        const end = moment.default(data.analysis_data.stock_until)
        const duration = moment.duration(end.diff(start))
        return duration.asDays().toFixed()
    },[])
    const onAddClickHandler:  MouseEventHandler<HTMLButtonElement> = (event)=>{
        event.stopPropagation()
        if (cart.indexOf(data.id) !== -1){
            dispatch(removeAnalysis(data.id))
        }else{
            dispatch(addAnalysis(data.id))
        }
    }
    return (
        <>
            {showModal && <AnalysisInfoModal toggle_cart={onAddClickHandler} in_cart={cart.indexOf(data.id) !== -1} stock_endtime={stock_endtime} zIndex={10000} data={data} hide={()=>setShowModal(false)}/>}

            <div onClick={()=>{setShowModal(true)}} className={`${className} ${s.card} ${type == "stock" && s.card_stock}`} style={{
                background: type == "stock" ? `linear-gradient(90deg, #${data.analysis_data.gradient_1} 0%, #${data.analysis_data.gradient_2} 100%)` : "#E8F4FF"
            }}>
                {type == "default" && <>
                    <div className={s.right_side}>
                        <h6 className={s.right_side_title}>{data.analysis_data.name}</h6>
                        <p className={s.right_side_description}>{data.analysis_data.description}</p>
                    </div>
                    <div className={s.left_side}>
                        <div className={s.left_side_text}>
                            {data.analysis_data.has_stock ?
                                <p><span>{data.analysis_data.prev_stock_price}</span> {data.analysis_data.price}P</p> :
                                <p>{data.analysis_data.price}P</p>}
                            <span>до {data.analysis_data.execution_period} дней</span>
                        </div>
                        <button onClickCapture={onAddClickHandler} className={`${s.left_side_add_btn} ${cart.indexOf(data.id) !== -1 && s.left_side_add_btn_active}`}></button>
                    </div>
                </>}

                {type == "stock" &&
                    <>
                        <div className={s.card_stock_content}>
                            <h6 className={s.right_side_title}>{data.analysis_data.name}</h6>
                            <div className={`${s.left_side_text} ${s.left_side_text_stock}`}>
                                <div className="">
                                    <button onClickCapture={onAddClickHandler} className={`${s.left_side_add_btn} ${cart.indexOf(data.id) !== -1 && s.left_side_add_btn_active}`}></button>
                                    {data.analysis_data.has_stock ?
                                        <p><span>{data.analysis_data.prev_stock_price}</span> {data.analysis_data.price}P
                                        </p> : <p>{data.analysis_data.price}P</p>}

                                </div>
                                <span>до конца акции осталось {stock_endtime} дней</span>
                            </div>
                        </div>
                        <div className={s.card_stock_bg_image}>
                            <img src={data.analysis_data.stock_image_link} alt=""/>
                        </div>
                    </>
                }
            </div>
        </>

    );
};

export default React.memo(AnalysisCard);

