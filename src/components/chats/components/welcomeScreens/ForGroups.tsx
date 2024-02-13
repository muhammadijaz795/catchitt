import { groupMembers, groupWelcome } from '../../../../icons';
import style from './styles.module.scss';

function ForGroups() {
    return (
        <div className={style.msgsContainer}>
            <div className={style.groupS}>
                <img src={groupWelcome} alt="" />
                <p style={{ paddingTop: 12 }} className={style.notFrdtext}>
                    Bou created this group
                </p>
                <p style={{ paddingTop: 12 }} className={style.msgdesc}>
                    Bou added Hania, Mohammed, Sara
                </p>
                <div>
                    <img src={groupMembers} alt="" />
                </div>
            </div>
        </div>
    );
}

export default ForGroups;
