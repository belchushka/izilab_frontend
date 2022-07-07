import React, {useCallback, useContext, useEffect, useState} from 'react';
import ContainerComponent from "../container_component/ContainerComponent";
import {IconInput} from "../custom_input/CustomInput";
import s from "./AnalysisSelectBlock.module.scss";
import CategorySelectSlider from "../category_select_slider/CategorySelectSlider";
import AnalysisCard from "../analysis_card/AnalysisCard";
import {useTypedDispatch, useTypedSelector} from "../../store/hooks";
import {getCategoryAnalysis, searchAnalysis} from "../../store/actions/analysisActions";
import GiftProgress from "../gift_progress/GiftProgress";
import {categories} from "../../utils/categories_dummy";
import NextStepContext from "../../contexts/NextStepContext";
import SupportModal from "../support_modal/SupportModal";
import CustomButton from "../custom_button/CustomButton";
import Search from "../../assets/icons/search.svg"
import {countCartPriceWithoutData} from "../../store/actions/userActions";
import {cartTotalPrice} from "../../store/reducers/userSlice";
import EmptyBlock from "../empty_block/EmptyBlock";
import EmptySearch from "../../assets/images/empty_search.png"
import {useDebounce} from "../../hooks/useDebounce";

const AnalysisSelectBlock = () => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [showSupport, setShowSupport] = useState(false)
    const {nextStep} = useContext(NextStepContext)
    const dispatch = useTypedDispatch()
    const analysisList = useTypedSelector(state => state.analysis.analysis_list)
    const cart_ids = useTypedSelector(state => state.user.cart.ids)
    const cart_price = useTypedSelector(cartTotalPrice)
    const [searchInputValue, setSearchInputValue] = useState("")
    const searchInputDebounce = useDebounce(searchInputValue, 200)
    const onSelectCategory = useCallback((categoryName: string, id: number) => {
        setSelectedCategory(id)
        setSearchInputValue("")

    }, [])
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(getCategoryAnalysis(categories[selectedCategory].category_name))
    }, [selectedCategory])

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(countCartPriceWithoutData(cart_ids))
    }, [cart_ids])

    useEffect(()=>{
            if (searchInputDebounce.trim()!==""){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dispatch(searchAnalysis(searchInputDebounce.trim()))
            }else{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dispatch(getCategoryAnalysis(categories[selectedCategory].category_name))
            }
    },[searchInputDebounce])
    return (
        <>
            {showSupport && <SupportModal zIndex={10000} hide={() => setShowSupport(false)}/>}

            <div className={s.block_wrapper}>
                <ContainerComponent>
                    <IconInput value={searchInputValue} containerClassName={s.block_wrapper_search_input} icon={Search} onInput={(val) => setSearchInputValue(val)}
                               placeholder={"Введите название анализа"}/>
                </ContainerComponent>
                <ContainerComponent className={s.block_wrapper_category_slider}>
                    <CategorySelectSlider categories={categories} onSelectCategory={onSelectCategory}
                                          selectedCategory={searchInputDebounce.trim()=="" ? selectedCategory : null}/>
                </ContainerComponent>

                <ContainerComponent>
                    {analysisList.length > 0 ?
                        <>
                            <div className={s.block_wrapper_analysis_list}>
                                {analysisList.map((el: any) => {
                                    return <AnalysisCard type={el.analysis_data.has_stock ? "stock" : "default"}
                                                         key={el.id}
                                                         data={el} className={s.block_wrapper_analysis_list_card}/>
                                })}

                            </div>
                            {/*{(analysisList.length > 0 && searchInputDebounce.trim()=="") &&*/}
                            {/*    <>*/}
                            {/*        <div>*/}
                            {/*            <p className={s.block_wrapper_analysis_list_show_more}>Посмотреть еще</p>*/}
                            {/*        </div>*/}
                            {/*        <GiftProgress/>*/}
                            {/*    </>*/}

                            {/*}*/}
                            {cart_ids.length > 0 && <div className={s.block_wrapper_next_step}>
                                <CustomButton onClick={nextStep} type={"order"}>
                                    <span>Перейти в корзину ({cart_ids.length}) {cart_price} Р</span>
                                </CustomButton>
                                <span onClick={() => setShowSupport(true)}>Не могу найти нужные анализы</span>
                            </div>
                            }
                        </>
                        :
                        <EmptyBlock subtitle={"Пожалуйста, повторите поиск \n" +
                            "с иным запросом."} img={EmptySearch} onButtonClick={() => setSelectedCategory(0)}/>
                    }

                </ContainerComponent>
            </div>
        </>

    );
};

export default AnalysisSelectBlock;
