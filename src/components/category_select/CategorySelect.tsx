import React from 'react';
import s from "./CategorySelect.module.scss"

interface ICategorySelect {
    id:number,
    icon: string
    text: string
    selected: boolean
    category_name:string
    onSelect: (category_name:string, id: number)=>void
}

const CategorySelect: React.FC<ICategorySelect> = ({id,icon,text, selected, category_name, onSelect}) => {
    const onClickHandler = ()=>{
        onSelect(category_name, id)
    }
    return (
        <div onClick={onClickHandler} className={`${s.category_body} ${selected && s.category_body_selected}`}>
            <div className={`${s.category_content}`}>
                <img src={icon} alt=""/>
                <span><span className={s.category_content_dot}>•</span>{text}</span>
            </div>

        </div>
    );
};

export default React.memo(CategorySelect);
