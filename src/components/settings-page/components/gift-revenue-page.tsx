import { Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { LeftArrow } from '../../push-notifications-page/svg-components/LeftArrow';
import { SideNavBar } from '../../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../../suggested-activity/suggested-activity';
import { TopBar } from '../../top-bar/top-bar';
import diamondIcon from '../svg-components/diamondIcon.svg';
import styles from './gift-revenue-page.module.scss';

export interface GiftRevenuePageProps {
    className?: string;
}

const GiftRevenuePage = ({ className }: GiftRevenuePageProps) => {
    const API_KEY = process.env.VITE_API_URL;
    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown, token } = useAuthStore();
    const [revenueData, setRevenueData] = useState<any>([]);
    const [diamondsData, setDiamondsData] = useState<any>([]);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/settings/account/balance'); // Navigate back to the previous page
        setSettingsDropdown(true);
    };

    const handleFetchRevenueData = async () => {
        try {
            const response = await fetch(`${API_KEY}/revenue/`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // Format the currentMonth value
            const currentMonthDate = new Date(data.data.currentMonth);
            const formattedCurrentMonth = `${
                currentMonthDate.getMonth() + 1
            }/${currentMonthDate.getFullYear()}`;

            setRevenueData({
                ...data.data,
                currentMonth: formattedCurrentMonth,
            });
            // setRevenueData(data.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleFetchDiamondsData = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/balance`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setDiamondsData(data.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        setIndex(4);
        handleFetchRevenueData();
        handleFetchDiamondsData();
    }, []);

    return (
        <>
            <div className={styles.root}>
                <div className={styles.topBarDiv}>
                    <TopBar />
                </div>
                <div className={styles.container}>
                    <div className={styles.leftSide}>
                        <div className={styles.sideNavDiv}>
                            <SideNavBar
                                selectedIndex={selectedIndex}
                                settingsDropdownState={true}
                            />
                        </div>
                        <div className={styles.suggestedActivityDiv}>
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
                    </div>
                    <div className={styles.middleSectionDiv}>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <IconButton
                                    sx={{ margin: '0px', padding: '0px', alignSelf: 'center' }}
                                    onClick={handleGoBack}
                                >
                                    <LeftArrow />
                                </IconButton>
                                <h4>Gift revenue</h4>
                            </div>
                            <div className={styles.suggestedContent}>
                                <div className={styles.settingName}>Total balance</div>
                                <h4 className={styles.sectionTitle}>
                                    $ {revenueData.totalGiftRevenue}
                                </h4>
                                <div className={styles.tableHeader}>
                                    <div>
                                        <h4 className={styles.sectionTitle}>Accumulated Cesium</h4>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}
                                    >
                                        <img src={diamondIcon} alt="" />
                                        <h4 className={styles.sectionTitle}>
                                            {diamondsData.diamonds}
                                        </h4>
                                    </div>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <Button sx={withdrawBtn}>Withdraw</Button>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <p>Daily whithdrawal limit (Remain/Total)</p>
                                    <p className={styles.limitNum}>
                                        ${revenueData.userConsumption} / $
                                        {revenueData.dailyWithdrawalLimit}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.suggestedContent}>
                            <div
                                className={styles.settingName}
                                style={{
                                    display: 'flex',
                                    marginBottom: '0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <p>How to increase withdrawal limit?</p>
                                <Button
                                    sx={smallBtn}
                                    onClick={() => navigate('/settings/account/withdrawal-limit')}
                                >
                                    How to ?
                                </Button>
                            </div>
                        </div>
                        <div className={styles.suggestedContent} style={{ marginTop: '24px' }}>
                            <div
                                className={styles.settingName}
                                style={{
                                    display: 'flex',
                                    marginBottom: '0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <p>
                                    Go to LIVE now to earn{' '}
                                    <span style={{ color: 'rgb(255, 59, 92)' }}>Cesium</span>
                                </p>
                                <Button
                                    variant="contained"
                                    disableElevation={true}
                                    sx={smallColoredBtn}
                                >
                                    Go LIVE
                                </Button>
                            </div>
                        </div>

                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <h4 style={{ fontSize: '18px' }}>Transactions</h4>
                            </div>
                            <div className={styles.tableHeader}>
                                <h4 className={styles.sectionTitle} style={{ textAlign: 'start' }}>
                                    {revenueData.currentMonth}
                                </h4>
                                <h4 className={styles.sectionTitle}>in: ${revenueData.income}</h4>
                                <h4
                                    className={styles.sectionTitle}
                                    style={{
                                        textAlign: 'end',
                                        width: '100%',
                                        minWidth: 'max-content',
                                    }}
                                >
                                    out: ${revenueData.outcome}
                                </h4>
                            </div>
                            {revenueData.userGiftsTransactions?.map(
                                (transaction: any, index: number) => {
                                    const formattedDate = new Date(
                                        transaction.createdTime
                                    ).toLocaleDateString('en-GB');
                                    const formattedTime = new Date(
                                        transaction.createdTime
                                    ).toLocaleTimeString('en-GB');

                                    return (
                                        <div>
                                            <div key={index} className={styles.tableField}>
                                                <h4
                                                    className={styles.sectionTitle}
                                                    style={{ textAlign: 'start' }}
                                                >{`${formattedDate} ${formattedTime}`}</h4>
                                                <h4 className={styles.sectionTitle}>
                                                    {transaction.type}
                                                </h4>
                                                <h4
                                                    className={styles.sectionTitle}
                                                    style={{ textAlign: 'end' }}
                                                >
                                                    QAR {transaction.amount}
                                                </h4>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GiftRevenuePage;

const withdrawBtn = {
    display: 'flex',
    width: '100%',
    height: '48px',
    padding: '0px 16px',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '6px',
    border: '1px solid rgb(255, 59, 92)',
    background: '#FFF',

    color: 'var(--foundation-primary-primary-500, rgb(255, 59, 92))',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '120%', // Use quotes for percentage values

    textTransform: 'none !important',
};

const smallBtn = {
    display: 'flex',
    width: '100%',
    maxWidth: '120px',
    height: '40px',
    padding: '0px 16px',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '6px',
    border: '1px solid rgb(255, 59, 92)',
    background: '#FFF',

    color: 'var(--foundation-primary-primary-500, rgb(255, 59, 92))',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '120%', // Use quotes for percentage values

    textTransform: 'none !important',
};

const smallColoredBtn = {
    display: 'flex',
    width: '100%',
    maxWidth: '120px',
    height: '40px',
    padding: '0px 16px',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '6px',
    border: '1px solid rgb(255, 59, 92)',
    background: 'rgb(255, 59, 92)',

    color: 'var(--foundation-primary-primary-500, #fff)',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '120%', // Use quotes for percentage values

    textTransform: 'none !important',
};
