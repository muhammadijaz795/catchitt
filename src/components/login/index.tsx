import { useNavigate } from 'react-router-dom';
import { APP_TEXTS, LOGIN_OPTIONS } from '../../utils/constants';
import ItemLogin from '../item-login';
import Footer from './footer';
import Header from './header';
import './login.scss';

const Login = (props: any) => {
    const navigate = useNavigate();

    const loginItemClickHandler = (name: string) => {
        switch (name) {
            case APP_TEXTS.QR_CODE:
                // Handle QR code login
                console.log('QR Code login');
                break;
            case APP_TEXTS.EMAIL_OR_PHONE:
                // Handle phone / email / username login
                navigate('/login/phone-or-email');
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
    return (
        <div className="h-screen">
            <Header />
            <div className="w-[22.688rem] mx-auto mt-12">
                <div className="overflow-auto item-login-container">
                    <h2 className="font-bold text-3xl">Log in to Seezitt</h2>
                    <p className="font-normal text-sm text-subtext mt-6 mb-3 ">
                        {APP_TEXTS.LOGIN_SUBTEXT}
                    </p>
                    {LOGIN_OPTIONS.map((option, index) => (
                        <ItemLogin
                            loginItemClickHandler={loginItemClickHandler}
                            key={index}
                            name={option.name}
                            image={option.image}
                            styles={option.styles}
                        />
                    ))}
                </div>
                <div className="mt-3.5">
                    <p className="font-normal text-[0.688rem] text-policy">
                        By continuing with an account located in{' '}
                        <span className="text-black cursor-pointer">Pakistan</span>, you agree to
                        our{' '}
                        <span className="text-black cursor-pointer hover:underline">
                            Terms of Service
                        </span>{' '}
                        and acknowledge that you have read our{' '}
                        <span className="text-black cursor-pointer hover:underline">
                            Privacy Policy.
                        </span>
                    </p>
                </div>
            </div>
            <div className="absolute w-full bottom-0">
                <div className="border-t border-custom-1 text-center p-4 sign-up-label">
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

export default Login;
