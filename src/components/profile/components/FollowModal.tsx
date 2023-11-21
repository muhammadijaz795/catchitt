import React, { useState } from 'react';
import styles from './followModal.module.scss';
import FollowingTab from './FollowingTab';
import FollowersTab from './FollowersTab';
import SuggestedTab from './SuggestedTab';
import MessageTab from './MessageTab';

interface Tab {
    name: string;
    content: JSX.Element;
}

const FollowModal: React.FC = () => {



    const tabs: Tab[] = [
        {
            name: 'Following',
            content: (
                <>
                    <FollowingTab />
                </>
            ),
        },
        {
            name: 'Followers',
            content: (
                <>
                    <FollowersTab />
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
                    <SuggestedTab />
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
                <div className={styles['div-2']}>Radwa Aly</div>
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
                                {index === 0 ? '45' : index === 1 ? '55' : index === 2 ? '8' : ''}
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
