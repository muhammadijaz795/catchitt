import { notfriendsChatWelcome } from '../../../../icons';
import style from './styles.module.scss';

function ForPeoples() {
    return (
        <div className={style.welcomeScreenP} style={{ height: '100%' }}>
            <img style={{ width: 260, height: 260 }} src={notfriendsChatWelcome} alt="" />
            <p className={style.notFrdtext}>You are not friends with Hania yet</p>
            <p className={style.msgdesc}>Messages cannot be sent until this user follows you</p>
        </div>
    );
}

export default ForPeoples;
