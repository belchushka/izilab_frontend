import React, {useContext, useEffect} from 'react';
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
import CustomInput from "../custom_input/CustomInput";
import {countCartPrice} from "../../store/actions/userActions";

const CartBlock = () => {
    const {nextStep, prevStep} = useContext(NextStepContext)
    const cart = useTypedSelector(state => state.user.cart)
    const analysis = cart.analysis
    const gifts = cart.gifts
    const price = cart.price
    const dispatch = useTypedDispatch()
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        dispatch(countCartPrice(cart.ids, 0, new Date()))
    }, [])
    return (
        <div className={s.cart_wrapper}>
            <ContainerComponent className={s.cart_wrapper_container}>
                <div className={s.cart_header}>
                    <h3 className={s.cart_header_title}>{cart.length} товара в корзине</h3>
                    <p className={s.cart_header_clear}>очистить корзину</p>
                </div>
                <div className={s.cart_sections}>
                    <div className={`${s.cart_sections_section}`}>
                        <div className={`${s.cart_sections_section_analysis_list} custom_scroll`}>
                            {analysis?.map((el: any) =>
                                <AnalysisCartCard key={el.id} type={"default"} data={el}
                                                  className={s.cart_sections_section_analysis}/>
                            )}
                        </div>
                    </div>
                    <div className={s.cart_sections_section}>
                        <div className={s.cart_sections_section_block}>
                            <h5 className={s.cart_sections_section_block_title}>Выберите ваш подарок</h5>

                            <div className={s.cart_sections_section_gifts}>
                                <GiftCard data={{name: "Test", id: 1}}/>
                                <GiftCard data={{name: "Test", id: 2}}/>
                                <GiftCard data={{name: "Test", id: 3}}/>
                            </div>
                        </div>
                        <div className={`${s.cart_sections_section_block} ${s.office_select}`}>
                            <h5 className={s.cart_sections_section_block_title}>Выбор медофиса</h5>
                            <CustomInput placeholder={"Выберите город *"} onInput={() => null}/>
                            <CustomInput placeholder={"Выберите адрес *"} onInput={() => null}/>
                            <CustomInput placeholder={"Выберите дату сдачи *"} onInput={() => null}/>
                        </div>
                        <div className={`${s.cart_sections_section_block} ${s.order_details}`}>
                            <h4>Ваш заказ</h4>
                            <div className={s.order_details_list}>
                                <div className={s.order_details_list_inner}>
                                    <p>Анализы (3)</p>
                                    <p>6127 Р</p>
                                </div>
                                <div className={s.order_details_list_inner}>
                                    <p>Скидка по акции</p>
                                    <p className={s.order_details_list_inner_stock}>1507 Р</p>
                                </div>
                                <div className={s.order_details_list_inner}>
                                    <p>Взятие биоматериала (1)</p>
                                    <p>150 Р</p>
                                </div>
                                <div className={`${s.order_details_list_inner} ${s.order_details_list_inner_total}`}>
                                    <p>Сумма заказа</p>
                                    <div className={s.order_details_list_inner_total_price}>
                                        <span>470</span>
                                        <p>4770 Р</p>
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
    );
};

export default CartBlock;