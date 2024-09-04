import FormControlLabel from '@mui/material/FormControlLabel';

import classNames from 'classnames';
import styles from './delete-reason-popup.module.scss';

import { Box, Button, Modal } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import InputField from '../../reusables/InputField';
import LeftArrow from '../svg-components/LeftArrow.svg';

export interface DeleteReasonPopupProps {
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

export const DeleteReasonPopup = ({
    className,
    onSubmit,
    handleOpen,
    handleClose,
}: DeleteReasonPopupProps) => {
    const token = localStorage.getItem('token');
    const username = useAuthStore((state) => state.username);
    const email = useAuthStore((state) => state.email);
    const logout = useAuthStore((state) => state.logout);
    const [user, setUser] = useState(defaultUser);
    const signInEndPoint = '/auth/sign-in';
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [otherReasonField, setOtherReasonField] = useState(false);

    const [deleteReasonsData, setDeleteReasonsData] = useState({});
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [deleteReason, setDeleteReason] = useState('');

    const [firstModalVisible, setFirstModalVisible] = useState(true);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [openPasswordCheckModal, setOpenPasswordCheckModal] = useState(false);
    const [openConfirmationLastModal, setOpenConfirmationLastModal] = useState(false);

    const [notAcceptable, setNotAcceptable] = useState(false);

    const [password, setPassword] = useState('');

    const API_KEY = process.env.VITE_API_URL;

    const navigate = useNavigate();

    const onUserChange = <P extends keyof User>(prop: P, value: User[P]) => {
        setUser({ ...user, [prop]: value });
    };

    const handleSignIn = async (email: string, password: string) => {
        try {
            const response = await fetch(`${API_KEY}${signInEndPoint}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ password, email }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setErrorMessage('');
                setSuccessMessage('Correct!');
                setOpenPasswordCheckModal(false);
                setOpenConfirmationLastModal(true);
            } else {
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message;
                setSuccessMessage('');
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password');
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const select = event.target.value;
        setSelectedValue(select);
        setDeleteReason(select);
        if (select === 'Another reason') {
            setDeleteReason('');
            setOtherReasonField(true);
        } else {
            setOtherReasonField(false);
        }
    };

    const handleFetchDeleteReasons = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/delete-account-reasons`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setDeleteReasonsData(data.data);
            } else {
                console.error('Error fetching delete reasons:', data.message);
            }
        } catch (error) {
            console.error('Error fetching delete reasons:', error);
        }
    };

    const handleOpenConfirmationFirstModal = () => {
        setFirstModalVisible(false);
        setOpenConfirmationModal(true);
    };

    const handleCloseConfirmationFirstModal = () => {
        setOpenConfirmationModal(false);
        handleClose();
    };

    const handleOpenPasswordCheckModal = () => {
        setOpenConfirmationModal(false);
        setOpenPasswordCheckModal(true);
    };

    const handleClosePasswordCheckModal = () => {
        setOpenPasswordCheckModal(false);
        user.password = '';
        setErrorMessage('');
        setSuccessMessage('');
        handleClose();
    };

    const handleOpenConfirmationLastModal = () => {
        setOpenPasswordCheckModal(false);
        setOpenConfirmationModal(false);
        setOpenConfirmationLastModal(true);
    };

    const handleCloseConfirmationLastModal = () => {
        setOpenConfirmationLastModal(false);
        handleClose();
    };

    const handleGoBackToReasonForDelete = () => {
        setFirstModalVisible(true);
        setOpenConfirmationModal(false);
    };

    const handleGoBackToFirstDeleteConfirmation = () => {
        setOpenPasswordCheckModal(false);
        setOpenConfirmationModal(true);
    };

    useEffect(() => {
        handleFetchDeleteReasons();
    }, []);

    const handleDeleteSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_KEY}/profile/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password: user.password, reason: selectedValue }),
            });
            if (response.ok) {
                // Handle success
                await response.json();
                handleClose();
                logout();
                navigate('/auth');
            } else {
                await response.json();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if ((deleteReason === '' && selectedValue === 'Another reason') || selectedValue === '') {
            setNotAcceptable(true);
        } else {
            setNotAcceptable(false);
        }
    }, [deleteReason]);

    return (
        <div className={classNames(styles.root, className)}>
            <div>
                {firstModalVisible && (
                    <>
                        <div className={styles.frame}>
                            <div className={styles.contentPrefHeader}>
                                <h4 className={styles.contentPrefModalHeader}>Delete account</h4>
                                <p className={styles.blueText}>Why are you leaving Seezitt?</p>
                                <p className={styles.greyText}>
                                    It is sad to see you leave. Could you tell us the reason you are
                                    leaving? It well help us provide a happier environment for our
                                    community.
                                </p>
                            </div>
                            <form
                                onSubmit={(event) => handleDeleteSubmit(event)}
                                className={styles.formStyle}
                            >
                                <FormControl>
                                    <RadioGroup
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            rowGap: '20px',
                                            width: '100%',
                                        }}
                                        value={selectedValue}
                                        onChange={handleRadioChange}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        {Object.entries(deleteReasonsData).map(([key, value]) => (
                                            <FormControlLabel
                                                key={key}
                                                value={key}
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '&.Mui-checked': {
                                                                color: 'rgb(255, 59, 92)',
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={String(value)}
                                                style={{
                                                    borderBottom: '1px solid #DFDFDF',
                                                    paddingBottom: '18px',
                                                    // paddingTop: '18px'
                                                }}
                                            />
                                        ))}
                                        <FormControlLabel
                                            value="Another reason"
                                            control={
                                                <Radio
                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: 'rgb(255, 59, 92)',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Another reason"
                                        />
                                        {otherReasonField && (
                                            <input
                                                className={styles.otherReasonInputField}
                                                placeholder={
                                                    'Please tell us the reason you are leaving'
                                                }
                                                onChange={(e) => setDeleteReason(e.target.value)}
                                            />
                                        )}
                                    </RadioGroup>
                                </FormControl>
                                <div className={styles.btnsDiv}>
                                    <button
                                        type="reset"
                                        className={styles.cancelBtn}
                                        onClick={handleClose}
                                    >
                                        Skip
                                    </button>
                                    <button
                                        type="submit"
                                        className={
                                            notAcceptable
                                                ? styles.submitBtnDeactivated
                                                : styles.submitBtn
                                        }
                                        onClick={handleOpenConfirmationFirstModal}
                                        disabled={notAcceptable}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className={styles.submitDiv} />
                    </>
                )}
                {openConfirmationModal && (
                    <>
                        <Modal
                            open={openConfirmationModal}
                            onClose={handleCloseConfirmationFirstModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={mainModalstyle}>
                                <div className={styles.frame}>
                                    <div className={styles.contentPrefHeaderConfirmationModal}>
                                        <div
                                            className={styles.leftArrowImg}
                                            onClick={handleGoBackToReasonForDelete}
                                        >
                                            <img src={LeftArrow} alt="" />
                                        </div>
                                        <div className={styles.headerTextDiv}>
                                            <h4 className={styles.contentPrefModalHeader}>
                                                Delete account?
                                            </h4>
                                            <p className={styles.blueText}>
                                                Delete {username} account?
                                            </p>
                                            <p
                                                className={styles.greyText}
                                                style={{ width: '372px' }}
                                            >
                                                Your account will deactivate for 30 days, it will
                                                not be <br></br>
                                                visible to public. You can reactivate your account{' '}
                                                <br></br>
                                                by login in anytime during these 30 days.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={styles.bodyText}>
                                            By deleting your account:<br></br>
                                        </p>
                                        <p className={styles.bodyText}>
                                            <ul style={{ padding: '0 24px 0 24px' }}>
                                                <li>
                                                    You no longer can login to this account.
                                                    <br></br>
                                                </li>
                                                <li>
                                                    You lose all your drafts, and posted videos and
                                                    images.<br></br>
                                                </li>
                                                <li>
                                                    You can’t get a refund on any items purchased or
                                                    recieved.<br></br>
                                                </li>
                                                <li>
                                                    You lose all your direct messages, but others
                                                    may still be able to see it.<br></br>
                                                </li>
                                            </ul>
                                            <br></br>
                                            Do you still wish to continue?
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    sx={mainModalBtnstyle}
                                    onClick={handleOpenPasswordCheckModal}
                                >
                                    Continue
                                </Button>
                            </Box>
                        </Modal>
                    </>
                )}
                {openPasswordCheckModal && (
                    <>
                        <Modal
                            open={openPasswordCheckModal}
                            onClose={handleClosePasswordCheckModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={mainModalstyle}>
                                <div className={styles.frame}>
                                    <div className={styles.contentPrefHeaderConfirmationModal}>
                                        <div
                                            className={styles.leftArrowImg}
                                            onClick={handleGoBackToFirstDeleteConfirmation}
                                        >
                                            <img src={LeftArrow} alt="" />
                                        </div>
                                        <div className={styles.headerTextDiv}>
                                            <h4 className={styles.contentPrefModalHeader}>
                                                Delete account
                                            </h4>
                                            <p className={styles.blueText}>Enter password</p>
                                            <p
                                                className={styles.greyText}
                                                style={{ width: '372px' }}
                                            >
                                                To continue, please enter your password to confirm
                                                <br></br>
                                                this account belongs to you.
                                            </p>
                                        </div>
                                    </div>
                                    {errorMessage ? (
                                        <div style={{ marginTop: '10px' }}>
                                            <h4
                                                style={{
                                                    fontWeight: '700',
                                                    fontSize: '16px',
                                                    color: 'red',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                {errorMessage}
                                            </h4>
                                        </div>
                                    ) : null}
                                    {successMessage ? (
                                        <div style={{ marginTop: '10px' }}>
                                            <h4
                                                style={{
                                                    fontWeight: '700',
                                                    fontSize: '16px',
                                                    color: 'green',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                {successMessage}
                                            </h4>
                                        </div>
                                    ) : null}
                                    <div style={{ width: '100%' }}>
                                        <InputField
                                            type="password"
                                            placeholder={'Enter password'}
                                            className="formInputFields"
                                            value={user.password}
                                            onChange={(e: { target: { value: string } }) => {
                                                onUserChange('password', e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    sx={mainModalBtnstyle}
                                    onClick={() => handleSignIn(email ? email : '', user.password)}
                                >
                                    Delete {username}
                                </Button>
                            </Box>
                        </Modal>
                    </>
                )}
                {openConfirmationLastModal && (
                    <>
                        <Modal
                            open={openConfirmationLastModal}
                            onClose={handleCloseConfirmationLastModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={lastConfirmationModalstyle}>
                                <div className={styles.frame} style={{ marginBottom: '0' }}>
                                    <div
                                        className={styles.finalDeleteConfirmationDiv}
                                        style={{ textAlign: 'center' }}
                                    >
                                        <h4>
                                            Are you sure you want to delete<br></br>
                                            account {username} ?
                                        </h4>
                                    </div>
                                    <div className={styles.confirmationBtnsDiv}>
                                        <button
                                            onClick={handleDeleteSubmit}
                                            style={{ background: '#DE0C0C', color: 'white' }}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={handleCloseConfirmationLastModal}
                                            style={{
                                                border: '1px solid rgb(255, 59, 92)',
                                                background: '#FFF',
                                                color: 'rgb(255, 59, 92)',
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
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
    maxWidth: 524,
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
