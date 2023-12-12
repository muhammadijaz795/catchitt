import styles from './VideoPanel.module.scss'
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png'
export default function VideoPanel({ video, videomodal, index }: any) {
    return (
        <div key={index} className={styles.post} >
            <div>
                <img style={{ cursor: 'pointer' }} onClick={videomodal}
                    className={styles.img} src={video.thumbnailUrl} alt="" />
                <p className={styles.views2}>4/9</p>
            </div>
            <p className={styles.hashtags}>#pink #flowers love these vibes</p>
            <div className={styles.postBottomSide}>
                <div>
                    <img src={video.user.avatar || defaultProfileIcon} alt="" />
                    <p className={styles.userName}>{video.user.username}</p>
                </div>
                <div>
                    <img src="../../../public/images/icons/views6B.svg" alt="" />
                    <p style={{ margin: '0%' }} className={styles.views}>{video.views}</p>
                </div>
            </div>
        </div >
    )
}
