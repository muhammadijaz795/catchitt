import { useEffect, useState } from 'react';
import Layout from '../../shared/layout';
import whiteRightArrow from './svg-components/whiteRightArrow.svg';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ANALYTICS_OVERVIEW_TIME_PERIODS, ANALYTICSTABS } from '../../utils/constants';
import OverviewTab from './OverviewTab';
import ContentTab from './ContentTab';
import ViewersTab from './ViewersTab';
import FollowersTab from './FollowersTab';
import styles from './style.module.scss'
import { Divider, MenuItem, Menu, ThemeProvider, createTheme, Dialog, DialogTitle, DialogContent, Typography, RadioGroup, FormControlLabel, Radio, DialogActions, Button } from '@mui/material';
import { logo, logoAuth, logoAuthWhite } from '../../icons';
import React from 'react';
import Navbar from '../../shared/navbar';
import { academyOutlineDark, academyOutlineWhite, analyticsOutline, analyticsOutlineWhite, bulbOutlineDark, bulbOutlineWhite, commentOutlineDark, commentOutlineWhite, commentWhite, feedbackQuestionDark, feedbackQuestionWhite, hamburger, hamburgerDark, homeDark, homeIcon } from '../../icons';
import CheckIcon from '@mui/icons-material/Check'; // import for tick icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // chevron
import UploadSidebar from '../studio/UploadSidebar';
import { useTranslation } from 'react-i18next';

const Analytics = () => {
    const { t: translate } = useTranslation();
    const { tab } = useParams();
    const [currentTab, setCurrentTab] = useState(ANALYTICSTABS.OVERVIEW);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    // const [startDate, setStartDate] = useState('02-1-2024');
    // const [endDate, setEndDate] = useState('03-18-2024');
    const [analyticsData, setAnalyticsData] = useState<any>('');
    const [selectedPeriod, setSelectedPeriod] = useState(7);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [logo, setLogo] = useState(logoAuth);
    const [analyticsDetails, setAnalyticsDetails] = useState<any>(
        {
            details: [],
            isLoading: false,
        }
    );

    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const switchTab = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setCurrentTab(Number(event.currentTarget.id));
    }

    function loadAnalyticsDetails()
    {
        let endpoint = `${process.env.VITE_API_URL}/profile/v2/media-analytics?days=${selectedPeriod}`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };

        setAnalyticsDetails((prev: any) => ({ ...prev, isLoading: true }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => setAnalyticsDetails((prev: any) => ({ ...prev, details: response.data, isLoading: false })))
        .catch((error) => console.error('Fetch error:', error));
    };


    const getUserAnalytics = async (period = 7) => {
        try {
            const periodsInMiliSecond = 1000 * 60 * 60 * 24 * period;
            const gap = Date.now() - periodsInMiliSecond;
            const startingDate = new Date(gap)
            const today = new Date();
            const startDate = `${startingDate.getFullYear()}-${String(startingDate.getMonth() + 1).padStart(2, '0')}-${String(startingDate.getDate()).padStart(2, '0')}`;
            const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            const response = await fetch(
                `${API_KEY}/analytics/web-user?startDate=${startDate}&endDate=${endDate}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            const data = res?.data;
            setAnalyticsData(data);
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };

    useEffect(() => {
        switch (tab) {
            case 'overview':
                setCurrentTab(ANALYTICSTABS.OVERVIEW);
                break;
            case 'content':
                setCurrentTab(ANALYTICSTABS.CONTENT);
                break;
            case 'viewers':
                setCurrentTab(ANALYTICSTABS.VIEWERS);
                break;
            case 'followers':
                setCurrentTab(ANALYTICSTABS.FOLLOWERS);
                break;
            default:
                break;
        }
    }, [])

    const [openDownload, setOpenDownload] = useState(false);
    const [fileFormat, setFileFormat] = useState<'XLSX' | 'CSV'>('XLSX');
    
    const handleOpen = () => setOpenDownload(true);
    const handleClose = () => setOpenDownload(false);
    const handleDownload = () => {
      console.log("Download as:", fileFormat);
      // Trigger your export logic here
      setOpenDownload(false);
    };
    
    useEffect(() => {
        getUserAnalytics(selectedPeriod);
        loadAnalyticsDetails();
    }, [selectedPeriod]);

    const [darkTheme, setdarkTheme] = useState<any>('');
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == "dark") {
            setdarkTheme(styles.darkTheme);
            setLogo(logoAuthWhite);
        } else {
            setLogo(logoAuth);
        }
    });

    const lightThemePalette = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkThemePalette = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <div className={`flex flex-col ${darkTheme}`}>       
            {/* <Navbar /> */}
            <UploadSidebar />
            <div className='w-[calc(100%-14rem)]  ml-auto '>
            {/* <Layout> */}
                <ThemeProvider theme={darkTheme === '' ? lightThemePalette : darkThemePalette}>
                    <header className={`text-gray-600 body-font ${darkTheme === '' ? 'bg-white' : styles.header} border-b px-4`}>
                        <div className="flex flex-wrap flex-col md:flex-row items-center justify-between">
                            <nav className="flex flex-wrap items-center text-base text-gray-400">
                                <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.OVERVIEW ? 'text-black font-semibold border-b-2 border-gray-800' : ''} py-3 mr-5 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.OVERVIEW.toString()}>{translate('Overview')}</a>
                                <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.CONTENT ? 'text-black font-semibold border-b-2 border-gray-800' : ''} py-3 mr-5 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.CONTENT.toString()}>{translate('Content')}</a>
                                <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.VIEWERS ? 'text-black font-semibold border-b border-gray-800' : ''} py-3 mr-5 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.VIEWERS.toString()}>{translate('Viewers')}</a>
                                <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.FOLLOWERS ? 'text-black font-semibold border-b border-gray-800' : ''} py-3 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.FOLLOWERS.toString()}>{translate('Followers')}</a>
                            </nav>
                            <div className="inline-flex lg:justify-end ml-5 lg:ml-0 my-2">
                            <button
                                        aria-label="duration-period"
                                        id="duration-period"
                                        aria-controls={open ? 'duration-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                        className={`inline-flex mx-2 items-center gap-1 border border-gray-300 py-2 px-3 focus:outline-none rounded-full text-sm ${
                                            darkTheme === '' ? 'bg-transparent hover:bg-gray-100 text-black' : 'bg-transparent hover:bg-gray-900 text-white'
                                        }`}
                                        >
                                        {translate('Last')} {selectedPeriod} {translate('Days')}
                                        <ExpandMoreIcon fontSize="small" />
                                    </button>

                                    {/* Menu Items */}
                                    <Menu
                                    id="duration-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'duration-period',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}
                                    slotProps={{
                                        paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            padding: '10px',
                                            border: '1px solid #ddd',
                                            mt: 1.5,
                                            '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                            },
                                        },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                    {Object.keys(ANALYTICS_OVERVIEW_TIME_PERIODS).map((period: string, index: number) => {
                                        const value = ANALYTICS_OVERVIEW_TIME_PERIODS[period as keyof typeof ANALYTICS_OVERVIEW_TIME_PERIODS];
                                        const isSelected = value === selectedPeriod;
                                        return (
                                        <MenuItem
                                            key={index}
                                            onClick={() => {
                                            setSelectedPeriod(value);
                                            setAnchorEl(null);
                                            }}
                                            sx={{
                                            fontWeight: isSelected ? 600 : 300,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            }}
                                        >
                                            {period}
                                            {isSelected && <CheckIcon fontSize="small" sx={{ color: '#000' }} />}
                                            
                                        </MenuItem>
                                        );
                                    })}
                                    </Menu>
                                <button onClick={handleOpen} className={`inline-flex gap-1 items-center ${darkTheme === '' ? 'bg-gray-100' : 'bg-gray-800'}  border-0 py-2 px-3 focus:outline-none ${darkTheme === '' ? 'hover:bg-gray-200' : 'hover:bg-gray-900'} rounded-full text-sm`}>
                                    <svg
                                        fill="#000000"
                                        version="1.1"
                                        id="Capa_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 537.794 537.795"
                                        xmlSpace="preserve"
                                        width={15}
                                        height={15}
                                    >
                                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <g>
                                                {" "}
                                                <g>
                                                    {" "}
                                                    <path d="M463.091,466.114H74.854c-11.857,0-21.497,9.716-21.497,21.497v28.688c0,11.857,9.716,21.496,21.497,21.496h388.084 c11.857,0,21.496-9.716,21.496-21.496v-28.688C484.665,475.677,474.949,466.114,463.091,466.114z" />{" "}
                                                    <path d="M253.94,427.635c4.208,4.208,9.716,6.35,15.147,6.35c5.508,0,11.016-2.142,15.147-6.35l147.033-147.033 c8.339-8.338,8.339-21.955,0-30.447l-20.349-20.349c-8.339-8.339-21.956-8.339-30.447,0l-75.582,75.659V21.497 C304.889,9.639,295.173,0,283.393,0h-28.688c-11.857,0-21.497,9.562-21.497,21.497v284.044l-75.658-75.659 c-8.339-8.338-22.032-8.338-30.447,0l-20.349,20.349c-8.338,8.338-8.338,22.032,0,30.447L253.94,427.635z" />{" "}
                                                </g>{" "}
                                            </g>{" "}
                                        </g>
                                    </svg>
                                    {translate('Download data')}
                                </button>
                            </div>
                        </div>
                    </header>

                   <div className='px-3'>
                        {(() => {
                                switch (currentTab) {
                                    case ANALYTICSTABS.OVERVIEW:
                                        return <OverviewTab analyticsDetails={analyticsDetails} analyticsData={analyticsData} isDarkTheme={!!darkTheme} />
                                    case ANALYTICSTABS.CONTENT:
                                        return <ContentTab isDarkTheme={darkTheme} selectedPeriod={selectedPeriod} key={selectedPeriod} />
                                    case ANALYTICSTABS.VIEWERS:
                                        return <ViewersTab analyticsDetails={analyticsDetails} selectedPeriod={selectedPeriod} />
                                    case ANALYTICSTABS.FOLLOWERS:
                                        return <FollowersTab analyticsDetails={analyticsDetails} selectedPeriod={selectedPeriod} />
                                    default:
                                        return <OverviewTab analyticsDetails={analyticsDetails} analyticsData={analyticsData} isDarkTheme={!!darkTheme} />
                                }
                            })()}
                   </div>
                   <Dialog open={openDownload} 
                    PaperProps={{
                        sx: {
                        width: '350px',
                        m: 'auto', 
                        borderRadius: 2, 
                        },
                    }}
                   onClose={handleClose}>
                        <DialogTitle component="div" sx={{ fontWeight: 600 }}>{translate('Download Overview data')}</DialogTitle>
                        <DialogContent>
                            <Typography sx={{ mb: 1 }}>{translate('Select a file format')}:</Typography>
                            <RadioGroup
                            row
                            value={fileFormat}
                            onChange={(e) => setFileFormat(e.target.value as 'XLSX' | 'CSV')}
                            >
                            <FormControlLabel
                                value="XLSX"
                                control={<Radio sx={{ color: '#f50057', '&.Mui-checked': { color: '#f50057' } }} />}
                                label="XLSX"
                            />
                            <FormControlLabel value="CSV" control={<Radio sx={{ color: '#f50057', '&.Mui-checked': { color: '#f50057' } }} />} label="CSV"  />
                            </RadioGroup>
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button onClick={handleClose} variant="contained"  sx={{ mr: 1, backgroundColor: '#0000000D', color: '#000', textTransform: 'capitalize', boxShadow: 'none' }}>
                            {translate('Cancel')}
                            </Button>
                            <Button onClick={handleDownload} variant="contained" sx={{boxShadow: 'none', backgroundColor: '#f50057', color: '#fff', textTransform: 'capitalize'}}>
                            {translate('Download')}
                            </Button>
                        </DialogActions>
                        </Dialog>
                </ThemeProvider>
            {/* </Layout> */}
            </div>
        </div>
    )

    // return (
    //     <Layout>
    //         <div className="p-4">
    //             <div
    //                 onClick={currentTabToggler}
    //                 className="flex flex-row justify-between items-center mt-8 gap-5 px-4"
    //             >
    //                 <div className="flex justify-center items-center flex-col flex-1 cursor-pointer">
    //                     <p className="flex-1 text-pink-400 text-xl">Overview</p>
    //                     {currentTab === 0 && (
    //                         <div className="h-1 w-full bg-pink-500 mt-3 rounded" />
    //                     )}
    //                 </div>
    //                 <div className="flex justify-center items-center flex-col flex-1 cursor-pointer">
    //                     <p className="flex-1 text-pink-400 text-xl">Content</p>
    //                     {currentTab === 1 && (
    //                         <div className="h-1 w-full bg-pink-500 mt-3 rounded" />
    //                     )}
    //                 </div>
    //             </div>
    //             {currentTab === 0 ? (
    //                 <>
    //                     <div className="flex flex-row justify-between items-center mt-10 ml-1">
    //                         <p className="flex-1 font-bold text-lg text-left">May 06 - May 13</p>
    //                         <div className="border border-pink-400 flex-1 rounded">
    //                             <p className="p-1 text-pink-400">Last 7 days</p>
    //                         </div>
    //                     </div>
    //                     <div className="text-left mt-3 flex flex-row items-center w-fit gap-2 ml-1">
    //                         <span className="font-bold text-lg">Key Metrics</span>
    //                         <div className="p-2 h-3 w-3 rounded-full border border-pink-400 flex justify-center items-center">
    //                             <p className="text-sm font-normal text-pink-500">i</p>
    //                         </div>
    //                     </div>
    //                     <div className="flex flex-row justify-between items-center mt-2 gap-4 cursor-pointer">
    //                         <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
    //                             <p className="text-white font-medium text-2xl">Video Views</p>
    //                             <p className="text-white font-bold text-xl mt-2">{analyticsData.videoViews}</p>
    //                         </div>
    //                         <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
    //                             <p className="text-white font-medium text-2xl">Profile Views</p>
    //                             <p className="text-white font-bold text-xl mt-2">{analyticsData.profileViews}</p>
    //                         </div>
    //                     </div>
    //                     <div className="flex flex-row justify-between items-center mt-4 gap-4 cursor-pointer">
    //                         <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
    //                             <p className="text-white font-medium text-2xl">Likes</p>
    //                             <p className="text-white font-bold text-xl mt-2">{analyticsData.likes}</p>
    //                         </div>
    //                         <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
    //                             <p className="text-white font-medium text-2xl">Comments</p>
    //                             <p className="text-white font-bold text-xl mt-2">{analyticsData.comments}</p>
    //                         </div>
    //                     </div>
    //                     <div className="flex flex-row justify-between items-center mt-4 mr-4 cursor-pointer">
    //                         <div className="h-56 w-1/2 bg-pink-500 rounded border border-gray-50 flex flex-col justify-center items-start p-4">
    //                             <p className="text-white font-medium text-2xl">Shares</p>
    //                             <p className="text-white font-bold text-xl mt-2">{analyticsData.shares}</p>
    //                         </div>
    //                     </div>
    //                     <div className="text-left mt-2 flex flex-row items-center w-fit gap-2 ">
    //                         <span className="font-medium text-xl mt-3">Video Views</span>
    //                     </div>
    //                     <div className="mt-2 flex flex-row items-end justify-end">
    //                         <p className="font-medium text-xl mt-3">1</p>
    //                     </div>
    //                     <div className="mt-2 flex flex-row items-center justify-between gap-2">
    //                         <p className="flex-1">
    //                             ------------------------------------------------------------------------------------------------------------
    //                         </p>
    //                         <p className="font-medium text-xl">0.5</p>
    //                     </div>
    //                     <div className="mt-2 flex flex-row items-center justify-between gap-2">
    //                         <p className="flex-1">
    //                             ------------------------------------------------------------------------------------------------------------
    //                         </p>
    //                         <p className="font-medium text-xl">0</p>
    //                     </div>
    //                     <div className="mt-2 flex flex-row items-center justify-between gap-2">
    //                         <p className="flex-1">
    //                             ------------------------------------------------------------------------------------------------------------
    //                         </p>
    //                         <p className="font-medium text-xl">-0.5</p>
    //                     </div>
    //                     <div className="mt-2 flex flex-row items-center justify-between gap-2">
    //                         <p className="font-medium text-xl">0</p>
    //                         <p className="font-medium text-xl">-1</p>
    //                     </div>
    //                     <div className="flex flex-row justify-between items-center mt-3">
    //                         <p className="font-medium text-xl ">For your inspiration</p>
    //                         <div className="flex flex-row items-center gap-1">
    //                             <p className="font-medium text-pink-500">View All</p>
    //                             <img
    //                                 className="text-pink-500 h-4 w-4"
    //                                 src={whiteRightArrow}
    //                                 alt=""
    //                             />
    //                         </div>
    //                     </div>
    //                     <p className="font-medium text-base text-left mt-2 text-gray-400">
    //                         Discover Trending videos similar to yours
    //                     </p>
    //                 </>
    //             ) : (
    //                 <>
    //                     <div className="mt-12">
    //                         <div className="text-left flex flex-row items-center w-fit gap-2 mt-4">
    //                             <p className="font-bold text-xl">Video posts</p>
    //                             <div className="p-2 h-3 w-3 rounded-full border border-pink-400 flex justify-center items-center">
    //                                 <p className="text-sm font-normal text-pink-500">i</p>
    //                             </div>
    //                         </div>
    //                         <p className="font-medium text-lg text-left mt-3 text-gray-400">
    //                             You created 0 new posts in the last 7 days.
    //                         </p>
    //                         <div className="rounded-xl flex justify-center items-center bg-pink-500 w-fit py-2 px-3 mt-3 cursor-pointer" onClick={() => navigate('/upload')}>
    //                             <p className="text-white text-lg font-normal">Create post</p>
    //                         </div>
    //                     </div>
    //                     <div className="w-full bg-gray-400 h-[1px] rounded mt-6" />
    //                     <div className="mt-4">
    //                         <div className="text-left flex flex-row items-center w-fit gap-2 mt-4">
    //                             <p className="font-bold text-xl">Trending videos</p>
    //                             <div className="p-2 h-3 w-3 rounded-full border border-pink-400 flex justify-center items-center">
    //                                 <p className="text-sm font-normal text-pink-500">i</p>
    //                             </div>
    //                         </div>
    //                         <p className="font-medium text-lg text-left mt-3 text-gray-400">
    //                             Last 7 days
    //                         </p>
    //                     </div>
    //                 </>
    //             )}
    //         </div>
    //     </Layout>
    // );
};

export default Analytics;