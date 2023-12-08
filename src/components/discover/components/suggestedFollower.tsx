import styles from './suggestedFollower.module.scss'
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png';
import { useNavigate } from 'react-router-dom';


export default function SuggestedFollower({ randonUser }: any) {
    const navigate = useNavigate()
    return (
        <div className={styles.follower} onClick={() => {
            navigate(`/public-profile/${randonUser._id}`)
        }}>
            <img src={randonUser.avatar || defaultProfileIcon} alt="" />
            <p>{randonUser.name}</p>
            <p>{randonUser.bio}</p>
            <p>123.5k <span> Followers </span></p>
            <button>Following</button>
        </div>
    )
}
