import { useState } from "react"
import style from "./comment.module.scss"
import ReplyComment from "./replyComment"
export default function Comment({ replyBtn, data , key1 }: any) {
    const [viewReplys, setviewReplys] = useState(false)
    const timeConverter = (time: any) => {
        const timestamp = time;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let createdTime = `${day}-${month}-${year}`
        return createdTime
    }

    return (
        <div key={key1} className={style.comment}>
            <div className={style.commemtHeader}>
                <div>
                    <img style={{ width: '38px', height: '38px', borderRadius: '50%' }} src={data?.user?.avatar} alt="" />
                    <p className={style.userName}>{data.user.name}</p>
                    <p style={{ fontSize: 12 }} className={style.cheaderText}>{timeConverter(data.createdTime)}</p>
                </div>
                <div>
                    <img src="../../../../public/images/icons/commentSec/Heart.svg" alt="" />
                    <p style={{ fontSize: 14 }} className={style.cheaderText}>{data.likes}</p>
                </div>
            </div>
            <div className={style.commentH}>
                <p className={style.comment}>{data.comment}</p>
                <span style={{ cursor: 'pointer' }} className={style.replyBtn} onClick={() => replyBtn(data.user.name)}>Reply</span>
                {
                    !viewReplys && data.replies.length > 0 ? <div onClick={() => setviewReplys(true)}>
                        <p className={style.replyBtn}>View replies ({data.replies.length})</p>
                        <img style={{ cursor: 'pointer' }} src="../../../../public/images/icons/commentSec/ArrowDown.svg" alt="" />
                    </div> : null
                }
            </div>
            {
                viewReplys ?
                    data.replies.map((reply: any , i:number) =>
                        <ReplyComment key2={i} reply={reply} />) : null
            }
            <hr />
        </div>
    )
}
