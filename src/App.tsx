import { ChangeEvent, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import messages from '../src/languages-intl';
import styles from './App.module.scss';
import CommunityPage from './components/about-pages/community-guidelines';
import PrivacyPage from './components/about-pages/privacy-policy-page';
import TermsPage from './components/about-pages/terms-conditions-page';
import { ActivityPage } from './components/activity-page/activity-page';
// import ComingSoon from './components/coming-soon/coming-soon';
import ChatsSec from './components/chats';
import { AllVideos } from './components/discover/components/allVideosPage';
import Discover from './components/discover/discover';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { RequestOtp } from './components/forgot-password/request-otp';

import { OtpVerification } from './components/forgot-password/otp-verification';
import HomePage from './components/homePage';
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
import { SoundPage } from './components/sounds-page/sound-page';
import CreateStoryPage from './components/stories';
import { SuggestedAccountsPage } from './components/suggested-accounts-page/suggested-accounts-page';
import UploadPage from './components/upload';
import { useAuthStore } from './store/authStore';
import useApp from './useApp';
// import GoLive from './components/go-live';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Analytics from './components/analytics';
import ContactUs from './components/contact-us';
import ItemLogin from './components/item-login';
import Loader from './components/loader';
import Signup from './components/signup';
import SignupEmail from './components/signup/email/email';
import SignupPhone from './components/signup/mobile/mobile';

import Login from './components/login';
import ForgetPassword from './components/login/forget-password';
import PhoneOrEmail from './components/login/phone-or-email';
import { closeLoginPopup } from './redux/reducers';
import { loginService, loginWithGoogleService } from './redux/reducers/auth';
import {
    APP_TEXTS,
    END_POINTS,
    LOGIN_OPTIONS,
    METHOD,
    STATUS_CODE,
    showToastError,
    showToastSuccess,
} from './utils/constants';
import { back, checkCountryCode, chevronDown, search, closeIcon } from './icons';
import ProtectedRoute from './components/protected-routed/ProtectedRoute';
import { useGoogleLogin } from '@react-oauth/google';

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
    const {} = useApp();

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
    const [isForgotPasswordScenario, setIsForgotPasswordScenario] = useState(false);
    const isLoginPopup = useSelector((store: any) => store?.reducers?.popupSlice?.isLoginPopup);
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

    const simpleLoginHandler = async () => {
        let payload;
        if (loginWithPhone) {
            payload = {
                phoneNumber : countryCode + phoneNumber,
                password,
            };
        } else {
            payload = {
                email,
                password,
            };
        }
        setIsLoading(true);
        dispatch(loginService(payload))
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
        console.log('Forget password');
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

    const useGeoService = async () => {
        try {
            // Get the IP address
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const ipAddress = ipData.ip;

            // Get geolocation data based on the IP address
            const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
            const geoData = await geoResponse.json();

            // Set first country as initial country code
            setCountryCode(geoData?.country_calling_code);

            // Set first isoCode as initial country iso code
            setIsoCode(geoData?.country_code);
        } catch (error) {
            console.log('🚀 ~ fetchGeoData ~ error:', error);
        }
    };

    useEffect(() => {
        useGeoService();
        fetchCountriesList();
    }, []);

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
                                element={<Login setLanguage={setLanguage} language={appLanguage} />}
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
                            <Route path="/notifications" element={<ActivityPage />} />
                            <Route path="/comingsoon" element={<ChatsSec />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/profile/:id" element={<PublicProfile />} />
                            <Route
                                path="/settings/account"
                                element={<ProtectedRoute element={Account} />}
                            />
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
                            <Route path="/discover" element={<Discover />} />
                            <Route path="/videos/:id" element={<AllVideos />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route path="/create-story" element={<CreateStoryPage />} />
                            {/* <Route path="/golive" element={<GoLive />} /> */}
                            <Route path="/myreports" element={<MyReports />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/contactus" element={<ContactUs />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/signup/phone-or-email/email" element={<SignupEmail />} />
                            {/* <Route path="/signup/phone-or-email/phone" element={<SignupPhone />} /> */}
                        </Routes>

                        {isLoginPopup && (
                            <div className="w-full z-50 h-full bg-black/50 fixed top-0 flex justify-center items-center">
                                <div className="w-[30.688rem] mx-auto mt-3 bg-white py-4 rounded-lg relative h-[37.125rem]">
                                    <div
                                        onClick={closeLoginPopupHandler}
                                        className="bg-gray-100/50 rounded-full h-10 w-10 flex flex-row justify-center items-center absolute right-5 p-1 cursor-pointer"
                                    >
                                        <img className="h-4 w-4 object-contain" src={closeIcon} />
                                    </div>
                                    <div className="overflow-auto w-[21.888rem] mx-auto ">
                                        <h2 className="font-bold text-3xl mt-5 mb-4 text-subtext">
                                            {isMainLoginOption
                                                ? 'Log in to Seezitt'
                                                : isForgotPasswordScenario
                                                ? 'Reset Password'
                                                : 'Log in'}
                                        </h2>
                                        {isMainLoginOption ? (
                                            LOGIN_OPTIONS?.map((option, index) => (
                                                <ItemLogin
                                                    loginItemClickHandler={loginItemClickHandler}
                                                    key={index}
                                                    name={option.name}
                                                    image={option.image}
                                                    styles={option.styles}
                                                />
                                            ))
                                        ) : (
                                            <>
                                                <div className="flex flex-row justify-between items-center mt-3.5">
                                                    <p className="font-medium text-[0.938rem]">
                                                        {loginWithPhone && !isForgotPasswordScenario
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
                                                        {loginWithPhone && !isForgotPasswordScenario
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
                                                                onClick={countryCodeModelHandler}
                                                                className="flex flex-row items-center gap-2 flex-1 cursor-pointer relative"
                                                            >
                                                                <p>{isoCode + ' ' + countryCode}</p>
                                                                <img
                                                                    className={`object-contain h-2.5 w-2.5 chevron ${
                                                                        countryModelOpened
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
                                                                        onClick={modelClickHandler}
                                                                        className={`absolute ${
                                                                            filteredCountryCodes.length ===
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
                                                                                value={searchQuery}
                                                                                onChange={
                                                                                    handleSearchChange
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="w-full h-[1px] bg-gray-300" />
                                                                        <div
                                                                            className={`overflow-y-auto ${
                                                                                filteredCountryCodes.length ===
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
                                                                                        key={index}
                                                                                        className={`flex flex-row justify-between items-center p-2.5 cursor-pointer mb-2 rounded-b-md ${
                                                                                            selectedCountryIndex ===
                                                                                            index
                                                                                                ? 'bg-gray-50'
                                                                                                : ''
                                                                                        }`}
                                                                                    >
                                                                                        <p className="font-normal text-black text-left text-xs hover:bg-gray-50">
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
                                                                    setPhoneNumber(e.target.value)
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
                                                                        onChange={handleChange}
                                                                    />
                                                                    <div
                                                                        className={`flex flex-row justify-center items-center gap-2 flex-1 ${
                                                                            phoneNumber?.length >
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
                                                                            onClick={sendOTP}
                                                                            className={`text-sm ${
                                                                                phoneNumber?.length >
                                                                                    0 ||
                                                                                email.length > 0
                                                                                    ? 'text-black'
                                                                                    : 'text-gray-400'
                                                                            }`}
                                                                        >
                                                                            {APP_TEXTS.SEND_CODE}
                                                                        </p>
                                                                        {loadingOtp && <Loader />}
                                                                    </div>
                                                                </div>
                                                                {error && (
                                                                    <p className="text-red-500 font-normal text-xs text-left mt-2">
                                                                        {error}
                                                                    </p>
                                                                )}
                                                            </>
                                                        )}
                                                        <div className="flex flex-row justify-between items-center border border-gray-500 bg-login-btn mt-2 rounded-md py-2.5 px-3">
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
                                                        {/* </>
                            )} */}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex flex-row items-center border border-gray-500 bg-login-btn mt-2 rounded-md p-2.5">
                                                            <input
                                                                className="w-2/3 bg-login-btn"
                                                                type="text"
                                                                placeholder={`${
                                                                    isForgotPasswordScenario
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
                                                                        onChange={handleChange}
                                                                    />
                                                                    <div
                                                                        className={`flex flex-row justify-center items-center gap-2 flex-1 ${
                                                                            phoneNumber?.length >
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
                                                                            onClick={sendOTP}
                                                                            className={`text-sm ${
                                                                                phoneNumber?.length >
                                                                                    0 ||
                                                                                email.length > 0
                                                                                    ? 'text-black'
                                                                                    : 'text-gray-400'
                                                                            }`}
                                                                        >
                                                                            {APP_TEXTS.SEND_CODE}
                                                                        </p>
                                                                        {loadingOtp && <Loader />}
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
                                                                    passwordOperationsHandler(e)
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
                                                    </>
                                                )}
                                                <p
                                                    onClick={loginOrForgetPasswordHandler}
                                                    className={`font-medium text-left text-xs text-gray-600 mt-2.5 ${
                                                        loginWithPhone && !loginWithPassword
                                                            ? 'hover:underline cursor-pointer'
                                                            : ''
                                                    } `}
                                                >
                                                    {/* {loginWithPhone && !loginWithPassword ? (
                            'Log in with password'
                        ) : loginWithPassword ? (
                            <div className="flex flex-row items-center gap-3 -mt-2.5">
                                <p
                                    onClick={forgetPasswordHandler}
                                    className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                                >
                                    {APP_TEXTS.FORGOT_PASSWORD}
                                </p> */}
                                                    {/* {loginWithPhone && (
                                    <>
                                        <p className="font-medium text-left text-xs text-gray-300 mt-2.5 hover:underline cursor-pointer">
                                            |
                                        </p>
                                        <p
                                            onClick={loginWithPasswordToggler}
                                            className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                                        >
                                            {APP_TEXTS.LOGIN_WITH_CODE}
                                        </p>
                                    </>
                                )} */}
                                                    {/* </div>
                        ) : ( */}
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
                                                    {/* // )} */}
                                                </p>
                                                {isForgotPasswordScenario ? (
                                                    <div
                                                        onClick={loginHandler}
                                                        className={`flex flex-row items-center ${
                                                            (phoneNumber?.length > 0 ||
                                                                email.length > 0) &&
                                                            code?.length > 0 &&
                                                            password?.length > 0
                                                                ? 'bg-red-500'
                                                                : 'bg-login-btn'
                                                        } mt-4 rounded-md py-2.5 px-3 cursor-pointer h-11`}
                                                    >
                                                        <div
                                                            className={`${
                                                                (phoneNumber?.length > 0 ||
                                                                    email.length > 0) &&
                                                                code?.length > 0 &&
                                                                password?.length > 0
                                                                    ? 'text-white'
                                                                    : 'text-black'
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
                                                        className={`flex flex-row items-center bg-login-btn mt-4 rounded-md py-2.5 px-3 cursor-pointer`}
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
                                                    <p className="font-medium text-xs">Go Back</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {isMainLoginOption && (
                                        <div className="mt-14  w-[21.888rem] mx-auto">
                                            <p className="font-normal text-[0.688rem] text-policy">
                                                By continuing with an account located in{' '}
                                                <span className="text-black cursor-pointer">
                                                    Pakistan
                                                </span>
                                                , you agree to our{' '}
                                                <span className="text-black cursor-pointer hover:underline">
                                                    Terms of Service
                                                </span>{' '}
                                                and acknowledge that you have read our{' '}
                                                <span className="text-black cursor-pointer hover:underline">
                                                    Privacy Policy.
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                    <div className="mt-3 absolute bottom-0 w-full p-4">
                                        <div className="border-t-[0.3px] border-gray-200 text-center pt-3.5">
                                            <h3 className="font-normal text-[0.938rem] flex flex-row items-center justify-center gap-1">
                                                {APP_TEXTS.NO_ACCOUNT}{' '}
                                                <span className="text-danger-1 font-semibold hover:underline cursor-pointer">
                                                    {APP_TEXTS.SIGN_UP}
                                                </span>
                                            </h3>
                                        </div>
                                    </div>
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
