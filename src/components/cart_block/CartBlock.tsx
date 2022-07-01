import React, {useContext, useEffect, useState} from 'react';
import s from "./CartBlock.module.scss"
import ContainerComponent from "../container_component/ContainerComponent";
import AnalysisCartCard from "../analysis_cart_card/AnalysisCartCard";
import GiftCard from "../gift_card/GiftCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
import NextStepContext from "../../contexts/NextStepContext";
import {useTypedDispatch, useTypedSelector} from "../../store/hooks";
import CustomButton from "../custom_button/CustomButton";
import {countCartPrice} from "../../store/actions/userActions";
import SemplingCard from "../sempling_card/SemplingCard";
import CitySelectModal from "../city_select_modal/CitySelectModal";
import MapPointer from "../../assets/icons/map_pointer.svg"

const CartBlock = () => {
    const {nextStep, prevStep} = useContext(NextStepContext)
    const [showCityModal, setShowCityModal] = useState(false)
    const city = useTypedSelector(state=>state.city)
    const cart = useTypedSelector(state => state.user.cart)
    const analysis = cart.analysis
    const gifts = useTypedSelector(state=>state.analysis.gifts)
    const price = cart.price
    const price_with_stock = cart.price_with_stock
    const semplings = cart.semplings
    const sempling_price = cart.sempling_price
    const dispatch = useTypedDispatch()
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        dispatch(countCartPrice(cart.ids, 0, new Date()))
    }, [cart.ids])
    return (
        <>
            {showCityModal && <CitySelectModal hide={()=>setShowCityModal(false)}/>}
            <div className={s.cart_wrapper}>
                <ContainerComponent className={s.cart_wrapper_container}>
                    <div className={s.cart_header}>
                        <h3 className={s.cart_header_title}>{analysis.length} товара в корзине</h3>
                        <p className={s.cart_header_clear}>очистить корзину</p>
                    </div>
                    <div className={s.cart_sections}>
                        <div className={`${s.cart_sections_section}`}>
                            <div className={`${s.cart_sections_section_analysis_list} custom_scroll`}>
                                {analysis?.map((el: any) =>
                                    <div key={el.id} className={`${el.only_in_complex_with_parent.length>0 && s.analysis_wrapper}`}>
                                        <AnalysisCartCard  type={el.analysis_data.has_stock ? "stock" : "default"} data={el}
                                                           className={s.cart_sections_section_analysis}/>
                                        {el.only_in_complex_with_parent?.map((child: any)=>{
                                            return <AnalysisCartCard showButton={false} key={child.id} type={child.analysis_data.has_stock ? "stock" : "default"} data={child}
                                                                     className={s.cart_sections_section_analysis}/>
                                        })}
                                    </div>
                                )}
                                {semplings.map((el:any)=>{
                                    return <SemplingCard key={el.id} title={"Взятие биоматериала"} price={el.price}/>
                                })}
                            </div>
                        </div>
                        <div className={s.cart_sections_section}>
                            <div className={s.cart_sections_section_block}>
                                {price_with_stock+sempling_price >=5000 ?
                                    <h5 className={s.cart_sections_section_block_title}>Выберите ваш подарок</h5>
                                    :
                                    <p className={s.cart_sections_section_block_title_error}>Добавьте анализы на {5000-(price_with_stock+sempling_price)} рублей в корзину чтобы выбрать подарок:</p>
                                }


                                <div className={s.cart_sections_section_gifts}>
                                    {gifts?.map((el:any)=>{
                                        return <GiftCard key={el.id} disabled={price_with_stock+sempling_price < 5000 ? true : false } data={el}/>
                                    })}
                                </div>
                            </div>
                            <div className={`${s.cart_sections_section_block} ${s.office_select}`}>
                                <h5 className={s.cart_sections_section_block_title}>Выбор медофиса</h5>
                                <div className={`${s.cart_select} ${s.cart_select_city}`}>
                                    <div className={s.cart_select_city_text}>
                                        <p> {city.name.length>0 ? city.name : "Выберите город *"}</p>
                                    </div>

                                    <div onClick={()=>setShowCityModal(true)} className={s.cart_select_city_btn}>
                                        <p>Изменить</p>
                                    </div>
                                </div>
                                <div className={`${s.cart_select} ${s.cart_select_office}`}>
                                    <p>Выберите адрес *</p>
                                    <div className={s.cart_select_office_btn}>
                                        <span>Указать на карте</span>
                                        <img src={MapPointer} alt=""/>
                                    </div>

                                </div>

                                <div className={`${s.cart_select} `}>
                                    <p>Выберите дату сдачи *</p>
                                </div>
                            </div>
                            <div className={`${s.cart_sections_section_block} ${s.order_details}`}>
                                <h4>Ваш заказ</h4>
                                <div className={s.order_details_list}>
                                    <div className={s.order_details_list_inner}>
                                        <p>Анализы ({analysis.length})</p>
                                        <p>{price} Р</p>
                                    </div>
                                    {
                                        price-price_with_stock>0 && <div className={s.order_details_list_inner}>
                                            <p>Скидка по акции</p>
                                            <p className={s.order_details_list_inner_stock}>{price-price_with_stock} Р</p>
                                        </div>
                                    }

                                    <div className={s.order_details_list_inner}>
                                        <p>Взятие биоматериала (1)</p>
                                        <p>{sempling_price} Р</p>
                                    </div>
                                    <div className={`${s.order_details_list_inner} ${s.order_details_list_inner_total}`}>
                                        <p>Сумма заказа</p>
                                        <div className={s.order_details_list_inner_total_price}>
                                            {  price-price_with_stock>0 &&  <span>{price+sempling_price}</span>}

                                            <p>{price_with_stock+sempling_price} Р</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={s.buttons}>
                        <CustomButton type={"order"} onClick={prevStep}>
                            <span>Вернуться в каталог</span>
                        </CustomButton>
                        <CustomButton type={"order"} onClick={nextStep}>
                            <span>Перейти к оформлению</span>
                        </CustomButton>
                    </div>
                </ContainerComponent>

            </div>
        </>

    );
};

export default CartBlock;