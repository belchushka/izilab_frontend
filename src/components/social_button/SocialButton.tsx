import React from 'react';
import Telegram from "../../assets/icons/telegram.png"
import Whatsapp from "../../assets/icons/whatsapp.png"
import s from "./SocialButton.module.scss"

interface ISocialButton {
    type: "telegram" | "whatsapp",
    link: string,
    className?: string
}

const SocialButton: React.FC<ISocialButton> = ({type, link, className}) => {
    return (
        <a href={link} className={`${className} ${s.button_wrapper}`}>
            {type == "telegram" && <img src={Telegram} alt=""/>}
            {type == "whatsapp" && <img src={Whatsapp} alt=""/>}
        </a>
    );
};

export default React.memo(SocialButton);
