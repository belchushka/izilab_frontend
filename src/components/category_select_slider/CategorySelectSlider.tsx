import React, {useRef, useState} from 'react';
import {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
import CategorySelect from "../category_select/CategorySelect";
import s from "./CategorySelectSlider.module.scss";
import Sliderarrow from "../../assets/icons/slider_arrow.svg";
import bombImage from "../../assets/icons/bomb.png";
import fireImage from "../../assets/icons/fire.png";
import microscopeImage from "../../assets/icons/microscope.png";
import diamondImage from "../../assets/icons/diamond.png";
import bloodImage from "../../assets/icons/blood.png";
import lemonImage from "../../assets/icons/lemon.png";
import butterflyImage from "../../assets/icons/butterfly.png";
import pillImage from "../../assets/icons/pill.png";
import bearImage from "../../assets/icons/bear.png";
import dnaImage from "../../assets/icons/dna.png";

const categories = [
    {
        id:0,
        icon:bombImage,
        text:"Акции",
        category_name:"stock",
    },
    {
        id:1,
        icon:fireImage,
        text:"Популярное",
        category_name:"stock",
    },
    {
        id:2,
        icon:microscopeImage,
        text:"Чекапы",
        category_name:"stock",
    },
    {
        id:3,
        icon:diamondImage,
        text:"Комплексы",
        category_name:"stock",
    },
    {
        id:4,
        icon:bloodImage,
        text:"Биохимия",
        category_name:"stock",
    },
    {
        id:5,
        icon:lemonImage,
        text:"Витамины",
        category_name:"stock",
    },
    {
        id:6,
        icon:butterflyImage,
        text:"Гормоны",
        category_name:"stock",
    },
    {
        id:7,
        icon:pillImage,
        text:"Микроэлементы",
        category_name:"stock",
    },
    {
        id:8,
        icon:bearImage,
        text:"Детям",
        category_name:"stock",
    },
    {
        id:9,
        icon:dnaImage,
        text:"ДНК",
        category_name:"stock",
    },

]

const CategorySelectSlider = () => {
    const prevRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef(null)
    const [selectedCategory, setSelectedCategory] = useState(0)
    const fetch_category_data = ()=>""
    return (
        <div className={s.slider_wrapper}>
            <Swiper
                ref={sliderRef}
                slidesPerView={9}
                spaceBetween={20}
                navigation={{
                    nextEl:nextRef.current,
                    prevEl:prevRef.current,
                    enabled:true
                }}

                onInit={(swiper)=>{
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    swiper.params.navigation.prevEl = prevRef.current
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    swiper.params.navigation.nextEl = nextRef.current
                    swiper.navigation.update()
                }}
                modules={[Navigation]}
                className={s.slider_wrapper_slider}
            >

                {categories?.map(el=>{
                    return <SwiperSlide key={el.id}><CategorySelect  {...el} selected={el.id == selectedCategory} onSelect={fetch_category_data}/></SwiperSlide>
                })}

            </Swiper>
            <div onClick={()=>console.log("hello")} id={"#test1"} className={`${s.slider_arrow} ${s.next_arrow}`} ref={nextRef}>
                <img src={Sliderarrow} alt=""/>
            </div>
            <div className={`${s.slider_arrow} ${s.prev_arrow}`} ref={prevRef}>
                <img src={Sliderarrow} alt=""/>
            </div>
        </div>

    );
};

export default CategorySelectSlider;
