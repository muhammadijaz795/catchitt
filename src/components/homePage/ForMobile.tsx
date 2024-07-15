import { CircularProgress } from '@mui/material';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';
import {
    activeFvrt,
    activeLike,
    activeShare,
    commentInHome,
    fvrt,
    like,
    moreInHome,
    music,
    shareInHome,
} from '../../icons';
import PopupForReport from '../profile/popups/PopupForReport';
import style from './ForMobile.module.scss';
import Action from './components/Action';
import CustomPlayer from './components/CustomPlayer';
function ForMobile(props: any) {
    const { loading, videoes, activeTab, setActiveTab, showVideoModal } = props || {};
    const [reportPopup, setreportPopup] = useState(false);
    const userActions: any = [
        { img: moreInHome, actionType: 'more' },
        { img: shareInHome, actionType: 'share', activeImage: activeShare },
        { img: fvrt, actionType: 'fvrt', activeImage: activeFvrt },
        { img: commentInHome, actionType: 'comment' },
        { img: like, actionType: 'like', activeImage: activeLike },
    ];
    const settings: any = {
        arrows: false,
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        beforeChange: function (currentSlide: any, nextSlide: any) {},
        afterChange: function (currentSlide: any) {},
    };
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startY, setStartY] = useState(null);
    const sliderRef = useRef<any>(null);

    const handleTouchStart = (event: any) => {
        setStartY(event.touches[0].clientY);
    };

    const handleTouchMove = (event: any) => {
        if (!startY) return;

        const deltaY = event.touches[0].clientY - startY;
        sliderRef.current.scrollTop += deltaY;
        setStartY(event.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        setStartY(null);
        const slider = sliderRef.current;
        const visibleSlideIndex = Math.round(slider.scrollTop / slider.clientHeight);
        setCurrentIndex(visibleSlideIndex);
    };

    const copyHandler = (text: any) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('🎉 Copied successfully', {
                position: 'bottom-right', // Set the position (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
                autoClose: 2000, // Set the auto-close duration in milliseconds (e.g., 2000ms = 2 seconds)
            });
        });
    };

    return (
        <div
            className={style.slider}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className={style.sec1}>
                <p
                    style={{ color: activeTab === 1 ? 'rgb(255, 59, 92)' : '#FFF' }}
                    onClick={() => setActiveTab(1)}
                >
                    Following
                </p>
                <p
                    style={{ color: activeTab === 2 ? 'rgb(255, 59, 92)' : '#FFF' }}
                    onClick={() => setActiveTab(2)}
                >
                    ForYou
                </p>
                <p
                    onClick={() => setActiveTab(3)}
                    style={{ color: activeTab === 3 ? 'rgb(255, 59, 92)' : '#FFF' }}
                >
                    Live
                </p>
            </div>
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100vw',
                        height: '100vh',
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <Slider {...settings}>
                        {videoes?.length > 0 &&
                            videoes.map((post: any, index: number) => {
                                return (
                                    <div key={index} className={style.parent}>
                                        <div className={style.actions}>
                                            {userActions.map((obj: any, i: number) => {
                                                return (
                                                    <Action
                                                        visibleReportPopup={() =>
                                                            setreportPopup(true)
                                                        }
                                                        obj={obj}
                                                        copyHandler={copyHandler}
                                                        likes={post?.likes}
                                                        comments={post?.comments?.length}
                                                        shares={post?.shares}
                                                        mediaId={post?.mediaId}
                                                        isLiked={post?.isLiked}
                                                        showVideoModal={showVideoModal}
                                                        post={post}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <CustomPlayer
                                            src={
                                                post?.reducedVideoUrl
                                                    ? post?.reducedVideoUrl
                                                    : post?.reducedVideoHlsUrl
                                                    ? post?.reducedVideoHlsUrl
                                                    : post?.originalUrl
                                            }
                                            post={post}
                                        />
                                        {post && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    zIndex: 7878787,
                                                    left: '20px',
                                                    bottom: '10px',
                                                    height: 55,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 10,
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            color: '#FFF',
                                                            fontFamily: 'Poppins',
                                                        }}
                                                    >
                                                        {post?.description}
                                                    </p>
                                                    {post?.sound && (
                                                        <div style={{ display: 'flex', gap: 10 }}>
                                                            <img src={music} alt="" />
                                                            <p
                                                                style={{
                                                                    color: '#FFF',
                                                                    fontFamily: 'Poppins',
                                                                }}
                                                            >
                                                                {post?.sound?.category?.name}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            )}
            <div>
                <ToastContainer />
            </div>
            <PopupForReport openReport={reportPopup} onReportClose={() => setreportPopup(false)} />
        </div>
    );
}

export default ForMobile;

// import React, { Component } from 'react';
// import Slider from 'react-slick';

// function ForMobile() {
//     const settings: any = {
//         arrows: false,
//         dots: false,
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         vertical: true,
//         verticalSwiping: true,
//         swipeToSlide: true,
//         beforeChange: function (currentSlide: any, nextSlide: any) {
//             console.log('before change', currentSlide, nextSlide);
//         },
//         afterChange: function (currentSlide: any) {
//             console.log('after change', currentSlide);
//         },
//     };
//     return (
//         <div
//             className="slider-container"
//             style={{
//                 width: '100vw',
//                 height: '100vh',
//                 border: '2px solid red',
//                 overflow: 'scroll',
//             }}
//         >
//             <Slider {...settings}>
//                 <div style={{ border: '2px solid red', width: '100vw', height: 'fit-content' }}>
//                     <h3 style={{ border: '2px solid blue', width: '100vw', height: '100vh' }}>1</h3>
//                 </div>
//                 <div style={{ border: '2px solid red', width: '100vw', height: 'fit-content' }}>
//                     <h3 style={{ border: '2px solid blue', width: '100vw', height: '100vh' }}>2</h3>
//                 </div>
//                 <div style={{ border: '2px solid red', width: '100vw', height: 'fit-content' }}>
//                     <h3 style={{ border: '2px solid blue', width: '100vw', height: '100vh' }}>3</h3>
//                 </div>
//                 <div style={{ border: '2px solid red', width: '100vw', height: 'fit-content' }}>
//                     <h3 style={{ border: '2px solid blue', width: '100vw', height: '100vh' }}>3</h3>
//                 </div>
//                 <div style={{ border: '2px solid red', width: '100vw', height: 'fit-content' }}>
//                     <h3 style={{ border: '2px solid blue', width: '100vw', height: '100vh' }}>3</h3>
//                 </div>
//                 {/* <div style={{ border: '2px solid red', width: '100%', height: '100vh' }}>
//                     <h3 style={{ border: '2px solid blue', width: '100%', height: '100vh' }}>4</h3>
//                 </div>
//                 <div style={{ border: '2px solid red', width: '100%', height: '100vh' }}>
//                     <h3 style={{ border: '2px solid blue', width: '100%', height: '100vh' }}>5</h3>
//                 </div>
//                 <div style={{ border: '2px solid red', width: '100%', height: '100vh' }}>
//                     <h3 style={{ border: '2px solid blue', width: '100%', height: '100vh' }}>6</h3>
//                 </div> */}
//             </Slider>
//         </div>
//     );
// }

// export default ForMobile;
