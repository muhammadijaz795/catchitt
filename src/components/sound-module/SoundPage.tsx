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
import { BASE_URL_FRONTEND, DISCOVER_CATEGORIES, showToast, showToastError } from '../../utils/constants';
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
import COPY_AND_SEND_MENU_MULTIPLE from '../../shared/Menu/copyAndSendForMultiple';

import MORE_MENU_HOME from '../../shared/Menu/more/ReportMenu';


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
    const [linkCopied, setLinkCopied] = useState(false);
    const [isOpenShare, setIsOpenShare] = useState(false);

    // theme
    const [darkTheme, setdarkTheme] = useState('');

    const allowedShareOptions = ['copyLink', 'whatsappShare', 'linkedInShare', 'twitterShare', 'facebookShare'];

    const handleFetchSound = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/sound?soundId=${soundId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('sound data..',responseData.data)
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
        if (!token) return navigate('/');
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


    const handleCopyToClipboard = () => {
        // Get the current URL
        const currentURL = window.location.href;
        navigator.clipboard
            .writeText(currentURL)
            .then(() => {
                showToast('Link copied!');
                // toast.success('Link Copied');
            });
        setLinkCopied(true);
    };

    const handleBookmarking = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/toggleBookmarkSound`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ soundId: soundId }),
            });

            if (response.ok) {
                // Toggle the bookmark status here
                // setBookMarkStatus(!bookMarkStatus);
                showToast('Bookmark toggled');
                handleFetchSound();
            } else {
                console.error('Failed to toggle bookmark:', response.status);
                showToastError('Failed to toggle bookmark');
            }

            console.log(response);
        } catch (error) {
            console.error('Error during bookmarking:', error);
            showToastError('Failed to toggle bookmark');
        }
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
                                            display: 'flex',
                                            gap: '3rem',

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
                                        <div className='flex gap-4 items-baseline h-fit'>

                                            {/* <Bookmark toggleBookmark={handleBookmarking} bookmarked={soundData?.isBookmarked} /> */}
                                            <button onClick={()=> setIsOpenShare(!isOpenShare)} className='ring-0 hover:border-transparent relative p-0'>
                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.5546 8.48191L13.3171 8.29548V7.51052V3.63086L21.4998 12.1309L13.3171 20.6309V16.5046V15.4972L12.3098 15.5046C8.838 15.5302 5.4275 17.1774 2.49983 19.719C2.54612 19.3844 2.67769 18.7718 2.94391 17.9637C3.3786 16.644 4.01326 15.3296 4.88691 14.1018C6.71045 11.5391 9.24414 9.29126 12.5546 8.48191Z" stroke="#161823" stroke-width="2"/>
                                                </svg>

                                                                                                
                                                {/* <img
                                                    className='cursor-pointer'
                                                    src={ShareClicked}
                                                    alt=""
                                                /> */}
                                                <COPY_AND_SEND_MENU_MULTIPLE open={isOpenShare} copyHandler={handleCopyToClipboard} allowedShareOptions={allowedShareOptions} URL={window.location.pathname} title={soundData?.title} />
                                            </button>
                                            
                                           <MORE_MENU_HOME
                                                visibleReportPopup={() => {setReportPopup(true);}}
                                                url={''}
                                                postMediaId={soundData?.mediaId?._id }
                                                activeMediaId={soundData?.mediaId?._id}
                                            />

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
