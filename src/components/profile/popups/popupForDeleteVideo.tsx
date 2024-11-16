import { ClickAwayListener, Modal } from '@mui/material';
import { useState } from 'react';
import BlockMsgOnError from '../components/blockMsgOnError';
import DeleteVideo from '../components/deleteVideo';
import VideoDeleteSuccess from '../components/videoDeleteSuccess';
import style from './popupForBlock.module.scss';

export default function PopupForDeleteVideo({ openBlock, onBlockClose, userId, info, darkTheme }: any) {
    const [inErrorCase, setInErrorCase] = useState(false);
    const [inSuceedCase, setInSuceedCase] = useState(false);

    const managePopup = (value: any) => {
        if (value) {
            setInSuceedCase(true);
        } else {
            setInErrorCase(true);
        }
    };

    const onCloseHandler = () => {
        setInSuceedCase(false);
        window.location.reload();
    };

    return (
        <div className={style.parent}>
            <Modal open={openBlock} className={style.modal}>
                <ClickAwayListener onClickAway={onBlockClose}>
                    <div className={style.reportPopup}>
                        <DeleteVideo
                            info={info}
                            userId={userId}
                            onclose={onBlockClose}
                            popupH={managePopup}
                            darkTheme={darkTheme}
                        />
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={inErrorCase} className={style.inErrorCase}>
                <ClickAwayListener
                    onClickAway={() => {
                        setInErrorCase(false);
                    }}
                >
                    <div>
                        <BlockMsgOnError darkTheme={darkTheme} onclose={() => setInErrorCase(false)} />
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={inSuceedCase} className={style.inErrorCase}>
                <ClickAwayListener
                    onClickAway={() => {
                        setInSuceedCase(false);
                    }}
                >
                    <div>
                        <VideoDeleteSuccess
                            darkTheme={darkTheme}
                            onclose={onCloseHandler}
                        />
                    </div>
                </ClickAwayListener>
            </Modal>
        </div>
    );
}
