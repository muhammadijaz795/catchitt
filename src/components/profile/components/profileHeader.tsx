import { FunctionComponent } from 'react';
import styles from './profileHeader.module.scss';
import ShareIcon from '../svg-components/ShareIcon';
import EditIcon from '../svg-components/EditIcon';
import LinkIcon from '../svg-components/LinkIcon';
import MailIcon from '../svg-components/MailIcon';
import EditProfileIcon from '../svg-components/EditProfileIcon';
import ProfileViewIcon from '../svg-components/ProfileViewIcon';
import EditButtonIcon from '../svg-components/EditButtonIcon';
import LikesModal from './LikesModal';

interface Props {
    setProfileModal: (value: boolean) => void;
    setLikesModal: (value: boolean) => void;
    onFollowModalActive: (value: string) => void;
}

const ProfileHeader: FunctionComponent<Props> = ({ setProfileModal, onFollowModalActive, setLikesModal }) => {
    return (
        <div className={styles.profileHeader}>
            <div className={styles.banner}>
                <div className={styles.banerIcon}>
                    <EditIcon />
                </div>
                <img
                    className={styles.bannerImg}
                    src="https://thumbs.dreamstime.com/b/pink-dahlia-flower-details-macro-photo-border-frame-wide-banner-background-message-wedding-background-pink-dahlia-flower-117406512.jpg"
                    alt="Banner Img"
                />
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.avatarBox}>
                    <img
                        className={styles.avatarImg}
                        src="https://i.pravatar.cc/300"
                        alt="Avatar"
                    />
                </div>
                <button className={styles.button}>
                    <ShareIcon />
                    Share
                </button>
            </div>
            <div className={styles.pfContent}>
                <div className={styles.userInfo}>
                    <p className={styles.boldText}>radwaaly79</p>
                    <p className={styles.text}>Radwa Aly</p>
                </div>
                <div className={styles.userStats}>
                    <div
                        onClick={() => onFollowModalActive('followers')}
                        className={styles.statContainer}
                    >
                        <p className={styles.boldText}>55</p>
                        <p className={styles.text}>Followers</p>
                    </div>
                    <div onClick={()=> setLikesModal(true)} className={styles.statContainer}>
                        <p className={styles.boldText}> 32</p>
                        <p className={styles.text}>Likes</p>
                    </div>
                    <div
                        onClick={() => onFollowModalActive('following')}
                        className={styles.statContainer}
                    >
                        <p className={styles.boldText}>44</p>
                        <p className={styles.text}>Following</p>
                    </div>
                </div>
                <div className={styles.links}>
                    <div className={styles.linkContainer}>
                        <LinkIcon />
                        <p className={styles.link}>www.my-website.com</p>
                    </div>
                    /
                    <div className={styles.linkContainer}>
                        <MailIcon />
                        <p className={styles.link}>radwaaly@gmail.com</p>
                    </div>
                </div>
                <p className={styles.about}>Passionate about art, life and nature.</p>
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
