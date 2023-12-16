import { useState } from 'react'
import style from './FAQS.module.scss'

export default function FAQS({ onclose }: any) {
    const [Q1, setQ1] = useState(false)
    const [Q2, setQ2] = useState(false)
    const [Q3, setQ3] = useState(false)
    const [Q4, setQ4] = useState(false)
    return (
        <div className={style.parent}>
            <div>
                <p>Payment FAQS </p>
                <img onClick={onclose} src="../../../../public/images/icons/close.svg" alt="" />
            </div>
            <div className={style.Q}>
                <div onClick={() => setQ1(!Q1)} className={style.Qdiv}>
                    <div className={Q1 ? style.uiIsues : style.UIISSE2}>
                        <p className={Q1 ? style.whiteColor : style.ll}>Question here</p>
                        {
                            Q1 ?
                                <img src="../../../../public/images/icons/faqsarr2.svg" alt="" />
                                :
                                <img src="../../../../public/images/icons/faqsarr1.svg" alt="" />
                        }
                    </div>
                    {
                        Q1 ? <div>
                            <p style={{ fontWeight: 400 }}>Answer  here</p>
                        </div> : null
                    }
                </div>
                <div onClick={() => setQ2(!Q2)} className={style.Qdiv}>
                    <div className={Q2 ? style.uiIsues : style.UIISSE2}>
                        <p className={Q2 ? style.whiteColor : style.ll}>Question here</p>
                        {
                            Q2 ?
                                <img src="../../../../public/images/icons/faqsarr2.svg" alt="" />
                                :
                                <img src="../../../../public/images/icons/faqsarr1.svg" alt="" />
                        }
                    </div>
                    {
                        Q2 ? <div>
                            <p style={{ fontWeight: 400 }}>Answer  here</p>
                        </div> : null
                    }
                </div>
                <div onClick={() => setQ3(!Q3)} className={style.Qdiv}>
                    <div className={Q3 ? style.uiIsues : style.UIISSE2}>
                        <p className={Q3 ? style.whiteColor : style.ll}>Question here</p>
                        {
                            Q3 ?
                                <img src="../../../../public/images/icons/faqsarr2.svg" alt="" />
                                :
                                <img src="../../../../public/images/icons/faqsarr1.svg" alt="" />
                        }
                    </div>
                    {
                        Q3 ? <div>
                            <p style={{ fontWeight: 400 }}>Answer  here</p>
                        </div> : null
                    }
                </div>
                <div onClick={() => setQ4(!Q4)} className={style.Qdiv}>
                    <div className={Q4 ? style.uiIsues : style.UIISSE2}>
                        <p className={Q4 ? style.whiteColor : style.ll}>Question here</p>
                        {
                            Q4 ?
                                <img src="../../../../public/images/icons/faqsarr2.svg" alt="" />
                                :
                                <img src="../../../../public/images/icons/faqsarr1.svg" alt="" />
                        }
                    </div>
                    {
                        Q4 ? <div>
                            <p style={{ fontWeight: 400 }}>Answer  here</p>
                        </div> : null
                    }
                </div>
            </div>
            <button className={style.btn}>
                <img src="../../../../public/images/icons/Edit.svg" alt="" />
                Report a different issue
            </button>
        </div>
    )
}
