import { ClickAwayListener, Modal } from '@mui/material'
import style from './popupForBlock.module.scss'
import BlockMsgOnError from '../components/blockMsgOnError'
import BlockUser from '../components/blockUser'
import { useState } from 'react'
import BlockMsgOnSuces from '../components/blockMsgOnSuces'
export default function PopupForBlock({ openBlock, onBlockClose , userId }: any) {
  const [inErrorCase, setInErrorCase] = useState(false)
  const [inSuceedCase, setInSuceedCase] = useState(false)
  const managePopup = (value: any) => {
    if (value) {
      setInSuceedCase(true)
    }else{
      setInErrorCase(true)
    }
  }
  return (
    <div className={style.parent}>
      <Modal open={openBlock} className={style.modal}>
        <ClickAwayListener onClickAway={onBlockClose}>
          <div className={style.reportPopup}>
            <BlockUser userId={userId} onclose={onBlockClose} popupH={managePopup} />
          </div>
        </ClickAwayListener>
      </Modal>
      <Modal open={inErrorCase} className={style.inErrorCase}>
        <ClickAwayListener onClickAway={() => { setInErrorCase(false) }}>
          <div>
            <BlockMsgOnError onclose={() => setInErrorCase(false)} />
          </div>
        </ClickAwayListener>
      </Modal>
      <Modal open={inSuceedCase} className={style.inErrorCase}>
        <ClickAwayListener onClickAway={() => { setInSuceedCase(false) }}>
          <div>
            <BlockMsgOnSuces userName={userId?.name} onclose={() => setInSuceedCase(false)} />
          </div>
        </ClickAwayListener>
      </Modal>
    </div>
  )
}
