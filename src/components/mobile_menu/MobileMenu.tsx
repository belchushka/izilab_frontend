import React, {MouseEventHandler, useContext, useRef} from 'react';
import s from "./MobileMenu.module.scss"
import MenuContext from "../../contexts/MenuContext";
import links from "../../utils/landing_links_dummy"

const MobileMenu = () => {
    const menuRef = useRef<HTMLDivElement>(null)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const {showMenu, setShowMenu} = useContext(MenuContext)
    const handleClose = (event:MouseEventHandler<HTMLDivElement> )=>{
        if (menuRef !== null){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            if (!menuRef.current?.contains(event.target)){
                setShowMenu(false)
            }
        }
    }
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        <div onClick={handleClose} style={{
            height:window.innerHeight+"px"
        }} className={`${s.menu_wrapper} ${showMenu && s.menu_wrapper_visible}`}>
            <div ref={menuRef} className={s.menu_wrapper_menu}>
                <div className={s.menu_wrapper_menu_links}>
                    <div onClick={()=>setShowMenu(false)} className={s.menu_wrapper_menu_cross}>
                        <span></span>
                        <span></span>
                    </div>
                    {links?.map((el:any)=>{
                        return <a key={el.link} onClick={()=>setShowMenu(false)} type={"anchor"} className={el.primary ? s.pink : ''} href={el.link}>{el.title}</a>
                    })}
                </div>
                <div className={s.menu_wrapper_menu_buttons}>
                    <button>Записаться онлайн</button>
                    <button>Выезд на дом</button>
                </div>

            </div>
        </div>
    );
};

export default MobileMenu;
