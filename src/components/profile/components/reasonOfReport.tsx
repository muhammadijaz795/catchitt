import React, { ChangeEvent, useState } from 'react';
import style from './reasonOfReport.module.scss';
import { ClickAwayListener, Modal } from '@mui/material';
import axios from 'axios';
import BlockMsgOnError from './blockMsgOnError';
import { useAuthStore } from '../../../store/authStore';
interface Types {
    onclose: any;
    video: any;
    popupHandler: any;
}
function ReasonOfReport({ onclose, video, popupHandler }: Types) {
    const [greetings, setGreetings] = useState(false);
    const [selectedReason, setselectedReason] = useState('');
    const [reasons, setReasons] = useState<any>([]);
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);

    const valuesManager = (e: any) => {
        if (e.target.checked) {
            setReasons([...reasons, e.target.value]);
        } else {
            if (reasons.includes(e.target.value)) {
                const arr: any = reasons.filter((item: any) => {
                    if (item !== e.target.value) {
                        return item;
                    }
                });
                setReasons(arr);
            }
        }
    };
    const submitH = async () => {
        if (selectedReason) {
            var conversationId = localStorage.getItem('conversationId');
            try {
                const response: any = await fetch(`${API_KEY}/chat/report`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ reason: selectedReason, conversationId }),
                });
                if (response.status === 200) {
                    popupHandler(false);
                } else {
                    popupHandler(true);
                }
                if (response?.data) {
                    const responseData = await response.json();
                    console.log('Reported Successfully', responseData);
                }
            } catch (error) {
                console.error(error);
                popupHandler(true);
            }
        }
    };
    return (
        <div className={style.parentDiv}>
            <p>Reason for report</p>
            <div className={style.checkboxParent}>
                <div>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setselectedReason(e.target.value)
                        }
                        checked={selectedReason === 'MISLEADING_INFO' ? true : false}
                        value={'MISLEADING_INFO'}
                        name="reason"
                        onClick={valuesManager}
                        type="checkbox"
                        id="1"
                    />{' '}
                    <p onClick={() => setselectedReason('MISLEADING_INFO')}>
                        Misleading information
                    </p>
                </div>
                <hr />
                <div>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setselectedReason(e.target.value)
                        }
                        checked={selectedReason === 'FRAUDS_SCAM' ? true : false}
                        value={'FRAUDS_SCAM'}
                        name="reason"
                        onClick={valuesManager}
                        type="checkbox"
                    />{' '}
                    <p onClick={() => setselectedReason('FRAUDS_SCAM')}>Frauds and scams</p>
                </div>

                <hr />
                <div>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setselectedReason(e.target.value)
                        }
                        checked={selectedReason === 'HATE_SPEECH' ? true : false}
                        value={'HATE_SPEECH'}
                        name="reason"
                        onClick={valuesManager}
                        type="checkbox"
                    />{' '}
                    <p onClick={() => setselectedReason('HATE_SPEECH')}>Hate speech</p>
                </div>
                <hr />
                <div>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setselectedReason(e.target.value)
                        }
                        checked={selectedReason === 'HARASSMENT_BULLYING' ? true : false}
                        value={'HARASSMENT_BULLYING'}
                        name="reason"
                        onClick={valuesManager}
                        type="checkbox"
                    />{' '}
                    <p onClick={() => setselectedReason('HARASSMENT_BULLYING')}>
                        Harassment or Bullying
                    </p>
                </div>
                <hr />
                <div>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setselectedReason(e.target.value)
                        }
                        checked={selectedReason === 'VIOLENCE' ? true : false}
                        value={'VIOLENCE'}
                        name="reason"
                        onClick={valuesManager}
                        type="checkbox"
                    />{' '}
                    <p onClick={() => setselectedReason('VIOLENCE')}>Violence</p>
                </div>
                <hr />
                <div>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setselectedReason(e.target.value)
                        }
                        checked={selectedReason === 'ANIMAL_CRUELTY' ? true : false}
                        value={'ANIMAL_CRUELTY'}
                        name="reason"
                        onClick={valuesManager}
                        type="checkbox"
                    />{' '}
                    <p onClick={() => setselectedReason('ANIMAL_CRUELTY')}>Animal Cruelty</p>
                </div>
            </div>
            <button onClick={submitH}>Submit report</button>
        </div>
    );
}

export default ReasonOfReport;
