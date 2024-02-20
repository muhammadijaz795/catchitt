import { ClickAwayListener, Modal } from '@mui/material';
import style from './EditName.module.scss';
import { addimage } from '../../../../icons';
import { useState } from 'react';

function EditChatName(props: any) {
    const [value, setvalue] = useState('');
    const { onOpen, onClose, onSaveChanges } = props || {};
    return (
        <Modal
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            open={onOpen}
        >
            <ClickAwayListener onClickAway={onClose}>
                <div className={style.parent}>
                    <div className={style.addImage}>
                        <img src={addimage} alt="" />
                    </div>
                    <input
                        value={value}
                        onChange={(e) => setvalue(e.target.value)}
                        type="text"
                        placeholder="Group Name"
                    />
                    <div className={style.btns}>
                        <button
                            onClick={() => {
                                onSaveChanges(value);
                                setvalue('');
                            }}
                        >
                            Save changes
                        </button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    );
}

export default EditChatName;
