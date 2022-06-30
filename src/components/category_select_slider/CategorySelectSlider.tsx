import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
import CategorySelect from "../category_select/CategorySelect";
import s from "./CategorySelectSlider.module.scss";
import Sliderarrow from "../../assets/icons/slider_arrow.svg";
import { Scrollbar } from "swiper";


interface ICategorySelectSlider {
    onSelectCategory:(name: string, id: number)=>void,
    selectedCategory: number,
    categories: Array<{
        category_name:string,
        id: number,
        text:string,
        icon:string
    }>
}

const CategorySelectSlider: React.FC<ICategorySelectSlider> = ({onSelectCategory, selectedCategory, categories}) => {
    const prevRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<any>(null)
    return (
        <div className={s.slider_wrapper}>
            <Swiper
                slidesPerView={9}
                spaceBetween={20}
                scrollbar={window.innerWidth<1199 ? {
                    hide:false,
                    enabled:false,
                } : false}
                onInit={(swiper)=>{
                    sliderRef.current = swiper
                }}
                modules={[Scrollbar]}
                breakpoints={{
                    1199:{
                        slidesPerView: 9,
                        scrollbar:{
                            enabled:false,
                            hide:true
                        }
                    },
                    959:{
                        scrollbar:{
                            enabled:true,
                            hide:false
                        },
                        slidesPerView: 8,
                        spaceBetween:16,
                    },
                    639:{
                        scrollbar:{
                            enabled:true,
                            hide:false
                        },
                        slidesPerView: 5,
                        spaceBetween:12,
                    },
                    480:{
                        scrollbar:{
                            enabled:true,
                            hide:false
                        },
                        slidesPerView: 4,
                        spaceBetween:8,
                    },
                    320:{
                        scrollbar:{
                            enabled:true,
                            hide:false
                        },
                        slidesPerView: 3,
                        spaceBetween:12,
                    }
                }}
                className={s.slider}
            >

                {categories?.map(el=>{
                    return <SwiperSlide key={el.id}><CategorySelect  {...el} selected={el.id == selectedCategory} onSelect={onSelectCategory}/></SwiperSlide>
                })}

            </Swiper>
            <div onClick={()=>sliderRef.current.slideNext()} id={"#test1"} className={`${s.slider_arrow} ${s.next_arrow}`} ref={nextRef}>
                <img src={Sliderarrow} alt=""/>
            </div>
            <div onClick={()=>sliderRef.current.slidePrev()} className={`${s.slider_arrow} ${s.prev_arrow}`} ref={prevRef}>
                <img src={Sliderarrow} alt=""/>
            </div>
        </div>

    );
};

export default CategorySelectSlider;
