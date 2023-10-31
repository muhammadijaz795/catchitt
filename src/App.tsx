import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import messages from '../src/languages-intl';
import styles from './App.module.scss';
import { ActivityPage } from './components/activity-page/activity-page';
import { Authentication } from './components/authentication/authentication';
import ComingSoon from './components/coming-soon/coming-soon';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { Home } from './components/home/home';
import { VideoProvider } from './components/reusables/VideoContext';
import { SearchPage } from './components/search-page/search-page';
import { SetNewPassword } from './components/set-newPassword/set-newPassword';
import Account from './components/settings-page/account';
import { SoundPage } from './components/sounds-page/sound-page';
import { SuggestedAccountsPage } from './components/suggested-accounts-page/suggested-accounts-page';
import { useAuthStore } from './store/authStore';


// Functional component to handle the initial route navigation
const InitialRouteHandler = () => {
    const navigate = useNavigate();
    const storedToken = useAuthStore.getState().token;

    useEffect(() => {
        if (storedToken) {
            // If a token is stored, set the user as logged in
            useAuthStore.setState({
                isLoggedIn: true,
                token: storedToken,
            });
        }
        // Allow navigation to /home regardless of login status
        navigate('/home');
    }, [navigate, storedToken]);

    return null; // Render nothing, as this component is used only for the initial route handling
};

function App() {

    const [appLanguage, setAppLanguage] = useState(
        (window.localStorage.getItem("lang") as string) || "en"
    );
    const setLanguage = (language: string) => {
        setAppLanguage(language);
        window.localStorage.setItem("lang", language);
    };

    return (
        <IntlProvider locale={appLanguage} messages={messages[appLanguage]}>
            <div className={styles.App}>
                <VideoProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<InitialRouteHandler />} />
                            <Route path="/auth" element={<Authentication setLanguage={setLanguage} language={appLanguage} />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/set-newpassword" element={<SetNewPassword />} />
                            <Route path="/view/video/:onePost" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/suggested-accounts" element={<SuggestedAccountsPage />} />
                            <Route path="/notifications" element={<ActivityPage />} />
                            <Route path="/comingsoon" element={<ComingSoon />} />
                            <Route path="/settings/account" element={<Account />} />
                            <Route path="/sounds/:soundId" element={<SoundPage />} />
                            {/* <Route path="/hashtags/hashtag=:hashtagId" element={<HashtagsPage />} /> */}
                            <Route path="/SearchPage/:query/:tab" element={<SearchPage />}
                            />
                        </Routes>
                    </Router>
                </VideoProvider>
            </div>
        </IntlProvider>
    );
}

export default App;
