import { useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Forwardusers from '../../shared/popups/shareTo/Forwardusers';
import Gifts from '../discover/popups/gifts';
import PopupForReport from '../profile/popups/PopupForReport';
import PopupForBlock from '../profile/popups/popupForBlock';
import PopupForVideoPlayer from '../profile/popups/popupForVideoPlayer';
import ForDesktop from './ForDesktop';
import ForMobile from './ForMobile';
import useHome from './hooks/useHome';
import { CircularProgress } from '@mui/material';



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
    const [darkTheme, setdarkTheme] = useState('');
    const [lightDarkTheme, setlightDarkTheme] = useState('');
    const [darkWhiteTheme, setDarkWhiteTheme] = useState('');
    
    

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

    // const passwordOperationsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.target.value);
    //     setIsError(false);
    //     setPasswordBorderColor('');
    // };

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

    function generateMenuItems() {
        const rows = [];
        let i = 2025; // Start with 2025
        const len = 1900; // End at 1900
      
        while (i >= len) {
          rows.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
          i--; // Decrement i in each iteration
        }
      
        return rows;
      }

      useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if(themeColor == "dark"){ 
            setdarkTheme(style.darkTheme);
            setlightDarkTheme(style.lightdarkTheme);
            setDarkWhiteTheme('');
        } else{
            setDarkWhiteTheme('hover:bg-slate-100');
        }
    });

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
            <ToastContainer />
        </div>
    );
}

export default HomePage;
