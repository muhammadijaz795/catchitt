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

export const COMMENTS = [
    {
        id: 0,
        commenter_avatar:
            'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/77a6196b8555a59958e6ca03c9bf2a6a~c5_100x100.jpeg?lk3s=a5d48078&nonce=86219&refresh_token=e85613d454ac21404be7f73c1e5ff0b8&x-expires=1724162400&x-signature=7uQ%2FXY5558aDIm1XIV%2Bpu2cGi90%3D&shp=a5d48078&shcp=81f88b70',
        commenter_name: 'Fatima Baloch queen ♥️',
        comment_data: 'nikah drama name ha',
        comment_time: '7-11',
        comment_likes: '82',
        comment_replies: [
            {
                comment_reply_id: 0,
                comment_replier_name: 'najeebullahkhan5482',
                comment_reply_data: 'hi',
                comment_reply_time: '35sec ago',
                comment_reply_likes: '0',
            },
        ],
    },
    {
        id: 1,
        commenter_avatar:
            'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/57d76bf8d5707d70636bf9db6ae1b6f1.jpeg?lk3s=a5d48078&nonce=50976&refresh_token=a239496407b99aee3e741611c55b7ffa&x-expires=1724176800&x-signature=kVMjTUvvDn1JBP68MWaMaMjpTmk%3D&shp=a5d48078&shcp=81f88b70',
        commenter_name: 'Farwa',
        comment_data: 'hero kitna smart ha',
        comment_time: '3d ago',
        comment_likes: '499',
        comment_replies: [
            {
                comment_reply_id: 11,
                comment_replier_name: 'kaleemullahkhan5482',
                comment_reply_data: 'i like this drama',
                comment_reply_time: '2 days ago',
                comment_reply_likes: '0',
            },
        ],
    },
    {
        id: 2,
        commenter_avatar:
            'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/fcc1e30f824d6f872ba8ff51111e9ce0~c5_100x100.jpg?lk3s=30310797&nonce=91873&refresh_token=450b8265db53d203068a3b79d49f66db&x-expires=1724072400&x-signature=22uvbgBsXI%2FjZ0jy3jHthK80auM%3D&shp=30310797&shcp=-',
        commenter_name: 'Humaira jan',
        comment_data: 'drama ka name plz',
        comment_time: 'a year ago',
        comment_likes: '16',
        comment_replies: [
            {
                comment_reply_id: 22,
                comment_replier_name: 'najeebullahkhan5482',
                comment_reply_data: 'hi',
                comment_reply_time: '35sec ago',
                comment_reply_likes: '0',
            },
            {
                comment_reply_id: 22222,
                comment_replier_name: 'jamalkhalid5482',
                comment_reply_data: 'hello',
                comment_reply_time: '15sec ago',
                comment_reply_likes: '2',
            },
            {
                comment_reply_id: 222222,
                comment_replier_name: 'bilal',
                comment_reply_data: 'hi guys',
                comment_reply_time: '2sec ago',
                comment_reply_likes: '222',
            },
        ],
    },
    {
        id: 3,
        commenter_avatar:
            'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/e0a3c8bf13bd613ec409f93c49a01bc7~c5_100x100.jpg?lk3s=30310797&nonce=56916&refresh_token=43862ab57dc3ff6f486bb36c1681549d&x-expires=1724072400&x-signature=XniB4fpYZ6X0beZ30lad680hI6w%3D&shp=30310797&shcp=-',
        commenter_name: 'malik muzamil',
        comment_data: 'tune achi ha',
        comment_time: '25s ago',
        comment_likes: '5',
        comment_replies: [
            {
                comment_reply_id: 33,
                comment_replier_name: 'najeebullahkhan5482',
                comment_reply_data: 'hi',
                comment_reply_time: '35sec ago',
                comment_reply_likes: '0',
            },
        ],
    },
];

