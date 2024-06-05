// import { useEffect } from 'react';

// // import classNames from 'classnames';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuthStore } from '../../store/authStore';
// // import { SideNavBar } from '../side-nav-bar/side-nav-bar';
// // import { SuggestedActivity } from '../suggested-activity/suggested-activity';
// // import { TopBar } from '../top-bar/top-bar';

// // import IconButton from '@mui/material/IconButton/IconButton';
// // import { LeftArrow } from '../push-notifications-page/svg-components/LeftArrow';


// import { Button, Typography, Box } from '@mui/material';
// import { AccountCircle, Facebook, Google } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import styles from './styles.module.scss';

// export interface SignupeProps {
//     className?: string;
// }

// export const Signup = ({ className }: SignupeProps) => {
//     // const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
//     // const token = useAuthStore((state) => state.token);
//     // const navigate = useNavigate();

//     // const handleGoBack = () => {
//     //     navigate('/settings/account'); // Navigate back to the previous page
//     //     setIndex(4);
//     //     setSettingsDropdown(true);
//     // };

//     // useEffect(() => {
//     //     setIndex(7);
//     //     setSettingsDropdown(true);
//     // }, []);

//     return (
//         <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh"
//       bgcolor="background.paper"
//     >
//       <img src="path/to/tiktok-logo.png" alt="TikTok Logo" style={{ marginBottom: '20px' }} />
//       <Typography variant="h4" gutterBottom>
//         Sign up for TikTok
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         Create a profile, follow other accounts, make your own videos, and more.
//       </Typography>
//       <Button
//         variant="outlined"
//         startIcon={<AccountCircle />}
//         style={{ margin: '10px 0', width: '250px' }}
//       >
//         Use phone or email
//       </Button>
//       <Button
//         variant="outlined"
//         startIcon={<Facebook />}
//         style={{ margin: '10px 0', width: '250px' }}
//       >
//         Continue with Facebook
//       </Button>
//       <Button
//         variant="outlined"
//         startIcon={<Google />}
//         style={{ margin: '10px 0', width: '250px' }}
//       >
//         Continue with Google
//       </Button>
//       <Typography variant="caption" display="block" gutterBottom>
//         By continuing with an account located in <strong>Pakistan</strong>, you agree to our{' '}
//         <Link to="/terms">Terms of Service</Link> and acknowledge that you have read our{' '}
//         <Link to="/privacy">Privacy Policy</Link>.
//       </Typography>
//       <Typography variant="body2">
//         Already have an account? <Link to="/login" style={{ color: 'red' }}>Log in</Link>
//       </Typography>
//     </Box>
//     );
// };

// export default Signup;


import { SIGNUP_APP_TEXTS, SIGNUP_OPTIONS } from '../../utils/constants';
import SignupHandler from './signupHandler';
import './signup-styles.module.scss';
import { useNavigate } from 'react-router-dom';

const Signup = (props: any) => {

    const navigate = useNavigate();
    
    const signupItemClickHandler = (name: string) => {
        switch (name) {
            case 'Use Phone or Email':
                navigate('/signup/phone-or-email/email');
                break;
            case 'Continue with Facebook':
               
                break;
            case 'Continue with Google':
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
                    <p className="hover:underline cursor-pointer">Feedback and help</p>
                </div>
            </div>
            <div className="w-[22.688rem] mx-auto mt-14">
                <div className="overflow-auto item-signup-container">
                    <h2 className="font-bold text-4xl">Sign up for Seezitt</h2>
                    <p className="font-normal text-sm text-subtext mt-6 mb-3 ">
                    Create a profile, follow other accounts, make your own videos, and more.
                    </p>
                    {SIGNUP_OPTIONS.map((option, index) => (
                        <SignupHandler
                            singupItemClickHandler={signupItemClickHandler}
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
                        Already have an account?
                        <span className="text-danger-1 font-semibold hover:underline cursor-pointer">
                            Log in
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

export default Signup;
