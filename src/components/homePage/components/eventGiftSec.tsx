import { goldCoin, rightArrow } from '../../../icons';
import style from '../styles/event.module.scss';
function EventGiftSec({ gifts }: any) {
    return (
        <div className={style.giftsParent}>
            <div className={style.gifts}>
                {gifts?.length > 0 &&
                    gifts?.map((gift: any , i:number) => {
                        return (
                            <div key={i} className={style.giftBoxParent} >
                            <div className={style.gifBoxDiv1}>
                                <img style={{ width: 40, height: 40, display: 'block', margin: 'auto', padding: '0.25rem 0px' }} src={gift?.imageUrl} alt="" />
                                <div style={{ marginTop: '0.5rem' }}>
                                    <img className='goldCoin' src={goldCoin} alt="" />
                                    <p>{gift?.price}</p>
                                </div>
                            </div>
                            <div style={{ cursor: 1000000000 >= gift?.price ? 'pointer' : 'not-allowed' }} onClick={() => null}>
                                <p> Send</p>
                            </div>
                        </div>
                        );
                    })}
            </div>
            <hr />
            <div className={style.rechargeUi}>
                <p className="baseRegular">
                    Balance: 2 <img className="goldCoin" src={goldCoin} alt="" />
                </p>
                <p className="baseMedium pointer">
                    <img className="goldCoin" src={goldCoin} alt="" />
                    &#160; Recharge &#160;
                    <img  src={rightArrow} alt="" />
                </p>
            </div>
        </div>
    );
}

export default EventGiftSec;
