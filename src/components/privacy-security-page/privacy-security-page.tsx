import {
    Box,
    FormControlLabel,
    FormGroup,
    IconButton,
    Modal,
    Switch,
    SwitchProps,
    ThemeProvider,
    createTheme,
    styled,
} from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileICon from '../../assets/defaultProfileIcon.png';
import { useAuthStore } from '../../store/authStore';
import { LeftArrow } from '../push-notifications-page/svg-components/LeftArrow';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './privacy-security-page.module.scss';
import Layout from '../../shared/layout';


interface PrivacySettings {
    shareMedia: boolean;
    downloadMedia: boolean;
    viewFollowing: boolean;
    viewFollowers: boolean;
    viewLikedVideos: boolean;
    messages: boolean;
    activityStatus: boolean;
    viewProfileVisits: boolean;
    disallowScreenshot: boolean;
}

interface BlockedUser {
    _id: string;
    avatar: string;
    name: string;
}

export const PrivacySecurityPage = () => {
    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const token = localStorage.getItem('token');
    const [privacySettingsData, setPrivacySettingsData] = useState<PrivacySettings>();
    const [blockedAccountsData, setBlockedAccountsData] = useState<any>([]);
    // const [blockedAccountsData, setBlockedAccountsData] = useState<BlockedUser[]>([{_id: '1', avatar: 'https://via.placeholder.com/150', name: 'John Doe'}, {_id: '2', avatar: 'https://via.placeholder.com/150', name: 'Jane Doe'}]);

    const [openBlockedListModal, setOpenBlockedListModal] = useState(false);

    const [settings, setSettings] = useState({
        shareMedia: true,
        downloadMedia: true,
        viewFollowing: true,
        viewFollowers: true,
        viewLikedVideos: true,
        messages: true,
        activityStatus: true,
        viewProfileVisits: true,
        disallowScreenshot: true,
    });
    const API_KEY = process.env.VITE_API_URL;
    const navigate = useNavigate();

    const lightThemePalette = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkThemePalette = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleGoBack = () => {
        navigate('/settings/account'); // Navigate back to the previous page
        setSettingsDropdown(true);
    };

    // if (!isLoggedIn) {
    //     return <Navigate to="/auth" />;
    // }

    useEffect(() => {
        setIndex(5);
        setSettingsDropdown(true);
        handleFetchPrivacySettings();
    }, []);

    const handleFetchPrivacySettings = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/privacy-settings`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const responseData = await response.json();
                setPrivacySettingsData(responseData.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFetchBlockedAccounts = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/blocked-users`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const responseData = await response.json();
                setBlockedAccountsData([...responseData.data]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleBlockAccount = async (id: string) => {
        try {
            const response = await fetch(`${API_KEY}/profile/${id}/block`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                handleFetchBlockedAccounts();
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                viewProfileVisits: privacySettingsData.viewProfileVisits,
                disallowScreenshot: privacySettingsData.disallowScreenshot,
            });
        }
    }, [privacySettingsData]);

    const handleSwitchChange = (event: any, name: string) => {
        const updatedSettings = {
            ...settings,
            [name]: event.target.checked,
        };
        setSettings(updatedSettings);
        // Make a PATCH request to update the settings
        fetch(`${API_KEY}/profile/privacy-settings`, {
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
                } else {
                    // Handle errors here
                    console.error(response);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleOpenBlockedModal = () => {
        setOpenBlockedListModal(true);
        // setProfileDataCopy(profileData)
    };
    const handleCloseBlockedModal = () => {
        setOpenBlockedListModal(false);
    };

    useEffect(() => {
        handleFetchBlockedAccounts();
    }, [openBlockedListModal]);

    const [darkTheme, setdarkTheme] = useState('');
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });

    return (
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
                <div className={`${styles.middleSectionDiv} ${darkTheme}`}>
                    <div
                        className={`${styles.pageHeader} w-full p-3`}
                        style={{ display: 'flex', justifyContent: 'sapce-between' }}
                    >
                        <IconButton
                            sx={{
                                width: 'fit-content !important',
                                margin: '0px',
                                padding: '0px',
                                alignSelf: 'center',
                            }}
                            onClick={handleGoBack}
                        >
                            <LeftArrow />
                        </IconButton>
                        <h4 className={darkTheme ? 'text-white' : 'text-black'}>Privacy and Security</h4>
                    </div>
                    <div className={styles.suggestedContent} style={{ paddingBottom: 0 }}>
                        <h4 className={darkTheme ? 'text-white' : 'text-black'}>Activity Status</h4>
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
                                <div className={styles.cardNoBorder}>
                                    <p>Show Activity status</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.activityStatus || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'activityStatus')
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <div style={{ width: '475px' }}>
                                    <p
                                        style={{
                                            fontSize: '14px',
                                            fontFamily: 'Poppins',
                                            textAlign: 'left',
                                            color: '#6B6B6B',
                                        }}
                                    >
                                        Allow accounts you follow and anyone you message to see when
                                        you were last active or are currently active.
                                    </p>
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className={styles.suggestedContent}>
                        <h4 className={darkTheme ? 'text-white' : 'text-black'}>Allow users to</h4>
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
                                    <p>Share my videos</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.shareMedia || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'shareMedia')
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>Download my videos</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.downloadMedia || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'downloadMedia')
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>See following list</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.viewFollowing || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'viewFollowing')
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>See followers list</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.viewFollowers || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'viewFollowers')
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>See liked videos</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.viewLikedVideos || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'viewLikedVideos')
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>Allow Comments</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'isCommentsAllowed')
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <div className={styles.card}>
                                    <p>Mention and Tags</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'mentionAndTags')
                                                }
                                            />
                                        }
                                    />
                                </div>

                                {/* disallowScreenshot */}
                                <div className={styles.card}>
                                    <p>Disallow Screenshot</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={settings?.disallowScreenshot || false}
                                                onChange={(e: any) =>
                                                    handleSwitchChange(e, 'disallowScreenshot')
                                                }
                                            />
                                        }
                                    />
                                </div>

                                {/* Allow Story */}
                                <div className={styles.card}>
                                    <p>Allow Story</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={false}
                                                onChange={(e) => handleSwitchChange(e, 'allowStory')}
                                            />
                                        }
                                    />
                                </div>

                                {/* Allow Duet */}
                                <div className={styles.card}>
                                    <p>Allow Duet</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={false}
                                                onChange={(e) => handleSwitchChange(e, 'allowDuet')}
                                            />
                                        }
                                    />
                                </div>

                                {/* Refresh For you Feed */}
                                <div className={styles.card}>
                                    <p>Refresh for you feed</p>
                                    <FormControlLabel
                                        label={undefined}
                                        labelPlacement="start"
                                        control={
                                            <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={false}
                                                onChange={(e) => handleSwitchChange(e, 'refreshFeed')}
                                            />
                                        }
                                    />
                                </div>

                            </FormGroup>
                        </div>
                        <div className={styles.accountCards} onClick={handleOpenBlockedModal}>
                            <div className={styles.settingName}>
                                <p>Blocked accounts</p>
                            </div>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.5 5L15.5 12L8.5 19"
                                    stroke="#222222"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>

                    {openBlockedListModal && (
                        <ThemeProvider theme={darkTheme ? darkThemePalette : lightThemePalette}>
                            <Modal
                                open={openBlockedListModal}
                                onClose={handleCloseBlockedModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"

                            >
                                <Box sx={mainModalstyle}>
                                    <div className={styles.contentPrefHeader}>
                                        <h4 className={`${styles.contentPrefModalHeader} ${darkTheme ? 'text-white' : 'text-black'}`}>
                                            Blocked accounts
                                        </h4>
                                    </div>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {blockedAccountsData.length === 0 ? (
                                            <div style={{ textAlign: 'center', width: '100%' }}>
                                                <h4 className={darkTheme ? 'text-white' : 'text-black'} style={{ fontSize: '18px' }}>
                                                    No blocked accounts yet
                                                </h4>
                                            </div>
                                        ) : (
                                            <div style={{ width: '100%' }}>
                                                {blockedAccountsData.map((account: any) => (
                                                    <div className={styles.cards} key={account._id}>
                                                        <Box
                                                            sx={{
                                                                width: '100%',
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <div className={styles.card}>
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        gap: '16px',
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            account?.avatar === ''
                                                                                ? defaultProfileICon
                                                                                : account.avatar
                                                                        }
                                                                        alt={''}
                                                                        className={
                                                                            styles.profileImg
                                                                        }
                                                                    />
                                                                    <p className={darkTheme ? 'text-white' : 'text-black'}>{account?.name}</p>
                                                                </div>
                                                                <button
                                                                    className={`${styles.unblockBtn} ${darkTheme ? 'bg-black' : 'bg-white'}`}
                                                                    onClick={() => {
                                                                        handleBlockAccount(
                                                                            account._id
                                                                        );
                                                                    }}
                                                                >
                                                                    <svg
                                                                        width="16"
                                                                        height="17"
                                                                        viewBox="0 0 16 17"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M11.3753 4.39573L11.4957 4.27537L11.3612 4.1711C10.433 3.45186 9.27103 3.01632 8.00262 3.01632C4.97309 3.01632 2.51928 5.47017 2.51928 8.49967C2.51928 9.76809 2.95478 10.9301 3.67402 11.8582L3.77829 11.9928L3.89866 11.8724L11.3753 4.39573ZM4.62987 12.6036L4.5095 12.724L4.64405 12.8282C5.5722 13.5475 6.73418 13.983 8.00259 13.983C11.0321 13.983 13.4859 11.5292 13.4859 8.49967C13.4859 7.23129 13.0504 6.06931 12.3312 5.14114L12.2269 5.00658L12.1065 5.12695L4.62987 12.6036ZM1.48594 8.49967C1.48594 4.8992 4.40212 1.98301 8.00259 1.98301C11.6031 1.98301 14.5193 4.89917 14.5193 8.49967C14.5193 12.1002 11.6031 15.0163 8.00259 15.0163C4.40212 15.0163 1.48594 12.1002 1.48594 8.49967Z"
                                                                            fill="rgb(255, 59, 92)"
                                                                            stroke="white"
                                                                            strokeWidth="0.3"
                                                                        />
                                                                    </svg>
                                                                    Unblock
                                                                </button>
                                                            </div>
                                                        </Box>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Box>
                                </Box>
                            </Modal>
                        </ThemeProvider>
                    )}
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
                backgroundColor:
                    theme.palette.mode === 'dark' ? 'rgb(255, 59, 92)' : 'rgb(255, 59, 92)',
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

var mainModalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 524,
    height: 'auto',
    minHeight: 259,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '24px 23px',
    flexDirection: 'column',
    alignItems: 'center',
};

var mainModalBtnstyle = {
    fontFamily: 'Poppins',
    display: 'flex',
    width: '478px',
    height: '48px',
    padding: '0 16px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    background: 'var(--foundation-primary-primary-500, rgb(255, 59, 92))',
    textTransform: 'none',
};
