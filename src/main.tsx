import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

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
            loadPath: '../locales/{{lng}}/translation.json',
        },
    });
const loadingMarkup = (
    <div className="py-4 text-center">
        <h3>Loading..</h3>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Use createRoot

root.render(
    <Provider store={store}>
        <Suspense fallback={loadingMarkup}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Suspense>
    </Provider>
);
