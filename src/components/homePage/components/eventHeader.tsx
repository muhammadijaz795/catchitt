import { avatar, backArrow, eyeIcon } from '../../../icons';
import Action from '../../../shared/actions';
import FollowUserBtn from '../../../shared/buttons/FollowUserBtn';
import style from '../styles/event.module.scss';
function EventHeader() {
    return (
        <div className={style.header}>
            <div className={style.LHS}>
                <img src={backArrow} alt="" />
                <div className={style.avatarContainer}>
                    <img className={style.avatar} src={avatar} alt="" />
                    <div>
                        <p className={style.name}>
                            radwaaly <span className={style.username}>Radwa Aly</span>
                        </p>
                        <p className={style.name}>
                            <img src={eyeIcon} alt="" /> <span>1001</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={style.RHS}>
                <div>
                    <Action share value="17.5K" />
                </div>
                <div>
                    <Action more rankingOption value="17.5K" />
                </div>
                <div>
                    <FollowUserBtn />
                </div>
            </div>
        </div>
    );
}

export default EventHeader;
