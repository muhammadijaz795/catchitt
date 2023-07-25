import { useEffect } from 'react';
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

// Functional component to handle the initial route navigation
const InitialRouteHandler = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const storedToken = useAuthStore.getState().token;
        if (storedToken) {
            useAuthStore.setState({
                isLoggedIn: true,
                token: storedToken,
            });
            navigate('/home');
        } else {
            navigate('/auth');
        }
    }, [navigate]);

    return null; // Render nothing, as this component is used only for the initial route handling
};

function App() {
    return (
        <div className={styles.App}>
            <Router>
                <Routes>
                    <Route path="/" element={<InitialRouteHandler />} />
                    <Route path="/auth" element={<Authentication />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/set-newpassword" element={<SetNewPassword />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/suggested-accounts" element={<SuggestedAccountsPage />} />
                    <Route
                        path="/notifications"
                        element={
                            <ActivityPage
                                _id={''}
                                userAvatar={''}
                                userName={''}
                                createdTime={0}
                                triggeredUserName={''}
                                triggeredUserAvatar={''}
                                message={''}
                                type={''}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
