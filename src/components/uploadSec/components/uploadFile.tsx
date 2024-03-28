import { Box, CircularProgress, Typography } from '@mui/material';
import { Switch } from 'antd';
import { useMemo, useState } from 'react';
import style from './uploadFile.module.scss';
import CustomPlayer from '../../homePage/components/CustomPlayer';

export default function UploadFile({
    selectedUsers,
    submitH,
    user,
    selectedLocation,
    showPostModal,
    showlocationsModal,
    showUsersModal,
    showDiscardModal,
    replaceVideo,
    images,
    loading,
    file,
}: any) {
    const [dropDownValue, setdropDownValue] = useState('');
    const [dropDown, setdropDown] = useState(false);
    const [emulator, setemulator] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const [captionLength, setCaptionLength] = useState(0);

    let dropDownData = [
        '📷 People and Blogs',
        '✈ Travel and Events',
        '🎬 Film and Animation',
        '⚽ Sports',
        '🎵 Music',
        '💻 Science and Technology',
        '🎮 Gaming',
        '🚘 Autos and Vehicles',
        '😂 Comedy',
    ];

    const [demoData, setDemoData] = useState(dropDownData);

    const dropDownH = (e: any) => {
        const arr = dropDownData.filter((item) => {
            if (item.toLowerCase().includes(e.target.value.toLowerCase())) {
                return item;
            }
        });
        setDemoData(arr);
        console.log(images);
    };

    const [data, setData] = useState({
        caption: '',
        category: '',
        tags: '',
        location: '',
        comments: false,
        duet: false,
        saveToPhone: false,
        private: false,
        downloadible: false,
    });

    const updateState = (inputName: any, inputValue: any) => {
        setData((prevState) => ({ ...prevState, [inputName]: inputValue }));
    };
    const [selectedThumb, setSelectedThumb] = useState(0);

    useMemo(() => {
        let videoFile = file;
        setVideoURL(URL.createObjectURL(new Blob([videoFile], { type: 'video/mp4' })));
        setSelectedThumb(0)
    }, [file]);

    return (
        <div className={style.parent}>
            <div className={style.div1}>
                <p className={style.text1}>Upload video</p>
                <p className={style.text2}>Post a video to your account</p>
                {/* {emulator === false ? (
                    <div className={style.leftSec}>
                        <Box
                            sx={{
                                position: 'relative',
                                zIndex: 1,
                                display: 'inline-flex',
                                width: 65,
                                height: 65,
                            }}
                        >
                            <CircularProgress
                                style={{ width: 65, height: 65, color: 'rgba(84, 72, 178, 1)' }}
                                variant="determinate"
                                value={27}
                            />
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
                    </div>
                ) : ( */}
                <div className={style.emulator}>
                    <CustomPlayer src={videoURL} />
                    <button onClick={replaceVideo}>Change video</button>
                </div>
                {/* )} */}
            </div>
            <div className={`relative z-[2]  ${style.div2}`}>
                <div style={{ marginTop: 139 }} className={style.captionParent}>
                    <div>
                        <p className={style.caption}>Caption</p>
                        <p style={{ marginTop: 0 }} className={style.text2}>
                            {captionLength}/2200
                        </p>
                    </div>
                    <div>
                        <input
                            className={style.inputValue}
                            onChange={(e: any) => {
                                updateState('caption', e.target.value);
                                setCaptionLength(e?.target?.value?.length);
                            }}
                            type="text"
                        />
                        <p className={style.text3}># @</p>
                    </div>
                </div>
                <div className="rounded-[5px] mt-[16px]  relative flex flex-col">
                    <p className={style.caption}>Cover</p>
                    {!loading ? (
                        <div className="flex  overflow-x-scroll border px-[10px] justify-start  rounded-[5px] border-gray-500 mt-[16px] border-solid left-0 gap-[1px] h-[285px] pt-[10px] slider-container">
                            {images?.map((imageUrl: any, index: number) => (
                                <img
                                    onClick={() => {
                                        updateState('thumbnail', imageUrl);
                                        setSelectedThumb(imageUrl);
                                    }}
                                    className={`ease-in-out duration-200 block ${
                                        imageUrl === selectedThumb || index === selectedThumb
                                            ? 'h-[254px] opacity-100'
                                            : 'h-[224px] '
                                    } w-[124px] pointer opacity-50 my-[auto] rounded-[5px]`}
                                    src={imageUrl}
                                    alt=""
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex  overflow-x-scroll border px-[10px] justify-center  rounded-[5px] border-gray-500 mt-[16px] border-solid left-0 gap-[1px] h-[285px] pt-[10px] slider-container">
                            <CircularProgress style={{ display: 'block', margin: 'auto' }} />
                        </div>
                    )}
                </div>
                <div style={{ marginTop: 32 }} className={style.captionParent}>
                    <div>
                        <p className={style.caption}>Category</p>
                    </div>
                    <div onClick={() => setdropDown(!dropDown)}>
                        <input
                            className={style.inputValue}
                            type="text"
                            value={dropDownValue}
                            placeholder="Choose category"
                        />
                        {dropDown ? (
                            <img
                                src="../../../../public/images/icons/uploadSEc/Arrow - Down 2.svg"
                                alt=""
                            />
                        ) : (
                            <img
                                src="../../../../public/images/icons/uploadSEc/Arrow - Right 2.svg"
                                alt=""
                            />
                        )}
                    </div>
                    {dropDown ? (
                        <div className={style.catagaries}>
                            <input
                                type="search"
                                onChange={dropDownH}
                                placeholder="Choose category"
                            />
                            <div className={style.imgs} onClick={() => setdropDown(!dropDown)}>
                                {demoData.map((item, i) => {
                                    return (
                                        <p
                                            onClick={() => {
                                                setdropDownValue(item);
                                                updateState('category', item);
                                            }}
                                            key={i}
                                        >
                                            {item}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div
                    style={{ marginTop: 32 }}
                    onClick={showUsersModal}
                    className={style.captionParent}
                >
                    <div>
                        <p className={style.caption}>Tag people</p>
                    </div>

                    <div onClick={(e: any) => updateState('tags', user)}>
                        <input
                            value={selectedUsers?.name}
                            onChange={(e: any) => updateState('tags', user)}
                            className={style.inputValue}
                            type=""
                            placeholder="Tag people"
                        />
                    </div>
                </div>
                <div style={{ marginTop: 32 }} className={style.captionParent}>
                    <div>
                        <p className={style.caption}>Add location</p>
                    </div>
                    <div onClick={showlocationsModal}>
                        <input
                            value={selectedLocation}
                            onChange={(e: any) => updateState('location', e.target.value)}
                            className={style.inputValue}
                            onClick={showlocationsModal}
                            type="text"
                            placeholder="Search location"
                        />
                        <img
                            onClick={showlocationsModal}
                            src="../../../../public/images/icons/uploadSEc/Arrow - Right 2.svg"
                            alt=""
                        />
                    </div>
                </div>
                <div className={style.checkBoxParent}>
                    <p className={style.caption}>Allow users to:</p>
                    <div>
                        <div>
                            <input
                                type="checkbox"
                                onChange={(e: any) => updateState('comments', e.target.checked)}
                                checked={data?.comments}
                            />
                            <p className={style.checkboxP}>Comments</p>
                        </div>
                        <div>
                            <input
                                onChange={(e: any) => updateState('duet', e.target.checked)}
                                type="checkbox"
                                checked={data?.duet}
                            />
                            <p className={style.checkboxP}>Duet</p>
                        </div>
                    </div>
                </div>
                <div className={style.switchesParent}>
                    <p className={style.caption}>Save video to device</p>
                    <Switch
                        style={{ backgroundColor: data.saveToPhone ? 'blue' : '#DFDFDF' }}
                        onChange={(e: any) => updateState('saveToPhone', !data.saveToPhone)}
                    />
                </div>
                <div className={style.switchesParent}>
                    <p className={style.caption}>Private Video</p>
                    <Switch
                        style={{ backgroundColor: data.private ? 'blue' : '#DFDFDF' }}
                        onChange={(e: any) => updateState('private', !data.private)}
                    />
                </div>
                <div className={style.switchesParent}>
                    <p className={style.caption}>Video downloads</p>
                    <div>
                        <Switch
                            style={{
                                backgroundColor: data.downloadible ? 'blue' : '#DFDFDF',
                            }}
                            onChange={(e: any) => updateState('downloadible', !data.downloadible)}
                        />
                    </div>
                </div>
                <p className={style.text2}>
                    Allow other people to download your videos and share to other platforms. If this
                    setting is off, a link to your video can still be shared.
                </p>
                <div className={style.BTNS}>
                    <button onClick={showDiscardModal}>Discard</button>
                    <button
                        style={{ background: '#5448B2', color: '#FFF' }}
                        onClick={() => {
                            submitH(data);
                        }}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}
