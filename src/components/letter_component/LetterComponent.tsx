import React, {useState} from 'react';
import s from "./LetterComponent.module.scss"

interface ILetterComponent {
    content: string,
    className?: string
}

const LetterComponent: React.FC<ILetterComponent> = ({content, className}) => {
    const [active, setActive] = useState(false)
    return (
        <div onClick={()=>setActive(state=>!state)} className={`${className} ${s.letter} ${active && s.letter_active}`}>
            <span>{content}</span>
        </div>
    );
};

export default LetterComponent;
