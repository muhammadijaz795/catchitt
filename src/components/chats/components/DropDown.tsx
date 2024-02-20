import { Switch } from 'antd';
import style from './DropDown.module.scss';
import { rightArrow as arrow } from '../../../icons';
import { useState } from 'react';
function DropDown(props: any) {
    const { blockH, reportH, pinUserH, activeUser , staredModal} = props || {};
    const [muteN, setmuteN] = useState(false);
    const [pin, setpin] = useState(false);
    return (
        <div onClick={(e) => e.stopPropagation()} className={style.dropdownMenu}>
            <div className={style.dropdownRow}>
                <p>Mute notificaions</p>
                <Switch
                    onChange={() => setmuteN(!muteN)}
                    value={muteN}
                    size="small"
                    defaultChecked
                />
            </div>
            <div className={style.dropdownRow}>
                <p>Pin to top</p>
                <Switch
                    onChange={() => pinUserH(activeUser?.userId)}
                    value={activeUser.ispined}
                    size="small"
                    defaultChecked
                />
            </div>
            <div onClick={staredModal} className={style.dropdownRow}>
                <p>Starred Messages</p>
                <div className={style.starredMessagesRow}>
                    <p>None</p>
                    <img className={style.arrowRight} src={arrow} alt="arrow right" />
                </div>
            </div>
            <div onClick={blockH} className={style.dropdownRow}>
                <p className={style.warningMenuItem}>Block</p>
                <div style={{ visibility: 'hidden' }} className={style.starredMessagesRow}>
                    <p>A</p>
                    <img className={style.arrowRight} src={arrow} alt="arrow right" />
                </div>
            </div>
            <div className={style.dropdownRow} onClick={reportH}>
                <p className={style.warningMenuItem}>Report</p>
                <div style={{ visibility: 'hidden' }} className={style.starredMessagesRow}>
                    <p className={style.warningMenuItem}>None</p>
                    <img className={style.arrowRight} src={arrow} alt="arrow right" />
                </div>
            </div>
        </div>
    );
}

export default DropDown;
