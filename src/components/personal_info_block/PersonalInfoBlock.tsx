import React, {useCallback, useContext, useMemo, useState} from 'react';
import s from "./PersonalInfoBlock.module.scss"
import s_prev from "../cart_block/CartBlock.module.scss"
import ContainerComponent from "../container_component/ContainerComponent";
import CustomButton from "../custom_button/CustomButton";
import NextStepContext from "../../contexts/NextStepContext";
import {useTypedDispatch, useTypedSelector} from "../../store/hooks";
import CustomRadio from "../custom_radio/CustomRadio";
import CustomInput, {CalendarInput} from "../custom_input/CustomInput";
import * as moment from "moment";
import {cartTotalPrice, setUserInfo} from "../../store/reducers/userSlice";

const PersonalInfoBlock = () => {
    const {nextStep, prevStep} = useContext(NextStepContext)
    const cart_price = useTypedSelector(cartTotalPrice)
    const dispatch = useTypedDispatch()
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [secondname, setSecondName] = useState("Haha")
    const [birthday, setBirthday    ] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("savva.shulgin47228@outlook.com")
    const [parentname, setParentName] = useState("")
    const [parentSername, setParentSername] = useState("")
    const [parentSecondName, setParentSecondName] = useState("")
    const [parentBirthday, setParentBirthday] = useState("")
    const [nameError, setNameError] = useState(false)
    const [surnameError, setSurnameError] = useState(false)
    const [secondnameError, setSecondNameError] = useState(false)
    const [birthdayError, setBirthdayError    ] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [parentnameError, setParentNameError] = useState(false)
    const [parentSernameError, setParentSernameError] = useState(false)
    const [parentSecondNameError, setParentSecondNameError] = useState(false)
    const [parentBirthdayError, setParentBirthdayError] = useState(false)
    const [isMale, setIsMale] = useState(null)
    const [isMaleError, setIsMaleError] = useState(false)
    const [accept, setAccept] = useState(null)
    const [acceptError, setAcceptError] = useState(false)
    const checkNextStep = useCallback((name, surname, secondname, birthday, phone, email, isMale, accept)=>{
        if (name.trim()=="" || surname.trim()=="" || secondname.trim() == "" || birthday.trim()=="" || phone.trim() == "" || email.trim()=="" || isMale==null || accept==null){
            name.trim()=="" && setNameError(true)
            surname.trim()=="" && setSurnameError(true)
            secondname.trim()=="" && setSecondNameError(true)
            birthday.trim()=="" && setBirthdayError(true)
            phone.trim()=="" && setPhoneError(true)
            email.trim()=="" && setEmailError(true)
            accept == null && setAcceptError(true)
            isMale == null && setIsMaleError(true)
            return
        }
        dispatch(setUserInfo({
            name: `${name} ${surname} ${secondname}`,
            phone: phone,
            email: email,
            birthday: birthday,
            sex: isMale ? "Мужской" : "Женский"
        }))
        nextStep()
    },[])
    const onCalendarSelect = useCallback((val)=>{
        const date = moment.default(val).format("DD.MM.YYYY")
        setBirthday(date)
    },[])

    const currentDate = useMemo(()=>{
        if (birthday.length == 10){
            return moment.default(birthday, "DD.MM.YYYY").toDate()
        }
        return null

    }, [birthday])
    return (
        <ContainerComponent>
            <div className={s.header}>
                <h3>Ваши данные</h3>
            </div>
            <div className={s.sex_radio}>
                <CustomRadio error={isMaleError} setError={setIsMaleError} onChange={()=>setIsMale(false)} label={"Женщина"} name={"sex"}/>
                <CustomRadio error={isMaleError} setError={setIsMaleError} onChange={()=>setIsMale(true)} label={"Мужчина"} name={"sex"}/>
            </div>
            <div className={s.input_row}>
                <CustomInput error={surnameError} setError={setSurnameError}  value={surname} placeholder={"Фамилия"} onInput={setSurname} className={s.row_input}/>
                <CustomInput error={nameError} setError={setNameError}  value={name} placeholder={"Имя"} onInput={setName} className={s.row_input}/>
                <CustomInput error={secondnameError}  setError={setSecondNameError} value={secondname} placeholder={"Отчество"} onInput={setSecondName} className={s.row_input}/>
            </div>
            <div className="">
                <CalendarInput calendarDate={currentDate} value={birthday} onSelect={onCalendarSelect} error={birthdayError} setError={setBirthdayError} placeholder={"Дата рождения"} mask={"99.99.9999"} onInput={setBirthday} containerClassName={s.expanded_input}/>
                <CustomInput value={phone} error={phoneError} setError={setPhoneError} placeholder={"Номер телефона"} mask={"+7(999)999-99-99"}  onInput={setPhone} className={s.expanded_input}/>
                <CustomInput value={email} error={emailError} setError={setEmailError} placeholder={"E-mail"} onInput={setEmail} className={s.expanded_input}/>
            </div>

            <div className={s.personal_info_radio}>
                <CustomRadio error={acceptError} setError={setAcceptError} onChange={setAccept} label={"Согласен на обработку персональных данных"} type={"checkbox"} name={"personal_info"}/>
            </div>

            <div className={s_prev.buttons}>
                <CustomButton type={"order"} onClick={prevStep}>
                    <span>Вернуться в корзину</span>
                </CustomButton>
                <CustomButton type={"order"} onClick={()=>checkNextStep(name,surname, secondname, birthday, phone, email, isMale,accept)}>
                    <span>Оплатить {cart_price} P</span>
                </CustomButton>
            </div>
        </ContainerComponent>
    );
};

export default PersonalInfoBlock;