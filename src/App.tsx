import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
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
    signupWithPhoneNumberService,
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
import { PopupModal } from './components/reusables/popupModal';

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
    const [isLoginWithWN, setIsLoginWithWN] = useState(false);
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



    // This code will be remove later, added for code understanding...
    useEffect(() => {
        console.log('isLoginWithWN ' + isLoginWithWN);
        console.log('loginWithPhone ' + loginWithPhone);
        console.log('isMainLoginOption ' + isMainLoginOption);
        console.log('isMainSignupOption ' + isMainSignupOption);
        console.log('isLoginSection ' + isLoginSection);
        console.log('isForgotPasswordScenario ' + isForgotPasswordScenario);
        console.log('isLoginPopup ' + isLoginPopup);
        console.log('isLogoutPopup ' + isLogoutPopup);
    }, [isLoginWithWN, loginWithPhone, isMainLoginOption, isMainSignupOption, isLoginSection, isForgotPasswordScenario, isLoginPopup, isLogoutPopup]); 



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

    const handleBackOnWNSocial = () => {
        console.log("Div clicked!");
        setIsLoginWithWN(false);
        setIsMainLoginOption(true);
        setIsMainSignupOption(true);
        // Your function logic here
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
            case APP_TEXTS.WORLDNOOR:
                // Handle Apple login
                console.log('WN Social login');
                loginWithWorldnoorHandler();
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

    const loginWithWorldnoorHandler = async () => {
        setIsLoginWithWN(true);
        setIsMainLoginOption(false);
        setIsMainSignupOption(false);

    }

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
    
    const signupPhoneNumberNextScreen = async () => {
        
        setSignupNext(true);
        
    };

    const countryPhoneLengths: Record<string, number> = {
        "AF": 9,   "AL": 8,   "DZ": 9,   "AS": 7,   "AD": 6,   "AO": 9,   "AI": 7,  
        "AG": 7,   "AR": 10,  "AM": 8,   "AW": 7,   "AU": 9,   "AT": 10,  "AZ": 9,  
        "BS": 7,   "BH": 8,   "BD": 10,  "BB": 7,   "BY": 9,   "BE": 9,   "BZ": 7,  
        "BJ": 8,   "BM": 7,   "BT": 8,   "BO": 8,   "BA": 8,   "BW": 7,   "BR": 11,  
        "BN": 7,   "BG": 8,   "BF": 8,   "BI": 8,   "KH": 9,   "CM": 9,   "CA": 10,  
        "CV": 7,   "KY": 7,   "CF": 8,   "TD": 8,   "CL": 9,   "CN": 11,  "CO": 10,  
        "KM": 7,   "CG": 9,   "CD": 9,   "CR": 8,   "CI": 8,   "HR": 9,   "CU": 8,  
        "CY": 8,   "CZ": 9,   "DK": 8,   "DJ": 6,   "DM": 7,   "DO": 10,  "EC": 9,  
        "EG": 10,  "SV": 8,   "GQ": 9,   "ER": 7,   "EE": 7,   "ET": 9,   "FJ": 7,  
        "FI": 10,  "FR": 9,   "GA": 7,   "GM": 7,   "GE": 9,   "DE": 10,  "GH": 9,  
        "GI": 8,   "GR": 10,  "GL": 6,   "GD": 7,   "GU": 7,   "GT": 8,   "GN": 9,  
        "GW": 7,   "GY": 7,   "HT": 8,   "HN": 8,   "HK": 8,   "HU": 9,   "IS": 7,  
        "IN": 10,  "ID": 10,  "IR": 10,  "IQ": 10,  "IE": 9,   "IL": 9,   "IT": 10,  
        "JM": 7,   "JP": 10,  "JO": 9,   "KZ": 10,  "KE": 9,   "KI": 5,   "KP": 9,  
        "KR": 9,   "KW": 8,   "KG": 9,   "LA": 9,   "LV": 8,   "LB": 8,   "LS": 8,  
        "LR": 7,   "LY": 10,  "LI": 7,   "LT": 8,   "LU": 9,   "MO": 8,   "MK": 8,  
        "MG": 9,   "MW": 7,   "MY": 9,   "MV": 7,   "ML": 8,   "MT": 8,   "MH": 7,  
        "MR": 7,   "MU": 7,   "MX": 10,  "FM": 7,   "MD": 8,   "MC": 8,   "MN": 8,  
        "ME": 8,   "MS": 7,   "MA": 9,   "MZ": 9,   "MM": 9,   "NA": 8,   "NP": 10,  
        "NL": 9,   "NZ": 9,   "NI": 8,   "NE": 8,   "NG": 10,  "NO": 8,   "OM": 8,  
        "PK": 10,  "PW": 7,   "PA": 8,   "PG": 8,   "PY": 9,   "PE": 9,   "PH": 10,  
        "PL": 9,   "PT": 9,   "PR": 10,  "QA": 8,   "RO": 10,  "RU": 10,  "RW": 9,  
        "WS": 7,   "SA": 9,   "SN": 9,   "RS": 9,   "SC": 7,   "SL": 8,   "SG": 8,  
        "SK": 9,   "SI": 9,   "SB": 7,   "SO": 8,   "ZA": 9,   "ES": 9,   "LK": 9,  
        "SD": 9,   "SR": 7,   "SZ": 8,   "SE": 9,   "CH": 9,   "SY": 9,   "TW": 9,  
        "TJ": 9,   "TZ": 9,   "TH": 9,   "TG": 8,   "TO": 5,   "TT": 7,   "TN": 8,  
        "TR": 10,  "TM": 8,   "UG": 9,   "UA": 9,   "AE": 9,   "GB": 10,  "US": 10,  
        "UY": 9,   "UZ": 9,   "VU": 7,   "VE": 10,  "VN": 9,   "YE": 9,   "ZM": 9,  
        "ZW": 9
      };

      const getMaxPhoneLength = (countryCode: string): number => {
        return countryPhoneLengths[countryCode] || 10; // Default to 10 if country not found
    };
      

    const simpleLoginHandler = async () => {
        let loginObj;
        console.log("loginWithPhone", loginWithPhone, password, phoneNumber, email);
        if (loginWithPhone) {
            loginObj = { password, phoneNumber: countryCode +"-"+ phoneNumber };
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
        let signupURL;
        console.log("loginWithPhone", loginWithPhone, password, phoneNumber, email);
        if (signupWithPhone) {
            
            signupObj = { password, phoneNumber: countryCode +'-'+ phoneNumber, dateOfBirth, name };
            setIsLoading(true);
            dispatch(signupWithPhoneNumberService(signupObj))
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
        } else {
            signupObj = { password, email, dateOfBirth, name };
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
        }

        
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
            const numMonth = Number(month);
            const numDate = Number(date);
            const numYear = Number(year);
    
            // Check if it's February and the date is 29
            if (numMonth === 2 && numDate === 29 && !isLeapYear(numYear)) {
                console.log('Invalid date of birth: Not a leap year');
                setIsInvalidDate(true);
                return;
            }

            let dob = year + '-' + month.toString().padStart(2, "0") + '-' + date.toString().padStart(2, "0");
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

    // Helper function to check if the year is a leap year
    const isLeapYear  = (year: any) => {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }

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
        let i = 2024; // Start with 2025
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
        loginWithFBAccessToken(response?.accessToken);
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
                            {/* <Route
                                path="/auth"
                                element={<Login />}
                            // element={<Login setLanguage={setLanguage} language={appLanguage} />}
                            /> */}
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
                            <Route path="*" element={<Navigate to="/home" replace />} /> {/* Catch-all */}

                            {/* <Route path="/signup/phone-or-email/phone" element={<SignupPhone />} /> */}
                        </Routes>

                        {isLoginPopup && (
                            <div className="w-full z-50 h-full bg-black/50 fixed top-0 flex justify-center items-center">
                                <div
                                    className={`w-[30.688rem] mx-auto mt-3 bg-white py-4 rounded-lg relative h-[42.125rem]  ${lightDarkTheme} `}
                                >
{/* start wn social modal */}
{/* {style.wnSocialModal} */}
                                { isLoginWithWN &&
                                <div className={style.wnSocialModal}>
                                    <div className="d-flex justify-content-between">
                                        <div className="bg-gray-100/50 rounded-full h-10 w-10 flex flex-row justify-center items-center relative left-4 p-1 cursor-pointer"
                                        onClick={handleBackOnWNSocial}
                                        >
                                            <img className="h-6 w-6 object-contain" src="/public/images/icons/backArrow.svg" />
                                        </div>
                                        <div className="bg-gray-100/50 rounded-full h-10 w-10 flex flex-row justify-center items-center relative right-4 p-1 cursor-pointer">
                                            <img className="h-4 w-4 object-contain" src="/public/images/icons/close.svg" />
                                        </div>
                                    </div>
                                    <div className={style.modalHeader}>
                                        <div className={style.logoTitle}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="207" height="47" viewBox="0 0 207 47" fill="none">
                                            <path d="M27.5273 42.3241H15.3231C7.12077 42.3241 0.470703 35.6749 0.470703 27.4736V15.271C0.470703 7.06964 7.12077 0.42041 15.3231 0.42041H27.5273C35.7296 0.42041 42.3797 7.06964 42.3797 15.271V27.4736C42.3797 35.6749 35.7296 42.3241 27.5273 42.3241Z" fill="url(#paint0_linear_33_4905)"/>
                                            <path d="M14.4569 17.2087L21.4086 27.8824C21.9997 28.7839 22.003 29.9504 21.4164 30.8552C20.0243 32.9994 16.8898 33.006 15.4922 30.8662L5.07349 14.9209H10.2243C11.9302 14.9209 13.5222 15.7804 14.4569 17.2087ZM20.6783 14.9209H15.5275L25.9473 30.8651C27.3461 33.0049 30.4805 32.9994 31.8715 30.8541C32.4582 29.9493 32.456 28.7828 31.8638 27.8813L24.9121 17.2076C23.9752 15.7804 22.3831 14.9209 20.6783 14.9209ZM35.3783 17.2087C34.4414 15.7815 32.8504 14.9209 31.1445 14.9209H25.9937L33.7763 26.8307L35.9561 22.1656C36.6455 20.693 36.524 18.9674 35.6368 17.6053L35.3783 17.2087Z" fill="#F2F2F2"/>
                                            <path d="M78.4249 13.089L71.9304 35H67.8635L63.2606 18.417L58.374 35L54.3386 35.0315L48.1278 13.089H51.9425L56.4824 30.9331L61.4005 13.089H65.4359L70.0073 30.8385L74.5786 13.089H78.4249ZM99.3908 35H95.7968L84.9831 18.6377V35H81.3891V13.0575H84.9831L95.7968 29.3883V13.0575H99.3908V35ZM119.52 35.2207C118.048 35.2207 116.724 34.9685 115.547 34.464C114.37 33.9386 113.445 33.203 112.773 32.2572C112.1 31.3114 111.764 30.208 111.764 28.9469H115.61C115.694 29.8927 116.062 30.6703 116.714 31.2799C117.386 31.8894 118.322 32.1941 119.52 32.1941C120.76 32.1941 121.726 31.8999 122.42 31.3114C123.114 30.7019 123.46 29.9242 123.46 28.9784C123.46 28.2428 123.24 27.6438 122.798 27.1814C122.378 26.719 121.842 26.3617 121.19 26.1095C120.56 25.8573 119.677 25.5841 118.542 25.2898C117.113 24.9115 115.947 24.5332 115.043 24.1548C114.16 23.7555 113.403 23.146 112.773 22.3263C112.142 21.5066 111.827 20.4137 111.827 19.0475C111.827 17.7865 112.142 16.683 112.773 15.7372C113.403 14.7915 114.286 14.0663 115.421 13.5619C116.556 13.0575 117.87 12.8053 119.362 12.8053C121.485 12.8053 123.219 13.3412 124.564 14.4131C125.93 15.464 126.687 16.9142 126.834 18.7638H122.861C122.798 17.9651 122.42 17.2821 121.726 16.7146C121.033 16.1471 120.119 15.8634 118.984 15.8634C117.954 15.8634 117.113 16.1261 116.461 16.6515C115.81 17.177 115.484 17.9336 115.484 18.9214C115.484 19.594 115.684 20.151 116.083 20.5923C116.504 21.0127 117.029 21.349 117.659 21.6012C118.29 21.8534 119.152 22.1266 120.245 22.4209C121.695 22.8202 122.872 23.2196 123.776 23.6189C124.7 24.0182 125.478 24.6383 126.109 25.479C126.76 26.2987 127.086 27.4021 127.086 28.7893C127.086 29.9032 126.781 30.9541 126.172 31.9419C125.583 32.9298 124.711 33.7284 123.555 34.3379C122.42 34.9264 121.075 35.2207 119.52 35.2207ZM138.862 35.2837C137.222 35.2837 135.74 34.9159 134.416 34.1803C133.092 33.4237 132.052 32.3728 131.295 31.0276C130.539 29.6615 130.16 28.0852 130.16 26.2987C130.16 24.5332 130.549 22.9673 131.327 21.6012C132.104 20.235 133.166 19.1842 134.511 18.4485C135.856 17.7129 137.359 17.3451 139.019 17.3451C140.68 17.3451 142.182 17.7129 143.528 18.4485C144.873 19.1842 145.934 20.235 146.712 21.6012C147.489 22.9673 147.878 24.5332 147.878 26.2987C147.878 28.0641 147.479 29.63 146.68 30.9961C145.882 32.3623 144.789 33.4237 143.401 34.1803C142.035 34.9159 140.522 35.2837 138.862 35.2837ZM138.862 32.1626C139.786 32.1626 140.648 31.9419 141.447 31.5005C142.266 31.0592 142.929 30.3971 143.433 29.5144C143.937 28.6316 144.19 27.5597 144.19 26.2987C144.19 25.0376 143.948 23.9762 143.464 23.1145C142.981 22.2317 142.34 21.5697 141.541 21.1283C140.743 20.6869 139.881 20.4662 138.956 20.4662C138.031 20.4662 137.17 20.6869 136.371 21.1283C135.593 21.5697 134.973 22.2317 134.511 23.1145C134.049 23.9762 133.817 25.0376 133.817 26.2987C133.817 28.1692 134.29 29.6195 135.236 30.6493C136.203 31.6582 137.411 32.1626 138.862 32.1626ZM150.233 26.2987C150.233 24.5122 150.59 22.9463 151.305 21.6012C152.041 20.235 153.049 19.1842 154.332 18.4485C155.614 17.7129 157.085 17.3451 158.745 17.3451C160.847 17.3451 162.581 17.8495 163.947 18.8584C165.334 19.8462 166.27 21.2649 166.753 23.1145H162.875C162.56 22.2527 162.056 21.5802 161.362 21.0968C160.668 20.6134 159.796 20.3717 158.745 20.3717C157.274 20.3717 156.097 20.8971 155.214 21.948C154.353 22.9779 153.922 24.4281 153.922 26.2987C153.922 28.1692 154.353 29.63 155.214 30.6809C156.097 31.7317 157.274 32.2572 158.745 32.2572C160.826 32.2572 162.203 31.3429 162.875 29.5144H166.753C166.249 31.2799 165.303 32.688 163.916 33.7389C162.528 34.7688 160.805 35.2837 158.745 35.2837C157.085 35.2837 155.614 34.9159 154.332 34.1803C153.049 33.4237 152.041 32.3728 151.305 31.0276C150.59 29.6615 150.233 28.0852 150.233 26.2987ZM172.163 15.3274C171.512 15.3274 170.965 15.1067 170.524 14.6653C170.083 14.224 169.862 13.6775 169.862 13.026C169.862 12.3744 170.083 11.8279 170.524 11.3866C170.965 10.9452 171.512 10.7245 172.163 10.7245C172.794 10.7245 173.33 10.9452 173.771 11.3866C174.213 11.8279 174.433 12.3744 174.433 13.026C174.433 13.6775 174.213 14.224 173.771 14.6653C173.33 15.1067 172.794 15.3274 172.163 15.3274ZM173.929 17.6288V35H170.335V17.6288H173.929ZM177.449 26.2356C177.449 24.4911 177.807 22.9463 178.521 21.6012C179.257 20.2561 180.245 19.2157 181.485 18.4801C182.746 17.7234 184.133 17.3451 185.646 17.3451C187.012 17.3451 188.2 17.6183 189.209 18.1648C190.239 18.6902 191.058 19.3523 191.668 20.151V17.6288H195.293V35H191.668V32.4148C191.058 33.2345 190.228 33.9176 189.177 34.464C188.126 35.0105 186.928 35.2837 185.583 35.2837C184.091 35.2837 182.725 34.9054 181.485 34.1488C180.245 33.3711 179.257 32.2992 178.521 30.9331C177.807 29.5459 177.449 27.9801 177.449 26.2356ZM191.668 26.2987C191.668 25.1006 191.416 24.0603 190.911 23.1775C190.428 22.2948 189.787 21.6222 188.988 21.1598C188.189 20.6974 187.328 20.4662 186.403 20.4662C185.478 20.4662 184.616 20.6974 183.818 21.1598C183.019 21.6012 182.368 22.2633 181.863 23.146C181.38 24.0077 181.138 25.0376 181.138 26.2356C181.138 27.4336 181.38 28.4845 181.863 29.3883C182.368 30.292 183.019 30.9856 183.818 31.469C184.637 31.9314 185.499 32.1626 186.403 32.1626C187.328 32.1626 188.189 31.9314 188.988 31.469C189.787 31.0066 190.428 30.3341 190.911 29.4513C191.416 28.5476 191.668 27.4967 191.668 26.2987ZM203.608 11.6703V35H200.014V11.6703H203.608Z" fill="black"/>
                                            <defs>
                                            <linearGradient id="paint0_linear_33_4905" x1="2.19636" y1="-1.05854" x2="38.1129" y2="40.8494" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#00A8E8"/>
                                            <stop offset="1" stop-color="#0883B2"/>
                                            </linearGradient>
                                            </defs>
                                        </svg>
                                        </div>
                                    </div>
                                    <div className='px-5'>
                                        <div className={style.userInfo}>
                                        <img src="profile.jpg" alt="Profile Picture" className={style.profilePic} />
                                        <div className={style.userDetails}>
                                            <h3 className={style.userName}>Charles Allan</h3>
                                            <p className={style.userEmail}>Charles.Allan1122@gmail.com</p>
                                        </div>
                                        </div>

                                        <div className={style.addAccount}>
                                        <span className={style.plusIcon}>
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="62"
                                        height="63"
                                        viewBox="0 0 62 63"
                                        fill="none"
                                        >
                                        <circle cx="31" cy="31.5" r="30.5" fill="#EAEAEA" />
                                        
                                        <path
                                            d="M31 22V41"
                                            stroke="#575757"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        
                                        <path
                                            d="M22 31H41"
                                            stroke="#575757"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        </svg>

                                        </span>
                                        <span className={style.addText}>Add Another Account</span>
                                        </div>

                                        <p className={style.privacyText}>
                                        <span>WN Social</span> values your privacy and security. By logging into <span>Seezitt</span> through <span>WN Social</span>, rest assured that your information and data are treated with the utmost confidentiality. Our commitment to your privacy means that your data will not be shared or compromised.
                                        </p>
                                    </div>
                                    <button className={style.continueBtn}>Continue with Email</button>
                                </div>
                                }
{/* end wn social modal */}
                                    { !isLoginWithWN &&
                                    <div
                                        onClick={closeLoginPopupHandler}
                                        className="bg-gray-100/50 rounded-full h-10 w-10 flex flex-row justify-center items-center absolute right-5 p-1 cursor-pointer"
                                    >
                                        <img className="h-4 w-4 object-contain" src={closeIcon} />
                                    </div>
                                    }
                                    {!isLoginWithWN && isLoginSection ? (
                                        <>
                                            <div className=" w-[21.888rem] mx-auto ">
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
                                                                                <div className="flex flex-row items-center p-2 gap-2 border rounded-t-lg">
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
                                                                        type="text" // ✅ Change from "number" to "text" to enforce max length
                                                                        placeholder="Phone number"
                                                                        value={phoneNumber}
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            const { value } = e.target;
                                                                            const maxLength = getMaxPhoneLength(isoCode.toLocaleUpperCase());

                                                                            // ✅ Remove non-numeric characters and enforce max length
                                                                            const sanitizedValue = value.replace(/\D/g, '').substring(0, maxLength);
                                                                            setPhoneNumber(sanitizedValue);
                                                                        }}
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
                                                                        className="bg-login-btn w-full"
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
                                            { !isLoginWithWN && 
                                            <div className=" w-[21.888rem] mx-auto ">
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
                                                                                {(!month || !year || (month == '2' && isLeapYear(year))) && (
                                                                                    <MenuItem value={29}>29</MenuItem>
                                                                                )}
                                                                                {!['2'].some(i => i == month) && <MenuItem
                                                                                    value={30}
                                                                                >
                                                                                    30
                                                                                </MenuItem>}
                                                                                {!['2', '4', '6', '9', '11'].some(i => i == month) && <MenuItem
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
                                                                {isInvalidDate && <p className='text-red-600 text-sm text-start mt-1 font-semibold'>Selected DOB is Incorrect 😞</p>}
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
                                                                                        <div className="flex flex-row items-center p-2 gap-2 border rounded-t-lg">
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
                                                                                type="text" // ✅ Change from "number" to "text" to enforce max length
                                                                                placeholder="Phone number"
                                                                                value={phoneNumber}
                                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                    const { value } = e.target;
                                                                                    const maxLength = getMaxPhoneLength(isoCode.toLocaleUpperCase());

                                                                                    // ✅ Remove non-numeric characters and enforce max length
                                                                                    const sanitizedValue = value.replace(/\D/g, '').substring(0, maxLength);
                                                                                    setPhoneNumber(sanitizedValue);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <div
                                                                            onClick={signupPhoneNumberNextScreen}
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
                                                                    </>
                                                                )}

                                                                
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
                                            }
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
                                            { !isLoginWithWN &&
                                            <div className="mt-3 bottom-0 absolute w-full py-4">
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
                                            }
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
