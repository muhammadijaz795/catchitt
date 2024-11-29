import { CircularProgress, IconButton } from '@mui/material';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { LeftArrow } from '../../push-notifications-page/svg-components/LeftArrow';
import { SideNavBar } from '../../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../../suggested-activity/suggested-activity';
import { TopBar } from '../../top-bar/top-bar';
import styles from './transaction-history-page.module.scss';
import Layout from '../../../shared/layout';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface TransactionHistoryPageProps {
    className?: string;
}

const txns = [
    {
      "_id": "67496a8e3fd706788ea0fb28",
      "createdTime": 1722435653329,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "63be7cc8170b8469e7b5f1a8",
      "transactionId": "7d4fb2b3-74a4-4af1-bc5a-6bbbd80ecd86",
      "amount": -0.05,
      "type": "Gift",
      "sourceUserBalance": 0.6,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1722435653330,
      "__v": 0,
      "currentBalance": 0.6
    },
    {
      "_id": "67496a8e3fd706788ea0fb27",
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "639abb5ef8e7a8fbd44fd338",
      "transactionId": "9e2dad9a-5abc-4c2b-9137-746aa84903df",
      "amount": -1,
      "type": "Exchange",
      "sourceUserBalance": 9999.95,
      "destinationUserBalance": 0,
      "createdTime": 1718789831209,
      "lastModifiedTime": 1718789831209,
      "__v": 0,
      "currentBalance": 9999.95
    },
    {
      "_id": "67496a8e3fd706788ea0fb23",
      "createdTime": 1713172540624,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "670f5a3bf2e43d587fa69d1b",
      "transactionId": "2000000572048869",
      "amount": -1.3,
      "type": "Purchase",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1713172540625,
      "__v": 0,
      "currentBalance": 0
    },
    {
      "_id": "67496a8e3fd706788ea0fb22",
      "createdTime": 1712771747792,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "642523032adeaa1e7688894c",
      "transactionId": "cf85178e-e458-43e5-8d07-846f25c7df89",
      "amount": -0.05,
      "type": "Gift",
      "sourceUserBalance": 9998.95,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1712771747793,
      "__v": 0,
      "currentBalance": 9998.95
    },
    {
      "_id": "67496a8e3fd706788ea0fb1c",
      "createdTime": 1712605206407,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "670f5a3bf2e43d587fa69d1b",
      "transactionId": "e80ce321-cf02-4952-b8aa-e7b1f63b4897",
      "amount": -0.1,
      "type": "Gift",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1712605206408,
      "__v": 0,
      "currentBalance": 0
    },
    {
      "_id": "67496a8e3fd706788ea0fb1b",
      "createdTime": 1712605169817,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "64b0632b752e09c40116a5ea",
      "transactionId": "9c8f0c57-b3aa-49f3-a428-f7e0cfbe4910",
      "amount": -1,
      "type": "Gift",
      "sourceUserBalance": 5.5,
      "destinationUserBalance": 0.9,
      "lastModifiedTime": 1712605169817,
      "__v": 0,
      "currentBalance": 5.5
    },
    {
      "_id": "67496a8e3fd706788ea0fb1a",
      "createdTime": 1712605128161,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "670f5a3bf2e43d587fa69d1b",
      "transactionId": "2000000566681854",
      "amount": -6.5,
      "type": "Purchase",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1712605128162,
      "__v": 0,
      "currentBalance": 0
    },
    {
      "_id": "67496a8e3fd706788ea0fb16",
      "createdTime": 1711410849852,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "6601ce8456a9ad0391e56b8f",
      "transactionId": "4f7b6abc-376e-4c10-89a1-74738a187584",
      "amount": -1,
      "type": "Gift",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1711410849852,
      "__v": 0,
      "currentBalance": 0
    },
    {
      "_id": "67496a8e3fd706788ea0fb15",
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "transactionId": "d4c0d885-ed3d-4f21-98bb-10c70a28a701",
      "amount": -100,
      "type": "Withdrawal",
      "sourceUserBalance": 10115.65,
      "destinationUserBalance": 0,
      "createdTime": 1711408711444,
      "lastModifiedTime": 1711408711444,
      "__v": 0,
      "currentBalance": 10115.65
    },
    {
      "_id": "67496a8e3fd706788ea0fb14",
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "transactionId": "d4c0d885-ed3d-4f21-98bb-10c70a28a701",
      "amount": -100,
      "type": "Withdrawal",
      "sourceUserBalance": 10115.65,
      "destinationUserBalance": 0,
      "createdTime": 1711408635551,
      "lastModifiedTime": 1711408635551,
      "__v": 0,
      "currentBalance": 10115.65
    },
    {
      "_id": "67496a8e3fd706788ea0fb13",
      "createdTime": 1710865746977,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "670f5a3bf2e43d587fa69d1b",
      "transactionId": "8aaf2574-cf2f-421a-9e0e-c377cf4cfc66",
      "amount": -0.15,
      "type": "Gift",
      "sourceUserBalance": 1.1,
      "destinationUserBalance": 10115.65,
      "lastModifiedTime": 1710865746977,
      "__v": 0,
      "currentBalance": 1.1
    },
    {
      "_id": "67496a8e3fd706788ea0fb10",
      "createdTime": 1710805291631,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "670f5a3bf2e43d587fa69d1b",
      "transactionId": "2000000548850496",
      "amount": -0.65,
      "type": "Purchase",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1710805291632,
      "__v": 0,
      "currentBalance": 0
    },
    {
      "_id": "67496a8e3fd706788ea0fb0a",
      "createdTime": 1709547435322,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "63c63ce2bf17138077e1d559",
      "transactionId": "d22b45fe-6bd3-40b6-8f63-994a816c1b15",
      "amount": -1,
      "type": "Gift",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1709547435322,
      "__v": 0,
      "currentBalance": 0
    },
    {
      "_id": "67496a8e3fd706788ea0fb09",
      "createdTime": 1708628349776,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "670f5a3bf2e43d587fa69d1b",
      "transactionId": "2000000530530292",
      "amount": -0.65,
      "type": "Purchase",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1708628349777,
      "__v": 0,
      "currentBalance": 0
    },
    {
      "_id": "67496a8e3fd706788ea0fb08",
      "createdTime": 1708625319810,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "670f5a3bf2e43d587fa69d1b",
      "transactionId": "2000000530508896",
      "amount": -3.9,
      "type": "Purchase",
      "sourceUserBalance": 710,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1708625319810,
      "__v": 0,
      "currentBalance": 710
    },
    {
      "_id": "67496a8e3fd706788ea0fb07",
      "createdTime": 1708166488259,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "670f5a3bf2e43d587fa69d1b",
      "transactionId": "2000000526050052",
      "amount": -2.6,
      "type": "Purchase",
      "sourceUserBalance": 0.65,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1708166488260,
      "__v": 0,
      "currentBalance": 0.65
    },
    {
      "_id": "67496a8e3fd706788ea0fb06",
      "createdTime": 1708164113835,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "670f5a3bf2e43d587fa69d1b",
      "transactionId": "2000000526039722",
      "amount": -0.65,
      "type": "Purchase",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1708164113836,
      "__v": 0,
      "currentBalance": 0
    },
    {
      "_id": "67496a8e3fd706788ea0fb02",
      "createdTime": 1707853967756,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "64daa9693949dc6758eea57c",
      "transactionId": "e028b0a0-a2dd-42e6-be00-9c1865d83386",
      "amount": -0.6,
      "type": "Gift",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1707853967757,
      "__v": 0,
      "currentBalance": 0
    },
    {
      "_id": "67496a8e3fd706788ea0fb01",
      "createdTime": 1707853961139,
      "isDeleted": false,
      "sourceUserId": {
        "_id": "670f5a3bf2e43d587fa69d1b",
        "name": "MD Imran 1",
        "avatar": "https://seezitt-new-videos-source-encoder-bucket-prod-new.s3.amazonaws.com/1732246585847-UNpGMgUOkk.jpeg",
        "isVerified": false,
        "username": "mdimran"
      },
      "destinationUserId": "64daa9693949dc6758eea57c",
      "transactionId": "7c2eade5-ac8e-4592-98fe-02272b434f84",
      "amount": -0.15,
      "type": "Gift",
      "sourceUserBalance": 0,
      "destinationUserBalance": 0,
      "lastModifiedTime": 1707853961139,
      "__v": 0,
      "currentBalance": 0
    }
  ]

const TransactionHistoryPage = ({ className }: TransactionHistoryPageProps) => {

    const API_KEY = process.env.VITE_API_URL;
    const abortController = useRef<AbortController | null>(null);

    const today = new Date();
    const startDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
    const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const [revenueData, setRevenueData] = useState<any>([]);
    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const [transactions, setTransactions] = useState<any>({ items: [], pageSize: 10, page: 1, hasNextPage: true, startDate, endDate });
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [darkTheme, setdarkTheme] = useState('');

    const handleGoBack = () => {
        navigate('/settings/account/balance'); // Navigate back to the previous page
        setSettingsDropdown(true);
    };

    interface DateChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement;
    }

    const alterDate = (e: DateChangeEvent) => {
        const inputElement = e.target;
        setTransactions({ ...transactions, [inputElement.id]: inputElement.value, page: 1, items:[], hasNextPage: true });

    }

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
            const formattedCurrentMonth = `${currentMonthDate.getMonth() + 1
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
            const controller = new AbortController();
            abortController.current = controller;
            const { pageSize, page, items, startDate, endDate } = transactions;
            const response = await fetch(`${API_KEY}/profile/transactions?pageSize=${pageSize}&pageNumber=${page}&startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
                signal: controller.signal
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
            if (!data?.transactions.length) return setTransactions({ ...transactions, hasNextPage: false });
            setTransactions({
                ...transactions,
                items: [...items, ...data?.transactions],
                page: page + 1
            });
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
        finally {
            abortController.current = null;
        }
    };


    useEffect(() => {
        setIndex(4);
        // handleFetchRevenueData();
        getTransactionHistory();
        return () => {
            if (abortController.current) {
                abortController.current.abort();
            }
        }
    }, []);
    
    useEffect(() => {
        getTransactionHistory();
    }, [transactions.startDate, transactions.endDate])

    useEffect(() => {
      console.log('check first txn 🤖🤖🥶🥶', transactions);
    }, [transactions])
    


    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });

    return (
        <>
            <Layout>
                <div className={`${styles.middleSectionDiv} overflow-y-auto no-scrollbar`} id='txnContainer'>
                    <div className={styles.settingsWrapper}>
                        <div className={styles.pageHeader} style={{ display: 'flex', justifyContent: 'sapce-between' }}>
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
                            <h4 className={darkTheme !== '' ? 'text-white' : 'text-black'} >Transactions History</h4>
                        </div>
                        <div className='flex gap-3 justify-between mb-3 '>
                            <div>
                                <label htmlFor='startDate'>start Date: </label>
                                <input className={`py-1 px-2 rounded mx-1 ${darkTheme===''?'bg-gray-300':''}`} type="date" value={transactions.startDate} onChange={alterDate} name="startDate" id="startDate" />
                            </div>
                            <div>
                                <label htmlFor='endDate'>End Date: </label>
                                <input className={`py-1 px-2 rounded mx-1 ${darkTheme===''?'bg-gray-300':''}`} type="date" value={transactions.endDate} onChange={alterDate} name="endDate" id="endDate" />
                            </div>
                        </div>
                        <div className={styles.tableHeader}>
                            <h4 className={styles.sectionTitle}>Time & Date</h4>
                            <h4 className={styles.sectionTitle}>Type</h4>
                            <h4 className={styles.sectionTitle}>Amount</h4>
                        </div>
                        <InfiniteScroll
                            dataLength={transactions.items?.length}
                            next={getTransactionHistory}
                            hasMore={transactions.hasNextPage}
                            loader={<div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '1rem',
                                    width: 'inherit',
                                }}
                            >
                                <CircularProgress />
                            </div>}
                            className="mb-20"
                            // scrollThreshold={0.6}
                            scrollableTarget="txnContainer"
                            endMessage={
                                <div className="flex flex-row justify-center items-center mt-3">
                                    <p className="font-bold text-xl">
                                        {(transactions.items.length === 0) && 'You have not made any transaction till yet.'}
                                    </p>
                                </div>
                            }
                        >
                            {transactions.items.map(
                                (transaction: any, index: number) => {
                                    return (
                                        <div>
                                            <div key={index} className={styles.tableField}>
                                                <h4
                                                    className={`${styles.sectionTitle} ${darkTheme !== '' ? 'text-white' : 'text-black opacity-70'}`}
                                                    style={{ textAlign: 'start' }}
                                                >
                                                    {moment(transaction.createdTime).format(
                                                        'DD-MM-YYYY'
                                                    )}
                                                </h4>
                                                <h4 className={`${styles.sectionTitle} ${darkTheme !== '' ? 'text-white' : 'text-black opacity-70'}`}>
                                                    {transaction.type}
                                                </h4>
                                                <h4
                                                    className={`${styles.sectionTitle} ${darkTheme !== '' ? 'text-white' : 'text-black opacity-70'}`}
                                                    style={{ textAlign: 'end' }}
                                                >
                                                    QAR {transaction.amount}
                                                </h4>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </InfiniteScroll>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default TransactionHistoryPage;
