import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
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
import OfficeSelectMapModal from "../office_select_map_modal/OfficeSelectMapModal";
import {cartTotalPrice, clearCart, setCartDate, setCartOfficeId} from "../../store/reducers/userSlice";
import {selectCartOfficeById} from "../../store/reducers/citySlice";
import CustomSelect from "../custom_select/CustomSelect";
import * as moment from "moment"
import 'moment/locale/ru'
import EmptyBlock from "../empty_block/EmptyBlock";
import EmptyCart from "../../assets/images/empty_cart.png"
import check_card_type from "../../utils/check_card_type";
import {declOfNum} from "../../utils/decl_of_num";


const CartBlock = () => {
    const {nextStep, prevStep} = useContext(NextStepContext)
    const [showCityModal, setShowCityModal] = useState(false)
    const [showOfficeModal, setShowOfficeModal] = useState(false)
    const city = useTypedSelector(state => state.city)
    const cart = useTypedSelector(state => state.user.cart)
    const cart_total_price = useTypedSelector(cartTotalPrice)
    const selectedOffice = useTypedSelector(selectCartOfficeById(cart.office_id))
    const [cityError, setCityError] = useState(false)
    const [officeError, setOfficeError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const analysis = cart.analysis
    const gifts = useTypedSelector(state => state.analysis.gifts)
    const price = cart.price
    const price_with_stock = cart.price_with_stock
    const cart_date = cart.date
    const alerts = cart.alerts
    const piece_alerts = cart.piece_alerts
    const semplings = cart.semplings
    const sempling_price = cart.sempling_price
    const semple_preparations = cart.semple_preparations
    const semple_preparation_price = cart.semple_preparation_price
    const not_performed_ids = cart.not_performed_ids
    const inputsRef = useRef(null)
    const dispatch = useTypedDispatch()
    const allowNextStep = cart.can_continue
    const dateSelectOptions = useMemo(() => {
        if (selectedOffice) {
            const closed_at = selectedOffice.closed_at.map(el => moment.default(el.timestamp))
            const date_arr = []
            const has_main = analysis.some(el => el.analysis_data.is_main_biomaterial)
            for (let i = 0; i < 30; i++) {
                const day = moment.default()
                day.add({days: i})
                const dayNumber = day.isoWeekday()
                const {
                    from,
                    to
                } = selectedOffice.schedule.find(el => (el.type == (has_main ? 'main' : 'additional')) && el.day == dayNumber)
                const fromLocal = moment.utc(from).add(selectedOffice.utc, 'hour').format("HH:mm")
                const toLocal = moment.utc(to).add(selectedOffice.utc, 'hour').format("HH:mm")
                const mounth_name = day.lang("ru").format("D MMMM")
                const day_name = day.lang("ru").format("dddd")
                const value = `${mounth_name}, ${day_name.slice(0, 1).toUpperCase() + day_name.slice(1)}`
                const is_disabled = closed_at.some(el => day.isSame(el, 'day'))
                date_arr.push({
                    value: day.format("DD/MM/YYYY"),
                    label: `${value} (с ${fromLocal} до ${toLocal})`,
                    disabled: is_disabled,
                    sublable: ' Прием в порядке живой очереди'
                })
            }
            return date_arr
        }
        return []
    }, [selectedOffice, analysis])
    const officeSelectOptions = useMemo(() => {
        return city.offices.map((el: any) => {
            return {
                value: el.id,
                label: el.address,
                disabled: false,
                sublable:""
            }
        })
    }, [city])
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        dispatch(countCartPrice(cart.ids, cart.office_id, cart_date?.value || null))
    }, [cart.ids, cart.office_id, cart_date])

    const onOfficeSelectHandler = useCallback((id: number) => {
        dispatch(setCartOfficeId(id))
        dispatch(setCartDate(null))
    }, [])

    const checkNextStep = useCallback(() => {
        if (analysis.length == 0 || city.id == null || !selectedOffice?.id || !cart_date) {
            city.id == null && setCityError(true)
            !selectedOffice?.id && setOfficeError(true)
            !cart_date && setDateError(true)
            setTimeout(() => {
                setCityError(false)
                setOfficeError(false)
                setDateError(false)
            }, 2000)
            return
        }
        nextStep()
    }, [analysis, city, selectedOffice, cart_date])

    const showOfficeModalCheck = useCallback(() => {
        if (city.id == null) {
            setCityError(true)
            setTimeout(() => {
                setCityError(false)
            }, 2000)
            return
        }
        setShowOfficeModal(true)
    }, [city.id])

    const showSelectOfficeCheck = useCallback(() => {
        if (city.id == null) {
            setCityError(true)
            setTimeout(() => {
                setCityError(false)
            }, 2000)
            return
        }
    }, [city.id])

    const showSelectDateCheck = useCallback(() => {
        if (!selectedOffice?.id) {
            setOfficeError(true)
            setTimeout(() => {
                setOfficeError(false)
            }, 2000)
            return
        }
    }, [selectedOffice])

    const selectDate = useCallback((val) => {
        dispatch(setCartDate(val))
    }, [])

    const selectOffice = useCallback((val) => {
        dispatch(setCartOfficeId(val.value))
        dispatch(setCartDate(null))

    }, [])

    const clearCartClick = useCallback(() => {
        dispatch(clearCart(""))
    }, [])
    return (
        <>
            {showCityModal && <CitySelectModal isVisible={showCityModal} hide={() => setShowCityModal(false)}/>}
            {showOfficeModal &&
                <OfficeSelectMapModal isVisible={showOfficeModal} onSelect={onOfficeSelectHandler}
                                      hide={() => setShowOfficeModal(false)}/>}
            <div className={s.cart_wrapper}>
                {analysis.length > 0 ?
                    <ContainerComponent className={s.cart_wrapper_container}>
                        <div className={s.cart_header}>
                            <h3 className={s.cart_header_title}>{analysis.length} {declOfNum(analysis.length, ['товар', 'товара', 'товаров'])} в
                                корзине</h3>
                            <p className={s.cart_header_clear} onClick={clearCartClick}>очистить корзину</p>
                        </div>
                        <div className={s.cart_sections}>
                            <div className={`${s.cart_sections_section}`}>
                                <div className={`${s.cart_sections_section_analysis_list} custom_scroll`}>
                                    {analysis?.map((el: any) => {
                                            const analysis: any = check_card_type(el)
                                            return <div key={el.id}
                                                        className={`${el.only_in_complex_with_parent.length > 0 && s.analysis_wrapper}`}>
                                                <AnalysisCartCard selectOffice={() => showOfficeModalCheck()}
                                                                  notPerformed={not_performed_ids.includes(el.id)}
                                                                  type={analysis.type}
                                                                  data={analysis.analysis}
                                                                  className={s.cart_sections_section_analysis}/>
                                                {el.only_in_complex_with_parent?.map((child: any) => {
                                                    const analysis_child: any = check_card_type(child)
                                                    return <AnalysisCartCard selectOffice={() => showOfficeModalCheck()}
                                                                             notPerformed={not_performed_ids.includes(el.id)}
                                                                             showButton={false} key={child.id}
                                                                             type={analysis_child.type}
                                                                             data={analysis_child.analysis}
                                                                             className={s.cart_sections_section_analysis}/>
                                                })}
                                            </div>
                                        }
                                    )}
                                    {semplings.map((el: any) => {
                                        return <SemplingCard key={el.id} title={"Взятие биоматериала"}
                                                             price={el.price}/>
                                    })}

                                    {semple_preparations.map((el: any) => {
                                        return <SemplingCard key={el.id} title={"Пробаподготовка"} price={el.price}/>

                                    })}
                                </div>
                            </div>
                            <div className={s.cart_sections_section} ref={inputsRef}>
                                <div className={s.cart_sections_section_block}>
                                    {price_with_stock + sempling_price + semple_preparation_price >= 5000 ?
                                        <h5 className={s.cart_sections_section_block_title}>Выберите ваш подарок</h5>
                                        :
                                        <p className={s.cart_sections_section_block_title_error}>Добавьте анализы
                                            на {5000 - (cart_total_price)} рублей в корзину чтобы выбрать
                                            подарок:</p>
                                    }


                                    <div className={s.cart_sections_section_gifts}>
                                        {gifts?.map((el: any) => {
                                            return <GiftCard key={el.id}
                                                             disabled={cart_total_price < 5000 ? true : false}
                                                             data={el}/>
                                        })}
                                    </div>
                                </div>
                                <div className={`${s.cart_sections_section_block} ${s.office_select}`}>
                                    <h5 className={s.cart_sections_section_block_title}>Выбор медофиса</h5>
                                    <div className={`${s.cart_select} ${s.cart_select_city}`}>
                                        <div
                                            className={`${s.cart_select_city_text} ${city.id !== null && s.cart_select_selected} ${cityError && s.cart_select_error}`}>
                                            <p> {city.name.length > 0 ? city.name : "Выберите город *"}</p>
                                        </div>

                                        <div onClick={() => setShowCityModal(true)} className={s.cart_select_city_btn}>
                                            <p>Изменить</p>
                                        </div>
                                    </div>
                                    <div className={`${s.cart_select_office}`}>
                                        <CustomSelect placeholder={'Выберите адрес *'} error={officeError}
                                                      onMenuOpen={showSelectOfficeCheck}
                                                      onSelect={selectOffice}
                                                      value={selectedOffice && {
                                                          label: selectedOffice.address,
                                                          value: selectedOffice.id,
                                                          disabled: false
                                                      }}
                                                      options={officeSelectOptions} className={s.custom_select}/>
                                        <div className={s.cart_select_office_btn} onClick={showOfficeModalCheck}>
                                            <span>Указать на карте</span>
                                            <img src={MapPointer} alt=""/>
                                        </div>
                                    </div>


                                    <CustomSelect placeholder={'Выберите дату сдачи *'} error={dateError}
                                                  onMenuOpen={showSelectDateCheck}
                                                  onSelect={selectDate}
                                                  value={cart_date}
                                                  options={dateSelectOptions} className={s.custom_select}/>
                                </div>
                                <div className={s.alerts}>
                                    {alerts?.map(el => {
                                        return <p key={el}>{el}</p>
                                    })}
                                    {piece_alerts?.map(el => {
                                        return <p key={el}>{el}</p>
                                    })}
                                </div>
                                <div className={`${s.cart_sections_section_block} ${s.order_details}`}>
                                    <h4>Ваш заказ</h4>
                                    <div className={s.order_details_list}>
                                        <div className={s.order_details_list_inner}>
                                            <p>Анализы ({analysis.length})</p>
                                            <p>{price} Р</p>
                                        </div>
                                        {
                                            price - price_with_stock > 0 && <div className={s.order_details_list_inner}>
                                                <p>Скидка по акции</p>
                                                <p className={s.order_details_list_inner_stock}>{price - price_with_stock} Р</p>
                                            </div>
                                        }

                                        <div className={s.order_details_list_inner}>
                                            <p>Взятие биоматериала ({semplings.length})</p>
                                            <p>{sempling_price} Р</p>
                                        </div>
                                        {semple_preparations.length > 0 &&
                                            <div className={s.order_details_list_inner}>
                                                <p>Пробаподготовка ({semple_preparations.length})</p>
                                                <p>{semple_preparation_price} Р</p>
                                            </div>
                                        }
                                        <div
                                            className={`${s.order_details_list_inner} ${s.order_details_list_inner_total}`}>
                                            <p>Сумма заказа</p>
                                            <div className={s.order_details_list_inner_total_price}>
                                                {price - price_with_stock > 0 &&
                                                    <span>{price + sempling_price + semple_preparation_price}</span>}

                                                <p>{cart_total_price} Р</p>
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
                            <CustomButton disabled={!allowNextStep} type={"order"} onClick={checkNextStep}>
                                <span>Перейти к оформлению</span>
                            </CustomButton>
                        </div>
                    </ContainerComponent>
                    :
                    <ContainerComponent>
                        <EmptyBlock title={"Ваша корзина пока пуста"} img={EmptyCart} onButtonClick={prevStep}/>
                    </ContainerComponent>
                }


            </div>
        </>

    );
};

export default CartBlock;