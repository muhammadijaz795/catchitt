import { ClickAwayListener, Modal } from '@mui/material';
import style from './BlockPopup.module.scss';
function BlockPopup({ onBlock, dangetBtnText, openBlock, onBlockClose, DangerText }: any) {
    return (
        <Modal open={openBlock}>
            <ClickAwayListener onClickAway={onBlockClose}>
                <div onClick={(e) => e.stopPropagation()} className={style.parent}>
                    <p className={style.text}>{DangerText || ''}</p>
                    <div>
                        <button onClick={onBlock} className={style.redBtn}>
                            {dangetBtnText || 'Block'}
                        </button>
                        <button onClick={onBlockClose} className={style.btn}>
                            Cancel
                        </button>
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    );
}

export default BlockPopup;
