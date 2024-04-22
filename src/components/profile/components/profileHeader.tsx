import { FunctionComponent, useEffect, useState } from 'react';
import styles from './profileHeader.module.scss';
import ShareIcon from '../svg-components/ShareIcon';
import EditIcon from '../svg-components/EditIcon';
import LinkIcon from '../svg-components/LinkIcon';
import MailIcon from '../svg-components/MailIcon';
import EditProfileIcon from '../svg-components/EditProfileIcon';
import ProfileViewIcon from '../svg-components/ProfileViewIcon';
import EditButtonIcon from '../svg-components/EditButtonIcon';
import LikesModal from './LikesModal';
import { Avatar } from '@mui/material';
import { useAuthStore } from '../../../store/authStore';
import COPY_AND_SEND_MENU from '../../../shared/Menu/copyAndSend';

interface Props {
    setProfileModal: (value: boolean) => void;
    setLikesModal: (value: boolean) => void;
    onFollowModalActive: (value: string) => void;
    profileData: any;
    showStory: any;
    copyHandler:any;
}

const ProfileHeader: FunctionComponent<Props> = ({
    setProfileModal,
    onFollowModalActive,
    setLikesModal,
    profileData,
    showStory,
    copyHandler
}) => {
    const API_KEY = process.env.VITE_API_URL;
    const [stories, setStories] = useState([]);
    const token = useAuthStore((state) => state.token);
    const auth = useAuthStore((state) => state._id);

     const localProfile = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        fetch(`${API_KEY}/media-content/stories`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setStories(data.data[0].stories);
                console.log('stories', stories);
            })
            .catch((err) => {
                console.log('collectons error', err);
            });
    }, []);
    console.log('profileData', profileData);

    return (
        <div className={styles.profileHeader}>
            <div className={styles.banner}>
                <div className={styles.banerIcon}>
                    <EditIcon />
                </div>
                {profileData?.cover && (
                    <img className={styles.bannerImg} src={profileData?.cover} alt="Banner Img" />
                )}
            </div>
            <div className={styles.bottomContainer}>
                <div
                    onClick={() => {
                        if (stories?.length > 0) {
                            showStory();
                        }
                    }}
                    className={stories?.length > 0 ? styles.avatarBox2 : styles.avatarBox}
                >
                    <Avatar
                        style={{ width: '100%', height: '100%' }}
                        src={profileData?.avatar}
                        alt={profileData?.name}
                    />
                </div>
                <button
                    style={{
                        position: 'relative',
                    }}
                    className={styles.button}
                >
                    <ShareIcon />
                    Share
                    <COPY_AND_SEND_MENU copyHandler={copyHandler}/>
                </button>
            </div>
            <div className={styles.pfContent}>
                <div className={styles.userInfo}>
                    <p className={styles.boldText}>{profileData?.username}</p>
                    <p className={styles.text}>{profileData?.name}</p>
                </div>
                <div className={styles.userStats}>
                    <div
                        onClick={() => onFollowModalActive('followers')}
                        className={styles.statContainer}
                    >
                        <p className={styles.boldText}>{localProfile?.followers}</p>
                        <p className={styles.text}>Followers</p>
                    </div>
                    <div onClick={() => setLikesModal(true)} className={styles.statContainer}>
                        <p className={styles.boldText}> 32</p>
                        <p className={styles.text}>Likes</p>
                    </div>
                    <div
                        onClick={() => onFollowModalActive('following')}
                        className={styles.statContainer}
                    >
                        <p className={styles.boldText}>{localProfile?.following}</p>
                        <p className={styles.text}>Following</p>
                    </div>
                </div>
                <div className={styles.links}>
                    {profileData?.website && (
                        <>
                            <div className={styles.linkContainer}>
                                <LinkIcon />
                                <p className={styles.link}>{profileData?.website}</p>
                            </div>
                            /
                        </>
                    )}
                    <div className={styles.linkContainer}>
                        <MailIcon />
                        <p className={styles.link}>{profileData?.email}</p>
                    </div>
                </div>
                <p className={styles.about}>{profileData?.bio}</p>
                <div className={styles.actions}>
                    <button onClick={() => setProfileModal(true)} className={styles.button}>
                        <EditButtonIcon />
                        Edit Profile
                    </button>
                    <button className={styles.button2}>
                        <ProfileViewIcon />
                        Profile Views
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
