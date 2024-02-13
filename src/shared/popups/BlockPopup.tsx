import { ClickAwayListener, Modal } from '@mui/material';
import style from './BlockPopup.module.scss';
function BlockPopup({ openBlock, onBlockClose }: any) {
    return (
        <Modal open={openBlock}>
            <ClickAwayListener onClickAway={onBlockClose}>
                <div className={style.parent}>
                    <p className={style.text}>Are you sure you want to block Mohamed ?</p>
                    <div>
                        <button className={style.redBtn}>Block</button>
                        <button onClick={onBlockClose} className={style.btn}>Cancel</button>
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    );
}

export default BlockPopup;
