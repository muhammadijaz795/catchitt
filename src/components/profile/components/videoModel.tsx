import { useRef, useState } from 'react';
import style from './videoModel.module.scss';
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comment from './comment';
import { useNavigate } from 'react-router-dom';

interface Props {
    onModalClose: any;
    info: any;
    report: any;
    block: any;
    gifts: any;
}

function VideoModel({ onModalClose, info, report, block, gifts }: Props) {
    const navigate = useNavigate();
    //For Images Ref.
    const [like, setLike] = useState(false);
    const [fvrt, setFvrt] = useState(false);
    const [share, setShare] = useState(false);
    const [more, setMore] = useState(false);
    const [replySomeOne, setReplySomeOne] = useState<any>({
        status: false,
        userName: '',
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
    console.log('userInfo', info);

    return (
        <div className={style.div}>
            <div className={style['video-sec']}>
                <video
                    loop={true}
                    controls={false}
                    autoPlay={true}
                    width="300px"
                    src={info.reducedVideoUrl}
                />
            </div>
            <div className={style['cotent-sec']}>
                <img
                    onClick={onModalClose}
                    className={style['close-btn-img']}
                    src="../../../../public/images/icons/Close Square.svg"
                    alt=""
                />
                <div className={style['info-sec']}>
                    <img
                        onClick={() => navigate(`/profile/${info.user._id}`)}
                        style={{ borderRadius: '50%', cursor: 'pointer' }}
                        src={info.user.avatar || defaultProfileIcon}
                        alt=""
                    />
                    <div style={{ marginLeft: '16px' }}>
                        <p className={style['name']}>{info.user.name}</p>
                        <div className="d-flex">
                            <p className={style['text2']}>{info.user.username}</p>
                            <img
                                className="mx-2"
                                src="../../../../public/images/icons/Text.svg"
                                alt=""
                            />
                            <p className={style['text2']}>{timeConverter(info.createdTime)}</p>
                        </div>
                    </div>
                    <div className={style['frdsBtn']}>
                        <button>Friends</button>
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
                            }}
                            className={style['curve-div']}
                        >
                            {like ? (
                                <img src="../../../../public/images/icons/Heart.svg" alt="" />
                            ) : (
                                <img src="../../../../public/images/icons/Heart2.svg" alt="" />
                            )}
                        </div>
                        <p className={style['text4']}>{info.likes}</p>
                    </div>
                    <div
                        onClick={() => {
                            setFvrt(!fvrt);
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
                        <p className={style['text4']}>256</p>
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
                                <div>
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
                <div className={style.comments}>
                    <p className={style.commentText1}>All comment ({info.comments.length})</p>
                    {info.comments.map((comments: any, i: number) => (
                        <Comment
                            key1={i}
                            data={comments}
                            replyBtn={(userName: any) => {
                                if (replySomeOne.status) {
                                    setReplySomeOne({
                                        status: false,
                                        userName: '',
                                    });
                                } else {
                                    setReplySomeOne({
                                        status: true,
                                        userName: userName,
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
