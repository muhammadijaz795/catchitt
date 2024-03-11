import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    shareInHome,
} from '../../icons';
import { followingsMethod } from '../../redux/AsyncFuncs';
import Layout from '../../shared/layout';
import Action from './components/Action';
import CustomPlayer from './components/CustomPlayer';
import style from './index.module.scss';
import FollowUserCard from '../../shared/cards/followCard';

function ForDesktop(props: any) {
    const {
        videoes,
        activeTab,
        setActiveTab,
        showVideoModal,
        videoModal,
        setSendPopup,
        comments,
        loading,
    } = props || {};
    const [reportPopup, setreportPopup] = useState(false);
    const [followBtnLoading, setfollowBtnLoading] = useState(false);
    const [followimgbtnId, setFollowimgbtnId] = useState('');
    const [showCopyPopup, setshowCopyPopup] = useState(false);
    // @ts-ignore
    const followers = useSelector((store) => store.reducers.followings);
    // @ts-ignore
    const suggestedUsers = useSelector((store) => store.reducers.suggestedAccounts);
    const dispatch = useDispatch();
    const userActions: any = [
        { img: moreInHome, actionType: 'more' },
        { img: shareInHome, actionType: 'share', activeImage: activeShare },
        { img: fvrt, actionType: 'fvrt', activeImage: activeFvrt },
        { img: commentInHome, actionType: 'comment' },
        { img: like, actionType: 'like', activeImage: activeLike },
    ];

    const navigate: any = useNavigate();

    const follow_Unfollow_handler = async (id: any) => {
        setFollowimgbtnId(id);
        setfollowBtnLoading(true);
        try {
            dispatch(followingsMethod(id)).then(() => setfollowBtnLoading(false));
        } catch (error) {
            alert('Somthing went wrong');
            console.log(error);
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
                    {videoes?.length > 0 && !loading ? (
                        videoes.map((post: any, number: number) => {
                            return (
                                <div key={number} className={style.videoParent}>
                                    <div className={style.videoHeader}>
                                        <div className={style.videoHeaderSec1}>
                                            <img
                                                style={{
                                                    borderRadius: '50%',
                                                    width: '44px',
                                                    height: '44px',
                                                    cursor: 'pointer',
                                                }}
                                                src={post?.user?.avatar || defaultAvatar}
                                                alt=""
                                                onClick={() =>
                                                    navigate(`/profile/${post?.user?._id}`)
                                                }
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
                                                followers?.data?.some(
                                                    (user: any) =>
                                                        user.followed_userID._id === post?.user?._id
                                                )
                                                    ? style.btn2
                                                    : style.btn
                                            }
                                            onClick={() => follow_Unfollow_handler(post?.user?._id)}
                                        >
                                            {followBtnLoading &&
                                            followimgbtnId === post?.user?._id ? (
                                                <CircularProgress
                                                    style={{ width: 20, height: 20 }}
                                                />
                                            ) : followers?.data?.some(
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
                                                        key={i}
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
                    ) : videoes?.length === 0 && !loading && activeTab === 1 ? (
                        <div className={style.suggestedUsersContainer}>
                            {suggestedUsers.map((suggestedUser: any, key: number) => {
                                return <FollowUserCard key={key} user={suggestedUser} />;
                            })}
                        </div>
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
