import React, { useState } from 'react';
import style from './select-profile-img.scss';
import { Box, Modal, Button } from '@mui/material';
import { defaultAvatar } from '../../../icons';
import Cropbox from './cropbox';
const SelectProfileImgPopup = ({ open, onCancel, onSelect }: any) => {
    const [imgBase64, setImgBase64] = useState('');
    const onImageCropped = (img: any) => {
        // console.log("here is the image")
        // console.log(img)
        setImgBase64(img);
    };
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={popupStyle}>
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
                    <Cropbox onChangeImage={onImageCropped} />
                    <div
                        style={{
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={filledButton}
                            onClick={() => onSelect(imgBase64)}
                        >
                            Save
                        </Button>

                        <Button variant="contained" sx={secondaryBtn} onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default SelectProfileImgPopup;

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
    background: 'var(--foundation-primary-primary-500, #5448B2) !important',
    textTransform: 'none !important',
};

var secondaryBtn = {
    ...filledButton,
    color: 'var(--foundation-primary-primary-500, #5448B2) !important',
    background: 'white',
    border: '1px solid var(--foundation-primary-primary-500, #5448B2)',
};
