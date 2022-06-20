import React, {useRef, useState} from 'react';
import s from "./QuestionComponent.module.scss"
import Cross from "../../assets/icons/cross.svg"
import SeparatorComponent from "../separator_component/SeparatorComponent";

interface IQuestionComponent {
    title: string,
    description: string
}

const QuestionComponent: React.FC<IQuestionComponent> = ({title,description}) => {
    const [height, setHeight] = useState(0)
    const textRef = useRef<HTMLParagraphElement>(null)
    const handleClick = ()=>{
        if(height==0){
            if (textRef.current){
                setHeight(textRef.current.getBoundingClientRect().height)
            }
        }else{
            setHeight(0)
        }
    }
    return (
        <div className={s.question} onClick={handleClick}>
            <div className={s.question_head}>
                <h5>{title}</h5>
                <div className={`${s.question_head_cross} ${height>0 && s.question_head_cross_rotated}`}>
                    <img src={Cross} alt=""/>
                </div>
            </div>
            <div className={`${s.question_answer}`} style={{
                height:`${height}px`
            }}>
                <p ref={textRef}>{description}</p>
            </div>
            <SeparatorComponent/>
        </div>
    );
}

export default React.memo(QuestionComponent);
