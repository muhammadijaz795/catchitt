import classNames from 'classnames';
import Logo from '../../assets/Logo.png';
import authSplashImg from '../../assets/authSplashImg.png';
import InputField from '../reusables/InputField';
import styles from './set-newPassword..module.scss';
// import atForgotPwd from '../../assets/atForgotPwd.png';
// import resend from '../../assets/resend.png';
import cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import i18next from 'i18next';
// import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import Account from '../settings-page/account';
import Input from '../authentication/components/Input';
import { arrow } from '../../icons';

export interface SetNewPasswordProps {
    className?: string;
}

interface User {
    email: string;
    password: string;
    confirmPassword: string;
    token: string;
}

const defaultUser: User = {
    email: '',
    password: '',
    confirmPassword: '',
    token: '',
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

export const SetNewPassword = ({ className }: SetNewPasswordProps) => {
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode) || languages[0];
    const [, setLanguageSelector] = useState(currentLanguage.name);
    const [pwisvisible, setpwisvisible] = useState(false);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    const API_KEY = process.env.VITE_API_URL;
    const forgotPwdEndPoint = '/auth/password/set-new';
    const [errorMessage, setErrorMessage] = useState('');
    // const [form] = useState('forgotPwd');
    const [user, setUser] = useState(defaultUser);
    const [response, setResponse] = useState(false);
    const [responseResult, setResponseResult] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const { pathname } = location;
        const pathSegments = pathname.split('/');

        user.email = pathSegments[2];
        user.token = pathSegments.slice(3).join('/');

        console.log('Email:', user.email);
        console.log('Token:', user.token);
    }, []);

    const handleLanguageChange = (code: string, name: string) => {
        // i18next.changeLanguage(code);
        setLanguageSelector(name);
    };

    const onUserChange = <P extends keyof User>(prop: P, value: User[P]) => {
        setUser({ ...user, [prop]: value });
    };

    /** Handling Forgot Password Scenario */
    const handleSetNewPassword = async (password: string, email: string, token: string) => {
        try {
            const response = await fetch(`${API_KEY}/auth/password/set-new`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ password, email, token }),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setResponseResult(responseData.message);
                setResponse(true);
                navigate('/auth');
            } else {
                setErrorMessage('Please make sure the password aligns with the requirements');
                console.log(response.statusText);
            }
        } catch (error) {
            setErrorMessage('Please make sure the password aligns with the requirements');
            console.log(error);
        }
    };

    const handleSetNewPasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setErrorMessage('');
        if (user.password !== user.confirmPassword) {
            setErrorMessage('Passwords are not matching');
            return;
        } else {
            const { password, email, token } = user;
            handleSetNewPassword(password, email, token);
        }
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

    if (isLoggedIn) {
        return (
            <div>
                <Account openModal={true} />
            </div>
        );
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

            {/* <div className={styles.AuthForm}> */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    flexDirection: 'column',
                    padding: '0px 80px',
                    alignItems: 'center',
                    marginBottom: 45,
                    position: 'relative',
                    height: '100vh',
                }}
            >
                <div
                    // className={styles.formContainer}
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '560px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* <form className={styles.authInputFields}> */}
                    <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <h3 className={styles.creatTitle}>Create your password</h3>
                        <p
                            className={styles.formParagraph}
                            style={{ margin: '32px 0px', padding: '0px 20px' }}
                        >
                            Your new password must have: 8 to 64 characters, Letters, numbers and
                            special characters
                        </p>
                        <div>
                            {errorMessage !== '' ? (
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
                            <Input
                                type={pwisvisible ? 'text' : 'password'}
                                placeholder="Password"
                                className="formInputFields"
                                value={user.password}
                                onChange={(e: { target: { value: string } }) => {
                                    onUserChange('password', e.target.value);
                                }}
                                passwordToggler={true}
                                showPasswordH={() => setpwisvisible(!pwisvisible)}
                            />
                            <Input
                                type={pwisvisible ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                className="formInputFields"
                                value={user.confirmPassword}
                                onChange={(e: { target: { value: string } }) => {
                                    onUserChange('confirmPassword', e.target.value);
                                }}
                                passwordToggler={true}
                                showPasswordH={() => setpwisvisible(!pwisvisible)}
                            />
                            {/* <InputField
                                type="password"
                                placeholder="Password"
                                className="formInputFields"
                                value={user.password}
                                onChange={(e: { target: { value: string } }) => {
                                    onUserChange('password', e.target.value);
                                }}
                            />
                            <InputField
                                type="password"
                                placeholder="Confirm Password"
                                className="formInputFields"
                                value={user.confirmPassword}
                                onChange={(e: { target: { value: string } }) => {
                                    onUserChange('confirmPassword', e.target.value);
                                }}
                            /> */}
                        </div>

                        <div className={styles.signupSubmitDiv}>
                            <button
                                className={styles.signupSubmitBtn}
                                onClick={handleSetNewPasswordSubmit}
                            >
                                Submit
                            </button>
                            {response ? renderResponse() : ''}
                        </div>
                    </form>
                    {/* )} */}
                </div>
                {/* <div className={styles.afterTheFormDiv}> */}
                <div style={{ width: '100%' }}>
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
                                className={classNames(styles.langSelector)}
                            >
                                {currentLanguage.name}
                                <span className="m-md-1" style={{marginLeft:8}}>
                                    <img src={arrow} alt="" />
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
                                                handleLanguageChange(code, name);
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
