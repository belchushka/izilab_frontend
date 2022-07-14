import React from 'react';

const ScreamerComponent = () => {
    return (
        <div style={{
            width:"100%",
            height:"100vh",
            background:"black"
        }}>
            <img style={{
                maxWidth:"80%",
                width:"100%",
                maxHeight: "100vh",
                objectFit:"cover"
            }} src="https://memepedia.ru/wp-content/uploads/2017/08/%D0%B8%D0%B3%D0%BE%D1%80%D1%8C-%D0%BD%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2-%D1%81-%D0%BF%D0%B8%D0%B2%D0%BE%D0%BC-%D0%BE%D1%80%D0%B8%D0%B3%D0%B8%D0%BD%D0%B0%D0%BB.jpg" alt=""/>
        </div>
    );
};

export default ScreamerComponent;