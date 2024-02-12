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

export interface ForgotPasswordProps {
    className?: string;
}

interface User {
    email: string;
    otp: any;
}

const defaultUser: User = {
    email: '',
    otp: null
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

export const ForgotPassword = ({ className }: ForgotPasswordProps) => {
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t, i18n } = useTranslation();

    const API_KEY = process.env.VITE_API_URL;
    const forgotPwdEndPoint = '/auth';
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(defaultUser);
    const [response, setResponse] = useState(false);
    const [responseResult, setResponseResult] = useState('');
    const [form, setForm] = useState('');
    const [otp, setOtp] = useState<any>(null);
    let myOtp = +otp;
    const onUserChange = <P extends keyof User>(prop: P, value: User[P]) => {
        setUser({ ...user, [prop]: value });
    };

    /** Handling Forgot Password Scenario */
    const handleForgotPassword = async (email: string) => {
        try {
            const response = await fetch(`${API_KEY}${forgotPwdEndPoint}/password/forgot`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setResponseResult(responseData.message);
                setForm('verifyOTP')
            } else {
                setErrorMessage('Invalid email');
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email');
        }
    };

    const handleForgotPasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { email } = user;
        handleForgotPassword(email);
    };

    const renderResponse = () => {
        return (
            <div
                style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    color: 'green',
                    marginBottom: '20px',
                }}
            >
                {responseResult}
            </div>
        );
    };



    const handleVerifySubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const { email } = user;
        handleVerify(email, otp);
    }

    const handleVerify = async (email: string, otp: number) => {

        try {
            const response = await fetch(`${API_KEY}/auth/verifyOtp`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email: email, otp: myOtp }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setResponse(true);
            } else {
                // Handle the error response from the server
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);

                console.log(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password');
        }
    }

    if (response) {
        let theOtp = otp;
        user.otp = theOtp
        return (
            <SetNewPassword email={user.email} otp={user.otp} />
        )
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
                        justifyContent: 'space-between'
                    }}
                >
                    {form === 'verifyOTP' ? (

                        <div className={styles.otpForm}>
                            <h4>
                                Verify your email
                            </h4>
                            <p>
                                We sent an OTP to your email.
                            </p>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span></span>}
                                inputStyle={otp === '' ? styles.otpInput : styles.otpInputNotEmpty}
                                containerStyle={styles.otpContainer}
                                renderInput={(props) => <input {...props} />}
                                inputType={"tel"}
                                skipDefaultStyles={true}
                            />
                            <div className={styles.signupSubmitDiv}>
                                <button
                                    className={styles.signupSubmitBtn}
                                    onClick={handleVerifySubmit}
                                >
                                    Verify code
                                </button>
                            </div>
                            <div> Resend code </div>
                        </div>
                    ) : (
                        <form className={styles.authInputFields}>
                            <h3 className={styles.creatTitle} style={{ marginTop: '10%' }}>
                                {t('forgotpassword.link')}
                            </h3>
                            <p>{t('dontworry.text')}</p>
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
                            <div className={styles.inputsDiv}>
                                <InputField
                                    type="email"
                                    placeholder={t('email.input')}
                                    className="formInputFields"
                                    value={user.email}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('email', e.target.value);
                                    }}
                                />
                            </div>

                            <div className={styles.signupSubmitDiv}>
                                <button
                                    className={styles.signupSubmitBtn}
                                    onClick={handleForgotPasswordSubmit}
                                >
                                    {t('emailmeinstructions.btn')}
                                </button>
                                {response ? renderResponse() : ''}
                            </div>
                        </form>
                    )}

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
                                            className={classNames("dropdown-item", {
                                                disabled: currentLanguageCode === code,
                                            })}
                                            onClick={() => {
                                                console.log(`Changing language to: ${code}`);
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