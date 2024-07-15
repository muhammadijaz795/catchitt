import styles from './VideoPanel.module.scss';
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png';
import likes from '../svg-components/likes.svg';

export default function VideoPanel({ video, videomodal }: any) {
    return (
        <div className="col-span-1">
            <div className='relative'>
                <img
                    onClick={videomodal}
                    className="h-[18.675rem] rounded-lg w-full cursor-pointer"
                    src={video.thumbnailUrl}
                    alt=""
                />
                <p className={styles.views2}>4/9</p>
            </div>
            <p className="overflow-hidden text-[#222] text-sm font-normal text-left whitespace-nowrap text-ellipsis w-[11.875rem] mt-2">
                Video title
            </p>
            <p className='overflow-hidden text-[#2b5db9] font-semibold text-sm text-left whitespace-nowrap text-ellipsis w-[11.875rem]'>{video?.description}</p>
            <div className={styles.postBottomSide}>
                <div>
                    <img src={video.user.avatar || defaultProfileIcon} alt="" />
                    <p className={styles.userName}>{video.user.username}</p>
                </div>
                <div>
                    <img className="h-4 w-4 object-contain" src={likes} alt="" />
                    <p style={{ margin: '0%' }} className={styles.views}>
                        {video.likes}
                    </p>
                </div>
            </div>
        </div>
    );
}
