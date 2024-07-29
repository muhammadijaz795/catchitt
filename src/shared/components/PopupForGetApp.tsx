import { ClickAwayListener, Modal } from '@mui/material'
import style from './getApp.module.scss'
import { useState } from 'react'
export default function PopupForGetApp({ openAppPopup, closeAppPopup, info }: any) {
    const [popupH, setPopupH] = useState<any>()

    return (
      
        <Modal open={openAppPopup}>
            <ClickAwayListener onClickAway={() => {
                    closeAppPopup()
                }}>
                <div onClick={(e) => e.stopPropagation()} className={style.parent}>
                    <p className={style.text}>{"Get the Seezitt app"}</p>
                    <hr/>
                    <div>
                     <center>
                        <img style={{width: "50%"}} src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/c287bca871661e22ee8a.png" />
                    </center>
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    )
}
