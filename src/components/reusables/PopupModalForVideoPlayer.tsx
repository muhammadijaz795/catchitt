import { ClickAwayListener, Modal } from '@mui/material';
import { useState } from 'react';
import BlockUser from '../profile/components/blockUser';
import ReasonOfReport from '../profile/components/reasonOfReport';
import VideoModel from '../profile/components/videoModel';
import styles from './PopupModalForVideoPlayer.module.css';
interface Types { videoModal: any, onclose: any, info: any, openReport?: any, openBlock?: any, onReportClose?: any, onBlockClose?: any }
export default function PopupModalForVideoPlayer({ videoModal, onclose, info, openReport, openBlock, onReportClose, onBlockClose }: Types) {
    const [reportPopup, setReportPopup] = useState(false)
    const [blockPopup, setBlockPopup] = useState(false)
    return (
        <div className={styles.parent}>
            <Modal open={videoModal} >
                <ClickAwayListener onClickAway={onclose}>
                    <div className={styles.videoModalContainer}>
                        <VideoModel
                            block={() => {
                                setBlockPopup(true)
                            }}
                            report={() => {
                                setReportPopup(true)
                            }}
                            info={info}
                            onModalClose={onclose} />
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={reportPopup || openReport} >
                <ClickAwayListener onClickAway={() => {
                    onReportClose()
                    setReportPopup(false)
                }}>
                    <div className={styles.reportPopup}>
                        <ReasonOfReport video={info} onclose={() => {
                            onReportClose()
                            setReportPopup(false)
                        }} />
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={blockPopup || openBlock} >
                <ClickAwayListener onClickAway={() => {
                    onBlockClose()
                    setBlockPopup(false)
                }}>
                    <div className={styles.reportPopup}>
                        <BlockUser onclose2={() => {
                            onBlockClose()
                            setBlockPopup(false)
                        }} />
                    </div>
                </ClickAwayListener>
            </Modal>
        </div>
    )
}
