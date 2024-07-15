import style from './rechargePopup.module.scss'
import img1 from '../../../../public/images//icons/circle-question-solid 1.svg'
import img2 from '../../../../public/images//icons/Danger Circle.svg'
import coin from '../../../../public/images/icons/gifts/coin.svg'
import { useAuthStore } from '../../../store/authStore'
import { useState } from 'react'
export default function RechargePopup({ faqs, onCustomPopup }: any) {
    const balance: number = useAuthStore((state: any) => state?.balance)
    const [selectedIndex, setSelectedIndex] = useState<any>()
    const [coinsAmount, setCoinsAmount] = useState<any>(0)
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token')
    const BuyCoins = async () => {
        try {
            const res: any = await fetch(`${API_KEY}/payment/web/coins/${coinsAmount}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            const resData: any = await res.json();
            window.open(resData?.data?.url)
        } catch (error) {
            console.log('error', error);
        }
    }

    const demiPlan: any[] = [
        {
            QAR: 1.69,
            coins: 65
        },
        {
            QAR: 2.69,
            coins: 100
        },
        {
            QAR: 3.69,
            coins: 300
        },
        {
            QAR: 4.69,
            coins: 400
        },
        {
            QAR: 5.69,
            coins: 500
        },
        {
            QAR: 6.69,
            coins: 600
        },
        {
            QAR: 7.69,
            coins: 700
        },
        {
            QAR: 8.69,
            coins: 800
        },
    ]
    return (
        <div className={style.parent}>
            <div className={style.div1}>
                <p>Recharge</p>
                <img style={{ cursor: 'pointer' }} src={img1} alt="" />
            </div>
            <div className={style.div2}>
                <p>Balance: <img src={coin} alt="" /> {balance}</p>
            </div>
            <div className={style.div3}>
                <p>Pricing will change depending on payment method.</p>
                <img style={{ cursor: 'pointer' }} src={img2} alt="" />
            </div>
            <div className={style.div4}>

                {
                    demiPlan.map((plan: any, index: number) => {
                        return (
                            <div style={{ border: selectedIndex === index ? '2px solid rgb(255, 59, 92)' : '1px solid #EAEAEA' }} onClick={() => {
                                setCoinsAmount(plan.coins)
                                setSelectedIndex(index)
                            }} key={index} className={style.card}>
                                <div>
                                    <img src={coin} alt="" />
                                    <p className={style.countCoinText}>{plan.coins}</p>
                                </div>
                                <p className={style.QARText}>QAR {plan.QAR}</p>
                            </div>
                        )
                    })
                }
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
                        QAR {balance}
                    </p>
                    <img src="../../../../public/images/icons/rightArrforrecahreg.svg" alt="" />
                </div>
            </div>
            <button className={style.btn} onClick={BuyCoins}>Recharge</button>
        </div>
    )
}
