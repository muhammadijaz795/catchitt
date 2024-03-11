import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import Gifts from '../discover/popups/gifts';
import PopupForReport from '../profile/popups/PopupForReport';
import PopupForBlock from '../profile/popups/popupForBlock';
import PopupForVideoPlayer from '../profile/popups/popupForVideoPlayer';
import ForDesktop from './ForDesktop';
import ForMobile from './ForMobile';
import useHome from './hooks/useHome';
import Forwardusers from '../../shared/popups/shareTo/Forwardusers';

function HomePage() {
    const isMobile = useMediaQuery('(max-width:700px)');
    const { loading, videos, activeTab, setActiveTab } = useHome();
    const [videoModalInfo, setVideoModalInfo] = useState<any>({});
    const [reportPopup, setReportPopup] = useState(false);
    const [giftsPopup, setGiftsPopup] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [sendPopup, setSendPopup] = useState(false);
    const [videoComments, setvideoComments] = useState<any[]>([]);

    const realTimehandler = (comments: number, mediaId: any) => {
        const filteredData: any[] = videoComments.filter((data: any) => data.mediaId !== mediaId);
        setvideoComments([
            ...filteredData,
            {
                mediaId,
                comments,
            },
        ]);
    };

    console.log(videoModalInfo);

    return (
        <div>
            {isMobile ? (
                <ForMobile
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    videoes={videos}
                    loading={loading}
                    showVideoModal={(e: any) => {
                        setVideoModalInfo(e);
                        setVideoModal(true);
                    }}
                    videoModal={videoModal}
                    comments={videoComments}
                />
            ) : (
                <ForDesktop
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    videoes={videos}
                    loading={loading}
                    showVideoModal={(e: any) => {
                        setVideoModalInfo(e);
                        setVideoModal(true);
                    }}
                    videoModal={videoModal}
                    sendPopup={sendPopup}
                    setSendPopup={setSendPopup}
                    comments={videoComments}
                />
            )}
            <PopupForVideoPlayer
                gifts={() => setGiftsPopup(true)}
                onBlockPopup={() => setBlockPopup(true)}
                onReportPopup={() => setReportPopup(true)}
                videoModal={videoModal}
                onclose={() => setVideoModal(false)}
                info={videoModalInfo}
                sendPopupHandler={() => setSendPopup(true)}
                commentsLength={realTimehandler}
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
                userId={{ id: videoModalInfo?.user?._id, name: videoModalInfo?.user?.name }}
            />
            <Gifts
                mediaId={videoModalInfo?.mediaId}
                openGifts={giftsPopup}
                onGiftsClose={() => setGiftsPopup(false)}
            />
            <Forwardusers onOpen={sendPopup} onClose={() => setSendPopup(false)} />
        </div>
    );
}

export default HomePage;
