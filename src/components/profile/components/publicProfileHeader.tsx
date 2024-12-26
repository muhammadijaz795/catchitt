import { Avatar, CircularProgress } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { followingsMethod } from '../../../redux/AsyncFuncs';
import COPY_AND_SEND_MENU from '../../../shared/Menu/copyAndSend';
import LinkIcon from '../svg-components/LinkIcon';
import MailIcon from '../svg-components/MailIcon';
import ShareIcon from '../svg-components/ShareIcon';
import styles from './profileHeader.module.scss';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { get, post } from '../../../axios/axiosClient';
import defaultBanner from '../../../assets/default_banner.jpeg';
import { block, myReportWhite, report, trippleDotIcon, whiteblock } from '../../../icons';

interface Props {
    setIsEmbedModalOpen: (value: boolean) => void;
    setProfileModal: (value: boolean) => void;
    setLikesModal: (value: boolean) => void;
    onFollowModalActive: (value: string) => void;
    profileData: any;
    public: boolean;
    openReport?: any;
    openBlock?: any;
    showStories: any;
    storyVideos: any;
    copyHandler: any;
    darktheme: any;
}

const PublicProfileHeader: FunctionComponent<Props> = ({
    setIsEmbedModalOpen,
    onFollowModalActive,
    setLikesModal,
    profileData,
    openReport,
    openBlock,
    showStories,
    copyHandler,
    darktheme,
}) => {
    const params: any = useParams();
    const [dropdown, setDropdown] = useState(false);
    const [followBtnLoading, setfollowBtnLoading] = useState(false);
    const [messageBtn, setMessageBtn] = useState(false);
    const [conversationId, setconversationId] = useState("");
    const [stories, setStories] = useState([1, 2, 3]);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const userId = profileData?._id;
    //@ts-ignore
    const followings = useSelector((store) => store.reducers.followings);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(followingsMethod());
        // fetch(`${API_KEY}/media-content/stories`, {
        //     method: 'GET',
        //     headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setStories(data.data[0].stories);
        //     })
        //     .catch((err) => {
        //         console.log('collectons error', err);
        //     });
        handleProfileData(params?.id);
    }, []);

    const handleProfileData = async (userId: any) => {
        console.log("handleProfileData", userId)
        try {
            const response = await fetch(
                API_KEY + `/profile/public/${userId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            }
            );
            const responseData = await response.json();
            console.log('GET profile data', responseData);
            if ((responseData.data.isFollowed == true && responseData.data.isFollowingMe == true) ||
                (responseData.data.existingConversationId != null && responseData.data.existingConversationId != "")) {
                setMessageBtn(true);
                setconversationId(responseData.data.existingConversationId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleMessage = async () => {
        console.log("handleMessage", userId)
        try {
            if (conversationId == null || conversationId == "") {
                const LoggedInUserId = localStorage.getItem('userId');
                const result = await post(`/chat/messages`, {
                    type: 'application/json',
                    data: {
                        from: LoggedInUserId,
                        to: userId,
                        message: "Hi",
                    },
                });
                if (result?.data) {
                    console.log("Message sent");
                    navigate(`/chat`);
                }
            } else {
                navigate(`/chat`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const manageFollowBtn = async () => {
        setfollowBtnLoading(true);
        dispatch(followingsMethod(userId)).then(() => setfollowBtnLoading(false));
    };

    return (
        <div className={styles.profileHeader}>
            <div className={styles.banner}>
                <img className={styles.bannerImg} src={profileData && profileData?.cover!= ''? profileData?.cover: defaultBanner} alt="Banner Img" />
            </div>
            <div className={styles.bottomContainer}>
                <div
                    // onClick={() => {
                    //     if (stories?.length > 0) {
                    //         showStories();
                    //     }
                    // }}
                    // className={stories?.length > 0 ? styles.avatarBox2 : styles.avatarBox}
                    className={styles.avatarBox}
                >
                    <Avatar
                        className={styles.avatarImg}
                        src={profileData?.avatar}
                        alt={profileData?.name}
                    />
                </div>
                <button style={{ width: 98, position: 'relative' }} className={styles.button}>
                    <ShareIcon />
                    Share
                    <COPY_AND_SEND_MENU setIsEmbedModalOpen={setIsEmbedModalOpen} copyHandler={copyHandler} userName={profileData?.username} />
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
                        <p className={styles.boldText}>{profileData?.followingNumber}</p>
                        <p className={styles.text}>Followers</p>
                    </div>
                    <div onClick={() => setLikesModal(true)} className={styles.statContainer}>
                        <p className={styles.boldText}> {profileData?.likesNum}</p>
                        <p className={styles.text}>Likes</p>
                    </div>
                    <div
                        onClick={() => onFollowModalActive('following')}
                        className={styles.statContainer}
                    >
                        <p className={styles.boldText}>{profileData?.followersNumber}</p>
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
                    {messageBtn &&
                        <button style={{ width: 112 }} className={styles.button} onClick={handleMessage}>
                            Messages
                        </button>
                    }
                    {followings?.data?.length > 0 &&
                        followings?.data?.some(
                            (user: any) => user.follower_userID._id === params?.id
                        ) ? (
                        <button
                            style={{ width: 116 }}
                            className={styles.button2}
                            onClick={manageFollowBtn}
                        >
                            {!followBtnLoading ? (
                                'Unfollow'
                            ) : (
                                <CircularProgress style={{ width: 16, height: 16 }} />
                            )}
                        </button>
                    ) : (
                        <button
                            className={styles.button2}
                            style={{ background: 'rgb(255, 59, 92)', color: '#FFF', width: 116 }}
                            onClick={manageFollowBtn}
                        >
                            {!followBtnLoading ? (
                                'Follow'
                            ) : (
                                <CircularProgress style={{ width: 16, height: 16 }} />
                            )}
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setDropdown(!dropdown);
                        }}
                        style={{ width: 40 }}
                        className={styles['button3']}
                    >
                        <img
                            src={trippleDotIcon}
                            alt=""
                        />
                        {dropdown ? (
                            <div className={`${styles['dropdown']} ${darktheme? 'bg-dark':''}`}>
                                <div onClick={openReport}>
                                    <img src={darktheme? myReportWhite: report} alt="" />
                                    <p className={styles['text5']}>Report</p>
                                </div>
                                <div onClick={openBlock}>
                                    <img src={darktheme?whiteblock:block} alt="" />
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
