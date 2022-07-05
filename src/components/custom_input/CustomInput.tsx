import React, {useCallback, useEffect, useState} from 'react';
import s from "./CustomInput.module.scss"
import CalendarIcon from "../../assets/icons/calendar.svg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import InputMask from 'react-input-mask';



interface ICustomInput {
    placeholder: string,
    className?: string,
    onInput: (val: string) => void,
    error?: boolean,
    setError?: (val: boolean) => void | null,
    mask?: string,
    value: string
}

interface ISearchInput extends ICustomInput {
    containerClassName?: string,
    icon: string
}


const CustomInput: React.FC<ICustomInput> = ({placeholder, className, onInput, error = false, setError = null, mask="", value}) => {
    useEffect(() => {
        setTimeout(() => {
            if (setError) {
                setError(false)
            }
        }, 2000)
    }, [error])
    return (
        <>
            <InputMask value={value} mask={mask} onChange={(ev) => onInput(ev.target.value)}
                   className={`${s.input} ${className} ${error && s.input_error}`} placeholder={placeholder}
                   type="text"/>
        </>
    );
};

export const IconInput: React.FC<ISearchInput> = ({placeholder, className, onInput, containerClassName, icon, value}) => {
    const [showIcon, setShowIcon] = useState(true)
    const inputHandler = useCallback((val: string) => {
        onInput(val)
    }, [showIcon])

    useEffect(()=>{
        if (value.trim().length > 0 && showIcon) {
            setShowIcon(false)
        } else if (value.trim().length == 0) {
            setShowIcon(true)
        }
    }, [value])

    return (
        <div className={`${s.search_input_wrapper} ${containerClassName}`}>
            {showIcon && <img className={s.search_input_wrapper_search_icon} src={icon} alt={""}/>}
            <CustomInput value={value} onInput={inputHandler}
                         className={`${className} ${s.input_search} ${showIcon && s.input_search_active}`}
                         placeholder={placeholder}/>
        </div>
    );
};

export const CalendarInput: React.FC<ICustomInput & {containerClassName?: string}> = ({placeholder, className, onInput, containerClassName, mask="", value}) => {
    const [showIcon, setShowIcon] = useState(true)
    const [showCalendar, setShowCalendar] = useState(false)
    const toggleCalendar = ()=>{
        setShowCalendar(state=> !state)
    }
    return (
        <div className={`${s.search_input_wrapper} ${containerClassName}`}>
            <img onClick={toggleCalendar} className={`${s.search_input_wrapper_search_icon} ${s.search_input_wrapper_calendar_icon}` } src={CalendarIcon} alt={""}/>
            <CustomInput value={value} mask={mask} onInput={()=>null}
                         className={`${className} ${s.input_search} ${showIcon && s.input_search_active}`}
                         placeholder={placeholder}/>
            {showCalendar &&
                <div className={s.calendar_input_calendar_wrapper}>
                    <Calendar className={s.calendar_input_calendar_wrapper_calendar}/>
                </div>

            }

        </div>
    );
};

export default React.memo(CustomInput);
