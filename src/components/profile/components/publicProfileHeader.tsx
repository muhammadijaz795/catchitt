import { FunctionComponent, useEffect, useState } from 'react';
import styles from './profileHeader.module.scss';
import ShareIcon from '../svg-components/ShareIcon';
import LinkIcon from '../svg-components/LinkIcon';
import MailIcon from '../svg-components/MailIcon';
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
const API_KEY = process.env.VITE_API_URL;


interface Props {
    setProfileModal: (value: boolean) => void;
    setLikesModal: (value: boolean) => void;
    onFollowModalActive: (value: string) => void;
    profileData: any;
    public: boolean;
    openReport?: any,
    openBlock?: any,

    showStories?: any,
    storyVideos?: any,

}

const PublicProfileHeader: FunctionComponent<Props> = ({
    setProfileModal,
    onFollowModalActive,
    setLikesModal,
    profileData,
    openReport,
    openBlock,
    showStories,
    storyVideos
}) => {
    const auth = useAuthStore()
    const token = useAuthStore((state) => state.token);
    const params: any = useParams()

    const [stories, setStories] = useState([])
    const [dropdown, setDropdown] = useState(false);


    const [followedUsersData, setFollowedUsersData] = useState<any>([]);
    const [followedAccounts, setFollowedAccounts] = useState<any>({}); // Initialize as an empty object

    const fetchFollowers = async () => {

        fetch(`${API_KEY}/media-content/stories/active-stories/${params.id}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        }).then((res) => res.json()).then((data) => {
            setStories(data?.data)
        }).catch((err) => {
            console.log('collectons error', err);
        })

        try {
            const response = await fetch(`${API_KEY}/profile/${auth._id}/followers`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setFollowedUsersData(responseData.data.data);
            }
        } catch (error) {
            alert('Somthing went wrong')
            console.log(error)
        }
    }


    const manageFollowBtn = async () => {
        try {
            const response = await fetch(
                `${API_KEY}/profile/follow/${params?.id}/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // Update the followedAccounts state
                setFollowedAccounts((prevFollowedAccounts: any) => ({
                    ...prevFollowedAccounts,
                    [params?.id]: !prevFollowedAccounts[params?.id], // Mark the account as followed
                }));
                fetchFollowers()
            }
        } catch (error) {
            alert('Somthing went wrong')
            console.log(error)
        }
    };


    useEffect(() => {
        fetchFollowers()

        storyVideos(stories)
    }, [])

    return (
        <div className={styles.profileHeader}>
            <div className={styles.banner}>
                {profileData?.cover && <img className={styles.bannerImg} src={profileData?.cover} alt="Banner Img" />}
            </div>
            <div className={styles.bottomContainer}>
                <div onClick={() => {
                    if (stories?.length > 0) {
                        showStories()
                    }
                }
                } className={stories?.length > 0 ? styles.avatarBox2 : styles.avatarBox}>
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

                    {followedUsersData.length > 0 && followedUsersData.some((user: any) => user.followed_userID._id === params?.id) ? <button
                        style={{ width: 116 }}
                        className={styles.button2}
                        onClick={manageFollowBtn}
                    >Unfollow
                    </button> : <button
                        className={styles.button2}
                        style={{ background: '#5448b2', color: '#FFF', width: 116 }}
                        onClick={manageFollowBtn}
                    >Follow
                    </button>}
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
