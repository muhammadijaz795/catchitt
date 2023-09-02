import { useEffect, useMemo } from 'react';
import styles from './App.module.scss';
import { Authentication } from './components/authentication/authentication';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { SetNewPassword } from './components/set-newPassword/set-newPassword';
import { Home } from './components/home/home';
import { SuggestedAccountsPage } from './components/suggested-accounts-page/suggested-accounts-page';
import { ActivityPage } from './components/activity-page/activity-page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useNavigate } from 'react-router-dom';
import ComingSoon from './components/coming-soon/coming-soon';
import { VideoProvider } from './components/reusables/VideoContext';


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

    return (
        <div className={styles.App}>
            <VideoProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<InitialRouteHandler />} />
                        <Route path="/auth" element={<Authentication />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/set-newpassword" element={<SetNewPassword />} />
                        <Route path="/view/video/:onePost" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/suggested-accounts" element={<SuggestedAccountsPage />} />
                        <Route path="/notifications" element={<ActivityPage />} />
                        <Route path="/comingsoon" element={<ComingSoon />}
                        />
                    </Routes>
                </Router>
            </VideoProvider>

        </div>
    );
}

export default App;
