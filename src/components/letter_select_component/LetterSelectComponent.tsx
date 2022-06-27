import React from 'react';
import s from "./LetterSelectComponent.module.scss"
import LetterComponent from "../letter_component/LetterComponent";

const LetterSelectComponent = () => {
    return (
        <div className={s.letters_wrapper}>
            <LetterComponent className={`${s.letters_wrapper_letter_long} ${s.letters_wrapper_letter}`} content={"Крупные города"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"А"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Б"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"В"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Г"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Д"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Е"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Ж"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"З"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"И"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"К"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Л"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"М"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Н"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"О"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"П"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Р"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"С"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Т"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"У"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Ф"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Х"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Ч"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Ш"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Щ"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Э"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Ю"}/>
            <LetterComponent className={s.letters_wrapper_letter} content={"Я"}/>
        </div>
    );
};

export default LetterSelectComponent;
