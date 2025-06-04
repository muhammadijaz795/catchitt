import React, { useEffect, useState } from 'react';
import style from './select-profile-img.scss';
import { Box, Modal, Button } from '@mui/material';
import { defaultAvatar } from '../../../icons';

import CoverCropbox from './cover-cropbox';

const CoverImagePopup = ({ open, onCancel, onSelect }: any) => {

    const [darkTheme, setdarkTheme] = useState(false);
        useEffect(() => {
            var themeColor = window.localStorage.getItem('theme');
    
            if(themeColor == "dark"){ 
                setdarkTheme(true);
            }else{
                setdarkTheme(false);
            }
        });
    const [imgBase64, setImgBase64] = useState('');
    const onImageCropped = (img: string) => {
        onSelect(img);
    };
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={popupStyle}>
                <div
                        onClick={onCancel}
                        className={`absolute top-4 right-4 p-1.5 cursor-pointer rounded-full ${
                            darkTheme ? 'bg-slate-500' : 'bg-white'
                        }`}
                        >                    
                            <svg width="13" height="13" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.66248 16.5089C1.2702 16.5317 0.884413 16.4013 0.586463 16.1452C-0.00115176 15.5541 -0.00115176 14.5994 0.586463 14.0083L13.4533 1.14138C14.0645 0.569481 15.0235 0.601273 15.5954 1.21244C16.1125 1.76512 16.1427 2.6146 15.666 3.20252L2.72332 16.1452C2.42921 16.3976 2.04961 16.5278 1.66248 16.5089Z" fill="black"></path><path d="M14.5141 16.5089C14.1166 16.5072 13.7355 16.3494 13.4532 16.0694L0.586341 3.2025C0.0419461 2.56678 0.115959 1.61004 0.751685 1.0656C1.31909 0.579696 2.15589 0.579696 2.72324 1.0656L15.6659 13.9325C16.2769 14.5045 16.3085 15.4636 15.7365 16.0746C15.7137 16.0989 15.6902 16.1224 15.6659 16.1452C15.349 16.4208 14.9319 16.5525 14.5141 16.5089Z" fill="black"></path></svg>
                        </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '342px',
                        padding: '10px',
                    }}
                >
                    <CoverCropbox onChangeImage={onImageCropped} />
                    <div
                        style={{
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <Button variant="contained" sx={secondaryBtn} onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default CoverImagePopup;

const popupStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    width: '359px',
    minHeight: '342px',
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

var filledButton = {
    fontFamily: 'Poppins !important',
    display: 'flex !important',
    width: '100% !important',
    height: '48px !important',
    padding: '0 16px !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    borderRadius: '6px !important',
    background: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    textTransform: 'none !important',
};

var secondaryBtn = {
    ...filledButton,
    color: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    background: 'white',
    border: '1px solid var(--foundation-primary-primary-500, rgb(255, 59, 92))',
};
