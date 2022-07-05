import React, {useState} from 'react';
import CustomButton from "../custom_button/CustomButton";
import SupportModal from "../support_modal/SupportModal";
import s from "./EmptyBlock.module.scss"

interface IEmptyBlock {
    img: string,
    onButtonClick: ()=>void,
    subtitle?: string,
    title?: string
}

const EmptyBlock: React.FC<IEmptyBlock> = ({img, onButtonClick, subtitle, title}) => {
    const [showSupport, setShowSupport] = useState(false)
    return (
        <>
            {showSupport && <SupportModal zIndex={10000} hide={()=>setShowSupport(false)}/>}
            <div className={s.body}>
                <h4>{title ? title : "Ничего не найдено"}</h4>
                {subtitle && <p>{subtitle}</p>}

                <img src={img} alt=""/>
                <CustomButton onClick={onButtonClick} type={"order"}>
                    <p>Вернуться в каталог</p>
                </CustomButton>
                <span onClick={()=>setShowSupport(true)}>Не могу найти нужные анализы</span>
            </div>
        </>

    );
};

export default EmptyBlock;