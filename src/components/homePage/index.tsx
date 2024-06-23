import { CircularProgress, useMediaQuery } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import Forwardusers from '../../shared/popups/shareTo/Forwardusers';
import Gifts from '../discover/popups/gifts';
import PopupForReport from '../profile/popups/PopupForReport';
import PopupForBlock from '../profile/popups/popupForBlock';
import PopupForVideoPlayer from '../profile/popups/popupForVideoPlayer';
import ForDesktop from './ForDesktop';
import ForMobile from './ForMobile';
import useHome from './hooks/useHome';



import { APP_TEXTS, SIGNUP_APP_TEXTS, END_POINTS, LOGIN_OPTIONS, SIGNUP_OPTIONS, METHOD } from '../../utils/constants';
import { validateEmail } from '../../utils/common';
import ItemLogin from '../item-login';
import SignupHandler from '../signup/signupHandler';
import { closeIcon } from '../../icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeLoginPopup } from '../../redux/reducers';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginService, signupService } from '../../redux/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { back, checkCountryCode, chevronDown, search } from '../../icons';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import style from './index.module.scss';

function HomePage() {
    const isMobile = useMediaQuery('(max-width:700px)');
    const { loading, videos, activeTab, setActiveTab, isFollowing } = useHome();
    const [videoModalInfo, setVideoModalInfo] = useState<any>({});
    const [giftsPopup, setGiftsPopup] = useState(false);
    const [reportPopup, setReportPopup] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [sendPopup, setSendPopup] = useState(false);


    const [loginWithPhone, setLoginWithPhone] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isMainLoginOption, setIsMainLoginOption] = useState(true);
    const [isMainSignupOption, setIsMainSignupOption] = useState(true);
    const [isLoginSection, setIsLoginSection] = useState(true);
    const isLoginPopup = useSelector((store: any) => store?.reducers?.popupSlice?.isLoginPopup);
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    // const [error, setError] = useState<string>('');
    // const [code, setCode] = useState<any>(null);
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
    const [signupWithPhone, setSignupWithPhone] = useState<boolean>(false);
    const [signupNext, setSignupNext] = useState<boolean>(false);
    const [name, setName] = useState<any>(null);
    const [dateOfBirth, setDateOfBirth] = useState<any>(null);
    const [emailIdError, setEmailIdError] = useState<boolean>(false);
    const [otpbuttonText, setOtpbuttonText] = useState<string>("Send code");
    const [otpCode, setOtpCode] = useState<string>('');
    const [otpError, setOtpError] = useState<boolean>(false);
    

    const signupItemClickHandler = (name: string) => {
        switch (name) {
            case 'Use Phone or Email':
                setIsMainSignupOption(!isMainSignupOption);
                // navigate('/signup/phone-or-email/email');
                break;
            case 'Continue with Facebook':
               
                break;
            case 'Continue with Google':
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

    const toggleLoginMethod = () => {
        setLoginWithPhone(!loginWithPhone);
    };

    const toggleSignupMethod = () => {
        setSignupWithPhone(!signupWithPhone);
    };

    const signupNextScreen = async () => {

        if(email && validateEmail(email)){
            setEmailIdError(false);
        }else{
            setEmailIdError(true);
        }
        try {
            const response: any = await fetch(`${API_KEY}/auth/verifyOtp`, {
                method: "PATCH",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email:email, otp: otpCode }),
            });
            const { data }: any = await response.json();
            if(response.code == 200){
                setOtpError(false)
                setSignupNext(true);
            }else{
                setOtpError(true)
            }
            
            console.log('otp response', response);
        } catch (error) {
            console.log('send otp error:', error);
        }

        
    };
    

    const loginHandler = async () => {
        setIsLoading(true);
        dispatch(loginService({ password, email }))
            .then((res: any) => {
                if (res?.error) {
                    setIsError(true);
                    // setPasswordBorderColor('border-red-400');
                    setErrorMessage(res?.payload || res?.error?.message);
                    setIsLoading(false);
                } else if (res?.payload?.status == 200) {
                    console.log('data after successfull login', res?.payload?.data);
                    setIsLoading(false);
                    closeLoginPopupHandler();
                    navigate('/home');
                }
            })
            .catch((error: any) => {
                setIsError(true);
                setIsLoading(false);
            });
    };


    const signupHandler = async () => {
        let dob= year+"-"+month+"-"+date;
        setDateOfBirth(dob);
        console.log("signup", password, email, dateOfBirth, name);
        // return false;
        setIsLoading(true);
        dispatch(signupService({ password, email, dateOfBirth, name }))
            .then((res: any) => {
                console.log("res",res);
                if (res?.payload?.status == 400) {
                    console.log("res 1",res);
                    setIsError(true);
                    // setPasswordBorderColor('border-red-400');
                    // setErrorMessage(res?.payload || res?.payload?.message);
                    setErrorMessage(res?.payload?.message)
                    setIsLoading(false);
                } else if (res?.payload?.status == 200) {
                    console.log("res 2",res);
                    console.log('data after successfull login', res?.payload?.data);
                    setIsLoading(false);
                    closeLoginPopupHandler();
                    navigate('/home');
                }
            })
            .catch((error: any) => {
                console.log("error",error);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    // const handleChange = (event: { target: { value: any } }) => {
    //     const inputValue = event.target.value;

    //     if (/^\d{0,6}$/.test(inputValue)) {
    //         setCode(inputValue);
    //         setError('');
    //     } else {
    //         setError('Enter 6-digit code');
    //     }
    // };

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

    const menuClickHandler = () => {
        if (countryModelOpened) {
            countryCodeModelHandler();
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

            // Set first country as initial country code
            setCountryCode(data?.countries[0]?.code);

            // Set first isoCode as initial country iso code
            setIsoCode(data?.countries[0]?.iso);

            // Setting all values to countryCodes state
            setCountryCodes(data?.countries);
        } catch (error) {
            console.log('🚀 ~ fetchCountriesList ~ error:', error);
        }
    };

    const sendOTPCode = async () => {
        if(email && validateEmail(email)){
            setEmailIdError(false);
        }else{
            setEmailIdError(true);
        }
        try {
            const response: any = await fetch(`${API_KEY}/auth/request-verify-email`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email:email }),
            });
            const { data }: any = await response.json();
            
            setOtpbuttonText("Resend")
            
            console.log('otp verify response', data);
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
        setIsMainLoginOption(true);
    };

    const goBackSignupHandler = () => {
        setIsMainLoginOption(true);
        setSignupNext(false)
    };

    const closeLoginPopupHandler =()=>{
        dispatch(closeLoginPopup());
        setIsMainLoginOption(true);
    }

    useEffect(() => {
        fetchCountriesList();
    }, []);


    const handleLoginClick = () => {
        setIsLoginSection(false);
      }

    const handleSignupClick = () => {
        setIsLoginSection(false);
    }


    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');


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

    

    return (
        <div>
            {isMobile ? (
                <ForMobile
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    videoes={videos}
                    loading={loading}
                    showVideoModal={(e: any) => {
                        setVideoModalInfo(e);
                        setVideoModal(true);
                    }}
                    videoModal={videoModal}
                />
            ) : (
                <ForDesktop
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    videoes={videos}
                    loading={loading}
                    showVideoModal={(e: any) => {
                        setVideoModalInfo(e);
                        setVideoModal(true);
                    }}
                    isFollowing={isFollowing}
                    videoModal={videoModal}
                    sendPopup={sendPopup}
                    setSendPopup={setSendPopup}
                />
            )}
            {isLoginPopup && (
                <div className="w-full z-50 h-full bg-black/50 fixed top-0">

                    <div className="w-[30.688rem] mx-auto mt-3 bg-white py-4 rounded-lg relative h-[95%]">
                        <div
                            onClick={closeLoginPopupHandler}
                            className="bg-gray-100/50 rounded-full h-10 w-10 flex flex-row justify-center items-center absolute right-5 p-1 cursor-pointer"
                        >
                            <img className="h-4 w-4 object-contain" src={closeIcon} />
                        </div>

                        { isLoginSection ? (
                        <>
                            <div className="overflow-auto w-[21.888rem] mx-auto ">
                                <h2 className="font-bold text-3xl mt-5 mb-4">
                                    {isMainLoginOption ? 'Log in to Seezitt' : 'Log in'}
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
                                                {loginWithPhone ? 'Phone' : 'Email or username'}
                                            </p>
                                            <p
                                                onClick={toggleLoginMethod}
                                                className="font-medium text-xs text-gray-600 cursor-pointer hover:underline"
                                            >
                                                {loginWithPhone
                                                    ? 'Log in with email or username'
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
                                                                countryModelOpened ? 'rotate' : ''
                                                            }`}
                                                            src={chevronDown}
                                                        />
                                                        <p className="text-gray-400 "> | </p>
                                                        {countryModelOpened && (
                                                            <div
                                                                onClick={modelClickHandler}
                                                                className={`absolute ${
                                                                    filteredCountryCodes.length === 0
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
                                                                        onChange={handleSearchChange}
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
                                                                            {APP_TEXTS.NO_RESULT_FOUND}
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
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                </div>
                                                {/* {!loginWithPassword ? (
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
                                                    phoneNumber?.length > 0
                                                        ? 'cursor-pointer'
                                                        : 'cursor-not-allowed'
                                                }`}
                                            >
                                                <p className="text-gray-400 "> | </p>
                                                <p>{APP_TEXTS.SEND_CODE}</p>
                                            </div>
                                        </div>
                                        {error && (
                                            <p className="text-red-500 font-normal text-xs text-left mt-2">
                                                {error}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <> */}
                                                <div className="flex flex-row justify-between items-center border border-gray-500 bg-login-btn mt-2 rounded-md py-2.5 px-3">
                                                    <input
                                                        className="w-2/3 bg-login-btn"
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
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
                                                        placeholder="Email or username"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div
                                                    className={`flex flex-row justify-between items-center border-[1px] ${passwordBorderColor} bg-login-btn mt-2 rounded-md py-2.5 px-3`}
                                                >
                                                    <input
                                                        className="w-2/3 bg-login-btn"
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => passwordOperationsHandler(e)}
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
                                            <p
                                                onClick={forgetPasswordHandler}
                                                className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                                            >
                                                {APP_TEXTS.FORGOT_PASSWORD}
                                            </p>
                                            {/* // )} */}
                                        </p>
                                        <div
                                            onClick={loginHandler}
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
                                                        APP_TEXTS.LOGIN
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            onClick={goBackHandler}
                                            className="flex flex-row justify-center items-center gap-2 mt-4 cursor-pointer"
                                        >
                                            <img src={back} className="h-2.5 w-2.5 object-contain" />
                                            <p className="font-medium text-xs">Go Back</p>
                                        </div>
                                    </>
                                )}
                            </div>
                            {isMainLoginOption && (
                                <div className="mt-14  w-[21.888rem] mx-auto">
                                    <p className="font-normal text-[0.688rem] text-policy">
                                        By continuing with an account located in{' '}
                                        <span className="text-black cursor-pointer">Pakistan</span>, you
                                        agree to our{' '}
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
                            <div className="mt-3 bottom-0 relative">
                                <div className="border-t-[0.3px] border-gray-200 text-center pt-3.5">
                                    <h3 className="font-normal text-[0.938rem] flex flex-row items-center justify-center gap-1">
                                        {APP_TEXTS.NO_ACCOUNT}{' '}
                                        <span className="text-danger-1 font-semibold hover:underline cursor-pointer" onClick={handleSignupClick}>
                                            {APP_TEXTS.SIGN_UP}
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </>
                        ):(
                        <>
                            <div className="overflow-auto w-[21.888rem] mx-auto ">
                                <h2 className="font-bold text-3xl mt-5 mb-4">
                                    {isMainSignupOption ? 'Signup to Seezitt' : 'Signup'}
                                </h2>
                                    {signupNext == false ? (
                                        <>
                                        {isMainSignupOption ? (
                                            SIGNUP_OPTIONS?.map((option, index) => (
                                                <SignupHandler
                                                    singupItemClickHandler={signupItemClickHandler}
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
                                                        When’s your birthday?
                                                    </p>
                                                </div>
                                                <div className=" justify-between items-center mt-3.5">
                                                    <div className='flex flex-row'>
                                                        <FormControl fullWidth className='dobselectbox p-1'>
                                                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            className='bg-login-btn'
                                                            value={month}
                                                            label="Month"
                                                            onChange={handleMonthChange}
                                                        >
                                                            <MenuItem value={1}>January</MenuItem>
                                                            <MenuItem value={2}>Febuary</MenuItem>
                                                            <MenuItem value={3}>March</MenuItem>
                                                            <MenuItem value={4}>April</MenuItem>
                                                            <MenuItem value={5}>May</MenuItem>
                                                            <MenuItem value={6}>June</MenuItem>
                                                            <MenuItem value={7}>July</MenuItem>
                                                            <MenuItem value={8}>August</MenuItem>
                                                            <MenuItem value={9}>September</MenuItem>
                                                            <MenuItem value={10}>October</MenuItem>
                                                            <MenuItem value={11}>November</MenuItem>
                                                            <MenuItem value={12}>December</MenuItem>
                                                        
                                                        </Select>
                                                        </FormControl>

                                                        <FormControl fullWidth className='p-1'>
                                                        <InputLabel id="demo-simple-select-label">Date</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            className='bg-login-btn'
                                                            id="demo-simple-select"
                                                            value={date}
                                                            label="Month"
                                                            onChange={handleDateChange}
                                                        >
                                                            <MenuItem value={1}>1</MenuItem>
                                                            <MenuItem value={2}>2</MenuItem>
                                                            <MenuItem value={3}>3</MenuItem>
                                                            <MenuItem value={4}>4</MenuItem>
                                                            <MenuItem value={5}>5</MenuItem>
                                                            <MenuItem value={6}>6</MenuItem>
                                                            <MenuItem value={7}>7</MenuItem>
                                                            <MenuItem value={8}>8</MenuItem>
                                                            <MenuItem value={9}>9</MenuItem>
                                                            <MenuItem value={10}>10</MenuItem>
                                                            <MenuItem value={11}>11</MenuItem>
                                                            <MenuItem value={12}>12</MenuItem>
                                                            <MenuItem value={13}>13</MenuItem>
                                                            <MenuItem value={14}>14</MenuItem>
                                                            <MenuItem value={15}>15</MenuItem>
                                                            <MenuItem value={16}>16</MenuItem>
                                                            <MenuItem value={17}>17</MenuItem>
                                                            <MenuItem value={18}>18</MenuItem>
                                                            <MenuItem value={19}>19</MenuItem>
                                                            <MenuItem value={20}>20</MenuItem>
                                                            <MenuItem value={21}>21</MenuItem>
                                                            <MenuItem value={22}>22</MenuItem>
                                                            <MenuItem value={23}>23</MenuItem>
                                                            <MenuItem value={24}>24</MenuItem>
                                                            <MenuItem value={25}>25</MenuItem>
                                                            <MenuItem value={26}>26</MenuItem>
                                                            <MenuItem value={27}>27</MenuItem>
                                                            <MenuItem value={28}>28</MenuItem>
                                                            <MenuItem value={29}>29</MenuItem>
                                                            <MenuItem value={30}>30</MenuItem>
                                                            
                                                        
                                                        </Select>
                                                        </FormControl>

                                                        <FormControl fullWidth className='p-1'>
                                                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            className='bg-login-btn'
                                                            value={year}
                                                            label="Month"
                                                            onChange={handleYearChange}
                                                        >
                                                        {(function (rows, i, len) {
                                                                while (--i >= len) {
                                                                rows.push(<MenuItem value={i}>{i}</MenuItem>)
                                                                }
                                                                return rows;
                                                            })([], 2025, 1900)}
                                                        
                                                        </Select>
                                                        </FormControl>
                                                        
                                                    </div>

                                                </div>
                                                <div className="flex flex-row justify-between items-center mt-3.5">
                                                    <p className="font-medium text-[0.938rem]">
                                                        {signupWithPhone ? 'Phone' : 'Email'}
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
                                                                onClick={countryCodeModelHandler}
                                                                className="flex flex-row items-center gap-2 flex-1 cursor-pointer relative"
                                                            >
                                                                <p>{isoCode + ' ' + countryCode}</p>
                                                                <img
                                                                    className={`object-contain h-2.5 w-2.5 chevron ${
                                                                        countryModelOpened ? 'rotate' : ''
                                                                    }`}
                                                                    src={chevronDown}
                                                                />
                                                                <p className="text-gray-400 "> | </p>
                                                                {countryModelOpened && (
                                                                    <div
                                                                        onClick={modelClickHandler}
                                                                        className={`absolute ${
                                                                            filteredCountryCodes.length === 0
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
                                                                                onChange={handleSearchChange}
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
                                                                                    {APP_TEXTS.NO_RESULT_FOUND}
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
                                                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>
                                                        { emailIdError ?  
                                                            (<p className="font-light text-left text-xs text-red-700 mt-2.5" >
                                                                {"Please enter email id"}
                                                            </p>):null}
        
                                                        <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md py-2.5 px-3">
                                                            <input
                                                                className="w-2/3 bg-gray-100"
                                                                type="text"
                                                                placeholder="Enter 6-digit code"
                                                                name="code"
                                                                value={otpCode}
                                                                onChange={(e) => setOtpCode(e.target.value)}
                                                            />
                                                            <div className="flex flex-row justify-center items-center gap-2 flex-1">
                                                                <p className="text-gray-400 "> | </p>
                                                                <p onClick={sendOTPCode} >{otpbuttonText}</p>
                                                            </div>
                                                        </div>
                                                        {otpError ? (<p className="font-light text-left text-xs text-red-700 mt-2.5">
                                                                {"Please enter valid otp"}
                                                            </p>):null}
                                                       
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
                                                    onClick={goBackHandler}
                                                    className="flex flex-row justify-center items-center gap-2 mt-4 cursor-pointer"
                                                >
                                                    <img src={back} className="h-2.5 w-2.5 object-contain" />
                                                    <p className="font-medium text-xs">Go Back</p>
                                                </div>
                                            </>
                                            )}
                                        </>
                                    ):(
                                        <>
                                            <div className="flex flex-row justify-between items-center mt-3.5">
                                                <p className="font-medium text-[0.938rem]">
                                                        Password
                                                 </p>
                                            </div>
                                            <div className="flex flex-row justify-between items-center border border-gray-500 bg-login-btn mt-2 rounded-md py-2.5 px-3">
                                                
                                                <input
                                                    className="w-2/3 bg-login-btn"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
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
                                                    type='text'
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
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
                                             { isError ? ( <p className="font-light text-left text-xs text-red-700 mt-2.5">
                                                {errorMessage}
                                            </p>):null} 

                                            <div
                                                    onClick={goBackSignupHandler}
                                                    className="flex flex-row justify-center items-center gap-2 mt-4 cursor-pointer"
                                                >
                                                    <img src={back} className="h-2.5 w-2.5 object-contain" />
                                                    <p className="font-medium text-xs">Go Back</p>
                                                </div>
                                               
                                        </>
                                    )}

                            </div>
                            {isMainLoginOption && (
                                <div className="mt-14  w-[21.888rem] mx-auto">
                                    <p className="font-normal text-[0.688rem] text-policy">
                                        By continuing with an account located in{' '}
                                        <span className="text-black cursor-pointer">Pakistan</span>, you
                                        agree to our{' '}
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
                            <div className="mt-3 bottom-0 relative">
                                <div className="border-t-[0.3px] border-gray-200 text-center pt-3.5">
                                    <h3 className="font-normal text-[0.938rem] flex flex-row items-center justify-center gap-1">
                                        {SIGNUP_APP_TEXTS.ALREADY_ACCOUNT}{' '}
                                        <span className="text-danger-1 font-semibold hover:underline cursor-pointer" onClick={handleLoginClick}>
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
            <PopupForVideoPlayer
                gifts={() => setGiftsPopup(true)}
                onBlockPopup={() => setBlockPopup(true)}
                onReportPopup={() => setReportPopup(true)}
                videoModal={videoModal}
                onclose={() => setVideoModal(false)}
                info={videoModalInfo}
                sendPopupHandler={() => setSendPopup(true)}
            />
            <PopupForReport
                openReport={reportPopup}
                onReportClose={() => setReportPopup(false)}
                info={videoModalInfo}
            />
            <PopupForBlock
                openBlock={blockPopup}
                onBlockClose={() => setBlockPopup(false)}
                onReportClose={() => setReportPopup(false)}
                info={videoModalInfo}
                userId={{ id: videoModalInfo?.user?._id, name: videoModalInfo?.user?.name }}
            />
            <Gifts
                mediaId={videoModalInfo?.mediaId}
                openGifts={giftsPopup}
                onGiftsClose={() => setGiftsPopup(false)}
            />
            <Forwardusers onOpen={sendPopup} onClose={() => setSendPopup(false)} />
        </div>
    );
}

export default HomePage;
