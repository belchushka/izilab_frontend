import React from 'react';
import s from "./BlockHeader.module.scss"

interface IBlockHeader {
    title: string,
    subtitle?: React.ReactNode,
    alignment: "center" | "left"
}

const BlockHeader : React.FC<IBlockHeader>= ({title, subtitle, alignment="center"}) => {
    return (
        <div className={`${alignment == "center" && s.center} ${s.container}`}>
            <h4 className={s.title}>{title}</h4>
            {subtitle}
        </div>
    );
};

export default BlockHeader;
