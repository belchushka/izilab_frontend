import React from 'react';

const SeparatorComponent = () => {
    return (
        <div style={{
            width:"100%",
            height:"1px",
            background:"#eee"
        }}></div>
    );
};

export default React.memo(SeparatorComponent);
