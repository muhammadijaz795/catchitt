import { toast } from 'react-toastify';
import { fb, googleIcon, defaultAvatar } from '../icons';

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



export const SIGNUP_OPTIONS = [
    {
        styles: '',
        name: 'Use Phone or Email',
        image: defaultAvatar,
    },
    {
        styles: 'mt-3',
        name: 'Continue with Facebook',
        image: fb,
    },
    {
        styles: 'mt-3',
        name: 'Continue with Google',
        image: googleIcon,
    }
];

export const SIGNUP_APP_TEXTS = {
    FEEDBACK: 'Feedback and help',
    SINGUP_SUBTEXT: 'Create a profile, follow other accounts, make your own videos, and more.',
    ALREADY_ACCOUNT: "Already have an account?",
    LOGIN: "Log in",
};
