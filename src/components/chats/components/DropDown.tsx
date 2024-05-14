import { Switch } from 'antd';
import style from './DropDown.module.scss';
import { rightArrow as arrow } from '../../../icons';
import { search } from '../../../icons';
import { useState } from 'react';

function DropDown(props: any) {
    const { blockH, reportH, pinUserH, activeUser, staredModal, numberOfMessages,searchMsgBar } = props || {};
    const [muteN, setmuteN] = useState(false);
    return (
        <div onClick={(e) => e.stopPropagation()} className={style.dropdownMenu}>
            <div className={style.dropdownRow}>
                <p>Mute notifications</p>
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
                    <p> {numberOfMessages === 0 ? 'None' : numberOfMessages}</p>
                    <img className={style.arrowRight} src={arrow} alt="arrow right" />
                </div>
            </div>
            <div onClick={searchMsgBar} className={style.dropdownRow}>
                <p>Search Messages</p>
                <div className={style.starredMessagesRow}>
                    <img src={search} style={{ width: 20, height: 20 }} alt="" />
                </div>
            </div>
            <div onClick={blockH} className={style.dropdownRow}>
                <p className={style.warningMenuItem}>
                    {activeUser?.isBlocked ? 'UnBlock' : 'Block'}
                </p>
                <div style={{ visibility: 'hidden' }} className={style.starredMessagesRow}>
                    <p>A</p>
                    <img style={{ height: 20, width: 20 }} src={arrow} alt="arrow right" />
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
