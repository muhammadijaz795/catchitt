import React, { useEffect, useState } from 'react';
import COPY_AND_SEND_MENU_HOME from '../../../shared/Menu/copyAndSendForHome';
import MORE_MENU_HOME from '../../../shared/Menu/more';
import style from './Action.module.scss';
import { useAuthStore } from '../../../store/authStore';

function Action({
    obj,
    visibleReportPopup,
    likes,
    comments,
    shares,
    mediaId,
    isLiked,
    popupHandler,
    copyHandler,
    showVideoModal,
    post
}: any) {
    const [videoesLikes, setvideoesLikes] = useState(likes);
    const [fvrt, setFvrt] = useState(0);
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);

    const likeHandler = async () => {
        try {
            if (obj.actionType === 'like') {
                const response = await fetch(`${API_KEY}/media-content/like/${mediaId}/`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            if (obj?.actionType === 'comment') {
                showVideoModal(post);
            }
            setIsActive(!isActive);
            if (isActive) {
                setvideoesLikes(videoesLikes - 1);
            } else {
                setvideoesLikes(videoesLikes + 1);
            }
        } catch (error) {
            console.log('error trendingvideos', error);
        }
        if (obj?.actionType === 'fvrt') {
            if (!isActive) {
                setFvrt(fvrt + 1);
            } else {
                setFvrt(fvrt - 1);
            }
        }
    };

    useEffect(() => {
        if (isLiked) {
            if (obj.actionType === 'like') {
                setIsActive(true);
            }
        }
    }, [isLiked]);
    const [isActive, setIsActive] = useState(false);
    return (
        <div className={style.useractions}>
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
                }}
                onClick={() => likeHandler()}
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
                        copyHandler={()=>copyHandler(post?.reducedVideoUrl)}
                        popupHandler={popupHandler}
                    />
                )}
                {obj.actionType === 'more' && (
                    <MORE_MENU_HOME visibleReportPopup={visibleReportPopup} />
                )}
            </div>
            {obj?.actionType === 'like' ? (
                <p className={style.actionC}>{videoesLikes || 0}</p>
            ) : obj?.actionType === 'comment' ? (
                <p className={style.actionC}>{comments || 0}</p>
            ) : obj?.actionType === 'share' ? (
                <p className={style.actionC}>{shares || 0}</p>
            ) : obj?.actionType === 'fvrt' ? (
                <p className={style.actionC}>{fvrt}</p>
            ) : obj?.actionType === 'more' ? (
                <p className={style.actionC}>More</p>
            ) : null}
        </div>
    );
}

export default Action;
