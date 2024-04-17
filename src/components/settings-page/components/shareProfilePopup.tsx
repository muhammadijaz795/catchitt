
import { Button } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useAuthStore } from '../../../store/authStore';
import loadingCircle from '../svg-components/loadingCircle.svg';
import qrCodeLogo from '../svg-components/qrCodeLogo.svg';
import styles from './shareProfilePopup.module.scss';

export interface ShareProfilePopupProps {
    className?: string;
    onSubmit?: any;
    handleOpen?: any;
    handleClose?: any;
}

interface User {
    email: string;
    password: string;
}

const defaultUser: User = {
    email: '',
    password: '',
};

export const ShareProfilePopup = ({ className, onSubmit, handleOpen, handleClose }: ShareProfilePopupProps) => {
    const username = useAuthStore((state) => state.username)
    const userId = useAuthStore((state) => state._id)
    const email = useAuthStore((state) => state.email)
    const logout = useAuthStore(state => state.logout);

    const [loading, setLoading] = useState(false)

    const [firstModalVisible, setFirstModalVisible] = useState(true);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [isCopied, setIsCopied] = useState(false);

    const API_KEY = process.env.VITE_API_URL;

    const handleCopyToClipboard = () => {
        const qrCodeValue = `https://app.seezitt.com/profile/${userId}`;
        // Copy to clipboard
        navigator.clipboard.writeText(qrCodeValue)
            .then(() => {
                console.log('Copied to clipboard:', qrCodeValue);
                // You can also show a success message or perform additional actions.
                setIsCopied(true);
                setLoading(true);
                // Reset loading to false after 2 seconds
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            })
            .catch((err) => {
                console.error('Error copying to clipboard:', err);
                // Handle the error, show an error message, etc.
                setLoading(false);
            });
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div>
                {firstModalVisible && (
                    <>
                        <div className={styles.frame}>
                            <div className={styles.contentPrefHeader}>
                                <h4 className={styles.contentPrefModalHeader}>
                                    QR Code
                                </h4>
                                <p className={styles.blueText}>
                                    Your profile’s QR Code</p>
                                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <QRCode
                                        size={220}
                                        logoPadding={5}
                                        qrStyle='dots'
                                        value={`https://app.seezitt.com/profile/${userId}`}
                                        bgColor='white'
                                        fgColor='#5448B2'
                                        logoImage={qrCodeLogo}
                                        removeQrCodeBehindLogo={true}
                                    />
                                </div>
                                <p className={styles.greyText}>
                                    Share this QR code to get people to follow you easily!
                                </p>
                            </div>
                            <Button variant="contained"
                                sx={mainModalBtnstyle}
                                onClick={handleCopyToClipboard}
                            >
                                {loading === true ? (
                                    <img src={loadingCircle} alt='' style={{ width: '40px' }} />
                                ) : (
                                    'Copy to clipboard'
                                )}
                                {/* Copy to clipboard */}
                            </Button>
                        </div>
                        <div className={styles.submitDiv} />
                    </>
                )}
            </div>
        </div>
    );
};


var mainModalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 416,
    height: 'auto',
    minHeight: 259,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '24px 48px',
    flexDirection: 'column',
    alignItems: 'center',
};

var mainModalBtnstyle = {
    fontFamily: 'Poppins !important',
    display: 'flex !important',
    width: '350px !important',
    height: '48px !important',
    padding: '0 16px !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    borderRadius: '6px !important',
    background: 'var(--foundation-primary-primary-500, #5448B2)  !important',
    textTransform: 'none !important'
};

var lastConfirmationModalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 433,
    height: 'auto',
    minHeight: 259,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '24px',
    flexDirection: 'column',
    alignItems: 'center',
};