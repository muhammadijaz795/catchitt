import style from './gifts.module.scss'
import img1 from '../../../../public/images/icons/gifts/Burger.svg'
import img2 from '../../../../public/images/icons/gifts/Car.svg'
import img3 from '../../../../public/images/icons/gifts/Coffee.svg'
import img4 from '../../../../public/images/icons/gifts/CoinChestPNG.svg'
import img5 from '../../../../public/images/icons/gifts/CrystalPNG.svg'
import img6 from '../../../../public/images/icons/gifts/CupcakePNG.svg'
import img7 from '../../../../public/images/icons/gifts/Football.svg'
import img8 from '../../../../public/images/icons/gifts/Gift2.svg'
import img9 from '../../../../public/images/icons/gifts/Kingheart.svg'
import img13 from '../../../../public/images/icons/gifts/Mjolnir.svg'
import img14 from '../../../../public/images/icons/gifts/Pyramids.svg'
import img15 from '../../../../public/images/icons/gifts/RamdanLantern.svg'
import img16 from '../../../../public/images/icons/gifts/Roses.svg'
import img10 from '../../../../public/images/icons/gifts/SeezItt.svg'
import img11 from '../../../../public/images/icons/gifts/StarPNG.svg'
import img12 from '../../../../public/images/icons/gifts/TeddyBear.svg'
import coin from '../../../../public/images/icons/gifts/coin.svg'

const arr = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16
]
export default function AllGiftsPopup({ sendImg  , openRechargePopup}: any) {
    return (
        <div className={style.allGifts}>
            {
                arr.map((gifImg: any, i: number) => (
                    <div key={i} className={style.giftBoxParent}>
                        <div className={style.gifBoxDiv1}>
                            <img src={gifImg} alt="" />
                            <div>
                                <img src={coin} alt="" />
                                <p>5</p>
                            </div>
                        </div>
                        <div onClick={() => sendImg(gifImg)}>
                            <p>Send</p>
                        </div>
                    </div>
                ))
            }
            <div className={style.bottomSide}>
                <div>
                    <p className={style.balanceText}>Balance:  2</p>
                    <img src={coin} alt="" />
                </div>
                <div onClick={openRechargePopup}>
                    <img src={coin} alt="" />
                    <p  className={style.rechargeText}>Recharge</p>
                    <img src="../../../../public/images/icons/rightArrow.svg" alt="" />
                </div>
            </div>
        </div>
    )
}
