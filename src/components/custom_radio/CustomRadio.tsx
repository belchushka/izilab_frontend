import React from 'react';
import s from "./CustomRadio.module.scss"

interface ICustomCheckbox {
    onChange: (val: boolean)=> void,
    label: string,
    name: string,
    type?:"radio" | "checkbox"
}

const CustomRadio: React.FC<ICustomCheckbox> = ({onChange, label, name, type="radio"}) => {
    return (
        <div>
            <label className={s.label}>
                <input name={name} className={s.checkbox} type={type} />
                <span className={s.checkbox_checkmark}></span>
                {label}
            </label>
        </div>
    );
};

export default CustomRadio;