import React from 'react';
import s from "./DesktopNavigation.module.scss"

interface Link {
    title:string,
    link:string,
    primary?:boolean
}

interface IDesktopNavigation {
    links: Array<Link>
}

const DesktopNavigation: React.FC<IDesktopNavigation> = ({links}) => {
    return (
        <div className={s.link_container}>
            {links?.map(el=>{
                return <a key={el.link} className={el.primary ? s.pink : ''} href={el.link}>{el.title}</a>
            })}
        </div>
    );
};

export default React.memo(DesktopNavigation);
