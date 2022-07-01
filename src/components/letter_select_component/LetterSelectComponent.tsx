import React from 'react';
import s from "./LetterSelectComponent.module.scss"
import LetterComponent from "../letter_component/LetterComponent";

interface ILetterSelectComponent {
        onSelect: (id:number, query:string)=>void,
        selectedId: number | null
}

const values = ["Крупные города", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т","У", "Ф", "Х","Ч", "Ш","Э" ,"Ю","Я" ]

const LetterSelectComponent: React.FC<ILetterSelectComponent> = ({onSelect, selectedId}) => {
    return (
        <div className={s.letters_wrapper}>
                {values?.map((el:any, num:number)=>{
                        return <LetterComponent className={`${num==0 && s.letters_wrapper_letter_long} ${s.letters_wrapper_letter}`} key={num} id={num} content={el} selected={selectedId==num} select={onSelect}/>
                })}
        </div>
    );
};

export default LetterSelectComponent;
