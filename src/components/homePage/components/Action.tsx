import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { videoLikehandle } from '../../../redux/AsyncFuncs';
import COPY_AND_SEND_MENU_HOME from '../../../shared/Menu/copyAndSendForHome';
import MORE_MENU_HOME from '../../../shared/Menu/more';
import style from './Action.module.scss';

function Action({
    obj,
    visibleReportPopup,
    popupHandler,
    copyHandler,
    showVideoModal,
    post,
}: any) {
    const [fvrt, setFvrt] = useState(0);
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);

    const actionClickHandler = async () => {
        try {
            // If user Click on Like Button
            if (obj.actionType === 'like') {
                dispatch(videoLikehandle(post.mediaId));
            }
            // If user Click on Comment Button
            if (obj?.actionType === 'comment') {
                showVideoModal(post);
            }
            setIsActive(!isActive);
        } catch (error) {
            console.log('error', error);
        }
        // If user Click on Fvrt Button
        if (obj?.actionType === 'fvrt') {
            if (!isActive) {
                setFvrt(fvrt + 1);
            } else {
                setFvrt(fvrt - 1);
            }
        }
    };

    
    useEffect(() => {
        if (post.isLiked) {
            if (obj.actionType === 'like') {
                setIsActive(true);
            }
        } else {
            if (obj.actionType === 'like') {
                setIsActive(false);
            }
        }
    }, [post]);

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
                    width: 40,
                    height: 40,
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
                {!obj.activeImage ? (
                    <img src={obj.img} alt="" />
                ) : isActive ? (
                    <img src={obj.activeImage} alt="" />
                ) : (
                    <img src={obj.img} alt="" />
                )}
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
                <p className={style.actionC}>{fvrt}</p>
            ) : obj?.actionType === 'more' ? (
                <p className={style.actionC}>More</p>
            ) : null}
        </div>
    );
}

export default Action;
