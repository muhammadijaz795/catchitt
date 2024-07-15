import { toast } from 'react-toastify';
import {
    fb,
    googleIcon,
    defaultAvatar,
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

export const showToastSuccess = (toastMessage: string) => {
    toast.success(`${toastMessage}`, {
        position: 'bottom-right', // Set the position (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
        autoClose: 2000, // Set the auto-close duration in milliseconds (e.g., 2000ms = 2 seconds)
    });
};

export const showToastError = (toastMessage: string) => {
    toast.error(`${toastMessage}`, {
        position: 'bottom-right', // Set the position (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
        autoClose: 2000, // Set the auto-close duration in milliseconds (e.g., 2000ms = 2 seconds)
    });
};

export const SIGNUP_OPTIONS = [
    {
        styles: '',
        name: 'Use Phone or Email',
        image: defaultAvatar,
    },
    // {
    //     styles: 'mt-3',
    //     name: 'Continue with Facebook',
    //     image: fb,
    // },
    {
        styles: 'mt-3',
        name: 'Continue with Google',
        image: googleIcon,
    },
];

export const SIGNUP_APP_TEXTS = {
    FEEDBACK: 'Feedback and help',
    SINGUP_SUBTEXT: 'Create a profile, follow other accounts, make your own videos, and more.',
    ALREADY_ACCOUNT: 'Already have an account?',
    LOGIN: 'Log in',
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
    // {
    //     styles: '',
    //     name: APP_TEXTS.QR_CODE,
    //     image: qrCodeAuth,
    // },
    {
        styles: 'mt-3',
        name: APP_TEXTS.EMAIL_OR_PHONE,
        image: emailOrPhone,
    },
    // {
    //     styles: 'mt-3',
    //     name: APP_TEXTS.FACEBOOK,
    //     image: facebookAuth,
    // },
    {
        styles: 'mt-3',
        name: APP_TEXTS.GOOGLE,
        image: googleAuth,
    },
    // {
    //     styles: 'mt-3',
    //     name: APP_TEXTS.TWITTER,
    //     image: twitterAuth,
    // },
    {
        styles: 'mt-3',
        name: APP_TEXTS.APPLE,
        image: appleAuth,
    },
];

export const END_POINTS = {
    COUNTRY_LIST: 'util/countries',
    FORGOT_PASSWORD: 'auth/password/forgot',
    SET_NEW_PASSWORD: 'auth/password/set-new',
};

export const METHOD = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

export const STATUS_CODE = {
    OK: 200,
};

export const MENU_POPUP_OPTIONS = [
    // { menuOption: 'English', imageUrl: '' },
    { menuOption: 'Feedback and help', imageUrl: '' },
    // { menuOption: 'Keyboard shortcuts', imageUrl: '' },
    { menuOption: 'Dark mode', imageUrl: '' },
];

export const DISCOVER_CATEGORIES = [
    {
        id: 1,
        category: 'Singing & Dancing',
    },
    {
        id: 2,
        category: 'Comedy',
    },
    {
        id: 3,
        category: 'Sports',
    },
    {
        id: 4,
        category: 'Anime & Comics',
    },
    {
        id: 5,
        category: 'Relationship',
    },
    {
        id: 6,
        category: 'Shows',
    },
    {
        id: 7,
        category: 'Lipsync',
    },
    {
        id: 8,
        category: 'Daily Life',
    },
    {
        id: 9,
        category: 'Beauty Care',
    },
    {
        id: 10,
        category: 'Games',
    },
    {
        id: 11,
        category: 'Society',
    },
    {
        id: 12,
        category: 'Outfit',
    },
    {
        id: 13,
        category: 'Cars',
    },
    {
        id: 14,
        category: 'Food',
    },
    {
        id: 15,
        category: 'Animals',
    },
    {
        id: 16,
        category: 'Family',
    },
    {
        id: 17,
        category: 'Drama',
    },
    {
        id: 18,
        category: 'Fitness & Health',
    },
    {
        id: 19,
        category: 'Education',
    },
    {
        id: 20,
        category: 'Technology',
    },
];
