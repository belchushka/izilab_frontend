import React, {MouseEventHandler} from 'react';
import s from "./AnalysisInfoModal.module.scss"
import AnalysisModalCompound from "../analysis_modal_compound/AnalysisModalCompound";
import Modal from "../modal/Modal";
import CustomButton from "../custom_button/CustomButton";

interface IAnalysisModal {
    hide: ()=>void,
    data:any,
    zIndex: number,
    showBottom?: boolean,
    stock_endtime?: string|number,
    in_cart?: boolean,
    toggle_cart?: MouseEventHandler<HTMLButtonElement>,
    type?: "default" | "cart",
    isVisible: boolean
}

const AnalysisInfoModal: React.FC<IAnalysisModal> = ({data, hide, zIndex, showBottom=true, toggle_cart, stock_endtime,type="default", in_cart, isVisible}) => {

    return (
        <Modal isVisible={isVisible} zIndex={zIndex} hide={hide} className={s.modal_body}>
            <h5 className={s.modal_body_title}>{data.analysis_data.name}</h5>
            <p className={s.modal_body_code}>Артикул: {data.code}</p>

            <div className={`${s.modal_body_compound} custom_scroll ${!data.is_complex && s.modal_body_description_block}`}>
                {data.is_complex ?
                    <>
                        {
                            data.complex_compound.length > 0 && <>
                                <p className={s.modal_body_section_title}>
                                    Состав:
                                </p>
                                <div className={s.modal_body_compound_list}>
                                    {data.complex_compound.map((el:any)=>{
                                        return <AnalysisModalCompound key={el.analysis_data.name} data={el} className={s.modal_body_section_title}/>
                                    })}

                                </div>
                            </>
                        }
                    </>
                    :
                    <>
                        {data.analysis_data.description && <p className={s.modal_body_section_title}>{data.analysis_data.description}</p>}
                        {data.analysis_data.preparation &&
                            <>
                                <p className={`${s.modal_body_section_title} ${s.modal_body_section_title_description}`}>Подготовка к исследованию</p>
                                <p className={s.modal_body_section_title}>
                                    {data.analysis_data.preparation}
                                </p>
                            </>
                           }
                        {data.analysis_data.prescribing &&
                            <>
                                <p className={`${s.modal_body_section_title} ${s.modal_body_section_title_description}`}>Показания к назначению</p>
                                <p className={s.modal_body_section_title}>
                                    {data.analysis_data.prescribing}
                                </p>
                            </>
                        }

                    </>

                }

            </div>

            {/*{!data.is_complex &&*/}
            {/*    // <p className={s.modal_body_section_title}>{data.analysis_data.preparation}</p>*/}
            {/*}*/}
            {
                data.analysis_data.additional_conditions!=="нет" && <div className={s.alert_body}>
                    <p className={s.alert}>{data.analysis_data.additional_conditions}</p>
                </div>
            }


            <div className={s.modal_body_info}>
                <div className="">
                    <p className={`${s.modal_body_section_title} ${s.bottom_info_title}`}>
                        Биоматериал:
                    </p>
                    <p className={s.modal_body_section_title}>
                        {data.analysis_data.biomaterial}
                    </p>
                </div>

                <div className="">
                    <p className={`${s.modal_body_section_title} ${s.bottom_info_title}`}>
                        Срок готовности:
                    </p>
                    <p className={s.modal_body_section_title}>
                        До {data.analysis_data.execution_period} дней
                    </p>
                </div>
            </div>
            {
                (data.analysis_data.anounsment) && <div className={s.piece_alert_body}>
                    <p className={s.piece_alert}>{data.analysis_data.anounsment}</p>
                </div>
            }
            {showBottom &&
                <div className={`${s.modal_body_button} ${type=="cart" && s.modal_body_button_cart} ${data.analysis_data.anounsment && s.anounsment_btn}`}>
                    {type == "default" &&
                        <>
                            <CustomButton type={"order"} onClick={toggle_cart} className={`${in_cart ? s.modal_body_button_center : s.modal_body_button_between}`}>
                                <p>{in_cart ? "Удалить из корзины": "Заказать"}</p>
                                <p>{!in_cart &&
                                    <>
                                        <span className={s.modal_body_button_stock_price}>{(data.analysis_data.has_stock && data.analysis_data.price !== data.analysis_data.prev_stock_price) && `${data.analysis_data.prev_stock_price} P`}</span>
                                        {data.analysis_data.price} P
                                    </>
                                }
                                </p>
                            </CustomButton>
                            {(data.analysis_data.has_stock && stock_endtime!=0) && <p className={s.modal_body_button_stock}>до конца акции осталось {stock_endtime}</p>}
                        </>
                    }
                    {type == "cart" &&
                        <>
                            <p>{data.analysis_data.price} P</p>
                            <CustomButton onClick={toggle_cart} type={"order"}>
                                <p>Удалить</p>
                            </CustomButton>
                        </>
                    }
                 </div>
            }

        </Modal>




    );
};

export default React.memo(AnalysisInfoModal);