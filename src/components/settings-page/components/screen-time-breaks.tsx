import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";


const screenTimeBreaks: React.FC = () => {
 
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [selectedTimes, setSelectedTimes] = useState<{ daily: string }>({ daily: "" });
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [dropPosition, setDropPosition] = useState({});
    const [isEnabled, setIsEnabled] = useState(false);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!Object.values(dropdownRefs.current).some(ref => ref && event.target instanceof Node && ref.contains(event.target))) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Open dropdown and set position BEFORE rendering
    const toggleDropdown = (day: any) => {
        if (openDropdown === day) {
            setOpenDropdown(null);
            return;
        }

        setTimeout(() => {
            if (dropdownRefs.current[day]) {
                const rect = dropdownRefs.current[day]?.getBoundingClientRect();
        
                if (rect) {  // Ensure rect is not undefined
                    const spaceBelow = window.innerHeight - rect.bottom;
                    const spaceAbove = rect.top;
        
                    setDropPosition((prev) => ({
                        ...prev,
                        [day]: spaceBelow < 200 && spaceAbove > spaceBelow ? "top" : "bottom", 
                    }));
        
                    setOpenDropdown(day); // Open dropdown AFTER setting position
                }
            }
        }, 50);
        
    };

    const selectTime = (day: any, hours: any, minutes: any) => {
        setSelectedTimes(prev => ({ ...prev, [day]: `${hours}h ${minutes}m` }));
        setOpenDropdown(null);
    };

    function saveChanges()
    {
        let endpoint = process.env.VITE_API_URL + '/profile/v2/screen-times'
        let payload =
        {
            method: 'PATCH',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({ 
                screenTimeBreaksPayload: ((match) => {
                    if (!match) return { hours: 0, minutes: 0 };
                    const [h, m] = match;
                    return { hours: +h, minutes: +m };
                })(selectedTimes.daily.match(/\d+/g)) 
            }),
        };
    
        fetch(endpoint, payload)
        .catch(error => console.error('Failed to update screen time:', error));
    }

    const ThemeColor = localStorage.getItem('themeColor');



  return (
      <div className=" w-100 p-3">
        <div className="border-top">
                <div className='text-left d-flex mt-3'>
                    <span className="pt-1">
                    <svg width="16" height="17" style={{marginRight: '0.5rem'}} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33301 8.16016C7.33281 8.26734 7.35846 8.373 7.40778 8.46816C7.45711 8.56332 7.52865 8.64519 7.61634 8.70682L10.6797 10.8502C10.7522 10.9004 10.8417 10.9199 10.9286 10.9043C11.0154 10.8886 11.0925 10.8392 11.143 10.7668L11.5263 10.2202C11.5766 10.1476 11.5961 10.0581 11.5805 9.97126C11.5648 9.88441 11.5154 9.80729 11.443 9.75682L8.80968 7.91349C8.76552 7.88286 8.72943 7.842 8.70447 7.79441C8.67951 7.74682 8.66643 7.6939 8.66634 7.64016V4.49349C8.66634 4.40508 8.63122 4.3203 8.56871 4.25779C8.5062 4.19528 8.42141 4.16016 8.33301 4.16016H7.66634C7.57794 4.16016 7.49315 4.19528 7.43064 4.25779C7.36813 4.3203 7.33301 4.40508 7.33301 4.49349V8.16016Z" fill="#161823"/>
                        <path d="M8.00033 0.826172C6.0554 0.826172 4.19014 1.59879 2.81488 2.97406C1.43961 4.34932 0.666992 6.21458 0.666992 8.15951C0.666992 10.1044 1.43961 11.9697 2.81488 13.345C4.19014 14.7202 6.0554 15.4928 8.00033 15.4928C9.94525 15.4928 11.8105 14.7202 13.1858 13.345C14.561 11.9697 15.3337 10.1044 15.3337 8.15951C15.3337 6.21458 14.561 4.34932 13.1858 2.97406C11.8105 1.59879 9.94525 0.826172 8.00033 0.826172ZM2.00033 8.15951C2.00033 7.37157 2.15552 6.59136 2.45705 5.8634C2.75858 5.13545 3.20053 4.47402 3.75768 3.91686C4.31484 3.35971 4.97627 2.91776 5.70423 2.61623C6.43218 2.3147 7.21239 2.15951 8.00033 2.15951C8.78826 2.15951 9.56847 2.3147 10.2964 2.61623C11.0244 2.91776 11.6858 3.35971 12.243 3.91686C12.8001 4.47402 13.2421 5.13545 13.5436 5.8634C13.8451 6.59136 14.0003 7.37157 14.0003 8.15951C14.0003 9.7508 13.3682 11.2769 12.243 12.4021C11.1177 13.5274 9.59162 14.1595 8.00033 14.1595C6.40903 14.1595 4.8829 13.5274 3.75768 12.4021C2.63247 11.2769 2.00033 9.7508 2.00033 8.15951Z" fill="#161823"/>
                    </svg>
                    </span>
                    <div>
                        <p className='d-flex  mb-1'>Schedule a break</p>
                        <span className='text-xs text-[#16182399]'>Get reminded to take a break from Seezitt after a period of uninterrupted screen time.</span>
                    </div>
            </div>
            <div className='text-left d-flex mt-3 '>
                <span className="pt-1">
                <svg width="16" height="17"  style={{marginRight: '0.5rem'}} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.94331 4.93617C5.02233 4.18053 5.37844 3.48095 5.94291 2.97242C6.50739 2.46389 7.24022 2.18247 7.99998 2.18247C8.75974 2.18247 9.49257 2.46389 10.057 2.97242C10.6215 3.48095 10.9776 4.18053 11.0566 4.93617L11.4 8.46617C11.4933 9.41617 12.02 10.1062 12.5866 10.8262H3.41331C3.97998 10.1062 4.50665 9.41617 4.59998 8.46617L4.94331 4.93284V4.93617ZM7.99998 0.826172C5.73331 0.826172 3.83331 2.54951 3.61331 4.80617L3.27331 8.33617C3.17331 9.39951 2.13998 10.2895 1.51665 11.0795C1.43898 11.1778 1.39058 11.296 1.37699 11.4205C1.36339 11.545 1.38515 11.6708 1.43977 11.7836C1.49439 11.8963 1.57967 11.9913 1.68582 12.0578C1.79198 12.1243 1.91472 12.1596 2.03998 12.1595H13.96C14.0852 12.1596 14.208 12.1243 14.3141 12.0578C14.4203 11.9913 14.5056 11.8963 14.5602 11.7836C14.6148 11.6708 14.6366 11.545 14.623 11.4205C14.6094 11.296 14.561 11.1778 14.4833 11.0795C13.86 10.2895 12.83 9.39951 12.7266 8.33617L12.3866 4.80617C12.2806 3.71634 11.7727 2.70502 10.9617 1.96925C10.1508 1.23349 9.09496 0.825997 7.99998 0.826172ZM10.3 13.8262C10.3366 13.6428 10.1833 13.4928 9.99998 13.4928H5.99998C5.81665 13.4928 5.66331 13.6428 5.69998 13.8262C6.12665 16.0295 9.87331 16.0295 10.3 13.8262Z" fill="#161823"/>
                </svg>
                    </span>
                    <div>
                        <p className='d-flex mb-1'>Tailor your experience</p>
                        <span className='text-xs text-[#16182399]'>Snooze to get reminded again or edit future reminders.</span>
                    </div>
                </div>
        </div>
        <Typography className="border-top pt-3 mt-3">
            <div className="d-flex justify-between">
                <div>
                    <div className='text-left'>
                        <p className='text-base'>Schedule screen time breaks</p>
                    </div>
                </div>
                <label className="toggle-switch !left-1">
                    <input 
                    style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                        type="checkbox"
                        name="autoScrollCheckbox" 
                        id="autoScrollCheckbox" 
                        checked={isEnabled}
                        onChange={(e) => setIsEnabled(e.target.checked)}
                    />
                    <b className={`${ThemeColor == 'dark' ? '!bg-gray-600': ''} slider`}></b>
                    </label>
            </div>
        </Typography>
        {isEnabled && (
            <div className={`${ThemeColor === 'dark' ? 'bg-gray-100 ': 'bg-gray-600'} p-4 rounded-md mt-3`}>
                <div className="grid grid-cols-5 gap-2">
                    <button className={` ${ThemeColor === 'dark' ? 'btn-color-white': 'btn-color-dark'} border p-[6px] rounded-sm  bg-white focus:text-[#FE2C55]  `} onClick={() => selectTime('daily', "0", "10")}>10m</button>
                    <button className={` ${ThemeColor === 'dark' ? 'btn-color-white': 'btn-color-dark'} border p-[6px] rounded-sm  bg-white focus:text-[#FE2C55]  `} onClick={() => selectTime('daily', "0", "20")}>20m</button>
                    <button className={` ${ThemeColor === 'dark' ? 'btn-color-white': 'btn-color-dark'} border p-[6px] rounded-sm  bg-white focus:text-[#FE2C55]  `} onClick={() => selectTime('daily', "0", "30")}>30m</button>
                    <button className={` ${ThemeColor === 'dark' ? 'btn-color-white': 'btn-color-dark'} border p-[6px] rounded-sm  bg-white focus:text-[#FE2C55]  `}>Custom</button>
                </div>
            </div>
        )}
        <div className='d-flex mt-3 justify-end'>
            <button className="bg-[#FE2C55] text-white font-semibold px-4 rounded-sm text-sm" onClick={() => saveChanges()}>
                <p className="text-[rgb(255, 59, 92)] font-normal">Done</p>
            </button>
        </div>
      </div>
  );
};

export default screenTimeBreaks;
