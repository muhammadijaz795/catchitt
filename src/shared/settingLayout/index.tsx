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
import { useLocation } from 'react-router-dom';

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

    const location = useLocation();

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
        >
            <Navbar />

        
        </div>
    );
}

export default Layout;
