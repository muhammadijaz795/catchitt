import React, { useState } from 'react';
import styles from './followModal.module.scss';
import FollowingTab from './FollowingTab';
import FollowersTab from './FollowersTab';
import SuggestedTab from './SuggestedTab';
import MessageTab from './MessageTab';
import { useSelector } from 'react-redux';

interface Tab {
    name: string;
    content: JSX.Element;
}

const FollowModal: React.FC<any> = ({ onClose }: any) => {
    const name = useSelector((state: any) => {
        return state?.reducers?.profile?.name;
    });

    const totalFollwers = useSelector((state: any) => state?.reducers?.profile?.followers);
    const totalFollwing = useSelector((state: any) => state?.reducers?.followings?.total);
    const totalFriends = useSelector((state: any) => state?.reducers?.friends?.total);

    const tabs: Tab[] = [
        {
            name: 'Following',
            content: (
                <>
                    <FollowingTab onClose={onClose} />
                </>
            ),
        },
        {
            name: 'Followers',
            content: (
                <>
                    <FollowersTab onClose={onClose} />
                </>
            ),
        },
        {
            name: 'Friends',
            content: (
                <>
                    <MessageTab />
                </>
            ),
        },
        {
            name: 'Suggested',
            content: (
                <>
                    <SuggestedTab onClose={onClose} />
                </>
            ),
        },
    ];

    const [activeTab, setActiveTab] = useState(0);

    const onTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    return (
        <>
            <div className={styles.div}>
                <div className={styles['div-2']}>{name} </div>
                <div className={styles['div-3']}>
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            onClick={() => onTabClick(index)}
                            className={`${styles['div-4']} ${
                                activeTab === index && styles.activeTab
                            }`}
                        >
                            <div className={styles['div-5']}>
                                {tab.name}{' '}
                                {index === 0
                                    ? totalFollwing
                                    : index === 1
                                    ? totalFollwers
                                    : index === 2
                                    ? totalFriends
                                    : ''}
                            </div>
                            <div className={styles['div-6']} />
                        </div>
                    ))}
                </div>
                <div className={styles.inputContainer}>
                    <input placeholder="Search" className={styles.input} />
                    <img src="/images/icons/profile.svg" alt="Profile Icon" />
                </div>
                {tabs[activeTab].content}
            </div>
        </>
    );
};

export default FollowModal;
