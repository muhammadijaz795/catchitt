import { ClickAwayListener, Modal } from '@mui/material'
import style from './popupForVideoPlayer.module.scss'
import VideoModel from '../components/videoModel'
export default function PopupForVideoPlayer({ videoModal, onclose, info, onReportPopup, onBlockPopup, gifts }: any) {
    return (
        <div className={style.parent}>
            <Modal open={videoModal} >
                <ClickAwayListener onClickAway={onclose}>
                    <div className={style.videoModalContainer}>
                        <VideoModel
                            block={onBlockPopup}
                            report={onReportPopup}
                            info={info}
                            onModalClose={onclose}
                            gifts={gifts}
                        />
                    </div>
                </ClickAwayListener>
            </Modal>
        </div>
    )
}
