
import classNames from 'classnames';
import styles from './switchToPersonalPopup.module.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

import { useDispatch } from 'react-redux';
import {updateProfileType } from '../../../redux/reducers/auth';

export interface SwitchToPersonalPopupProps {
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

export const SwitchToPersonalPopup = ({ className, onSubmit, handleOpen, handleClose }: SwitchToPersonalPopupProps) => {
    const token = useAuthStore((state) => state.token);
    const email = useAuthStore((state) => state.email)
    const accountType = useAuthStore((state) => state.accountType)
const dispatch = useDispatch();


    const [firstModalVisible, setFirstModalVisible] = useState(true);

    const [currentAccountType, setCurrentAccountType] = useState(accountType)

    const API_KEY = process.env.VITE_API_URL;

    const navigate = useNavigate();

    const handleSwitchToPersonal = async (event: React.FormEvent) => {
        event.preventDefault()
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
                setCurrentAccountType("Personal")
                  dispatch(updateProfileType({type:'Personal'}));
                useAuthStore.setState({
                    accountType: accountType
                });
                console.log(responseData);
                handleCloseModal()
            } else {
                console.log(email);
                const errorResponseData = await response.json();
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleCloseModal = () => {
        setFirstModalVisible(false)
        handleClose();
    }

    useEffect(() => {

    }, [currentAccountType])

    return (
        <div className={classNames(styles.root, className)}>
            <div>
                {firstModalVisible && (
                    <>
                        <div className={styles.frame}>
                            <div className={styles.contentPrefHeader}>
                                <h4 className={styles.contentPrefModalHeader}>
                                    Switch to Personal Account?
                                </h4>
                                <p className={styles.greyText}>
                                    You will lose all the Business Account features,
                                    your profile <br></br>will not show the business website and email,
                                    you will still <br></br>be responsible for any violations received on your<br></br>
                                    business account.
                                </p>
                            </div>
                            <form
                                className={styles.formStyle}>
                                <div className={styles.btnsDiv}>
                                    <button
                                        className={styles.submitBtn}
                                        onClick={handleSwitchToPersonal}
                                    >
                                        Switch anyway
                                    </button>
                                    <button
                                        type="reset"
                                        className={styles.cancelBtn}
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
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
    background: 'var(--foundation-primary-primary-500, #5448B2)',
    textTransform: 'none'
};
