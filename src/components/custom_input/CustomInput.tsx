import React, {useCallback, useState} from 'react';
import s from "./CustomInput.module.scss"


interface ICustomInput {
    placeholder:string,
    className?:string,
    onInput: (val: string)=>void,
    error?: boolean
}

interface ISearchInput extends ICustomInput {
    containerClassName?: string,
    icon: string
}

const CustomInput: React.FC<ICustomInput> = ({placeholder, className, onInput, error=false}) => {
    return (
        <>
            <input onChange={(ev)=>onInput(ev.target.value)} className={`${s.input} ${className} ${error && s.input_error}`} placeholder={placeholder} type="text"/>
        </>
    );
};

export const IconInput: React.FC<ISearchInput> = ({placeholder, className, onInput, containerClassName, icon}) => {
    const [showIcon, setShowIcon] = useState(true)
    const inputHandler = useCallback((val:string)=>{
        if (val.trim().length>0 && showIcon){
            setShowIcon(false)
        }else if(val.trim().length==0){
            setShowIcon(true)
        }
        onInput(val)
    }, [showIcon])
    return (
        <div className={`${s.search_input_wrapper} ${containerClassName}`}>
            {showIcon && <img className={s.search_input_wrapper_search_icon} src={icon}  alt={""}/>}
           <CustomInput onInput={inputHandler} className={`${className} ${s.input_search} ${showIcon && s.input_search_active}`} placeholder={placeholder}/>
        </div>
    );
};

export default CustomInput;
