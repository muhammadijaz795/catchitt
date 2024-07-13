import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { videoLikehandle, videoSavehandle } from '../../../redux/AsyncFuncs';
import COPY_AND_SEND_MENU_HOME from '../../../shared/Menu/copyAndSendForHome';
import MORE_MENU_HOME from '../../../shared/Menu/more';
import style from './Action.module.scss';

function Action({ obj, visibleReportPopup, popupHandler, copyHandler, showVideoModal, post }: any) {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    const actionClickHandler = async () => {
        try {
            if (obj.actionType === 'like') {
                dispatch(videoLikehandle(post.mediaId));
            }
            if (obj?.actionType === 'comment') {
                showVideoModal(post);
            }
            if (obj?.actionType === 'fvrt') {
                dispatch(videoSavehandle(post.mediaId));
            }
            setIsActive(!isActive);
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
                    background: '#EAEAEA',
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
                        popupHandler={popupHandler}
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
                <p className={style.actionC}>{post.likes || 0}</p>
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
