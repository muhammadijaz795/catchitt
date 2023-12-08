import React, { useState } from 'react'
import style from './blockUser.module.scss'
import { ClickAwayListener, Modal } from '@mui/material'

interface TYpes {
    onclose: any
}
function BlockMsgOnSuces({  onclose }: TYpes) {
    return (
        <div className={style.parent2}>
            <p>Blocked Successfully</p>
            <p>You blocked Sara Said.</p>
            <button onClick={onclose}>Done</button>
        </div>
    )
}

export default BlockMsgOnSuces
