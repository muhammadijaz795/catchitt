import style from './rechargePopup.module.scss'
import img1 from '../../../../public/images//icons/circle-question-solid 1.svg'
import img2 from '../../../../public/images//icons/Danger Circle.svg'
import coin from '../../../../public/images/icons/gifts/coin.svg'
export default function RechargePopup({ faqs , onCustomPopup }: any) {
    return (
        <div className={style.parent}>
            <div className={style.div1}>
                <p>Recharge</p>
                <img style={{ cursor: 'pointer' }} src={img1} alt="" />
            </div>
            <div className={style.div2}>
                <p>Balance: <img src={coin} alt="" /> 0</p>
            </div>
            <div className={style.div3}>
                <p>Pricing will change depending on payment method.</p>
                <img style={{ cursor: 'pointer' }} src={img2} alt="" />
            </div>
            <div className={style.div4}>
                <div className={style.card}>
                    <div>
                        <img src={coin} alt="" />
                        <p className={style.countCoinText}>65</p>
                    </div>
                    <p className={style.QARText}>QAR 3.69</p>
                </div>
                <div className={style.card}>
                    <div>
                        <img src={coin} alt="" />
                        <p className={style.countCoinText}>65</p>
                    </div>
                    <p className={style.QARText}>QAR 3.69</p>
                </div>
                <div className={style.card}>
                    <div>
                        <img src={coin} alt="" />
                        <p className={style.countCoinText}>65</p>
                    </div>
                    <p className={style.QARText}>QAR 3.69</p>
                </div>
                <div className={style.card}>
                    <div>
                        <img src={coin} alt="" />
                        <p className={style.countCoinText}>65</p>
                    </div>
                    <p className={style.QARText}>QAR 3.69</p>
                </div>
                <div className={style.card}>
                    <div>
                        <img src={coin} alt="" />
                        <p className={style.countCoinText}>65</p>
                    </div>
                    <p className={style.QARText}>QAR 3.69</p>
                </div>
                <div className={style.card}>
                    <div>
                        <img src={coin} alt="" />
                        <p className={style.countCoinText}>65</p>
                    </div>
                    <p className={style.QARText}>QAR 3.69</p>
                </div>
                <div className={style.card}>
                    <div>
                        <img src={coin} alt="" />
                        <p className={style.countCoinText}>65</p>
                    </div>
                    <p className={style.QARText}>QAR 3.69</p>
                </div>
                <div className={style.card}>
                    <div>
                        <img src={coin} alt="" />
                        <p className={style.countCoinText}>65</p>
                    </div>
                    <p className={style.QARText}>QAR 3.69</p>
                </div>
                <div onClick={onCustomPopup} style={{ gap: 4 }} className={style.card}>
                    <div>
                        <p className={style.countCoinText}>Custom</p>
                    </div>
                    <p style={{ fontSize: 12 }} className={style.QARText}>Larger ammount supprted</p>
                </div>
            </div>

            <div className={style.div5}>
                <div>
                    <img src={coin} alt="" />
                    <p>Gift Coins</p>
                </div>
                <div onClick={faqs}>
                    <p>
                        QAR 0
                    </p>
                    <img src="../../../../public/images/icons/rightArrforrecahreg.svg" alt="" />
                </div>
            </div>
            <button className={style.btn}>Recharge</button>
        </div>
    )
}
