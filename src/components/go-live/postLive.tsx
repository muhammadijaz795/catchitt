import React, { useEffect, useRef, useState } from "react";
import {
    Card,
    CardContent,
    Avatar,
    Button,
    Typography,
    Box,
    IconButton,
    CardMedia,
    Divider,
    Slide,
    TextField,
    Switch,
    Grid,
    Paper,
    Collapse
} from "@mui/material";
import { beautify } from "../../icons";
import EditIco from "@mui/icons-material/Edit";
import TagIcon from "@mui/icons-material/Tag";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Favorite as FavoriteIcon,
    Settings as SettingsIcon,
    ExpandMore,
    ExpandLess
} from "@mui/icons-material";
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { PowerSettingsNew } from '@mui/icons-material';
import { ShowChart } from '@mui/icons-material';
import { ChevronRight } from '@mui/icons-material';
import EditLiveGoal from './EditLiveGoal';
import { SideNavBar } from "./goLiveSidebar";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExploreFilters from "./ExploreFilters";
import LiveGoalFAQ from "./TopViewersFaqs";
import SettingsPanel from "./SettingPostLive";
import PostliveBg from '../../assets/postLive/postlive-bg.png'
import LiveGoal from '../../assets/postLive/liveGoal.png'
import HorizontalLine from '../../assets/postLive/horizontal-line.png'
import HeartReact from '../../assets/postLive/Heart-React.png'
import HostIcon from '../../assets/postLive/hosts.png'
import GuestIcon from '../../assets/postLive/guests.png'
import InteractIcon from '../../assets/postLive/Interact.png'
import ShareIcon from '../../assets/postLive/Share.png'
import EnhanceIcon from '../../assets/postLive/Enhance.png'
import MoreIcon from '../../assets/postLive/More.png'
import AvatarPostLive from '../../assets/postLive/Avatar.png'
import { useSearchParams } from 'react-router-dom';
import SidebarChat from './SidebarChat.jsx';



export default function PostLive() {

    const Activity = () => (
        <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.71963 11.2487C4.71855 9.33396 5.26296 7.46055 6.28595 5.85877C7.29896 4.26981 8.74995 3.02587 10.4543 2.28527C12.7271 1.30074 15.2915 1.30074 17.5642 2.28527C19.2693 3.02559 20.7209 4.26955 21.7343 5.85877C23.8138 9.11701 23.8259 13.3261 21.7651 16.5967L25.9539 24.2477L21.5416 23.3727L20.1304 27.7967L16.2419 20.6655C14.777 21.0443 13.2433 21.0443 11.7784 20.6655L7.88983 27.7967L6.47877 23.371L2.06641 24.2477L6.25526 16.5967C5.25079 15.0035 4.71745 13.1461 4.71963 11.2487Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5743 7.36895C13.6564 7.19805 13.8261 7.08984 14.012 7.08984C14.1977 7.08984 14.3674 7.19805 14.4497 7.36895L15.3556 9.19945C15.4232 9.33801 15.549 9.43728 15.6969 9.46895L17.5942 9.8592C17.768 9.90129 17.9077 10.0332 17.9631 10.2072C18.0186 10.3812 17.9815 10.5723 17.8655 10.7114L16.5108 12.2864C16.4153 12.3984 16.3706 12.5467 16.388 12.6942L16.6387 14.8257C16.6641 15.0121 16.5869 15.1976 16.438 15.3076C16.2893 15.4177 16.0933 15.4343 15.9289 15.3507L14.2227 14.4617C14.0844 14.3891 13.9206 14.3891 13.7824 14.4617L12.0761 15.3507C11.9118 15.4343 11.7158 15.4177 11.5671 15.3076C11.4181 15.1976 11.341 15.0121 11.3663 14.8257L11.6173 12.6994C11.6344 12.5519 11.5898 12.4037 11.4944 12.2917L10.1396 10.7167C10.0208 10.5751 9.98423 10.3796 10.0436 10.203C10.103 10.0264 10.2493 9.89553 10.4279 9.8592L12.3253 9.4672C12.4732 9.43553 12.5989 9.33627 12.6666 9.1977L13.5743 7.36895Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.36187 15.8919C6.97312 15.2801 6.16201 15.0994 5.5502 15.488C4.93838 15.8767 4.75753 16.6878 5.14628 17.2996L7.36187 15.8919ZM7.44846 18.1148L8.39741 17.2081L8.39333 17.2039L7.44846 18.1148ZM11.2482 20.5158L11.6582 19.2689L11.6565 19.2684L11.2482 20.5158ZM11.4578 21.9441C12.1598 22.1253 12.8755 21.7032 13.0566 21.0012C13.2378 20.2993 12.8155 19.5836 12.1136 19.4024L11.4578 21.9441ZM22.8717 17.2996C23.2604 16.6878 23.0796 15.8767 22.4678 15.488C21.856 15.0994 21.0449 15.2801 20.656 15.8919L22.8717 17.2996ZM20.5696 18.1148L19.6246 17.2039L19.6205 17.2081L20.5696 18.1148ZM16.7696 20.5158L16.3615 19.2684L16.3598 19.2689L16.7696 20.5158ZM15.9042 19.4024C15.2025 19.5836 14.7802 20.2993 14.9613 21.0012C15.1425 21.7032 15.8582 22.1253 16.5601 21.9441L15.9042 19.4024ZM5.14628 17.2996C5.54041 17.92 5.99508 18.4984 6.50356 19.0258L8.39333 17.2039C8.00769 16.8039 7.66204 16.3643 7.36187 15.8919L5.14628 17.2996ZM6.4995 19.0215C7.7041 20.2822 9.19373 21.2245 10.8401 21.7632L11.6565 19.2684C10.4258 18.8657 9.3065 18.1596 8.39741 17.2081L6.4995 19.0215ZM10.8384 21.7627C11.0429 21.8299 11.2494 21.8904 11.4578 21.9441L12.1136 19.4024C11.9604 19.3629 11.8085 19.3184 11.6582 19.2689L10.8384 21.7627ZM20.656 15.8919C20.3559 16.3643 20.0103 16.8039 19.6246 17.2039L21.5144 19.0258C22.0229 18.4984 22.4776 17.92 22.8717 17.2996L20.656 15.8919ZM19.6205 17.2081C18.7114 18.1596 17.5921 18.8657 16.3615 19.2684L17.1779 21.7632C18.8243 21.2245 20.3139 20.2822 21.5184 19.0215L19.6205 17.2081ZM16.3598 19.2689C16.2094 19.3184 16.0575 19.3629 15.9042 19.4024L16.5601 21.9441C16.7686 21.8904 16.9751 21.8299 17.1796 21.7627L16.3598 19.2689Z" fill="white" />
        </svg>

    )
    const Board = () => (
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.3946 6.66135C23.7239 6.00273 23.457 5.20182 22.7983 4.8725C22.1396 4.54318 21.3388 4.81015 21.0095 5.46879L17.7239 12.0398L14.26 9.44193C13.3112 8.73034 11.9552 8.99597 11.3451 10.0129L7.72537 16.0457C7.3465 16.6772 7.55125 17.4961 8.18269 17.8751C8.81413 18.2539 9.63314 18.0492 10.012 17.4177L13.2514 12.0188L16.763 14.6524C17.7612 15.4012 19.1938 15.0629 19.7519 13.9469L23.3946 6.66135Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M30.2005 4.73169C30.2005 2.52256 28.4097 0.731689 26.2005 0.731689H4.86719C2.65805 0.731689 0.867188 2.52256 0.867188 4.73169V18.065C0.867188 20.2742 2.65805 22.065 4.86719 22.065H13.4512L6.68028 27.7074C6.11457 28.1788 6.03813 29.0196 6.50956 29.5853C6.98097 30.151 7.82173 30.2274 8.38743 29.756L14.2005 24.9117V28.7317C14.2005 29.4681 14.7975 30.065 15.5339 30.065C16.2703 30.065 16.8672 29.4681 16.8672 28.7317V24.9117L22.6803 29.756C23.246 30.2274 24.0868 30.151 24.5581 29.5853C25.0296 29.0196 24.9532 28.1788 24.3875 27.7074L17.6165 22.065H26.2005C28.4097 22.065 30.2005 20.2742 30.2005 18.065V4.73169ZM27.5339 4.73169C27.5339 3.99532 26.9369 3.39836 26.2005 3.39836H4.86719C4.13081 3.39836 3.53385 3.99532 3.53385 4.73169V18.065C3.53385 18.8014 4.13081 19.3984 4.86719 19.3984H26.2005C26.9369 19.3984 27.5339 18.8014 27.5339 18.065V4.73169Z" fill="white" />
        </svg>
    );

    const Dual = () => (
        <svg width="25" height="31" viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.5352 16.5198L24.5322 16.5189L24.5315 27.7661C24.5315 29.2158 23.3562 30.3911 21.9065 30.3911L3.16379 30.3911C1.71404 30.3911 0.538787 29.2158 0.538787 27.7661L0.538787 14.2698L0.542688 14.2689L0.542539 3.02344C0.54254 1.57369 1.71779 0.398437 3.16754 0.398437L21.9102 0.398437C23.3599 0.398437 24.5352 1.57369 24.5352 3.02344L24.5352 16.5198ZM22.2815 27.7661L22.2815 16.5198L2.78879 16.5198L2.78879 27.7661C2.78879 27.9732 2.95664 28.1411 3.16379 28.1411L21.9065 28.1411C22.1136 28.1411 22.2815 27.9732 22.2815 27.7661ZM22.2852 14.2698L22.2852 3.02344C22.2852 2.81633 22.1173 2.64844 21.9102 2.64844L3.16754 2.64844C2.96039 2.64844 2.79254 2.81633 2.79254 3.02344L2.79254 14.2698L22.2852 14.2698ZM20.787 25.5233C20.787 26.1446 20.2833 26.6483 19.662 26.6483C19.0407 26.6483 18.537 26.1446 18.537 25.5233L18.537 18.7709C18.537 18.1496 19.0407 17.6459 19.662 17.6459C20.2833 17.6459 20.787 18.1496 20.787 18.7709L20.787 25.5233Z" fill="white" />
        </svg>
    );
    const Share = () => (
        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.8687 1.73169V7.06502C6.10208 8.43569 2.84207 16.1157 1.53541 23.065C1.48607 23.3397 8.71407 15.1157 14.8687 15.065V20.3984L25.5354 11.065L14.8687 1.73169Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );



    const LiveCenter = () => (
        <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.0352 11.0656V20.6985C25.0352 23.2186 25.0352 24.4788 24.5447 25.4413C24.1133 26.2881 23.4249 26.9766 22.5782 27.408C22.3518 27.5233 22.109 27.6115 21.8372 27.679M21.8372 27.679C21.0599 24.3655 18.0857 21.8985 14.5352 21.8985C10.9847 21.8985 8.01041 24.3655 7.23319 27.679M21.8372 27.679C20.9532 27.8985 19.7627 27.8985 17.8352 27.8985H11.2352C9.30758 27.8985 8.11715 27.8985 7.23319 27.679M4.03516 11.0646V20.6985C4.03516 23.2186 4.03516 24.4788 4.52563 25.4413C4.95706 26.2881 5.64547 26.9766 6.4922 27.408C6.71857 27.5233 6.96139 27.6115 7.23319 27.679M28.0352 14.3985L19.8854 5.34439C18.0318 3.28524 17.1051 2.25567 16.0136 1.87557C15.0551 1.54173 14.0117 1.5418 13.053 1.87579C11.9616 2.25604 11.0351 3.28576 9.18187 5.34519L1.03516 14.3985M17.5352 14.3985C17.5352 16.0552 16.1921 17.3985 14.5352 17.3985C12.8783 17.3985 11.5352 16.0552 11.5352 14.3985C11.5352 12.7416 12.8783 11.3984 14.5352 11.3984C16.1921 11.3984 17.5352 12.7416 17.5352 14.3985Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
    const Leads = () => (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.7852 23.875H7.28516C5.18496 23.875 4.13486 23.875 3.33269 23.4799C2.62708 23.1324 2.05341 22.5779 1.69388 21.8958C1.28516 21.1202 1.28516 20.1052 1.28516 18.075V2.125M5.03516 16.625L10.0352 11.7917L15.0352 16.625L22.5352 9.375M22.5352 9.375V14.2083M22.5352 9.375H17.5352" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );
    const Poll = () => (
        <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.86979 7.33341H14.9531M7.86979 13.0001H19.2031M7.86979 18.6667H12.1198M6.73646 1.66675H20.3365C21.9233 1.66675 22.7167 1.66675 23.3228 1.97557C23.8559 2.2472 24.2894 2.68064 24.561 3.21378C24.8698 3.81985 24.8698 4.61327 24.8698 6.20008V19.8001C24.8698 21.3869 24.8698 22.1804 24.561 22.7864C24.2894 23.3195 23.8559 23.753 23.3228 24.0246C22.7167 24.3334 21.9233 24.3334 20.3365 24.3334H6.73646C5.14965 24.3334 4.35623 24.3334 3.75015 24.0246C3.21702 23.753 2.78358 23.3195 2.51194 22.7864C2.20312 22.1804 2.20313 21.3869 2.20313 19.8001V6.20008C2.20313 4.61327 2.20312 3.81985 2.51194 3.21378C2.78358 2.68064 3.21702 2.2472 3.75015 1.97557C4.35623 1.66675 5.14965 1.66675 6.73646 1.66675Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );

    const Promote = () => (
        <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.4222 31.977C5.88316 31.977 0.535156 26.7491 0.535156 19.546C0.535156 15.722 2.82816 11.6021 2.92516 11.4301C3.12416 11.0761 3.51516 10.8831 3.92316 10.9281C4.32716 10.9801 4.65916 11.2711 4.76316 11.6641C4.76916 11.6881 5.38716 14.0001 6.20316 15.2841C6.75116 16.1481 7.30716 16.7591 7.93216 17.1831C7.50916 15.35 7.18516 12.5921 7.71216 9.76205C9.16016 1.99405 15.2742 0.135051 15.5362 0.0610505C15.8732 -0.0359495 16.2312 0.0510506 16.4872 0.284051C16.7432 0.519051 16.8602 0.870051 16.7942 1.21105C16.7842 1.26505 15.7742 6.70405 17.9172 11.3381C18.1122 11.7591 18.3832 12.2481 18.6752 12.7371C18.7582 12.0651 18.8872 11.3511 19.0852 10.6571C19.8712 7.90805 21.9042 6.96905 21.9892 6.93105C22.3282 6.77705 22.7242 6.82705 23.0162 7.05705C23.3082 7.28805 23.4492 7.66005 23.3812 8.02605C23.3702 8.09405 23.0872 9.96405 24.6792 12.6181C26.1172 15.0141 26.5312 16.567 26.5312 19.546C26.5312 26.7491 21.0172 31.976 13.4202 31.976L13.4222 31.977ZM3.64916 14.6151C3.10016 16.0001 2.53416 17.841 2.53416 19.546C2.53416 25.59 7.04016 29.976 13.4212 29.976C19.8592 29.976 24.5312 25.59 24.5312 19.545C24.5312 16.934 24.2082 15.7231 22.9642 13.6461C22.1322 12.2601 21.7212 11.0131 21.5252 10.0211C21.3272 10.3421 21.1432 10.7331 21.0092 11.2051C20.3992 13.3361 20.5532 15.8281 20.5552 15.8541C20.5842 16.3001 20.3132 16.713 19.8912 16.862C19.4692 17.011 18.9992 16.864 18.7402 16.498C18.6652 16.391 16.8862 13.8741 16.1032 12.1781C14.4752 8.66005 14.5022 4.85505 14.6692 2.66405C13.0212 3.62405 10.4922 5.76805 9.68016 10.1301C8.88916 14.3741 10.4262 18.618 10.4422 18.659C10.5752 19.0051 10.5052 19.3981 10.2612 19.677C10.0162 19.9541 9.63916 20.077 9.27516 19.99C9.15116 19.96 6.33716 19.2281 4.51416 16.3561C4.18916 15.8421 3.89716 15.2191 3.65016 14.6141L3.64916 14.6151Z" fill="white" />
        </svg>
    );
    const [searchParams] = useSearchParams();
    const streamId = searchParams.get('streamId');
    const [selectedLiveVideo, setSelectedLiveVideo] = useState(
        {
          details: null,
          isLoading: false,
        }
      );

    const filters = new Array(24).fill('').map((_, i) => ({
        id: i,
        image: `https://i.pravatar.cc/150?img=${i + 1}`,
        selected: i === 0,
        disabled: i > 5 && i % 2 === 0,
    }));

    const [expanded, setExpanded] = useState(false);
    const toggleMoreExpenstion = () => setExpanded(prev => !prev);
    const [showMore, setShowMore] = useState(false);
    const toggleMore = () => setShowMore((prev) => !prev);
    const slideRef = useRef(null);
    const [showEditLiveGoal, setShowEditLiveGoal] = useState(false);
    const [showFaqs, setShowFaqs] = useState(false);

    const [openSettings, setOpenSettings] = useState(false);

    const [profileDetails, setProfileDetails] = useState<any>(
        {
            details: [],
            isLoading: false,
        }
    );

    const toggleSettings = () => {
        setOpenSettings((prev) => !prev);
    };

    useEffect(() => {
        loadRoomDetails();
         loadProfileDetails();
    }, []);

    function loadProfileDetails()
    {
        let endpoint = `${process.env.VITE_API_URL}/profile`;
        let requestOptions =
        {
        method: 'GET',
        headers:
        {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        };

        setProfileDetails((prev: any) => ({ ...prev, isLoading: true }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => setProfileDetails((prev: any) => ({ ...prev, details: response.data, isLoading: false })))
        .catch((error) => console.error('Fetch error:', error));
    };


    const loadRoomDetails = () => {
        let endpoint = `${process.env.VITE_API_URL}/live-stream/${streamId}`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };
        console.log('endpoint', endpoint);
        console.log('requestOptions', requestOptions);  
        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => { setSelectedLiveVideo((prev: any) => ({...prev, details: response.data, isLoading: false})); })
        .catch((error) => console.error('Fetch error:', error));
    }


    return (
        <div className='flex ' style={{ background: '#000' }}>
            <SideNavBar />
            <div className={` w-[calc(100%-16rem)] ml-auto bg-white pt-2`}>
                <div className="flex" >
                    {/* Live screen */}
                    <Box style={{ width: "100%", }}>
                        <Box
                            sx={{
                                position: "relative",
                                mx: 2,
                                borderRadius: 3,
                                overflow: "hidden",
                                backgroundColor: "black",
                                color: "white",
                                width: "-webkit-fill-available",
                            }}
                        >
                            <img
                                src={PostliveBg} // Replace with real image path
                                alt="Live Stream"
                                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                            />

                            {/* Top Left User Info */}
                            <Box sx={{
                                position: "absolute",
                                top: 16,
                                left: 16,
                            }}>
                                <Box
                                    sx={{

                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        px: 0.5,
                                        py: 0.5,
                                        borderRadius: 999,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        mb: 1
                                    }}
                                >
                                <Avatar
                                    src={ profileDetails?.details?.avatar }
                                    alt={ profileDetails?.details?.name }
                                    sx={{ width: 32, height: 32 }}
                                />                                    
                                <Box>
                                        <Typography fontSize={12} lineHeight={1} fontWeight={500}>
                                             {profileDetails?.details?.name }
                                        </Typography>
                                        <span className="flex text-xs">
                                            <svg className="pr-1" width="11" height="10" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.6853 3.72379C12.6493 2.48236 12.0756 1.46198 11.2639 0.83817C10.2199 0.0349199 8.78046 -0.112455 7.58402 0.76392C7.18915 1.05417 6.81958 1.45579 6.50008 1.98342C6.18058 1.45579 5.81158 1.05417 5.41615 0.764482C4.21971 -0.112455 2.78083 0.0349198 1.73627 0.838732C0.924021 1.46254 0.350833 2.48292 0.314833 3.72436C0.295146 4.38361 0.396396 5.11936 0.758083 5.86354C1.32621 7.03186 3.99527 9.62948 6.47927 11.8727L6.49896 11.8941L6.50008 11.893L6.50121 11.8941L6.52146 11.8727C9.0049 9.63004 11.6734 7.03242 12.2421 5.86354C12.6043 5.11936 12.7045 4.38304 12.6853 3.72379Z" fill="white" />
                                            </svg>
                                            0
                                        </span>
                                    </Box>

                                    <Box display="flex" alignItems="center" color="orange" sx={{
                                        backgroundColor: "#fff",
                                        px: 0.75,
                                        py: 0.75,
                                        borderRadius: 999,
                                        display: "flex",
                                        alignItems: "center",
                                    }}>
                                        <FavoriteIcon sx={{ fontSize: 16 }} />
                                        <Typography fontSize={12} ml={0.5}>
                                             {profileDetails?.details?.followersNumber}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Top Left Badge */}
                                <Box
                                    sx={{

                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        px: 1,
                                        py: 0.5,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        borderRadius: 999,
                                        display: "flex",

                                    }}
                                >
                                    <svg className="pr-1" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.3726 4.52996C14.3326 3.15059 13.6951 2.01684 12.7932 1.32372C11.6332 0.431215 10.0338 0.267465 8.70447 1.24122C8.26572 1.56372 7.85509 2.00996 7.50009 2.59622C7.14509 2.00996 6.73509 1.56372 6.29572 1.24184C4.96634 0.267465 3.36759 0.431215 2.20697 1.32434C1.30447 2.01746 0.667593 3.15121 0.627593 4.53059C0.605718 5.26309 0.718217 6.08059 1.12009 6.90746C1.75134 8.20559 4.71697 11.0918 7.47697 13.5843L7.49884 13.6081L7.50009 13.6068L7.50134 13.6081L7.52384 13.5843C10.2832 11.0925 13.2482 8.20621 13.8801 6.90746C14.2826 6.08059 14.3938 5.26246 14.3726 4.52996Z" fill="url(#paint0_linear_3413_34940)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_3413_34940" x1="3.57152" y1="2.89683" x2="10.0001" y2="12.1825" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FEA866" />
                                                <stop offset="1" stop-color="#ED7B24" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    Popular LIVE
                                </Box>
                            </Box>
                            {/* Top Right Viewer Info */}
                            <Box sx={{ position: "absolute", top: 16, right: 0 }}>
                                <Box sx={{
                                    display: "flex",
                                    mr: 2,
                                    justifyContent: "end",
                                }}>
                                    <Avatar src="data:image/jpeg;base64,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" sx={{ width: 24, height: 24 }} />
                                    <Box
                                        sx={{

                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            px: 0.5,
                                            py: 0.25,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            borderRadius: 999,
                                            display: "flex",
                                            mb: 1,
                                            width: "fit-content",
                                        }}>
                                        <svg className="pr-0.5" width="10" height="11" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.95312 4.21936C2.95312 2.36234 4.45853 0.856934 6.31555 0.856934C8.17256 0.856934 9.67798 2.36234 9.67798 4.21936C9.67798 6.07637 8.17256 7.58178 6.31555 7.58178C4.45853 7.58178 2.95312 6.07637 2.95312 4.21936Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.6329 9.2084C3.54352 8.82665 4.75816 8.70264 6.31423 8.70264C7.86711 8.70264 9.07988 8.82615 9.9897 9.20594C10.9663 9.61357 11.5657 10.3061 11.8852 11.3134C12.0039 11.6877 11.7231 12.0651 11.335 12.0651H1.28998C0.903429 12.0651 0.62433 11.6894 0.742077 11.3171C1.06065 10.3099 1.65794 9.6171 2.6329 9.2084Z" fill="white" />
                                        </svg>

                                        1
                                    </Box>
                                    <span>
                                        <PowerSettingsNew />
                                    </span>
                                </Box>
                                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="32" height="32" fill="white" transform="translate(0.5 0)" />
                                        </clipPath>
                                    </defs>
                                    <g clip-path="url(#clip0)">
                                        <path d="M8.5 27.9985L28.5 7.99854L24.5 3.99854L4.5 23.9985L8.5 27.9985Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M20.5 7.99854L24.5 11.9985" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.4987 3.99854C12.4987 4.70578 12.7796 5.38406 13.2797 5.88415C13.7798 6.38425 14.4581 6.6652 15.1654 6.6652C14.4581 6.6652 13.7798 6.94615 13.2797 7.44625C12.7796 7.94635 12.4987 8.62462 12.4987 9.33187C12.4987 8.62462 12.2177 7.94635 11.7176 7.44625C11.2176 6.94615 10.5393 6.6652 9.83203 6.6652C10.5393 6.6652 11.2176 6.38425 11.7176 5.88415C12.2177 5.38406 12.4987 4.70578 12.4987 3.99854Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M25.8346 17.332C25.8346 18.0393 26.1156 18.7176 26.6157 19.2176C27.1158 19.7177 27.7941 19.9987 28.5013 19.9987C27.7941 19.9987 27.1158 20.2796 26.6157 20.7797C26.1156 21.2798 25.8346 21.9581 25.8346 22.6654C25.8346 21.9581 25.5537 21.2798 25.0536 20.7797C24.5535 20.2796 23.8752 19.9987 23.168 19.9987C23.8752 19.9987 24.5535 19.7177 25.0536 19.2176C25.5537 18.7176 25.8346 18.0393 25.8346 17.332Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        alignItems: "center",
                                        gap: 1
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            px: 1,
                                            py: 0.5,
                                            borderTopLeftRadius: 999,
                                            borderBottomLeftRadius: 999,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <ShowChart />
                                        <Typography fontSize={12} color="white">
                                            Viewers +0
                                        </Typography>
                                        <ChevronRight />
                                    </Box>
                                    <Box
                                        sx={{
                                            backgroundColor: "#03002BCC",
                                            borderTopLeftRadius: '7px',
                                            borderBottomLeftRadius: '7px',
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <Typography fontSize={12} color="white" sx={{ ml: 2 }}>
                                            Add Live Goal
                                        </Typography>
                                        <img src={LiveGoal} alt="" />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <div style={{ display: "column" }}>
                                            <Typography fontSize={14} color="white" sx={{textAlign:'start',mb:0.5}} >
                                                0/2
                                            </Typography>
                                            <img src={HorizontalLine} alt="" />
                                        </div>
                                        <div style={{ display: "column" }}>
                                            <img src={HeartReact} alt="" style={{textAlign:'center',marginBottom:'0px',}} />
                                            <Typography className="live-timer" fontSize={9}>
                                                2h11m
                                            </Typography>
                                        </div>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ position: "absolute", bottom: 7, left: 8 }}>
                                <Button
                                    sx={{
                                        border: 'none',
                                        padding: 1,
                                        display: 'inline-flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: 'transparent',

                                        textTransform: 'none',
                                        minWidth: 'auto',
                                        color: 'white',

                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                        },
                                        '&:active': {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                        },
                                        '&:focus': {
                                            outline: 'none',
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    <img
                                        src={HostIcon}
                                        alt="Hosts"
                                        style={{ width: '29px', marginBottom: '5px' }}
                                    />
                                    <Typography fontSize={12} color="white" sx={{ fontWeight: 500 }}>
                                        +Hosts
                                    </Typography>
                                </Button>
                                <Button
                                    sx={{
                                        border: 'none',
                                        padding: 1,
                                        display: 'inline-flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: 'transparent',

                                        textTransform: 'none',
                                        minWidth: 'auto',
                                        color: 'white',

                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                        },
                                        '&:active': {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                        },
                                        '&:focus': {
                                            outline: 'none',
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    <img src={GuestIcon} alt="Guests" style={{ width: '23px', marginBottom: '5px' }} />
                                    <Typography fontSize={12} color="white" sx={{ fontWeight: 500 }}>
                                        +Guests
                                    </Typography>
                                </Button>
                            </Box>
                            {!showMore && (
                                <Box sx={{ position: "absolute", bottom: 0, right: 0, }}>
                                    <Box
                                        sx={{
                                            px: 3,
                                            py: 2,
                                        }}
                                    >
                                        {/* FIRST ROW - changes depending on expanded */}
                                        <Box display="flex" justifyContent="space-between" gap={3}>
                                            <ControlItem icon={<img style={{ width: 24 }} src={InteractIcon} alt="Interact" />} label="Interact" />
                                            <ControlItem icon={<img style={{ width: 24 }} src={ShareIcon} alt="Share" />} label="Share" />
                                            <ControlItem icon={<img style={{ width: 24 }} src={EnhanceIcon} alt="Enhance" />} label="Enhance" />
                                            <ControlItem onClick={toggleSettings} icon={<img style={{ width: 24 }} src={MoreIcon} alt="More" />} label="More" />
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        {/* User details */}
                        <Box
                            sx={{
                                gap: 1.5,
                                p: 2,
                                color: 'white',
                                borderRadius: 2,
                                width: 'fit-content',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: '#000' }}>
                                Chillin' with the Crew – Family Edition
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.8,
                                }}
                            >
                                <Avatar
                                    alt="MBY"
                                    src={AvatarPostLive}
                                    sx={{ width: 32, height: 32, border: '1px solid white' }}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.8,
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1, color: '#000' }}>
                                        MBY
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#000' }}>
                                        1.9K
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <SidebarChat selectedLiveVideo={selectedLiveVideo} />
                    {/* Right Sidebar */}
                    {/* <Box sx={{ width: 400, }}>
                        {!showEditLiveGoal && !showFaqs && !openSettings && <Card sx={{ p: 1, boxShadow: "none" }}>
                            <Box sx={{ position: "absolute" }}>
                                <CardMedia
                                    sx={{
                                        maxWidth: 100,
                                        height: 100,
                                        borderRadius: 3,
                                        p: 1

                                    }}
                                    component="img"
                                    image="data:image/jpeg;base64,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"
                                    alt="Thumbnail"
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 8,
                                        left: '10%',
                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                        color: "#fff",
                                        padding: "2px 8px",
                                        borderRadius: 1,
                                        fontSize: 12,
                                        width: "80%",
                                    }}
                                >
                                    Change
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "#F1F1F2",
                                    px: 2,
                                    py: 1,
                                    pl: 14,
                                    display: "flex",
                                    alignItems: "flex-start",
                                    height: "6.25rem"
                                }}
                            >
                                <Typography variant="body2" color="textSecondary">
                                    Add a title
                                    <IconButton size="small">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="feather feather-edit" fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    </IconButton>
                                </Typography>

                            </Box>
                            <CardContent sx={{ padding: 0 }}>
                                <Divider />
                                <Button
                                    fullWidth

                                    sx={{
                                        mt: 1,
                                        justifyContent: "flex-start",
                                        textTransform: "none",
                                        fontSize: 14,
                                        color: "#333",
                                        padding: "6px 10px",
                                        backgroundColor: "#F1F1F2",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <svg className="pr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="#FFBE3C" />
                                        <path d="M15.944 10.816L15.416 13.28H17.448V15.28H14.984L14.408 18H12.28L12.856 15.28H9.944L9.368 18H7.256L7.832 15.28H5.416V13.28H8.264L8.792 10.816H6.392V8.816H9.224L9.784 6.16H11.896L11.336 8.816H14.248L14.808 6.16H16.936L16.376 8.816H18.424V10.816H15.944ZM13.816 10.816H10.904L10.376 13.28H13.288L13.816 10.816Z" fill="white" />
                                    </svg>
                                    Add topic 01
                                </Button>

                                <Button
                                    fullWidth

                                    sx={{
                                        mt: 1,
                                        justifyContent: "flex-start",
                                        textTransform: "none",
                                        fontSize: 14,
                                        color: "#333",
                                        padding: "6px 10px",
                                        backgroundColor: "#F1F1F2",
                                        borderRadius: "8px",
                                    }}
                                    onClick={() => setShowEditLiveGoal(!showEditLiveGoal)}
                                >
                                    <svg className="pr-1" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.0019 4.84011C19.9759 4.68445 19.9134 4.53716 19.8195 4.41028C19.7257 4.28341 19.6031 4.18054 19.4619 4.11011L17.7619 3.25011L16.9019 1.55011C16.8317 1.40578 16.7279 1.28046 16.5991 1.18473C16.4703 1.08901 16.3203 1.02568 16.1619 1.00011C16.0051 0.97428 15.8443 0.986208 15.693 1.0349C15.5417 1.0836 15.4042 1.16765 15.2919 1.28011L13.2919 3.28011C13.198 3.37473 13.124 3.48718 13.0742 3.61082C13.0244 3.73447 12.9998 3.86682 13.0019 4.00011V6.59011L9.29189 10.2901C9.19816 10.3831 9.12377 10.4937 9.073 10.6155C9.02223 10.7374 8.99609 10.8681 8.99609 11.0001C8.99609 11.1321 9.02223 11.2628 9.073 11.3847C9.12377 11.5065 9.19816 11.6171 9.29189 11.7101C9.38486 11.8038 9.49546 11.8782 9.61732 11.929C9.73917 11.9798 9.86988 12.0059 10.0019 12.0059C10.1339 12.0059 10.2646 11.9798 10.3865 11.929C10.5083 11.8782 10.6189 11.8038 10.7119 11.7101L14.4119 8.00011H17.0019C17.1335 8.00087 17.264 7.97564 17.3858 7.92588C17.5076 7.87611 17.6185 7.80279 17.7119 7.71011L19.7119 5.71011C19.8261 5.59874 19.9121 5.46166 19.9625 5.31031C20.013 5.15896 20.0265 4.99774 20.0019 4.84011Z" fill="#2CA9BC" />
                                        <path d="M10 21C7.34784 21 4.8043 19.9464 2.92893 18.0711C1.05357 16.1957 0 13.6522 0 11C0 8.34784 1.05357 5.8043 2.92893 3.92893C4.8043 2.05357 7.34784 1 10 1C10.2652 1 10.5196 1.10536 10.7071 1.29289C10.8946 1.48043 11 1.73478 11 2C11 2.26522 10.8946 2.51957 10.7071 2.70711C10.5196 2.89464 10.2652 3 10 3C8.41775 3 6.87103 3.46919 5.55544 4.34824C4.23984 5.22729 3.21447 6.47672 2.60896 7.93853C2.00346 9.40034 1.84504 11.0089 2.15372 12.5607C2.4624 14.1126 3.22433 15.538 4.34315 16.6569C5.46197 17.7757 6.88743 18.5376 8.43928 18.8463C9.99113 19.155 11.5997 18.9965 13.0615 18.391C14.5233 17.7855 15.7727 16.7602 16.6518 15.4446C17.5308 14.129 18 12.5823 18 11C18 10.7348 18.1054 10.4804 18.2929 10.2929C18.4804 10.1054 18.7348 10 19 10C19.2652 10 19.5196 10.1054 19.7071 10.2929C19.8946 10.4804 20 10.7348 20 11C20 13.6522 18.9464 16.1957 17.0711 18.0711C15.1957 19.9464 12.6522 21 10 21ZM15 11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11C13 11.5933 12.8241 12.1734 12.4944 12.6667C12.1648 13.1601 11.6962 13.5446 11.1481 13.7716C10.5999 13.9987 9.99667 14.0581 9.41473 13.9424C8.83279 13.8266 8.29824 13.5409 7.87868 13.1213C7.45912 12.7018 7.1734 12.1672 7.05764 11.5853C6.94189 11.0033 7.0013 10.4001 7.22836 9.85195C7.45542 9.30377 7.83994 8.83524 8.33329 8.50559C8.82664 8.17595 9.40666 8 10 8C10.2652 8 10.5196 7.89464 10.7071 7.70711C10.8946 7.51957 11 7.26522 11 7C11 6.73478 10.8946 6.48043 10.7071 6.29289C10.5196 6.10536 10.2652 6 10 6C9.01109 6 8.04439 6.29324 7.22215 6.84265C6.3999 7.39206 5.75904 8.17295 5.3806 9.08658C5.00216 10.0002 4.90315 11.0055 5.09607 11.9755C5.289 12.9454 5.7652 13.8363 6.46447 14.5355C7.16373 15.2348 8.05464 15.711 9.02455 15.9039C9.99445 16.0969 10.9998 15.9978 11.9134 15.6194C12.827 15.241 13.6079 14.6001 14.1573 13.7779C14.7068 12.9556 15 11.9889 15 11Z" fill="#B4B4B4" />
                                    </svg>
                                    Edit your LIVE Goal
                                </Button>
                                <Button
                                    fullWidth

                                    sx={{
                                        mt: 1,
                                        justifyContent: "flex-start",
                                        textTransform: "none",
                                        fontSize: 14,
                                        color: "#333",
                                        padding: "6px 10px",
                                        backgroundColor: "#F1F1F2",
                                        borderRadius: "8px",
                                    }}
                                    onClick={() => setShowFaqs(!showFaqs)}
                                >
                                    <svg className="pr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="#FFBE3C" />
                                        <path d="M15.944 10.816L15.416 13.28H17.448V15.28H14.984L14.408 18H12.28L12.856 15.28H9.944L9.368 18H7.256L7.832 15.28H5.416V13.28H8.264L8.792 10.816H6.392V8.816H9.224L9.784 6.16H11.896L11.336 8.816H14.248L14.808 6.16H16.936L16.376 8.816H18.424V10.816H15.944ZM13.816 10.816H10.904L10.376 13.28H13.288L13.816 10.816Z" fill="white" />
                                    </svg>
                                    Faqs
                                </Button>
                            </CardContent>
                        </Card>
                        }
                        {showEditLiveGoal && <EditLiveGoal onConfirm={() => setShowEditLiveGoal(!showEditLiveGoal)} onLiveGoalAdded={(goals) => setShowEditLiveGoal(!showEditLiveGoal)} />}
                        {showFaqs && <LiveGoalFAQ onBack={() => console.log('Back pressed')} />}
                        {openSettings &&
                            <SettingsPanel />
                        }
                    </Box> */}
                </div>
            </div>
        </div>
    );
}

function ControlItem({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton sx={{ color: "white" }} onClick={onClick}>
                {icon}
            </IconButton>
            <Typography fontSize={12}>{label}</Typography>
        </Box>
    );
}