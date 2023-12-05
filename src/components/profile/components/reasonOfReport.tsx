import React, { useState } from 'react'
import style from './reasonOfReport.module.scss'
import { ClickAwayListener, Modal } from '@mui/material'
import ThanksForReport from './thanksForReport'
import axios from 'axios'
interface Types {
    onclose: any,
    video: any,
}
function ReasonOfReport({ onclose, video }: Types) {
    const [greetings, setGreetings] = useState(false)
    const [reasons, setReasons] = useState<any>([])
    const API_KEY = process.env.VITE_API_URL;
    const doneH = () => {
        setGreetings(false)
        onclose()
    }
    const valuesManager = (e: any) => {
        if (e.target.checked) {
            setReasons([...reasons, e.target.value])
        } else {
            if (reasons.includes(e.target.value)) {
                const arr: any = reasons.filter((item: any) => {
                    if (item !== e.target.value) {
                        return item
                    }
                })
                setReasons(arr)
            }
        }
    }
    const submitH = () => {
        console.log(reasons
            );
        
        try {
            axios.post(`${API_KEY}/media-content/reports/${video.mediaId}`, JSON.stringify({reason: ["HATE_SPEECH"]})).then((res: any) => {
                // setGreetings(true)
                console.log('res', res);
            })

        } catch (error) {
            console.log('error', error);

        }
    }
    return (
        <div className={style.parentDiv}>
            <Modal open={greetings} className={style.greeting}>
                <ClickAwayListener onClickAway={() => { setGreetings(false) }}>
                    <div>
                        <ThanksForReport done={doneH} />
                    </div>
                </ClickAwayListener>
            </Modal>
            <p>Reason for report</p>
            <div className={style.checkboxParent}>
                <div ><input onClick={valuesManager} value='Misleading information' type="checkbox" /> <p>Misleading information</p></div>
                <hr />
                <div><input onClick={valuesManager} value='Frauds and scams' type="checkbox" /> <p>Frauds and scams</p></div>
                <hr />
                <div><input onClick={valuesManager} value='Hate speech' type="checkbox" /> <p>Hate speech</p></div>
                <hr />
                <div><input onClick={valuesManager} value='Harassment or Bullying' type="checkbox" /> <p>Harassment or Bullying</p></div>
                <hr />
                <div><input onClick={valuesManager} value='Violence' type="checkbox" /> <p>Violence</p></div>
                <hr />
                <div><input onClick={valuesManager} value='Animal Cruelty' type="checkbox" /> <p>Animal Cruelty</p></div>
            </div>
            <button onClick={submitH}>Submit report</button>
        </div>
    )
}

export default ReasonOfReport
