import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    createTheme,
    FormControlLabel,
    FormGroup,
    Modal,
    ThemeProvider,
    Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import analyticsBlack from '../../assets/analytics.svg';
import atForgotPwd from '../../assets/atForgotPwd.png';
import check from '../../assets/check.png';
import contentIconBlack from '../../assets/contentIcon.svg';
import notificationBellBlack from '../../assets/notificationBellIcon.svg';
import privacyPolicyIconBlack from '../../assets/privacyPolicyIcon.svg';
import reportProblemBlack from '../../assets/reportProblemIcon.svg';
import seezittLogoIcon from '../../assets/seezittLogoIcon.svg';
import termsConfitionsIconBlack from '../../assets/termsConditionsIcon.svg';
import SettingLayout from '../../shared/settingLayout';
import { useAuthStore } from '../../store/authStore';
import InputField from '../reusables/InputField';
import styles from './account.module.scss';
import sibarStyles from './../side-nav-bar/side-nav-bar.module.scss';
import { DeleteReasonPopup } from './components/delete-reason-popup';
import { ShareProfilePopup } from './components/shareProfilePopup';
import { SwitchToBusinessPopup } from './components/switchToBusinessPopup';
import { SwitchToPersonalPopup } from './components/switchToPersonalPopup';
import upload from './svg-components/Upload.svg';
import addMore from './svg-components/add-more.svg';
import changePassIconblack from './svg-components/changePassIcon.svg';
import checkSubmitted from './svg-components/check-submitted.svg';
import myReportsBlack from './svg-components/my-reports.svg';
import contactUSBlack from './svg-components/contact-us-icon.svg';
import redRightArrow from './svg-components/redRightArrow.svg';
import whiteRightArrow from './svg-components/whiteRightArrow.svg';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ManageAccount from './components/manageAccount'
import Ads from './components/ads';
import { useLocation } from "react-router-dom";
import TimeChart from './time-chart';


import {
    changePassIconWhite,
    contactUsIconWhite,
    contentIconWhite,
    myReportWhite,
    notificationBellIconWhite,
    privacyPolicyIconWhite,
    reportProblemIconWhite,
    termsConditionsIconWhite,
    analyticsWhite,
} from '../../icons';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import Navbar from '../../shared/navbar';
import MuteAdvertisers from './components/mute-advertisers';
import DisconnectAdvertisers from './components/disconnect-advertisers';
import DailyScreenTime from './components/daily-screen-time';
import ScreenTimeBreaks from './components/screen-time-breaks';
import SleepReminder from './components/sleep-reminders';
import KeywordFilters from './components/keyword-page';

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
    const { token, email, registerType } = useSelector((store: any) => store?.reducers?.profile);
    console.log('current user data...')
    console.log(useSelector((store: any) => store?.reducers?.profile));
    const [response, setResponse] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [responseResult, setResponseResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [user, setUser] = useState(defaultUser);
    const [addKeywordPage, setAddKeywordPage] = useState(false);

    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    // const token = localStorage.getItem('token');
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
    const [showReportError, setShowReportError] = useState(false);

    const [lightdarkTheme, setlightdarkTheme] = useState('');
    const [themeColor, setThemeColor] = useState('');
    const [changePassIcon, setChangePassIcon] = useState(changePassIconblack);
    const [contactUS, setContactUS] = useState(contactUSBlack);
    const [privacyPolicyIcon, setPrivacyPolicyIcon] = useState(privacyPolicyIconBlack);
    const [termsConfitionsIcon, setTermsConfitionsIcon] = useState(termsConfitionsIconBlack);
    const [reportProblem, setReportProblem] = useState(reportProblemBlack);
    const [myReports, setMyReports] = useState(myReportsBlack);
    const [contentIcon, setContentIcon] = useState(contentIconBlack);
    const [notificationBell, setNotificationBell] = useState(notificationBellBlack);
    const [analytics, setAnalytics] = useState(analyticsBlack);
    const [privacyColor, setprivacyColor] = useState('#222222');
    const [balanceColor, setBalanceColor] = useState('#222222');
    const [otherBalanceColor, setOtherBalanceColor] = useState('#130F26');
    const location = useLocation();
    const [visibleDiv, setVisibleDiv] = useState("");
    const [activeSection, setActiveSection] = useState("manage_account");
    const [activeItem, setActiveItem] = useState('manage_account');


    const sectionRefs = {
        manage_account: useRef<HTMLDivElement>(null),
        download_data: useRef<HTMLDivElement>(null),
        push_notification: useRef<HTMLDivElement>(null),
        business_account: useRef<HTMLDivElement>(null),
        ads: useRef<HTMLDivElement>(null),
        screen_time: useRef<HTMLDivElement>(null),
        filter_keywords: useRef<HTMLDivElement>(null)
    };

    const navigateToSection = (sectionId: keyof typeof sectionRefs) => {
        setActiveSection(sectionId);
        setActiveItem(sectionId);
        // console.log(sectionId);
        sectionRefs[sectionId].current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
       
    };

      useEffect(() => {
        if (location.pathname.includes("settings/keyword-filtering")) {
          setVisibleDiv("filter_keywords");
        } else if (location.pathname.includes("settings/download-your-data")) {
          setVisibleDiv("download_data");
        } else if (location.pathname.includes("settings/account")) {
          setVisibleDiv("manage_account");
        } else if(location.pathname.includes('daily-screen-time-edit')){
            setVisibleDiv("daily_screen_time"); 
        }
      }, [location.pathname]); // Runs every time the URL changes

    const [open, setOpen] = useState(false); 
    


    const lightThemePalette = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkThemePalette = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleBackClick = () => {
        navigate(-1);  // Go back to the previous page without reloading
    };

    const [isPrivateAccount, setIsPrivateAccount] = useState(false);
    const [allowInBrowser, setAllowInBrowser] = useState(false);
    const [businessAccount, setBusinessAccount] = useState(false);
    const [notificationSettings, setNotificationSettings] = useState<Record<string, boolean>>({});
    const [profileSettings, setProfileSettings] = useState<Record<string, boolean>>({});

    const [downloadDataSettings, setDownloadDataSettings] = useState({
        download: 'all_data',
        download_items: ['messages', 'profile_and_posts', 'activity'],
        format: 'txt',
      });


    const style = {
        fontfamily: 'Poppins',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        border: 'none',
        borderRadius: '8px',
        p: 0,
      };

    const OpenModalDeleteData = () => setOpen(true);
    const CloseModalDeleteData = () => setOpen(false);

    // useEffect(() => {
    //     if (location.pathname.includes("settings/keyword-filtering")) {
    //       setVisibleDiv("filter_keywords");
    //     }
    //   }, [location.pathname]); // Runs when the pathname changes

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setlightdarkTheme(styles.lightdarkTheme);
            setThemeColor(themeColor);
            setChangePassIcon(changePassIconWhite);
            setContactUS(contactUsIconWhite);
            setPrivacyPolicyIcon(privacyPolicyIconWhite);
            setTermsConfitionsIcon(termsConditionsIconWhite);
            setReportProblem(reportProblemIconWhite);
            setMyReports(myReportWhite);
            setContentIcon(contentIconWhite);
            setNotificationBell(notificationBellIconWhite);
            setAnalytics(analyticsWhite);
            setprivacyColor('#fff');
            setBalanceColor('#fff');
            setOtherBalanceColor('#fff');
        } else {
            setThemeColor('light');
            setChangePassIcon(changePassIconblack);
            setContactUS(contactUSBlack);
            setPrivacyPolicyIcon(privacyPolicyIconBlack);
            setTermsConfitionsIcon(termsConfitionsIconBlack);
            setReportProblem(reportProblemBlack);
            setMyReports(myReportsBlack);
            setContentIcon(contentIconBlack);
            setNotificationBell(notificationBellBlack);
            setAnalytics(analyticsBlack);
            setprivacyColor('#222222');
            setBalanceColor('#222222');
            setOtherBalanceColor('#130F26');
        }
    });

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

    // Function to toggle visibility
  const toggleVisibility = (divId: string) => {
    if(divId === 'manage_account'){
        navigate('/settings/account');
    }else if(divId === 'download_data'){
        navigate('/settings/download-your-data');
    }else if(divId === 'filter_keywords'){
        navigate('/settings/keyword-filtering');
    }
    
  };

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
        if (!reportMessage.length) return setShowReportError(true);
        else setShowReportError(false);
        setOpenReportsModal(false);
        setOpenReportSubmittedModal(true);
        images.forEach((element: any) => { });
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
        getAccountSettings();
        getNotificationSettings();
    }, []);

      // Fetch current notification settings
  const getNotificationSettings = async () => {
    try {
      const response = await fetch(
        `${API_KEY}/profile/notifications-settings`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched settings:", data);
      console.log('in app notifications...');
      console.log(data?.data?.inAppNotifications)

      // Set state with in-app notification settings
      setNotificationSettings(data?.data?.inAppNotifications || {});
      setProfileSettings(data?.data?.interactionsNotifications || {});
    } catch (error) {
      console.error("Error fetching notification settings:", error);
    }
  };

    const getAccountSettings = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/v2/manage-account`, {
                method: 'GET',
                headers: { 
                    'Content-type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                },
            });
    
            console.log('get account settings response:', response);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            if(data){
                let newData = data?.data;
                setAllowInBrowser(newData.allowInBrowser === "true");
                setIsPrivateAccount(newData.privateAccount);
                setBusinessAccount(newData.businessAccount === "true");
                setDownloadDataSettings(newData.downloadDataSettings);
            }
            console.log('Account settings data:', data);
        } catch (error) {
            console.error('Error fetching account settings:', error);
        }
    };
    

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


    // Update notification settings when checkboxes are toggled
    const updateNewSettings = (name: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
        const value = event.target.checked;
        console.log(name, value);

        // Optimistically update UI
        setNotificationSettings((prev) => ({ ...prev, [name]: value }));

        const data = {
            inAppNotifications: {
                ...notificationSettings, // Preserve previous values
                [name]: value, // Update only the toggled setting
            },
        };

        const response = await fetch(
            `${API_KEY}/profile/new-notifications-settings`,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Updated settings response:", result);
        } catch (error) {
        console.error("Error updating notification settings:", error);
        }
    };

    const updateSettings = (name: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
        const value = event.target.checked;
        console.log(name, value);

        // Optimistically update UI
        setProfileSettings((prev) => ({ ...prev, [name]: value }));

        const data = {
            interactionsNotifications: {
                ...profileSettings, // Preserve previous values
                [name]: value, // Update only the toggled setting
            },
        };

        const response = await fetch(
            `${API_KEY}/profile/notifications-settings`,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Updated settings response:", result);
        } catch (error) {
            console.error("Error updating notification settings:", error);
        }
    };



    const handleCheckboxChange = async (category: Category) => {
        // Check if the category is already selected
        if (selectedCategories.includes(category._id)) {
            // If it is selected, remove it
            setSelectedCategories(selectedCategories.filter((item) => item !== category._id));
        } else if (selectedCategories.length < MAX_CHOICES) {
            // If it is not selected, check if the maximum limit is reached
            setSelectedCategories([...selectedCategories, category._id]);
        }
    };

    useEffect(() => {
        if (selectedCategories.length > 5 || selectedCategories.length < 1) {
            setNotAcceptable(true);
        } else {
            setNotAcceptable(false);
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
                setResponseResult(responseData.message);
                setResponse(true);
                setLoadingAnimation(false);
                handleCloseNewPassModal();
                setPasswordSuccessModal(true);
                setTimeout(() => { }, 2000);
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

    const [darkTheme, setdarkTheme] = useState('');
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });

    const updateAccountSettings = async (newSettings: Record<string, any>) => {
        try {
          const response = await fetch(`${API_KEY}/profile/v2/manage-account`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(newSettings),
          });
          console.log(response);
          setDownloadDataSettings({
            download: newSettings.download,
            download_items: newSettings.download_items,
            format: newSettings.format,
          });
          getAccountSettings();
        } catch (error) {
          console.error('Error updating settings:', error);
        }
    };

    const changeCheckbox = (name: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
        // Access the checked value of the checkbox
        const value = event.target.checked;
        console.log(name, value);  // Log the name and value (true/false)
        // let data = {};
        // if(name == 'private_account'){
        //     data = { privateAccount: value };
        //     setIsPrivateAccount(value);
        // }
        // if(name == 'all_in_browser'){
        //     data = {allowInBrowser: value};
        //     setAllowInBrowser(value);
        // }
        
        const response = await fetch(`${API_KEY}/profile/v2/manage-account`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({[name]: value}),
        });
        console.log(response);
        getAccountSettings();

    };

    const downloadYourData = () => {

    }

    const isAddKeywordPage = (data: any) => {
        setAddKeywordPage(data);
    }

    function changeScreenTimeUpdates(event)
    {
        let endpoint = process.env.VITE_API_URL + '/profile/v2/screen-times'
        let payload =
        {
            method: 'PATCH',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({ weeklyUpdates: event.target.checked }),
        };
    
        fetch(endpoint, payload)
        .catch(error => console.error('Failed to update screen time:', error));
    }

    function clearOffData()
    {
        let endpoint = process.env.VITE_API_URL + '/profile/v2/clear-off-seezit-data'
        let payload =
        {
            method: 'DELETE',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token'),
            },
        };
    
        fetch(endpoint, payload)
        .catch(error => console.error("Error:", error));
    }

    return (
        <>
            <div >
                 <Navbar />            
                <div className={`${styles.container} `} style={{ maxWidth: '1140px', margin: 'auto', marginTop: '7rem' }}>
                    
                    { <div className={`${sibarStyles.leftSide} ${darkTheme} shadow-md rounded-lg px-4 pb-4 position-relative` } style={{ width: '30rem', backgroundColor: '#fff', }}>
                    <span onClick={handleBackClick} className='position-absolute cursor-pointer bg-gray-200 p-2 rounded-full' style={{right: '107%'}}>
                        <svg width="1em" data-e2e="" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.58579 22.5858L20.8787 6.29289C21.2692 5.90237 21.9024 5.90237 22.2929 6.29289L23.7071 7.70711C24.0976 8.09763 24.0976 8.7308 23.7071 9.12132L10.8284 22H39C39.5523 22 40 22.4477 40 23V25C40 25.5523 39.5523 26 39 26H10.8284L23.7071 38.8787C24.0976 39.2692 24.0976 39.9024 23.7071 40.2929L22.2929 41.7071C21.9024 42.0976 21.2692 42.0976 20.8787 41.7071L4.58579 25.4142C3.80474 24.6332 3.80474 23.3668 4.58579 22.5858Z"></path></svg>
                    </span>
                        <div onClick={() => navigateToSection('manage_account')}  className={`${sibarStyles.sideNavDiv} pt-4 cursor-pointer ${activeItem === 'manage_account' ? sibarStyles.active : ''}`} >
                            {/* <Link to="/settings/account" reloadDocument={false} style={{ textDecoration: 'none' }}> */}
                            <div className='d-flex'>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7415 4.33984C10.8085 4.33984 9.24148 5.90684 9.24148 7.83984C9.24148 9.77284 10.8085 11.3398 12.7415 11.3398C14.6745 11.3398 16.2415 9.77284 16.2415 7.83984C16.2415 5.90684 14.6745 4.33984 12.7415 4.33984ZM7.24148 7.83984C7.24148 4.80228 9.70393 2.33984 12.7415 2.33984C15.7791 2.33984 18.2415 4.80228 18.2415 7.83984C18.2415 10.8774 15.7791 13.3398 12.7415 13.3398C9.70393 13.3398 7.24148 10.8774 7.24148 7.83984ZM12.7415 17.3398C9.77208 17.3398 7.26598 19.3319 6.48993 22.0529C6.41418 22.3185 6.15218 22.4942 5.88153 22.4393L4.90152 22.2404C4.6309 22.1854 4.45463 21.9207 4.52548 21.6538C5.49044 18.0188 8.80208 15.3398 12.7415 15.3398C16.6809 15.3398 19.9926 18.0188 20.9575 21.6538C21.0284 21.9207 20.8521 22.1854 20.5815 22.2404L19.6015 22.4393C19.3308 22.4942 19.0688 22.3185 18.9931 22.0529C18.217 19.3319 15.7109 17.3398 12.7415 17.3398Z" fill="#161823"/>
                            </svg>
                            <p className={`${sibarStyles.linkWord} pl-2`}>Manage Account</p>
                            </div>
                            {/* </Link> */}
                        </div>
                        <div onClick={() => navigateToSection('download_data')}  className={`${sibarStyles.sideNavDiv} pt-4 cursor-pointer ${activeItem === 'download_data' ? sibarStyles.active : ''}`}>
                            {/* <Link to="/" reloadDocument={false} style={{ textDecoration: 'none' }}> */}
                            <div className='d-flex'>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7412 3.83984C10.8082 3.83984 9.24121 5.40685 9.24121 7.33984V9.33984H16.2412V7.33984C16.2412 5.40685 14.6742 3.83984 12.7412 3.83984ZM18.2412 9.33984V7.33984C18.2412 4.30228 15.7788 1.83984 12.7412 1.83984C9.70366 1.83984 7.24121 4.30228 7.24121 7.33984V9.33984H6.74121C5.08436 9.33984 3.74121 10.683 3.74121 12.3398V20.3398C3.74121 21.9967 5.08436 23.3398 6.74121 23.3398H18.7412C20.3981 23.3398 21.7412 21.9967 21.7412 20.3398V12.3398C21.7412 10.683 20.3981 9.33984 18.7412 9.33984H18.2412ZM6.74121 11.3398C6.18891 11.3398 5.74121 11.7875 5.74121 12.3398V20.3398C5.74121 20.8921 6.18891 21.3398 6.74121 21.3398H18.7412C19.2935 21.3398 19.7412 20.8921 19.7412 20.3398V12.3398C19.7412 11.7875 19.2935 11.3398 18.7412 11.3398H6.74121ZM13.7412 17.0723C14.339 16.7265 14.7412 16.0801 14.7412 15.3398C14.7412 14.2353 13.8458 13.3398 12.7412 13.3398C11.6367 13.3398 10.7412 14.2353 10.7412 15.3398C10.7412 16.0801 11.1434 16.7265 11.7412 17.0723V19.3398C11.7412 19.616 11.9651 19.8398 12.2412 19.8398H13.2412C13.5174 19.8398 13.7412 19.616 13.7412 19.3398V17.0723Z" fill="#161823"/>
                            </svg>

                            <p className={`${sibarStyles.linkWord} pl-2`}>Privacy</p>
                            </div>
                            {/* </Link> */}
                        </div>
                        <div onClick={() => navigateToSection('push_notification')} className={`${sibarStyles.sideNavDiv} pt-4 cursor-pointer ${activeItem === 'push_notification' ? sibarStyles.active : ''}`}>
                            {/* <Link to="/" reloadDocument={false} style={{ textDecoration: 'none' }}> */}
                            <div className='d-flex'>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7412 3.83984C16.0549 3.83984 18.7412 6.52614 18.7412 9.83984V13.8398C18.7412 14.8687 18.9693 15.9435 19.4726 16.8398H6.00981C6.51321 15.9435 6.74121 14.8687 6.74121 13.8398V9.83984C6.74121 6.52614 9.42751 3.83984 12.7412 3.83984ZM22.7412 16.8398C22.1291 16.8398 21.6696 16.5546 21.3233 16.0351C20.9572 15.486 20.7412 14.6915 20.7412 13.8398V9.83984C20.7412 5.42156 17.1595 1.83984 12.7412 1.83984C8.32291 1.83984 4.74121 5.42156 4.74121 9.83984V13.8398C4.74121 14.6915 4.52527 15.486 4.15916 16.0351C3.81281 16.5546 3.35331 16.8398 2.74121 16.8398C2.18893 16.8398 1.74121 17.2875 1.74121 17.8398C1.74121 18.3921 2.18893 18.8398 2.74121 18.8398H22.7412C23.2935 18.8398 23.7412 18.3921 23.7412 17.8398C23.7412 17.2875 23.2935 16.8398 22.7412 16.8398ZM9.89056 21.3141C10.0728 21.0193 10.3946 20.8398 10.7412 20.8398H14.7412C15.0878 20.8398 15.4097 21.0193 15.5919 21.3141C15.7741 21.6089 15.7906 21.9771 15.6357 22.287L14.7412 21.8398C15.6357 22.287 15.6351 22.2881 15.6351 22.2881L15.6346 22.2892L15.6334 22.2914L15.631 22.2962L15.6254 22.307C15.6214 22.3146 15.6168 22.3233 15.6115 22.333C15.6009 22.3522 15.5876 22.3754 15.5716 22.4018C15.5396 22.4545 15.4961 22.5209 15.4397 22.5961C15.3272 22.7461 15.1606 22.935 14.9284 23.1207C14.4514 23.5023 13.7341 23.8398 12.7412 23.8398C11.7483 23.8398 11.0311 23.5023 10.554 23.1207C10.3219 22.935 10.1553 22.7461 10.0428 22.5961C9.98636 22.5209 9.94286 22.4545 9.91086 22.4018C9.89481 22.3754 9.88156 22.3522 9.87096 22.333C9.86566 22.3233 9.86101 22.3146 9.85701 22.307L9.85141 22.2962L9.84901 22.2914L9.84786 22.2892L9.84731 22.2881C9.84731 22.2881 9.84676 22.287 10.7412 21.8398L9.84676 22.287C9.69181 21.9771 9.70836 21.6089 9.89056 21.3141Z" fill="#161823"/>
                            </svg>
                            <p className={`${sibarStyles.linkWord} pl-2`}>Push notifications</p>
                            </div>
                            {/* </Link> */}
                        </div>
                        <div onClick={() => navigateToSection('business_account')}  className={`${sibarStyles.sideNavDiv} pt-4 cursor-pointer ${activeItem === 'business_account' ? sibarStyles.active : ''}`}>
                            {/* <Link to="/" reloadDocument={false} style={{ textDecoration: 'none' }}> */}
                            <div className='d-flex'>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.13641 2.33984H6.13805H19.2771C19.7634 2.34073 20.2407 2.48648 20.6431 2.76161L20.6475 2.76466C21.0666 3.05492 21.384 3.47113 21.5458 3.95659L23.0539 7.89193C23.2742 8.45345 23.3011 9.06997 23.1296 9.64844C22.9653 10.2029 22.629 10.6883 22.1743 11.0431V21.2398C22.1743 22.3996 21.2341 23.3398 20.0743 23.3398H5.40761C4.24782 23.3398 3.30761 22.3996 3.30761 21.2398V11.031C2.84876 10.6728 2.51046 10.1815 2.34796 9.62033C2.17748 9.03156 2.21217 8.40539 2.44505 7.83908L3.86535 3.96362C4.02646 3.47515 4.34493 3.05634 4.76602 2.76467L4.77046 2.7616C5.17278 2.48647 5.65012 2.34073 6.13641 2.33984ZM19.8733 11.5727C20.0397 11.5958 20.2071 11.607 20.3743 11.6065V21.2398C20.3743 21.4056 20.24 21.5398 20.0743 21.5398H15.7744V16.1732C15.7744 15.0134 14.8342 14.0732 13.6744 14.0732H11.8078C10.648 14.0732 9.70776 15.0134 9.70776 16.1732V21.5398H5.40761C5.24193 21.5398 5.10761 21.4056 5.10761 21.2398V11.6064C5.28026 11.6077 5.45324 11.5965 5.62509 11.5727L5.63496 11.5713L5.64482 11.5697C6.21954 11.4769 6.75581 11.2164 7.17935 10.8174C7.30626 10.6983 7.48426 10.6256 7.67676 10.6256C7.86943 10.6256 8.04755 10.6984 8.17449 10.8177L8.18146 10.8243L8.18856 10.8307C8.74103 11.3285 9.4635 11.6002 10.2077 11.6002C10.9519 11.6002 11.6743 11.3285 12.2268 10.8307L12.2327 10.8254L12.2385 10.82C12.3693 10.6979 12.552 10.6237 12.7492 10.6237C12.9464 10.6237 13.1292 10.6979 13.26 10.82L13.2657 10.8254L13.2716 10.8307C13.8241 11.3285 14.5466 11.6002 15.2907 11.6002C16.035 11.6002 16.7574 11.3285 17.3098 10.8307L17.3169 10.8243L17.3239 10.8177C17.4508 10.6984 17.629 10.6256 17.8216 10.6256C18.0141 10.6256 18.1922 10.6983 18.319 10.8174C18.7426 11.2164 19.2789 11.4769 19.8536 11.5697L19.8634 11.5713L19.8733 11.5727ZM11.5078 21.5398H13.9744V16.1732C13.9744 16.0075 13.8402 15.8732 13.6744 15.8732H11.8078C11.6421 15.8732 11.5078 16.0075 11.5078 16.1732V21.5398ZM6.13904 4.13984C6.01013 4.1402 5.88777 4.17886 5.78872 4.24592C5.6808 4.32138 5.608 4.42343 5.57331 4.53193L5.56757 4.54985L4.12115 8.49658L4.11286 8.51626C4.03146 8.70948 4.01932 8.92073 4.07693 9.11966C4.13318 9.31392 4.25507 9.49261 4.43222 9.6251C4.49196 9.66349 4.55441 9.6983 4.61922 9.72926C4.85972 9.80317 5.1156 9.82459 5.3673 9.79116C5.59024 9.75329 5.79117 9.65228 5.94531 9.50704C6.41346 9.06683 7.03612 8.82557 7.67676 8.82557C8.31341 8.82557 8.9316 9.06319 9.39875 9.49818C9.61312 9.6889 9.90161 9.8002 10.2077 9.8002C10.5142 9.8002 10.8031 9.68858 11.0175 9.49738C11.4881 9.06162 12.1094 8.82372 12.7492 8.82372C13.389 8.82372 14.0103 9.06162 14.4808 9.49738C14.6954 9.68858 14.9843 9.8002 15.2907 9.8002C15.5968 9.8002 15.8853 9.6889 16.0996 9.49817C16.5668 9.06319 17.185 8.82557 17.8216 8.82557C18.4623 8.82557 19.0843 9.06618 19.5524 9.50639C19.7065 9.65164 19.9082 9.75328 20.1312 9.79116C20.3828 9.82459 20.6386 9.80316 20.8792 9.72926C20.9425 9.699 21.0037 9.66505 21.0621 9.6277C21.2312 9.49742 21.3482 9.32456 21.4039 9.13687C21.4613 8.94319 21.4525 8.73748 21.3777 8.54784L21.376 8.54382L19.848 4.55614L19.8402 4.53193C19.8055 4.42342 19.7328 4.32137 19.6248 4.24591C19.5258 4.17884 19.4034 4.1402 19.2745 4.13984H6.13904Z" fill="#161823"/>
                            </svg>
                            <p className={`${sibarStyles.linkWord} pl-2`}>Business account</p>
                            </div>
                            {/* </Link> */}
                        </div>
                        <div onClick={() => navigateToSection('ads')} className={`${sibarStyles.sideNavDiv} pt-4 cursor-pointer ${activeItem === 'ads' ? sibarStyles.active : ''}`}>
                            {/* <Link to="/" reloadDocument={false} style={{ textDecoration: 'none' }}> */}
                            <div className='d-flex'>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.2962 3.51042C21.4328 3.60158 21.5449 3.725 21.6225 3.86976C21.7001 4.01452 21.7409 4.17617 21.7412 4.34042V21.0204C21.7409 21.1818 21.7016 21.3406 21.6266 21.4835C21.5516 21.6263 21.4432 21.7489 21.3106 21.8408C21.178 21.9326 21.0251 21.991 20.865 22.011C20.7049 22.031 20.5423 22.0119 20.3912 21.9554L16.4512 20.4704C15.9869 21.0552 15.3961 21.5273 14.7233 21.8511C14.0504 22.175 13.3129 22.3423 12.5662 22.3404C11.8961 22.3452 11.2322 22.212 10.6158 21.9492C9.99935 21.6863 9.44359 21.2995 8.98306 20.8127C8.52253 20.3259 8.16708 19.7496 7.93881 19.1195C7.71055 18.4895 7.61435 17.8192 7.65621 17.1504L4.74121 16.0504V16.6704C4.74121 16.803 4.68853 16.9302 4.59476 17.024C4.501 17.1177 4.37382 17.1704 4.24121 17.1704H3.24121C3.1086 17.1704 2.98143 17.1177 2.88766 17.024C2.79389 16.9302 2.74121 16.803 2.74121 16.6704V9.01042C2.74121 8.87782 2.79389 8.75064 2.88766 8.65687C2.98143 8.5631 3.1086 8.51042 3.24121 8.51042H4.24121C4.37382 8.51042 4.501 8.5631 4.59476 8.65687C4.68853 8.75064 4.74121 8.87782 4.74121 9.01042V9.90042L20.3562 3.41542C20.5086 3.35256 20.6741 3.32834 20.8381 3.34491C21.0021 3.36149 21.1595 3.41834 21.2962 3.51042ZM4.74121 12.0604V13.9104L19.7412 19.5754V5.84042L4.74121 12.0654V12.0604ZM9.67621 17.9104C9.76854 18.411 9.98862 18.8793 10.3151 19.2698C10.6416 19.6604 11.0635 19.96 11.5398 20.1395C12.0162 20.3191 12.5308 20.3726 13.0339 20.2948C13.5369 20.217 14.0114 20.0105 14.4112 19.6954L9.67621 17.9154V17.9104Z" fill="#161823"/>
                            </svg>
                            <p className={`${sibarStyles.linkWord} pl-2`}>Ads</p>
                            </div>
                            {/* </Link> */}
                        </div>
                        <div  onClick={() => navigateToSection('screen_time')}  className={`${sibarStyles.sideNavDiv} pt-4 cursor-pointer ${activeItem === 'screen_time' ? sibarStyles.active : ''}`} >
                            {/* <Link to="/" reloadDocument={false} style={{ textDecoration: 'none' }}> */}
                            <div className='d-flex'>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.46621 10.1498L10.4912 12.8398L6.46621 15.5298C5.78233 15.9861 5.22151 16.604 4.83342 17.3287C4.44532 18.0535 4.24191 18.8627 4.24121 19.6848V23.3398C4.24121 23.4725 4.29389 23.5996 4.38766 23.6934C4.48143 23.7872 4.6086 23.8398 4.74121 23.8398H20.7412C20.8738 23.8398 21.001 23.7872 21.0948 23.6934C21.1885 23.5996 21.2412 23.4725 21.2412 23.3398V19.6898C21.2413 18.8669 21.0383 18.0566 20.6502 17.3309C20.262 16.6052 19.7008 15.9866 19.0162 15.5298L14.9912 12.8398L19.0162 10.1498C19.7001 9.69357 20.2609 9.07571 20.649 8.35096C21.0371 7.62622 21.2405 6.81696 21.2412 5.99484V2.33984C21.2412 2.20724 21.1885 2.08006 21.0948 1.98629C21.001 1.89252 20.8738 1.83984 20.7412 1.83984H4.74121C4.6086 1.83984 4.48143 1.89252 4.38766 1.98629C4.29389 2.08006 4.24121 2.20724 4.24121 2.33984V5.98984C4.24109 6.81281 4.4441 7.62307 4.83224 8.34876C5.22037 9.07444 5.78163 9.6931 6.46621 10.1498ZM19.2412 3.83984V5.98984C19.2419 6.4843 19.1205 6.97127 18.8875 7.40743C18.6546 7.84359 18.3175 8.21542 17.9062 8.48984L15.1312 10.3398H10.3512L7.57621 8.48984C7.1649 8.21542 6.82779 7.84359 6.59488 7.40743C6.36197 6.97127 6.24048 6.4843 6.24121 5.98984V3.83984H19.2412ZM19.2412 21.8398H6.24121V19.8398H19.2412V21.8398ZM6.87621 17.8398C7.07333 17.5872 7.30966 17.3677 7.57621 17.1898L12.7412 13.7398L17.9062 17.1898C18.1728 17.3677 18.4091 17.5872 18.6062 17.8398H6.87621Z" fill="#161823"/>
                            </svg>
                            <p className={`${sibarStyles.linkWord} pl-2`}>Screen time</p>
                            </div>
                            {/* </Link> */}
                        </div>
                        <div onClick={() => navigateToSection('filter_keywords')} className={`${sibarStyles.sideNavDiv} pt-4 cursor-pointer ${activeItem === 'filter_keywords' ? sibarStyles.active : ''}`}>
                            {/* <Link to="/" reloadDocument={false} style={{ textDecoration: 'none' }}> */}
                            <div className='d-flex'>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.74121 8.33984C1.74121 7.54419 2.05728 6.78113 2.61989 6.21852C3.1825 5.65591 3.94556 5.33984 4.74121 5.33984H15.7412C16.5369 5.33984 17.2999 5.65591 17.8625 6.21852C18.4251 6.78113 18.7412 7.54419 18.7412 8.33984V10.4448L23.3312 7.30484C23.4659 7.21222 23.6232 7.15801 23.7864 7.14805C23.9495 7.13809 24.1123 7.17275 24.2573 7.2483C24.4022 7.32386 24.5238 7.43746 24.6091 7.57691C24.6943 7.71636 24.74 7.8764 24.7412 8.03984V17.6398C24.7409 17.8037 24.6959 17.9644 24.611 18.1046C24.5261 18.2447 24.4046 18.3591 24.2595 18.4352C24.1143 18.5114 23.9512 18.5465 23.7876 18.5367C23.624 18.5269 23.4662 18.4727 23.3312 18.3798L18.7412 15.2398V17.3398C18.7412 18.1355 18.4251 18.8986 17.8625 19.4612C17.2999 20.0238 16.5369 20.3398 15.7412 20.3398H4.74121C3.94556 20.3398 3.1825 20.0238 2.61989 19.4612C2.05728 18.8986 1.74121 18.1355 1.74121 17.3398V8.33984ZM4.74121 7.33984C4.47599 7.33984 4.22164 7.4452 4.0341 7.63274C3.84657 7.82027 3.74121 8.07463 3.74121 8.33984V17.3398C3.74121 17.8898 4.19121 18.3398 4.74121 18.3398H15.7412C16.0064 18.3398 16.2608 18.2345 16.4483 18.047C16.6359 17.8594 16.7412 17.6051 16.7412 17.3398V8.33984C16.7412 8.07463 16.6359 7.82027 16.4483 7.63274C16.2608 7.4452 16.0064 7.33984 15.7412 7.33984H4.74121ZM18.7812 12.8398L22.7412 15.5498V10.1298L18.7812 12.8398Z" fill="#161823"/>
                            </svg>
                            <p className={`${sibarStyles.linkWord} pl-2`}>Content preferences</p>
                            </div>
                            {/* </Link> */}
                        </div>
                    </div> }
                    <div className={` ${styles.middleSectionDiv} ${darkTheme} bg-white shadow-md text-left`}  style={{ display: visibleDiv === 'download_data' ? 'block' : 'none' }}>
                        <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0 font-semibold p-3 text-xl`}>Download Seezitt data</h4>
                        <ManageAccount downloadDataSettings={downloadDataSettings} updateAccountSettings={updateAccountSettings} /> 
                    </div>
                    <div className={` ${styles.middleSectionDiv} ${darkTheme} bg-white shadow-md text-left`} style={{ display: visibleDiv === 'adds' ? 'block' : 'none' }}>
                            <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0 font-semibold text-xl p-3`}>How your ads are personalized</h4>
                            <span className='text-left px-3 text-[#000000A6] text-sm'> Personalized ads can be based on inferences that Seezitt has made about you. You can manage whether your ads are based on these factors below. Any changes that you make can take up to 48 hours to go into effect. These changes will not affect whether we otherwise can use the information we collect about you to help us personalize your ads.
                            <a href="" className='font-semibold'>Learn more</a>
                        </span>
                        <Ads /> 
                    </div>
                    <div className={` ${styles.middleSectionDiv} ${darkTheme} bg-white shadow-md text-left`} style={{ display: visibleDiv === 'mute_advertisers' ? 'block' : 'none' }}>
                            <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0 font-semibold text-xl p-3`}>Mute advertisers</h4>
                            <span className='text-left px-3 text-[#000000A6] text-sm'> 
                                You can hide the ads from an advertiser who has recently shown you ads on Seezitt. You will not see ads from this advertiser for 28 days. This setting only applies to Seezitt ads, and you may continue to see this advertiser’s ads on other ad networks.
                            </span>
                        <MuteAdvertisers />
                        <span className='text-left px-3 text-[#000000A6] text-sm'> 
                            Advertisers you have hidden
                        </span>
                    </div>
                    <div  className={` ${styles.middleSectionDiv} ${darkTheme} bg-white shadow-md text-left`} style={{ display: visibleDiv === 'daily_screen_time' ? 'block' : 'none' }}>
                            <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0 font-bold text-xl p-3`}>Daily screen time</h4>
                            <span className='text-left px-3 text-[#161823] pt-1 text-sm'> 
                            We’ll let you know if you reach your daily time to help you balance your day.
                            </span>
                        <DailyScreenTime />
                    </div>
                    <div className={` ${styles.middleSectionDiv} ${darkTheme} bg-white shadow-md text-left`} style={{ display: visibleDiv === 'screen_time_breaks' ? 'block' : 'none' }}>
                            <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0 font-bold text-xl p-3`}>Screen time breaks</h4>
                            <span className='text-left px-3 text-[#161823] pt-1 text-sm'> 
                            Break reminders help you feel more mindful and balanced on Seezitt.
                            </span>
                        <ScreenTimeBreaks />
                    </div>
                    <div className={` ${styles.middleSectionDiv} ${darkTheme} bg-white shadow-md text-left`} style={{ display: visibleDiv === 'sleep_reminders' ? 'block' : 'none' }}>
                            <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0 font-bold text-xl p-3`}>Sleep reminders</h4>
                            <span className='text-left px-3 text-[#161823] pt-1 text-sm'> 
                                Sleep reminders on Seezitt can help you get ready for bed and stay asleep.
                            </span>
                        <SleepReminder />
                    </div>
                    <div className={` ${styles.middleSectionDiv} ${darkTheme} bg-white shadow-md text-left`} style={{ display: visibleDiv === 'filter_keywords' ? 'block' : 'none' }}>
                    {!addKeywordPage && <><h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0 font-bold text-xl p-3`}>Filter keywords</h4><span className='text-left px-3 d-block text-[#161823] pt-1 text-sm'>
                            When you filter a keyword, you won’t see posts in your selected feeds that contain that word in any
                            titles, descriptions, or stickers. Certain keywords can’t be filtered.
                        </span></>}
                            
                        <KeywordFilters isAddKeywordPage={isAddKeywordPage} />
                    </div>
                    <div className={` ${styles.middleSectionDiv} ${darkTheme} bg-white shadow-md text-left`} style={{ display: visibleDiv === 'disconnect_advertisers' ? 'block' : 'none' }}>
                            <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0 font-semibold text-xl p-3`}>Disconnect advertisers</h4>
                            <ul className='list-disc pl-5 ml-3 text-left px-3 text-[#000000A6] text-sm'>
                                <li>Once disconnected, your future off-Seezitt data will not be used to serve personalized ads to you, but this data may still be used for other purposes.</li>
                                <li>You may continue to see ads from this advertiser when Seezitt shows you relevant ads based on your on-Seezitt activity.</li>
                            </ul>
                        <DisconnectAdvertisers />
                        <span className='text-left px-3 text-[#000000A6] text-sm'> 
                            Advertisers you have hidden
                        </span>
                    </div>
                    <div className={` ${styles.middleSectionDiv} ${darkTheme} bg-white shadow-md text-left`} style={{ display: visibleDiv === 'manage_account' ? 'block' : 'none' }}>
                        <div className={styles.settingsWrapper}>
                            
                            <div  className={styles.suggestedContent}>
                                <div className={`${styles.pageHeader} mb-0 mt-2`}>
                                    <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0`}>Manage Account</h4>
                                </div>
                                {/* <div
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
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V9C3 9.53043 3.21071 10.0391 3.58579 10.4142C3.96086 10.7893 4.46957 11 5 11H9C9.53043 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53043 11 9V5C11 4.46957 10.7893 3.96086 10.4142 3.58579C10.0391 3.21071 9.53043 3 9 3H5ZM5 5H9V9H5V5ZM19 19C18.7348 19 18.4804 19.1054 18.2929 19.2929C18.1054 19.4804 18 19.7348 18 20C18 20.2652 18.1054 20.5196 18.2929 20.7071C18.4804 20.8946 18.7348 21 19 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20C21 19.7348 20.8946 19.4804 20.7071 19.2929C20.5196 19.1054 20.2652 19 20 19H19ZM13 17V20C13 20.2652 13.1054 20.5196 13.2929 20.7071C13.4804 20.8946 13.7348 21 14 21H16C16.2652 21 16.5196 20.8946 16.7071 20.7071C16.8946 20.5196 17 20.2652 17 20C17 19.7348 16.8946 19.4804 16.7071 19.2929C16.5196 19.1054 16.2652 19 16 19H15V17C15 16.7348 14.8946 16.4804 14.7071 16.2929C14.5196 16.1054 14.2652 16 14 16C13.7348 16 13.4804 16.1054 13.2929 16.2929C13.1054 16.4804 13 16.7348 13 17ZM17 16C16.7348 16 16.4804 16.1054 16.2929 16.2929C16.1054 16.4804 16 16.7348 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18H20C20.2652 18 20.5196 17.8946 20.7071 17.7071C20.8946 17.5196 21 17.2652 21 17V14C21 13.7348 20.8946 13.4804 20.7071 13.2929C20.5196 13.1054 20.2652 13 20 13H19C18.7348 13 18.4804 13.1054 18.2929 13.2929C18.1054 13.4804 18 13.7348 18 14C18 14.2652 18.1054 14.5196 18.2929 14.7071C18.4804 14.8946 18.7348 15 19 15V16H17ZM14 13C13.7348 13 13.4804 13.1054 13.2929 13.2929C13.1054 13.4804 13 13.7348 13 14C13 14.2652 13.1054 14.5196 13.2929 14.7071C13.4804 14.8946 13.7348 15 14 15H16C16.2652 15 16.5196 14.8946 16.7071 14.7071C16.8946 14.5196 17 14.2652 17 14C17 13.7348 16.8946 13.4804 16.7071 13.2929C16.5196 13.1054 16.2652 13 16 13H14ZM3 15C3 14.4696 3.21071 13.9609 3.58579 13.5858C3.96086 13.2107 4.46957 13 5 13H9C9.53043 13 10.0391 13.2107 10.4142 13.5858C10.7893 13.9609 11 14.4696 11 15V19C11 19.5304 10.7893 20.0391 10.4142 20.4142C10.0391 20.7893 9.53043 21 9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15ZM9 15H5V19H9V15ZM15 3C14.4696 3 13.9609 3.21071 13.5858 3.58579C13.2107 3.96086 13 4.46957 13 5V9C13 9.53043 13.2107 10.0391 13.5858 10.4142C13.9609 10.7893 14.4696 11 15 11H19C19.5304 11 20.0391 10.7893 20.4142 10.4142C20.7893 10.0391 21 9.53043 21 9V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H15ZM15 5H19V9H15V5Z"
                                                fill="#222222"
                                                stroke="white"
                                                strokeWidth="0.5"
                                            />
                                        </svg>
                                        <p>QR Code</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                {!['Google', 'Apple', 'Facebook'].some(type=>type===registerType) && <div
                                    className={styles.accountCards}
                                    onClick={handleOpenChangePassMainModal}
                                >
                                    <div className={styles.settingName}>
                                        <img src={changePassIcon} alt="" />
                                        <p>Change Password</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>}
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
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M11.9846 21.606C11.9846 21.606 19.6566 19.283 19.6566 12.879C19.6566 6.474 19.9346 5.974 19.3196 5.358C18.7036 4.742 12.9906 2.75 11.9846 2.75C10.9786 2.75 5.26557 4.742 4.65057 5.358C4.03457 5.974 4.31257 6.474 4.31257 12.879C4.31257 19.283 11.9846 21.606 11.9846 21.606Z"
                                                stroke={privacyColor}
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9.38281 11.8741L11.2748 13.7691L15.1728 9.86914"
                                                stroke={privacyColor}
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
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
                                                stroke={balanceColor}
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M18.049 11.6432H17.7373"
                                                stroke={balanceColor}
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z"
                                                stroke={otherBalanceColor}
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M7.03125 7.53772H12.4302"
                                                stroke="#130F26"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
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
                                                strokeWidth="0.5"
                                            />
                                        </svg>
                                        <p>
                                            Switch to{' '}
                                            {accountType === 'Personal' ? 'Business' : 'Personal'}{' '}
                                            account
                                        </p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div> */}
                                <div  className='w-100 border-bottom pb-3'>
                                    <h5  ref={sectionRefs.manage_account}  className='h6 text-left'>Account control</h5>
                                    <div
                                        className={styles.accountCards}>
                                        <div className={styles.settingName}>
                                            <p >Delete account</p>
                                        </div>
                                        <p onClick={handleOpenDeleteAccountMainModal} style={{ color: '#FE2C55' }}>Delete</p>
                                    </div>
                                </div>
                            </div>
                            <div ref={sectionRefs.download_data} className={`${styles.suggestedContent} scroll-section`}>
                                <div  className={`${styles.pageHeader} mb-0 mt-0`}>
                                    <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0`}>Privacy</h4>
                                </div>
                                <div className='w-100 border-bottom pb-3'>
                                    <h5 className='h6 text-left'>Discoverability</h5>
                                    <div
                                        className={styles.accountCards}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p>Private account</p>
                                            <span className='text-xs text-[#16182399]'>With a private account, only users you approve can follow you and watch your videos. Your existing
                                            followers won’t be affected.</span>
                                            </div>
                                        </div>
                                        <label className={`toggle-switch !left-1 ${isPrivateAccount ? 'checkedToggle' : ''}`}>
                                            <input
                                            onChange={changeCheckbox('privateAccount')} 
                                            style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                type="checkbox"
                                                name="autoScrollCheckbox" 
                                                id="autoScrollCheckbox"
                                                checked={isPrivateAccount}  // Control the checkbox based on state 
                                            />
                                            <b className="slider"></b>
                                        </label>
                                    </div>
                                </div>
                                <div  className='w-100 border-bottom pb-3' onClick={() => toggleVisibility('download_data')}>
                                    <h5 className='h6 text-left'>Data</h5>
                                    <div
                                        className={styles.accountCards}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p>Download your data </p>
                                            <span className='text-xs text-[#16182399]'>Get a copy of your Seezitt data</span>
                                            </div>
                                        </div>
                                        <img src={whiteRightArrow} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div  ref={sectionRefs.push_notification} className={`${styles.suggestedContent} mb-0`}>
                                <div className={`${styles.pageHeader} mb-0 mt-0`}>
                                    <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0`}>Push notifications</h4>
                                </div>
                                <div className='w-100 border-bottom pb-3'>
                                    <h5 className='h6 text-left'>Desktop notifications</h5>
                                    <div
                                        className={styles.accountCards}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p>Allow in browser</p>
                                            <span className='text-xs text-[#16182399]'>Stay on top of notifications for likes, comments, the latest videos, and more on desktop. You can turn</span>
                                            </div>
                                        </div>
                                        <label className={`toggle-switch !left-1 ${allowInBrowser ? 'checkedToggle' : ''}`}>
                                            <input 
                                            style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                type="checkbox"
                                                onChange={changeCheckbox('allowInBrowser')} 
                                                name="autoScrollCheckbox" 
                                                id="autoScrollCheckbox" 
                                                checked={allowInBrowser}  // Control the checkbox based on state 
                                            />
                                            <b className="slider"></b>
                                        </label>
                                    </div>
                                </div>
                                <div className='w-100 border-bottom pb-3'>
                                    <h5 className='h6 text-left'>Your preferences</h5>
                                    <span className='text-xs text-[#16182399] d-block text-left mb-3'>Your preferences will be synced automatically to the Seezit app.</span>
                                    
                                    <Accordion className='shadow-none px-0'>
                                        <AccordionSummary
                                        className='shadow-none px-0'
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                        >
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                                <p>Interactions </p>
                                                <span className='text-xs text-[#16182399]'>Likes, comments, new followers, mentions and tags</span>
                                            </div>
                                        </div>
                                        </AccordionSummary>
                                        <AccordionDetails className='px-1 bg-[#f8f8f8]'>
                                            <Typography >
                                                <div
                                                    className={styles.accountCards}>
                                                    <div className={styles.settingName}>
                                                        <div className='text-left'>
                                                            <p className='text-base'>Likes</p>
                                                        </div>
                                                    </div>
                                                    <label className={`toggle-switch !left-1 ${profileSettings.likes ? 'checkedToggle' : ''}`}>
                                                        <input 
                                                        style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                            type="checkbox"
                                                            name="autoScrollCheckbox" 
                                                            id="autoScrollCheckbox"
                                                            checked={profileSettings.likes || false}
                                                            onChange={updateSettings('likes')} 
                                                        />
                                                        <b className="slider"></b>
                                                    </label>
                                                </div>
                                            </Typography>
                                            <Typography className='mt-4'>
                                                <div
                                                    className={styles.accountCards}>
                                                    <div className={styles.settingName}>
                                                        <div className='text-left'>
                                                            <p className='text-base'>Comments</p>
                                                        </div>
                                                    </div>
                                                    <label className={`toggle-switch !left-1 ${profileSettings.comments ? 'checkedToggle' : ''}`}>
                                                        <input 
                                                        style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                            type="checkbox"
                                                            name="autoScrollCheckbox" 
                                                            id="autoScrollCheckbox" 
                                                            checked={profileSettings.comments || false}
                                                            onChange={updateSettings('comments')} 
                                                        />
                                                        <b className="slider"></b>
                                                    </label>
                                                </div>
                                            </Typography>
                                            <Typography className='mt-4'>
                                                <div
                                                    className={styles.accountCards}>
                                                    <div className={styles.settingName}>
                                                        <div className='text-left'>
                                                            <p className='text-base'>New followers</p>
                                                        </div>
                                                    </div>
                                                    <label className={`toggle-switch !left-1 ${profileSettings.newFollowers ? 'checkedToggle' : ''}`}>
                                                        <input 
                                                        style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                            type="checkbox"
                                                            name="autoScrollCheckbox" 
                                                            id="autoScrollCheckbox" 
                                                            checked={profileSettings.newFollowers || false}
                                                            onChange={updateSettings('newFollowers')} 
                                                        />
                                                        <b className="slider"></b>
                                                    </label>
                                                </div>
                                            </Typography>
                                            <Typography className='mt-4'>
                                                <div
                                                    className={styles.accountCards}>
                                                    <div className={styles.settingName}>
                                                        <div className='text-left'>
                                                            <p className='text-base'>Mentions and tags</p>
                                                        </div>
                                                    </div>
                                                    <label className={`toggle-switch !left-1 ${profileSettings.mentionAndTags ? 'checkedToggle' : ''}`}>
                                                        <input 
                                                        style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                            type="checkbox"
                                                            name="autoScrollCheckbox" 
                                                            id="autoScrollCheckbox" 
                                                            checked={profileSettings.mentionAndTags || false}
                                                            onChange={updateSettings('mentionAndTags')} 
                                                        />
                                                        <b className="slider"></b>
                                                    </label>
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                            <div className={`${styles.suggestedContent} py-0`}>
                                <div className='w-100 border-bottom pb-0'>
                                    <Accordion className='shadow-none px-0'>
                                        <AccordionSummary
                                        className='shadow-none px-0'
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header">
                                         <h5 className='h6 text-left'>In-app notifications</h5>
                                        </AccordionSummary>
                                        <AccordionDetails className='px-1 bg-[#f8f8f8]'>
                                            <Typography >
                                                <div
                                                    className={styles.accountCards}>
                                                    <div className={styles.settingName}>
                                                        <div className='text-left'>
                                                            <p className='text-base'>Likes</p>
                                                        </div>
                                                    </div>
                                                    <label className={`toggle-switch !left-1 ${notificationSettings.likes ? 'checkedToggle' : ''}`}>
                                                        <input 
                                                        style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                            type="checkbox"
                                                            name="autoScrollCheckbox" 
                                                            id="autoScrollCheckbox" 
                                                            checked={notificationSettings.likes || false}
                                                            onChange={updateNewSettings('likes')} 
                                                        />
                                                        <b className="slider"></b>
                                                    </label>
                                                </div>
                                            </Typography>
                                            <Typography className='mt-4'>
                                                <div
                                                    className={styles.accountCards}>
                                                    <div className={styles.settingName}>
                                                        <div className='text-left'>
                                                            <p className='text-base'>Comments</p>
                                                        </div>
                                                    </div>
                                                    <label className={`toggle-switch !left-1 ${notificationSettings.comments ? 'checkedToggle' : ''}`}>
                                                        <input 
                                                        style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                            type="checkbox"
                                                            name="autoScrollCheckbox" 
                                                            id="autoScrollCheckbox" 
                                                            checked={notificationSettings.comments || false}
                                                            onChange={updateNewSettings('comments')} 
                                                        />
                                                        <b className="slider"></b>
                                                    </label>
                                                </div>
                                            </Typography>
                                            <Typography className='mt-4'>
                                                <div
                                                    className={styles.accountCards}>
                                                    <div className={styles.settingName}>
                                                        <div className='text-left'>
                                                            <p className='text-base'>New followers</p>
                                                        </div>
                                                    </div>
                                                    <label className={`toggle-switch !left-1 ${notificationSettings.newFollowers ? 'checkedToggle' : ''}`}>
                                                        <input 
                                                        style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                            type="checkbox"
                                                            name="autoScrollCheckbox" 
                                                            id="autoScrollCheckbox" 
                                                            checked={notificationSettings.newFollowers || false}
                                                            onChange={updateNewSettings('newFollowers')} 
                                                        />
                                                        <b className="slider"></b>
                                                    </label>
                                                </div>
                                            </Typography>
                                            <Typography className='mt-4'>
                                                <div
                                                    className={styles.accountCards}>
                                                    <div className={styles.settingName}>
                                                        <div className='text-left'>
                                                            <p className='text-base'>Mentions and tags</p>
                                                        </div>
                                                    </div>
                                                    <label className={`toggle-switch !left-1 ${notificationSettings.mentionAndTags ? 'checkedToggle' : ''}`}>
                                                        <input 
                                                        style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                            type="checkbox"
                                                            name="autoScrollCheckbox" 
                                                            id="autoScrollCheckbox" 
                                                            checked={notificationSettings.mentionAndTags || false}
                                                            onChange={updateNewSettings('mentionAndTags')} 
                                                        />
                                                        <b className="slider"></b>
                                                    </label>
                                                </div>
                                            </Typography>
                                            <Typography className='mt-4'>
                                                <div
                                                    className={styles.accountCards}>
                                                    <div className={styles.settingName}>
                                                        <div className='text-left'>
                                                            <p className='text-base'>Reposts</p>
                                                        </div>
                                                    </div>
                                                    <label className={`toggle-switch !left-1 ${notificationSettings.reposts ? 'checkedToggle' : ''}`}>
                                                        <input 
                                                        style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                            type="checkbox"
                                                            name="autoScrollCheckbox" 
                                                            id="autoScrollCheckbox" 
                                                            checked={notificationSettings.reposts || false}
                                                            onChange={updateNewSettings('reposts')} 
                                                        />
                                                        <b className="slider"></b>
                                                    </label>
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                            <div  ref={sectionRefs.business_account} className={styles.suggestedContent}>
                                <div className='w-100 border-bottom pb-3'>
                                <div className={`${styles.pageHeader} mb-0 mt-0`}>
                                    <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-3`}>Business account</h4>
                                </div>
                                    <div
                                        className={styles.accountCards}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <h5 className='h6 text-left'>Business account</h5>
                                            <span className='text-xs text-[#16182399]'>Access marketing tools & exclusive features through your business account to better connect with
                                            viewers.</span>
                                            </div>
                                        </div>
                                        <label className={`toggle-switch !left-1 ${businessAccount ? 'checkedToggle' : ''}`}>
                                            <input 
                                            style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                type="checkbox"
                                                name="autoScrollCheckbox" 
                                                id="autoScrollCheckbox" 
                                                onChange={changeCheckbox('businessAccount')} 
                                                checked={businessAccount}
                                            />
                                            <b className="slider"></b>
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div ref={sectionRefs.ads} className={`${styles.suggestedContent} gap-0`}>
                                <div className='w-100 border-bottom pb-3'>
                                <div className={`${styles.pageHeader} mb-0 mt-0`}>
                                    <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-3`}>Ads</h4>
                                </div>
                                    <div
                                        className={styles.accountCards} onClick={() => toggleVisibility('adds')}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <h5 className='h6 text-left'>Manage the ads you see</h5>
                                            <p className='d-flex mt-3 mb-1'>
                                            <svg width="16" height="17" style={{ marginRight: '0.25rem' }} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.6 4.97383C6.6 5.71643 6.305 6.42863 5.7799 6.95373C5.2548 7.47883 4.54261 7.77383 3.8 7.77383C3.05739 7.77383 2.3452 7.47883 1.8201 6.95373C1.295 6.42863 1 5.71643 1 4.97383C1 4.23122 1.295 3.51903 1.8201 2.99393C2.3452 2.46883 3.05739 2.17383 3.8 2.17383C4.54261 2.17383 5.2548 2.46883 5.7799 2.99393C6.305 3.51903 6.6 4.23122 6.6 4.97383ZM7.55 4.11383C7.55534 4.13614 7.5682 4.15593 7.58641 4.16989C7.60461 4.18385 7.62707 4.19113 7.65 4.1905C8.75693 4.19133 9.82699 4.58843 10.6665 5.30992C11.506 6.0314 12.0594 7.0296 12.2267 8.12383C12.2367 8.2005 12.27 8.26716 12.3233 8.32383L13.4 9.4005C13.5933 9.5905 13.9167 9.48383 13.9333 9.21383C13.9881 8.33455 13.8578 7.45356 13.5509 6.62776C13.244 5.80196 12.7673 5.0497 12.1516 4.41957C11.536 3.78944 10.795 3.29544 9.9765 2.96947C9.15804 2.64351 8.28031 2.49283 7.4 2.52716C7.14 2.53716 7.01333 2.84049 7.14333 3.06383C7.32667 3.38716 7.46667 3.74049 7.55 4.11383ZM8.40667 15.0738C8.66667 15.0405 8.76 14.7272 8.57333 14.5405L7.57333 13.5405C7.51352 13.4811 7.43412 13.4456 7.35 13.4405C6.17619 13.3643 5.07528 12.8446 4.27057 11.9866C3.46586 11.1287 3.01758 9.99678 3.01667 8.8205C3.01654 8.79813 3.00892 8.77645 2.99502 8.75893C2.98112 8.74141 2.96175 8.72905 2.94 8.72383C2.57185 8.64084 2.21801 8.5038 1.89 8.31716C1.66667 8.18716 1.36333 8.31383 1.35667 8.5705C1.35 8.65383 1.35 8.73716 1.35 8.8205C1.35015 9.7116 1.53934 10.5925 1.90508 11.4051C2.27081 12.2177 2.80478 12.9435 3.4717 13.5345C4.13863 14.1255 4.92334 14.5683 5.77403 14.8336C6.62471 15.099 7.52201 15.1809 8.40667 15.0738ZM7.85333 11.9238C7.79899 11.9782 7.76846 12.0519 7.76846 12.1288C7.76846 12.2057 7.79899 12.2794 7.85333 12.3338L10.94 15.4205C11.0533 15.5372 11.24 15.5372 11.3533 15.4205L14.44 12.3338C14.4943 12.2794 14.5249 12.2057 14.5249 12.1288C14.5249 12.0519 14.4943 11.9782 14.44 11.9238L11.3533 8.83383C11.3263 8.80642 11.2942 8.78464 11.2587 8.76978C11.2232 8.75492 11.1851 8.74727 11.1467 8.74727C11.1082 8.74727 11.0701 8.75492 11.0346 8.76978C10.9992 8.78464 10.967 8.80642 10.94 8.83383L7.85333 11.9238Z" fill="#161823"/>
                                            </svg>
                                                How your ads are personalized</p>
                                            <span className='text-xs text-[#16182399]'>Access marketing tools & exclusive features through your business account to better connect with
                                            viewers.</span>
                                            </div>
                                        </div>
                                        <img src={whiteRightArrow} alt="" />
                                    </div>
                                </div>
                                <div className='w-100 border-bottom pb-3' onClick={() => toggleVisibility('mute_advertisers')}>
                                    <div
                                        className={styles.accountCards}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p className='d-flex mt-3 mb-1'>
                                            <svg width="16" height="17" viewBox="0 0 16 17" style={{ marginRight: '0.25rem' }} fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.00008 5.17318C3.00008 4.28912 3.35127 3.44128 3.97639 2.81615C4.60151 2.19103 5.44936 1.83984 6.33342 1.83984C7.21747 1.83984 8.06532 2.19103 8.69044 2.81615C9.31556 3.44128 9.66675 4.28912 9.66675 5.17318C9.66675 6.05723 9.31556 6.90508 8.69044 7.5302C8.06532 8.15532 7.21747 8.50651 6.33342 8.50651C5.44936 8.50651 4.60151 8.15532 3.97639 7.5302C3.35127 6.90508 3.00008 6.05723 3.00008 5.17318ZM0.666748 14.3198C0.666748 12.1465 2.68675 9.50651 6.33342 9.50651C7.47675 9.50651 8.46008 9.76651 9.27341 10.1898C9.10008 10.5165 9.00008 10.8898 9.00008 11.2832V13.2665C9.00022 13.7563 9.15451 14.2337 9.44108 14.631C9.72765 15.0282 10.132 15.3252 10.5967 15.4798C10.1801 15.5065 9.65675 15.5065 9.00008 15.5065H3.66675C1.33341 15.5065 0.666748 15.5065 0.666748 14.3198ZM15.2334 8.72651C15.2334 8.12651 14.4934 7.84651 14.0967 8.29651L12.4834 10.1265C12.411 10.2078 12.3222 10.2727 12.2227 10.3169C12.1233 10.3612 12.0156 10.3838 11.9067 10.3832H11.3334C11.0947 10.3832 10.8658 10.478 10.697 10.6468C10.5282 10.8156 10.4334 11.0445 10.4334 11.2832V13.2665C10.4334 13.7632 10.8334 14.1665 11.3334 14.1665H11.9434C12.1501 14.1665 12.3501 14.2498 12.4934 14.3998L14.1167 16.0832C14.2067 16.1759 14.3222 16.2398 14.4486 16.2666C14.575 16.2934 14.7065 16.2819 14.8264 16.2336C14.9462 16.1853 15.0489 16.1024 15.1214 15.9955C15.1939 15.8885 15.2329 15.7624 15.2334 15.6332V8.72651Z" fill="#161823"/>
                                            </svg>
                                            Mute advertisers</p>
                                            <span className='text-xs text-[#16182399]'>Mute ads from specific advertisers who showed you ads recently on Seezitt.</span>
                                            </div>
                                        </div>
                                        <img src={whiteRightArrow} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div ref={sectionRefs.screen_time} className={`${styles.suggestedContent} gap-0`}>
                                <div className='w-100 border-bottom pb-3'>
                                    <div
                                        className={styles.accountCards}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <h5 className='h6 text-left'>Manage your off-Seezitt <br /> data</h5>
                                            <p className='d-flex mt-3 mb-1'>
                                            <svg width="16" height="17" style={{ marginRight: '0.25rem' }} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.06666 1.83984C4.30666 1.83984 2.87666 3.33318 2.87666 5.17318C2.87666 7.01318 4.30666 8.50651 6.06999 8.50651C7.83332 8.50651 9.26332 7.01318 9.26332 5.17318C9.26332 3.33318 7.82999 1.83984 6.06999 1.83984H6.06666ZM6.06666 9.50651C2.57666 9.50651 0.643324 12.1465 0.643324 14.3198C0.63999 15.5065 1.27666 15.5065 3.51332 15.5065H6.38999V12.9365C6.38999 12.1998 6.95999 11.6032 7.66666 11.6032H8.60666L9.06999 10.2932C8.16039 9.76239 7.123 9.49037 6.06999 9.50651H6.06666Z" fill="#161823"/>
                                            <path d="M11.5367 10.6626C11.5037 10.5292 11.4291 10.4097 11.3236 10.3216C11.2181 10.2335 11.0872 10.1813 10.9501 10.1726C10.6701 10.1592 10.4167 10.3359 10.3201 10.6059L9.50008 12.9392H8.00008C7.91168 12.9392 7.82689 12.9744 7.76438 13.0369C7.70187 13.0994 7.66675 13.1842 7.66675 13.2726V13.9392C7.66675 14.0277 7.70187 14.1124 7.76438 14.175C7.82689 14.2375 7.91168 14.2726 8.00008 14.2726H9.94008C10.2067 14.2726 10.4467 14.0959 10.5401 13.8359L10.8267 13.0226L11.6134 16.0192C11.6801 16.2826 11.8967 16.4759 12.1567 16.5059C12.2854 16.5192 12.4151 16.4928 12.5283 16.4303C12.6415 16.3677 12.7329 16.272 12.7901 16.1559L13.7567 14.2726H15.0001C15.0885 14.2726 15.1733 14.2375 15.2358 14.175C15.2983 14.1124 15.3334 14.0277 15.3334 13.9392V13.2726C15.3334 13.1842 15.2983 13.0994 15.2358 13.0369C15.1733 12.9744 15.0885 12.9392 15.0001 12.9392H13.3734C13.1367 12.9392 12.9201 13.0726 12.8067 13.2892L12.4201 14.0492L11.5367 10.6659V10.6626Z" fill="#161823"/>
                                            </svg>
                                            Using Off-Seezitt activity for ad targeting</p>
                                            <span className='text-xs text-[#16182399]'>
                                                With this setting, the ads you see on Seezitt can be more tailored to your interests based on data that
                                                advertising partners share with us about your activity on their apps and websites. You will always see ads on
                                                Seezitt based on what you do on Seezitt or other data described in our privacy policy.
                                            </span>
                                            </div>
                                        </div>
                                        <img src={whiteRightArrow} alt="" />
                                    </div>
                                </div>
                                <div className='w-100 pb-3' onClick={() => toggleVisibility('disconnect_advertisers')}>
                                    <div
                                        className={styles.accountCards}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p className='d-flex mt-3 mb-1'>
                                            <svg width="16" height="17" style={{ marginRight: '0.25rem' }} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.33342 1.67383C5.44936 1.67383 4.60151 2.02502 3.97639 2.65014C3.35127 3.27526 3.00008 4.12311 3.00008 5.00716C3.00008 5.89122 3.35127 6.73906 3.97639 7.36418C4.60151 7.98931 5.44936 8.3405 6.33342 8.3405C7.21747 8.3405 8.06532 7.98931 8.69044 7.36418C9.31556 6.73906 9.66675 5.89122 9.66675 5.00716C9.66675 4.12311 9.31556 3.27526 8.69044 2.65014C8.06532 2.02502 7.21747 1.67383 6.33342 1.67383ZM6.33342 9.3405C2.68675 9.3405 0.666748 11.9805 0.666748 14.1538C0.666748 15.3405 1.33341 15.3405 3.66675 15.3405H7.94008C7.22273 14.5442 6.78142 13.5377 6.68173 12.4705C6.58205 11.4034 6.8293 10.3326 7.38675 9.41716C7.05341 9.36716 6.70341 9.3405 6.33342 9.3405ZM8.00008 12.0072C7.98506 11.5166 8.06869 11.028 8.24601 10.5703C8.42333 10.1126 8.69073 9.69522 9.03236 9.34281C9.37399 8.99041 9.78289 8.71018 10.2348 8.51873C10.6868 8.32728 11.1725 8.22852 11.6634 8.2283C12.1542 8.22808 12.64 8.3264 13.0922 8.51743C13.5443 8.70846 13.9534 8.98833 14.2954 9.34042C14.6373 9.69252 14.9051 10.1097 15.0828 10.5672C15.2606 11.0247 15.3447 11.5132 15.3301 12.0038C15.3018 12.9567 14.9035 13.8611 14.2196 14.5253C13.5357 15.1895 12.62 15.5612 11.6667 15.5616C10.7134 15.5621 9.79737 15.1912 9.11288 14.5276C8.42839 13.8641 8.02925 12.96 8.00008 12.0072ZM10.6867 10.1605C10.6558 10.1293 10.6189 10.1045 10.5783 10.0875C10.5377 10.0706 10.4941 10.0619 10.4501 10.0619C10.4061 10.0619 10.3625 10.0706 10.3219 10.0875C10.2813 10.1045 10.2444 10.1293 10.2134 10.1605L9.82008 10.5538C9.758 10.6163 9.72315 10.7008 9.72315 10.7888C9.72315 10.8769 9.758 10.9614 9.82008 11.0238L10.8034 12.0072L9.82008 12.9905C9.758 13.0529 9.72315 13.1374 9.72315 13.2255C9.72315 13.3136 9.758 13.398 9.82008 13.4605L10.2134 13.8538C10.2759 13.9159 10.3604 13.9508 10.4484 13.9508C10.5365 13.9508 10.621 13.9159 10.6834 13.8538L11.6667 12.8738L12.6501 13.8538C12.7125 13.9159 12.797 13.9508 12.8851 13.9508C12.9731 13.9508 13.0576 13.9159 13.1201 13.8538L13.5134 13.4605C13.5755 13.398 13.6103 13.3136 13.6103 13.2255C13.6103 13.1374 13.5755 13.0529 13.5134 12.9905L12.5334 12.0072L13.5134 11.0272C13.5447 10.9962 13.5695 10.9593 13.5864 10.9187C13.6033 10.8781 13.612 10.8345 13.612 10.7905C13.612 10.7465 13.6033 10.7029 13.5864 10.6623C13.5695 10.6217 13.5447 10.5848 13.5134 10.5538L13.1201 10.1605C13.0576 10.0984 12.9731 10.0636 12.8851 10.0636C12.797 10.0636 12.7125 10.0984 12.6501 10.1605L11.6667 11.1438L10.6867 10.1605Z" fill="#161823"/>
                                            </svg>
                                            Disconnect advertisers</p>
                                            <span className='text-xs text-[#16182399]'>
                                                Stop tailoring ads with your off-Seezitt data from an advertiser.
                                            </span>
                                            </div>
                                        </div>
                                        <img src={whiteRightArrow} alt="" />
                                    </div>
                                </div>
                                <div className='w-100 border-bottom pb-3'>
                                    <div
                                        className={styles.accountCards} onClick={OpenModalDeleteData}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p className='d-flex mt-3 mb-1'>
                                            <svg width="16" height="17" style={{ marginRight: '0.25rem' }} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.6666 2.84049V3.50716H14.3333C14.4217 3.50716 14.5064 3.54228 14.569 3.60479C14.6315 3.6673 14.6666 3.75209 14.6666 3.84049V4.50716C14.6666 4.59557 14.6315 4.68035 14.569 4.74286C14.5064 4.80538 14.4217 4.84049 14.3333 4.84049H13.4399L12.9266 13.1738C12.8599 14.2305 12.8299 14.7605 12.6033 15.1605C12.404 15.5144 12.1017 15.7993 11.7366 15.9772C11.3233 16.1772 10.7933 16.1772 9.73659 16.1772H6.26659C5.20659 16.1772 4.67659 16.1772 4.26325 15.9772C3.89814 15.7993 3.59585 15.5144 3.39659 15.1605C3.16992 14.7605 3.13659 14.2305 3.07325 13.1738L2.55992 4.84049H1.66659C1.57818 4.84049 1.4934 4.80538 1.43088 4.74286C1.36837 4.68035 1.33325 4.59557 1.33325 4.50716V3.84049C1.33325 3.75209 1.36837 3.6673 1.43088 3.60479C1.4934 3.54228 1.57818 3.50716 1.66659 3.50716H5.33325V2.84049C5.33325 2.39847 5.50885 1.97454 5.82141 1.66198C6.13397 1.34942 6.55789 1.17383 6.99992 1.17383H8.99992C9.21879 1.17383 9.43552 1.21694 9.63772 1.3007C9.83993 1.38445 10.0237 1.50722 10.1784 1.66198C10.3332 1.81675 10.456 2.00048 10.5397 2.20269C10.6235 2.4049 10.6666 2.62163 10.6666 2.84049ZM6.99992 2.50716C6.91151 2.50716 6.82673 2.54228 6.76422 2.60479C6.7017 2.6673 6.66659 2.75209 6.66659 2.84049V3.50716H9.33325V2.84049C9.33325 2.75209 9.29813 2.6673 9.23562 2.60479C9.17311 2.54228 9.08832 2.50716 8.99992 2.50716H6.99992ZM6.26992 7.00716C6.18151 7.00716 6.09673 7.04228 6.03422 7.10479C5.9717 7.1673 5.93659 7.25209 5.93659 7.3405V12.3405C5.93659 12.4289 5.9717 12.5137 6.03422 12.5762C6.09673 12.6387 6.18151 12.6738 6.26992 12.6738H6.97992C7.06832 12.6738 7.15311 12.6387 7.21562 12.5762C7.27813 12.5137 7.31325 12.4289 7.31325 12.3405V7.3405C7.31325 7.25209 7.27813 7.1673 7.21562 7.10479C7.15311 7.04228 7.06832 7.00716 6.97992 7.00716H6.26659H6.26992ZM8.68659 7.3405V12.3405C8.68659 12.4289 8.7217 12.5137 8.78422 12.5762C8.84673 12.6387 8.93151 12.6738 9.01992 12.6738H9.72992C9.81832 12.6738 9.90311 12.6387 9.96562 12.5762C10.0281 12.5137 10.0633 12.4289 10.0633 12.3405V7.3405C10.0633 7.25209 10.0281 7.1673 9.96562 7.10479C9.90311 7.04228 9.81832 7.00716 9.72992 7.00716H9.01992C8.93151 7.00716 8.84673 7.04228 8.78422 7.10479C8.7217 7.1673 8.68659 7.25209 8.68659 7.3405Z" fill="#161823"/>
                                            </svg>
                                            Clear off-Seezitt data</p>
                                            <span className='text-xs text-[#16182399]'>
                                             Clear the off-Seezitt data that advertisers have shared about you.
                                            </span>
                                            </div>
                                        </div>
                                        <img src={whiteRightArrow} alt="" />
                                    </div>
                                </div>
                            </div>
                            <Modal open={open} onClose={CloseModalDeleteData} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                    <Box sx={style}>
                                      <div className='d-flex justify-between border-bottom p-4'>
                                        
                                        <Typography id="modal-modal-title" sx={{  fontSize: '22px', fontWeight: '600'}} variant="h5" component="p">
                                            Clear off-Seezitt data
                                        </Typography>
                                        <span onClick={CloseModalDeleteData}>
                                            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M25.7996 8.9198C25.9237 8.79489 25.9934 8.62593 25.9934 8.4498C25.9934 8.27368 25.9237 8.10471 25.7996 7.9798L24.8662 7.03314C24.8042 6.97065 24.7305 6.92105 24.6493 6.88721C24.568 6.85336 24.4809 6.83594 24.3929 6.83594C24.3049 6.83594 24.2177 6.85336 24.1365 6.88721C24.0553 6.92105 23.9815 6.97065 23.9196 7.03314L15.9996 14.9531L8.07955 7.0398C7.95464 6.91564 7.78568 6.84594 7.60955 6.84594C7.43343 6.84594 7.26446 6.91564 7.13955 7.0398L6.19289 7.98647C6.06872 8.11138 5.99902 8.28035 5.99902 8.45647C5.99902 8.63259 6.06872 8.80156 6.19289 8.92647L14.1129 16.8398L6.19955 24.7598C6.07538 24.8847 6.00569 25.0537 6.00569 25.2298C6.00569 25.4059 6.07538 25.5749 6.19955 25.6998L7.14622 26.6465C7.27113 26.7706 7.44009 26.8403 7.61622 26.8403C7.79234 26.8403 7.96131 26.7706 8.08622 26.6465L15.9996 18.7265L23.9196 26.6398C24.0445 26.764 24.2134 26.8337 24.3896 26.8337C24.5657 26.8337 24.7346 26.764 24.8596 26.6398L25.8062 25.6931C25.9304 25.5682 26.0001 25.3993 26.0001 25.2231C26.0001 25.047 25.9304 24.878 25.8062 24.7531L17.8862 16.8398L25.7996 8.9198Z" fill="#161823" fill-opacity="0.75"/>
                                            </svg>
                                        </span>
                                      </div>
                                      <div className='p-4'>
                                            <Typography sx={{color: '#000000', fontSize: '16px',  fontWeight: '500', lineHeight: '21px', letterSpacing: '0.03px'}}  component="p">It may take up to 30 days for your off-Seezitt data to be cleared from your account.</Typography>
                                            <Typography sx={{color: '#000000', fontSize: '16px', marginBottom: '1rem', marginTop: '1rem', fontWeight: '500', lineHeight: '21px', letterSpacing: '0.03px'}}  component="p">Depending on your other settings you may see ads on Seezitt based on new off-Seezitt data.</Typography>
                                            <Typography sx={{color: '#000000', fontSize: '16px', fontWeight: '500', lineHeight: '21px', letterSpacing: '0.03px'}}  component="p">Here are some things to know:</Typography>
                                            <ul className='list-disc ml-5 mt-4' style={{color: '#000000B8', fontSize: '14px', fontWeight: '400',}} >
                                                <li>Off-Seezitt activity includes information shared with Seezitt to help measure the
                                                effectiveness of ads on Seezitt. Seezitt also uses this activity to personalize your ads on Seezitt.</li>
                                                <li>If you clear your off-Seezitt activity, you will still see ads on Seezitt, but these ads may be less relevant to you.</li>
                                            </ul>
                                      </div>
                                      <div className='border-top p-3'>
                                            <div className='d-flex gap-2 justify-end'>
                                                <button className="bg-[#fff] text-dark font-semibold px-5 rounded-md border text-sm" onClick={CloseModalDeleteData}>
                                                    <p className="text-[rgb(255, 59, 92)] font-normal">Cancel</p>
                                                </button>
                                                <button className="bg-[#FE2C55] text-white font-semibold px-5 rounded-md text-sm" onClick={() => {clearOffData(); CloseModalDeleteData();}}>
                                                    <p className="text-[rgb(255, 59, 92)] font-normal">Confirm</p>
                                                </button>
                                            </div>
                                      </div>
                                    </Box>
                                  </Modal>
                            <div className={`${styles.suggestedContent} gap-0`}>
                                <div className='w-100 border-bottom pb-3'>
                                <div className={`${styles.pageHeader} mb-0 mt-0 gap-1`}>
                                    <h4 className={`${darkTheme ? 'text-white' : 'text-black'}`}>Screen time </h4>
                                    <span style={{ marginLeft: '0.5rem'}}>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.22005 5.18294C9.22005 5.09454 9.18493 5.00975 9.12242 4.94724C9.0599 4.88473 8.97512 4.84961 8.88671 4.84961H8.17005C8.08164 4.84961 7.99686 4.88473 7.93434 4.94724C7.87183 5.00975 7.83671 5.09454 7.83671 5.18294V9.63961C7.83671 9.72802 7.87183 9.8128 7.93434 9.87531C7.99686 9.93782 8.08164 9.97294 8.17005 9.97294H8.88671C8.97512 9.97294 9.0599 9.93782 9.12242 9.87531C9.18493 9.8128 9.22005 9.72802 9.22005 9.63961V5.18294ZM7.87005 12.6363C8.05338 12.8096 8.27005 12.8963 8.52671 12.8963C8.79338 12.8963 9.01005 12.8096 9.18671 12.6363C9.36671 12.4629 9.45671 12.2463 9.45671 11.9896C9.45671 11.7229 9.36671 11.5063 9.18671 11.3329C9.10218 11.2434 8.99968 11.1728 8.88594 11.1257C8.77219 11.0786 8.64978 11.0561 8.52671 11.0596C8.27005 11.0596 8.05338 11.1496 7.87005 11.3329C7.78419 11.4189 7.71684 11.5214 7.67212 11.6344C7.62741 11.7473 7.60628 11.8682 7.61005 11.9896C7.61005 12.2463 7.69671 12.4629 7.87005 12.6363Z" fill="#161823" fill-opacity="0.34"/>
                                        <path d="M15.8634 8.83919C15.8634 6.89427 15.0908 5.02901 13.7156 3.65374C12.3403 2.27848 10.475 1.50586 8.53011 1.50586C6.58519 1.50586 4.71993 2.27848 3.34466 3.65374C1.96939 5.02901 1.19678 6.89427 1.19678 8.83919C1.19678 10.7841 1.96939 12.6494 3.34466 14.0246C4.71993 15.3999 6.58519 16.1725 8.53011 16.1725C10.475 16.1725 12.3403 15.3999 13.7156 14.0246C15.0908 12.6494 15.8634 10.7841 15.8634 8.83919ZM14.5301 8.83919C14.5301 9.62712 14.3749 10.4073 14.0734 11.1353C13.7719 11.8632 13.3299 12.5247 12.7728 13.0818C12.2156 13.639 11.5542 14.0809 10.8262 14.3825C10.0983 14.684 9.31804 14.8392 8.53011 14.8392C7.74218 14.8392 6.96196 14.684 6.23401 14.3825C5.50606 14.0809 4.84462 13.639 4.28747 13.0818C3.73032 12.5247 3.28836 11.8632 2.98683 11.1353C2.68531 10.4073 2.53011 9.62712 2.53011 8.83919C2.53011 7.24789 3.16225 5.72177 4.28747 4.59655C5.41269 3.47133 6.93881 2.83919 8.53011 2.83919C10.1214 2.83919 11.6475 3.47133 12.7728 4.59655C13.898 5.72177 14.5301 7.24789 14.5301 8.83919Z" fill="#161823" fill-opacity="0.34"/>
                                        </svg>
                                    </span>
                                </div>
                                    <div
                                        className={styles.accountCards} onClick={() => toggleVisibility('daily_screen_time')}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p className='d-flex mt-3 mb-1'>Daily screen time</p>
                                            <span className='text-xs text-[#16182399]'>Get notified if you reach your time on Seezitt.</span>
                                            </div>
                                        </div>
                                       <div className='d-flex'>
                                            <span className='text-lg text-[#16182399]'>off</span>
                                            <img src={whiteRightArrow} alt="" />
                                       </div>
                                    </div>
                                    <div
                                        className={styles.accountCards} onClick={() => toggleVisibility('screen_time_breaks')}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p className='d-flex mt-3 mb-1'>Screen time breaks</p>
                                            <span className='text-xs text-[#16182399]'>Get reminded to take breaks from scrolling.</span>
                                            </div>
                                        </div>
                                       <div className='d-flex'>
                                            <span className='text-lg text-[#16182399]'>off</span>
                                            <img src={whiteRightArrow} alt="" />
                                       </div>
                                    </div>
                                    <div
                                        className={styles.accountCards} onClick={() => toggleVisibility('sleep_reminders')}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p className='d-flex mt-3 mb-1'>Sleep reminders</p>
                                            <span className='text-xs text-[#16182399]'>Get reminded about your sleep time.</span>
                                            </div>
                                        </div>
                                       <div className='d-flex'>
                                            <span className='text-lg text-[#16182399]'>off</span>
                                            <img src={whiteRightArrow} alt="" />
                                       </div>
                                    </div>
                                    <div
                                        className={styles.accountCards} >
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p className='d-flex mt-3 mb-1'>
                                            Weekly screen time updates</p>
                                            <span className='text-xs text-[#16182399]'>Stay updated on your time from your Inbox.</span>
                                            </div>
                                        </div>
                                        <label className="toggle-switch !left-1">
                                            <input 
                                            style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                                                type="checkbox"
                                                name="autoScrollCheckbox" 
                                                id="autoScrollCheckbox" 
                                                onChange={(event) => changeScreenTimeUpdates(event)}
                                            />
                                            <b className="slider"></b>
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div className={`${styles.suggestedContent} mb-0`}>
                                <div className='w-100 border-bottom '>
                                    <Accordion className='shadow-none px-0'>
                                        <AccordionSummary
                                        className='shadow-none px-0'
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                        >
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                                <p>Summary </p>
                                                <span className='text-xs text-[#16182399]'>Your weekly metrics include your time on the app and on seezitt.com.</span>
                                            </div>
                                        </div>
                                        </AccordionSummary>
                                        <AccordionDetails className='px-1 bg-[#f8f8f8]'>
                                           <TimeChart /> 
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                            <div ref={sectionRefs.filter_keywords}  className={styles.suggestedContent} >
                                <div className={`${styles.pageHeader} mb-0 mt-0`}>
                                    <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0`}>Content preferences</h4>
                                </div>
                                <div className='w-100 border-bottom pb-3'>
                                    <div
                                        className={styles.accountCards} onClick={() => toggleVisibility('filter_keywords')}>
                                        <div className={styles.settingName}>
                                            <div className='text-left'>
                                            <p>Filter keywords</p>
                                            <span className='text-xs text-[#16182399]'>When you filter a keyword, you won’t see posts in your selected feeds that contain that word in any
                                            titles, descriptions, or stickers. Certain keywords can’t be filtered.s</span>
                                            </div>
                                        </div>
                                        <img src={whiteRightArrow} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className={styles.settingsWrapper}>
                            <div className={`${styles.pageHeader} p-3`}>
                                <h4 className={darkTheme ? 'text-white' : 'text-black'}>Content & Activity</h4>
                            </div>
                            <div className={`${styles.suggestedContent}`}>
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
                                >
                                    <div
                                        className={styles.settingName}
                                        onClick={() => toggleVisibility('filter_keywords')}
                                    >
                                        <img src={contentIcon} alt="" />
                                        <p>Keywords</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div
                                    className={styles.accountCards}
                                onClick={handleOpenChangePassMainModal}
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
                        </div> */}
                        {/* <div className={styles.settingsWrapper}>
                            <div className={`${styles.pageHeader} p-3`}>
                                <h4 className={darkTheme ? 'text-white' : 'text-black'}>Support</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={handleEmailClick}>
                                        <img src={reportProblem} alt="" />
                                        <p>Report a problem</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={myReportsHandler}>
                                        <img src={myReports} alt="" />
                                        <p>My Reports</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                                <div className={styles.accountCards}>
                                    <div className={styles.settingName} onClick={contactUsHandler}>
                                        <img src={contactUS} alt="" />
                                        <p>Contact Us</p>
                                    </div>
                                    <img src={whiteRightArrow} alt="" />
                                </div>
                            </div>
                        </div> */}
                        {/* <div className={styles.settingsWrapper}>
                            <div className={`${styles.pageHeader} p-3`}>
                                <h4 className={darkTheme ? 'text-white' : 'text-black'}>About</h4>
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
                        </div> */}
                    </div>
                </div>
            </div>
            <ThemeProvider theme={darkTheme ? darkThemePalette : lightThemePalette}>
                {passwordSuccessModal && (
                    <>
                        <div>
                            <Modal
                                open={passwordSuccessModal}
                                onClose={handleCloseSuccessModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box
                                    sx={themeColor == 'dark' ? mainModalDarkstyle : mainModalstyle}
                                    style={{ width: '433px' }}
                                >
                                    <div style={{ marginBottom: '24px' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '25px',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
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
                                            background: 'rgb(255, 59, 92)',
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
                        <Modal
                            open={openChangePassMainModal}
                            onClose={handleCloseChangePassMainModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={themeColor == 'dark' ? mainModalDarkstyle : mainModalstyle}>
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
                                        className={darkTheme ? 'text-white' : 'text-black'}
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
                                            className={darkTheme ? 'text-white' : 'text-black'}
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
                                        color: 'white !important',
                                    }}
                                >
                                    Continue
                                </Button>
                            </Box>
                        </Modal>
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
                                                    color: 'rgb(255, 59, 92)',
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
                            <Box
                                sx={
                                    themeColor == 'dark'
                                        ? contentPrefDarkModalStyle
                                        : contentPrefModalStyle
                                }
                            >
                                <div className={styles.contentPrefHeader}>
                                    <h4 className={`${styles.contentPrefModalHeader} ${darkTheme !== '' ? 'text-white' : 'text-black'}`}>
                                        Content Preference
                                    </h4>
                                    <p className={styles.blueText}>
                                        Choose the topics that interest you most.
                                    </p>
                                    <p className={styles.greyText}>You can choose from 1 to 5 topics</p>
                                </div>
                                <div
                                    className={
                                        themeColor == 'dark'
                                            ? `${styles.whiteCards} `
                                            : `${styles.cards}`
                                    }
                                //{styles.cards}
                                >
                                    <FormGroup
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            color: 'white',
                                        }}
                                    >
                                        {categoriesData.map((category: any, index: number) => {
                                            return (
                                                <div className={`${styles.card} ${index === (categoriesData.length - 1) ? 'border-none' : ''}`}>
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
                                                                        color: 'rgb(255, 59, 92)',
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
                            <Box
                                sx={
                                    themeColor == 'dark'
                                        ? contentPrefDarkModalStyle
                                        : contentPrefModalStyle
                                }
                                style={{ height: '90vh', border: '0px' }}
                            >
                                <DeleteReasonPopup
                                    darkTheme={darkTheme}
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
                            <Box
                                sx={
                                    themeColor == 'dark'
                                        ? contentPrefDarkModalStyle
                                        : contentPrefModalStyle
                                }
                            >
                                <SwitchToPersonalPopup
                                    darkTheme={darkTheme}
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
                            <Box
                                sx={
                                    themeColor == 'dark'
                                        ? contentPrefDarkModalStyle
                                        : contentPrefModalStyle
                                }
                            >
                                <SwitchToBusinessPopup
                                    darkTheme={darkTheme}
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
                            <Box
                                sx={
                                    themeColor == 'dark'
                                        ? contentPrefDarkModalStyle
                                        : contentPrefModalStyle
                                }
                            >
                                <ShareProfilePopup theme={darkTheme} handleClose={handleCloseSwitchToBusinessModal} />
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
                                className={
                                    themeColor == 'dark'
                                        ? `${lightdarkTheme} rounded-lg p-6 w-[32.875rem] h-[33.875rem] flex flex-col`
                                        : `bg-white rounded-lg p-6 w-[32.875rem] h-[33.875rem] flex flex-col`
                                }
                            >
                                <p className="font-medium text-xl mb-2 text-center">
                                    Report a problem
                                </p>
                                <p className="font-normal text-base mb-4 text-center">
                                    Tell us your problem
                                </p>
                                <textarea
                                    className={`w-[478px] h-[214px] border border-gray-300 rounded-lg p-3 resize-none ${darkTheme !== '' ? 'bg-black' : 'bg-white'}`}
                                    placeholder="Please provide as much detail as possible"
                                    value={reportMessage}
                                    onChange={(e) => setReportMessage(e.target.value)}
                                />
                                {showReportError && <p className='text-red-600 text-sm font-semibold'>Please provide report details!</p>}
                                <p className="font-medium text-lg my-4 ">
                                    Upload supporting media
                                </p>
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
                                            <label htmlFor="fileToUpload">
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
                                                    id="fileToUpload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    // @ts-ignore
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                            </label>
                                        )}
                                    </div>
                                ) : (
                                    <label className="flex flex-row items-center rounded-md gap-2 border-[1.5px] px-3.5 py-2 mb-4 cursor-pointer">
                                        <input
                                            id="fileInput"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            // multiple
                                            // @ts-ignore
                                            onChange={handleImageChange}
                                        />
                                        <img src={upload} height={18.5} width={19.04} alt="" />
                                        <p>Upload photo (0/4)</p>
                                    </label>
                                )}
                                <button
                                    onClick={submitReportHandler}
                                    className="bg-[#DE0C0C] text-white font-semibold px-4 rounded-md w-full"
                                >
                                    <p className="text-[rgb(255, 59, 92)]">Submit</p>
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
                                <span className="font-bold text-lg text-[#222222] mb-8">
                                    Report submitted
                                </span>
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
                                    className="bg-[#DE0C0C] text-white font-semibold px-4 rounded-md w-full mt-3.5 py-3"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                        {/* </Box> */}
                    </Modal>
                )}
            </ThemeProvider>
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

var mainModalDarkstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 524,
    height: 'auto',
    minHeight: 259,
    bgcolor: 'rgb(18, 18, 18)',
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
    background: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    textTransform: 'none',
    color: 'white !important',
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
    background: 'var(--foundation-primary-primary-500, rgb(255, 59, 92))',
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
    border: '1px solid var(--foundation-primary-primary-500, rgb(255, 59, 92))',
    background: 'var(--default-white, #FFF)',

    color: 'var(--foundation-primary-primary-500, rgb(255, 59, 92))',
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

var contentPrefDarkModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 526,
    height: 'auto',
    maxHeight: 815,
    bgcolor: 'rgb(18, 18, 18)',
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
