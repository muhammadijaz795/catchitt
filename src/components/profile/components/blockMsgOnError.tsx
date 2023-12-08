import React, { useState } from 'react'
import style from './blockUser.module.scss'
import { ClickAwayListener, Modal } from '@mui/material'

interface TYpes {
    onclose: any
}
function BlockMsgOnError({  onclose }: TYpes) {
    return (
        <div className={style.parent3}>
            <p>An error Occurred</p>
            <img src="../../../../public/images/icons/error.svg" alt="" />
            <p>Something went wrong.</p>
            <button onClick={onclose}>Done</button>
        </div>

    )
}

export default BlockMsgOnError
