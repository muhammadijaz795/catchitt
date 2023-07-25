import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './suggested-accounts-page.module.scss';
import { TopBar } from '../top-bar/top-bar';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';

export interface SuggestedAccountsPageProps {
    className?: string;
}

interface Account {
    _id: string;
    avatar: string;
    name: string;
}

export const SuggestedAccountsPage = ({ className }: SuggestedAccountsPageProps) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const token = useAuthStore((state) => state.token);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // 5 rows * 4 cards per row

    const [errorMessage, setErrorMessage] = useState('');
    const [accountsData, setAccountsData] = useState<Account[]>([]);

    const API_KEY = process.env.VITE_API_URL;
    const suggestedEndPoint = '/profile/suggested-users';

    const handleFetchSuggestedAccounts = async () => {
        try {
            const response = await fetch(`${API_KEY}${suggestedEndPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setAccountsData(responseData.data.data);
            } else {
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        handleFetchSuggestedAccounts();
    }, [token]);

    // const handleNextPage = () => {
    //     setCurrentPage((prevPage) => prevPage + 1);
    // };

    // const handlePreviousPage = () => {
    //     setCurrentPage((prevPage) => prevPage - 1);
    // };

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    // Calculate the pagination boundaries
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const displayedAccounts = accountsData.slice(firstIndex, lastIndex);

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={null} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} />
                    </div>
                </div>
                <div className={styles.middleSectionDiv}>
                    <div className={styles.gridContainer}>
                        {displayedAccounts.map((account) => (
                            <div key={account._id} className={styles.accountCardDiv}>
                                <div className={styles.userInfoFrame}>
                                    <img
                                        src={account.avatar}
                                        alt={account.name}
                                        className={styles.avatarImgCircle}
                                    />
                                    <h4 className={styles.userNameText}>{account.name}</h4>
                                </div>
                                <div className={styles.followBtnDiv}>
                                    <button className={styles.followBtn}>Follow</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
