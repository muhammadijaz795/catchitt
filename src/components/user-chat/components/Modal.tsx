import React from 'react';
import { ClickAwayListener } from '@mui/material';

export const Modal: React.FC<any> = ({
    isOpen,
    onClose,
    isDarkTheme,
    children
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <ClickAwayListener onClickAway={onClose}>
                <div className={`${isDarkTheme ? 'bg-[#181818]' : 'bg-white'} rounded-lg w-full max-w-md p-6 shadow-xl`}>
                    {children}                    
                </div>
            </ClickAwayListener>
        </div>
    );
};