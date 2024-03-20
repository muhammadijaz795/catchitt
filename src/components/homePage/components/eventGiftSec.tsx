import { goldCoin } from '../../../icons';
import style from '../styles/event.module.scss';
function EventGiftSec({ gifts }: any) {
    return (
        <div className={style.giftsParent}>
            <div className={style.gifts}>
                {gifts?.length > 0 &&
                    gifts?.map((gift: any) => {
                        return (
                            <div className={style.giftContainer}>
                                <div className={style.gif}>
                                    <img
                                        src="https://seezitt-videos-destination-bucket.s3.ap-southeast-1.amazonaws.com/gifts/668020e2-e1f6-419a-a39d-f45bd5b65468.png"
                                        alt=""
                                    />
                                    {/* <img src={gift?.imageUrl} alt="" /> */}
                                </div>
                                <div className={style.giftContent}>
                                    <img src={goldCoin} alt="" />
                                    <p className={style.prize}>{gift?.price}</p>
                                </div>
                                <div className={style.sendMsg}>send</div>
                            </div>
                        );
                    })}
            </div>
            <hr />
            <div className={style.rechargeUi}>
                <p>
                    Balance: 2 <img src={goldCoin} alt="" />
                </p>
                <p>
                    <img src={goldCoin} alt="" />
                    Recharge{' '}
                </p>
            </div>
        </div>
    );
}

export default EventGiftSec;
