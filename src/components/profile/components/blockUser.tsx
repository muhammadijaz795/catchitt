import React, { useState } from 'react'
import style from './blockUser.module.scss'
import { ClickAwayListener, Modal } from '@mui/material'
import BlockMsgOnError from './blockMsgOnError'
interface TYpes {
    onclose2: any,
}
function BlockUser({ onclose2 }: TYpes) {
    const [msg, setmsg] = useState(false)
    const ondone = () => {
        setmsg(false)
        onclose2()
    }
    return (
        <div className={style.parent}>
            <Modal open={msg} className={style.modal}>
                <ClickAwayListener onClickAway={() => setmsg(false)}>
                    <BlockMsgOnError onclose={ondone} />
                </ClickAwayListener>
            </Modal>
            <p className={style.title}>Block Sara Said ?</p>
            <p className={style.desc}>They will not be able to send you messages, see your posts, or find your profile. This doesn't include extended scenarios like multi-host livestreams, duets posted by others, or group chats you both participate in. They will not be notified that you blocked them.</p>
            <button onClick={() => setmsg(true)} className={style.block}>Block</button>
            <button onClick={onclose2} className={style.cancel}>Cancel</button>
        </div>
    )
}

export default BlockUser
