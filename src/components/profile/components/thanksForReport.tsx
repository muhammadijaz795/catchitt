import React from 'react'
import style from './reasonOfReport.module.scss'
interface Props {
    done: any,
}
function ThanksForReport({ done }: Props) {
    return (
        <div className={style.thanksDiv}>
            <p className={style.report}>Report submitted</p>
            <div className={style.tickParent}>
                <img src="../../../../public/images/icons/tick.svg" alt="" />
            </div>
            <p className={style.thankyou}>Thank you</p>
            <p className={style.desc}>Your report helps us provide a safe and supportive environment. </p>
            <button className={style.done} onClick={done}>Done</button>
            <button className={style.view}>View your reports</button>
        </div>
    )
}

export default ThanksForReport
