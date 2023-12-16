import React, { useState } from 'react'
import style from './blockUser.module.scss'

function BlockUser({ onclose, popupH }: any) {
    const blockUser = async () => {
        popupH(true)
    }
    return (
        <div className={style.parent}>
            <p className={style.title}>Block Sara Said ?</p>
            <p className={style.desc}>They will not be able to send you messages, see your posts, or find your profile. This doesn't include extended scenarios like multi-host livestreams, duets posted by others, or group chats you both participate in. They will not be notified that you blocked them.</p>
            <button onClick={blockUser} className={style.block}>Block</button>
            <button onClick={onclose} className={style.cancel}>Cancel</button>
        </div>
    )
}

export default BlockUser
