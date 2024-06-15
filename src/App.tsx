import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import messages from '../src/languages-intl';
import styles from './App.module.scss';
import CommunityPage from './components/about-pages/community-guidelines';
import PrivacyPage from './components/about-pages/privacy-policy';
import { TermsPage } from './components/about-pages/terms-conditions';
import { ActivityPage } from './components/activity-page/activity-page';
import { Authentication } from './components/authentication/authentication';
// import ComingSoon from './components/coming-soon/coming-soon';
import ChatsSec from './components/chats';
import { AllVideos } from './components/discover/components/allVideosPage';
import Discover from './components/discover/discover';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { RequestOtp } from './components/forgot-password/request-otp';

import HomePage from './components/homePage';
import Event from './components/homePage/components/event';
import { PrivacySecurityPage } from './components/privacy-security-page/privacy-security-page';
import { Profile } from './components/profile/profile';
import { PublicProfile } from './components/profile/publicProfile';
import { PushNotificationsPage } from './components/push-notifications-page/push-notifications';
import { VideoProvider } from './components/reusables/VideoContext';
import { SearchPage } from './components/search-page/search-page';
import { SetNewPassword } from './components/set-newPassword/set-newPassword';
import Account from './components/settings-page/account';
import BalancePage from './components/settings-page/components/balance-page';
import GiftRevenuePage from './components/settings-page/components/gift-revenue-page';
import TransactionHistoryPage from './components/settings-page/components/transaction-history-page';
import WithdrawalLimitPage from './components/settings-page/components/withdrawal-limit-page';
import { SoundPage } from './components/sounds-page/sound-page';
import { SuggestedAccountsPage } from './components/suggested-accounts-page/suggested-accounts-page';
import UploadPage from './components/upload';
import { useAuthStore } from './store/authStore';
import useApp from './useApp';
import { OtpVerification } from './components/forgot-password/otp-verification';
import CreateStoryPage from './components/stories';
import MyReports from './components/my-reports';
// import GoLive from './components/go-live';
import Analytics from './components/analytics';
import ContactUs from './components/contact-us';
import Login from './components/login';
import PhoneOrEmail from './components/login/phone-or-email';
import ForgetPassword from './components/login/forget-password';

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
    const {} = useApp();

    const [appLanguage, setAppLanguage] = useState(
        (window.localStorage.getItem('lang') as string) || 'en'
    );
    const setLanguage = (language: string) => {
        setAppLanguage(language);
        window.localStorage.setItem('lang', language);
    };

    return (
        <IntlProvider locale={appLanguage} messages={messages[appLanguage]}>
            <div className={styles.App}>
                <VideoProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<InitialRouteHandler />} />
                            {/* <Route
                                path="/auth"
                                element={
                                    <Authentication
                                        setLanguage={setLanguage}
                                        language={appLanguage}
                                    />
                                }
                            /> */}
                            <Route
                                path="/auth"
                                element={<Login setLanguage={setLanguage} language={appLanguage} />}
                            />
                            <Route path="/login/phone-or-email" element={<PhoneOrEmail />} />
                            <Route path="/login/forget-password" element={<ForgetPassword />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/request-verification-otp" element={<RequestOtp />} />
                            <Route path="/otp-verification/:email" element={<OtpVerification />} />
                            <Route path="/retrieve/*" element={<SetNewPassword />} />
                            <Route path="/view/video/:onePost" element={<HomePage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/suggested-accounts" element={<SuggestedAccountsPage />} />
                            <Route path="/notifications" element={<ActivityPage />} />
                            <Route path="/comingsoon" element={<ChatsSec />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/profile/:id" element={<PublicProfile />} />
                            <Route path="/settings/account" element={<Account />} />
                            <Route
                                path="/settings/account/activity"
                                element={<PushNotificationsPage />}
                            />
                            <Route
                                path="/settings/account/privacy-settings"
                                element={<PrivacySecurityPage />}
                            />
                            <Route path="/settings/account/balance" element={<BalancePage />} />
                            <Route
                                path="/settings/account/transaction-history"
                                element={<TransactionHistoryPage />}
                            />
                            <Route
                                path="/settings/account/gift-revenue"
                                element={<GiftRevenuePage />}
                            />
                            <Route
                                path="/settings/account/withdrawal-limit"
                                element={<WithdrawalLimitPage />}
                            />
                            <Route path="/sounds/:soundId" element={<SoundPage />} />
                            <Route path="/about/terms-conditions" element={<TermsPage />} />
                            <Route path="/about/community-guidelines" element={<CommunityPage />} />
                            <Route path="/about/privacy-policy" element={<PrivacyPage />} />
                            <Route path="/SearchPage/:query/:tab" element={<SearchPage />} />
                            <Route path="/discover" element={<Discover />} />
                            <Route path="/videos/:id" element={<AllVideos />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route path="/create-story" element={<CreateStoryPage />} />
                            {/* <Route path="/golive" element={<GoLive />} /> */}
                            <Route path="/myreports" element={<MyReports />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/contactus" element={<ContactUs />} />
                        </Routes>
                    </Router>
                </VideoProvider>
            </div>
        </IntlProvider>
    );
}

export default App;
