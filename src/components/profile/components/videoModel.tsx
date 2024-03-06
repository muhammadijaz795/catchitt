import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png';
import Comment from './comment';
import style from './videoModel.module.scss';
import { useAuthStore } from '../../../store/authStore';
import { CircularProgress, useMediaQuery } from '@mui/material';

interface Props {
    onModalClose: any;
    info: any;
    report: any;
    block: any;
    gifts: any;
    sendPopupHandler?: any;
    commentsLength?: any;
}

function VideoModel({ onModalClose, info, report, block, gifts, sendPopupHandler, commentsLength }: Props) {
    const navigate = useNavigate();
    //For Images Ref.
    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(info?.likes);
    const [fvrt, setFvrt] = useState(false);
    const [nofvrt, setnoFvrt] = useState<number>(256);
    const [share, setShare] = useState(false);
    const token = useAuthStore((state) => state.token);
    const [more, setMore] = useState(false);
    const [followedAccounts, setFollowedAccounts] = useState<any>({});
    const [followedUsersData, setFollowedUsersData] = useState<any>([]);
    const [userComments, setUserComments] = useState<any[]>([]);
    const auth = useAuthStore();

    const [followBtnLoading, setfollowBtnLoading] = useState(false);

    const API_KEY = process.env.VITE_API_URL;

    const [replySomeOne, setReplySomeOne] = useState<any>({
        status: false,
        userName: '',
        id: '',
    });
    const [comment, setComment] = useState('');
    const timeConverter = (time: any) => {
        const timestamp = time;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let createdTime = `${day}-${month}-${year}`;
        return createdTime;
    };
    const isMobile = useMediaQuery('(max-width:700px)');

    const likeHandler = async () => {
        try {
            if (like) {
                setLikes(likes - 1);
            } else {
                setLikes(likes + 1);
            }
            const response = await fetch(`${API_KEY}/media-content/like/${info?.mediaId}/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        setUserComments(info?.comments);
    }, []);

    const commentHandler = async () => {
        if (replySomeOne?.status) {
            const payload = {
                comment: comment,
                commentId: replySomeOne.id,
            };
            try {
                let response = await fetch(`${API_KEY}/media-content/comment/${info?.mediaId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });
                const finalRes = await response.json();
                console.log(finalRes.data);
                const filteredCommnets: any = userComments.filter((userComment: any) => userComment.id !== finalRes.data.id)

                if (finalRes?.data) {
                    setUserComments([...filteredCommnets, finalRes?.data]);
                }
                setReplySomeOne({
                    status: false,
                    userName: '',
                    id: '',
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            const payload = {
                comment: comment,
            };
            try {
                let response = await fetch(`${API_KEY}/media-content/comment/${info?.mediaId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });
                const finalRes = await response.json();
                console.log(finalRes.data);
                if (finalRes?.data) {
                    setUserComments([...userComments, finalRes?.data]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setComment('')
    };

    useEffect(() => {
        commentsLength(userComments.length, info.mediaId)
    }, [userComments])

    console.log(info);

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

    return (
        <div className={style.div} onClick={() => {
            if (more) {
                setMore(false)
            }
            if (share) {
                setShare(false)

            }
        }}>
            <div className={style['video-sec']}>
                <video
                    loop={true}
                    controls={false}
                    autoPlay={true}
                    width="300px"
                    src={info.reducedVideoUrl}
                />
            </div>
            <div className={style['cotent-sec']} style={{ width: '100%' }}>
                <img
                    onClick={onModalClose}
                    className={style['close-btn-img']}
                    src="../../../../public/images/icons/Close Square.svg"
                    alt=""
                />
                <div className={style['info-sec']} style={{ width: '100%' }}>
                    <img
                        onClick={() => navigate(`/profile/${info.user._id}`)}
                        style={{ borderRadius: '50%', cursor: 'pointer' }}
                        src={info.user.avatar || defaultProfileIcon}
                        alt=""
                    />
                    <div style={{ marginLeft: '16px' }}>
                        <p className={style['name']} style={{ textOverflow: 'ellipsis', maxWidth: isMobile ? '100px' : '100%', whiteSpace: 'nowrap', overflow: 'hidden' }}>{info.user.name}</p>
                        <div className="d-flex" style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <p style={{ textOverflow: 'ellipsis', maxWidth: isMobile ? '100px' : '100%', whiteSpace: 'nowrap', overflow: 'hidden' }} className={style['text2']}>{info.user.username}</p>
                            {
                                !isMobile &&
                                <img
                                    className="mx-2"
                                    src="../../../../public/images/icons/Text.svg"
                                    alt=""
                                />
                            }
                            {
                                !isMobile &&
                                <p className={style['text2']}>{timeConverter(info.createdTime)}</p>
                            }

                        </div>
                    </div>
                    <div className={style['frdsBtn']} >
                        <button style={{ width: '60px !important' }} className={
                            followedUsersData?.some(
                                (user: any) =>
                                    user.followed_userID._id === info?.user?._id
                            )
                                ? style.abc
                                : style.btn
                        }
                            onClick={() => follow_Unfollow_handler(info?.user?._id)}>  {followBtnLoading ? (
                                <CircularProgress
                                    style={{ width: 20, height: 20 }}
                                />
                            ) : followedUsersData?.some(
                                (user: any) =>
                                    user.followed_userID._id === info?.user?._id
                            ) ? (
                                'Friends'
                            ) : (
                                'Follow'
                            )}</button>
                    </div>
                </div>
                <p style={{ marginBottom: 24 }} className={style['text3']}>
                    Animals Lover #animal #zoo #park
                </p>
                <div className="d-flex " style={{ marginBottom: 24 }}>
                    <img
                        className={style['music-icon']}
                        src="../../../../public/images/icons/Group.svg"
                        alt=""
                    />
                    <p className={style['text3']}>Moonlight - Ali Gatie</p>
                </div>
                <div style={{ gap: 24 }} className="d-flex align-items-center">
                    <div style={{ gap: 8 }} className="d-flex align-items-center">
                        <div
                            onClick={() => {
                                setLike(!like);
                                if (more) {
                                    setMore(false);
                                }
                                if (share) {
                                    setShare(false);
                                }
                                likeHandler();
                            }}
                            className={style['curve-div']}
                            style={{ userSelect: 'none' }}
                        >
                            {like ? (
                                <img src="../../../../public/images/icons/Heart.svg" alt="" />
                            ) : (
                                <img src="../../../../public/images/icons/Heart2.svg" alt="" />
                            )}
                        </div>
                        <p className={style['text4']}>{likes}</p>
                    </div>
                    <div
                        onClick={() => {
                            setFvrt(!fvrt);
                            if (fvrt) {
                                setnoFvrt(nofvrt - 1);
                            } else {
                                setnoFvrt(nofvrt + 1);
                            }
                            if (more) {
                                setMore(false);
                            }
                            if (share) {
                                setShare(false);
                            }
                        }}
                        style={{ gap: 8 }}
                        className="d-flex align-items-center"
                    >
                        <div className={style['curve-div']}>
                            {fvrt ? (
                                <img src="../../../../public/images/icons/Bookmark2.svg" alt="" />
                            ) : (
                                <img src="../../../../public/images/icons/Bookmark.svg" alt="" />
                            )}
                        </div>
                        <p className={style['text4']}>{nofvrt}</p>
                    </div>
                    <div
                        style={{ gap: 8, position: 'relative' }}
                        className="d-flex align-items-center"
                    >
                        <div
                            onClick={() => {
                                setShare(!share);
                                if (more) {
                                    setMore(false);
                                }
                            }}
                            className={style['curve-div']}
                        >
                            {share ? (
                                <img src="../../../../public/images/icons/share (1).svg" alt="" />
                            ) : (
                                <img src="../../../../public/images/icons/share.svg" alt="" />
                            )}
                        </div>
                        <p className={style['text4']}>{info.shares}</p>
                        {/* DropDown for share btn */}
                        {share ? (
                            <div className={style['dropdown2']}>
                                <div
                                    onClick={() => {
                                        sendPopupHandler && sendPopupHandler();
                                    }}
                                >
                                    <img src="../../../../public/images/icons/Send.svg" alt="" />
                                    <p className={style['text5']}>Send</p>
                                </div>
                                <div>
                                    <img src="../../../../public/images/icons/Frame.svg" alt="" />
                                    <p
                                        onClick={() => {
                                            navigator.clipboard
                                                .writeText(info.reducedVideoUrl)
                                                .then(() => {
                                                    toast.success('🎉 Copied successfully', {
                                                        position: 'bottom-right', // Set the position (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
                                                        autoClose: 2000, // Set the auto-close duration in milliseconds (e.g., 2000ms = 2 seconds)
                                                    });
                                                });
                                        }}
                                        className={style['text5']}
                                    >
                                        Copy link
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div
                        style={{ gap: 8, position: 'relative' }}
                        className="d-flex align-items-center  "
                    >
                        <div
                            className={style['curve-div']}
                            onClick={() => {
                                setMore(!more);
                                if (share) {
                                    setShare(!share);
                                }
                            }}
                        >
                            {more ? (
                                <img
                                    src="../../../../public/images/icons/more-options 1.svg"
                                    alt=""
                                />
                            ) : (
                                <img src="../../../../public/images/icons/morelight.svg" alt="" />
                            )}
                        </div>
                        <p className={style['text4']}>More</p>
                        {/* DropDown for more btn */}
                        {more ? (
                            <div className={style['dropdown']}>
                                <div onClick={report}>
                                    <img
                                        src="../../../../public/images/icons/Group (3).svg"
                                        alt=""
                                    />
                                    <p className={style['text5']}>Report</p>
                                </div>
                                <div onClick={block}>
                                    <img
                                        src="../../../../public/images/icons/Group (4).svg"
                                        alt=""
                                    />
                                    <p className={style['text5']}>Block</p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={style.gifts}>
                    <p className={style.receivedGifftsText}>Gifts received</p>
                    <div>

                        <img src="../../../../public/images/icons/commentSec/CoinChestPNG.svg" alt="" />
                        <img src="../../../../public/images/icons/commentSec/CrystalPNG.svg" alt="" />
                        <img src="../../../../public/images//icons/commentSec/Gift2.svg" alt="" />
                        <img src="../../../../public/images/icons/commentSec/Mjolnir.svg" alt="" />
                        <img
                            src="../../../../public/images/icons/commentSec/RamdanLantern.svg"
                            alt=""
                        />
                        <img src="../../../../public/images/icons/commentSec/Roses.svg" alt="" />
                        <img src="../../../../public/images/icons/commentSec/StarPNG.svg" alt="" />
                    </div>
                </div>
                <div className={style.comments}>
                    <p className={style.commentText1}>All comment ({userComments.length})</p>
                    {userComments?.map((comments: any, i: number) => (
                        <Comment
                            key1={i}
                            data={comments}
                            replyBtn={(userName: any, id: any) => {
                                if (replySomeOne.status) {
                                    setReplySomeOne({
                                        status: false,
                                        userName: '',
                                    });
                                } else {
                                    setReplySomeOne({
                                        status: true,
                                        userName: userName,
                                        id: id,
                                    });
                                }
                            }}
                        />
                    ))}
                </div>
                {replySomeOne?.status ? (
                    <div className={style.replySomeoOne}>
                        <p>replying to</p>
                        <div>
                            <p>{replySomeOne.userName}</p>
                            <img
                                onClick={() => setReplySomeOne(false)}
                                style={{ cursor: 'pointer' }}
                                src="../../../../public/images/icons/commentSec/x-circle.svg"
                                alt=""
                            />
                        </div>
                    </div>
                ) : null}
                <div className={`${style.addComment} ${!replySomeOne ? style.mkshadow : null}`}>
                    <img src="../../../../public/images/icons/commentSec/user.svg" alt="" />
                    <div>
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add comment..."
                            type="text"
                        />
                        <img
                            style={{ cursor: 'pointer' }}
                            onClick={gifts}
                            src="../../../../public/images/icons/commentSec/gif.svg"
                            alt=""
                        />
                        {comment ? (
                            <img
                                style={{ cursor: 'pointer' }}
                                src="../../../../public/images/icons/commentSec/coloredSend.svg"
                                alt=""
                                onClick={commentHandler}
                            />
                        ) : (
                            <img src="../../../../public/images/icons/commentSec/Send.svg" alt="" />
                        )}
                    </div>
                </div>
            </div>
            <div>
                <ToastContainer />
            </div>
            <div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default VideoModel;
