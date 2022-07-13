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
import Alert from "../../assets/icons/alert_sign.svg"

const PersonalInfoBlock = () => {
    const {nextStep, prevStep} = useContext(NextStepContext)
    const cart_price = useTypedSelector(cartTotalPrice)
    const dispatch = useTypedDispatch()
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [secondname, setSecondName] = useState("Haha")
    const [birthday, setBirthday] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("savva.shulgin47228@outlook.com")
    const [parentname, setParentName] = useState("")
    const [parentSername, setParentSername] = useState("")
    const [parentSecondName, setParentSecondName] = useState("")
    const [parentBirthday, setParentBirthday] = useState("")
    const [nameError, setNameError] = useState(false)
    const [surnameError, setSurnameError] = useState(false)
    const [secondnameError, setSecondNameError] = useState(false)
    const [birthdayError, setBirthdayError] = useState(false)
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
    const showParentInfo = useMemo(() => {
        const data = moment.default(birthday, "DD.MM.YYYY", true).utc(true)
        if (data.isValid()) {
            if (moment.default().utc(true).diff(data, "year") >= 16) {
                return false
            }
            return true
        } else {
            return false
        }

    }, [birthday])
    const checkNextStep = useCallback((name, surname, secondname, birthday, phone, email, isMale, accept, parentName, parentSurname, parentSecondName, parentBirthday, showParentInfo) => {
        if (name.trim() == "" || surname.trim() == "" || secondname.trim() == "" || birthday.trim() == "" || phone.trim() == "" || email.trim() == "" || isMale == null || accept == null || (showParentInfo && (parentName.trim() == "" || parentSurname.trim() == "" || parentSecondName.trim() == "" || parentBirthday.trim() == ""))) {
            name.trim() == "" && setNameError(true)
            surname.trim() == "" && setSurnameError(true)
            secondname.trim() == "" && setSecondNameError(true)
            birthday.trim().length < 10 && setBirthdayError(true)
            phone.trim() == "" && setPhoneError(true)
            email.trim() == "" && setEmailError(true)
            accept == null && setAcceptError(true)
            isMale == null && setIsMaleError(true)
            parentName.trim() == "" && setParentNameError(true)
            parentSurname.trim() == "" && setParentSernameError(true)
            parentSecondName.trim() == "" && setParentSecondNameError(true)
            parentBirthday.trim().length < 10 && setParentBirthdayError(true)
            return
        }

        if (parentBirthday.length == 10) {
            const data = moment.default(parentBirthday, "DD.MM.YYYY", true).utc(true)
            if (data.isValid()) {
                if (moment.default().utc(true).diff(data, "year") < 16) {
                    setParentBirthdayError(true)
                    return;
                }
            }
        }

        dispatch(setUserInfo({
            name: `${name} ${surname} ${secondname}`,
            phone: phone,
            email: email,
            birthday: birthday,
            sex: isMale ? "Мужской" : "Женский",
            parent_name: `${parentName} ${parentSurname} ${parentSecondName}`,
            parent_birthday: parentBirthday
        }))
        nextStep()
    }, [])
    const onCalendarSelect = useCallback((val) => {
        const date = moment.default(val).format("DD.MM.YYYY")
        setBirthday(date)
    }, [])

    const currentDate = useMemo(() => {
        if (birthday.length == 10) {
            return moment.default(birthday, "DD.MM.YYYY").toDate()
        }
        return null

    }, [birthday])

    const onCalendarParentSelect = useCallback((val) => {
        const date = moment.default(val).format("DD.MM.YYYY")
        setParentBirthday(date)
    }, [])

    const currentParentDate = useMemo(() => {
        if (parentBirthday.length == 10) {
            return moment.default(birthday, "DD.MM.YYYY").toDate()
        }
        return null

    }, [parentBirthday])
    return (
        <ContainerComponent>
            <div className={s.header}>
                <h3>Ваши данные</h3>
            </div>
            <div className={s.sex_radio}>
                <CustomRadio error={isMaleError} setError={setIsMaleError} onChange={() => setIsMale(false)}
                             label={"Женщина"} name={"sex"}/>
                <CustomRadio error={isMaleError} setError={setIsMaleError} onChange={() => setIsMale(true)}
                             label={"Мужчина"} name={"sex"}/>
            </div>
            <div className={s.input_row}>
                <CustomInput error={surnameError} setError={setSurnameError} value={surname} placeholder={"Фамилия *"}
                             onInput={setSurname} className={s.row_input}/>
                <CustomInput error={nameError} setError={setNameError} value={name} placeholder={"Имя *"}
                             onInput={setName} className={s.row_input}/>
                <CustomInput error={secondnameError} setError={setSecondNameError} value={secondname}
                             placeholder={"Отчество *"} onInput={setSecondName} className={s.row_input}/>

            </div>
            <div className="">
                <CalendarInput calendarDate={currentDate} value={birthday} onSelect={onCalendarSelect}
                               error={birthdayError} setError={setBirthdayError} placeholder={"Дата рождения *"}
                               mask={"99.99.9999"} onInput={setBirthday} containerClassName={s.expanded_input}/>
                {showParentInfo && <div>
                    <div className={s.alert}>
                        <img src={Alert} alt=""/>
                        <p>Медицинские услуги могут быть оказаны пациентам младше 16 лет
                            только в сопровождении с официальным представителем (родителем).
                            Пожалуйста, заполните форму родителя.</p>
                    </div>
                    <div className={s.header}>
                        <h3>Данные родителя</h3>
                    </div>
                    <div className={s.input_row}>
                        <CustomInput error={parentSernameError} setError={setParentSernameError} value={parentSername}
                                     placeholder={"Фамилия *"} onInput={setParentSername} className={s.row_input}/>
                        <CustomInput error={parentnameError} setError={setParentNameError} value={parentname}
                                     placeholder={"Имя *"} onInput={setParentName} className={s.row_input}/>
                        <CustomInput error={parentSecondNameError} setError={setParentSecondNameError}
                                     value={parentSecondName} placeholder={"Отчество *"} onInput={setParentSecondName}
                                     className={s.row_input}/>
                    </div>
                    <CalendarInput calendarDate={currentParentDate} value={parentBirthday}
                                   onSelect={onCalendarParentSelect} error={parentBirthdayError}
                                   setError={setParentBirthdayError} placeholder={"Дата рождения *"} mask={"99.99.9999"}
                                   onInput={setParentBirthday} containerClassName={s.expanded_input}/>

                </div>}
                <CustomInput value={phone} error={phoneError} setError={setPhoneError} placeholder={"Номер телефона *"}
                             mask={"+7(999)999-99-99"} onInput={setPhone} className={s.expanded_input}/>
                <CustomInput value={email} error={emailError} setError={setEmailError} placeholder={"E-mail *"}
                             onInput={setEmail} className={s.expanded_input}/>
            </div>

            <div className={s.personal_info_radio}>
                <CustomRadio error={acceptError} setError={setAcceptError} onChange={setAccept}
                             label={"Согласен на обработку персональных данных"} type={"checkbox"}
                             name={"personal_info"}/>
            </div>

            <div className={s_prev.buttons}>
                <CustomButton type={"order"} onClick={prevStep}>
                    <span>Вернуться в корзину</span>
                </CustomButton>
                <CustomButton type={"order"}
                              onClick={() => checkNextStep(name, surname, secondname, birthday, phone, email, isMale, accept, parentname, parentSername, parentSecondName, parentBirthday, showParentInfo)}>
                    <span>Оплатить {cart_price} P</span>
                </CustomButton>
            </div>
        </ContainerComponent>
    );
};

export default PersonalInfoBlock;