import React, {useContext, useEffect, useMemo, useState} from 'react';
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
import {setCartDate, setCartOfficeId} from "../../store/reducers/userSlice";
import {selectCartOfficeById} from "../../store/reducers/citySlice";
import CustomSelect from "../custom_select/CustomSelect";
import * as moment from "moment"
import 'moment/locale/ru'


const CartBlock = () => {
    const {nextStep, prevStep} = useContext(NextStepContext)
    const [showCityModal, setShowCityModal] = useState(false)
    const [showOfficeModal, setShowOfficeModal] = useState(false)
    const city = useTypedSelector(state => state.city)
    const cart = useTypedSelector(state => state.user.cart)
    const selectedOffice = useTypedSelector(selectCartOfficeById(cart.office_id))
    const [cityError, setCityError] = useState(false)
    const [officeError, setOfficeError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const analysis = cart.analysis
    const gifts = useTypedSelector(state => state.analysis.gifts)
    const price = cart.price
    const price_with_stock = cart.price_with_stock
    const cart_date = cart.date
    const semplings = cart.semplings
    const sempling_price = cart.sempling_price
    const dispatch = useTypedDispatch()
    const dateSelectOptions = useMemo(()=>{
        if (selectedOffice){
            const closed_at = selectedOffice.closed_at.map(el=>moment.default(el.timestamp))
            const date_arr = []
            for (let i=0; i<30; i++){
                const day = moment.default()
                day.add({days:i})
                const mounth_name = day.lang("ru").format("D MMMM")
                const day_name = day.lang("ru").format("dddd")
                const value = `${mounth_name}, ${day_name.slice(0,1).toUpperCase() + day_name.slice(1)}`
                date_arr.push({
                    value: day.toDate().getTime(),
                    label: value
                })
            }
            return date_arr
        }
        return []
    }, [selectedOffice])
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        dispatch(countCartPrice(cart.ids, 0, new Date()))
    }, [cart.ids])

    const onOfficeSelectHandler = (id: number) => {
        dispatch(setCartOfficeId(id))
    }

    const checkNextStep = ()=>{
        if (analysis.length==0 || city.id == null || !selectedOffice?.id || !cart_date){
            city.id==null && setCityError(true)
            !selectedOffice?.id && setOfficeError(true)
            !cart_date && setDateError(true)
            setTimeout(()=>{
                setCityError(false)
                setOfficeError(false)
                setDateError(false)
            },2000)
            return
        }
        nextStep()
    }

    const showOfficeModalCheck = ()=>{
        if (city.id == null){
            setCityError(true)
            setTimeout(()=>{
                setCityError(false)
            },2000)
            return
        }
        setShowOfficeModal(true)
    }

    const showSelectDateCheck = ()=>{
        if ( !selectedOffice?.id){
            setOfficeError(true)
            setTimeout(()=>{
                setOfficeError(false)
            },2000)
            return
        }
    }

    const selectDate = (val)=>{
        dispatch(setCartDate(val.value))
    }
    return (
        <>
            {showCityModal && <CitySelectModal hide={() => setShowCityModal(false)}/>}
            {showOfficeModal &&
                <OfficeSelectMapModal onSelect={onOfficeSelectHandler} hide={() => setShowOfficeModal(false)}/>}
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
                                    <div key={el.id}
                                         className={`${el.only_in_complex_with_parent.length > 0 && s.analysis_wrapper}`}>
                                        <AnalysisCartCard type={el.analysis_data.has_stock ? "stock" : "default"}
                                                          data={el}
                                                          className={s.cart_sections_section_analysis}/>
                                        {el.only_in_complex_with_parent?.map((child: any) => {
                                            return <AnalysisCartCard showButton={false} key={child.id}
                                                                     type={child.analysis_data.has_stock ? "stock" : "default"}
                                                                     data={child}
                                                                     className={s.cart_sections_section_analysis}/>
                                        })}
                                    </div>
                                )}
                                {semplings.map((el: any) => {
                                    return <SemplingCard key={el.id} title={"Взятие биоматериала"} price={el.price}/>
                                })}
                            </div>
                        </div>
                        <div className={s.cart_sections_section}>
                            <div className={s.cart_sections_section_block}>
                                {price_with_stock + sempling_price >= 5000 ?
                                    <h5 className={s.cart_sections_section_block_title}>Выберите ваш подарок</h5>
                                    :
                                    <p className={s.cart_sections_section_block_title_error}>Добавьте анализы
                                        на {5000 - (price_with_stock + sempling_price)} рублей в корзину чтобы выбрать
                                        подарок:</p>
                                }


                                <div className={s.cart_sections_section_gifts}>
                                    {gifts?.map((el: any) => {
                                        return <GiftCard key={el.id}
                                                         disabled={price_with_stock + sempling_price < 5000 ? true : false}
                                                         data={el}/>
                                    })}
                                </div>
                            </div>
                            <div className={`${s.cart_sections_section_block} ${s.office_select}`}>
                                <h5 className={s.cart_sections_section_block_title}>Выбор медофиса</h5>
                                <div className={`${s.cart_select} ${s.cart_select_city}`}>
                                    <div className={`${s.cart_select_city_text} ${city.id !== null && s.cart_select_selected} ${cityError && s.cart_select_error}` }>
                                        <p> {city.name.length > 0 ? city.name : "Выберите город *"}</p>
                                    </div>

                                    <div onClick={() => setShowCityModal(true)} className={s.cart_select_city_btn}>
                                        <p>Изменить</p>
                                    </div>
                                </div>
                                <div className={`${s.cart_select} ${s.cart_select_office} ${selectedOffice?.id && s.cart_select_selected} ${officeError && s.cart_select_error}`}>
                                    <p>
                                        {selectedOffice ? selectedOffice.address : 'Выберите адрес *'}
                                    </p>
                                    <div className={s.cart_select_office_btn} onClick={showOfficeModalCheck}>
                                        <span>Указать на карте</span>
                                        <img src={MapPointer} alt=""/>
                                    </div>
                                </div>

                                <CustomSelect error={dateError} onMenuOpen={showSelectDateCheck} onSelect={selectDate} options={dateSelectOptions} className={s.custom_select}/>
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
                                        <p>Взятие биоматериала (1)</p>
                                        <p>{sempling_price} Р</p>
                                    </div>
                                    <div
                                        className={`${s.order_details_list_inner} ${s.order_details_list_inner_total}`}>
                                        <p>Сумма заказа</p>
                                        <div className={s.order_details_list_inner_total_price}>
                                            {price - price_with_stock > 0 && <span>{price + sempling_price}</span>}

                                            <p>{price_with_stock + sempling_price} Р</p>
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
                        <CustomButton type={"order"} onClick={checkNextStep}>
                            <span>Перейти к оформлению</span>
                        </CustomButton>
                    </div>
                </ContainerComponent>

            </div>
        </>

    );
};

export default CartBlock;