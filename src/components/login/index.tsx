import { APP_TEXTS, LOGIN_OPTIONS } from '../../utils/constants';
import ItemLogin from '../item-login';
import './login.scss';
import { useNavigate } from 'react-router-dom';

const Login = (props: any) => {

    const navigate = useNavigate();

    const loginItemClickHandler = (name: string) => {
        switch (name) {
            case 'Use QR Code':
                // Handle QR code login
                console.log('QR Code login');
                break;
            case 'Use phone / email / username':
                // Handle phone / email / username login
                navigate('/login/phone-or-email');
                break;
            case 'Continue with Facebook':
                // Handle Facebook login
                console.log('Facebook login');
                break;
            case 'Continue with Google':
                // Handle Google login
                console.log('Google login');
                break;
            case 'Continue with Twitter':
                // Handle Twitter login
                console.log('Twitter login');
                break;
            case 'Continue with Apple':
                // Handle Apple login
                console.log('Apple login');
                break;
            default:
                console.log('Default case');
        }
    };
    return (
        <div className="h-screen">
            <div className="flex flex-row justify-between items-center p-3">
                <h3 className="font-bold text-4xl">Seezitt</h3>
                <div className="flex flex-row justify-center items-center gap-3">
                    <p>?</p>
                    <p className="hover:underline cursor-pointer">{APP_TEXTS.FEEDBACK}</p>
                </div>
            </div>
            <div className="w-[22.688rem] mx-auto mt-14">
                <div className="overflow-auto item-login-container">
                    <h2 className="font-bold text-4xl">Log in to Seezitt</h2>
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
                <div className="bg-black flex flex-row justify-between items-center py-8 px-32 language-label">
                    <div className="border border-custom-2 pl-2 rounded-sm w-[10rem] cursor-pointer">
                        <p className="text-white text-left p-2 font-normal text-sm country-label">
                            English
                        </p>
                    </div>
                    <p className="font-normal text-sm text-white">© 2024 Seezitt</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
