import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { videoLikehandle, videoSavehandle } from '../../../redux/AsyncFuncs';
import { openLoginPopup } from '../../../redux/reducers';
import COPY_AND_SEND_MENU_HOME from '../../../shared/Menu/copyAndSendForHome';
import MORE_MENU_HOME from '../../../shared/Menu/more';
import { isUserLoggedIn } from '../../../utils/common';
import { BASE_URL_FRONTEND } from '../../../utils/constants';
import style from './Action.module.scss';

function Action({
    obj,
    visibleReportPopup,
    popupHandler,
    copyHandler,
    showVideoModal,
    post,
    generateEmbedCodeHandler,
    totalPostComments,
    showCommentsModal,
    activeMediaId
}: any) {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    // console.log('POST : ', post);

    const actionClickHandler = async () => {
        try {
            if (isUserLoggedIn()) {
                if (obj.actionType === 'like') {
                    dispatch(videoLikehandle(post.mediaId));
                    // dispatch(likeHandler);
                }
                if (obj?.actionType === 'comment') {
                    showCommentsModal();
                    // showVideoModal(post);
                }
                if (obj?.actionType === 'fvrt') {
                    dispatch(videoSavehandle(post.mediaId));
                }
                setIsActive(!isActive);
            } else {
                if (obj?.actionType !== 'share') {
                    dispatch(openLoginPopup());
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        console.log('post', post, obj.actionType, obj.activeImage, obj.img);
        if (post.isLiked && obj.actionType === 'like') {
            setIsActive(true);
        } else if (post.isSaved && obj.actionType === 'fvrt') {
            console.log('fvrt post');
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [post, obj.actionType]);

    const shouldDisplayActiveImage = () => {
        switch (obj.actionType) {
            case 'like':
                return post.isLiked;
            case 'comment':
                return totalPostComments > 0 ? totalPostComments : post?.comments?.length || 0;
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
            className={`${obj.actionType === 'more' ? style.moreClass : ''} ${style.useractions}`}
        >
            <div
                className={`${obj.actionType === 'more' ? style.bgStyle : ''}`}
                style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgb(179 181 189 / 18%)', // '#EAEAEA',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    zIndex: 2,
                }}
                onClick={() => actionClickHandler()}
            >
                
                <img className={`${obj.actionType === 'share' ? 'position-absolute' : ''}`} src={shouldDisplayActiveImage() ? obj.activeImage : obj.img} alt="" /> 
                {obj.actionType === 'share' && (
                    <COPY_AND_SEND_MENU_HOME
                        copyHandler={() =>
                            copyHandler(
                                `${BASE_URL_FRONTEND}/${post?.user?.username}/video/${post?.mediaId}`
                            )
                        }
                        generateEmbedCodeHandler={() =>
                            generateEmbedCodeHandler(
                                post?.reducedVideoUrl,
                                post?.mediaId,
                                post?.user?.username,
                                post?.user?._id,
                                post?.user?.avatar,
                                post?.description,
                                post?.sound?.title,
                                post?.sound?.url,
                                post?.isLiked,
                                post?.likes,
                                post?.commentsCount,
                                post?.shares,
                            )
                        }
                        popupHandler={popupHandler}
                        videoUrl={post?.reducedVideoUrl}
                        userName={post?.user?.username}
                        videoTitle={post?.description} // Assuming you have a title property
                        mediaId={post?.mediaId}
                    />
                )}
                { isUserLoggedIn() && obj.actionType === 'more' && (
                    <MORE_MENU_HOME
                        visibleReportPopup={visibleReportPopup}
                        url={ post?.reducedVideoUrl
                            ? post?.reducedVideoUrl : post.originalUrl}
                        postMediaId={post?.mediaId }
                        activeMediaId={activeMediaId}
                    />
                )}
            </div>
            {obj?.actionType === 'like' ? (
                <p className={style.actionC}>{post.likes + likes || 0}</p>
            ) : obj?.actionType === 'comment' ? (
                <p className={style.actionC}>{totalPostComments > 0 ? totalPostComments : post?.comments?.length || 0}</p>
            ) : obj?.actionType === 'share' ? (
                <p className={style.actionC}>{post.shares || 0}</p>
            ) : obj?.actionType === 'fvrt' ? (
                <p className={style.actionC}>{post.isSaved ? 'Saved' : 'Save'}</p>
            ) : obj?.actionType === 'more' ? (
                ''
                // <p className={style.actionCD}></p>
            ) : null}
        </div>
    );
}

export default Action;
