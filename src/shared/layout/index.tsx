import { useMediaQuery } from '@mui/material';
import PopupForReport from '../../components/profile/popups/PopupForReport';
import { SideNavBar } from '../../components/side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../../components/suggested-activity/suggested-activity';
import { commentTab, forthTab, homeTab, settingsTab, thirdTab } from '../../icons';
import Navbar from '../navbar';
import BlockPopup from '../popups/BlockPopup';
import style from './style.module.scss';
import { useEffect, useState } from 'react';

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
    } = props || {};
    const showSidebar = useMediaQuery('(max-width:1000px)');
    const [darkTheme, setdarkTheme] = useState('');
    const [darkThemeblack, setdarkThemeblack] = useState('');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if(themeColor == "dark"){ 
            setdarkTheme(style.darkTheme);
            setdarkThemeblack(style.darkThemeblack);
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
                        className={` ${darkTheme}`}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 32,
                            overflow: 'scroll',
                            height: '100%',
                            padding: '40px 40px 0px 40px',
                        }}
                    >
                        <SideNavBar />
                        <div style={{ background: '#FFF', borderRadius: 16 }}  >
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
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
                 className={` ${darkThemeblack}`}
                    style={{
                        overflow: 'scroll',
                        height: 'auto',
                        paddingBottom: paddingBottomProp ? 0 : 40,
                        display: 'block',
                        flex: 1,
                    }}
                >
                    {children}
                </div>
            </div>
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
