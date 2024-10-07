import { IconButton } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { LeftArrow } from '../../push-notifications-page/svg-components/LeftArrow';
import { SideNavBar } from '../../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../../suggested-activity/suggested-activity';
import { TopBar } from '../../top-bar/top-bar';
import styles from './transaction-history-page.module.scss';
import Layout from '../../../shared/layout';

export interface TransactionHistoryPageProps {
    className?: string;
}

const TransactionHistoryPage = ({ className }: TransactionHistoryPageProps) => {
    const API_KEY = process.env.VITE_API_URL;
    const [revenueData, setRevenueData] = useState<any>([]);
    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const [transactions, setTransactions] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [darkTheme, setdarkTheme] = useState('');

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

    const getTransactionHistory = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/transactions`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
            setTransactions(data?.transactions);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        setIndex(4);
        handleFetchRevenueData();
        getTransactionHistory();
    }, []);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });

    return (
        <Layout>
            <div className={`${styles.root} ${darkTheme}`}>
                <div className={styles.container}>
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <IconButton
                                    sx={{ margin: '0px', padding: '0px', alignSelf: 'center' }}
                                    onClick={handleGoBack}
                                >
                                    <LeftArrow />
                                </IconButton>
                                <h4>Transactions History</h4>
                            </div>
                            <div className={styles.tableHeader}>
                                <h4 className={styles.sectionTitle}>Time & Date</h4>
                                <h4 className={styles.sectionTitle}>Type</h4>
                                <h4 className={styles.sectionTitle}>Amount</h4>
                            </div>
                            {transactions?.map((transaction: any, index: number) => {
                                return (
                                    <div>
                                        <div key={index} className={styles.tableField}>
                                            <h4
                                                className={styles.sectionTitle}
                                                style={{ textAlign: 'start' }}
                                            >
                                                {moment(transaction.createdTime).format(
                                                    'DD-MM-YYYY'
                                                )}
                                            </h4>
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
                            })}
                        </div>
                </div>
            </div>
        </Layout>
    );
};

export default TransactionHistoryPage;
