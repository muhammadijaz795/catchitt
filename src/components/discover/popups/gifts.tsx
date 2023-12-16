import { ClickAwayListener, Modal } from '@mui/material'
import style from './gifts.module.scss'
import { useState } from 'react'
import AllGiftsPopup from './allGiftsPopup'
import RechargePopup from './rechargePopup'
import FAQS from './FAQS'
import CustomPopup from './custom'
export default function Gifts({ openGifts, onGiftsClose }: any) {
  const [showImg, setShowImg] = useState<any>({ status: false, img: '' })
  const [rechargePopup, setRechargePopup] = useState(false)
  const [faqS, setFaqS] = useState(false)
  const [custom, setCustom] = useState(false)
  const ShowImage = (img: any) => {
    onGiftsClose()
    setShowImg({
      status: true,
      img: img
    })
  }
  return (
    <div className={style.parent}>
      <Modal open={openGifts} className={style.modal}>
        <ClickAwayListener onClickAway={onGiftsClose}>
          <div className={style.giftsPopup}>
            <AllGiftsPopup openRechargePopup={() => {
              onGiftsClose()
              setRechargePopup(true)
            }} sendImg={ShowImage} />
          </div>
        </ClickAwayListener>
      </Modal>
      <Modal open={showImg.status} className={style.modal}>
        <ClickAwayListener onClickAway={() => setShowImg({
          status: false,
          img: ''
        })}>
          <div onClick={() => setShowImg({
            status: false,
            img: ''
          })} className={style.imgPopup}>
            <img style={{ width: '265px', height: '265px' }} src={showImg?.img} alt="" />
          </div>
        </ClickAwayListener>
      </Modal>
      <Modal open={rechargePopup} className={style.modal}>
        <ClickAwayListener onClickAway={() => setRechargePopup(false)}>
          <div className={style.giftsPopup}>
            <RechargePopup onCustomPopup={()=>{
              setCustom(true)
              setRechargePopup(false)
            }} faqs={() => {
              setRechargePopup(false)
              setFaqS(true)
            }} />
          </div>
        </ClickAwayListener>
      </Modal>
      <Modal open={faqS} className={style.modal}>
        <ClickAwayListener onClickAway={() => setFaqS(false)}>
          <div className={style.giftsPopup}>
            <FAQS onclose={() => setFaqS(false)} />
          </div>
        </ClickAwayListener>
      </Modal>
      <Modal open={custom} className={style.modal}>
        <ClickAwayListener onClickAway={() => setFaqS(false)}>
          <div className={style.giftsPopup}>
            <CustomPopup onclose={() => setCustom(false)} />
          </div>
        </ClickAwayListener>
      </Modal>
    </div>
  )
}
