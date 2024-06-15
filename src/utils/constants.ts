import { toast } from 'react-toastify';
import {
    qrCodeAuth,
    emailOrPhone,
    facebookAuth,
    googleAuth,
    twitterAuth,
    appleAuth,
} from '../icons';

export const API_KEY = process.env.VITE_API_URL;

export const uploadCategories = [
    '📷 People and Blogs',
    '✈ Travel and Events',
    '🎬 Film and Animation',
    '⚽ Sports',
    '🎵 Music',
    '💻 Science and Technology',
    '🎮 Gaming',
    '🚘 Autos and Vehicles',
    '😂 Comedy',
];

export const UPLOAD_VIDEO_DETAILS = `${API_KEY}/media-content/directly-from-s3`;
export const getVideoCategoriesEndPoind = '/media-content/categories';

export const showToast = (toastMessage: string) => {
    toast.success(`🎉${toastMessage}`, {
        position: 'bottom-right', // Set the position (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
        autoClose: 2000, // Set the auto-close duration in milliseconds (e.g., 2000ms = 2 seconds)
    });
};

export const APP_TEXTS = {
    FEEDBACK: 'Feedback and help',
    LOGIN_SUBTEXT: 'Manage your account, check notifications, comment on videos, and more.',
    NO_ACCOUNT: "Don't have an account?",
    SIGN_UP: 'Sign up',
    NO_RESULT_FOUND: 'No result found',
    SEND_CODE: 'Send code',
    LOGIN_WITH_CODE: 'Log in with code',
    FORGOT_PASSWORD: 'Forgot password?',
    LOGIN: 'Log in',
    QR_CODE: 'Use QR Code',
    EMAIL_OR_PHONE: 'Use phone / email / username',
    FACEBOOK: 'Continue with Facebook',
    GOOGLE: 'Continue with Google',
    TWITTER: 'Continue with Twitter',
    APPLE: 'Continue with Apple',
};

export const LOGIN_OPTIONS = [
    {
        styles: '',
        name: APP_TEXTS.QR_CODE,
        image: qrCodeAuth,
    },
    {
        styles: 'mt-3',
        name: APP_TEXTS.EMAIL_OR_PHONE,
        image: emailOrPhone,
    },
    {
        styles: 'mt-3',
        name: APP_TEXTS.FACEBOOK,
        image: facebookAuth,
    },
    {
        styles: 'mt-3',
        name: APP_TEXTS.GOOGLE,
        image: googleAuth,
    },
    {
        styles: 'mt-3',
        name: APP_TEXTS.TWITTER,
        image: twitterAuth,
    },
    {
        styles: 'mt-3',
        name: APP_TEXTS.APPLE,
        image: appleAuth,
    },
];

export const END_POINTS = {
    COUNTRY_LIST: 'util/countries',
};

export const METHOD = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

export const MENU_POPUP_OPTIONS = [
    { menuOption: 'English', imageUrl: '' },
    { menuOption: 'Feedback and help', imageUrl: '' },
    { menuOption: 'Keyboard shortcuts', imageUrl: '' },
    { menuOption: 'Dark mode', imageUrl: '' },
];
