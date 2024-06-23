import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Modal,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import analytics from '../../assets/analytics.svg';
import atForgotPwd from '../../assets/atForgotPwd.png';
import check from '../../assets/check.png';
import contentIcon from '../../assets/contentIcon.svg';
import notificationBell from '../../assets/notificationBellIcon.svg';
import privacyPolicyIcon from '../../assets/privacyPolicyIcon.svg';
import reportProblem from '../../assets/reportProblemIcon.svg';
import seezittLogoIcon from '../../assets/seezittLogoIcon.svg';
import termsConfitionsIcon from '../../assets/termsConditionsIcon.svg';
import Layout from '../../shared/layout';
import { useAuthStore } from '../../store/authStore';
import InputField from '../reusables/InputField';
import styles from './account.module.scss';
import { DeleteReasonPopup } from './components/delete-reason-popup';
import { ShareProfilePopup } from './components/shareProfilePopup';
import { SwitchToBusinessPopup } from './components/switchToBusinessPopup';
import { SwitchToPersonalPopup } from './components/switchToPersonalPopup';
import upload from './svg-components/Upload.svg';
import addMore from './svg-components/add-more.svg';
import changePassIcon from './svg-components/changePassIcon.svg';
import checkSubmitted from './svg-components/check-submitted.svg';
import myReports from './svg-components/my-reports.svg';
import contactUS from './svg-components/contact-us-icon.svg';
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
    resetPassToken: '',
};

const Account = ({ className, openModal }: AccountProps) => {
    const API_KEY = process.env.VITE_API_URL;
    const forgotPwdEndPoint = '/auth';
    const signInEndPoint = '/auth/sign-in';
    const { login } = useAuthStore();
    const { token, email } = useSelector((store: any) => store?.reducers?.profile);
    const [response, setResponse] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [responseResult, setResponseResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [user, setUser] = useState(defaultUser);

    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    // const token = useAuthStore((state) => state.token);
    // lconst email = useAuthStore((state) => state.email);

    const accountType = useAuthStore((state) => state.accountType);
    // const [accountTypeState, setAccountTypeState] = useState(accountType)

    const [openChangePassMainModal, setOpenChangePassMainModal] = useState(false);
    const [openInstructionsPassModal, setOpenInstructionsPassModal] = useState(false);

    const [openContentPrefModal, setOpenContentPrefModal] = useState(false);

    const [openDeleteAccountMainModal, setOpenDeleteAccountMainModal] = useState(false);

    const [openSetNewPassModal, setOpenNewPassModal] = useState(openModal || false);
    const [passwordSuccessModal, setPasswordSuccessModal] = useState(openModal || false);

    const [profileData, setProfileData] = useState<any>([]);
    const [profileDataCopy, setProfileDataCopy] = useState<any>([]);

    const [categoriesData, setCategoriesData] = useState<any>([]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [openSwitchToPersonal, setOpenSwitchToPersonal] = useState(false);
    const [openSwitchToBusiness, setOpenSwitchToBusiness] = useState(false);

    const [openShareProfileModal, setOpenShareProfileModal] = useState(false);

    const MAX_CHOICES = 5; // Set your maximum choices limit
    const [notAcceptable, setNotAcceptable] = useState(false);
    const [openReportsModal, setOpenReportsModal] = useState(false);
    const [openReportSubmittedModal, setOpenReportSubmittedModal] = useState(false);
    const [reportMessage, setReportMessage] = useState('');
    const navigate = useNavigate();

    // console.log("auth on account page")
    // console.log({ selectedIndex, setIndex, "loggedd in":isLoggedIn, setSettingsDropdown })
    // if (!isLoggedIn) {
    //     return <Navigate to="/auth" />;
    // }

    useEffect(() => {
        if (!token) {
            navigate('/auth');
        }
    }, [token]);

    const handleOpenChangePassMainModal = () => {
        setOpenChangePassMainModal(true);
    };
    const handleCloseChangePassMainModal = () => {
        setOpenChangePassMainModal(false);
        setLoadingAnimation(false);
        setErrorMessage('');
    };

    const handleCloseSuccessModal = () => {
        setPasswordSuccessModal(false);

        setErrorMessage('');
    };

    const handleOpenInstructionsPassModal = (e: React.FormEvent) => {
        setLoadingAnimation(true);
        handleSignInSubmit(e);
        onUserChange('password', '');
        setErrorMessage('');
    };
    const handleCloseInstructionsPassModal = () => {
        setOpenInstructionsPassModal(false);
    };

    const handleCloseNewPassModal = () => {
        setOpenNewPassModal(false);
        onUserChange('password', '');
        setErrorMessage('');
    };

    const handleOpenContentPrefModal = () => {
        setOpenContentPrefModal(true);
        // setProfileDataCopy(profileData)
    };

    const handleAnalyticsPage = () => {
        navigate('/analytics');
    };
    const handleCloseContentPrefModal = () => {
        setOpenContentPrefModal(false);
        setSelectedCategories([]);
        handleProfileFetch();
    };

    const handleOpenDeleteAccountMainModal = () => {
        setOpenDeleteAccountMainModal(true);
    };
    const handleCloseDeleteAccountMainModal = () => {
        setOpenDeleteAccountMainModal(false);
    };

    const handleCloseSwitchToPersonalModal = () => {
        setOpenSwitchToPersonal(false);
        handleProfileFetch();
    };

    const handleCloseSwitchToBusinessModal = () => {
        setOpenSwitchToBusiness(false);
        handleProfileFetch();
    };

    const handleOpenShareProfileModal = () => {
        setOpenShareProfileModal(true);
    };

    const handleCloseShareProfileModal = () => {
        setOpenShareProfileModal(false);
    };

    const handleSignInSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const { password } = user;
        console.log('user');
        console.log(user);
        handleSignIn(password, email);
    };

    const [images, setImages] = useState<any>([]); // useState(null);

    const handleImageChange = (event: { target: { files: any[] } }) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImages((prevImages: any) => [...prevImages, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleClickMore = () => {
    //     document.getElementById('fileInput').click();
    // };

    const submitReportHandler = () => {
        setOpenReportsModal(false);
        setOpenReportSubmittedModal(true);
        images.forEach((element: any) => {
            console.log('Images : ', element);
        });
        console.log('Report Message : ', reportMessage);
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
                const { email, accountType, token, _id, balance, username, name } =
                    responseData.data; // Extract token value from data object
                // const name = responseData.data; // Assuming the 'name' field is present in the response data
                useAuthStore.setState({
                    isLoggedIn: true,
                    accountType: accountType,
                    name: name !== '' ? name : '',
                    token: token,
                    _id: _id,
                    balance: balance,
                });
                login(email, accountType, token, _id, balance, username, name); // Call the login function from the Zustand store
                console.log(responseData);
                // handleForgotPasswordSubmit()
                setLoadingAnimation(false);
                handleCloseChangePassMainModal();
                // setOpenInstructionsPassModal(true)
                setOpenNewPassModal(true);
                setOldPassword(password);
            } else {
                // Handle the error response from the server
                setLoadingAnimation(false);
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
        setSettingsDropdown(true);
        handleFetchCategoriesNames();
        handleProfileFetch();
    }, []);

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
            const { accountType } = data.data; // Extract token from data object

            useAuthStore.setState({
                accountType: accountType,
            });
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
                setSelectedCategories([...selectedCategories, category._id]);
            }
        }
    };

    useEffect(() => {
        if (selectedCategories.length > 5 || selectedCategories.length < 1) {
            setNotAcceptable(true);
            console.log(selectedCategories);
        } else {
            setNotAcceptable(false);
            console.log(selectedCategories);
        }
    }, [selectedCategories]);

    const handleSubmitPrefContent = async () => {
        try {
            const categoryIds = selectedCategories.map((category) => category).join(',');
            const payload = categoryIds;

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
                handleCloseContentPrefModal();
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    const isChecked = (category: any) => {
        if (profileDataCopy.includes(category.name)) {
            // Set selected categories only if not already set
            setSelectedCategories([...selectedCategories, category._id]);
            setProfileDataCopy(profileDataCopy.filter((e: any) => e !== category.name));
        }
        // Check if the category is initially checked or currently checked
        return selectedCategories.includes(category._id);
    };

    const handleEmailClick = () => {
        // const infoEmail = 'info@ogoul.com';
        // window.location.href = `mailto:${infoEmail}`;
        // setOpenFaqsModal(false)
        setOpenReportsModal(true);
        setIndex(6);
    };

    const myReportsHandler = () => {
        setIndex(6);
        navigate('/myreports');
    };

    const contactUsHandler = () => {
        setIndex(6);
        navigate('/contactus');
    };

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

    const handleSetNewPassword = async (
        password: string,
        email: string | null,
        token: string | null
    ) => {
        console.log('old pass:', oldPassword);
        try {
            const response = await fetch(`${API_KEY}/auth/password/`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ oldPassword: oldPassword, newPassword: password }),
            });
            if (response.ok) {
                const responseData = await response.json();
                // const { token } = responseData.data; // Extract token value from data object
                console.log(responseData);
                setResponseResult(responseData.message);
                setResponse(true);
                setLoadingAnimation(false);
                handleCloseNewPassModal();
                setPasswordSuccessModal(true);
                setTimeout(() => {}, 2000);
            } else {
                setLoadingAnimation(false);
                setErrorMessage('invalid password');
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid password');
        }
    };

    const handleSetNewPasswordSubmit = () => {
        setErrorMessage('');
        setLoadingAnimation(true);
        const { password, resetPassEmail, resetPassToken } = user;
        handleSetNewPassword(password, resetPassEmail, token);
    };

    const renderResponse = () => {
        return (
            <div
                style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    color: 'green',
                    marginBottom: '20px',
                    textAlign: 'center',
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
    }, [openSetNewPassModal]);

    const handleCloseSwitchToPersonal = () => {
        setOpenSwitchToPersonal(false);
    };

    const handleCloseSwitchToBusiness = () => {
        setOpenSwitchToBusiness(false);
    };

    useEffect(() => {
        handleProfileFetch();
    }, [accountType]);

    const handleClickInside = (event: { stopPropagation: () => void }) => {
        event.stopPropagation(); // Prevents the click event from bubbling up to the outer div
    };

    return (
        <>
            {/* <div className={styles.root}> */}
            <Layout>
                {/* <div className={styles.topBarDiv}>
                    <TopBar />
                </div> */}
                <div className={styles.container}>
                    {/* <div className={styles.leftSide}>
                        <div className={styles.sideNavDiv}>
                            <SideNavBar selectedIndex={selectedIndex} settingsDropdownState={true} />
                        </div>
                        <div className={styles.suggestedActivityDiv}>
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
                    </div> */}
                    <div className={styles.middleSectionDiv}>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <h4>Account</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div
                                    className={styles.accountCards}
                                    onClick={handleOpenShareProfileModal}
                                >
                                    <div className={styles.settingName}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V9C3 9.53043 3.21071 10.0391 3.58579 10.4142C3.96086 10.7893 4.46957 11 5 11H9C9.53043 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53043 11 9V5C11 4.46957 10.7893 3.96086 10.4142 3.58579C10.0391 3.21071 9.53043 3 9 3H5ZM5 5H9V9H5V5ZM19 19C18.7348 19 18.4804 19.1054 18.2929 19.2929C18.1054 19.4804 18 19.7348 18 20C18 20.2652 18.1054 20.5196 18.2929 20.7071C18.4804 20.8946 18.7348 21 19 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20C21 19.7348 20.8946 19.4804 20.7071 19.2929C20.5196 19.1054 20.2652 19 20 19H19ZM13 17V20C13 20.2652 13.1054 20.5196 13.2929 20.7071C13.4804 20.8946 13.7348 21 14 21H16C16.2652 21 16.5196 20.8946 16.7071 20.7071C16.8946 20.5196 17 20.2652 17 20C17 19.7348 16.8946 19.4804 16.7071 19.2929C16.5196 19.1054 16.2652 19 16 19H15V17C15 16.7348 14.8946 16.4804 14.7071 16.2929C14.5196 16.1054 14.2652 16 14 16C13.7348 16 13.4804 16.1054 13.2929 16.2929C13.1054 16.4804 13 16.7348 13 17ZM17 16C16.7348 16 16.4804 16.1054 16.2929 16.2929C16.1054 16.4804 16 16.7348 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18H20C20.2652 18 20.5196 17.8946 20.7071 17.7071C20.8946 17.5196 21 17.2652 21 17V14C21 13.7348 20.8946 13.4804 20.7071 13.2929C20.5196 13.1054 20.2652 13 20 13H19C18.7348 13 18.4804 13.1054 18.2929 13.2929C18.1054 13.4804 18 13.7348 18 14C18 14.2652 18.1054 14.5196 18.2929 14.7071C18.4804 14.8946 18.7348 15 19 15V16H17ZM14 13C13.7348 13 13.4804 13.1054 13.2929 13.2929C13.1054 13.4804 13 13.7348 13 14C13 14.2652 13.1054 14.5196 13.2929 14.7071C13.4804 14.8946 13.7348 15 14 15H16C16.2652 15 16.5196 14.8946 16.7071 14.7071C16.8946 14.5196 17 14.2652 17 14C17 13.7348 16.8946 13.4804 16.7071 13.2929C16.5196 13.1054 16.2652 13 16 13H14ZM3 15C3 14.4696 3.21071 13.9609 3.58579 13.5858C3.96086 13.2107 4.46957 13 5 13H9C9.53043 13 10.0391 13.2107 10.4142 13.5858C10.7893 13.9609 11 14.4696 11 15V19C11 19.5304 10.7893 20.0391 10.4142 20.4142C10.0391 20.7893 9.53043 21 9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15ZM9 15H5V19H9V15ZM15 3C14.4696 3 13.9609 3.21071 13.5858 3.58579C13.2107 3.96086 13 4.46957 13 5V9C13 9.53043 13.2107 10.0391 13.5858 10.4142C13.9609 10.7893 14.4696 11 15 11H19C19.5304 11 20.0391 10.7893 20.4142 10.4142C20.7893 10.0391 21 9.53043 21 9V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H15ZM15 5H19V9H15V5Z"
                                                fill="#222222"
                                                stroke="white"
                                                stroke-width="0.5"
                                            />
                                        </svg>
                                        <p>QR Code</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div
                                    className={styles.accountCards}
                                    onClick={handleOpenChangePassMainModal}
                                >
                                    <div className={styles.settingName}>
                                        <img src={changePassIcon} alt="" />
                                        <p>Change Password</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div
                                    className={styles.accountCards}
                                    onClick={() => navigate('/settings/account/privacy-settings')}
                                >
                                    <div className={styles.settingName}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M11.9846 21.606C11.9846 21.606 19.6566 19.283 19.6566 12.879C19.6566 6.474 19.9346 5.974 19.3196 5.358C18.7036 4.742 12.9906 2.75 11.9846 2.75C10.9786 2.75 5.26557 4.742 4.65057 5.358C4.03457 5.974 4.31257 6.474 4.31257 12.879C4.31257 19.283 11.9846 21.606 11.9846 21.606Z"
                                                stroke="#222222"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M9.38281 11.8741L11.2748 13.7691L15.1728 9.86914"
                                                stroke="#222222"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <p>Privacy and Security</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div
                                    className={styles.accountCards}
                                    onClick={() => navigate('/settings/account/balance')}
                                >
                                    <div className={styles.settingName}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M21.6389 14.3962H17.5906C16.1042 14.3953 14.8993 13.1914 14.8984 11.7049C14.8984 10.2185 16.1042 9.01458 17.5906 9.01367H21.6389"
                                                stroke="#222222"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M18.049 11.6432H17.7373"
                                                stroke="#222222"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z"
                                                stroke="#130F26"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M7.03125 7.53772H12.4302"
                                                stroke="#130F26"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <p>Balance</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div
                                    className={styles.accountCards}
                                    onClick={() =>
                                        accountType === 'Business'
                                            ? setOpenSwitchToPersonal(true)
                                            : setOpenSwitchToBusiness(true)
                                    }
                                >
                                    <div className={styles.settingName}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.99219 14.502C6.86086 14.5019 6.73081 14.5278 6.60947 14.578C6.48813 14.6283 6.37788 14.7019 6.28501 14.7948C6.19214 14.8876 6.11849 14.9979 6.06824 15.1192C6.018 15.2406 5.99216 15.3706 5.99219 15.502V17.2843C4.70324 15.8266 3.9919 13.9478 3.99219 12.002C3.99201 11.7079 4.00962 11.414 4.04492 11.1221C4.06111 10.9915 4.05138 10.8591 4.01628 10.7323C3.98118 10.6055 3.9214 10.4869 3.84038 10.3832C3.75935 10.2796 3.65867 10.1929 3.5441 10.1282C3.42953 10.0636 3.30333 10.0222 3.17272 10.0064C3.04211 9.99055 2.90967 10.0007 2.78298 10.0362C2.65629 10.0716 2.53785 10.1318 2.43445 10.2131C2.33104 10.2944 2.24469 10.3954 2.18037 10.5101C2.11604 10.6249 2.07499 10.7512 2.05957 10.8819C2.01428 11.2535 1.99177 11.6276 1.99219 12.002C1.99355 14.3881 2.85115 16.6946 4.40906 18.502H2.99219C2.72698 18.502 2.47262 18.6073 2.28509 18.7949C2.09755 18.9824 1.99219 19.2367 1.99219 19.502C1.99219 19.7672 2.09755 20.0215 2.28509 20.2091C2.47262 20.3966 2.72698 20.502 2.99219 20.502H6.99219C7.14859 20.5 7.30226 20.4607 7.44039 20.3873C7.57852 20.314 7.69713 20.2086 7.78632 20.0802C7.79798 20.0648 7.81287 20.0534 7.82373 20.0372C7.83039 20.0272 7.83057 20.0154 7.83679 20.0053C7.88445 19.9248 7.92016 19.8378 7.94279 19.747C7.9576 19.696 7.96811 19.6439 7.97422 19.5911C7.97709 19.5602 7.99222 19.5336 7.99222 19.502V15.502C7.99226 15.3707 7.96642 15.2406 7.91618 15.1193C7.86593 14.9979 7.79227 14.8877 7.69941 14.7948C7.60654 14.7019 7.49628 14.6283 7.37493 14.578C7.25359 14.5278 7.12353 14.5019 6.99219 14.502ZM8.49219 6.00197H6.70972C8.16752 4.71307 10.0463 4.00174 11.9922 4.00197C12.2861 4.00126 12.5798 4.01887 12.8716 4.05471C13.002 4.07054 13.1343 4.06054 13.2608 4.02526C13.3874 3.98998 13.5058 3.93012 13.6092 3.8491C13.7126 3.76807 13.7991 3.66747 13.8636 3.55303C13.9281 3.4386 13.9695 3.31257 13.9854 3.18215C14.0012 3.05172 13.9912 2.91946 13.9559 2.7929C13.9206 2.66634 13.8608 2.54797 13.7797 2.44455C13.6987 2.34112 13.5981 2.25467 13.4837 2.19013C13.3692 2.12559 13.2432 2.08421 13.1128 2.06838C12.741 2.02352 12.3667 2.00134 11.9922 2.00197C9.60605 2.00326 7.29961 2.8608 5.49219 4.41866V3.00197C5.49219 2.73675 5.38684 2.4824 5.1993 2.29486C5.01176 2.10732 4.75741 2.00197 4.49219 2.00197C4.22698 2.00197 3.97262 2.10732 3.78509 2.29486C3.59755 2.4824 3.49219 2.73675 3.49219 3.00197V7.00197C3.49848 7.06806 3.51166 7.13332 3.5315 7.19668L3.53174 7.1979C3.55603 7.32095 3.60397 7.43812 3.67291 7.5429L3.68433 7.5598C3.75041 7.6559 3.83323 7.73934 3.92883 7.80614C3.93976 7.81414 3.94519 7.8264 3.95654 7.83403C3.97083 7.84349 3.987 7.84649 4.00159 7.85515C4.05831 7.88926 4.1184 7.91741 4.18091 7.93915C4.2654 7.96854 4.35348 7.98632 4.44275 7.992C4.46008 7.99292 4.47467 8.002 4.49219 8.002H8.49219C8.75741 8.002 9.01176 7.89664 9.1993 7.7091C9.38684 7.52157 9.49219 7.26721 9.49219 7.002C9.49219 6.73678 9.38684 6.48243 9.1993 6.29489C9.01176 6.10735 8.75741 6.002 8.49219 6.002V6.00197ZM20.4526 16.8061C20.4284 16.683 20.3804 16.5657 20.3114 16.461L20.3001 16.4442C20.234 16.348 20.1511 16.2645 20.0554 16.1977C20.0445 16.1898 20.0391 16.1775 20.0278 16.1699C20.017 16.1627 20.0042 16.1625 19.9932 16.1558C19.8664 16.0853 19.7274 16.0393 19.5835 16.0204C19.5519 16.0174 19.5246 16.0019 19.4922 16.0019H15.4922C15.227 16.0019 14.9726 16.1073 14.7851 16.2948C14.5976 16.4823 14.4922 16.7367 14.4922 17.0019C14.4922 17.2671 14.5976 17.5215 14.7851 17.709C14.9726 17.8966 15.227 18.0019 15.4922 18.0019H17.2746C15.8168 19.2908 13.9381 20.0022 11.9922 20.0019C11.6982 20.0023 11.4045 19.9844 11.1128 19.9482C10.8494 19.9162 10.5841 19.9902 10.3752 20.1538C10.1663 20.3175 10.031 20.5574 9.99902 20.8208C9.96704 21.0842 10.041 21.3495 10.2046 21.5584C10.3683 21.7672 10.6082 21.9025 10.8716 21.9345C11.2434 21.9794 11.6176 22.0019 11.9922 22.0019C14.3783 22.0006 16.6848 21.1431 18.4922 19.5852V21.002C18.4922 21.2672 18.5976 21.5215 18.7851 21.7091C18.9726 21.8966 19.227 22.002 19.4922 22.002C19.7574 22.002 20.0118 21.8966 20.1993 21.7091C20.3868 21.5215 20.4922 21.2672 20.4922 21.002V17.002C20.4859 16.9359 20.4727 16.8706 20.4529 16.8073L20.4526 16.8061ZM20.9922 5.50197C21.2574 5.50197 21.5118 5.39661 21.6993 5.20907C21.8868 5.02154 21.9922 4.76718 21.9922 4.50197C21.9922 4.23675 21.8868 3.9824 21.6993 3.79486C21.5118 3.60732 21.2574 3.50197 20.9922 3.50197H16.9922C16.9271 3.50824 16.8628 3.52121 16.8004 3.54067L16.7937 3.54201C16.6723 3.5663 16.5566 3.61367 16.453 3.68154L16.4334 3.69478C16.3378 3.76075 16.2547 3.84331 16.1881 3.93856C16.1802 3.94936 16.1681 3.95467 16.1607 3.96584C16.1535 3.97658 16.1533 3.98928 16.1466 4.0002C16.0752 4.12779 16.0289 4.26786 16.0102 4.41286C16.0073 4.44375 15.9922 4.47036 15.9922 4.50197V8.50197C15.9922 8.76718 16.0976 9.02154 16.2851 9.20907C16.4726 9.39661 16.727 9.50197 16.9922 9.50197C17.2574 9.50197 17.5118 9.39661 17.6993 9.20907C17.8868 9.02154 17.9922 8.76718 17.9922 8.50197V6.71909C19.281 8.17706 19.9924 10.0559 19.9922 12.0019C19.9924 12.296 19.9748 12.5898 19.9395 12.8818C19.9078 13.145 19.9818 13.4101 20.1453 13.6188C20.3088 13.8275 20.5484 13.9628 20.8115 13.9951C20.8521 13.9998 20.8928 14.0021 20.9336 14.0019C21.1778 14.0016 21.4134 13.9119 21.596 13.7498C21.7786 13.5878 21.8955 13.3644 21.9248 13.122C21.9701 12.7504 21.9926 12.3763 21.9922 12.002C21.9908 9.61578 21.1332 7.30933 19.5752 5.50197H20.9922Z"
                                                fill="#222222"
                                                stroke="white"
                                                stroke-width="0.5"
                                            />
                                        </svg>
                                        <p>
                                            Switch to{' '}
                                            {accountType === 'Personal' ? 'Business' : 'Personal'}{' '}
                                            account
                                        </p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div
                                    className={styles.accountCards}
                                    onClick={handleOpenDeleteAccountMainModal}
                                >
                                    <div className={styles.settingName}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M19.3238 9.46875C19.3238 9.46875 18.7808 16.2037 18.4658 19.0407C18.3158 20.3957 17.4788 21.1898 16.1078 21.2148C13.4988 21.2618 10.8868 21.2648 8.27881 21.2098C6.95981 21.1828 6.13681 20.3788 5.98981 19.0478C5.67281 16.1858 5.13281 9.46875 5.13281 9.46875"
                                                stroke="#DE0C0C"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M20.708 6.24023H3.75"
                                                stroke="#DE0C0C"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M17.4386 6.23998C16.6536 6.23998 15.9776 5.68498 15.8236 4.91598L15.5806 3.69998C15.4306 3.13898 14.9226 2.75098 14.3436 2.75098H10.1106C9.53163 2.75098 9.02363 3.13898 8.87363 3.69998L8.63063 4.91598C8.47663 5.68498 7.80063 6.23998 7.01562 6.23998"
                                                stroke="#DE0C0C"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <p style={{ color: '#DE0C0C' }}>Delete account</p>
                                    </div>
                                    <img src={redRightArrow} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <h4>Content & Activity</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}>
                                    <div
                                        className={styles.settingName}
                                        onClick={() => navigate('/settings/account/activity')}
                                    >
                                        <img src={notificationBell} alt="" />
                                        <p>Push notifications</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div
                                    className={styles.accountCards}
                                    // onClick={handleOpenChangePassMainModal}
                                >
                                    <div
                                        className={styles.settingName}
                                        onClick={handleOpenContentPrefModal}
                                    >
                                        <img src={contentIcon} alt="" />
                                        <p>Content preference</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div
                                    className={styles.accountCards}
                                    // onClick={handleOpenChangePassMainModal}
                                >
                                    <div
                                        className={styles.settingName}
                                        onClick={handleAnalyticsPage}
                                    >
                                        <img
                                            className="h-5 w-5 object-contain"
                                            src={analytics}
                                            alt=""
                                        />
                                        <p>Analytics</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
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
                                        <img src={reportProblem} alt="" />
                                        <p>Report a problem</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={myReportsHandler}>
                                        <img src={myReports} alt="" />
                                        <p>My Reports</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={contactUsHandler}>
                                        <img src={contactUS} alt="" />
                                        <p>Contact Us</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <h4>About</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}>
                                    <div
                                        className={styles.settingName}
                                        onClick={() => navigate('/about/community-guidelines')}
                                    >
                                        <img src={seezittLogoIcon} alt="" />
                                        <p>Community guidelines</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div className={styles.accountCards}>
                                    <div
                                        className={styles.settingName}
                                        onClick={() => navigate('/about/terms-conditions')}
                                    >
                                        <img src={termsConfitionsIcon} alt="" />
                                        <p>Terms and conditions</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div className={styles.accountCards}>
                                    <div
                                        className={styles.settingName}
                                        onClick={() => navigate('/about/privacy-policy')}
                                    >
                                        <img src={privacyPolicyIcon} alt="" />
                                        <p>Privacy Policy</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

            {passwordSuccessModal && (
                <>
                    <div>
                        <Modal
                            open={passwordSuccessModal}
                            onClose={handleCloseSuccessModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={mainModalstyle} style={{ width: '433px' }}>
                                <div style={{ marginBottom: '24px' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '25px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginTop: '20px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <img src={check} alt="" />
                                        </div>
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
                                                textAlign: 'center',
                                            }}
                                        >
                                            Password changed Successfully{' '}
                                        </Typography>
                                    </div>
                                </div>

                                <Button
                                    className={styles.doneBtn}
                                    onClick={handleCloseSuccessModal}
                                    variant="contained"
                                    sx={mainModalBtnstyle}
                                    style={{
                                        minHeight: '48px !important',
                                        background: '#5448B2',
                                    }}
                                >
                                    Done
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                </>
            )}

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
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <span className={styles.loader}></span>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '24px', width: '100%' }}>
                                    <InputField
                                        placeholder="Enter old password"
                                        type="password"
                                        value={user.password}
                                        onChange={(e: { target: { value: string } }) => {
                                            onUserChange('password', e.target.value);
                                        }}
                                    />
                                </div>
                                <Button
                                    className={styles.continueBtn}
                                    onClick={handleOpenInstructionsPassModal}
                                    variant="contained"
                                    sx={mainModalBtnstyle}
                                    style={{
                                        minHeight: '48px !important',
                                    }}
                                >
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
                            <h3 className={styles.instructionsModalTitleText}>Check your Email</h3>
                            <p className={styles.instructionsModalText}>
                                We have sent you instructions to change your password on the email
                                provided.
                            </p>
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
                                    <span className={styles.infoText}>or </span>
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
                                            <span>
                                                Your new password must have: <br></br>
                                            </span>
                                            <li>
                                                8 to 64 characters <br></br>
                                            </li>
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
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {errorMessage}
                                                </h4>
                                            ) : null}
                                            {loadingAnimation ? (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <span className={styles.loader}></span>
                                                </div>
                                            ) : null}
                                            {response ? renderResponse() : ''}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '24px', width: '100%' }}>
                                    <InputField
                                        placeholder="Enter new password"
                                        type="password"
                                        value={user.password}
                                        onChange={(e: { target: { value: string } }) => {
                                            onUserChange('password', e.target.value);
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '24px', width: '100%' }}>
                                    <InputField
                                        placeholder="Confirm new password"
                                        type="password"
                                        value={user.confirmPassword}
                                        onChange={(e: { target: { value: string } }) => {
                                            onUserChange('confirmPassword', e.target.value);
                                        }}
                                    />
                                </div>
                                <Button
                                    className={styles.submitBtn}
                                    onClick={handleSetNewPasswordSubmit}
                                    variant="contained"
                                    sx={mainModalBtnstyle}
                                >
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
                                    Choose the topics that interest you most.
                                </p>
                                <p className={styles.greyText}>You can choose from 1 to 5 topics</p>
                            </div>
                            <div className={styles.cards}>
                                <FormGroup
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    {categoriesData.map((category: any) => {
                                        return (
                                            <div className={styles.card}>
                                                <FormControlLabel
                                                    sx={{
                                                        marginRight: 0,
                                                        marginLeft: 0,
                                                    }}
                                                    label={undefined}
                                                    labelPlacement="start"
                                                    onChange={() => handleCheckboxChange(category)}
                                                    control={
                                                        <Checkbox
                                                            checked={isChecked(category)}
                                                            sx={{
                                                                '&.Mui-checked': {
                                                                    color: '#5448B2',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                />
                                                <img
                                                    src={category.icon}
                                                    alt=""
                                                    style={{ marginRight: '12px' }}
                                                />
                                                <p>{category.name}</p>
                                            </div>
                                        );
                                    })}
                                    <Button
                                        variant="contained"
                                        sx={mainModalBtnstyle}
                                        onClick={handleSubmitPrefContent}
                                        disabled={notAcceptable}
                                    >
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
                                handleClose={handleCloseDeleteAccountMainModal}
                            />
                        </Box>
                    </Modal>
                </>
            )}

            {openSwitchToPersonal && (
                <>
                    <Modal
                        open={openSwitchToPersonal}
                        onClose={handleCloseSwitchToPersonal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={contentPrefModalStyle}>
                            <SwitchToPersonalPopup
                                // onSubmit={() => setOpenDeleteAccountMainModal(false)} // Pass the onClose function
                                // handleOpen={handleOpenConfirmation}
                                handleClose={handleCloseSwitchToPersonalModal}
                            />
                        </Box>
                    </Modal>
                </>
            )}

            {openSwitchToBusiness && (
                <>
                    <Modal
                        open={openSwitchToBusiness}
                        onClose={handleCloseSwitchToBusiness}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={contentPrefModalStyle}>
                            <SwitchToBusinessPopup
                                // onSubmit={() => setOpenDeleteAccountMainModal(false)} // Pass the onClose function
                                // handleOpen={handleOpenConfirmation}
                                handleClose={handleCloseSwitchToBusinessModal}
                            />
                        </Box>
                    </Modal>
                </>
            )}

            {openShareProfileModal && (
                <>
                    <Modal
                        open={openShareProfileModal}
                        onClose={handleCloseShareProfileModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={contentPrefModalStyle}>
                            <ShareProfilePopup handleClose={handleCloseSwitchToBusinessModal} />
                        </Box>
                    </Modal>
                </>
            )}

            {openReportsModal && (
                <Modal
                    open={openReportsModal}
                    onClose={() => setOpenReportsModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {/* <Box sx={contentPrefModalStyle}> */}
                    {/* <ReportProblemPopup handleClose={handleCloseSwitchToBusinessModal} /> */}
                    <div
                        onClick={() => setOpenReportsModal(false)}
                        className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50"
                    >
                        <div
                            onClick={handleClickInside}
                            className="bg-white rounded-lg p-6 w-[32.875rem] h-[33.875rem] flex flex-col"
                        >
                            <h2 className="font-medium text-xl text-[#222222] mb-2 text-center">
                                Report a problem
                            </h2>
                            <h3 className="font-normal text-base text-[#5448B2] mb-4 text-center">
                                Tell us your problem
                            </h3>
                            <textarea
                                className="w-[478px] h-[214px] border border-gray-300 rounded-lg p-3 placeholder-gray-400 text-gray-800 mb-4 resize-none"
                                placeholder="Please provide as much detail as possible"
                                value={reportMessage}
                                onChange={(e) => setReportMessage(e.target.value)}
                            />
                            <h2 className="font-medium text-lg text-[#222222] mb-4">
                                Upload supporting media
                            </h2>
                            {/* <div className="flex flex-row items-center rounded-md gap-2 border-[1.5px] px-3.5 py-2 mb-4">
                                <img src={upload} height={18.5} width={19.04} alt="" />
                                <p>upload photo (0/4)</p>
                            </div> */}
                            {images?.length > 0 ? (
                                <div className="p-2 border border-[#D1D1D1] rounded-md mb-6 flex flex-row items-center gap-2">
                                    {/* <img
                                        src={image}
                                        alt="Uploaded"
                                        className="rounded-sm h-[6.375rem] w-[6.25rem]"
                                    /> */}
                                    {images.map(
                                        (
                                            image: string | undefined,
                                            index: React.Key | null | undefined
                                        ) => (
                                            <div
                                                key={index}
                                                className="p-2 border border-[#D1D1D1] rounded-md flex flex-col items-center"
                                            >
                                                <img
                                                    src={image}
                                                    alt="Uploaded"
                                                    className="rounded-sm h-[6.375rem] w-[6.25rem]"
                                                />
                                            </div>
                                        )
                                    )}
                                    {images.length < 4 && (
                                        <div
                                            // onClick={handleClickMore}
                                            className="h-[6.375rem] w-[6.25rem] items-center flex justify-center bg-[#DFDFDF] rounded cursor-pointer"
                                        >
                                            <img
                                                className="object-contain"
                                                src={addMore}
                                                alt="addmore"
                                                height={28.67}
                                                width={28.67}
                                            />
                                            <input
                                                id="fileInput"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                // onChange={handleImageChange}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <label className="flex flex-row items-center rounded-md gap-2 border-[1.5px] px-3.5 py-2 mb-4 cursor-pointer">
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        // onChange={handleImageChange}
                                    />
                                    <img src={upload} height={18.5} width={19.04} alt="" />
                                    <p>Upload photo (0/4)</p>
                                </label>
                            )}
                            <button
                                onClick={submitReportHandler}
                                className="bg-[#EEEDF7] text-white font-semibold px-4 rounded-md w-full"
                            >
                                <p className="text-[#5448B2]">Submit</p>
                            </button>
                        </div>
                    </div>
                    {/* </Box> */}
                </Modal>
            )}

            {openReportSubmittedModal && (
                <Modal
                    open={openReportSubmittedModal}
                    onClose={() => setOpenReportSubmittedModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {/* <Box sx={contentPrefModalStyle}> */}
                    {/* <ReportProblemPopup handleClose={handleCloseSwitchToBusinessModal} /> */}
                    <div
                        onClick={() => setOpenReportSubmittedModal(false)}
                        className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50"
                    >
                        <div
                            onClick={handleClickInside}
                            className="bg-white rounded-lg p-6 w-[27.063rem] h-[26.188rem] flex flex-col items-center"
                        >
                            <h2 className="font-bold text-lg text-[#222222] mb-8">
                                Report submitted
                            </h2>
                            <img
                                src={checkSubmitted}
                                alt="Check Submitted"
                                className="rounded-sm h-[6.375rem] w-[6.25rem] mb-6"
                            />
                            <h2 className="font-bold text-xl text-[#222222] mb-1">Thank you</h2>
                            <p className="font-normal text-lg text-[#222222] mt-3 text-center px-2.5">
                                Your report helps us provide a safe and supportive environment.
                            </p>
                            <button
                                onClick={() => setOpenReportSubmittedModal(false)}
                                className="bg-[#5448B2] text-white font-semibold px-4 rounded-md w-full mt-3.5 py-3"
                            >
                                <p className="text-[##FFFFFF] font-semibold text-base">Done</p>
                            </button>
                        </div>
                    </div>
                    {/* </Box> */}
                </Modal>
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
    minHeight: '48px',
    padding: '0 16px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    background: 'var(--foundation-primary-primary-500, #5448B2) !important',
    textTransform: 'none',
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
};

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
