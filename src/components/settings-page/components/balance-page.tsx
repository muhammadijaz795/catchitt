import { Box, IconButton, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../../../assets/closeIcon.png';
import dangerIcon from '../../../assets/dangerIcon.png';
import questionBlackIcon from '../../../assets/questionBlackIcon.png';
import reportEmailIcon from '../../../assets/reportEmailIcon.png';
import { useAuthStore } from '../../../store/authStore';
import { LeftArrow } from '../../push-notifications-page/svg-components/LeftArrow';
import FaqContainer from '../../reusables/FaqContainer/FaqContainer';
import Calculator from '../../reusables/calculator/Calculator';
import { SideNavBar } from '../../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../../suggested-activity/suggested-activity';
import { TopBar } from '../../top-bar/top-bar';
import coin from '../svg-components/coin.svg';
import whiteRightArrow from '../svg-components/whiteRightArrow.svg';
import styles from './balance-page.module.scss';
import CoinsPrice from './coins-price';
import CoinsCartModal from './coins-cart-modal';
import PaymentMethodModal from './payment-method-modal';
import PaymentSuccessModal from './payment-success-modal';
import Layout from '../../../shared/layout';

export interface BalancePageProps {
    className?: string;
}

const BalancePage = ({ className }: BalancePageProps) => {
    const API_KEY = process.env.VITE_API_URL;
    const { login, balance } = useAuthStore();

    const [coinsData, setCoinsData] = useState([
        { coinsAmount: 65, coinsPrice: 3.69, selected: false },
        { coinsAmount: 72, coinsPrice: 4.15, selected: true },
        { coinsAmount: 56, coinsPrice: 3.22, selected: false },
        { coinsAmount: 80, coinsPrice: 4.5, selected: false },
        { coinsAmount: 45, coinsPrice: 2.8, selected: false },
        { coinsAmount: 90, coinsPrice: 5.2, selected: false },
        { coinsAmount: 68, coinsPrice: 3.95, selected: false },
        { coinsAmount: 52, coinsPrice: 3.0, selected: false },
        { coinsAmount: 75, coinsPrice: 4.35, selected: false },
        { coinsAmount: 62, coinsPrice: 3.6, selected: false },
        { coinsAmount: 85, coinsPrice: 4.9, selected: false },
    ]);
    const [response, setResponse] = useState(false);
    const [responseResult, setResponseResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [selectedCoinsAmount, setSelectedCoinsAmount] = useState({
        coinsAmount: 56,
        coinsPrice: 3.22,
    });

    const [revenueData, setRevenueData] = useState<any>();
    const [diamondsData, setDiamondsData] = useState<any>();

    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const token = localStorage.getItem('token');
    const email = useAuthStore((state) => state.email);
    const navigate = useNavigate();

    const [openCalculatorModal, setOpenCalculatorModal] = useState(false);
    const [openCartModal, setOpenCartModal] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [openPaymentSuccessModal, setPaymentSuccessModal] = useState(false);

    const handleOpenCalculatorModal = () => {
        setOpenCalculatorModal(true);
    };
    const handleCloseCalculatorModal = () => {
        setOpenCalculatorModal(false);
    };

    const handleCloseCartModal = () => {
        setOpenCartModal(false);
    };
    const rechargeClick = () => {
        setOpenCartModal(true);
    };

    const onAmountSelection = (
        index: number,
        coinsAmount: number,
        coinsPrice: number,
        selected: boolean
    ) => {
        setCoinsData(
            coinsData.map((coin, i) => {
                if (i === index) {
                    coin.selected = true;
                } else {
                    coin.selected = false;
                }
                return coin;
            })
        );

        setSelectedCoinsAmount({ coinsAmount: coinsAmount, coinsPrice: coinsPrice });
    };

    const handleClosePaymentModal = () => {
        setOpenPaymentModal(false);
    };
    const handleOpenPaymentModal = () => {
        handleCloseCartModal();

        setOpenPaymentModal(true);
    };
    const handleOpenPaymentSuccessModal = () => {
        setPaymentSuccessModal(true);
    };
    const handleClosePaymentSuccessModal = () => {
        setPaymentSuccessModal(false);
    };

    const handleMethodSelection = (method: string) => {
        console.log(method);
        handleOpenPaymentSuccessModal();
        setOpenPaymentModal(false);
    };

    const [openFaqsModal, setOpenFaqsModal] = useState(false);
    const handleOpenFaqsModal = () => {
        setOpenCalculatorModal(false);
        setOpenFaqsModal(true);
    };
    const handleCloseFaqsModal = () => {
        setOpenFaqsModal(false);
    };

    const handleEmailClick = () => {
        const email = 'info@ogoul.com';
        window.location.href = `mailto:${email}`;
        setOpenFaqsModal(false);
    };

    const handleGoBack = () => {
        navigate('/settings/account'); // Navigate back to the previous page
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
            setRevenueData(data.data.totalGiftRevenue);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        setIndex(4);
        handleFetchRevenueData();
    }, []);

    const [darkTheme, setdarkTheme] = useState('');
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });

    return (
        <>
            <Layout>
                {/* <div className={styles.root}>
                <div className={styles.topBarDiv}>
                    <TopBar />
                </div> */}
                {/* <div className={styles.container}> */}
                {/* <div className={styles.leftSide}>
                        <div className={styles.sideNavDiv}>
                            <SideNavBar selectedIndex={selectedIndex} settingsDropdownState={true} />
                        </div>
                        <div className={styles.suggestedActivityDiv}>
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
                    </div> */}
                <div className={` ${styles.middleSectionDiv} ${darkTheme} `}>
                    <div className={styles.settingsWrapper}>
                        <div
                            className={styles.pageHeader}
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
                            <h4>Balance</h4>
                        </div>
                        <div className={styles.suggestedContent}>
                            <div
                                style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                            >
                                <h4 className={styles.sectionTitle}>Coin Balance</h4>
                                <div
                                    style={{
                                        marginTop: '30px',
                                        textAlign: 'left',
                                        display: 'flex',
                                    }}
                                >
                                    <img src={coin} alt="" style={{ width: '39px' }} />
                                    <h4 className={styles.userCoinsAmount}>{balance}</h4>
                                    <div className={styles.btnDiv}>
                                        <button
                                            className={styles.viewTransactionsBtn}
                                            onClick={() =>
                                                navigate('/settings/account/transaction-history')
                                            }
                                        >
                                            View transaction History
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.settingsWrapper}>
                        <div className={styles.suggestedContent}>
                            <h4 className={styles.sectionTitle}>Recharge</h4>
                            <div style={{ width: '100%' }}>
                                <>
                                    <Box sx={defModalStyle}>
                                        <div className={styles.warningMsg}>
                                            <p>Pricing will change depending on payment method.</p>
                                            <img src={dangerIcon} alt="" />
                                        </div>
                                        <Box sx={pricesBox}>
                                            {coinsData.map((item, index) => (
                                                <CoinsPrice
                                                    key={index}
                                                    index={index}
                                                    onAmountSelection={onAmountSelection}
                                                    coinsAmount={item.coinsAmount}
                                                    coinsPrice={item.coinsPrice}
                                                    selected={item.selected}
                                                />
                                            ))}
                                            <div
                                                className={styles.price}
                                                onClick={handleOpenCalculatorModal}
                                            >
                                                <div className={styles.coinsAmount}>Custom</div>
                                                <div className={styles.coinsPriceCustom}>
                                                    Larger amounts<br></br> supported
                                                </div>
                                            </div>
                                        </Box>
                                        <div
                                            className={styles.giftsBottomDiv}
                                            style={{ marginBottom: '32px' }}
                                        >
                                            <button
                                                onClick={rechargeClick}
                                                className={styles.rechargeBtn}
                                            >
                                                <p>Recharge</p>
                                            </button>
                                        </div>
                                        {openCalculatorModal && (
                                            <div>
                                                <Modal
                                                    open={openCalculatorModal}
                                                    onClose={handleCloseCalculatorModal}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={CustomCoinsModalStyle}>
                                                        <div className={styles.rechargeModalHeader}>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    width: '60%',
                                                                }}
                                                            >
                                                                <p>Custom</p>
                                                                <IconButton
                                                                    onClick={
                                                                        handleCloseCalculatorModal
                                                                    }
                                                                >
                                                                    <img
                                                                        src={closeIcon}
                                                                        alt=""
                                                                        style={{
                                                                            width: '20px',
                                                                            height: '20px',
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                        <Box sx={{ marginBottom: '32px' }}>
                                                            <Calculator />
                                                        </Box>
                                                        <div
                                                            className={styles.giftsBottomDiv2}
                                                            style={{ marginBottom: '32px' }}
                                                        >
                                                            <div
                                                                className={
                                                                    styles.giftsBottomLeftDiv2
                                                                }
                                                            >
                                                                <p className={styles.giftCoinsText}>
                                                                    Total
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.giftsBottomRightDiv
                                                                }
                                                            >
                                                                <p
                                                                    className={
                                                                        styles.giftCoinsAmountText
                                                                    }
                                                                >
                                                                    QAR 0
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                gap: '16px',
                                                                flexDirection: 'column',
                                                            }}
                                                        >
                                                            <IconButton
                                                                onClick={handleOpenFaqsModal}
                                                            >
                                                                <img
                                                                    src={questionBlackIcon}
                                                                    alt=""
                                                                />
                                                            </IconButton>
                                                            <button
                                                                onClick={rechargeClick}
                                                                className={
                                                                    styles.rechargeBtnFullWidth
                                                                }
                                                            >
                                                                <p>Recharge</p>
                                                            </button>
                                                        </div>
                                                    </Box>
                                                </Modal>
                                            </div>
                                        )}

                                        {openCartModal && (
                                            <CoinsCartModal
                                                openCartModal={openCartModal}
                                                onCloseCartModal={handleCloseCartModal}
                                                next={handleOpenPaymentModal}
                                            />
                                        )}

                                        {openPaymentModal && (
                                            <PaymentMethodModal
                                                openPaymentModal={openPaymentModal}
                                                onClosePaymentModal={handleClosePaymentModal}
                                                next={handleMethodSelection}
                                            />
                                        )}

                                        {openPaymentSuccessModal && (
                                            <PaymentSuccessModal
                                                openPaymentSuccessModal={openPaymentSuccessModal}
                                                onClosePaymentSuccessModal={
                                                    handleClosePaymentSuccessModal
                                                }
                                            />
                                        )}
                                        {openFaqsModal && (
                                            <div>
                                                <Modal
                                                    open={openFaqsModal}
                                                    onClose={handleCloseFaqsModal}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={faqsModal}>
                                                        <div className={styles.rechargeModalHeader}>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    width: '70%',
                                                                }}
                                                            >
                                                                <p>Payment FAQS</p>
                                                                <IconButton
                                                                    onClick={handleCloseFaqsModal}
                                                                >
                                                                    <img
                                                                        src={closeIcon}
                                                                        alt=""
                                                                        style={{
                                                                            width: '20px',
                                                                            height: '20px',
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                        <div className={styles.faqsContainer}>
                                                            <FaqContainer />
                                                        </div>
                                                        <div>
                                                            <button
                                                                onClick={handleEmailClick}
                                                                className={
                                                                    styles.rechargeBtnFullWidth
                                                                }
                                                                style={{ gap: '12px' }}
                                                            >
                                                                <img src={reportEmailIcon} alt="" />
                                                                <p>Report a different issue</p>
                                                            </button>
                                                        </div>
                                                    </Box>
                                                </Modal>
                                            </div>
                                        )}
                                    </Box>
                                </>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.accountCards}
                        onClick={() => navigate('/settings/account/gift-revenue')}
                    >
                        <div className={styles.settingName}>
                            <img src={coin} alt="" className={styles.coinImgCard} />
                            <p>Gift revenue</p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                minWidth: '100px',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <p>QAR {revenueData}</p>
                            <img src={whiteRightArrow} alt="" style={{ marginLeft: '6px' }} />
                        </div>
                    </div>
                    <div style={{ marginTop: '60px' }}>
                        <h4 className={styles.sectionTitle}>Frequently asked questions</h4>
                    </div>
                    <div className={styles.faqsContainerInPage}>
                        <FaqContainer />
                    </div>
                </div>
                {/* </div> */}
                {/* </div > */}
            </Layout>
        </>
    );
};

export default BalancePage;

const defModalStyle = {
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 420,
    minHeight: 410,
    maxWidth: '600px',
    // maxHeight: '549px',
    padding: '0',
};

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
};

const pricesBox = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    marginBottom: '24px',
    marginTop: '16px',
    columnGap: '8px',
    rowGap: '8px',
};

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
};
