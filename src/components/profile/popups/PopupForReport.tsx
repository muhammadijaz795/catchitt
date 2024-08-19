import { ClickAwayListener, Modal } from '@mui/material';
import style from './forReport.module.scss';
import ReasonOfReport from '../components/reasonOfReport';
import BlockMsgOnError from '../components/blockMsgOnError';
import { useState } from 'react';
import ThanksForReport from '../components/thanksForReport';

export default function PopupForReport({ openReport, onReportClose, info }: any) {
    const [inErrorCase, setInErrorCase] = useState(false);
    const [inSuceedCase, setInSuceedCase] = useState(false);
    const closeErrorMsg = (popupHandler: any) => {
        if (popupHandler) {
            setInErrorCase(true);
        } else {
            setInSuceedCase(true);
        }
    };

    return (
        <div className={style.parent}>
            <Modal open={openReport}>
                <ClickAwayListener
                    onClickAway={() => {
                        onReportClose();
                    }}
                >
                    <div className={style.reportPopup}>
                        <ReasonOfReport
                            popupHandler={closeErrorMsg}
                            video={info}
                            onclose={() => {
                                onReportClose();
                            }}
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
                        <BlockMsgOnError onclose={() => setInErrorCase(false)} />
                    </div>
                </ClickAwayListener>
            </Modal>
            <Modal open={inSuceedCase} className={style.inSucceedCase}>
                <ClickAwayListener
                    onClickAway={() => {
                        setInSuceedCase(false);
                    }}
                >
                    <div>
                        <ThanksForReport onclose={() => setInSuceedCase(false)} />
                    </div>
                </ClickAwayListener>
            </Modal>
        </div>
    );
}
