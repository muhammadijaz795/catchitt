import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Layout from '../../shared/layout';
import PopupForReport from '../profile/popups/PopupForReport';
import PopupForBlock from '../profile/popups/popupForBlock';
import PopupForVideoPlayer from '../profile/popups/popupForVideoPlayer';
import StoriesOnPublicProfile from '../profile/popups/storiesOnPublicProfile';
// import styles from '../discover/discover.module.scss';
import { DISCOVER_CATEGORIES } from '../../utils/constants';
import { useUpdateEffect } from 'react-use';
import { useNavigate, useParams } from 'react-router-dom';
import Gifts from '../discover/popups/gifts';
import VideoPanel from '../discover/components/videoPanel';
import { isValidDocId } from '../../utils/helpers';
import { ClickAwayListener, IconButton, Tooltip } from '@mui/material';
import { TopBar } from '../top-bar/top-bar';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { Bookmark } from '../sounds-page/svg-components/Bookmark';
import exampleSound from '../../assets/exampleSound.png';
import ShareClicked from '../sounds-page/svg-components/shareClicked.png';
import Share from '../sounds-page/svg-components/Default.png';
import styles from '../sounds-page/sound-page.module.scss';


export default function SoundPage() {
    const { soundId } = useParams();
    const navigate = useNavigate();
    const API_KEY = process.env.VITE_API_URL;
    const [soundPosts, setSoundPosts] = useState<any>({ items: [], page: 1, pageSize: 15, totalItems: null });
    const [videoModal, setVideoModal] = useState(false);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const token = localStorage.getItem('token');
    const [reportPopup, setReportPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [giftPopup, setGiftPopup] = useState(false);
    const [storyPopup, setStoryPopup] = useState([]);
    const [muteStates, setMuteStates] = useState<any>([]);
    const [soundData, setSoundData] = useState<any>();

    // theme
    const [darkTheme, setdarkTheme] = useState('');


    const handleFetchSound = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/sound?soundId=${soundId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setSoundData(responseData.data);
            } else {
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                // setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSoundPosts: any = async (signal: AbortSignal) => {
        try {
            const response = await fetch(
                `${API_KEY}/media-content/videos/sound/${soundId}?page=${soundPosts.page}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    signal,
                }
            );
            const data = await response.json();
            console.log('DATA >>>>>>> ', data);
            if (data?.data.length === 0) return setSoundPosts({ items: [], page: 1, pageSize: 15, totalItems: 0 });
            if (Array.isArray(data?.data)) {
                const exploredVideosObj = { ...soundPosts };
                exploredVideosObj.items = [...exploredVideosObj.items, ...data?.data];
                exploredVideosObj.totalItems = data?.data.length ? null : exploredVideosObj.items.length ? -1 : 0;
                setSoundPosts(exploredVideosObj);
                setMuteStates((prevMuteStates: any) => [
                    ...prevMuteStates,
                    ...Array(data?.data?.length).fill(true),
                ]);
            }
        } catch (error) {
            console.error('Error fetching trending videos:', error);
            setSoundPosts((prev: any) => ({ ...prev, totalItems: undefined }));

        }
    }


    const openVideoModal = (video: any) => {
        setVideoModalInfo(video);
        setVideoModal(true);
    };

    useEffect(() => {
        if (!isValidDocId(soundId)) return navigate('/');
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchVedios = async () => {
            setIsLoading(true);
            await fetchSoundPosts(signal);
            setIsLoading(false);
        };
        fetchVedios();
        handleFetchSound();
        return () => {
            controller.abort();
        }
    }, [soundId]);

    useUpdateEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetchSoundPosts(signal);
        return () => {
            controller.abort();
        }
    }, [soundPosts.page]);


    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });





    const [open, setOpen] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };


    return (
        <Layout>
            <div
                className={darkTheme}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-screen">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className='pl-6'>
                            <div className={styles.pageHeader}>
                                <div className={styles.suggestedContent2}>
                                    <img
                                        src={soundData?.owner?.avatar === '' ? exampleSound : ''}
                                        alt=""
                                        style={{
                                            minWidth: '130px',
                                            minHeight: '130px',
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 3fr',
                                            textAlign: 'end',
                                        }}
                                    >
                                        <div
                                            className={styles.soundInfo}
                                            style={{ display: 'flex', flexDirection: 'column' }}
                                        >
                                            <h6 className={styles.soundTitle}>{soundData?.title}</h6>
                                            <h6 className={styles.soundArtist}>
                                                {soundData?.owner?.name}
                                            </h6>
                                            <h6 className={styles.soundUsed}>
                                                {soundData?.usedCount} Videos
                                            </h6>
                                        </div>
                                        <div>
                                            <IconButton onClick={() => { }}>
                                                {/* {soundData.isBookmarked ? (
                                            <Bookmark bookmarked={true} />
                                        ) :
                                            <Bookmark bookmarked={false} />
                                        } */}
                                                <Bookmark bookmarked={soundData?.isBookmarked} />
                                            </IconButton>
                                            <ClickAwayListener onClickAway={handleTooltipClose}>
                                                <Tooltip
                                                    PopperProps={{
                                                        disablePortal: true,
                                                    }}
                                                    onClose={handleTooltipClose}
                                                    open={open}
                                                    disableFocusListener
                                                    disableHoverListener
                                                    disableTouchListener
                                                    title="Link copied!"
                                                >
                                                    <IconButton>
                                                        <img
                                                            src={
                                                                linkCopied === true
                                                                    ? ShareClicked
                                                                    : Share
                                                            }
                                                            alt=""
                                                            onClick={() => { }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </ClickAwayListener>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" pl-6 h-screen w-full overflow-y-auto no-scrollbar" id='scrollableDiv'>
                            <VideoPanel
                                fetchMore={() => setSoundPosts({ ...soundPosts, page: soundPosts.page + 1 })}
                                videos={soundPosts}
                                openVideoModal={openVideoModal}
                                muteStates={muteStates}
                                setMuteStates={setMuteStates}
                            />
                        </div>
                    </>
                )}

                <PopupForVideoPlayer
                    onBlockPopup={() => setBlockPopup(true)}
                    onReportPopup={() => setReportPopup(true)}
                    videoModal={videoModal}
                    onclose={() => setVideoModal(false)}
                    info={videoModalInfo}
                    gifts={() => setGiftPopup(true)}
                />
                <PopupForReport
                    openReport={reportPopup}
                    onReportClose={() => setReportPopup(false)}
                    info={videoModalInfo}
                />
                <PopupForBlock
                    openBlock={blockPopup}
                    onBlockClose={() => setBlockPopup(false)}
                    onReportClose={() => setReportPopup(false)}
                    info={videoModalInfo}
                    // @ts-ignore
                    userId={{ id: videoModalInfo?.user?._id, name: videoModalInfo?.user?.name }}
                />
                <Gifts openGifts={giftPopup} onGiftsClose={() => setGiftPopup(false)} />
                <StoriesOnPublicProfile
                    story={storyPopup}
                    onclose={() => setStoryPopup([])}
                    openReport={() => setReportPopup(true)}
                    isDarkTheme={!!darkTheme}
                />
            </div>
        </Layout>
    );
}
