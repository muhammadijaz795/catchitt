import Navbar from '../../../shared/navbar';
import useLiveEvent from '../hooks/useLiveEvent';
import style from '../styles/event.module.scss';
import EventGiftSec from './eventGiftSec';
import EventHeader from './eventHeader';
import EventVideoPlayer from './eventVideoPlayer';
function Event() {
    const { gifts } = useLiveEvent();
    console.log(gifts);

    return (
        <div className={style.parent}>
            <Navbar />
            <div className={style.eventContainer}>
                <div className={style.event}>
                    <EventHeader />
                    <EventVideoPlayer />
                    <EventGiftSec gifts={gifts} />
                </div>
                <div className={style.sideContainer}></div>
            </div>
        </div>
    );
}

export default Event;
