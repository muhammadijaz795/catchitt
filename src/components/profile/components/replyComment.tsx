import style from './comment.module.scss'
export default function ReplyComment({key2,  reply }: any) {
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
        <div key={key2} className={style.commentR}>
            <div className={style.commemtHeader}>
                <div>
                    <img style={{ width: '38px', height: '38px', borderRadius: '50%' }} src={reply?.user?.avatar} alt="" />
                    <p className={style.userName}>{reply.user.name}</p>
                    <p style={{ fontSize: 12 }} className={style.cheaderText}>{timeConverter(reply.createdTime)}</p>
                </div>
                <div>
                    <img src="../../../../public/images/icons/commentSec/Heart.svg" alt="" />
                    <p style={{ fontSize: 14 }} className={style.cheaderText}>{reply.likes}</p>
                </div>
            </div>
            <div className={style.commentH}>
                <p className={style.comment}>{reply.reply}</p>
            </div>
        </div>
    )
}
