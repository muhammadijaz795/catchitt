import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import styles from './push-notifications.module.scss';

import {
    FormControlLabel,
    FormGroup,
    IconButton,
    Switch,
    SwitchProps,
    styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../../shared/layout';
import { LeftArrow } from './svg-components/LeftArrow';

export interface PushNotificationsPageProps {
    className?: string;
}

interface NotificationsSettings {
    feedback: boolean;
    reminders: boolean;
    news: boolean;
    interactions: boolean;
    followers: boolean;
    messages: boolean;
}

export const PushNotificationsPage = ({ className }: PushNotificationsPageProps) => {
    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const token = useAuthStore((state) => state.token);
    const [notificationsSettingsData, setNotificationsSettingsData] =
        useState<NotificationsSettings>();
    const [settings, setSettings] = useState({
        feedback: true,
        reminders: true,
        news: true,
        followers: true,
        messages: true,
    });
    const API_KEY = process.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/settings/account'); // Navigate back to the previous page
        setSettingsDropdown(true);
    };

    // if (!isLoggedIn) {
        console.log("IS Logged In : ",isLoggedIn);
        // return <Navigate to="/auth" />;
    // }

    useEffect(() => {
        setIndex(5);
        setSettingsDropdown(true);
        handleFetchNotificationsSettings();
    }, []);

    const handleFetchNotificationsSettings = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/notifications-settings`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const responseData = await response.json();
                setNotificationsSettingsData(responseData.data);
                console.log(`my notifications settings: `);
                console.log(responseData.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (notificationsSettingsData) {
            setSettings({
                feedback: notificationsSettingsData.feedback,
                reminders: notificationsSettingsData.reminders,
                news: notificationsSettingsData.news,
                followers: notificationsSettingsData.followers,
                messages: notificationsSettingsData.messages,
            });
        }
    }, [notificationsSettingsData]);

    const handleSwitchChange = (event: any, name: string) => {
        const updatedSettings = {
            ...settings,
            [name]: event.target.checked,
        };
        setSettings(updatedSettings);
        console.log(JSON.stringify(updatedSettings));
        // Make a PATCH request to update the settings
        fetch(`${API_KEY}/profile/notifications-settings`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedSettings),
        })
            .then((response) => {
                if (response.ok) {
                    // Handle a successful response here
                    console.log('Settings updated successfully');
                } else {
                    // Handle errors here
                    console.error(response);
                    console.log(response);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        // <div className={classNames(styles.root, className)}>
        <Layout>
            {/* <div className={styles.topBarDiv}>
                <TopBar />
            </div> */}
            <div className={styles.container}>
                {/* <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={selectedIndex} settingsDropdownState={true} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div> */}
                <div className={styles.middleSectionDiv}>
                    <div className={styles.pageHeader}>
                        <IconButton
                            sx={{ margin: '0px', padding: '0px', alignSelf: 'center' , display:'flex' , gap:'1rem' }}
                            onClick={handleGoBack}
                        >
                            <LeftArrow />
                            <h4>Push notifications</h4>
                        </IconButton>
                    </div>
                    <div className={styles.suggestedContent}>
                        <h4>Email notifications</h4>
                        <div className={styles.cards}>
                            <FormGroup
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div className={styles.card}>
                                    <p>Feedback Emails</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.feedback || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'feedback')
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>Reminder Emails</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.reminders || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'reminders')
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>News Emails</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.news || false}
                                                onChange={(e: any) => handleSwitchChange(e, 'news')}
                                            />
                                        }
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className={styles.suggestedContent} style={{ paddingTop: 0 }}>
                        <h4>Following and Followers</h4>
                        <div className={styles.cards}>
                            <FormGroup
                                // onChange={handleSettingsChange}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div className={styles.card}>
                                    <p>New Followers</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.followers || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'followers')
                                                }
                                            />
                                        }
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className={styles.suggestedContent} style={{ paddingTop: 0 }}>
                        <h4>Messages and Calls</h4>
                        <div className={styles.cards}>
                            <FormGroup
                                // onChange={handleSettingsChange}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div className={styles.card}>
                                    <p>Messages</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.messages || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'messages')
                                                }
                                            />
                                        }
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgb(255, 59, 92)' : 'rgb(255, 59, 92)',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: 'rgb(255, 59, 92)',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));
