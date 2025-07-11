import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, styled, Switch, SwitchProps, Typography } from '@mui/material';
import styles from './popupPrivacySettings.module.scss';
import { API_KEY } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
};

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor:
                    theme.palette.mode === 'dark' ? 'rgb(255, 59, 92)' : 'rgb(255, 59, 92)',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: 'rgb(255, 59, 92)',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

function PopupForPrivacySettings({ fetchUpdatedMedia, isPrivacyModalOpened, setIsPrivacyModalOpened, mediaId }: any) {
    const { t, i18n } = useTranslation();
    const token = localStorage.getItem('token');

    const handleClose = () => setIsPrivacyModalOpened(false);

    const [data, setData] = useState<any>();

    const [privacyPrivilege, setPrivacyPrivilege] = useState({
        allowDuet: true,
        allowStitch: true,
        privacyOptions: {
            allowComments: true,
            allowDownload: true,
            isOnlyMe: true,
            isShareable: true,
            canView: "everyone",
        }
    });

    const handleSwitchChange = (event: any, isPrivacyOption: boolean, name: string, isBooleanProperty = true) => {
        const updatedPrivileges: any = { ...privacyPrivilege };
            if (isPrivacyOption) {
                if (isBooleanProperty) updatedPrivileges.privacyOptions[name] = event.target.checked;
                else updatedPrivileges.privacyOptions[name] = event.target.value;
            } else {
                updatedPrivileges[name] = event.target.checked;
            }
        
        // Make a PATCH request to update the settings
        fetch(`${API_KEY}/media-content/${mediaId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPrivileges),
        })
            .then((response) => {
                if (response.ok) {
                    // Handle a successful response here
                    fetchUpdatedMedia(mediaId);
                    setPrivacyPrivilege(updatedPrivileges);
                } else {
                    // Handle errors here
                    console.error(response);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const FetchPrivacySettings = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/videos/${mediaId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const responseData = await response.json();
                setData(responseData.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (data) {
            setPrivacyPrivilege({
                allowDuet: data.allowDuet,
                allowStitch: data.allowStitch,
                privacyOptions: {
                    allowComments: data?.privacyOptions?.allowComments || false,
                    allowDownload: data?.privacyOptions?.allowDownload || false,
                    isOnlyMe: data?.privacyOptions?.isOnlyMe  || false,
                    isShareable: data?.privacyOptions?.isShareable || false,
                    canView: data?.privacyOptions?.canView || 'everyone',
                },
            })
        }
    }, [data])

    useEffect(() => {
        if (mediaId) FetchPrivacySettings();
    }, [mediaId])

    return (
        <Modal
            open={isPrivacyModalOpened}
            onClose={(event, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    // Do nothing to prevent closing
                    return;
                }
                handleClose();
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles.darkTheme}
        >
            <Box sx={style}>
                <div className='p-4'>
                    <Typography className='text-center mb-2 ' id="modal-modal-title" variant="h6" component="h2">
                        Privacy settings
                    </Typography>
                    <span className='text-left'>Who can watch this video</span>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={privacyPrivilege.privacyOptions.canView}
                            onChange={(e: any) => handleSwitchChange(e, true, 'canView', false)}
                        >
                            <MenuItem value='everyone' defaultChecked>Everyone</MenuItem>
                            <MenuItem value='onlyme'>Only Me</MenuItem>
                            <MenuItem value='followers'>Friends</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='flex justify-between items-center mb-1 mt-2'>
                        <span className=''>{t('livestream.allow_comments')}</span>
                        <IOSSwitch sx={{ m: 1 }} checked={privacyPrivilege.privacyOptions.allowComments || false} onChange={(e: any) => handleSwitchChange(e, true, 'allowComments')} />
                    </div>
                    <div className='flex justify-between items-center my-1'>
                        <span className=''>Allow Duet</span>
                        <IOSSwitch sx={{ m: 1 }} checked={privacyPrivilege.allowDuet || false} onChange={(e: any) => handleSwitchChange(e, false, 'allowDuet')} />
                    </div>
                    <div className='flex justify-between items-center mt-1'>
                        <span className=''>Allow Stitch</span>
                        <IOSSwitch sx={{ m: 1 }} checked={privacyPrivilege.allowStitch || false} onChange={(e: any) => handleSwitchChange(e, false, 'allowStitch')} />
                    </div>
                    <span className='text-xs opacity-50 '>Duet and Stitch aren't available on videos from private accounts</span>
                </div>
                <hr />
                <div className='text-center'><button onClick={() => setIsPrivacyModalOpened(false)} className='border-none mb-1'>Done</button></div>
            </Box>
        </Modal>
    )
}

export default PopupForPrivacySettings