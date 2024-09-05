import { mic, paperClip } from '../../../icons';
import InputEmoji from 'react-input-emoji'
import style from './DoMsg.module.scss';
import SendIcon from '@mui/icons-material/Send';
const DoMsg = ({ onSubmit, onChange, msg }: any) => {
    return (
        <div className={style.doMsgContainer}>
            <form onSubmit={onSubmit}  style={{ padding:'0px',background:'#fff',}}>
                    <InputEmoji 
                         onChange={onChange}
                         type="text"
                         placeholder="Write a message..."
                         value={msg}
                         style={
                            {
                                width:'-webkit-fill-available',
                                Padding:'0px',
                            }
                         }
                    />
                {/* <p style={{ color: msg.length > 0 ? 'rgb(255, 59, 92)' : '#a9a9a9' }} onClick={onSubmit}>
                    Send
                </p> */}
                <SendIcon className={style.sendIcon} onClick={onSubmit}  style={{ fontSize: '23px', }}/>
            </form>
            <div>
                <div className={style.actions}>
                    <img src={paperClip} alt="" />
                </div>
                <div className={style.actions}>
                    <img src={mic} alt="" />
                </div>
            </div>
        </div>
    );
};

export default DoMsg;