import classNames from 'classnames';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { TopBar } from '../top-bar/top-bar';
import styles from './privacy-security-page.module.scss';

import { FormControlLabel, FormGroup, IconButton, Switch, SwitchProps, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { LeftArrow } from '../push-notifications-page/svg-components/LeftArrow';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';

export interface PrivacySecurityPageProps { className?: string }

interface PrivacySettings {
    shareMedia: boolean,
    downloadMedia: boolean,
    viewFollowing: boolean,
    viewFollowers: boolean,
    viewLikedVideos: boolean,
    messages: boolean,
    activityStatus: boolean,
    viewProfileVisits: boolean
}

export const PrivacySecurityPage = ({ className }: PrivacySecurityPageProps) => {
    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const token = useAuthStore((state) => state.token);
    const [privacySettingsData, setPrivacySettingsData] = useState<PrivacySettings>();
    const [settings, setSettings] = useState({
        shareMedia: true,
        downloadMedia: true,
        viewFollowing: true,
        viewFollowers: true,
        viewLikedVideos: true,
        messages: true,
        activityStatus: true,
        viewProfileVisits: true
    });
    const API_KEY = process.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/settings/account'); // Navigate back to the previous page
        setSettingsDropdown(true)
    };

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    useEffect(() => {
        setIndex(5)
        setSettingsDropdown(true)
        handleFetchPrivacySettings()
    }, [])

    const handleFetchPrivacySettings = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/privacy-settings`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const responseData = await response.json();
                setPrivacySettingsData(responseData.data);
                console.log(`my notifications settings: `);
                console.log(responseData.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (privacySettingsData) {
            setSettings({
                shareMedia: privacySettingsData.shareMedia,
                downloadMedia: privacySettingsData.downloadMedia,
                viewFollowing: privacySettingsData.viewFollowing,
                viewFollowers: privacySettingsData.viewFollowers,
                viewLikedVideos: privacySettingsData.viewLikedVideos,
                messages: privacySettingsData.messages,
                activityStatus: privacySettingsData.activityStatus,
                viewProfileVisits: privacySettingsData.viewProfileVisits
            });
        }
    }, [privacySettingsData]);

    const handleSwitchChange = (event: any, name: string) => {
        const updatedSettings = {
            ...settings,
            [name]: event.target.checked,
        };
        setSettings(updatedSettings);
        console.log(JSON.stringify(updatedSettings));
        // Make a PATCH request to update the settings
        fetch(`${API_KEY}/profile/privacy-settings`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${token}`,
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
        <div className={classNames(styles.root, className)}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={selectedIndex} settingsDropdownState={true} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div>
                <div className={styles.middleSectionDiv}>
                    <div className={styles.pageHeader}>
                        <IconButton sx={{ margin: '0px', padding: '0px', alignSelf: 'center' }}
                            onClick={handleGoBack}>
                            <LeftArrow />
                        </IconButton>
                        <h4>Privacy and Security</h4>
                    </div>
                    <div className={styles.suggestedContent} style={{ paddingBottom: 0 }}>
                        <h4>Activity Status</h4>
                        <div className={styles.cards}>
                            <FormGroup
                                sx={{
                                    width: '100%', display: 'flex',
                                    flexDirection: 'row', justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                <div className={styles.cardNoBorder}>
                                    <p>Show Activity status</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={<IOSSwitch sx={{ m: 1 }} checked={settings?.activityStatus || false}
                                            onChange={(e: any) => handleSwitchChange(e, 'activityStatus')}
                                        />}
                                    />
                                </div>
                                <div style={{ width: '475px' }}>
                                    <p style={{
                                        fontSize: '14px', fontFamily: 'Poppins', textAlign: 'left',
                                        color: '#6B6B6B'
                                    }}>
                                        Allow accounts you follow and anyone you message
                                        to see when you were last active or are currently active.
                                    </p>
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className={styles.suggestedContent}>
                        <h4>Allow users to</h4>
                        <div className={styles.cards}>
                            <FormGroup
                                sx={{
                                    width: '100%', display: 'flex',
                                    flexDirection: 'row', justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                <div className={styles.card}>
                                    <p>Share my videos</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={<IOSSwitch sx={{ m: 1 }} checked={settings?.shareMedia || false}
                                            onChange={(e: any) => handleSwitchChange(e, 'shareMedia')}
                                        />}
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>Download my videos</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={<IOSSwitch sx={{ m: 1 }} checked={settings?.downloadMedia || false}
                                            onChange={(e: any) => handleSwitchChange(e, 'downloadMedia')}
                                        />}
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>See following list</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={<IOSSwitch sx={{ m: 1 }} checked={settings?.viewFollowing || false}
                                            onChange={(e: any) => handleSwitchChange(e, 'viewFollowing')}
                                        />}
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>See followers list</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={<IOSSwitch sx={{ m: 1 }} checked={settings?.viewFollowers || false}
                                            onChange={(e: any) => handleSwitchChange(e, 'viewFollowers')}
                                        />}
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>See liked videos</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={<IOSSwitch sx={{ m: 1 }} checked={settings?.viewLikedVideos || false}
                                            onChange={(e: any) => handleSwitchChange(e, 'viewLikedVideos')}
                                        />}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>


                </div>
            </div>
        </div>
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
                backgroundColor: theme.palette.mode === 'dark' ? '#5448B2' : '#5448B2',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#5448B2',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
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