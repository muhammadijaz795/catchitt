import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { LeftArrow } from '../../push-notifications-page/svg-components/LeftArrow';
import { SideNavBar } from "../../side-nav-bar/side-nav-bar";
import { SuggestedActivity } from "../../suggested-activity/suggested-activity";
import { TopBar } from "../../top-bar/top-bar";
import styles from './transaction-history-page.module.scss';

export interface TransactionHistoryPageProps {
    className?: string;
}

const TransactionHistoryPage = ({ className }: TransactionHistoryPageProps) => {
    const API_KEY = process.env.VITE_API_URL;
    const { login, balance } = useAuthStore();

    const [response, setResponse] = useState(false);
    const [responseResult, setResponseResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingAnimation, setLoadingAnimation] = useState(false);

    const [revenueData, setRevenueData] = useState<any>([])

    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const token = useAuthStore((state) => state.token);
    const email = useAuthStore((state) => state.email);
    const navigate = useNavigate();

    const [openCalculatorModal, setOpenCalculatorModal] = useState(false)
    const handleOpenCalculatorModal = () => {
        setOpenCalculatorModal(true)
    }
    const handleCloseCalculatorModal = () => {
        setOpenCalculatorModal(false)
    }

    const [openFaqsModal, setOpenFaqsModal] = useState(false)
    const handleOpenFaqsModal = () => {
        setOpenCalculatorModal(false)
        setOpenFaqsModal(true)
    }
    const handleCloseFaqsModal = () => {
        setOpenFaqsModal(false)
    }

    const handleEmailClick = () => {
        const email = 'info@ogoul.com';
        window.location.href = `mailto:${email}`;
        setOpenFaqsModal(false)
    }

    const handleGoBack = () => {
        navigate('/settings/account/balance'); // Navigate back to the previous page
        setSettingsDropdown(true)
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
            const formattedCurrentMonth = `${currentMonthDate.getMonth() + 1}/${currentMonthDate.getFullYear()}`;

            setRevenueData({
                ...data.data,
                currentMonth: formattedCurrentMonth,
            });
            // setRevenueData(data.data);
            console.log('Fetched revenue:', JSON.stringify(data.data));
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };


    useEffect(() => {
        setIndex(4)
        handleFetchRevenueData()
    }, [])

    return (
        <>
            <div className={styles.root}>
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
                        <div className={styles.settingsWrapper}>
                            <div className={styles.pageHeader}>
                                <IconButton sx={{ margin: '0px', padding: '0px', alignSelf: 'center' }}
                                    onClick={handleGoBack}>
                                    <LeftArrow />
                                </IconButton>
                                <h4>Transactions History</h4>
                            </div>
                            <div className={styles.tableHeader}>
                                <h4 className={styles.sectionTitle}>Time & Date</h4>
                                <h4 className={styles.sectionTitle}>Type</h4>
                                <h4 className={styles.sectionTitle}>Amount</h4>
                            </div>
                            {revenueData.userGiftsTransactions?.map((transaction: any, index: number) => {
                                const formattedDate = new Date(transaction.createdTime).toLocaleDateString('en-GB');
                                const formattedTime = new Date(transaction.createdTime).toLocaleTimeString('en-GB');

                                return (
                                    <div>
                                        <div key={index} className={styles.tableField}>
                                            <h4 className={styles.sectionTitle} style={{ textAlign: 'start' }}>{`${formattedDate} ${formattedTime}`}</h4>
                                            <h4 className={styles.sectionTitle}>{transaction.type}</h4>
                                            <h4 className={styles.sectionTitle} style={{ textAlign: 'end' }}>QAR {transaction.amount}</h4>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default TransactionHistoryPage;

const defModalStyle = {
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 420,
    minHeight: 410,
    maxWidth: '600px',
    // maxHeight: '549px',
    padding: '0',
}

const CustomCoinsModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 420,
    minHeight: 410,
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
}

const pricesBox = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    marginBottom: '24px',
    marginTop: '16px',
    columnGap: '8px',
    rowGap: '8px',
}

const faqsModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 420,
    minHeight: 410,
    padding: '24px',
}
