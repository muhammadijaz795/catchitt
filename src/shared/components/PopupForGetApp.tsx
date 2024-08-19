import { ClickAwayListener, Modal } from '@mui/material'
import style from './getApp.module.scss'
import { useState, useEffect } from 'react'
import {seezitt_qr,  google_play_Store, apple_play_store } from '../../icons'
export default function PopupForGetApp({ openAppPopup, closeAppPopup, info }: any) {
    const [popupH, setPopupH] = useState<any>()
    const [darkTheme, setdarkTheme] = useState('');
    const [lightDarkTheme, setlightDarkTheme] = useState('');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
            setlightDarkTheme(style.lightdarkTheme);
        }
    });

    return (
      
        <Modal open={openAppPopup}>
            <ClickAwayListener onClickAway={() => {
                    closeAppPopup()
                }}>
                <div onClick={(e) => e.stopPropagation()} className={`${style.parent}  ${lightDarkTheme}`}>
                    <p className={style.text}>{"Get the Seezitt app"}</p>
                    {/* <hr/> */}
                    {/* <div>
                     <center>
                        <img style={{width: "50%"}} src={seezitt_qr} />
                    </center>
                    </div> */}
                    <div className={style.DivMainContentContainer}>
                        <center>
                            <div className={style.DivMainQRContentContainer}>
                                <p className={style.SubTitle}>Scan QR code to download Seezitt</p>
                                <div className={style.DivOfQRContainer}>
                    
                                    <div className="DivOfQRCodeWrapper">
                                        <img style={{width: "50%"}} className="ImgOfQRCode" src={seezitt_qr} />
                                    </div>
                                </div>
                            </div>
                            <div className={style.DivOfDownloadLContainer}>
                                <p className={style.SubTitle}>Download from app stores</p>
                                <div className={style.DivOfDownloadContainer}>
                
                                    <a href="https://apps.apple.com/us/app/seezitt/id6444735823" target="_blank"> 
                                    <img src={apple_play_store} alt="apple-store" style={{width: "138px", height:"40px"}} /></a>
                                <a href="https://play.google.com/store/apps/details?id=com.posh.seezitt&hl=en_US" target="_blank" rel="nofollow noopener noreferrer" className="AIconContainer"> 
                                    <img src={google_play_Store} alt="google-store" style={{width: "138px", height:"40px"}} /></a>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    )
}
