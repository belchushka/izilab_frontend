import React, {MutableRefObject, useEffect, useState} from 'react';
import s from "./Modal.module.scss"
import Cross from "../../assets/icons/cross.svg";
import {useTransition, animated} from "react-spring";

interface IModal {
    className?: string
    children: React.ReactNode,
    zIndex: number,
    hide: () => void,
    showCross?: boolean,
    isVisible: boolean,
    ref?: MutableRefObject<any>
}

// eslint-disable-next-line react/display-name
const Modal = React.forwardRef(({
                                                      className,
                                                      children,
                                                      hide,
                                                      zIndex,
                                                      showCross = true,
                                                      isVisible,
                                                  }: IModal, ref) => {
    const [isVisibleLocal, setIsVisibleLocal] = useState<boolean | null>(isVisible)
    const transition = useTransition(isVisibleLocal, {
        from: {
            opacity: 0
        },
        enter: {
            opacity: 1
        },
        leave: {
            opacity: 0
        },
        config: {
            duration: 100
        }
    })

    const handleHide = () => {
        setIsVisibleLocal(false)
        setTimeout(() => {
            hide()
        }, 100)
    }
    useEffect(() => {
        if (ref) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref.current = {
                handleHide: handleHide
            }
        }
    }, [])
    return (
        <>
            {transition((style, item) => {
                return item ? <animated.div className={`${s.modal_wrapper}`} style={{
                    zIndex,
                    height: window.innerHeight + 'px',
                    ...style
                }}>
                    <div className={`${s.modal_body} ${className}`}>
                        {showCross && <div onClick={handleHide} className={s.modal_body_cross}>
                            <img src={Cross} alt=""/>
                        </div>}

                        {children}
                    </div>
                </animated.div> : ""
            })}
        </>


    );
});

export default Modal;