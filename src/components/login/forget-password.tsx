import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { checkCountryCode, chevronDown, search } from '../../icons';
import {
    APP_TEXTS,
    END_POINTS,
    METHOD,
    STATUS_CODE,
    showToastError,
    showToastSuccess,
} from '../../utils/constants';
import Footer from './footer';
import Header from './header';
import { loginService } from '../../redux/reducers/auth';
import { useDispatch } from 'react-redux';
import Loader from '../loader';

const ForgetPassword = () => {
    const location = useLocation();
    const { showEmail } = location.state || {}; // Default to an empty object if state is undefined
    const [resetWithPhone, setResetWithPhone] = useState<boolean>(!showEmail);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [code, setCode] = useState<any>(null);
    const [countryModelOpened, setCountryModelOpened] = useState<boolean>(false);
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(-1);
    const API_KEY = process.env.VITE_API_URL;

    // Input Values
    const [phoneNumber, setPhoneNumber] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isoCode, setIsoCode] = useState<string>('');
    const [loadingOtp, setLoadingOtp] = useState<boolean>(false);
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const toggleResetMethod = () => {
        if (resetWithPhone) {
            setPhoneNumber(null);
        } else {
            setEmail('');
        }
        setResetWithPhone(!resetWithPhone);
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
                    navigate('/home');
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

    useEffect(() => {
        fetchCountriesList();
    }, []);

    return (
        <div onClick={menuClickHandler} className="h-screen">
            <Header />
            <div className="w-[22.688rem] mx-auto mt-14 h-auto">
                <div className="overflow-visible">
                    <h2 className="font-bold text-3xl">Reset password</h2>
                    <div className="flex flex-row justify-between items-center mt-3.5">
                        <p className="font-medium text-[0.938rem]">
                            {resetWithPhone ? 'Enter phone number' : 'Enter email address'}
                        </p>
                        <p
                            onClick={toggleResetMethod}
                            className="font-medium text-xs text-gray-600 cursor-pointer hover:underline"
                        >
                            {resetWithPhone ? 'Reset with email' : 'Reset with phone number'}
                        </p>
                    </div>
                    {resetWithPhone ? (
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
                                                            ˝
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
                    ) : (
                        <div className="flex flex-row items-center border border-gray-500 bg-login-btn mt-2 rounded-md p-2.5">
                            <input
                                className="w-2/3 bg-login-btn"
                                type="text"
                                placeholder="Email or username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    )}

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
                                phoneNumber?.length > 0 || email.length > 0
                                    ? 'cursor-pointer'
                                    : 'cursor-not-allowed'
                            }`}
                        >
                            <p className="text-gray-400 "> | </p>
                            <p
                                onClick={sendOTP}
                                className={`text-sm ${
                                    phoneNumber?.length > 0 || email.length > 0
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
                        <p className="text-red-500 font-normal text-xs text-left mt-2">{error}</p>
                    )}
                    <div className="flex flex-row justify-between items-center border border-gray-500 bg-login-btn mt-2 rounded-md py-2.5 px-3">
                        <input
                            className="w-2/3 bg-login-btn"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!showPassword ? (
                            <Visibility style={{ cursor: 'pointer' }} onClick={togglePassword} />
                        ) : (
                            <VisibilityOff style={{ cursor: 'pointer' }} onClick={togglePassword} />
                        )}
                    </div>
                    <div
                        onClick={loginHandler}
                        className={`flex flex-row items-center ${
                            (phoneNumber?.length > 0 || email.length > 0) &&
                            code?.length > 0 &&
                            password?.length > 0
                                ? 'bg-red-500'
                                : 'bg-login-btn'
                        } mt-4 rounded-md py-2.5 px-3 cursor-pointer h-11`}
                    >
                        <div
                            className={`${
                                (phoneNumber?.length > 0 || email.length > 0) &&
                                code?.length > 0 &&
                                password?.length > 0
                                    ? 'text-white'
                                    : 'text-black'
                            } flex flex-row justify-center items-center gap-2 flex-1`}
                        >
                            <p>{loadingLogin ? <Loader /> : APP_TEXTS.LOGIN}</p>
                        </div>
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
            <ToastContainer />
        </div>
    );
};

export default ForgetPassword;
