import React, {useState} from 'react';
import AnalysisInfoModal from "../analysis_info_modal/AnalysisInfoModal";
import s from "./AnalysisModalCompound.module.scss"

interface IAnalysisModalCompound {
    data: any,
    className:string
}

const AnalysisModalCompound: React.FC<IAnalysisModalCompound> = ({className, data}) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            {showModal &&  <AnalysisInfoModal isVisible={showModal} showBottom={false} hide={()=>setShowModal(false)} data={data} zIndex={100001}/>}

            <p onClick={()=>setShowModal(true)} className={`${className} ${s.text}`}>{data.analysis_data.name}</p>
        </div>
    );
};

export default React.memo(AnalysisModalCompound);