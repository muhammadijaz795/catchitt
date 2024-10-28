import { useMediaQuery } from '@mui/material';
import PopupForReport from '../../components/profile/popups/PopupForReport';
import PopupForGetApp from '../components/PopupForGetApp';
import { SideNavBar } from '../../components/side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../../components/suggested-activity/suggested-activity';
import { commentTab, forthTab, homeTab, settingsTab, thirdTab } from '../../icons';
import Navbar from '../navbar';
import BlockPopup from '../popups/BlockPopup';
import style from './style.module.scss';
import { useEffect, useState } from 'react';
import { e } from 'mathjs';

function Layout(props: any) {
    const {
        globalClicker,
        children,
        showReportPopup,
        closeReportPopup,
        reportInfo,
        showBlockPopup,
        closeBlockPopup,
        showShortSidebar,
        DangerText,
        dangetBtnText,
        onBlock,
        showCopyPopup,
        paddingBottomProp,
        popups,
        isScrollActive = true,
    } = props || {};
    const showSidebar = useMediaQuery('(max-width:1000px)');
    const [darkTheme, setdarkTheme] = useState('');
    const [darkThemeblack, setdarkThemeblack] = useState('');
    const [appPopup, setAppPopup] = useState(false);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
            setdarkThemeblack(style.darkThemeblack);
        } else {
            // setdarkTheme(style.lightTheme);
        }
    });

    // useEffect(() => {
    //     window.addEventListener('storage', () => {
    //       // When local storage changes, dump the list to
    //       // the console.
    //     //    setCart(JSON.parse(localStorage.getItem('myCart')) || [])
    //     var themeColor = window.localStorage.getItem('theme');
    //     if(themeColor == "dark"){
    //         setdarkTheme(style.darkTheme);
    //     }
    //     });
    //     }, [])

    const showAppPopup = () => {
        setAppPopup(true);
    };

    const closeAppPopup = () => {
        setAppPopup(false);
    };

    return (
        <div
            style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
            onClick={globalClicker}
        >
            <Navbar />

            {/* <TopBar /> */}
            <div style={{ display: 'flex', height: '100vh', width: '100vw', paddingTop: 80 }}>
                {!showSidebar && !showShortSidebar ? (
                    <div
                        // className={` ${darkTheme}`}
                        style={{
                            // display: 'flex',
                            // flexDirection: 'column',
                            gap: 32,
                            // overflow: 'scroll',
                            height: '102%',
                            width: '244px', //new theme
                            // padding: '40px 40px 0px 40px', //new theme
                        }}
                    >
                        <SideNavBar />
                        {/*
                        //new theme 
                        <div style={{ background: '#FFF', borderRadius: 16 }}  >
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div> 
                        //end new theme 
                        */}
                    </div>
                ) : (
                    !showShortSidebar && (
                        <div className={` ${style.shortSideBar} ${darkTheme} `}>
                            <div>
                                <img src={homeTab} alt="" />
                            </div>
                            <div>
                                <img src={commentTab} alt="" />
                            </div>
                            <div>
                                <img src={thirdTab} alt="" />
                            </div>
                            <div>
                                <img src={forthTab} alt="" />
                            </div>
                            <div>
                                <img src={settingsTab} alt="" />
                            </div>
                        </div>
                    )
                )}
                {!showSidebar && showShortSidebar && (
                    <div className={` ${style.shortSideBar} ${darkTheme}`}>
                        <div>
                            <img src={homeTab} alt="" />
                        </div>
                        <div>
                            <img src={commentTab} alt="" />
                        </div>
                        <div>
                            <img src={thirdTab} alt="" />
                        </div>
                        <div>
                            <img src={forthTab} alt="" />
                        </div>
                        <div>
                            <img src={settingsTab} alt="" />
                        </div>
                    </div>
                )}

                {showCopyPopup && (
                    <div
                        style={{
                            position: 'fixed',
                            width: '100vw',
                            height: '100vh',
                            zIndex: 4,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                width: '18.5rem',
                                height: '3.75rem',
                                background: '#FFFAE6',
                                borderRadius: '0.625rem',
                                position: 'absolute',
                                bottom: '6.65rem',
                                right: '2.5rem',
                            }}
                        >
                            <p
                                style={{
                                    color: '#222',
                                    fontFamily: 'Poppins',
                                    fontSize: ' 1rem',
                                    fontStyle: ' normal',
                                    fontWeight: '500',
                                    lineHeight: '120%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '1.5rem',
                                }}
                            >
                                🎉 Copied successfully
                            </p>
                        </div>
                    </div>
                )}

                <div
                    id="contentDiv"
                    className={` ${darkThemeblack} no-scrollbar`}
                    style={{
                        overflow: isScrollActive ? 'scroll' : 'auto',
                        height: 'auto',
                        paddingBottom: paddingBottomProp ? 0 : 40,
                        display: 'block',
                        flex: 1,
                        // paddingTop: '1%',
                    }}
                >
                    {children}
                </div>
                <div className={style.GetAppDivBottomContainer}>
                    <div className={style.GetAppDivPromotionContainer}>
                        <button
                            className={style.GetAppButtonGetAppText}
                            onClick={() => showAppPopup()}
                        >
                            Get app
                        </button>
                        <div className={style.GetAppDivExpandContainer}>
                            <div className={style.GetAppDivXMarkWrapper}>
                                <svg
                                    width="20"
                                    data-e2e=""
                                    height="20"
                                    viewBox="0 0 48 48"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M21.1718 23.9999L10.2931 13.1212C9.90261 12.7307 9.90261 12.0975 10.2931 11.707L11.7074 10.2928C12.0979 9.90228 12.731 9.90228 13.1216 10.2928L24.0002 21.1715L34.8789 10.2928C35.2694 9.90228 35.9026 9.90228 36.2931 10.2928L37.7073 11.707C38.0979 12.0975 38.0979 12.7307 37.7073 13.1212L26.8287 23.9999L37.7073 34.8786C38.0979 35.2691 38.0979 35.9023 37.7073 36.2928L36.2931 37.707C35.9026 38.0975 35.2694 38.0975 34.8789 37.707L24.0002 26.8283L13.1216 37.707C12.731 38.0975 12.0979 38.0975 11.7074 37.707L10.2931 36.2928C9.90261 35.9023 9.90261 35.2691 10.2931 34.8786L21.1718 23.9999Z"
                                    ></path>
                                </svg>
                            </div>
                            <div className={style.GetAppDivExpandWrapper}>
                                <div className={style.GetAppDivItemContainer}>
                                    <svg
                                        width="21"
                                        data-e2e=""
                                        height="21"
                                        viewBox="0 0 48 48"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M8 7C8 4.23858 10.2386 2 13 2H35C37.7614 2 40 4.23858 40 7V41C40 43.7614 37.7614 46 35 46H13C10.2386 46 8 43.7614 8 41V7ZM13 6C12.4477 6 12 6.44772 12 7V41C12 41.5523 12.4477 42 13 42H35C35.5523 42 36 41.5523 36 41V7C36 6.44772 35.5523 6 35 6H13ZM18 10C18 9.44772 18.4477 9 19 9H29C29.5523 9 30 9.44772 30 10V12C30 12.5523 29.5523 13 29 13H19C18.4477 13 18 12.5523 18 12V10ZM24 39C25.6569 39 27 37.6569 27 36C27 34.3431 25.6569 33 24 33C22.3431 33 21 34.3431 21 36C21 37.6569 22.3431 39 24 39Z"
                                        ></path>
                                    </svg>
                                    <span className={style.GetAppSpanText}>Get Seezitt App</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PopupForGetApp openAppPopup={appPopup} closeAppPopup={closeAppPopup} />

            <PopupForReport
                openReport={showReportPopup}
                onReportClose={closeReportPopup}
                info={reportInfo}
            />
            <BlockPopup
                onBlock={onBlock}
                dangetBtnText={dangetBtnText}
                DangerText={DangerText}
                openBlock={showBlockPopup}
                onBlockClose={closeBlockPopup}
            />
            {popups}
        </div>
    );
}

export default Layout;
