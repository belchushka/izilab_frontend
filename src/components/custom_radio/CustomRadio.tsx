import React, {useEffect} from 'react';
import s from "./CustomRadio.module.scss"

interface ICustomCheckbox {
    onChange: (val: boolean)=> void,
    label: string,
    name: string,
    type?:"radio" | "checkbox"
    error: boolean,
    setError: (err: boolean)=>void
}

const CustomRadio: React.FC<ICustomCheckbox> = ({onChange, label, name, type="radio", error,setError}) => {
    useEffect(() => {
        const timeout =  setTimeout(() => {
            if (setError) {
                setError(false)
            }
        }, 2000)
        return ()=>{
            clearTimeout(timeout)
        }
    }, [error])
    return (
        <div>
            <label className={s.label}>
                <input name={name} onChange={ev=>ev.target.checked ? onChange(true) : onChange(false)} className={s.checkbox} type={type} />
                <span className={`${s.checkbox_checkmark} ${error && s.checkbox_checkmark_error}`}></span>
                {label}
            </label>
        </div>
    );
};

export default CustomRadio;