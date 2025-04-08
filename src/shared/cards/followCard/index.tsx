import { useNavigate } from 'react-router';
import { defaultAvatar } from '../../../icons';
import FollowBtn from '../../buttons/Follow';
import style from './index.module.scss';
function FollowUserCard({ user, darkTheme }: any) {
    const navigate = useNavigate();
    return (
        <div className={`${style.parent} ${darkTheme}`}>
            <img
                onClick={() => navigate(`/profile/${user?.id}`)}
                style={{ cursor: 'pointer' }}
                src={defaultAvatar || user?.avatar}
                alt=""
                onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                    (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                }}
            />
            <p className={style.name}>{user?.name}</p>
            {user?.bio && <p className={style.bio}>{user?.bio?.slice(0, 30)}</p>}
            <p className={style.followers}>
                {`${user?.followers}`} <span className={style.noOfFollowers}>{'Followers'}</span>
            </p>
            <FollowBtn />
        </div>
    );
}

export default FollowUserCard;
