import React, {useRef, useState} from 'react';
import s from "./QuestionComponent.module.scss"

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
            </div>
            <div className={`${s.question_answer}`} style={{
                height:`${height}px`
            }}>
                <p ref={textRef}>{description}</p>
            </div>
        </div>
    );
}

export default QuestionComponent;
