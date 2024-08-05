import classNames from 'classnames';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import Logo from '../../assets/Logo.png';
import authSplashImg from '../../assets/authSplashImg.png';
import InputField from '../reusables/InputField';
import { SetNewPassword } from '../set-newPassword/set-newPassword';
import styles from './forgot-password.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from '../../utils/db';
export interface ForgotPasswordProps {
    className?: string;
}

interface User {
    email: string | undefined;
    otp: any;
}

const defaultUser: User = {
    email: '',
    otp: null,
};

interface Languages {
    code: string;
    name: string;
    country_code: string;
}

const languages: Languages[] = [
    {
        code: 'en',
        name: 'English',
        country_code: 'gb',
    },
    {
        code: 'ar',
        name: 'العربية',
        country_code: 'sa',
    },
];

export const OtpVerification = ({ className }: ForgotPasswordProps) => {
    const navigate = useNavigate();
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t, i18n } = useTranslation();

    const API_KEY = process.env.VITE_API_URL;
    const forgotPwdEndPoint = '/auth';
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(defaultUser);
    const [response, setResponse] = useState(false);
    const [isSignupOtp, setIsSignupOtp] = useState(false);

    const [otpMessage, setOtpMessage] = useState('We sent an OTP to your email.');
    const [otp, setOtp] = useState<any>(null);
    let myOtp = +otp;

    const [isMail, setIsMail] = useState(true);

    const profileData = useSelector((state: any) => state?.reducers?.profile);

    const { email } = useParams();

    // if(email != ""){
    //     setUser({email, otp: ""});
    // }
    //**api call for resend api */

    const handleResendOtp: any = async (email: string) => {
        if (email == '') {
            setErrorMessage('No Email');
            return;
        }
        try {
            const response = await fetch(`${API_KEY}${forgotPwdEndPoint}/generateOtp/${email}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
                // body: JSON.stringify({ email: email }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setOtpMessage(responseData.message);
                setOtp('');
            } else {
                setErrorMessage('Invalid email');
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email');
        }
    };

    const handleRecendOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // const { email } = user;
        setErrorMessage('');
        handleResendOtp(email);
    };

    const handleVerifySubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // const { email } = user;
        handleVerify(email, otp);
    };

    const handleVerify = async (email: string | undefined, otp: number) => {
        try {
            const response = await fetch(`${API_KEY}/auth/verifyOtp`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // This line won't have an effect here, as it's the server that needs to set this header
                },
                body: JSON.stringify({ email: email, otp: myOtp }),
            });

            let isSignup = localStorage.getItem('isSignupOtp');
            if (isSignup && isSignup == 'true') {
                setIsSignupOtp(true);
            }

            if (response.ok) {
                if (isSignupOtp) {
                    localStorage.setItem('userId', profileData?._id || '');
                    localStorage.setItem('token', profileData?.token || '');
                    localStorage.setItem('profile', profileData || '');
                    db.profile.add(profileData);
                    localStorage.getItem('isSignupOtp');
                    if (localStorage.getItem('isSignupOtp')) {
                        localStorage.removeItem('isSignupOtp');
                    }
                    navigate('/home');
                } else {
                    const responseData = await response.json();
                    setResponse(true);
                }
            } else {
                // Handle the error response from the server
                const errorResponseData = await response.json();
                // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorResponseData.message);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password');
        }
    };

    if (response) {
        let theOtp = otp;
        user.otp = theOtp;
        return <SetNewPassword email={email} otp={user.otp} />;
    }

    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.AuthSplashImg}>
                <div className={styles.logoDiv}>
                    <img alt={''} src={Logo} />
                </div>
                <div className={styles.splashImgDiv}>
                    <img alt={''} src={authSplashImg} className={styles.LoginImg} />
                </div>
                <div className={styles.footer}>
                    <p className={styles['footer-paragraph']}>
                        © 2023 SeezItt from PoshEnterpriseInc
                    </p>
                    <p className={styles['footer-paragraph']}>Terms and conditions </p>
                </div>
            </div>

            <div className={styles.AuthForm}>
                {/** Sign Up Flow */}
                <div></div>
                <div
                    className={styles.formContainer}
                    style={{
                        // marginTop: '25%',
                        marginBottom: '0%',
                        // marginLeft: '80px',
                        width: '80%',
                        alignContent: 'center',
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div className={styles.otpForm}>
                        <h4>Verify your email</h4>
                        <p>
                            {otpMessage}
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
                            </div>
                        </p>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span></span>}
                            inputStyle={otp === '' ? styles.otpInput : styles.otpInputNotEmpty}
                            containerStyle={styles.otpContainer}
                            renderInput={(props) => <input {...props} />}
                            inputType={'tel'}
                            skipDefaultStyles={true}
                        />
                        <div className={styles.signupSubmitDiv}>
                            <button className={styles.signupSubmitBtn} onClick={handleVerifySubmit}>
                                Verify code
                            </button>
                        </div>
                        <div onClick={handleRecendOtpSubmit} className={styles.resendCodeBtn}>
                            {' '}
                            Resend code{' '}
                        </div>
                    </div>
                </div>
                <div className={styles.afterTheFormDiv}>
                    <div className={classNames(styles.footerLightBg)}>
                        <p className={styles['footer-p-lightBg']}>Privacy Policy</p>
                        <p className={styles['footer-p-lightBg']}>About</p>
                        <p className={styles['footer-p-lightBg']}>Help center</p>
                        <div className="language-select">
                            <button
                                type="button"
                                id="dropdownDefaultButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                className={styles.langSelector}
                            >
                                {currentLanguage?.name}
                                <span className="m-md-1">
                                    <svg
                                        width="7"
                                        height="6"
                                        viewBox="0 0 7 6"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.5 6L6.53109 0.75H0.468911L3.5 6Z"
                                            fill="#D9D9D9"
                                        />
                                    </svg>
                                </span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownDefaultButton">
                                {languages.map(({ code, name, country_code }) => (
                                    <li key={country_code}>
                                        <a
                                            href="#"
                                            className={classNames('dropdown-item', {
                                                disabled: currentLanguageCode === code,
                                            })}
                                            onClick={() => {
                                                i18next.changeLanguage(code);
                                            }}
                                        >
                                            <span
                                                className={`flag-icon flag-icon-${country_code} `}
                                                style={{
                                                    opacity: currentLanguageCode === code ? 0.5 : 1,
                                                }}
                                            ></span>
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
