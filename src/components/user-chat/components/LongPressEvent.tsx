import React, { useState, useRef } from 'react';

function LongPressButton({ onClick, onLongPress, children }: any) {
    const [pressing, setPressing] = useState(false);
    const timeoutRef: any = useRef(null);

    const handleMouseDown = () => {
        // timeoutRef.current = setTimeout(() => {
            setPressing(false);
            onLongPress();
        // }, 1000); // Change 1000 to the duration you consider a long press

        setPressing(true);
    };

    const handleMouseUp = () => {
        // clearTimeout(timeoutRef.current);
        if (pressing) {
            onClick();
        }
        setPressing(false);
    };
    
    // onMouseEnter={() => {
    //         longPressH(item)
    //       }}
    //       onMouseLeave={() => {
    //         longPressH(item)
    //       }}

    return (
        <div
            className='long-press-button'
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}
            // onMouseEnter={()=>onLongPress()}
            // onMouseLeave={()=>{setPressing(false); onLongPress(false)}}
            // onTouchStart={handleMouseDown}
            // onTouchEnd={handleMouseUp}
        >
            {children}
        </div>
    );
}

export default LongPressButton;
