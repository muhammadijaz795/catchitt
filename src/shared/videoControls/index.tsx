import React from 'react';
import style from './index.module.scss';

function CustomControls({ duration , time}: any) {
    return (
        <div className={style.parent}>
            <p style={{color:'#FFF'}}>{duration?.toFixed()}</p>
            <p style={{color:'#FFF'}}>{time?.toFixed()}</p>
        </div>
    );
}

export default CustomControls;
