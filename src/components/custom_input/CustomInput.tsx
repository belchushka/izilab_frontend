import React, {useCallback, useEffect, useRef, useState} from 'react';
import s from "./CustomInput.module.scss"
import CalendarIcon from "../../assets/icons/calendar.svg"
import 'react-calendar/dist/Calendar.css';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import { ru } from "date-fns/locale";


interface ICustomInput {
    placeholder: string,
    className?: string,
    onInput: (val: string) => void,
    error?: boolean,
    setError?: (val: boolean) => void | null,
    mask?: string,
    value: string,
    onFocus?: () => void,
    onBlur?: () => void
}

interface ISearchInput extends ICustomInput {
    containerClassName?: string,
    icon: string
}


const CustomInput: React.FC<ICustomInput> = ({
                                                 placeholder,
                                                 className,
                                                 onInput,
                                                 error = false,
                                                 setError = null,
                                                 mask = "",
                                                 value,
                                                 onFocus = () => null,
                                                 onBlur = () => null
                                             }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (setError) {
                setError(false)
            }
        }, 2000)
        return () => {
            clearTimeout(timeout)
        }
    }, [error])
    return (
        <>
            <InputMask onFocus={onFocus} onBlur={onBlur} maskChar={""} value={value} mask={mask}
                       onChange={(ev) => onInput(ev.target.value)}
                       className={`${s.input} ${className} ${error && s.input_error}`} placeholder={placeholder}
                       type="text"/>
        </>
    );
};

export const IconInput: React.FC<ISearchInput> = ({
                                                      placeholder,
                                                      className,
                                                      onInput,
                                                      containerClassName,
                                                      icon,
                                                      value
                                                  }) => {
    const [showIcon, setShowIcon] = useState(true)
    const inputHandler = useCallback((val: string) => {
        onInput(val)
    }, [showIcon])

    useEffect(() => {
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

export const CalendarInput: React.FC<ICustomInput & { containerClassName?: string, onSelect: (val: any) => void, calendarDate: any | null }> = ({
                                                                                                                                                    placeholder,
                                                                                                                                                    className,
                                                                                                                                                    onInput,
                                                                                                                                                    containerClassName,
                                                                                                                                                    mask = "",
                                                                                                                                                    value,
                                                                                                                                                    error,
                                                                                                                                                    setError,
                                                                                                                                                    onSelect,
                                                                                                                                                    calendarDate
                                                                                                                                                }) => {
    const calendarRef = useRef<HTMLDivElement>(null)
    const [showIcon, setShowIcon] = useState(true)
    const [showCalendar, setShowCalendar] = useState(false)
    const toggleCalendar = () => {
        setShowCalendar(state => !state)
    }
    useEffect(() => {
        const callback = (ev: MouseEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (calendarRef && !calendarRef.current.contains(ev.target)) {
                setShowCalendar(false)
            }
        }
        if (showCalendar) {
            window.addEventListener('click', callback)
        }else{
            window.removeEventListener('click', callback)
        }
        return ()=>window.removeEventListener('click', callback)
    }, [showCalendar, calendarRef])
    return (
        <div className={`${s.search_input_wrapper} ${containerClassName}`} ref={calendarRef} >
            <img onClick={toggleCalendar}
                 className={`${s.search_input_wrapper_search_icon} ${s.search_input_wrapper_calendar_icon}`}
                 src={CalendarIcon} alt={""}/>
            <CustomInput onFocus={() => {
                setShowCalendar(true)
            }} error={error} setError={setError} value={value} mask={mask} onInput={onInput}
                         className={`${className} ${s.input_search} ${showIcon && s.input_search_active}`}
                         placeholder={placeholder}/>
            {showCalendar &&
                <div className={s.calendar_input_calendar_wrapper}>
                    <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            value={calendarDate || new Date()}
                            onChange={(newValue) => {
                                onSelect(newValue)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>


            }

        </div>
    );
};


export default React.memo(CustomInput);
