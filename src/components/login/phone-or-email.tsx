import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { back, checkCountryCode, chevronDown, search } from '../../icons';
import { loginService } from '../../redux/reducers/auth';
import { APP_TEXTS, END_POINTS, METHOD } from '../../utils/constants';
import Footer from './footer';
import Header from './header';

const PhoneOrEmail = (props: any) => {
    const [loginWithPhone, setLoginWithPhone] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
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

    const toggleLoginMethod = () => {
        setLoginWithPhone(!loginWithPhone);
    };

    const loginHandler = async () => {
        setIsLoading(true);
        dispatch(loginService({ password, email }))
            .then((res: any) => {
                if (res?.error) {
                    setIsError(true);
                    setPasswordBorderColor('border-red-400');
                    setErrorMessage(res?.payload || res?.error?.message);
                    setIsLoading(false);
                } else if (res?.payload?.status == 200) {
                    console.log('data after successfull login', res?.payload?.data);
                    setIsLoading(false);
                    navigate('/home');
                }
            })
            .catch((error: any) => {
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
        navigate('/login/forget-password', { state: { showEmail: !loginWithPhone } });
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
        navigate(-1);
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
        <div onClick={menuClickHandler} className="h-screen">
            <Header />
            <div className="w-[22.688rem] mx-auto mt-14 h-auto">
                <div className="overflow-visible">
                    <h2 className="font-bold text-3xl">Log in</h2>
                    <div className="flex flex-row justify-between items-center mt-3.5">
                        <p className="font-medium text-[0.938rem]">
                            {loginWithPhone ? 'Phone' : 'Email or username'}
                        </p>
                        <p
                            onClick={toggleLoginMethod}
                            className="font-medium text-xs text-gray-600 cursor-pointer hover:underline"
                        >
                            {loginWithPhone ? 'Log in with email or username' : 'Log in with phone'}
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
                                                filteredCountryCodes.length === 0 ? 'h-fit' : 'h-80'
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
                                                    filteredCountryCodes.length === 0
                                                        ? 'h-fit'
                                                        : 'max-h-[17.188rem]'
                                                } `}
                                            >
                                                {filteredCountryCodes.map(
                                                    (countryItem: any, index: number) => (
                                                        <div
                                                            onClick={() =>
                                                                countryItemClickHandler(
                                                                    countryItem,
                                                                    index
                                                                )
                                                            }
                                                            key={index}
                                                            className={`flex flex-row justify-between items-center p-2.5 cursor-pointer mb-2 rounded-b-md ${
                                                                selectedCountryIndex === index
                                                                    ? 'bg-gray-50'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <p className="font-normal text-black text-left text-xs hover:bg-gray-50">
                                                                {countryItem?.name +
                                                                    ' ' +
                                                                    countryItem?.code}
                                                            </p>
                                                            {selectedCountryIndex === index && (
                                                                <img
                                                                    className="h-4 w-4 object-contain"
                                                                    alt="check-mark"
                                                                    src={checkCountryCode}
                                                                />
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                                {filteredCountryCodes.length === 0 && (
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
                        className={`flex flex-row items-center bg-login-btn mt-4 rounded-md py-2.5 px-3 cursor-pointer`}
                    >
                        <div className="flex flex-row justify-center items-center gap-2 flex-1">
                            <p>
                                {isLoading ? (
                                    <CircularProgress
                                        style={{ width: 18, height: 18, color: 'red' }}
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
                </div>
            </div>
            <div className="absolute w-full bottom-0 z-20">
                <div className="border-t border-custom-1 text-center p-4 bg-white">
                    <h3 className="font-normal text-[0.938rem] flex flex-row items-center justify-center gap-1">
                        {APP_TEXTS.NO_ACCOUNT}{' '}
                        <span className="text-danger-1 font-semibold hover:underline cursor-pointer">
                            {APP_TEXTS.SIGN_UP}
                        </span>
                    </h3>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default PhoneOrEmail;
