import { CircularProgress } from '@mui/material';
import { useRef, useState } from 'react';
import {
    activeFvrt,
    activeLike,
    activeShare,
    commentInHome,
    defaultAvatar,
    fvrt,
    like,
    moreInHome,
    music,
    shareInHome
} from '../../icons';
import Layout from '../../shared/layout';
import { useAuthStore } from '../../store/authStore';
import Action from './components/Action';
import CustomPlayer from './components/CustomPlayer';
import useOnScreen from './components/onscreen';
import style from './index.module.scss';
import { useNavigate } from 'react-router-dom';

function ForDesktop(props: any) {
    const { videoes, activeTab, setActiveTab, showVideoModal, videoModal, sendPopup, setSendPopup , comments} = props || {};
    const API_KEY = process.env.VITE_API_URL;
    const [selectedTab, setSelectedTab] = useState<number>(1);
    const [reportPopup, setreportPopup] = useState(false);
    const [followBtnLoading, setfollowBtnLoading] = useState(false);
    const [showCopyPopup, setshowCopyPopup] = useState(false);
    const token = useAuthStore((state) => state.token);
    const [followedAccounts, setFollowedAccounts] = useState<any>({});
    const [followedUsersData, setFollowedUsersData] = useState<any>([]);
    const [posts, setposts] = useState([]);
    const auth = useAuthStore();
    const userActions: any = [
        { img: moreInHome, actionType: 'more' },
        { img: shareInHome, actionType: 'share', activeImage: activeShare },
        { img: fvrt, actionType: 'fvrt', activeImage: activeFvrt },
        { img: commentInHome, actionType: 'comment' },
        { img: like, actionType: 'like', activeImage: activeLike },
    ];

    const ref = useRef<any>(null);
    const isVisible = useOnScreen(ref);
    const navigate: any = useNavigate()

    const fetchFollowers = async () => {
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
            alert('Somthing went wrong');
            console.log(error);
        }
    };

    const follow_Unfollow_handler = async (id: any) => {
        setfollowBtnLoading(true);
        try {
            const response = await fetch(`${API_KEY}/profile/follow/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Update the followedAccounts state
                setFollowedAccounts((prevFollowedAccounts: any) => ({
                    ...prevFollowedAccounts,
                    [id]: !prevFollowedAccounts[id], // Mark the account as followed
                }));
                fetchFollowers();
            }
        } catch (error) {
            alert('Somthing went wrong');
            console.log(error);
        } finally {
            setfollowBtnLoading(false);
        }
    };
    const copyHandler = (msg: string) => {
        navigator.clipboard.writeText(msg).then(() => {
            setshowCopyPopup(true);
            setTimeout(() => {
                setshowCopyPopup(false);
            }, 1500);
        });
    };
    return (
        <Layout
            showCopyPopup={showCopyPopup}
            showReportPopup={reportPopup}
            closeReportPopup={() => setreportPopup(false)}
            paddingBottomProp={true}
        >
            <div className={style.parent}>
                <div className={style.tabs}>
                    <div
                        onClick={() => setActiveTab(1)}
                        className={activeTab === 1 ? style.activeTab : style.tab}
                    >
                        <p>Following</p>
                    </div>
                    <div
                        onClick={() => setActiveTab(2)}
                        className={activeTab === 2 ? style.activeTab : style.tab}
                    >
                        <p>For You</p>
                    </div>
                    <div
                        onClick={() => setActiveTab(3)}
                        className={activeTab === 3 ? style.activeTab : style.tab}
                    >
                        <p>Live</p>
                    </div>
                </div>
                <div className={style.videoesParent}>
                    {videoes?.length > 0 ? (
                        videoes.map((post: any, number: number) => {
                            return (
                                <div className={style.videoParent}>
                                    <div className={style.videoHeader}>
                                        <div className={style.videoHeaderSec1}>
                                            <img
                                                style={{
                                                    borderRadius: '50%',
                                                    width: '44px',
                                                    height: '44px',
                                                    cursor:'pointer'
                                                }}
                                                src={post?.user?.avatar || defaultAvatar}
                                                alt=""
                                                onClick={() => navigate(`/profile/${post?.user?._id}`)}
                                            />
                                            <div>
                                                <p className={style.name}>{post?.user?.name}</p>
                                                <p className={style.userName}>
                                                    {post?.user?.username}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            className={
                                                followedUsersData?.some(
                                                    (user: any) =>
                                                        user.followed_userID._id === post?.user?._id
                                                )
                                                    ? style.btn2
                                                    : style.btn
                                            }
                                            onClick={() => follow_Unfollow_handler(post?.user?._id)}
                                        >
                                            {followBtnLoading ? (
                                                <CircularProgress
                                                    style={{ width: 20, height: 20 }}
                                                />
                                            ) : followedUsersData?.some(
                                                (user: any) =>
                                                    user.followed_userID._id === post?.user?._id
                                            ) ? (
                                                'Following'
                                            ) : (
                                                'Follow'
                                            )}
                                        </button>
                                    </div>
                                    <div className={style.contentSec}>
                                        <p>{post?.description}</p>
                                        {post?.sound && (
                                            <div>
                                                <img src={music} alt="" />
                                                <p>{post?.sound?.category?.name}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className={style.mediaContainer}>
                                        <div
                                            style={{
                                                width: 'auto',
                                                height: 'auto',
                                                // background: '#000',
                                                margin: 'auto',
                                            }}
                                        >
                                            <CustomPlayer
                                                videoModal={videoModal}
                                                src={
                                                    post?.reducedVideoUrl
                                                        ? post?.reducedVideoUrl
                                                        : post?.reducedVideoHlsUrl
                                                            ? post?.reducedVideoHlsUrl
                                                            : post?.originalUrl
                                                }
                                                controls={true}
                                            />
                                        </div>
                                        <div className={style.actions}>
                                            {userActions.map((obj: any, i: number) => {
                                                return (
                                                    <Action
                                                        copyHandler={copyHandler}
                                                        visibleReportPopup={() =>
                                                            setreportPopup(true)
                                                        }
                                                        obj={obj}
                                                        likes={post?.likes}
                                                        comments={post?.comments?.length}
                                                        shares={post?.shares}
                                                        mediaId={post?.mediaId}
                                                        isLiked={post?.isLiked}
                                                        popupHandler={() => setSendPopup(true)}
                                                        showVideoModal={showVideoModal}
                                                        post={post}
                                                        commentsglobal={comments}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <CircularProgress />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default ForDesktop;
