import { friendsChatWelcomeSvg } from '../../../../icons';
import style from './styles.module.scss';
function ForFriends({activeUser}:any) {
    return (
        <div className={style.welcomeScreenP2} onClick={()=>null}>
            <img src={friendsChatWelcomeSvg} alt="" />
            <div className={style.contentP}>
                <p className={style.welcomeText1}>Say hi to {activeUser.userName}</p>
                <p className={style.welcomeText2}>Tap to send Hi!</p>
            </div>
        </div>
    );
}

export default ForFriends;
