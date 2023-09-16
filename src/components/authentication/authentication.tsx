import classNames from 'classnames';
import styles from './authentication.module.scss';
import authSplashImg from '../../assets/authSplashImg.png';
import Logo from '../../assets/Logo.png';
import facebookIcon from '../../assets/facebookIcon.png';
import appStoreBtn from '../../assets/appStoreBtn.png';
import playStoreBtn from '../../assets/playStoreBtn.png';
import InputField from '../reusables/InputField';
import IconButton from '@mui/material/IconButton';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

export interface AuthenticationProps {
    className?: string;
}

interface User {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
}

const defaultUser: User = {
    name: '',
    password: '',
    confirmPassword: '',
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

export const Authentication = (props: any) => {
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t, i18n } = useTranslation();

    // const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const API_KEY = process.env.VITE_API_URL;
    const signUpEndPoint = '/auth/sign-up';
    const signInEndPoint = '/auth/sign-in';
    const [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState('signin');
    const [user, setUser] = useState(defaultUser);
    const navigate = useNavigate();

    const { login } = useAuthStore();

    const onUserChange = <P extends keyof User>(prop: P, value: User[P]) => {
        setUser({ ...user, [prop]: value });
    };

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setForm(form === 'signin' ? 'signup' : 'signin');
    };

    /** Handling Sign Up Scenario */

    const handleSignUp = async (name: string, password: string, email: string) => {
        try {
            const response = await fetch(`${API_KEY}${signUpEndPoint}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ name, password, email }),
            });

            if (response.ok) {
                const responseData = await response.json();
                const { token } = responseData.data; // Extract token from data object
                // const name = responseData.name; // Assuming the 'name' field is present in the response data
                useAuthStore.setState({
                    isLoggedIn: true,
                    name: name,
                    token: token,
                });
                login(email, token, name); // Call the login function from the Zustand store
                // console.log(responseData);
                navigate('/home');
                // handleSignIn(email, password)
            } else {
                // Handle the error response from the server
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);

                console.log(response);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred while signing up');
        }
    };

    const handleSignUpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setErrorMessage('password is not matching');
            return;
        } else {
            e.preventDefault(); // Prevent the default form submission behavior
            const { name, password, email } = user;
            handleSignUp(name, password, email);
        }
    };

    /** Handling Sign In Scenario */
    const handleSignIn = async (password: string, email: string) => {
        try {
            const response = await fetch(`${API_KEY}${signInEndPoint}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ password, email }),
            });

            if (response.ok) {
                const responseData = await response.json();
                const { token, name } = responseData.data; // Extract token value from data object
                // const name = responseData.data; // Assuming the 'name' field is present in the response data
                useAuthStore.setState({
                    isLoggedIn: true,
                    name: name,
                    token: token,
                });
                login(email, token, name); // Call the login function from the Zustand store
                console.log(responseData);
                navigate('/home');
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
    };

    const handleSignInSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const { password, email } = user;
        handleSignIn(password, email);
    };

    return (
        <div className={styles.container}>
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
                <div className={styles.formContainer} style={{ marginTop: '10%' }}>
                    {form === 'signup' ? (
                        <form className={styles.authInputFields}>
                            <h3 className={styles.creatTitle}>{t('createyouraccount.text')}</h3>
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
                                    type="text"
                                    placeholder={t('fullname.text')}
                                    className="formInputFields"
                                    value={user.name}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('name', e.target.value);
                                    }}
                                />
                                <InputField
                                    type="email"
                                    placeholder={t('email.input')}

                                    className="formInputFields"
                                    value={user.email}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('email', e.target.value);
                                    }}
                                />
                                <InputField
                                    type="password"
                                    placeholder={t('password.input')}
                                    className="formInputFields"
                                    value={user.password}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('password', e.target.value);
                                    }}
                                />
                                <InputField
                                    type="password"
                                    placeholder={t('confirmpassword.text')}
                                    className="formInputFields"
                                    value={user.confirmPassword}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('confirmPassword', e.target.value);
                                    }}
                                />
                            </div>
                            <p className={styles.formParagraph}>
                                {t('Bysigningupyouagreetoour.text')}{' '}
                                <a href="https://www.seezitt.com">{t('terms&conditions.text')}</a> {t('and.text')}{' '}
                                <a href="https://www.seezitt.com">{t('Privacypolicy.text')}</a>
                            </p>
                            <div className={styles.signupSubmitDiv}>
                                <button
                                    className={styles.signupSubmitBtn}
                                    onClick={handleSignUpSubmit}
                                >
                                    {t('signup.text')}
                                </button>
                            </div>
                            <div className={styles.splitLinesDiv}>
                                <hr className={styles.splitLine} />
                                <p className={styles.formParagraph}>{t('or.text')}</p>
                                <hr className={styles.splitLine} />
                            </div>
                        </form>
                    ) : /** Sign in Flow */
                        form === 'signin' ? (
                            <form className={styles.authInputFields}>
                                <h3 className={styles.creatTitle} style={{ marginTop: '10%' }}>
                                    {t('login.title')}
                                </h3>
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
                                    <InputField
                                        type="password"
                                        placeholder={t('password.input')}
                                        className="formInputFields"
                                        value={user.password}
                                        onChange={(e: { target: { value: string } }) => {
                                            onUserChange('password', e.target.value);
                                        }}
                                    />
                                </div>
                                <p
                                    className={classNames(
                                        styles.formParagraph,
                                        styles.formForgotPassword
                                    )}
                                >
                                    <a href="/forgot-password">{t("forgotpassword.link")}</a>{' '}
                                </p>
                                <div className={styles.signupSubmitDiv}>
                                    <button
                                        className={styles.signupSubmitBtn}
                                        onClick={handleSignInSubmit}
                                    >
                                        {t('login.text')}
                                    </button>
                                </div>
                                <div className={styles.splitLinesDiv}>
                                    <hr className={styles.splitLine} />
                                    <p className={styles.formParagraph}>{t("or.text")}</p>
                                    <hr className={styles.splitLine} />
                                </div>
                            </form>
                        ) : null}
                </div>
                <div className={styles.afterTheFormDiv}>
                    <div className={styles.socialLoginsDiv}>
                        {/* <IconButton className={styles.socialLoginIconBtn}>
                            <img src={googleIcon} alt="" className={styles.socialLoginIcon} />
                        </IconButton> */}
                        <IconButton className={styles.socialLoginIconBtn}>
                            <img src={facebookIcon} alt="" className={styles.socialLoginIcon} />
                        </IconButton>
                    </div>
                    {form === 'signup' ? (
                        <p className={styles.formParagraph}>
                            {t('alreadyhaveanaccount.text')}{' '}
                            <a
                                href="https://www.seezitt.com"
                                onClick={handleLinkClick}
                                className={styles.boldLinkText}
                            >
                                {t('login.text')}
                            </a>
                        </p>
                    ) : form === 'signin' ? (
                        <p className={styles.formParagraph}>
                            {t("notregistered.text")}{' '}
                            <a
                                href="https://www.seezitt.com"
                                onClick={handleLinkClick}
                                className={styles.boldLinkText}
                            >
                                {t("createaccount.text")}
                            </a>
                        </p>
                    ) : (
                        'null'
                    )}
                    <h3 className={classNames(styles.creatTitle, styles.getTheAppText)}>
                        {t('gettheapp.text')}{' '}
                    </h3>
                    <div className={styles.appStoresDiv}>
                        <img src={appStoreBtn} alt="" className={styles.appStoreBtn} />
                        <img src={playStoreBtn} alt="" className={styles.appStoreBtn} />
                    </div>
                    <div className={classNames(styles.footerLightBg)}>
                        <p className={styles['footer-p-lightBg']}>Privacy Policy</p>
                        <p className={styles['footer-p-lightBg']}>About</p>
                        <p className={styles['footer-p-lightBg']}>Help center</p>
                        {/* <p className={styles['footer-p-lightBg']}>English</p> */}
                        <div className="language-select">
                            {/* <div className="d-flex justify-content-end align-items-center language-select-root"> */}
                            {/* <div className="dropdown"> */}
                            <button
                                type="button"
                                id="dropdownDefaultButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                className={classNames(
                                    styles.langSelector
                                    // styles['footer-p-lightBg']
                                )}
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
