import { useNavigate } from 'react-router';
import { defaultAvatar } from '../../../icons';
import FollowBtn from '../../buttons/Follow';
import style from './index.module.scss';
function FollowUserCard({ user }: any) {
    const navigate = useNavigate();
    return (
        <div className={style.parent}>
            <img
                onClick={() => navigate(`/profile/${user?.id}`)}
                style={{ cursor: 'pointer' }}
                src={defaultAvatar || user?.avatar}
                alt=""
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
