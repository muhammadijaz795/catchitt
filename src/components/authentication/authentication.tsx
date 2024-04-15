import { CircularProgress } from '@mui/material';
import classNames from 'classnames';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import appStoreBtn from '../../assets/appStoreBtn.png';
import authSplashImg from '../../assets/authSplashImg.png';
import playStoreBtn from '../../assets/playStoreBtn.png';
import { arrow } from '../../icons';
import { loginService, signupService } from '../../redux/reducers/auth';
import { useAuthStore } from '../../store/authStore';
import styles from './authentication.module.scss';
import Input from './components/Input';
import { i } from 'mathjs';

export interface AuthenticationProps {
    className?: string;
}

interface User {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    _id: string;
}

const defaultUser: User = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    _id: '',
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
    const navigate = useNavigate();
    const [inputTypeH, setInputTypeH] = useState<any>({
        login: false,
        signUp: false,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState('signin');
    const [user, setUser] = useState(defaultUser);
    const [Loader, setLoader] = useState(false);

    const onUserChange = <P extends keyof User>(prop: P, value: User[P]) => {
        setUser({ ...user, [prop]: value });
    };

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setForm(form === 'signin' ? 'signup' : 'signin');
    };
    const dispatch: any = useDispatch();

    /** Handling Sign Up Scenario */
    const handleSignUpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoader(true);
        if (user.password !== user.confirmPassword) {
            setErrorMessage('Password is not matching');
            return;
        } else {
            e.preventDefault();
            const { name, password, email } = user;
            dispatch(signupService({ name, password, email })).then(() => {
                setLoader(false);
                navigate('/home');
            });
        }
    };
 

    const handleSignInSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoader(true);
        const { password, email } = user;
        dispatch(loginService({ password, email }))
            .then((res:any) => {

                if(res?.error){
                     setErrorMessage('Invalid email or password');
                     setLoader(false);
                }else if(res?.payload?.status == 200){
                    console.log("data after successfull login")
                    console.log(res?.payload?.data)
                    setLoader(false); 
                    navigate('/home');
                }

            })
            .catch((error:any) => {
                console.error(error);
                setErrorMessage('Invalid email or password');
                setLoader(false);
            });
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
                    {/* <p className={styles['footer-paragraph']}>Terms and conditions </p> */}
                    <p className={styles['footer-p-lightBg']}>
                        <a
                            className={styles['footer-paragraph']}
                            href="https://seezitt.com/terms-conditions"
                            style={{ textDecoration: 'none' }}
                        >
                            {t('terms&conditions.text')}
                        </a>
                    </p>
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
                            <div
                                className={styles.inputsDiv}
                                style={{
                                    textAlign: currentLanguage?.code === 'ar' ? 'right' : 'left',
                                    direction: currentLanguage?.code === 'ar' ? 'rtl' : 'ltr',
                                    marginBottom: 24,
                                }}
                            >
                                <Input
                                    placeholder={t('fullname.text')}
                                    type="text"
                                    value={user.name}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('name', e.target.value);
                                    }}
                                />
                                <Input
                                    placeholder={t('email.input')}
                                    type="email"
                                    value={user.email}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('email', e.target.value);
                                    }}
                                />
                                <Input
                                    type={inputTypeH.signUp ? 'text ' : 'password'}
                                    placeholder={t('password.input')}
                                    value={user.password}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('password', e.target.value);
                                    }}
                                    showPasswordH={() =>
                                        setInputTypeH({ ...inputTypeH, signUp: !inputTypeH.signUp })
                                    }
                                    passwordToggler={true}
                                />
                                <Input
                                    type={inputTypeH.signUp ? 'text ' : 'password'}
                                    placeholder={t('confirmpassword.text')}
                                    value={user.confirmPassword}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('confirmPassword', e.target.value);
                                    }}
                                    showPasswordH={() =>
                                        setInputTypeH({ ...inputTypeH, signUp: !inputTypeH.signUp })
                                    }
                                    passwordToggler={true}
                                />
                            </div>
                            <p className={styles.p2}>
                                {t('Bysigningupyouagreetoour.text')}{' '}
                                <a
                                    className={styles.linkText}
                                    href="https://seezitt.com/terms-conditions"
                                >
                                    {t('terms&conditions.text')}
                                </a>{' '}
                                {t('and.text')}{' '}
                                <a
                                    className={styles.linkText}
                                    href="https://seezitt.com/privacy-policy"
                                >
                                    {t('Privacypolicy.text')}
                                </a>
                            </p>
                            <div className={styles.signupSubmitDiv}>
                                <button
                                    className={styles.signupSubmitBtn}
                                    onClick={handleSignUpSubmit}
                                >
                                    {Loader ? (
                                        <CircularProgress style={{ width: 18, height: 18 }} />
                                    ) : (
                                        t('signup.text')
                                    )}
                                </button>
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
                            <div
                                className={styles.inputsDiv}
                                style={{
                                    textAlign: currentLanguage?.code === 'ar' ? 'right' : 'left',
                                    direction: currentLanguage?.code === 'ar' ? 'rtl' : 'ltr',
                                }}
                            >
                                <Input
                                    type="email"
                                    placeholder={t('email.input')}
                                    value={user.email}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('email', e.target.value);
                                    }}
                                />
                                <Input
                                    placeholder={t('password.input')}
                                    type={inputTypeH.login ? 'text ' : 'password'}
                                    value={user.password}
                                    onChange={(e: { target: { value: string } }) => {
                                        onUserChange('password', e.target.value);
                                    }}
                                    showPasswordH={() =>
                                        setInputTypeH({ ...inputTypeH, login: !inputTypeH.login })
                                    }
                                    passwordToggler={true}
                                />
                            </div>
                            <p className={styles.formForgotPassword}>
                                <p
                                    className={styles.linkText}
                                    onClick={() => navigate('/forgot-password')}
                                >
                                    {t('forgotpassword.link')}
                                </p>{' '}
                            </p>
                            <div className={styles.signupSubmitDiv}>
                                <button
                                    className={styles.signupSubmitBtn}
                                    onClick={handleSignInSubmit}
                                >
                                    {Loader ? (
                                        <CircularProgress style={{ width: 18, height: 18 }} />
                                    ) : (
                                        t('login.text')
                                    )}
                                </button>
                            </div>
                            {/* <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 20,
                                    marginBottom: 32,
                                }}
                            >
                                <hr style={{ width: '100%' }} />
                                <p className={styles.or}>OR</p>
                                <hr style={{ width: '100%' }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 16,
                                    marginBottom: 32,
                                }}
                            >
                                <div className={styles.plateforms}>
                                    <img src={googleIcon} alt="" />
                                </div>
                                <div className={styles.plateforms}>
                                    <img src={fb} alt="" />
                                </div>
                                <div className={styles.plateforms}>
                                    <img src={apple} alt="" />
                                </div>
                                <div className={styles.plateforms}>
                                    <img src={werfie} alt="" />
                                </div>
                                <div className={styles.plateforms}>
                                    <img src={wn} alt="" />
                                </div>
                            </div> */}
                            {/* <div className={styles.splitLinesDiv}>
                                    <hr className={styles.splitLine} />
                                    <p className={styles.formParagraph}>{t("or.text")}</p>
                                    <hr className={styles.splitLine} />
                                </div> */}
                        </form>
                    ) : null}
                </div>
                <div className={styles.afterTheFormDiv}>
                    {/* <div className={styles.socialLoginsDiv}> */}
                    {/* <IconButton className={styles.socialLoginIconBtn}>
                            <img src={googleIcon} alt="" className={styles.socialLoginIcon} />
                        </IconButton> */}
                    {/* <IconButton className={styles.socialLoginIconBtn}>
                            <img src={facebookIcon} alt="" className={styles.socialLoginIcon} />
                        </IconButton> */}
                    {/* </div> */}
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
                            {t('notregistered.text')}{' '}
                            <a
                                href="https://www.seezitt.com"
                                onClick={handleLinkClick}
                                className={styles.boldLinkText}
                            >
                                {t('createaccount.text')}
                            </a>
                        </p>
                    ) : (
                        'null'
                    )}
                    <h3 className={styles.getTheAppText}>{t('gettheapp.text')} </h3>
                    <div className={styles.appStoresDiv}>
                        <img src={appStoreBtn} alt="" className={styles.appStoreBtn} />
                        <img src={playStoreBtn} alt="" className={styles.appStoreBtn} />
                    </div>
                </div>
                <div className={styles.footerLightBg}>
                    {' '}
                    {/**style={{ bottom: form === 'signup' ? '45px' : '45px' }}*/}
                    <p className={styles['footer-p-lightBg']}>
                        <a
                            className={styles['footer-p-lightBg']}
                            href="https://seezitt.com/privacy-policy"
                            style={{ textDecoration: 'none' }}
                        >
                            {t('Privacypolicy.text')}
                        </a>
                    </p>
                    <p className={styles['footer-p-lightBg']}>
                        <a
                            className={styles['footer-p-lightBg']}
                            href="https://seezitt.com/#About"
                            style={{ textDecoration: 'none' }}
                        >
                            {t('About.text')}
                        </a>
                    </p>
                    <p className={styles['footer-p-lightBg']}>
                        <a
                            className={styles['footer-p-lightBg']}
                            href="https://seezitt.com/faqs"
                            style={{ textDecoration: 'none' }}
                        >
                            {t('Helpcenter.text')}
                        </a>
                    </p>
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
                            <span style={{ marginLeft: 8 }}>
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
    );
};
