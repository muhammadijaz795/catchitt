import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import atForgotPwd from '../../assets/atForgotPwd.png';
import contentIcon from '../../assets/contentIcon.svg';
import notificationBell from '../../assets/notificationBellIcon.svg';
import privacyPolicyIcon from '../../assets/privacyPolicyIcon.svg';
import reportProblem from '../../assets/reportProblemIcon.svg';
import seezittLogoIcon from '../../assets/seezittLogoIcon.svg';
import termsConfitionsIcon from '../../assets/termsConditionsIcon.svg';
import { useAuthStore } from '../../store/authStore';
import InputField from '../reusables/InputField';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './account.module.scss';
import { DeleteReasonPopup } from './components/delete-reason-popup';
import changePassIcon from './svg-components/changePassIcon.svg';
import redRightArrow from './svg-components/redRightArrow.svg';
import whiteRightArrow from './svg-components/whiteRightArrow.svg';

export interface AccountProps {
    className?: string;
    openModal?: boolean;
}

export interface Profile {
    status: number;
    message: string;
    data: {
        businessCategory: string | null;
        _id: string;
        avatar: string;
        cover: string;
        bio: string;
        contactEmail: string;
        website: string;
        country: string;
        mediaCategories: string[];
        balance: number;
        accountType: string;
        username: string;
        name: string;
        email: string;
        dateOfBirth: string;
        isVerified: boolean;
        followersNumber: number;
        followingNumber: number;
        likesNum: number;
    };
}

interface Category {
    _id: string;
    createdTime: number;
    lastModifiedTime: number;
    isDeleted: boolean;
    name: string;
    isActive: boolean;
    __v: number;
    icon: string;
}

interface User {
    resetPassEmail: string;
    password: string;
    confirmPassword: string;
    resetPassToken: string;
}

const defaultUser: User = {
    password: '',
    confirmPassword: '',
    resetPassEmail: '',
    resetPassToken: ''
};
const Account = ({ className, openModal }: AccountProps) => {
    const API_KEY = process.env.VITE_API_URL;
    const forgotPwdEndPoint = '/auth';
    const signInEndPoint = '/auth/sign-in';
    const { login } = useAuthStore();

    const [response, setResponse] = useState(false);
    const [responseResult, setResponseResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [user, setUser] = useState(defaultUser);

    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const token = useAuthStore((state) => state.token);
    const email = useAuthStore((state) => state.email);

    const [openChangePassMainModal, setOpenChangePassMainModal] = useState(false)
    const [openInstructionsPassModal, setOpenInstructionsPassModal] = useState(false)

    const [openContentPrefModal, setOpenContentPrefModal] = useState(false)

    const [openDeleteAccountMainModal, setOpenDeleteAccountMainModal] = useState(false)

    const [openSetNewPassModal, setOpenNewPassModal] = useState(openModal || false)

    const [profileData, setProfileData] = useState<any>([])
    const [profileDataCopy, setProfileDataCopy] = useState<any>([])

    const [categoriesData, setCategoriesData] = useState<any>([])

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const MAX_CHOICES = 5; // Set your maximum choices limit
    const [notAcceptable, setNotAcceptable] = useState(false)

    const navigate = useNavigate();

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    const handleOpenChangePassMainModal = () => {
        setOpenChangePassMainModal(true)
    }
    const handleCloseChangePassMainModal = () => {
        setOpenChangePassMainModal(false)
        setLoadingAnimation(false)
        setErrorMessage('')
    }

    const handleOpenInstructionsPassModal = (e: React.FormEvent) => {
        setLoadingAnimation(true)
        handleSignInSubmit(e)
        onUserChange('password', '');
        setErrorMessage('');
    }
    const handleCloseInstructionsPassModal = () => {
        setOpenInstructionsPassModal(false)
    }

    const handleCloseNewPassModal = () => {
        setOpenNewPassModal(false)
        onUserChange('password', '');
        setErrorMessage('');
    }

    const handleOpenContentPrefModal = () => {
        setOpenContentPrefModal(true)
        // setProfileDataCopy(profileData)
    }
    const handleCloseContentPrefModal = () => {
        setOpenContentPrefModal(false)
        setSelectedCategories([])
        handleProfileFetch()
    }

    const handleOpenDeleteAccountMainModal = () => {
        setOpenDeleteAccountMainModal(true)
    }
    const handleCloseDeleteAccountMainModal = () => {
        setOpenDeleteAccountMainModal(false)
    }

    const handleSignInSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const { password } = user;
        handleSignIn(password, email);
    };

    const handleSignIn = async (password: string, email: string | null) => {
        try {
            const response = await fetch(`${API_KEY}${signInEndPoint}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ password, email }),
            });

            if (response.ok) {
                const responseData = await response.json();
                const { email, token, _id, balance, username, name } = responseData.data; // Extract token value from data object
                // const name = responseData.data; // Assuming the 'name' field is present in the response data
                useAuthStore.setState({
                    isLoggedIn: true,
                    name: name !== '' ? name : '',
                    token: token,
                    _id: _id,
                    balance: balance,
                });
                login(email, token, _id, balance, username, name); // Call the login function from the Zustand store
                console.log(responseData);
                handleForgotPasswordSubmit()
                setLoadingAnimation(false)
                handleCloseChangePassMainModal();
                setOpenInstructionsPassModal(true)
            } else {
                // Handle the error response from the server
                setLoadingAnimation(false)
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password');
        }
    };

    useEffect(() => {
        // setIndex(4)
        setSettingsDropdown(true)
        handleFetchCategoriesNames()
        handleProfileFetch()
    }, [])

    const handleProfileFetch = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: Profile = await response.json();
            // Extract the mediaCategories array
            setProfileData(data.data.mediaCategories);
            setProfileDataCopy(data.data.mediaCategories);
            console.log(`fetched categories::::: ${data.data.mediaCategories}`);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleFetchCategoriesNames = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/categories`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const myData = await response.json();
            setCategoriesData([...myData.data]);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };


    const handleCheckboxChange = async (category: Category) => {
        // Check if the category is already selected
        if (selectedCategories.includes(category._id)) {
            // If it is selected, remove it
            setSelectedCategories(selectedCategories.filter((item) => item !== category._id));
        } else {
            // If it is not selected, check if the maximum limit is reached
            if (selectedCategories.length > MAX_CHOICES + 1) {
                // setNotAcceptable(true)
            } else {
                // setNotAcceptable(false)
                setSelectedCategories([...selectedCategories, category._id])
            }
        }
    }

    useEffect(() => {
        if (selectedCategories.length > 5 || selectedCategories.length < 1) {
            setNotAcceptable(true)
            console.log(selectedCategories);
        }
        else {
            setNotAcceptable(false)
            console.log(selectedCategories);
        }
    }, [selectedCategories])

    const handleSubmitPrefContent = async () => {
        try {
            const categoryIds = selectedCategories.map(category => category).join(',');
            const payload = categoryIds

            console.log(`my patch: ${payload}`);

            const response = await fetch(`${API_KEY}/auth/media-categories`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ categories: payload }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                console.log(response);
            }
            if (response.ok) {
                console.log(response);
                handleCloseContentPrefModal()
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    const isChecked = (category: any) => {
        if (profileDataCopy.includes(category.name)) {
            // Set selected categories only if not already set
            setSelectedCategories([...selectedCategories, category._id]);
            setProfileDataCopy(profileDataCopy.filter((e: any) => e !== category.name))
        }
        // Check if the category is initially checked or currently checked
        return selectedCategories.includes(category._id);
    };

    const handleEmailClick = () => {
        const infoEmail = 'info@ogoul.com';
        window.location.href = `mailto:${infoEmail}`;
        // setOpenFaqsModal(false)
        setIndex(6)
    }

    /** Handling Forgot Password Scenario */
    const handleForgotPassword = async (email: string | null) => {
        try {
            const response = await fetch(`${API_KEY}${forgotPwdEndPoint}/password/forgot`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });

            if (response.ok) {
                const responseData = await response.json();
                // const { token } = responseData.data; // Extract token value from data object
                console.log(responseData);
                setResponseResult(responseData.message);
                setResponse(true);
                // navigate('/dashboard');
            } else {
                setErrorMessage('Invalid email');
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email');
        }
    };

    const handleForgotPasswordSubmit = () => {
        // e.preventDefault();
        // const { email } = user;
        handleForgotPassword(email);
    };

    const onUserChange = <P extends keyof User>(prop: P, value: User[P]) => {
        setUser({ ...user, [prop]: value });
    };

    const handleSetNewPassword = async (password: string, email: string | null, token: string | null) => {
        try {
            const response = await fetch(`${API_KEY}/auth/password/set-new`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ password, email, token }),
            });
            if (response.ok) {
                const responseData = await response.json();
                // const { token } = responseData.data; // Extract token value from data object
                console.log(responseData);
                setResponseResult(responseData.message);
                setResponse(true);
                setLoadingAnimation(false)
                setTimeout(() => {
                    handleCloseNewPassModal();
                }, 2000);
            } else {
                setLoadingAnimation(false)
                setErrorMessage('invalid password');
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid password');
        }
    };

    const handleSetNewPasswordSubmit = () => {
        setErrorMessage('')
        setLoadingAnimation(true);
        const { password, resetPassEmail, resetPassToken } = user;
        handleSetNewPassword(password, resetPassEmail, resetPassToken);
    };

    const renderResponse = () => {
        return (
            <div
                style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    color: 'green',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}
            >
                {responseResult}
            </div>
        );
    };

    useEffect(() => {
        const { pathname } = location;
        const pathSegments = pathname.split('/');

        user.resetPassEmail = pathSegments[2];
        user.resetPassToken = pathSegments.slice(3).join('/');

        console.log('Email:', user.resetPassEmail);
        console.log('Token:', user.resetPassToken);
    }, [openSetNewPassModal])


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
                                    onClick={handleOpenChangePassMainModal}>
                                    <div className={styles.settingName}>
                                        <img src={changePassIcon} alt='' />
                                        <p>
                                            Change Password
                                        </p>
                                    </div>
                                    <img src={whiteRightArrow} alt='' />
                                </div>
                                <div className={styles.accountCards}
                                    onClick={() => navigate('/settings/account/privacy-settings')}>
                                    <div className={styles.settingName}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9846 21.606C11.9846 21.606 19.6566 19.283 19.6566 12.879C19.6566 6.474 19.9346 5.974 19.3196 5.358C18.7036 4.742 12.9906 2.75 11.9846 2.75C10.9786 2.75 5.26557 4.742 4.65057 5.358C4.03457 5.974 4.31257 6.474 4.31257 12.879C4.31257 19.283 11.9846 21.606 11.9846 21.606Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.38281 11.8741L11.2748 13.7691L15.1728 9.86914" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p>
                                            Privacy and Security
                                        </p>
                                    </div>
                                    <img src={whiteRightArrow} alt='' />
                                </div>
                                <div className={styles.accountCards}
                                    onClick={handleOpenDeleteAccountMainModal}
                                >
                                    <div className={styles.settingName}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.3238 9.46875C19.3238 9.46875 18.7808 16.2037 18.4658 19.0407C18.3158 20.3957 17.4788 21.1898 16.1078 21.2148C13.4988 21.2618 10.8868 21.2648 8.27881 21.2098C6.95981 21.1828 6.13681 20.3788 5.98981 19.0478C5.67281 16.1858 5.13281 9.46875 5.13281 9.46875" stroke="#DE0C0C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M20.708 6.24023H3.75" stroke="#DE0C0C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M17.4386 6.23998C16.6536 6.23998 15.9776 5.68498 15.8236 4.91598L15.5806 3.69998C15.4306 3.13898 14.9226 2.75098 14.3436 2.75098H10.1106C9.53163 2.75098 9.02363 3.13898 8.87363 3.69998L8.63063 4.91598C8.47663 5.68498 7.80063 6.23998 7.01562 6.23998" stroke="#DE0C0C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p style={{ color: '#DE0C0C' }}>
                                            Delete account
                                        </p>
                                    </div>
                                    <img src={redRightArrow} alt='' />
                                </div>
                            </div>
                        </div>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <h4>Content & Activity</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={() => navigate('/settings/account/activity')}>
                                        <img src={notificationBell} alt='' />
                                        <p>Push notifications</p>
                                    </div>
                                    <img src={whiteRightArrow} alt='' />
                                </div>
                                <div className={styles.accountCards}
                                // onClick={handleOpenChangePassMainModal}
                                >
                                    <div className={styles.settingName}
                                        onClick={handleOpenContentPrefModal}>
                                        <img src={contentIcon} alt='' />
                                        <p>Content preference</p>
                                    </div>
                                    <img src={whiteRightArrow} alt='' />
                                </div>
                            </div>
                        </div>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <h4>Support</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={handleEmailClick}>
                                        <img src={reportProblem} alt='' />
                                        <p>Report a problem</p>
                                    </div>
                                    <img src={whiteRightArrow} alt='' />
                                </div>
                            </div>
                        </div>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <h4>About</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={() => navigate('/about/community-guidelines')}>
                                        <img src={seezittLogoIcon} alt='' />
                                        <p>Community guidelines</p>
                                    </div>
                                    <img src={whiteRightArrow} alt='' />
                                </div>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={() => navigate('/about/terms-conditions')}>
                                        <img src={termsConfitionsIcon} alt='' />
                                        <p>Terms and conditions</p>
                                    </div>
                                    <img src={whiteRightArrow} alt='' />
                                </div>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={() => navigate('/about/privacy-policy')}>
                                        <img src={privacyPolicyIcon} alt='' />
                                        <p>Privacy Policy</p>
                                    </div>
                                    <img src={whiteRightArrow} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                        <div style={{ marginTop: '20px' }}>
                                            {errorMessage ? (
                                                <h4
                                                    style={{
                                                        fontWeight: '700',
                                                        fontSize: '16px',
                                                        color: 'red',
                                                        marginBottom: '20px',
                                                    }}
                                                >
                                                    {errorMessage}
                                                </h4>
                                            ) : null}
                                            {loadingAnimation ? (
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <span className={styles.loader}></span>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '24px', width: '100%' }}>
                                    <InputField placeholder='Enter old password' type='password'
                                        value={user.password}
                                        onChange={(e: { target: { value: string } }) => {
                                            onUserChange('password', e.target.value);
                                        }}
                                    />
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
            {openSetNewPassModal && (
                <>
                    <div>
                        <Modal
                            open={openSetNewPassModal}
                            onClose={handleCloseNewPassModal}
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
                                            paddingBottom: '16px',
                                            textAlign: 'center',
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
                                                // Create new password
                                                color: '#5448B2',
                                                fontSize: '18px',
                                                fontFamily: 'Poppins',
                                                fontWeight: '500',
                                                lineHeight: '150%',
                                                wordWrap: 'break-word',
                                                textAlign: 'center',
                                                paddingBottom: '16px',
                                            }}
                                        >
                                            Create new password
                                        </Typography>
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
                                            <span>Your new password must have:{' '}<br></br></span>
                                            <li>8 to 64 characters{' '}<br></br></li>
                                            <li>Letters, numbers, and special characters</li>
                                        </Typography>
                                        <div style={{ marginTop: '20px' }}>
                                            {errorMessage ? (
                                                <h4
                                                    style={{
                                                        fontWeight: '700',
                                                        fontSize: '16px',
                                                        color: 'red',
                                                        marginBottom: '10px',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {errorMessage}
                                                </h4>
                                            ) : null}
                                            {loadingAnimation ? (
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <span className={styles.loader}></span>
                                                </div>
                                            ) : null}
                                            {response ? renderResponse() : ''}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '24px', width: '100%' }}>
                                    <InputField placeholder='Enter new password' type='password'
                                        value={user.password}
                                        onChange={(e: { target: { value: string } }) => {
                                            onUserChange('password', e.target.value);
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '24px', width: '100%' }}>
                                    <InputField placeholder='Confirm new password' type='password'
                                        value={user.confirmPassword}
                                        onChange={(e: { target: { value: string } }) => {
                                            onUserChange('confirmPassword', e.target.value);
                                        }}
                                    />
                                </div>
                                <Button
                                    onClick={handleSetNewPasswordSubmit}
                                    variant="contained"
                                    sx={mainModalBtnstyle}>
                                    Submit
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                </>
            )}
            {openContentPrefModal && (
                <>
                    <Modal
                        open={openContentPrefModal}
                        onClose={handleCloseContentPrefModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={contentPrefModalStyle}>
                            <div className={styles.contentPrefHeader}>
                                <h4 className={styles.contentPrefModalHeader}>
                                    Content Preference
                                </h4>
                                <p className={styles.blueText}>
                                    Choose the topics that interest you most.</p>
                                <p className={styles.greyText}>
                                    You can choose from 1 to 5 topics</p>
                            </div>
                            <div className={styles.cards}>
                                <FormGroup
                                    sx={{
                                        width: '100%', display: 'flex',
                                        flexDirection: 'row', justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                    {categoriesData.map((category: any) => {
                                        return (
                                            <div className={styles.card}>
                                                <FormControlLabel
                                                    sx={{
                                                        marginRight: 0,
                                                        marginLeft: 0
                                                    }}
                                                    label={undefined}
                                                    labelPlacement="start"
                                                    onChange={() => handleCheckboxChange(category)}
                                                    control={<Checkbox
                                                        checked={isChecked(category)}
                                                        sx={{
                                                            '&.Mui-checked': {
                                                                color: '#5448B2',
                                                            },
                                                        }}
                                                    />}
                                                />
                                                <img src={category.icon} alt=''
                                                    style={{ marginRight: '12px' }} />
                                                <p>{category.name}</p>
                                            </div>
                                        )
                                    })}
                                    <Button
                                        variant="contained"
                                        sx={mainModalBtnstyle}
                                        onClick={handleSubmitPrefContent}
                                        disabled={notAcceptable}>
                                        Done
                                    </Button>
                                </FormGroup>
                            </div>
                        </Box>
                    </Modal>
                </>
            )}
            {openDeleteAccountMainModal && (
                <>
                    <Modal
                        open={openDeleteAccountMainModal}
                        onClose={handleCloseDeleteAccountMainModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={contentPrefModalStyle}>
                            <DeleteReasonPopup
                                onSubmit={() => setOpenDeleteAccountMainModal(false)} // Pass the onClose function
                                // handleOpen={handleOpenConfirmation}
                                handleClose={handleCloseDeleteAccountMainModal} />
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
    maxWidth: 524,
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

var contentPrefModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 526,
    height: 'auto',
    maxHeight: 815,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '24px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0px',
    overflowY: 'auto',
    overflowX: 'hidden',
};

