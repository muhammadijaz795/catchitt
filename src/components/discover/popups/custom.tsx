import { useState } from 'react';
import style from './custom.module.scss';
import { useAuthStore } from '../../../store/authStore';
export default function CustomPopup({ onclose }: any) {
    const [value, setvalue] = useState<string>('');
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const valueHandler = (val?: string) => {
        if (val) {
            setvalue(value.concat(val));
        }
    };

    const BuyCoins = async () => {
        try {
            const res: any = await fetch(`${API_KEY}/payment/web/coins/${value}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            const resData: any = await res.json();
            setvalue('')
            window.open(resData?.data?.url)
        } catch (error) {
            console.log('error', error);
        }
    }
    return (
        <div className={style.parent}>
            <div>
                <p>Custom</p>
                <img onClick={onclose} src="../../../../public/images/icons/close.svg" alt="" />
            </div>
            <div>
                <div>
                    <img
                        style={{ width: 24, height: 24 }}
                        src="../../../../public/images/icons/gifts/coin.svg"
                        alt=""
                    />
                    <input style={{width:'100%'}} value={value}  onChange={(e: any) => setvalue(e?.target?.value)} type="number" />
                </div>
                <p className={style.text1}>30 - 2,500,000</p>
            </div>
            <div className={style.div3}>
                <div>
                    <button onClick={() => valueHandler('1')}>1</button>
                    <button onClick={() => valueHandler('4')}>4</button>
                    <button onClick={() => valueHandler('7')}>7</button>
                </div>
                <div>
                    <button onClick={() => valueHandler('2')}>2</button>
                    <button onClick={() => valueHandler('5')}>5</button>
                    <button onClick={() => valueHandler('8')}>8</button>
                </div>
                <div>
                    <button onClick={() => valueHandler('3')}>3</button>
                    <button onClick={() => valueHandler('6')}>6</button>
                    <button onClick={() => valueHandler('9')}>9</button>
                </div>
                <div>
                    <button onClick={()=>setvalue(value.slice(0 , value?.length-1))}>
                        <img src="../../../../public/images/icons/backspace.svg" alt="" />
                    </button>
                    <button onClick={() => valueHandler('0')} style={{ height: '100%' }}>
                        0
                    </button>
                </div>
            </div>
            <div className={style.div4}>
                <p style={{ color: '#222' }} className={style.text1}>
                    Total
                </p>
                <p className={style.text1}>QAR 0</p>
            </div>
            <div className={style.div5}>
                <button>
                    <img
                        src="../../../../public/images/icons/circle-question-regular 1.svg"
                        alt=""
                    />
                </button>
                <button onClick={BuyCoins} className={style.btn}>Recharge</button>
            </div>
        </div>
    );
}
