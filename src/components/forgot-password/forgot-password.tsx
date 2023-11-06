import classNames from 'classnames';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/Logo.png';
import atForgotPwd from '../../assets/atForgotPwd.png';
import authSplashImg from '../../assets/authSplashImg.png';
import resend from '../../assets/resend.png';
import InputField from '../reusables/InputField';
import styles from './forgot-password.module.scss';

export interface ForgotPasswordProps {
    className?: string;
}

interface User {
    email: string;
}

const defaultUser: User = {
    email: '',
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
                // const { token } = responseData.data; // Extract token value from data object
                console.log(responseData);
                setResponseResult(responseData.message);
                setResponse(true);
                // navigate('/dashboard');
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
                        marginLeft: '80px',
                        width: '80%',
                        alignContent: 'center',
                        alignSelf: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    {response ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', gap: '24px' }}>
                            <img src={atForgotPwd} alt="" className={styles.atForgotPwd} />
                            <h3 className={styles.creatTitle} style={{ marginTop: '5%' }}>
                                {t('checkyouremail.text')}
                            </h3>
                            <p>{t('wesentpassword.text')}</p>
                            <p>{t('didntreceiveemail.text')}</p>
                            <a
                                href="#"
                                onClick={handleForgotPasswordSubmit}
                                className={styles.boldLinkText}
                            >
                                <img
                                    src={resend}
                                    alt=""
                                    style={{ width: '14.5px', marginRight: '8.5px' }}
                                />
                                {t('clicktoresend.text')}
                            </a>
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