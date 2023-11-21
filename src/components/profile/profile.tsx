import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './profile.module.scss';
import { VideoIcon } from './svg-components/VideoIcon';
import { Private } from './svg-components/Private';
import { Bookmark } from './svg-components/Bookmark';
import { Liked } from './svg-components/Liked';
import { Tagged } from './svg-components/Tagged';
import { Badge } from './svg-components/Badge';
import ProfileHeader from './components/profileHeader';
import EditProfile from './components/editProfile';
import { ClickAwayListener, Modal } from '@mui/material';
import FollowModal from './components/FollowModal';
import LikesModal from './components/LikesModal';

export const Profile = (props: any) => {
    const { selectedIndex, setIndex } = useAuthStore();
    const [activeTab, setActiveTab] = useState('Videos');
    const [profileModal, setProfileModal] = useState(false);
    const [followModal, setFollowModal] = useState(null);
    const [likesModal, setLikesModal] = useState(false);
    const tabs = [
        {
            title: 'Videos',
            icon: <VideoIcon active={activeTab === 'Videos'} />,
            key: 1,
        },
        {
            title: 'Private',
            icon: <Private active={activeTab === 'Private'} />,
            key: 2,
        },
        {
            title: 'Bookmarks',
            icon: <Bookmark active={activeTab === 'Bookmarks'} />,
            key: 3,
        },
        {
            title: 'Liked Videos',
            icon: <Liked active={activeTab === 'Liked Videos'} />,
            key: 4,
        },
        {
            title: 'Badges',
            icon: <Badge active={activeTab === 'Badges'} />,
            key: 5,
        },
        {
            title: 'Tagged Posts',
            icon: <Tagged active={activeTab === 'Tagged Posts'} />,
            key: 6,
        },
    ];
    const onCancel = () => {
        setProfileModal(false);
    };
    const onSave = () => {
        setProfileModal(false);
    };
    const onFollowModalActive = (tab?: string) => {
        setFollowModal(tab);
    };
    return (
        <div className={styles.root}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={selectedIndex} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div>
                <Modal open={likesModal} className={styles.likesModal}>
                    <ClickAwayListener onClickAway={() => setLikesModal(false)}>
                        <div className={styles.likesModalContainer}>
                            <LikesModal openModal={()=> setLikesModal(true)} />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <Modal open={!!followModal} className={styles.likesModal}>
                    <ClickAwayListener onClickAway={() => setFollowModal(null)}>
                        <div className={styles.likesModalContainer}>
                            <FollowModal />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <Modal open={profileModal} className={styles.modal}>
                    <ClickAwayListener onClickAway={onCancel}>
                        <div className={styles.modalContainer}>
                            <EditProfile onCancel={onCancel} onSave={onSave} />
                        </div>
                    </ClickAwayListener>
                </Modal>
                <div className={styles.middleSectionDiv}>
                    <ProfileHeader
                        onFollowModalActive={onFollowModalActive}
                        setProfileModal={setProfileModal}
                        setLikesModal={setLikesModal}
                    />
                    <div className={styles.tabs}>
                        {tabs.map((item) => (
                            <div
                                onClick={() => setActiveTab(item.title)}
                                style={{
                                    borderColor: activeTab === item.title ? '#5448B2' : '#DFDFDF',
                                }}
                                className={styles.tab}
                                key={item.key}
                            >
                                {item.icon}
                            </div>
                        ))}
                    </div>
                    <div className={styles.contentContainer}>
                        <p className={styles.title}>{activeTab}</p>
                        <div className={styles.posts}>
                            {[...new Array(7)].map((item) => (
                                <div key={item} className={styles.post}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
