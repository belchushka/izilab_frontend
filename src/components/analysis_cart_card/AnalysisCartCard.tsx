import React, {MouseEventHandler, useState} from 'react';
import s from "../analysis_card/AnalysisCard.module.scss"
import AnalysisInfoModal from "../analysis_info_modal/AnalysisInfoModal";
import {useTypedDispatch} from "../../store/hooks";
import {removeAnalysis} from "../../store/reducers/userSlice";
import s_upd from './AnalysisCartCard.module.scss'
import CustomButton from "../custom_button/CustomButton";
import Sign from "../../assets/icons/alert_sign.svg"


interface IAnalysisCard {
    className?: string,
    data: any,
    type: "stock" | "default",
    showButton?: boolean,
    notPerformed: boolean,
    selectOffice: ()=>void
}

const AnalysisCard: React.FC<IAnalysisCard> = ({className, data, type = "default", showButton=true, notPerformed, selectOffice}) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useTypedDispatch()
    const onAddClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        dispatch(removeAnalysis(data.id))
    }
    return (
        <>
            {showModal && <AnalysisInfoModal isVisible={showModal} toggle_cart={onAddClickHandler} type={"cart"} zIndex={10000} data={data} hide={() => setShowModal(false)}/>}
            <div className="">
                <div onClick={() => {
                    setShowModal(true)
                }} className={`${className} ${s.card} ${s_upd.card} ${type == "stock" && s_upd.card_stock} ${notPerformed && s_upd.not_performed} ${(notPerformed && type=="stock") && s_upd.not_performed_pink} ${(notPerformed && type=="default") && s_upd.not_performed_blue}`} style={{}}>
                    <div className={s.right_side}>
                        <h6 className={s.right_side_title}>{data.analysis_data.name}</h6>
                        <p className={s.right_side_description}>Подробнее об услуге</p>
                    </div>
                    <div className={s.left_side}>
                        <div className={s.left_side_text}>
                            {data.analysis_data.has_stock ?
                                <p><span>{data.analysis_data.prev_stock_price}</span> {data.analysis_data.price}P</p> :
                                <p>{data.analysis_data.price}P</p>}
                            <span>до {data.analysis_data.execution_period} дней</span>
                        </div>
                        {(showButton && !notPerformed) && <CustomButton type={"cart"} color={type=="stock" ? "pink" : "blue"} onClick={onAddClickHandler}>
                            <p>Удалить</p>
                        </CustomButton>}

                    </div>


                </div>

                {notPerformed && <div className={`${s_upd.not_performed_alert} ${type=="stock" ? s_upd.not_performed_alert_pink : s_upd.not_performed_alert_blue}`}>
                    <div className={s_upd.not_performed_alert_dialog}>
                        <img src={Sign} alt=""/>
                        <p>Данный анализ нельзя выполнить <br/>
                            в этом медофисе</p>
                    </div>
                    <div className={s_upd.not_performed_alert_buttons}>
                        <CustomButton type={"cart"} color={type=="stock" ? "pink" : "blue"} onClick={selectOffice}>
                            <p>Выбрать другой медофис</p>
                        </CustomButton>
                        <CustomButton type={"cart"} color={type=="stock" ? "pink" : "blue"} onClick={onAddClickHandler}>
                            <p>Удалить</p>
                        </CustomButton>
                    </div>
                </div>}
            </div>

        </>

    );
};

export default React.memo(AnalysisCard);
