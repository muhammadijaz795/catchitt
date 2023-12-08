import { FunctionComponent, useState } from 'react';
import styles from './profileHeader.module.scss';
import ShareIcon from '../svg-components/ShareIcon';
import LinkIcon from '../svg-components/LinkIcon';
import MailIcon from '../svg-components/MailIcon';
import { Avatar } from '@mui/material';

interface Props {
    setProfileModal: (value: boolean) => void;
    setLikesModal: (value: boolean) => void;
    onFollowModalActive: (value: string) => void;
    profileData: any;
    public: boolean;
    openReport:any,
    openBlock:any
}

const PublicProfileHeader: FunctionComponent<Props> = ({
    setProfileModal,
    onFollowModalActive,
    setLikesModal,
    profileData,
    openReport,
    openBlock
}) => {
    const [dropdown, setDropdown] = useState(false);
    return (
        <div className={styles.profileHeader}>
            <div className={styles.banner}>
                {profileData?.cover && <img className={styles.bannerImg} src={profileData?.cover} alt="Banner Img" />}
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.avatarBox}>
                    <Avatar
                        className={styles.avatarImg}
                        src={profileData?.avatar}
                        alt={profileData?.name}
                    />
                </div>
                <button style={{ width: 98 }} className={styles.button}>
                    <ShareIcon />
                    Share
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
                        <p className={styles.boldText}>{profileData?.followersNumber}</p>
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
                        <p className={styles.boldText}>{profileData?.followingNumber}</p>
                        <p className={styles.text}>Following</p>
                    </div>
                </div>
                <div className={styles.links}>
                    {profileData?.website && (
                        <div className={styles.linkContainer}>
                            <LinkIcon />
                            <p className={styles.link}>{profileData?.website}</p>
                        </div>
                    )}
                    {profileData?.website && profileData?.email && <>/</>}
                    <div className={styles.linkContainer}>
                        <MailIcon />
                        <p className={styles.link}>{profileData?.email}</p>
                    </div>
                </div>
                <p className={styles.about}>{profileData?.bio}</p>
                <div className={styles.actions}>
                    <button style={{ width: 112 }} className={styles.button}>
                        Messages
                    </button>
                    <button style={{ width: 116 }} className={styles.button2}>
                        Unfollow
                    </button>
                    <button
                        onClick={() => {
                            setDropdown(!dropdown);
                        }}
                        style={{ width: 40 }}
                        className={styles['button3']}
                    >
                        <img
                            src="../../../../public/images/icons/more-btn-publicprofile.svg"
                            alt=""
                        />
                        {dropdown ? (
                            <div className={styles['dropdown']}>
                                <div onClick={openReport}>
                                    <img src="../../../../public/images/icons/report.svg" alt="" />
                                    <p className={styles['text5']}>Report</p>
                                </div>
                                <div onClick={openBlock}>
                                    <img src="../../../../public/images/icons/block.svg" alt="" />
                                    <p className={styles['text5']}>Block</p>
                                </div>
                            </div>
                        ) : null}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublicProfileHeader;
