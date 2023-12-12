import style from "./custom.module.scss"
export default function CustomPopup({ onclose }: any) {
    return (
        <div className={style.parent}>
            <div>
                <p>Custom</p>
                <img onClick={onclose} src="../../../../public/images/icons/close.svg" alt="" />
            </div>
            <div>
                <div>
                    <img style={{ width: 24, height: 24 }} src="../../../../public/images/icons/gifts/coin.svg" alt="" />
                    <input type="text" />
                </div>
                <p className={style.text1}>30 - 2,500,000</p>
            </div>
            <div className={style.div3}>
                <div>
                    <button>1</button>
                    <button>4</button>
                    <button>7</button>
                </div>
                <div>
                    <button>2</button>
                    <button>5</button>
                    <button>8</button>
                </div>
                <div>
                    <button>3</button>
                    <button>6</button>
                    <button>9</button>
                </div>
                <div>
                    <button><img src="../../../../public/images/icons/backspace.svg" alt="" /></button>
                    <button style={{height:'100%'}}>0</button>
                </div>
                
            </div>
            <div className={style.div4}>
                <p style={{ color: '#222' }} className={style.text1}>Total</p>
                <p className={style.text1}>QAR 0</p>
            </div>
            <div className={style.div5}>
                <button>
                    <img src="../../../../public/images/icons/circle-question-regular 1.svg" alt="" />
                </button>
                <button className={style.btn}>Recharge</button>
            </div>
        </div>
    )
}
