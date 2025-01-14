import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import messages from '../src/languages-intl';
import styles from './App.module.scss';
import CommunityPage from './components/about-pages/community-guidelines';
import PrivacyPage from './components/about-pages/privacy-policy-page';
import TermsPage from './components/about-pages/terms-conditions-page';
import { ActivityPage } from './components/activity-page/activity-page';
// import ComingSoon from './components/coming-soon/coming-soon';
import ChatsSec from './components/user-chat/ChatComponent';
import { AllVideos } from './components/discover/components/allVideosPage';
import Discover from './components/discover/discover';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { RequestOtp } from './components/forgot-password/request-otp';

import { OtpVerification } from './components/forgot-password/otp-verification';
import HomePage from './components/homePage';
import FriendPage from './components/homePage/FriendPage';
import FollowingPage from './components/homePage/FollowingPage';
import MyReports from './components/my-reports';
import { PrivacySecurityPage } from './components/privacy-security-page/privacy-security-page';
import { Profile } from './components/profile/profile';
import { PublicProfile } from './components/profile/publicProfile';
import { PushNotificationsPage } from './components/push-notifications-page/push-notifications';
import { VideoProvider } from './components/reusables/VideoContext';
import { SearchPage } from './components/search-page/search-page';
import { SetNewPassword } from './components/set-newPassword/set-newPassword';
import Account from './components/settings-page/account';
import BalancePage from './components/settings-page/components/balance-page';
import GiftRevenuePage from './components/settings-page/components/gift-revenue-page';
import TransactionHistoryPage from './components/settings-page/components/transaction-history-page';
import WithdrawalLimitPage from './components/settings-page/components/withdrawal-limit-page';
import CreateStoryPage from './components/stories';
import { SuggestedAccountsPage } from './components/suggested-accounts-page/suggested-accounts-page';
import UploadPage from './components/upload';
import { useAuthStore } from './store/authStore';
import useApp from './useApp';
import GoLive from './components/go-live';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Analytics from './components/analytics';
import ContactUs from './components/contact-us';
import ItemLogin from './components/item-login';
import Loader from './components/loader';
import Signup from './components/signup';
import SignupEmail from './components/signup/email/email';
import Login from './components/login';
import ForgetPassword from './components/login/forget-password';
import PhoneOrEmail from './components/login/phone-or-email';
import { closeLoginPopup, closeLogoutPopup } from './redux/reducers';
import {
    loginService,
    loginWithGoogleService,
    loginWithFBService,
    signupService,
    logoutUserPopup,
} from './redux/reducers/auth';
import {
    APP_TEXTS,
    END_POINTS,
    LOGIN_OPTIONS,
    METHOD,
    STATUS_CODE,
    showToastError,
    showToastSuccess,
    SIGNUP_APP_TEXTS,
    SIGNUP_OPTIONS,
} from './utils/constants';
import { back, checkCountryCode, chevronDown, search, closeIcon, fb } from './icons';
import { useGoogleLogin } from '@react-oauth/google';
import { validateEmail } from '../src/utils/common';
import SignupHandler from '../src/components/signup/signupHandler';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import style from './components/homePage/index.module.scss';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { setGeoData } from './redux/reducers/geoServices';
import VideoPage from './components/shared-video';
import PostPage from './components/shared-post';
import PostAnalytics from './components/analytics/PostAnalytics';
import CommentAnalytics from './components/analytics/PostAnalytics/CommentAnalytics';
import { db } from './utils/db';
import { useUpdateEffect } from 'react-use';
import SoundPage from './components/sound-module/SoundPage';

// Functional component to handle the initial route navigation
const InitialRouteHandler = () => {
    const navigate = useNavigate();
    const storedToken = useAuthStore.getState().token;

    useEffect(() => {
        if (storedToken) {
            // If a token is stored, set the user as logged in
            useAuthStore.setState({
                isLoggedIn: true,
                token: storedToken,
            });
        }
        // Allow navigation to /home regardless of login status
        navigate('/home');
    }, [navigate, storedToken]);

    return null; // Render nothing, as this component is used only for the initial route handling
};

function App() {
    const { } = useApp();
    const [appLanguage, setAppLanguage] = useState(
        (window.localStorage.getItem('lang') as string) || 'en'
    );
    const setLanguage = (language: string) => {
        setAppLanguage(language);
        window.localStorage.setItem('lang', language);
    };
    // window.localStorage.setItem('theme', "light");
    // var themeColor = window.localStorage.getItem('theme');

    // if(themeColor == "dark"){
    //     const divElements = document.querySelectorAll('div');
    //     const aElements = document.querySelectorAll('a');
    //     const pElements = document.querySelectorAll('p');
    //     const h1Elements = document.querySelectorAll('h1');
    //     const h2Elements = document.querySelectorAll('h2');
    //     const h3Elements = document.querySelectorAll('h3');
    //     const h4Elements = document.querySelectorAll('h4');
    //     const h5Elements = document.querySelectorAll('h5');
    //     divElements.forEach((div: HTMLElement) => {
    //       div.style.background = 'black';
    //       div.style.color = 'white';
    //     });
    //     aElements.forEach((a: HTMLElement) => {
    //         a.style.color = 'white';

    //       });
    //       pElements.forEach((p: HTMLElement) => {
    //         p.style.color = 'white';
    //       });
    // }

    // useEffect(() => {

    //     if(themeColor == "dark"){
    //         // const divElements = document.querySelectorAll('div');
    //         // const aElements = document.querySelectorAll('a');
    //         // const pElements = document.querySelectorAll('p');
    //         // const h1Elements = document.querySelectorAll('h1');
    //         // const h2Elements = document.querySelectorAll('h2');
    //         // const h3Elements = document.querySelectorAll('h3');
    //         // const h4Elements = document.querySelectorAll('h4');
    //         // const h5Elements = document.querySelectorAll('h5');
    //         // divElements.forEach((div: HTMLElement) => {
    //         //   div.style.background = 'black';
    //         //   div.style.color = 'white';
    //         // });
    //         // aElements.forEach((a: HTMLElement) => {
    //         //     a.style.color = 'white';

    //         //   });
    //         //   pElements.forEach((p: HTMLElement) => {
    //         //     p.style.color = 'white';
    //         //   });
    //     }else{
    //     //     const divElements = document.querySelectorAll('div');
    //     //     const aElements = document.querySelectorAll('a');
    //     //     const pElements = document.querySelectorAll('p');
    //     //     const h1Elements = document.querySelectorAll('h1');
    //     //     const h2Elements = document.querySelectorAll('h2');
    //     //     const h3Elements = document.querySelectorAll('h3');
    //     //     const h4Elements = document.querySelectorAll('h4');
    //     //     const h5Elements = document.querySelectorAll('h5');
    //     //     divElements.forEach((div: HTMLElement) => {
    //     //       div.style.background = 'none';
    //     //       div.style.color = 'black';
    //     //     });
    //     //     aElements.forEach((a: HTMLElement) => {
    //     //         a.style.color = 'black';

    //     //       });
    //     //       pElements.forEach((p: HTMLElement) => {
    //     //         p.style.color = 'black';
    //     //       });
    //     }

    // }, []);

    const [loginWithPhone, setLoginWithPhone] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isMainLoginOption, setIsMainLoginOption] = useState(true);
    const [isMainSignupOption, setIsMainSignupOption] = useState(true);
    const [isLoginSection, setIsLoginSection] = useState(true);
    const [isForgotPasswordScenario, setIsForgotPasswordScenario] = useState(false);
    const isLoginPopup = useSelector((store: any) => store?.reducers?.popupSlice?.isLoginPopup);
    const isLogoutPopup = useSelector((store: any) => store?.reducers?.popupLogoutSlice?.isLogoutPopup);
    const { country_name } = useSelector(
        (state: any) => state?.reducers?.geo
    );
    const dispatch = useDispatch<any>();
    const [error, setError] = useState<string>('');
    const [code, setCode] = useState<any>(null);
    const [loginWithPassword, setLoginWithPassword] = useState<boolean>(false);
    const [countryModelOpened, setCountryModelOpened] = useState<boolean>(false);
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(-1);
    const API_KEY = process.env.VITE_API_URL;

    // Input Values
    const [phoneNumber, setPhoneNumber] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('');
    const [isoCode, setIsoCode] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordBorderColor, setPasswordBorderColor] = useState('');
    const [loadingOtp, setLoadingOtp] = useState<boolean>(false);
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

    const [signupWithPhone, setSignupWithPhone] = useState<boolean>(false);
    const [signupNext, setSignupNext] = useState<boolean>(false);
    const [name, setName] = useState<any>(null);
    const [dateOfBirth, setDateOfBirth] = useState<any>(null);
    const [emailIdError, setEmailIdError] = useState<boolean>(false);
    const [otpbuttonText, setOtpbuttonText] = useState<string>('Send code');
    const [otpCode, setOtpCode] = useState<string>('');
    const [otpError, setOtpError] = useState<boolean>(false);
    const [darkTheme, setdarkTheme] = useState('');
    const [lightDarkTheme, setlightDarkTheme] = useState('');
    const [darkWhiteTheme, setDarkWhiteTheme] = useState('');
    const [textColor, setTextColor] = useState('text-black');

    const signupItemClickHandler = (name: string) => {
        switch (name) {
            case 'Use Phone or Email':
                setIsMainSignupOption(!isMainSignupOption);
                break;
            case 'Continue with Facebook':
                break;
            case 'Continue with Google':
                loginWithGoogleHandler();
                break;
            default:
                console.log('Default case');
        }
    };

    const loginItemClickHandler = (name: string) => {
        switch (name) {
            case APP_TEXTS.QR_CODE:
                // Handle QR code login
                console.log('QR Code login');
                break;
            case APP_TEXTS.EMAIL_OR_PHONE:
                // Handle phone / email / username login
                // navigate('/login/phone-or-email');
                setIsMainLoginOption(!isMainLoginOption);
                break;
            case APP_TEXTS.FACEBOOK:
                console.log('Facebook login');
                break;
            case APP_TEXTS.GOOGLE:
                // Handle Google login
                loginWithGoogleHandler();
                console.log('Google login');
                break;
            case APP_TEXTS.TWITTER:
                // Handle Twitter login
                console.log('Twitter login');
                break;
            case APP_TEXTS.APPLE:
                // Handle Apple login
                console.log('Apple login');
                break;
            default:
                console.log('Default case');
        }
    };

    const loginWithGoogleHandler = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log('Google Auth : ', tokenResponse);
            loginWithGoogleAccessToken(tokenResponse?.access_token);
        },
        onError: (error) => {
            console.log('Error : ', error);
        },
        onNonOAuthError(nonOAuthError) {
            console.log('No Auth : ', nonOAuthError);
        },
    });

    const loginWithGoogleAccessToken = async (accessToken: string) => {
        dispatch(loginWithGoogleService({ accessToken }))
            .then((res: any) => {
                if (res?.error) {
                    console.log('Response error : ', res?.error);
                } else if (res?.payload?.status == 200) {
                    console.log('data after successfull login', res?.payload?.data);
                    window.location.href = '/home';
                }
            })
            .catch((error: any) => {
                console.log('Error login with google : ', error);
            });
    };

    const toggleLoginMethod = () => {
        setLoginWithPhone(!loginWithPhone);
    };

    const toggleSignupMethod = () => {
        setSignupWithPhone(!signupWithPhone);
    };

    const signupNextScreen = async () => {
        if (email && validateEmail(email)) {
            setEmailIdError(false);
        } else {
            setEmailIdError(true);
        }
        try {
            const response: any = await fetch(`${API_KEY}/auth/verifyOtp`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email: email, otp: Number(otpCode) }),
            });
            const data: any = await response.json();
            if (data.status == 200) {
                setOtpError(false);
                setSignupNext(true);
            } else {
                setOtpError(true);
            }

        } catch (error) {
            console.log('send otp error:', error);
        }
    };

    const simpleLoginHandler = async () => {
        let loginObj;
        if (loginWithPhone) {
            loginObj = { password, phoneNumber: countryCode + phoneNumber };
        } else {
            loginObj = { password, email };
        }
        setIsLoading(true);
        dispatch(loginService(loginObj))
            .then((res: any) => {
                if (res?.error) {
                    setIsError(true);
                    setPasswordBorderColor('border-red-400');
                    setErrorMessage(res?.payload || res?.error?.message);
                    setIsLoading(false);
                } else if (res?.payload?.status == STATUS_CODE.OK) {
                    console.log('data after successfull login', res?.payload?.data);
                    setIsLoading(false);
                    closeLoginPopupHandler();
                    window.location.href = '/home';
                }
            })
            .catch((error: any) => {
                setIsError(true);
                setIsLoading(false);
            });
    };

    const loginHandler = async () => {
        let reqJon: any = {
            password,
            otp: code,
        };

        if (email?.length > 0) {
            reqJon['email'] = email;
        } else {
            reqJon['phoneNumber'] = phoneNumber;
        }
        if (
            (phoneNumber?.length > 0 || email.length > 0) &&
            code?.length > 0 &&
            password?.length > 0
        ) {
            try {
                const response: any = await fetch(`${API_KEY}/${END_POINTS.SET_NEW_PASSWORD}`, {
                    method: METHOD.PATCH,
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(reqJon),
                });
                const data: any = await response.json();

                handleSignInSubmit();

                // Here i've to confirm from team that i should rather call dispatch(loginService({ password, email })
                // OR i should manipulate the state using response of same API
            } catch (error) {
                console.log('🚀 ~ fetchCountriesList ~ error:', error);
            }
        }
    };

    const useGeoService = async () => {
        try {
            // Get the IP address
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const ipAddress = ipData.ip;

            // Get geolocation data based on the IP address
            const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
            const { country_calling_code, country_code, country_name } = await geoResponse.json();

            // Set country calling code based on location
            setCountryCode(country_calling_code);

            // Set isoCode based on location
            setIsoCode(country_code);

            dispatch(
                setGeoData({
                    country_name,
                    country_calling_code,
                    country_code,
                })
            );
        } catch (error) {
            console.log('🚀 ~ fetchGeoData ~ error:', error);
        }
    };

    const signupHandler = async () => {
        let signupObj;
        if (loginWithPhone) {
            signupObj = { password, phoneNumber: countryCode + phoneNumber, dateOfBirth, name };
        } else {
            signupObj = { password, email, dateOfBirth, name };
        }

        // return false;
        setIsLoading(true);
        dispatch(signupService(signupObj))
            .then((res: any) => {
                console.log('res', res);
                if (res?.payload?.status == 400) {
                    console.log('res 1', res);
                    setIsError(true);
                    // setPasswordBorderColor('border-red-400');
                    // setErrorMessage(res?.payload || res?.payload?.message);
                    setErrorMessage(res?.payload?.message);
                    setIsLoading(false);
                } else if (res?.payload?.status == 200) {
                    console.log('res 2', res);
                    console.log('data after successfull login', res?.payload?.data);

                    localStorage.setItem('userId', res?.payload?.data?._id || '');
                    localStorage.setItem('token', res?.payload?.data?.token || '');
                    localStorage.setItem('profile', JSON.stringify(res?.payload?.data) || '');
                    db.profile.add(res?.payload?.data);
                    useAuthStore.setState(res?.payload?.data);

                    setIsLoading(false);
                    closeLoginPopupHandler();
                    // navigate('/home');
                    window.location.href = '/home';
                }
            })
            .catch((error: any) => {
                console.log('error', error);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const handleSignInSubmit = () => {
        setLoadingLogin(true);
        dispatch(loginService({ password, email }))
            .then((res: any) => {
                if (res?.error) {
                    showToastError(res?.message || 'Error Logging in');
                    setLoadingLogin(false);
                    return;
                }

                if (res?.payload?.status == STATUS_CODE.OK) {
                    setLoadingLogin(false);
                    closeLoginPopupHandler();
                    window.location.href = '/home';
                }
            })
            .catch(() => {
                setLoadingLogin(false);
            });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event: { target: { value: any } }) => {
        const inputValue = event.target.value;

        if (/^\d{0,6}$/.test(inputValue)) {
            setCode(inputValue);
            setError('');
        } else {
            setError('Enter 6-digit code');
        }
    };

    const loginOrForgetPasswordHandler = () => {
        if (loginWithPhone && !loginWithPassword) {
            loginWithPasswordToggler();
        }
        // else {
        // forgetPasswordHandler();
        // }
    };

    const loginWithPasswordToggler = () => {
        setLoginWithPassword(!loginWithPassword);
    };

    const forgetPasswordHandler = () => {
        setIsForgotPasswordScenario(true);
        // navigate('/login/forget-password', { state: { showEmail: !loginWithPhone } });
    };

    const countryCodeModelHandler = () => {
        setCountryModelOpened(!countryModelOpened);
    };

    const modelClickHandler = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
    };

    // Filter country codes based on search query
    const filteredCountryCodes = countryCodes?.filter((countryItem: any) =>
        countryItem?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const countryItemClickHandler = (
        countryItem: { name: string; code: string; iso: string },
        index: number
    ) => {
        setSelectedCountryIndex(index);
        setCountryCode(countryItem?.code);
        setIsoCode(countryItem?.iso);
        countryCodeModelHandler();
    };

    const sendOTP = async () => {
        if (phoneNumber?.length > 0 || email.length > 0) {
            var reqJon: any = {};
            if (email?.length > 0) {
                reqJon['email'] = email;
            } else {
                reqJon['phoneNumber'] = phoneNumber;
            }
            setLoadingOtp(true);
            try {
                const response: any = await fetch(`${API_KEY}/${END_POINTS.FORGOT_PASSWORD}`, {
                    method: METHOD.POST,
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(reqJon),
                });
                const data: any = await response.json();
                setLoadingOtp(false);

                if (data?.status === STATUS_CODE.OK) {
                    showToastSuccess(data?.message);
                } else {
                    showToastError(data?.message);
                }
            } catch (error) {
                setLoadingOtp(false);
                console.log('🚀 ~ fetchCountriesList ~ error:', error);
            }
        }
    };

    const fetchCountriesList = async () => {
        try {
            const response: any = await fetch(`${API_KEY}/${END_POINTS.COUNTRY_LIST}`, {
                method: METHOD.GET,
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const { data }: any = await response.json();

            // Setting all values to countryCodes state
            setCountryCodes(data?.countries);
        } catch (error) {
            console.log('🚀 ~ fetchCountriesList ~ error:', error);
        }
    };

    const sendOTPCode = async () => {
        if (email && validateEmail(email)) {
            setEmailIdError(false);
        } else {
            setEmailIdError(true);
        }
        try {
            const response: any = await fetch(`${API_KEY}/auth/request-verify-email`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
            const { data }: any = await response.json();

            setOtpbuttonText('Resend');

        } catch (error) {
            console.log('send otp error:', error);
        }
    };

    const passwordOperationsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setIsError(false);
        setPasswordBorderColor('');
    };

    const goBackHandler = () => {
        if (isForgotPasswordScenario) {
            setIsForgotPasswordScenario(false);
        } else {
            setIsMainLoginOption(true);
        }
    };

    const closeLoginPopupHandler = () => {
        dispatch(closeLoginPopup());
        setIsMainLoginOption(true);
    };

    useEffect(() => {
        fetchCountriesList();
        useGeoService();
    }, []);

    const handleLoginClick = () => {
        setIsLoginSection(false);
    };

    const handleSignUpMainScreen = () => {
        setIsMainSignupOption(true);
    };

    const handleLoginpopupClick = () => {
        setIsLoginSection(true);
    };

    const handleSignupClick = () => {
        setIsLoginSection(false);
    };

    const goBackSignupHandler = () => {
        setIsMainLoginOption(true);
        setSignupNext(false);
    };

    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');
    const [isInvalidDate, setIsInvalidDate] = useState(false);

    useUpdateEffect(() => {
        if (month && date && year) {
            let dob = year + '-' + month.toString().padStart(2,"0") + '-' + date.toString().padStart(2,"0");
            const parsedDob = new Date(dob);
            const currentDate = new Date();
            if (parsedDob > currentDate) {
                console.log('Invalid date of birth');
                setIsInvalidDate(true);
            } else {
                setDateOfBirth(dob);
                setIsInvalidDate(false);
            }
        }
    }, [month, date, year]);

    const handleMonthChange = (event: SelectChangeEvent) => {
        setMonth(event.target.value as string);
        // let dob= date +"-"+ month+"-"+year;
        // setDateOfBirth(dob);
        // console.log(dob);
    };

    const handleDateChange = (event: SelectChangeEvent) => {
        setDate(event.target.value as string);
        // let dob= date +"-"+ month+"-"+year;
        // setDateOfBirth(dob);
        // console.log(dob);
    };

    const handleYearChange = (event: SelectChangeEvent) => {
        setYear(event.target.value as string);
        // let dob= date +"-"+ month+"-"+year;
        // setDateOfBirth(dob);
        // console.log(dob);
    };


    const closeLogoutPopupHandler = () => {
        dispatch(closeLogoutPopup());
    };

    const logoutAccount = () => {
        dispatch(logoutUserPopup());
        // dispatch(openLogoutPopup())
    };

    function generateMenuItems() {
        const rows = [];
        let i = 2025; // Start with 2025
        const len = 1900; // End at 1900

        while (i >= len) {
            rows.push(
                <MenuItem key={i} value={i}>
                    {i}
                </MenuItem>
            );
            i--; // Decrement i in each iteration
        }

        return rows;
    }

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        const rootStyle = document.documentElement.style;

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
            setlightDarkTheme(style.lightdarkTheme);
            setDarkWhiteTheme('');
            setTextColor('text-white');
            rootStyle.setProperty("--scrollbar-track-color", "#2c2c2c");
            rootStyle.setProperty("--scrollbar-thumb-color", "#505050");
        } else {
            setDarkWhiteTheme('hover:bg-slate-100');
            setTextColor('text-black');
            rootStyle.setProperty("--scrollbar-track-color", "#f0f0f0");
            rootStyle.setProperty("--scrollbar-thumb-color", "#a0a0a0");
        }
    });

    useLayoutEffect(() => {
        const adjustVideoSize = () => {
            console.log('adjusting video size');
            if (!window) return;
            const { innerWidth, innerHeight } = window;
            const rootStyle = document.documentElement.style;
            if (innerWidth < 700) {
                rootStyle.setProperty("--media-post-height", `${innerHeight}px`);
                rootStyle.setProperty("--media-post-width", `${innerWidth}px`);
                return;
            }
            const aspectRatio = 16 / 9;
            const videoWidth = innerHeight / aspectRatio;
            const videoHeight = innerHeight - 100;
            rootStyle.setProperty("--media-post-height", `${videoHeight}px`);
            rootStyle.setProperty("--media-post-width", `${videoWidth}px`);
        }
        adjustVideoSize();
        window.addEventListener('resize', adjustVideoSize);

        return () => {
            window.removeEventListener('resize', adjustVideoSize);
        };
    }, [])

    const responseFacebook = (response: any) => {
        loginWithFBAccessToken(response?.access_token);
    };

    const loginWithFBAccessToken = async (accessToken: string) => {
        dispatch(loginWithFBService({ accessToken }))
            .then((res: any) => {
                if (res?.error) {
                    console.log('Response error : ', res?.error);
                } else if (res?.payload?.status == 200) {
                    console.log('data after successfull login', res?.payload?.data);
                    window.location.href = '/home';
                }
            })
            .catch((error: any) => {
                console.log('Error login with google : ', error);
            });
    };

    return (
        <IntlProvider locale={appLanguage} messages={messages[appLanguage]}>
            <div className={styles.App}>
                <VideoProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<InitialRouteHandler />} />
                            {/* <Route
                                path="/auth"
                                element={
                                    <Authentication
                                        setLanguage={setLanguage}
                                        language={appLanguage}
                                    />
                                }
                            /> */}
                            <Route
                                path="/auth"
                                element={<Login />}
                            // element={<Login setLanguage={setLanguage} language={appLanguage} />}
                            />
                            <Route path="/login/phone-or-email" element={<PhoneOrEmail />} />
                            <Route path="/login/forget-password" element={<ForgetPassword />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/request-verification-otp" element={<RequestOtp />} />
                            <Route path="/otp-verification/:email" element={<OtpVerification />} />
                            <Route path="/retrieve/*" element={<SetNewPassword />} />
                            <Route path="/view/video/:onePost" element={<HomePage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/suggested-accounts" element={<SuggestedAccountsPage />} />
                            <Route path="/following" element={<FollowingPage />} />
                            <Route path="/friends" element={<FriendPage />} />
                            <Route path="/notifications" element={<ActivityPage />} />
                            <Route path="/chat" element={<ChatsSec />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/profile/:id" element={<PublicProfile />} />
                            <Route path="/settings/account" element={<Account />} />
                            <Route
                                path="/settings/account/activity"
                                element={<PushNotificationsPage />}
                            />
                            <Route
                                path="/settings/account/privacy-settings"
                                element={<PrivacySecurityPage />}
                            />
                            <Route path="/settings/account/balance" element={<BalancePage />} />
                            <Route
                                path="/settings/account/transaction-history"
                                element={<TransactionHistoryPage />}
                            />
                            <Route
                                path="/settings/account/gift-revenue"
                                element={<GiftRevenuePage />}
                            />
                            <Route
                                path="/settings/account/withdrawal-limit"
                                element={<WithdrawalLimitPage />}
                            />
                            <Route path="/sounds/:soundId" element={<SoundPage />} />
                            <Route path="/about/terms-conditions" element={<TermsPage />} />
                            <Route path="/about/community-guidelines" element={<CommunityPage />} />
                            <Route path="/about/privacy-policy" element={<PrivacyPage />} />
                            <Route path="/SearchPage/:query/:tab" element={<SearchPage />} />
                            <Route path="/discover/:hashtag?" element={<Discover />} />
                            <Route path="/videos/:id" element={<AllVideos />} />
                            <Route path="/:username/video/:videoId" element={<VideoPage />} />
                            <Route path="/:username/post/:postId" element={<PostPage />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route path="/create-story" element={<CreateStoryPage />} />
                            <Route path="/golive" element={<GoLive />} />
                            <Route path="/myreports" element={<MyReports />} />
                            <Route path="/analytics/:tab?" element={<Analytics />} />
                            <Route path="/analytics/post/:postId" element={<PostAnalytics />} />
                            <Route path="/analytics/comment/:postId" element={<CommentAnalytics />} />
                            <Route path="/contactus" element={<ContactUs />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/signup/phone-or-email/email" element={<SignupEmail />} />
                            {/* <Route path="/signup/phone-or-email/phone" element={<SignupPhone />} /> */}
                        </Routes>

                        {isLoginPopup && (
                            <div className="w-full z-50 h-full bg-black/50 fixed top-0 flex justify-center items-center">
                                <div
                                    className={`w-[30.688rem] mx-auto mt-3 bg-white py-4 rounded-lg relative h-[42.125rem]  ${lightDarkTheme} `}
                                >
                                    <div
                                        onClick={closeLoginPopupHandler}
                                        className="bg-gray-100/50 rounded-full h-10 w-10 flex flex-row justify-center items-center absolute right-5 p-1 cursor-pointer"
                                    >
                                        <img className="h-4 w-4 object-contain" src={closeIcon} />
                                    </div>
                                    {isLoginSection ? (
                                        <>
                                            <div className="overflow-auto w-[21.888rem] mx-auto ">
                                                <h2
                                                    className={`font-bold text-3xl mt-5 mb-4 ${textColor}`}
                                                >
                                                    {isMainLoginOption
                                                        ? 'Log in to Seezitt'
                                                        : isForgotPasswordScenario
                                                            ? 'Reset Password'
                                                            : 'Log in'}
                                                </h2>
                                                {isMainLoginOption ? (
                                                    <>
                                                        {LOGIN_OPTIONS?.map((option, index) => (
                                                            <ItemLogin
                                                                loginItemClickHandler={
                                                                    loginItemClickHandler
                                                                }
                                                                key={index}
                                                                name={option.name}
                                                                image={option.image}
                                                                styles={option.styles}
                                                            />
                                                        ))}
                                                        <div className="mt-3">
                                                            <FacebookLogin
                                                                appId="281129028310496"
                                                                autoLoad={false}
                                                                fields="name,email,picture"
                                                                callback={responseFacebook}
                                                                render={(renderProps: {
                                                                    onClick: () => void;
                                                                }) => (
                                                                    <div
                                                                        onClick={
                                                                            renderProps.onClick
                                                                        }
                                                                        className={`rounded-[0.5rem] font-medium text-base flex flex-row items-center border border-loginItem h-11 px-3 cursor-pointer hover:bg-slate-100 `}
                                                                    >
                                                                        <img
                                                                            className="object-contain h-5 w-5"
                                                                            src={fb}
                                                                        />
                                                                        <p className="mx-auto text-[0.938rem]">
                                                                            Continue with Facebook
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex flex-row justify-between items-center mt-3.5">
                                                            <p className="font-medium text-[0.938rem]">
                                                                {loginWithPhone &&
                                                                    !isForgotPasswordScenario
                                                                    ? 'Phone'
                                                                    : isForgotPasswordScenario &&
                                                                        loginWithPhone
                                                                        ? 'Enter phone number'
                                                                        : isForgotPasswordScenario &&
                                                                            !loginWithPhone
                                                                            ? 'Enter email address'
                                                                            : 'Email or username'}
                                                            </p>
                                                            <p
                                                                onClick={toggleLoginMethod}
                                                                className="font-medium text-xs text-gray-600 cursor-pointer hover:underline"
                                                            >
                                                                {loginWithPhone &&
                                                                    !isForgotPasswordScenario
                                                                    ? 'Log in with email or username'
                                                                    : isForgotPasswordScenario &&
                                                                        !loginWithPhone
                                                                        ? 'Reset with phone number'
                                                                        : isForgotPasswordScenario &&
                                                                            loginWithPhone
                                                                            ? 'Reset with email'
                                                                            : 'Log in with phone'}
                                                            </p>
                                                        </div>
                                                        {loginWithPhone ? (
                                                            <>
                                                                <div className="flex flex-row items-center border border-gray-500 bg-login-btn mt-2 rounded-md p-2.5">
                                                                    <div
                                                                        onClick={
                                                                            countryCodeModelHandler
                                                                        }
                                                                        className="flex flex-row items-center gap-2 flex-1 cursor-pointer relative text-black"
                                                                    >
                                                                        <p>
                                                                            {isoCode +
                                                                                ' ' +
                                                                                countryCode}
                                                                        </p>
                                                                        <img
                                                                            className={`object-contain h-2.5 w-2.5 chevron ${countryModelOpened
                                                                                ? 'rotate'
                                                                                : ''
                                                                                }`}
                                                                            src={chevronDown}
                                                                        />
                                                                        <p className="text-gray-400 ">
                                                                            {' '}
                                                                            |{' '}
                                                                        </p>
                                                                        {countryModelOpened && (
                                                                            <div
                                                                                onClick={
                                                                                    modelClickHandler
                                                                                }
                                                                                className={`absolute ${filteredCountryCodes.length ===
                                                                                    0
                                                                                    ? 'h-fit'
                                                                                    : 'h-80'
                                                                                    }  w-80 bg-white top-11 -left-2.5 rounded-md shadow-md cursor-default z-10`}
                                                                            >
                                                                                <div className="flex flex-row items-center p-2 gap-2">
                                                                                    <img
                                                                                        className="object-contain h-3 w-3 m-2"
                                                                                        src={search}
                                                                                    />
                                                                                    <input
                                                                                        type="text"
                                                                                        placeholder="Search"
                                                                                        className="w-full text-sm font-normal caret-red-500 bg-white"
                                                                                        value={
                                                                                            searchQuery
                                                                                        }
                                                                                        onChange={
                                                                                            handleSearchChange
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="w-full h-[1px] bg-gray-300" />
                                                                                <div
                                                                                    className={`overflow-y-auto ${filteredCountryCodes.length ===
                                                                                        0
                                                                                        ? 'h-fit'
                                                                                        : 'max-h-[17.188rem]'
                                                                                        } `}
                                                                                >
                                                                                    {filteredCountryCodes.map(
                                                                                        (
                                                                                            countryItem: any,
                                                                                            index: number
                                                                                        ) => (
                                                                                            <div
                                                                                                onClick={() =>
                                                                                                    countryItemClickHandler(
                                                                                                        countryItem,
                                                                                                        index
                                                                                                    )
                                                                                                }
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                className={`flex flex-row justify-between items-center p-2.5 cursor-pointer mb-2 rounded-b-md ${selectedCountryIndex ===
                                                                                                    index
                                                                                                    ? 'bg-gray-50'
                                                                                                    : ''
                                                                                                    }`}
                                                                                            >
                                                                                                <p
                                                                                                    className={`font-normal text-black text-left text-xs hover:bg-gray-50`}
                                                                                                >
                                                                                                    {countryItem?.name +
                                                                                                        ' ' +
                                                                                                        countryItem?.code}
                                                                                                </p>
                                                                                                {selectedCountryIndex ===
                                                                                                    index && (
                                                                                                        <img
                                                                                                            className="h-4 w-4 object-contain"
                                                                                                            alt="check-mark"
                                                                                                            src={
                                                                                                                checkCountryCode
                                                                                                            }
                                                                                                        />
                                                                                                    )}
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                                    {filteredCountryCodes.length ===
                                                                                        0 && (
                                                                                            <p className="font-normal text-gray-400 text-xs hover:bg-gray-50 my-2">
                                                                                                {
                                                                                                    APP_TEXTS.NO_RESULT_FOUND
                                                                                                }
                                                                                            </p>
                                                                                        )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <input
                                                                        className="w-2/3 bg-login-btn"
                                                                        type="tel"
                                                                        placeholder="Phone number"
                                                                        value={phoneNumber}
                                                                        onChange={(e) =>
                                                                            setPhoneNumber(
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                {isForgotPasswordScenario && (
                                                                    <>
                                                                        <div className="flex flex-row items-center border border-gray-500 bg-login-btn mt-2 rounded-md py-2.5 px-3">
                                                                            <input
                                                                                className="w-2/3 bg-login-btn"
                                                                                type="number"
                                                                                maxLength={6}
                                                                                placeholder="Enter 6-digit code"
                                                                                value={code}
                                                                                onChange={
                                                                                    handleChange
                                                                                }
                                                                            />
                                                                            <div
                                                                                className={`flex flex-row justify-center items-center gap-2 flex-1 ${phoneNumber?.length >
                                                                                    0 ||
                                                                                    email.length > 0
                                                                                    ? 'cursor-pointer'
                                                                                    : 'cursor-not-allowed'
                                                                                    }`}
                                                                            >
                                                                                <p className="text-gray-400 ">
                                                                                    {' '}
                                                                                    |{' '}
                                                                                </p>
                                                                                <p
                                                                                    onClick={
                                                                                        sendOTP
                                                                                    }
                                                                                    className={`text-sm ${phoneNumber?.length >
                                                                                        0 ||
                                                                                        email.length >
                                                                                        0
                                                                                        ? textColor
                                                                                        : 'text-gray-400'
                                                                                        }`}
                                                                                >
                                                                                    {
                                                                                        APP_TEXTS.SEND_CODE
                                                                                    }
                                                                                </p>
                                                                                {loadingOtp && (
                                                                                    <Loader />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        {error && (
                                                                            <p className="text-red-500 font-normal text-xs text-left mt-2">
                                                                                {error}
                                                                            </p>
                                                                        )}
                                                                    </>
                                                                )}
                                                                <div className="flex flex-row justify-between items-center border border-gray-500 bg-login-btn mt-2 rounded-md py-2.5 px-3 text-black">
                                                                    <input
                                                                        className="w-2/3 bg-login-btn"
                                                                        type={
                                                                            showPassword
                                                                                ? 'text'
                                                                                : 'password'
                                                                        }
                                                                        placeholder="Password"
                                                                        value={password}
                                                                        onChange={(e) =>
                                                                            setPassword(
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    />
                                                                    {!showPassword ? (
                                                                        <Visibility
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                            }}
                                                                            onClick={togglePassword}
                                                                        />
                                                                    ) : (
                                                                        <VisibilityOff
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                            }}
                                                                            onClick={togglePassword}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="flex flex-row items-center border border-gray-500 bg-login-btn mt-2 rounded-md p-2.5">
                                                                    <input
                                                                        className="w-2/3 bg-login-btn"
                                                                        type="text"
                                                                        placeholder={`${isForgotPasswordScenario
                                                                            ? 'Email address'
                                                                            : 'Email or username'
                                                                            }`}
                                                                        value={email}
                                                                        onChange={(e) =>
                                                                            setEmail(e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                                {isForgotPasswordScenario && (
                                                                    <>
                                                                        <div className="flex flex-row items-center border border-gray-500 bg-login-btn mt-2 rounded-md py-2.5 px-3">
                                                                            <input
                                                                                className="w-2/3 bg-login-btn"
                                                                                type="number"
                                                                                maxLength={6}
                                                                                placeholder="Enter 6-digit code"
                                                                                value={code}
                                                                                onChange={
                                                                                    handleChange
                                                                                }
                                                                            />
                                                                            <div
                                                                                className={`flex flex-row justify-center items-center gap-2 flex-1 ${phoneNumber?.length >
                                                                                    0 ||
                                                                                    email.length > 0
                                                                                    ? 'cursor-pointer'
                                                                                    : 'cursor-not-allowed'
                                                                                    }`}
                                                                            >
                                                                                <p className="text-gray-400 ">
                                                                                    {' '}
                                                                                    |{' '}
                                                                                </p>
                                                                                <p
                                                                                    onClick={
                                                                                        sendOTP
                                                                                    }
                                                                                    className={`text-sm ${phoneNumber?.length >
                                                                                        0 ||
                                                                                        email.length >
                                                                                        0
                                                                                        ? textColor
                                                                                        : 'text-gray-400'
                                                                                        }`}
                                                                                >
                                                                                    {
                                                                                        APP_TEXTS.SEND_CODE
                                                                                    }
                                                                                </p>
                                                                                {loadingOtp && (
                                                                                    <Loader />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        {error && (
                                                                            <p className="text-red-500 font-normal text-xs text-left mt-2">
                                                                                {error}
                                                                            </p>
                                                                        )}
                                                                    </>
                                                                )}
                                                                <div
                                                                    className={`flex flex-row justify-between items-center border-[1px] ${passwordBorderColor} bg-login-btn mt-2 rounded-md py-2.5 px-3`}
                                                                >
                                                                    <input
                                                                        className="w-2/3 bg-login-btn"
                                                                        type={
                                                                            showPassword
                                                                                ? 'text'
                                                                                : 'password'
                                                                        }
                                                                        placeholder="Password"
                                                                        value={password}
                                                                        onChange={(e) =>
                                                                            passwordOperationsHandler(
                                                                                e
                                                                            )
                                                                        }
                                                                    />
                                                                    {!showPassword ? (
                                                                        <Visibility
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                            }}
                                                                            onClick={togglePassword}
                                                                        />
                                                                    ) : (
                                                                        <VisibilityOff
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                            }}
                                                                            onClick={togglePassword}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}
                                                        <p
                                                            onClick={loginOrForgetPasswordHandler}
                                                            className={`font-medium text-left text-xs text-gray-600 mt-2.5 ${loginWithPhone && !loginWithPassword
                                                                ? 'hover:underline cursor-pointer'
                                                                : ''
                                                                } `}
                                                        >
                                                            {isError && (
                                                                <p
                                                                    onClick={forgetPasswordHandler}
                                                                    className="font-light text-left text-xs text-red-700 mt-2.5"
                                                                >
                                                                    {errorMessage}
                                                                </p>
                                                            )}
                                                            {!isForgotPasswordScenario && (
                                                                <p
                                                                    onClick={forgetPasswordHandler}
                                                                    className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                                                                >
                                                                    {APP_TEXTS.FORGOT_PASSWORD}
                                                                </p>
                                                            )}
                                                        </p>
                                                        {isForgotPasswordScenario ? (
                                                            <div
                                                                onClick={loginHandler}
                                                                className={`flex flex-row items-center ${(phoneNumber?.length > 0 ||
                                                                    email.length > 0) &&
                                                                    code?.length > 0 &&
                                                                    password?.length > 0
                                                                    ? 'bg-red-500'
                                                                    : 'bg-login-btn'
                                                                    } mt-4 rounded-md py-2.5 px-3 cursor-pointer h-11`}
                                                            >
                                                                <div
                                                                    className={`${(phoneNumber?.length > 0 ||
                                                                        email.length > 0) &&
                                                                        code?.length > 0 &&
                                                                        password?.length > 0
                                                                        ? 'text-white'
                                                                        : textColor
                                                                        } flex flex-row justify-center items-center gap-2 flex-1`}
                                                                >
                                                                    <p>
                                                                        {loadingLogin ? (
                                                                            <Loader />
                                                                        ) : (
                                                                            APP_TEXTS.LOGIN
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                onClick={simpleLoginHandler}
                                                                className={`flex flex-row items-center bg-login-btn mt-4 rounded-md py-2.5 px-3 cursor-pointer  ${style.NextBtn}`}
                                                            >
                                                                <div
                                                                    className={`flex flex-row justify-center items-center gap-2 flex-1`}
                                                                >
                                                                    <p>
                                                                        {isLoading ? (
                                                                            <CircularProgress
                                                                                style={{
                                                                                    width: 18,
                                                                                    height: 18,
                                                                                    color: 'red',
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            APP_TEXTS.LOGIN
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div
                                                            onClick={goBackHandler}
                                                            className="flex flex-row justify-center items-center gap-2 mt-4 cursor-pointer"
                                                        >
                                                            <img
                                                                src={back}
                                                                className="h-2.5 w-2.5 object-contain"
                                                            />
                                                            <p className="font-medium text-xs">
                                                                Go Back
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            {isMainLoginOption && (
                                                <div className="mt-14  w-[21.888rem] mx-auto">
                                                    <p className="font-normal text-[0.688rem] text-policy">
                                                        By continuing with an account located in{' '}
                                                        <span
                                                            className={` ${textColor} cursor-pointer`}
                                                        >
                                                            {country_name}
                                                        </span>
                                                        , you agree to our{' '}
                                                        <span
                                                            className={` ${textColor} cursor-pointer hover:underline`}
                                                        >
                                                            Terms of Service
                                                        </span>{' '}
                                                        and acknowledge that you have read our{' '}
                                                        <span
                                                            className={` ${textColor}  cursor-pointer hover:underline`}
                                                        >
                                                            Privacy Policy.
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                            <div className="mt-3 absolute bottom-0 w-full py-4">
                                                <div className="border-t-[0.3px] border-gray-200 text-center pt-3.5">
                                                    <h3
                                                        className={`font-normal text-[0.938rem] flex flex-row items-center justify-center gap-1 ${textColor}`}
                                                    >
                                                        {APP_TEXTS.NO_ACCOUNT}{' '}
                                                        <span
                                                            className="text-danger-1 font-semibold hover:underline cursor-pointer"
                                                            onClick={handleSignupClick}
                                                        >
                                                            {APP_TEXTS.SIGN_UP}
                                                        </span>
                                                    </h3>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="overflow-auto w-[21.888rem] mx-auto ">
                                                <h2
                                                    className={`font-bold text-3xl mt-5 mb-4 ${textColor}`}
                                                >
                                                    Signup to Seezitt
                                                </h2>
                                                {signupNext == false ? (
                                                    <>
                                                        {isMainSignupOption ? (
                                                            <>
                                                                {SIGNUP_OPTIONS?.map(
                                                                    (option, index) => (
                                                                        <SignupHandler
                                                                            singupItemClickHandler={
                                                                                signupItemClickHandler
                                                                            }
                                                                            key={index}
                                                                            name={option.name}
                                                                            image={option.image}
                                                                            styles={option.styles}
                                                                            darkWhiteTheme={
                                                                                darkWhiteTheme
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                                <div className="mt-3">
                                                                    <FacebookLogin
                                                                        appId="281129028310496"
                                                                        autoLoad={false}
                                                                        fields="name,email,picture"
                                                                        callback={responseFacebook}
                                                                        render={(renderProps: {
                                                                            onClick: () => void;
                                                                        }) => (
                                                                            <div
                                                                                onClick={
                                                                                    renderProps.onClick
                                                                                }
                                                                                className={`rounded-[0.5rem] font-medium text-base flex flex-row items-center border border-loginItem h-11 px-3 cursor-pointer hover:bg-slate-100 `}
                                                                            >
                                                                                <img
                                                                                    className="object-contain h-5 w-5"
                                                                                    src={fb}
                                                                                />
                                                                                <p className="mx-auto text-[0.938rem]">
                                                                                    Continue with
                                                                                    Facebook
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="flex flex-row justify-between items-center mt-3.5">
                                                                    <p className="font-medium text-[0.938rem]">
                                                                        When’s your birthday?
                                                                    </p>
                                                                </div>
                                                                <div className=" justify-between items-center mt-3.5">
                                                                    <div className="flex flex-row">
                                                                        <FormControl
                                                                            fullWidth
                                                                            className="dobselectbox p-1"
                                                                        >
                                                                            <InputLabel id="demo-simple-select-label">
                                                                                Month
                                                                            </InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                className="bg-login-btn"
                                                                                value={month}
                                                                                label="Month"
                                                                                onChange={
                                                                                    handleMonthChange
                                                                                }
                                                                            >
                                                                                <MenuItem value={1}>
                                                                                    January
                                                                                </MenuItem>
                                                                                <MenuItem value={2}>
                                                                                    Febuary
                                                                                </MenuItem>
                                                                                <MenuItem value={3}>
                                                                                    March
                                                                                </MenuItem>
                                                                                <MenuItem value={4}>
                                                                                    April
                                                                                </MenuItem>
                                                                                <MenuItem value={5}>
                                                                                    May
                                                                                </MenuItem>
                                                                                <MenuItem value={6}>
                                                                                    June
                                                                                </MenuItem>
                                                                                <MenuItem value={7}>
                                                                                    July
                                                                                </MenuItem>
                                                                                <MenuItem value={8}>
                                                                                    August
                                                                                </MenuItem>
                                                                                <MenuItem value={9}>
                                                                                    September
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={10}
                                                                                >
                                                                                    October
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={11}
                                                                                >
                                                                                    November
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={12}
                                                                                >
                                                                                    December
                                                                                </MenuItem>
                                                                            </Select>
                                                                        </FormControl>

                                                                        <FormControl
                                                                            fullWidth
                                                                            className="p-1"
                                                                        >
                                                                            <InputLabel id="demo-simple-select-label">
                                                                                Date
                                                                            </InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                className="bg-login-btn"
                                                                                id="demo-simple-select"
                                                                                value={date}
                                                                                label="Month"
                                                                                onChange={
                                                                                    handleDateChange
                                                                                }
                                                                            >
                                                                                <MenuItem value={1}>
                                                                                    1
                                                                                </MenuItem>
                                                                                <MenuItem value={2}>
                                                                                    2
                                                                                </MenuItem>
                                                                                <MenuItem value={3}>
                                                                                    3
                                                                                </MenuItem>
                                                                                <MenuItem value={4}>
                                                                                    4
                                                                                </MenuItem>
                                                                                <MenuItem value={5}>
                                                                                    5
                                                                                </MenuItem>
                                                                                <MenuItem value={6}>
                                                                                    6
                                                                                </MenuItem>
                                                                                <MenuItem value={7}>
                                                                                    7
                                                                                </MenuItem>
                                                                                <MenuItem value={8}>
                                                                                    8
                                                                                </MenuItem>
                                                                                <MenuItem value={9}>
                                                                                    9
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={10}
                                                                                >
                                                                                    10
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={11}
                                                                                >
                                                                                    11
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={12}
                                                                                >
                                                                                    12
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={13}
                                                                                >
                                                                                    13
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={14}
                                                                                >
                                                                                    14
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={15}
                                                                                >
                                                                                    15
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={16}
                                                                                >
                                                                                    16
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={17}
                                                                                >
                                                                                    17
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={18}
                                                                                >
                                                                                    18
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={19}
                                                                                >
                                                                                    19
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={20}
                                                                                >
                                                                                    20
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={21}
                                                                                >
                                                                                    21
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={22}
                                                                                >
                                                                                    22
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={23}
                                                                                >
                                                                                    23
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={24}
                                                                                >
                                                                                    24
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={25}
                                                                                >
                                                                                    25
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={26}
                                                                                >
                                                                                    26
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={27}
                                                                                >
                                                                                    27
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={28}
                                                                                >
                                                                                    28
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    value={29}
                                                                                >
                                                                                    29
                                                                                </MenuItem>
                                                                                {!['2'].some(i=>i==month)&&<MenuItem
                                                                                    value={30}
                                                                                >
                                                                                    30
                                                                                </MenuItem>}
                                                                                {!['2','4','6','9','11'].some(i=>i==month)&&<MenuItem
                                                                                    value={31}
                                                                                >
                                                                                    31
                                                                                </MenuItem>}
                                                                            </Select>
                                                                        </FormControl>

                                                                        <FormControl
                                                                            fullWidth
                                                                            className="p-1"
                                                                        >
                                                                            <InputLabel id="demo-simple-select-label">
                                                                                Year
                                                                            </InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                className="bg-login-btn"
                                                                                value={year}
                                                                                label="Month"
                                                                                onChange={
                                                                                    handleYearChange
                                                                                }
                                                                            >
                                                                                {/* {(function (rows, i, len) {
                                                                                while (--i >= len) {
                                                                                rows.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
                                                                                }
                                                                                return rows;
                                                                            })([], 2025, 1900)} */}
                                                                                {generateMenuItems()}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </div>
                                                                </div>
                                                                {isInvalidDate&&<p className='text-red-600 text-sm text-start mt-1 font-semibold'>Selected DOB is Incorrect 😞</p>}
                                                                <div className="flex flex-row justify-between items-center mt-3.5">
                                                                    <p className="font-medium text-[0.938rem]">
                                                                        {signupWithPhone
                                                                            ? 'Phone'
                                                                            : 'Email'}
                                                                    </p>
                                                                    <p
                                                                        onClick={toggleSignupMethod}
                                                                        className="font-medium text-xs text-gray-600 cursor-pointer hover:underline"
                                                                    >
                                                                        {signupWithPhone
                                                                            ? 'Signup with email'
                                                                            : 'Signup with phone'}
                                                                    </p>
                                                                </div>
                                                                {signupWithPhone ? (
                                                                    <>
                                                                        <div className="flex flex-row items-center border border-gray-500 bg-login-btn mt-2 rounded-md p-2.5">
                                                                            <div
                                                                                onClick={
                                                                                    countryCodeModelHandler
                                                                                }
                                                                                className="flex flex-row items-center gap-2 flex-1 cursor-pointer relative text-black"
                                                                            >
                                                                                <p>
                                                                                    {isoCode +
                                                                                        ' ' +
                                                                                        countryCode}
                                                                                </p>
                                                                                <img
                                                                                    className={`object-contain h-2.5 w-2.5 chevron ${countryModelOpened
                                                                                        ? 'rotate'
                                                                                        : ''
                                                                                        }`}
                                                                                    src={
                                                                                        chevronDown
                                                                                    }
                                                                                />
                                                                                <p className="text-gray-400 ">
                                                                                    {' '}
                                                                                    |{' '}
                                                                                </p>
                                                                                {countryModelOpened && (
                                                                                    <div
                                                                                        onClick={
                                                                                            modelClickHandler
                                                                                        }
                                                                                        className={`absolute ${filteredCountryCodes.length ===
                                                                                            0
                                                                                            ? 'h-fit'
                                                                                            : 'h-80'
                                                                                            }  w-80 bg-white top-11 -left-2.5 rounded-md shadow-md cursor-default z-10`}
                                                                                    >
                                                                                        <div className="flex flex-row items-center p-2 gap-2">
                                                                                            <img
                                                                                                className="object-contain h-3 w-3 m-2"
                                                                                                src={
                                                                                                    search
                                                                                                }
                                                                                            />
                                                                                            <input
                                                                                                type="text"
                                                                                                placeholder="Search"
                                                                                                className="w-full text-sm font-normal caret-red-500 bg-white"
                                                                                                value={
                                                                                                    searchQuery
                                                                                                }
                                                                                                onChange={
                                                                                                    handleSearchChange
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <div className="w-full h-[1px] bg-gray-300" />
                                                                                        <div
                                                                                            className={`overflow-y-auto ${filteredCountryCodes.length ===
                                                                                                0
                                                                                                ? 'h-fit'
                                                                                                : 'max-h-[17.188rem]'
                                                                                                } `}
                                                                                        >
                                                                                            {filteredCountryCodes.map(
                                                                                                (
                                                                                                    countryItem: any,
                                                                                                    index: number
                                                                                                ) => (
                                                                                                    <div
                                                                                                        onClick={() =>
                                                                                                            countryItemClickHandler(
                                                                                                                countryItem,
                                                                                                                index
                                                                                                            )
                                                                                                        }
                                                                                                        key={
                                                                                                            index
                                                                                                        }
                                                                                                        className={`flex flex-row justify-between items-center p-2.5 cursor-pointer mb-2 rounded-b-md ${selectedCountryIndex ===
                                                                                                            index
                                                                                                            ? 'bg-gray-50'
                                                                                                            : ''
                                                                                                            }`}
                                                                                                    >
                                                                                                        <p
                                                                                                            className={`font-normal text-black text-left text-xs hover:bg-gray-50`}
                                                                                                        >
                                                                                                            {countryItem?.name +
                                                                                                                ' ' +
                                                                                                                countryItem?.code}
                                                                                                        </p>
                                                                                                        {selectedCountryIndex ===
                                                                                                            index && (
                                                                                                                <img
                                                                                                                    className="h-4 w-4 object-contain"
                                                                                                                    alt="check-mark"
                                                                                                                    src={
                                                                                                                        checkCountryCode
                                                                                                                    }
                                                                                                                />
                                                                                                            )}
                                                                                                    </div>
                                                                                                )
                                                                                            )}
                                                                                            {filteredCountryCodes.length ===
                                                                                                0 && (
                                                                                                    <p className="font-normal text-gray-400 text-xs hover:bg-gray-50 my-2">
                                                                                                        {
                                                                                                            APP_TEXTS.NO_RESULT_FOUND
                                                                                                        }
                                                                                                    </p>
                                                                                                )}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <input
                                                                                className="w-2/3 bg-login-btn"
                                                                                type="tel"
                                                                                placeholder="Phone number"
                                                                                value={phoneNumber}
                                                                                onChange={(e) =>
                                                                                    setPhoneNumber(
                                                                                        e.target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="flex flex-row items-center border border-gray-500 bg-login-btn mt-2 rounded-md p-2.5">
                                                                            <input
                                                                                className="w-2/3 bg-login-btn"
                                                                                type="text"
                                                                                placeholder="Email"
                                                                                value={email}
                                                                                onChange={(e) =>
                                                                                    setEmail(
                                                                                        e.target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                        {emailIdError ? (
                                                                            <p className="font-light text-left text-xs text-red-700 mt-2.5">
                                                                                {
                                                                                    'Please enter email id'
                                                                                }
                                                                            </p>
                                                                        ) : null}

                                                                        <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md py-2.5 px-3">
                                                                            <input
                                                                                className="w-2/3 bg-gray-100"
                                                                                type="text"
                                                                                placeholder="Enter 6-digit code"
                                                                                name="code"
                                                                                value={otpCode}
                                                                                onChange={(e) =>
                                                                                    setOtpCode(
                                                                                        e.target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                            <div className="flex flex-row justify-center items-center gap-2 flex-1">
                                                                                <p
                                                                                    className={`text-gray-400 ${style.black_text}`}
                                                                                >
                                                                                    {' '}
                                                                                    |{' '}
                                                                                </p>
                                                                                <p
                                                                                    onClick={
                                                                                        sendOTPCode
                                                                                    }
                                                                                    className={`text-black cursor-pointer`}
                                                                                >
                                                                                    {otpbuttonText}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        {otpError ? (
                                                                            <p className="font-light text-left text-xs text-red-700 mt-2.5">
                                                                                {
                                                                                    'Please enter valid otp'
                                                                                }
                                                                            </p>
                                                                        ) : null}
                                                                    </>
                                                                )}

                                                                <div
                                                                    onClick={signupNextScreen}
                                                                    className={`flex flex-row items-center bg-login-btn mt-4 rounded-md py-2.5 px-3 cursor-pointer ${style.NextBtn}`}
                                                                >
                                                                    <div className="flex flex-row justify-center items-center gap-2 flex-1">
                                                                        <p>
                                                                            {isLoading ? (
                                                                                <CircularProgress
                                                                                    style={{
                                                                                        width: 18,
                                                                                        height: 18,
                                                                                        color: 'red',
                                                                                    }}
                                                                                />
                                                                            ) : (
                                                                                'Next'
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    onClick={handleSignUpMainScreen}
                                                                    className="flex flex-row justify-center items-center gap-2 mt-4 cursor-pointer"
                                                                >
                                                                    <img
                                                                        src={back}
                                                                        className="h-2.5 w-2.5 object-contain"
                                                                    />
                                                                    <p className="font-medium text-xs">
                                                                        Go Back
                                                                    </p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex flex-row justify-between items-center mt-3.5">
                                                            <p className="font-medium text-[0.938rem]">
                                                                Password
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-row justify-between items-center border border-gray-500 bg-login-btn mt-2 rounded-md py-2.5 px-3 text-black">
                                                            <input
                                                                className="w-2/3 bg-login-btn"
                                                                type={
                                                                    showPassword
                                                                        ? 'text'
                                                                        : 'password'
                                                                }
                                                                placeholder="Password"
                                                                value={password}
                                                                onChange={(e) =>
                                                                    setPassword(e.target.value)
                                                                }
                                                            />
                                                            {!showPassword ? (
                                                                <Visibility
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={togglePassword}
                                                                />
                                                            ) : (
                                                                <VisibilityOff
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={togglePassword}
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="flex flex-row justify-between items-center mt-3.5">
                                                            <p className="font-medium text-[0.938rem]">
                                                                Name
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-row justify-between items-center border border-gray-500 bg-login-btn mt-2 rounded-md py-2.5 px-3">
                                                            <input
                                                                className="w-2/3 bg-login-btn"
                                                                type="text"
                                                                placeholder="Name"
                                                                value={name}
                                                                onChange={(e) =>
                                                                    setName(e.target.value)
                                                                }
                                                            />
                                                        </div>

                                                        <div
                                                            onClick={signupHandler}
                                                            className={`flex flex-row items-center bg-login-btn mt-4 rounded-md py-2.5 px-3 cursor-pointer ${style.NextBtn}`}
                                                        >
                                                            <div className="flex flex-row justify-center items-center gap-2 flex-1">
                                                                <p>
                                                                    {isLoading ? (
                                                                        <CircularProgress
                                                                            style={{
                                                                                width: 18,
                                                                                height: 18,
                                                                                color: 'red',
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        'Signup'
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {isError ? (
                                                            <p className="font-light text-left text-xs text-red-700 mt-2.5">
                                                                {errorMessage}
                                                            </p>
                                                        ) : null}

                                                        <div
                                                            onClick={goBackSignupHandler}
                                                            className="flex flex-row justify-center items-center gap-2 mt-4 cursor-pointer"
                                                        >
                                                            <img
                                                                src={back}
                                                                className="h-2.5 w-2.5 object-contain"
                                                            />
                                                            <p className="font-medium text-xs">
                                                                Go Back
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            {isMainLoginOption && (
                                                <div className="mt-14  w-[21.888rem] mx-auto">
                                                    <p className="font-normal text-[0.688rem] text-policy">
                                                        By continuing with an account located in{' '}
                                                        <span
                                                            className={`${textColor} cursor-pointer`}
                                                        >
                                                            {country_name}
                                                        </span>
                                                        , you agree to our{' '}
                                                        <span
                                                            className={` ${textColor} cursor-pointer hover:underline`}
                                                        >
                                                            Terms of Service
                                                        </span>{' '}
                                                        and acknowledge that you have read our{' '}
                                                        <span
                                                            className={` ${textColor} cursor-pointer hover:underline`}
                                                        >
                                                            Privacy Policy.
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                            <div className="mt-3 bottom-0 relative">
                                                <div className="border-t-[0.3px] border-gray-200 text-center pt-3.5">
                                                    <h3
                                                        className={`font-normal text-[0.938rem] flex flex-row items-center justify-center gap-1 ${textColor} `}
                                                    >
                                                        {SIGNUP_APP_TEXTS.ALREADY_ACCOUNT}{' '}
                                                        <span
                                                            className="text-danger-1 font-semibold hover:underline cursor-pointer"
                                                            onClick={handleLoginpopupClick}
                                                        >
                                                            {SIGNUP_APP_TEXTS.LOGIN}
                                                        </span>
                                                    </h3>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {isLogoutPopup && (

                            <div className="w-full z-50 h-full bg-black/50 fixed top-0 flex justify-center items-center">
                                <div
                                    className={`w-[25.688rem] mx-auto mt-3 bg-white rounded-lg relative h-[14rem]  ${lightDarkTheme} `}
                                >
                                    <>
                                        <div className="w-[17rem] mx-auto ">
                                            <h2
                                                className={`font-bold text-xl mt-5 mb-1 ${textColor}`}
                                            >
                                                Are you sure you want to log out?
                                            </h2>
                                            <div className={styles.DivButtonWrapper}>
                                                <button type="button" className={`${styles.StyledLogoutCancelButton}`} onClick={closeLogoutPopupHandler}>Cancel</button>{' '}
                                                <button type="button" className={`${styles.StyledLogoutButton}`} onClick={() => logoutAccount()}>Log out</button>
                                            </div>
                                        </div>
                                    </>
                                    {/* <>
                                    <div
                                                            className={`flex flex-row items-center bg-login-btn mt-4 rounded-md py-2.5 px-3 cursor-pointer ${style.NextBtn}`}
                                                        >
                                                            <div className="flex flex-row justify-center items-center gap-2 flex-1">
                                                                <p>
                                                                    {isLoading ? (
                                                                        <CircularProgress
                                                                            style={{
                                                                                width: 18,
                                                                                height: 18,
                                                                                color: 'red',
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        'Logout'
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                    </> */}
                                </div>
                            </div>
                        )}
                    </Router>
                </VideoProvider>
            </div>
        </IntlProvider>
    );
}

export default App;
