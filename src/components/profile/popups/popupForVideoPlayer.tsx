import { ClickAwayListener, Modal } from '@mui/material';
import style from './popupForVideoPlayer.module.scss';
import VideoModel from '../components/videoModel';

export default function PopupForVideoPlayer({
    videoModal,
    onclose,
    info,
    onReportPopup,
    onBlockPopup,
    gifts,
    sendPopupHandler,
    deleteVideoPopup
}: any) {
    return (
        <div className={style.parent}>
            <Modal open={videoModal}>
                <ClickAwayListener onClickAway={onclose}>
                    <div className={style.videoModalContainer}>
                        <VideoModel
                            block={onBlockPopup}
                            report={onReportPopup}
                            info={info}
                            gifts={gifts}
                            onModalClose={onclose}
                            sendPopupHandler={sendPopupHandler}
                            deleteVideo={deleteVideoPopup}
                        />
                    </div>
                </ClickAwayListener>
            </Modal>
        </div>
    );
}
