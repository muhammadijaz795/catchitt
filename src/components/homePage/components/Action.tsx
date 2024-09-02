import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { videoLikehandle, videoSavehandle } from '../../../redux/AsyncFuncs';
import COPY_AND_SEND_MENU_HOME from '../../../shared/Menu/copyAndSendForHome';
import MORE_MENU_HOME from '../../../shared/Menu/more';
import style from './Action.module.scss';
import { isUserLoggedIn } from '../../../utils/common';
import { openLoginPopup } from '../../../redux/reducers';

function Action({
    obj,
    visibleReportPopup,
    popupHandler,
    copyHandler,
    showVideoModal,
    post,
    generateEmbedCodeHandler,
}: any) {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    console.log('POST: ', post);
    const actionClickHandler = async () => {
        try {
            if (isUserLoggedIn() == true) {
                if (obj.actionType === 'like') {
                    // console.log("post",post)
                    dispatch(videoLikehandle(post.mediaId));
                    // dispatch(likeHandler);
                }
                if (obj?.actionType === 'comment') {
                    showVideoModal(post);
                }
                if (obj?.actionType === 'fvrt') {
                    dispatch(videoSavehandle(post.mediaId));
                }
                setIsActive(!isActive);
            } else {
                dispatch(openLoginPopup());
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        if (post.isLiked && obj.actionType === 'like') {
            setIsActive(true);
        } else if (post.isSaved && obj.actionType === 'fvrt') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [post, obj.actionType]);

    const shouldDisplayActiveImage = () => {
        switch (obj.actionType) {
            case 'like':
                return post.likes > 0;
            case 'comment':
                return post.comments?.length > 0;
            case 'share':
                return post.shares > 0;
            case 'fvrt':
                return post.isSaved;
            default:
                return false;
        }
    };

    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(0);
    const likeHandler = async () => {
        try {
            if (like) {
                setLikes(1);
                setLike(false);
            } else {
                setLikes(0);
                setLike(true);
            }
            dispatch(videoLikehandle(post.mediaId));
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                zIndex: 2,
            }}
            className={style.useractions}
        >
            <div
                style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgb(179 181 189 / 18%)', // '#EAEAEA',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 2,
                }}
                onClick={() => actionClickHandler()}
            >
                <img src={shouldDisplayActiveImage() ? obj.activeImage : obj.img} alt="" />
                {obj.actionType === 'share' && (
                    <COPY_AND_SEND_MENU_HOME
                        copyHandler={() => copyHandler(post?.reducedVideoUrl)}
                        generateEmbedCodeHandler={() =>
                            generateEmbedCodeHandler(
                                post?.reducedVideoUrl,
                                post?.mediaId,
                                post?.user?.username,
                                post?.description
                            )
                        }
                        popupHandler={popupHandler}
                        videoUrl={post?.reducedVideoUrl}
                        videoTitle={post?.description} // Assuming you have a title property
                    />
                )}
                {obj.actionType === 'more' && (
                    <MORE_MENU_HOME
                        url={post.originalUrl}
                        visibleReportPopup={visibleReportPopup}
                    />
                )}
            </div>
            {obj?.actionType === 'like' ? (
                <p className={style.actionC}>{post.likes + likes || 0}</p>
            ) : obj?.actionType === 'comment' ? (
                <p className={style.actionC}>{post?.comments?.length || 0}</p>
            ) : obj?.actionType === 'share' ? (
                <p className={style.actionC}>{post.shares || 0}</p>
            ) : obj?.actionType === 'fvrt' ? (
                <p className={style.actionC}>{post.mediaId ? 'Saved' : 'Save'}</p>
            ) : obj?.actionType === 'more' ? (
                <p className={style.actionC}>More</p>
            ) : null}
        </div>
    );
}

export default Action;
