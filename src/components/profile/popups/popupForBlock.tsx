import { ClickAwayListener, Modal } from '@mui/material'
import style from './popupForBlock.module.scss'
import BlockMsgOnError from '../components/blockMsgOnError'
import BlockUser from '../components/blockUser'
import { useState } from 'react'
import BlockMsgOnSuces from '../components/blockMsgOnSuces'
export default function PopupForBlock({ openBlock, onBlockClose }: any) {
  const [inErrorCase, setInErrorCase] = useState(false)
  const [inSuceedCase, setInSuceedCase] = useState(false)
  const managePopup = (value: any) => {
    if (value) {
      setInErrorCase(true)
    }
  }
  return (
    <div className={style.parent}>
      <Modal open={openBlock} className={style.modal}>
        <ClickAwayListener onClickAway={onBlockClose}>
          <div className={style.reportPopup}>
            <BlockUser onclose={onBlockClose} popupH={managePopup} />
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
            <BlockMsgOnSuces onclose={() => setInSuceedCase(false)} />
          </div>
        </ClickAwayListener>
      </Modal>
    </div>
  )
}
