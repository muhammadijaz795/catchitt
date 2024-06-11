import { red } from '@mui/material/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'custom-gray-100': '#EEEDF7',
                'custom-gray-200': '#BABABA',
                'custom-gray-300': '#f2f1fa',
                'custom-gray-400': '#EAEAEA',
                'custom-color-999': '#999999',
                'custom-primary': '#5448B2',
                'custom-dark-222': '#222222',
                'custom-color-000': '#000000',
                'custom-light': '#fff',
                subtext: '#a2a3a5df',
                'danger-1': '#f75c59',
                policy: '#7b7d82fe',
                'login-btn': '#f1f1f2',
            },
            borderColor: {
                liveSelected: '#5448B2',
                loginItem: '#BABABA',
                'custom-1': '#a7a9acfe',
                'custom-2': '#a2a3a5df',
            },
        },
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [],
};
