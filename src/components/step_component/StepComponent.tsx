import React from 'react';
import s from "./StepComponent.module.scss"

interface IStepComponent {
    text: string,
    id: number,
    icon: string,
    color: string,
    className?: string
}

const StepComponent: React.FC<IStepComponent> = ({text, id, icon, color, className}) => {
    return (
        <div className={`${s.body} ${className}`}>
            <div className={s.body_icon}>
                <span className={s.body_icon_text} style={{color: color}}>{id}</span>
                <img className={s.body_icon_image} src={icon} alt=""/>
            </div>
            <div className={s.body_subtitle}>
                {text}
            </div>
        </div>
    );
};

export default StepComponent;
