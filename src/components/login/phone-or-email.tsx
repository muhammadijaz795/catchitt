import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { back, checkCountryCode, chevronDown, logoAuth, search } from '../../icons';
import { APP_TEXTS } from '../../utils/constants';
import Footer from './footer';

const PhoneOrEmail = (props: any) => {
    const [loginWithPhone, setLoginWithPhone] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [code, setCode] = useState<any>(null);
    const [loginWithPassword, setLoginWithPassword] = useState<boolean>(false);
    const [countryModelOpened, setCountryModelOpened] = useState(false);
    const [countryCodes, setCountryCodes] = useState([
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Afghanistan +93', value: 'AF +93' },
        { countryCode: 'Pakistan +92', value: 'PK +92' },
    ]);
    const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);

    // Input Values
    const [phoneNumber, setPhoneNumber] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>();

    const toggleLoginMethod = () => {
        setLoginWithPhone(!loginWithPhone);
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
        } else {
            forgetPasswordHandler();
        }
    };

    const loginWithPasswordToggler = () => {
        setLoginWithPassword(!loginWithPassword);
    };

    const forgetPasswordHandler = () => {
        console.log('Forget password');
    };

    const countryCodeModelHandler = () => {
        setCountryModelOpened(!countryModelOpened);
    };

    const modelClickHandler = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
    };

    // Filter country codes based on search query
    const filteredCountryCodes = countryCodes.filter((countryItem) =>
        countryItem.countryCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const countryItemClickHandler = (
        countryItem: { countryCode: string; value: string },
        index: number
    ) => {
        // setSearchQuery(countryItem?.countryCode);
        setSelectedCountryIndex(index);
        setCountryCode(countryItem?.value);
        countryCodeModelHandler();
    };

    const menuClickHandler = () => {
        if (countryModelOpened) {
            countryCodeModelHandler();
        }
    };

    const goBackHandler = () => {
        navigate(-1);
    };

    useEffect(() => {
        setCountryCode(countryCodes[0].value);
    }, []);

    return (
        <div onClick={menuClickHandler} className="h-screen">
            <div className="flex flex-row justify-between items-center p-3">
                <img className="object-contain h-12 w-24" src={logoAuth} />
                <div className="flex flex-row justify-center items-center gap-2">
                    <p className="border-[2px] rounded-full w-5 h-5 text-xs text-gray-400 font-semibold border-gray-400 text-center cursor-pointer">
                        ?
                    </p>
                    <p className="hover:underline cursor-pointer">{APP_TEXTS.FEEDBACK}</p>
                </div>
            </div>
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
                            <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5">
                                <div
                                    onClick={countryCodeModelHandler}
                                    className="flex flex-row items-center gap-2 flex-1 cursor-pointer relative"
                                >
                                    <p>{countryCode}</p>
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
                                                    className="w-full text-sm font-normal caret-red-500"
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
                                                {filteredCountryCodes.map((countryItem, index) => (
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
                                                            {countryItem?.countryCode}
                                                        </p>
                                                        {selectedCountryIndex === index && (
                                                            <img
                                                                className="h-4 w-4 object-contain"
                                                                alt="check-mark"
                                                                src={checkCountryCode}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                                {filteredCountryCodes.length === 0 && (
                                                    <p className="font-normal text-gray-400 text-xs hover:bg-gray-50 my-2">
                                                        No result found
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    className="w-2/3 bg-gray-100"
                                    type="tel"
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            {!loginWithPassword ? (
                                <>
                                    <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md py-2.5 px-3">
                                        <input
                                            className="w-2/3 bg-gray-100"
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
                                            <p>Send code</p>
                                        </div>
                                    </div>
                                    {error && (
                                        <p className="text-red-500 font-normal text-xs text-left mt-2">
                                            {error}
                                        </p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-row justify-between items-center border border-gray-500 bg-gray-100 mt-2 rounded-md py-2.5 px-3">
                                        <input
                                            className="w-2/3 bg-gray-100"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
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
                        </>
                    ) : (
                        <>
                            <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5">
                                <input
                                    className="w-2/3 bg-gray-100"
                                    type="text"
                                    placeholder="Email or username"
                                />
                            </div>
                            <div className="flex flex-row justify-between items-center border border-gray-500 bg-gray-100 mt-2 rounded-md py-2.5 px-3">
                                <input
                                    className="w-2/3 bg-gray-100"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
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
                        {loginWithPhone && !loginWithPassword ? (
                            'Log in with password'
                        ) : loginWithPassword ? (
                            <div className="flex flex-row items-center gap-3 -mt-2.5">
                                <p
                                    onClick={forgetPasswordHandler}
                                    className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                                >
                                    Forgot password?
                                </p>
                                <p className="font-medium text-left text-xs text-gray-300 mt-2.5 hover:underline cursor-pointer">
                                    |
                                </p>
                                <p
                                    onClick={loginWithPasswordToggler}
                                    className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                                >
                                    Log in with code
                                </p>
                            </div>
                        ) : (
                            <p
                                onClick={forgetPasswordHandler}
                                className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                            >
                                Forgot password?
                            </p>
                        )}
                    </p>
                    <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-4 rounded-md py-2.5 px-3 cursor-pointer">
                        <div className="flex flex-row justify-center items-center gap-2 flex-1">
                            <p>Log in</p>
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
