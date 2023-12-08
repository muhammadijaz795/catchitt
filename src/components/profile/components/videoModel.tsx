import { useRef, useState } from 'react'
import style from './videoModel.module.scss'
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png'
interface Props {
    onModalClose: any,
    info: any,
    report: any
    block: any
}
function VideoModel({ onModalClose, info, report, block }: Props) {
    //For Images Ref.
    const [like, setLike] = useState(false)
    const [fvrt, setFvrt] = useState(false)
    const [share, setShare] = useState(false)
    const [more, setMore] = useState(false)
    const timeConverter = (time: any) => {
        const timestamp = time;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let createdTime = `${day}-${month}-${year}`
        return createdTime
    }

    return (
        <div className={style.div}>
            <div className={style['video-sec']}>
                <video loop={true} controls={false} autoPlay={true} width='300px' src={info.reducedVideoUrl} />
            </div>
            <div className={style['cotent-sec']}>
                <img onClick={onModalClose} className={style['close-btn-img']} src="../../../../public/images/icons/Close Square.svg" alt="" />
                <div className={style['info-sec']}>
                    <img style={{ borderRadius: '50%' }} src={info.user.avatar || defaultProfileIcon} alt="" />
                    <div style={{ marginLeft: '16px' }}>
                        <p className={style['name']}>{info.user.name}</p>
                        <div className='d-flex' >
                            <p className={style['text2']}>{info.user.username}</p>
                            <img className='mx-2' src="../../../../public/images/icons/Text.svg" alt="" />
                            <p className={style['text2']}>{timeConverter(info.createdTime)}</p>
                        </div>
                    </div>
                    <div className={style['frdsBtn']}>
                        <button>Friends</button>
                    </div>
                </div>
                <p style={{ marginBottom: 24 }} className={style['text3']}>Animals Lover #animal #zoo #park</p>
                <div className='d-flex ' style={{ marginBottom: 24 }}>
                    <img className={style['music-icon']} src="../../../../public/images/icons/Group.svg" alt="" />
                    <p className={style['text3']}>Moonlight - Ali Gatie</p>
                </div>
                <div style={{ gap: 24 }} className='d-flex align-items-center'>
                    <div style={{ gap: 8 }} className='d-flex align-items-center'>
                        <div onClick={() => {
                            setLike(!like)
                            if (more) {
                                setMore(false)
                            }
                            if (share) {
                                setShare(false)
                            }
                        }} className={style['curve-div']}>
                            {
                                like ?
                                    <img src="../../../../public/images/icons/Heart.svg" alt="" /> :
                                    <img src="../../../../public/images/icons/Heart2.svg" alt="" />
                            }
                        </div>
                        <p className={style['text4']}>{info.likes}</p>
                    </div>
                    <div onClick={() => {
                        setFvrt(!fvrt)
                        if (more) {
                            setMore(false)
                        }
                        if (share) {
                            setShare(false)
                        }
                    }} style={{ gap: 8 }} className='d-flex align-items-center'>
                        <div className={style['curve-div']}>
                            {
                                fvrt ?
                                    <img src="../../../../public/images/icons/Bookmark2.svg" alt="" /> :
                                    <img src="../../../../public/images/icons/Bookmark.svg" alt="" />
                            }
                        </div>
                        <p className={style['text4']}>256</p>
                    </div>
                    <div style={{ gap: 8, position: 'relative' }} className='d-flex align-items-center'>
                        <div onClick={() => {
                            setShare(!share)
                            if (more) {
                                setMore(false)
                            }
                        }
                        } className={style['curve-div']}>
                            {
                                share ?
                                    <img src="../../../../public/images/icons/share (1).svg" alt="" /> :
                                    <img src="../../../../public/images/icons/share.svg" alt="" />
                            }
                        </div>
                        <p className={style['text4']}>{info.shares}</p>
                        {/* DropDown for share btn */}
                        {
                            share ?
                                <div className={style['dropdown2']}>
                                    <div >
                                        <img src="../../../../public/images/icons/Send.svg" alt="" />
                                        <p className={style['text5']}>Send</p>
                                    </div>
                                    <div>
                                        <img src="../../../../public/images/icons/Frame.svg" alt="" />
                                        <p className={style['text5']}>Copy link</p>
                                    </div>
                                </div> : null
                        }
                    </div>
                    <div style={{ gap: 8, position: 'relative' }} className='d-flex align-items-center  '>
                        <div className={style['curve-div']} onClick={() => {
                            setMore(!more)
                            if (share) {
                                setShare(!share)
                            }
                        }
                        }>
                            {
                                more ?
                                    <img src="../../../../public/images/icons/more-options 1.svg" alt="" /> :
                                    <img src="../../../../public/images/icons/morelight.svg" alt="" />
                            }
                        </div>
                        <p className={style['text4']}>More</p>
                        {/* DropDown for more btn */}
                        {
                            more ?
                                <div className={style['dropdown']}>
                                    <div onClick={() => report(info)} >
                                        <img src="../../../../public/images/icons/Group (3).svg" alt="" />
                                        <p className={style['text5']}>Report</p>
                                    </div>
                                    <div onClick={() => block(info)}>
                                        <img src="../../../../public/images/icons/Group (4).svg" alt="" />
                                        <p className={style['text5']}>Block</p>
                                    </div>
                                </div> : null
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default VideoModel
