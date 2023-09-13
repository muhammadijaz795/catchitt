import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'ar', 'fr'],
        fallbackLng: 'en',
        debug: false,
        // Options for language detector
        detection: {
            order: ['path', 'cookie', 'htmlTag'],
            caches: ['cookie'],
        },
        backend: {
            loadPath: '../src/languages-intl/locales/{{lng}}/translation.json',
        },
    });
const loadingMarkup = (
    <div className='py-4 text-center'>
        <h3>Loading..</h3>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Use createRoot


root.render(
    <Suspense fallback={loadingMarkup}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Suspense>
);
