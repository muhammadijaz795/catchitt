import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import atForgotPwd from '../../assets/atForgotPwd.png';
import contentIcon from '../../assets/contentIcon.svg';
import notificationBell from '../../assets/notificationBellIcon.svg';
import { useAuthStore } from '../../store/authStore';
import InputField from '../reusables/InputField';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './account.module.scss';

export interface AccountProps {
    className?: string;
    setOpenChangeEmail?: boolean;
    setOpenChangePassword?: boolean;
}

const Account: React.FC = ({ className, setOpenChangeEmail, setOpenChangePassword }: AccountProps) => {
    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const [openChangeEmailMainModal, setOpenChangeEmailMainModal] = useState(setOpenChangeEmail || false)
    const [openInstructionsModal, setOpenInstructionsModal] = useState(false)

    const [openChangePassMainModal, setOpenChangePassMainModal] = useState(setOpenChangePassword || false)
    const [openInstructionsPassModal, setOpenInstructionsPassModal] = useState(false)

    const navigate = useNavigate();

    { /*  Email Modal Start  */ }

    const handleOpenChangeEmailMainModal = () => {
        setOpenChangeEmailMainModal(true)
    }
    const handleCloseChangeEmailMainModal = () => {
        setOpenChangeEmailMainModal(false)
    }

    const handleOpenInstructionsModal = () => {
        handleCloseChangeEmailMainModal();
        setOpenInstructionsModal(true)
    }

    const handleCloseInstructionsModal = () => {
        setOpenInstructionsModal(false)
    }

    { /*  Email Modal End  */ }

    const handleOpenChangePassMainModal = () => {
        setOpenChangePassMainModal(true)
    }
    const handleCloseChangePassMainModal = () => {
        setOpenChangePassMainModal(false)
    }

    const handleOpenInstructionsPassModal = () => {
        handleCloseChangePassMainModal();
        setOpenInstructionsPassModal(true)
    }

    const handleCloseInstructionsPassModal = () => {
        setOpenInstructionsPassModal(false)
    }



    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    useEffect(() => {
        setIndex(4)
        setSettingsDropdown(true)
    }, [])

    return (
        <>
            <div className={styles.root}>
                <div className={styles.topBarDiv}>
                    <TopBar />
                </div>
                <div className={styles.container}>
                    <div className={styles.leftSide}>
                        <div className={styles.sideNavDiv}>
                            <SideNavBar selectedIndex={selectedIndex} settingsDropdownState={true} />
                        </div>
                        <div className={styles.suggestedActivityDiv}>
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
                    </div>
                    <div className={styles.middleSectionDiv}>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <h4>Account</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}
                                    onClick={handleOpenChangeEmailMainModal}>
                                    <div className={styles.settingName}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.9014 8.85156L13.4581 12.4646C12.6186 13.1306 11.4375 13.1306 10.598 12.4646L6.11719 8.85156" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9089 21C19.9502 21.0084 22 18.5095 22 15.4384V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p>
                                            Change Email address
                                        </p>
                                    </div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div className={styles.accountCards}
                                    onClick={handleOpenChangePassMainModal}>
                                    <div className={styles.settingName}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6884 12.0004C10.6884 13.0234 9.85938 13.8524 8.83637 13.8524C7.81337 13.8524 6.98438 13.0234 6.98438 12.0004C6.98438 10.9774 7.81337 10.1484 8.83637 10.1484H8.83938C9.86038 10.1494 10.6884 10.9784 10.6884 12.0004Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10.6914 12H17.0094V13.852" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M14.1836 13.852V12" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p>
                                            Change Password
                                        </p>
                                    </div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>


                        </div>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <h4>Content & Activity</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}
                                // onClick={handleOpenChangeEmailMainModal}
                                >
                                    <div className={styles.settingName} onClick={() => navigate('/settings/activity')}>
                                        <img src={notificationBell} alt='' />
                                        <p>
                                            Push notifications
                                        </p>
                                    </div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div className={styles.accountCards}
                                // onClick={handleOpenChangePassMainModal}
                                >
                                    <div className={styles.settingName}>
                                        <img src={contentIcon} alt='' />
                                        <p>
                                            Content preference
                                        </p>
                                    </div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>


                        </div>


                    </div>
                </div>
            </div>
            {openChangeEmailMainModal && (
                <>
                    <div>
                        <Modal
                            open={openChangeEmailMainModal}
                            onClose={handleCloseChangeEmailMainModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={mainModalstyle}>
                                <div style={{ marginBottom: '24px' }}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontSize: '20px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '30px',
                                            paddingBottom: '16.5px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        Change Email address
                                    </Typography>
                                    <div>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            sx={{
                                                color: 'var(--foundation-body-body-300, #6B6B6B)',
                                                textAlign: 'center',
                                                fontFamily: 'Poppins',
                                                fontSize: '14px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '150%',
                                            }}
                                        >
                                            Please enter your old email address
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '24px', width: '100%' }}>
                                    <InputField placeholder='Enter Old Email address' type='email' />
                                </div>
                                <Button
                                    onClick={handleOpenInstructionsModal}
                                    variant="contained"
                                    sx={mainModalBtnstyle}>
                                    Continue
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                </>
            )}
            {openInstructionsModal && (
                <>
                    <Modal
                        open={openInstructionsModal}
                        onClose={handleCloseInstructionsModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >

                        <Box sx={instructionsModalStyle}>
                            <div>
                                <img src={atForgotPwd} alt="" className={styles.atForgotPwd} />
                            </div>
                            <h3 className={styles.instructionsModalTitleText}>
                                Check your Email
                            </h3>
                            <p className={styles.instructionsModalText}>We have sent instructions to the change your email.</p>
                            <div>
                                <Button
                                    // onClick={handleOpenInstructionsModal}
                                    variant="contained"
                                    sx={instructionsModalBtnstyle}
                                >
                                    Open Email App
                                </Button>
                                <Button
                                    // onClick={handleOpenInstructionsModal}
                                    variant="outlined"
                                    sx={instructionsModalOutlinedBtnstyle}
                                >
                                    Resend
                                </Button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ textAlign: 'center', width: '360px' }}>
                                    <span className={styles.infoText}>
                                        Did not receive the email? Check your spam filter,{' '}
                                    </span>
                                    <span className={styles.infoText}>
                                        or{' '}
                                    </span>
                                    <span className={styles.infoTextLink}>
                                        try another email address
                                    </span>
                                </p>
                            </div>
                        </Box>
                    </Modal>
                </>
            )}
            {/* Email Steps End */}
            {openChangePassMainModal && (
                <>
                    <div>
                        <Modal
                            open={openChangePassMainModal}
                            onClose={handleCloseChangePassMainModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={mainModalstyle}>
                                <div style={{ marginBottom: '24px' }}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontSize: '20px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '30px',
                                            paddingBottom: '16.5px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        Change password
                                    </Typography>
                                    <div>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            sx={{
                                                color: 'var(--foundation-body-body-300, #6B6B6B)',
                                                textAlign: 'center',
                                                fontFamily: 'Poppins',
                                                fontSize: '14px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '150%',
                                            }}
                                        >
                                            Please enter your old password
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '24px', width: '100%' }}>
                                    <InputField placeholder='Enter old password' type='email' />
                                </div>
                                <Button
                                    onClick={handleOpenInstructionsPassModal}
                                    variant="contained"
                                    sx={mainModalBtnstyle}>
                                    Continue
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                </>
            )}
            {openInstructionsPassModal && (
                <>
                    <Modal
                        open={openInstructionsPassModal}
                        onClose={handleCloseInstructionsPassModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >

                        <Box sx={instructionsModalStyle}>
                            <div>
                                <img src={atForgotPwd} alt="" className={styles.atForgotPwd} />
                            </div>
                            <h3 className={styles.instructionsModalTitleText}>
                                Check your Email
                            </h3>
                            <p className={styles.instructionsModalText}>We have sent you instructions to change your password on the email provided.</p>
                            <div>
                                <Button
                                    // onClick={handleOpenInstructionsModal}
                                    variant="contained"
                                    sx={instructionsModalBtnstyle}
                                >
                                    Open Email App
                                </Button>
                                <Button
                                    // onClick={handleOpenInstructionsModal}
                                    variant="outlined"
                                    sx={instructionsModalOutlinedBtnstyle}
                                >
                                    Resend
                                </Button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ textAlign: 'center', width: '360px' }}>
                                    <span className={styles.infoText}>
                                        Did not receive the email? Check your spam filter,{' '}
                                    </span>
                                    <span className={styles.infoText}>
                                        or{' '}
                                    </span>
                                    <span className={styles.infoTextLink}>
                                        try another email address
                                    </span>
                                </p>
                            </div>
                        </Box>
                    </Modal>
                </>
            )}
        </>
    );
};

export default Account;

var mainModalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 524,
    height: 'auto',
    minHeight: 259,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '24px 23px',
    flexDirection: 'column',
    alignItems: 'center',
};

var mainModalBtnstyle = {
    display: 'flex',
    width: '478px',
    height: '48px',
    padding: '0 16px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    background: 'var(--foundation-primary-primary-500, #5448B2)',
    textTransform: 'none'
};

var instructionsModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 499,
    height: 'auto',
    minHeight: 259,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '40px',
    flexDirection: 'column',
    alignItems: 'center',
};

var instructionsModalBtnstyle = {
    display: 'flex',
    width: '435px',
    height: '48px',
    padding: '0 16px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    background: 'var(--foundation-primary-primary-500, #5448B2)',
    textTransform: 'none',
    marginBottom: '16px',

    color: 'var(--default-white, #FFF)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '120%',
};

var instructionsModalOutlinedBtnstyle = {
    textTransform: 'none',
    display: 'flex',
    width: '435px',
    height: '48px',
    padding: '0px 16px',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,

    borderRadius: '6px',
    border: '1px solid var(--foundation-primary-primary-500, #5448B2)',
    background: 'var(--default-white, #FFF)',

    color: 'var(--foundation-primary-primary-500, #5448B2)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '120%', // You can use '1.2' as well for a decimal value

    marginBottom: '24px',
}