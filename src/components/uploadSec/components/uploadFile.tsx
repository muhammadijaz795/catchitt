import { Box, CircularProgress, Typography } from '@mui/material'
import style from './uploadFile.module.scss'
import { useState } from 'react'
import { Switch } from 'antd'

export default function UploadFile({ submitH, user, showPostModal, showlocationsModal, showUsersModal, showDiscardModal, replaceVideo }: any) {
    const [dropDownValue, setdropDownValue] = useState('')
    const [dropDown, setdropDown] = useState(false)
    const [emulator, setemulator] = useState(false)
    const [captionLength, setCaptionLength] = useState(0)


    let dropDownData = [
        '📷 People and Blogs',
        '✈ Travel and Events',
        '🎬 Film and Animation',
        '⚽ Sports',
        '🎵 Music',
        '💻 Science and Technology',
        '🎮 Gaming',
        '🚘 Autos and Vehicles',
        '😂 Comedy'
    ]

    const [demoData, setDemoData] = useState(dropDownData)

    const dropDownH = (e: any) => {
        const arr = dropDownData.filter((item) => {
            if (item.toLowerCase().includes(e.target.value.toLowerCase())) {
                return item
            }
        })
        setDemoData(arr)
    }

    const [data, setData] = useState({
        caption: '',
        category: '',
        tags: '',
        location: '',
        comments: 'off',
        duet: 'off',
        saveToPhone: 'off',
        private: 'off',
        downloadible: 'off'
    });

    const updateState = (inputName: any, inputValue: any) => {
        setData(prevState => ({ ...prevState, [inputName]: inputValue }));
    };
    return (
        <div className={style.parent}>
            <div className={style.div1}>
                <p className={style.text1}>Upload video</p>
                <p className={style.text2}>Post a video to your account</p>
                {
                    emulator === false ?
                        <div className={style.leftSec}>
                            <Box sx={{ position: 'relative', display: 'inline-flex', width: 65, height: 65 }}>
                                <CircularProgress style={{ width: 65, height: 65, color: 'rgba(84, 72, 178, 1)' }} variant="determinate" value={27} />
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        component="div"
                                        style={{ color: '#222', fontSize: 16 }}
                                    >{`27%`}</Typography>
                                </Box>
                            </Box>
                            <p className={style.loading}>Uploading...</p>
                            <button onClick={() => setemulator(true)} className={style.btnStyle}>
                                Cancel
                            </button>
                        </div> :
                        <div className={style.emulator}>
                            <div >
                                <img src="../../../../public/images/icons/uploadSEc/Home2 1.svg" alt="" />
                            </div>
                            <button onClick={replaceVideo}>Change video</button>
                        </div>
                }
            </div>
            <div className={style.div2}>
                <div style={{ marginTop: 139 }} className={style.captionParent}>
                    <div>
                        <p className={style.caption}>Caption</p>
                        <p style={{ marginTop: 0 }} className={style.text2}>{captionLength}/2200</p>
                    </div>
                    <div>
                        <input className={style.inputValue} onChange={(e: any) => {
                            updateState('caption', e.target.value)
                            setCaptionLength(e?.target?.value?.length)
                        }} type="text" />
                        <p className={style.text3}># @</p>
                    </div>
                </div>
                <div className={style.coverType}>
                    <p className={style.caption}>Cover</p>
                    <div>
                    </div>
                </div>
                <div style={{ marginTop: 32 }} className={style.captionParent}>
                    <div>
                        <p className={style.caption}>Category</p>
                    </div>
                    <div onClick={() => setdropDown(!dropDown)}>
                        <input className={style.inputValue} type="text" value={dropDownValue} placeholder='Choose category' />
                        {
                            dropDown ?
                                <img src="../../../../public/images/icons/uploadSEc/Arrow - Down 2.svg" alt="" />
                                :
                                <img src="../../../../public/images/icons/uploadSEc/Arrow - Right 2.svg" alt="" />
                        }
                    </div>
                    {
                        dropDown ?
                            <div className={style.catagaries}>
                                <input type="search" onChange={dropDownH} placeholder='Choose category' />
                                <div className={style.imgs} onClick={() => setdropDown(!dropDown)}>
                                    {
                                        demoData.map((item, i) => {
                                            return <p onClick={() => {
                                                setdropDownValue(item)
                                                updateState('category', item)
                                            }} key={i}>{item}</p>
                                        })
                                    }
                                </div>
                            </div> : null
                    }
                </div>
                <div style={{ marginTop: 32 }} onClick={showUsersModal} className={style.captionParent}>
                    <div>
                        <p className={style.caption}>Tag people</p>
                    </div>
                    <div onClick={(e: any) => updateState('tags', user)}>
                        <input onChange={(e: any) => updateState('tags', user)} className={style.inputValue} type="" placeholder='Tag people' />
                    </div>
                </div>
                <div style={{ marginTop: 32 }} className={style.captionParent}>
                    <div>
                        <p className={style.caption}>Add location</p>
                    </div>
                    <div onClick={showlocationsModal}>
                        <input onChange={(e: any) => updateState('location', e.target.value)} className={style.inputValue} onClick={showlocationsModal} type="text" placeholder='Search location' />
                        <img onClick={showlocationsModal} src="../../../../public/images/icons/uploadSEc/Arrow - Right 2.svg" alt="" />
                    </div>
                </div>
                <div className={style.checkBoxParent}>
                    <p className={style.caption}>Allow users to:</p>
                    <div>
                        <div>
                            <input type="checkbox" onChange={(e: any) => updateState('comments', e.target.value)} />
                            <p className={style.checkboxP}>Comments</p>
                        </div>
                        <div>
                            <input onChange={(e: any) => updateState('duet', e.target.value)} type="checkbox" />
                            <p className={style.checkboxP}>Duet</p>
                        </div>
                    </div>
                </div>
                <div className={style.switchesParent}>
                    <p className={style.caption}>Save video to device</p>
                    <Switch onChange={(e: any) => updateState('saveToPhone', e.target.value)} />
                </div>
                <div className={style.switchesParent}>
                    <p className={style.caption}>Private Video</p>
                    <Switch onChange={(e: any) => updateState('private', e.target.value)} />
                </div>
                <div className={style.switchesParent}>
                    <p className={style.caption}>Video downloads</p>
                    <Switch onChange={(e: any) => updateState('downloadible', e.target.value)} />
                </div>
                <p className={style.text2}>Allow other people to download your videos and share to other platforms. If this setting is off, a link to your video can still be shared.</p>
                <div className={style.BTNS}>
                    <button onClick={showDiscardModal}>Discard</button>
                    <button style={{ background: '#5448B2', color: '#FFF' }} onClick={() => {
                        submitH(data)
                    }}>Post</button>
                </div>
            </div>
        </div>
    )
}
