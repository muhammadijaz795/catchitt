import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
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
import { ToastContainer } from 'react-toastify';
// import { Toast } from 'react-toastify/dist/components';

function ForDesktop(props: any) {
    const { videoes, activeTab, setActiveTab, showVideoModal, videoModal, setSendPopup, loading } =
        props || {};
    const [reportPopup, setreportPopup] = useState(false);
    const [followBtnLoading, setfollowBtnLoading] = useState(false);
    const [toastOfUploading, settoastOfUploading] = useState(false);
    const [followimgbtnId, setFollowimgbtnId] = useState('');
    const [showCopyPopup, setshowCopyPopup] = useState(false);
    const [darkTheme, setdarkTheme] = useState('');
    // @ts-ignore
    const followers = useSelector((store) => store.reducers.followings);
    // @ts-ignore
    const isuploading = useSelector((store) => store?.reducers?.isuploading);
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

    useEffect(() => {
        if (isuploading?.isUploading) {
            settoastOfUploading(true);
        } else {
            settoastOfUploading(false);
        }
    }, [isuploading]);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if(themeColor == "dark"){ 
            setdarkTheme(style.darkTheme);
        } 
    });
    
    return (
        <Layout
            showCopyPopup={showCopyPopup}
            showReportPopup={reportPopup}
            closeReportPopup={() => setreportPopup(false)}
            paddingBottomProp={true}
        >
            <div className={`relative  ${style.parent} ${darkTheme}`}>
                {/* <div className={style.tabs}>
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
                </div> */}
                <div className={style.videoesParent}>
                    {videoes?.length > 0 && !loading && activeTab !== 3 ? (
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
                                                width: '100%',
                                                height: 'auto',
                                                margin: 'auto',
                                                overflowX: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                borderRadius: '16px',
                                            }}
                                            className={style.mainContainer}
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
                                        <div className={style.DivMediaCardBottom}>
                                                <p>{post?.description}</p>
                                                {post?.sound && (
                                                    <div>
                                                        <img src={music} alt="" />
                                                        <p>{post?.sound?.category?.name}</p>
                                                    </div>
                                                )}
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
                                                        popupHandler={() => setSendPopup(true)}
                                                        showVideoModal={showVideoModal}
                                                        post={post}
                                                    />
                                                );
                                            })}
                                            <div className={style.DivAvatarActionItemContainer }>
                                                <a className="e1g2yhv83 css-1w9wqra-StyledLink-AvatarLink er1vbsz0" href="/@sherjangkhan5">
                                                    <div className={style.AvatarDivContainer} style={{width: '48px', height: '48px'}}>
                                                        <span  className={style.SpanAvatarContainer} style={{width: '48px', height: '48px'}}>
                                                            <img loading="lazy" alt="sherjangkhan5" src={post?.user?.avatar || defaultAvatar} className="css-1zpj2q-ImgAvatar e1e9er4e1" /></span>
                                                    </div>
                                                </a>
                                                <button className={style.AvatarFollowButton} data-e2e="feed-follow">
                                                    <span className={style.ColorButtonContent}>
                                                        <svg fill="white" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
                                                            <path d="M26 7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v15H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h15v15a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V26h15a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H26V7Z"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : videoes?.length === 0 && !loading && activeTab === 1 ? (
                        <div className={style.suggestedUsersContainer}>
                            {suggestedUsers.map((suggestedUser: any, key: number) => {
                                return <FollowUserCard key={key} user={suggestedUser} darkTheme={darkTheme} />;
                            })}
                        </div>
                    ) : !loading && activeTab === 3 ? (
                        <>
                            <h4>No LIVE Stream are available!</h4>
                        </>
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
                {toastOfUploading && (
                    <div className="w-[393px] h-[62px] rounded-[8px] bg-custom-gray-100 absolute right-[2rem] bottom-[2rem] z-[2] flex justify-between items-center px-[1rem]">
                        <p className="text-custom-dark-222 font-medium">Uploading 1 of 1</p>
                        <p
                            className="text-custom-primary font-medium cursor-pointer"
                            onClick={() => settoastOfUploading(false)}
                        >
                            Cancel
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default ForDesktop;
