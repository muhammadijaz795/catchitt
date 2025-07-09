import classNames from 'classnames';
import styles from './switchToPersonalPopup.module.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

import { useDispatch } from 'react-redux';
import { updateProfileType } from '../../../redux/reducers/auth';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export interface SwitchToPersonalPopupProps {
    darkTheme?: any;
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

export const SwitchToPersonalPopup = ({
    darkTheme,
    className,
    onSubmit,
    handleOpen,
    handleClose,
}: SwitchToPersonalPopupProps) => {
    const token = localStorage.getItem('token');
    const email = useAuthStore((state) => state.email);
    const accountType = useAuthStore((state) => state.accountType);
    const dispatch = useDispatch();

    const [firstModalVisible, setFirstModalVisible] = useState(true);

    const [currentAccountType, setCurrentAccountType] = useState(accountType);

    const API_KEY = process.env.VITE_API_URL;

    const navigate = useNavigate();
const { t, i18n } = useTranslation();
    const handleSwitchToPersonal = async (event: React.FormEvent) => {
        
        event.preventDefault();
        try {
            const response = await fetch(`${API_KEY}/profile/`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ accountType: 'Personal' }),
            });
            if (response.ok) {
                const responseData = await response.json();
                setCurrentAccountType('Personal');
                dispatch(updateProfileType({ type: 'Personal' }));
                useAuthStore.setState({
                    accountType: accountType,
                });
                handleCloseModal();
            } else {
                await response.json();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setFirstModalVisible(false);
        handleClose();
    };

    useEffect(() => {}, [currentAccountType]);

    return (
        <div className={classNames(styles.root, className)}>
            <div>
                {firstModalVisible && (
                    <>
                        <div className={styles.frame}>
                            <div className={styles.contentPrefHeader}>
                                <h4 className={`${styles.contentPrefModalHeader} ${darkTheme!==''?'text-white':'text-black'}`}>
                                    {t('account.switchToPersonal')}
                                </h4>
                                <p className={styles.greyText}>
                                    {t('account.lossWarning.message', {
                                        interpolation: { escapeValue: false }
                                    })}
                                </p>
                            </div>
                            <form className={styles.formStyle}>
                                <div className={styles.btnsDiv}>
                                    <button
                                        className={styles.submitBtn}
                                        onClick={handleSwitchToPersonal}
                                    >
                                        {t('account.switch.anyway')}
                                    </button>
                                    <button
                                        type="reset"
                                        className={styles.cancelBtn}
                                        onClick={handleCloseModal}
                                    >
                                        {t('Cancel')}
                                    </button>
                                </div>
                            </form>
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
    maxWidth: 526,
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

var mainModalBtnstyle = {
    fontFamily: 'Poppins',
    display: 'flex',
    width: '478px',
    height: '48px',
    padding: '0 16px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    background: 'var(--foundation-primary-primary-500, rgb(255, 59, 92))',
    textTransform: 'none',
};
