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

const Analytics = () => {
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

    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const switchTab = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setCurrentTab(Number(event.currentTarget.id));
    }


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
            <div className={`w-56 h-[100vh] fixed top-0 border-r left-0 ${darkTheme === '' ? 'bg-white' : 'bg-[#181818a8]'}  flex flex-col`}>
                <div onClick={() => navigate('/')} className='border-bottom flex align-items-center px-3 h-14 '>
                    <img className='w-[90px] h-[36px]' src={logo} alt="" />
                </div>
               <div className='pb-3 px-3'>
               <button className={`${darkTheme === '' ? 'bg-[#FE2C55] hover:bg-[#FE2C69]' : 'bg-[#FE2C55]'} w-full ring-0 hover:border-transparent rounded-md my-3 py-1.5 text-white opacity-80 d-flex`} > 
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75473 3.46875C9.21443 3.46875 9.58752 3.84184 9.58752 4.30154V8.13238H13.4184C13.6392 8.13238 13.8511 8.22012 14.0072 8.3763C14.1634 8.53248 14.2512 8.74431 14.2512 8.96518C14.2512 9.18605 14.1634 9.39787 14.0072 9.55405C13.8511 9.71023 13.6392 9.79797 13.4184 9.79797H9.58752V13.6288C9.58752 13.8497 9.49978 14.0615 9.3436 14.2177C9.18742 14.3739 8.9756 14.4616 8.75473 14.4616C8.53386 14.4616 8.32203 14.3739 8.16585 14.2177C8.00967 14.0615 7.92193 13.8497 7.92193 13.6288V9.79797H4.09109C3.87022 9.79797 3.6584 9.71023 3.50222 9.55405C3.34604 9.39787 3.2583 9.18605 3.2583 8.96518C3.2583 8.74431 3.34604 8.53248 3.50222 8.3763C3.6584 8.22012 3.87022 8.13238 4.09109 8.13238H7.92193V4.30154C7.92193 3.84184 8.29502 3.46875 8.75473 3.46875Z" fill="white"/>
                    </svg> 
                    Upload
                </button>
                <h5 className='text-sm font-semibold text-left text-[#00000057]'>Manage</h5>
                <ul className='text-sm space-y-6 mt-3 text-left mx-2'>
                    <li className='cursor-pointer flex gap-2'>
                        <Link to="/studio" reloadDocument={false} style={{ textDecoration: 'none' }} className='cursor-pointer flex gap-2'>
                            <img className='w-5 inline-block' src={darkTheme===''?homeDark:homeIcon} alt="" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/analytics/content')}>
                        <img className='w-4 inline-block' src={darkTheme===''?hamburgerDark :hamburger} alt="" />
                        <span>&nbsp;Posts</span>
                    </li>
                    <li className='cursor-pointer flex gap-2'>
                        <Link to="/studio/comment" reloadDocument={false} style={{ textDecoration: 'none' }} className='cursor-pointer flex gap-2'>
                            <img className='w-5 inline-block' src={darkTheme===''?commentOutlineDark:commentOutlineWhite} alt="" />
                            <span>Comments</span>
                        </Link>
                    </li>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/analytics')}>
                        <img className='w-5 inline-block' src={darkTheme===''?analyticsOutline:analyticsOutlineWhite} alt="" />
                        <span>Analytics</span>
                    </li>
                    {/* <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?bulbOutlineDark:bulbOutlineWhite} alt="" />
                        <span>Inspirations</span>
                    </li>
                    <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?academyOutlineDark :academyOutlineWhite} alt="" />
                        <span>Creator Academy</span>
                    </li> */}
                </ul>
                <h5 className='text-sm font-semibold text-left text-[#00000057] mt-4'>Tools</h5>
                <ul className='text-sm space-y-6 mt-3 text-left mx-2'>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/home')}>
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.10255 0.410156C4.71094 0.410156 3.37632 0.962972 2.3923 1.94699C1.40828 2.93101 0.855469 4.26563 0.855469 5.65724C0.855469 7.12567 1.26399 8.00044 2.16724 9.0536L2.40111 9.3347C2.93406 9.9561 3.10422 10.2949 3.10422 10.9043V12.4035C3.10422 13.1987 3.42011 13.9613 3.98241 14.5236C4.54471 15.0859 5.30734 15.4018 6.10255 15.4018C6.89776 15.4018 7.6604 15.0859 8.22269 14.5236C8.78499 13.9613 9.10089 13.1987 9.10089 12.4035V10.9043C9.10089 10.2949 9.27104 9.9561 9.804 9.3347C9.84147 9.29122 9.99589 9.10308 10.0379 9.0536C10.9411 8.00044 11.3496 7.12567 11.3496 5.65724C11.3496 4.26563 10.7968 2.93101 9.8128 1.94699C8.82878 0.962972 7.49416 0.410156 6.10255 0.410156ZM6.10255 1.90932C7.09656 1.90932 8.04986 2.30419 8.75273 3.00706C9.4556 3.70993 9.85047 4.66323 9.85047 5.65724C9.85047 6.71865 9.60311 7.2651 8.91349 8.07015C8.87451 8.11512 8.69611 8.30402 8.65563 8.35124C8.12118 8.9749 7.8101 9.53558 7.67443 10.1592C6.72396 10.1592 5.4789 10.163 4.52843 10.163C4.3935 9.53858 4.08392 8.9749 3.54947 8.35124C3.50899 8.30402 3.33059 8.11512 3.29161 8.07015C2.602 7.2651 2.35464 6.71865 2.35464 5.65724C2.35464 4.66323 2.7495 3.70993 3.45237 3.00706C4.15525 2.30419 5.10854 1.90932 6.10255 1.90932ZM6.10255 3.40849C5.50615 3.40849 4.93417 3.64541 4.51245 4.06713C4.09072 4.48886 3.8538 5.06083 3.8538 5.65724C3.8538 5.85604 3.93278 6.0467 4.07335 6.18727C4.21392 6.32785 4.40458 6.40682 4.60339 6.40682C4.80219 6.40682 4.99285 6.32785 5.13342 6.18727C5.27399 6.0467 5.35297 5.85604 5.35297 5.65724C5.35297 5.45844 5.43194 5.26778 5.57252 5.1272C5.71309 4.98663 5.90375 4.90766 6.10255 4.90766C6.30135 4.90766 6.49201 4.82868 6.63259 4.68811C6.77316 4.54753 6.85214 4.35687 6.85214 4.15807C6.85214 3.95927 6.77316 3.76861 6.63259 3.62804C6.49201 3.48746 6.30135 3.40849 6.10255 3.40849ZM4.60339 11.6539H7.60172V12.4035C7.60172 12.8011 7.44377 13.1824 7.16262 13.4636C6.88147 13.7447 6.50016 13.9027 6.10255 13.9027C5.70495 13.9027 5.32363 13.7447 5.04248 13.4636C4.76133 13.1824 4.60339 12.8011 4.60339 12.4035V11.6539Z" fill="black" fill-opacity="0.65"/>
                        </svg>
                        <span>Inspirations</span>
                    </li>
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/analytics/content')}>
                    <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        >
                        <path
                            d="M7.82993 5.1239L7.23414 6.39417L5.89943 6.59651C5.71582 6.62349 5.6791 6.75539 5.81174 6.89103L6.77775 7.88626L6.54917 9.26745C6.5177 9.4593 6.63161 9.54248 6.79498 9.4518L7.98956 8.78857L9.16615 9.4518C9.32952 9.54248 9.44344 9.4593 9.41196 9.26745L9.18339 7.88626L10.1494 6.89103C10.2828 6.75614 10.2453 6.62424 10.0617 6.59651L8.72699 6.39417L8.1297 5.12315C8.04876 4.94853 7.91237 4.94853 7.83143 5.12315"
                            fill="currentColor"
                            fillOpacity="0.65"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.35673 1.62109C4.56152 1.62109 3.79889 1.93699 3.23659 2.49929C2.67429 3.06158 2.3584 3.82422 2.3584 4.61943V13.9892C2.3584 14.685 2.63481 15.3523 3.12682 15.8443C3.61883 16.3364 4.28613 16.6128 4.98194 16.6128H15.0938C15.2946 16.6128 15.4872 16.533 15.6292 16.391C15.7711 16.249 15.8509 16.0565 15.8509 15.8557V5.37651C15.8509 5.27709 15.8313 5.17864 15.7933 5.08678C15.7552 4.99493 15.6995 4.91147 15.6292 4.84117C15.5589 4.77087 15.4754 4.7151 15.3835 4.67706C15.2917 4.63901 15.1932 4.61943 15.0938 4.61943H13.6021V2.37817C13.6021 2.27875 13.5826 2.1803 13.5445 2.08845C13.5065 1.9966 13.4507 1.91314 13.3804 1.84284C13.3101 1.77254 13.2266 1.71677 13.1348 1.67872C13.0429 1.64068 12.9445 1.62109 12.8451 1.62109H5.35673ZM4.98194 15.1136C4.68374 15.1136 4.39775 14.9951 4.18689 14.7843C3.97603 14.5734 3.85757 14.2874 3.85757 13.9892C3.85757 13.691 3.97603 13.405 4.18689 13.1942C4.39775 12.9833 4.68374 12.8648 4.98194 12.8648H12.8451C13.0459 12.8648 13.2384 12.7851 13.3804 12.6431C13.5224 12.5011 13.6021 12.3086 13.6021 12.1078V6.11859H14.3517V15.1136H4.98194ZM12.103 11.3657H4.98194C4.57941 11.3657 4.19863 11.4556 3.85757 11.6183V4.61943C3.85757 4.22182 4.01551 3.8405 4.29666 3.55936C4.57781 3.27821 4.95913 3.12026 5.35673 3.12026H12.103V11.3657Z"
                            fill="currentColor"
                            fillOpacity="0.65"
                        />
                        </svg>

                        <span>&nbsp;Creator Academy</span>
                    </li>
                    {/* <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?commentOutlineDark:commentOutlineWhite} alt="" />
                        <span>Comments</span>
                    </li> */}
                    <li className='cursor-pointer flex gap-2' onClick={() => navigate('/analytics')}>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4831 0.842248L5.98562 1.59183C5.62432 1.6518 5.35297 1.97412 5.35297 2.34141L5.34548 10.233C4.8937 9.96743 4.37783 9.83055 3.8538 9.83725C3.26079 9.83725 2.68109 10.0131 2.18802 10.3426C1.69495 10.672 1.31064 11.1403 1.0837 11.6882C0.856768 12.236 0.797391 12.8389 0.913082 13.4205C1.02877 14.0021 1.31434 14.5364 1.73366 14.9557C2.15299 15.375 2.68724 15.6606 3.26886 15.7763C3.85048 15.892 4.45334 15.8326 5.00122 15.6057C5.54909 15.3787 6.01737 14.9944 6.34683 14.5014C6.67629 14.0083 6.85214 13.4286 6.85214 12.8356L6.86188 5.9679L10.7125 5.31576C10.7979 5.30227 10.9928 5.24005 11.1622 5.05865C11.2237 4.99744 11.2721 4.92431 11.3043 4.84375C11.3365 4.76319 11.3519 4.6769 11.3496 4.59016V1.59183C11.3496 1.12859 10.9396 0.76579 10.4831 0.842248ZM9.83923 2.46884L9.84297 3.94777L6.85214 4.44924L6.85514 2.96282L9.83923 2.46884ZM3.8538 11.3364C4.05345 11.3319 4.25198 11.3673 4.43775 11.4406C4.62352 11.5139 4.79277 11.6235 4.93558 11.7631C5.07839 11.9027 5.19188 12.0694 5.26937 12.2534C5.34687 12.4375 5.38681 12.6351 5.38686 12.8348C5.38691 13.0345 5.34707 13.2322 5.26966 13.4163C5.19226 13.6004 5.07886 13.7671 4.93612 13.9068C4.79338 14.0464 4.62418 14.1562 4.43844 14.2295C4.25271 14.3029 4.0542 14.3384 3.85455 14.334C3.45695 14.334 3.07563 14.1761 2.79448 13.8949C2.51333 13.6138 2.35539 13.2324 2.35539 12.8348C2.35539 12.4372 2.51333 12.0559 2.79448 11.7748C3.07563 11.4936 3.45695 11.3357 3.85455 11.3357" fill="black" fill-opacity="0.65"/>
                    </svg>

                        <span>Unlimited sounds</span>
                    </li>
                    {/* <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?bulbOutlineDark:bulbOutlineWhite} alt="" />
                        <span>Inspirations</span>
                    </li>
                    <li className='cursor-pointer flex gap-2'>
                        <img className='w-5 inline-block' src={darkTheme===''?academyOutlineDark :academyOutlineWhite} alt="" />
                        <span>Creator Academy</span>
                    </li> */}

                </ul>
                <h5 className='text-sm font-semibold text-left text-[#00000057] mt-4'>Others</h5>
                <ul>
                <li className='cursor-pointer flex gap-2 mt-3' onClick={() => navigate('/contactus')}>
                    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.60722 0.527344C2.81201 0.527344 2.04937 0.843239 1.48708 1.40554C0.924782 1.96783 0.608887 2.73047 0.608887 3.52568V9.52234C0.608887 10.3176 0.924782 11.0802 1.48708 11.6425C2.04937 12.2048 2.81201 12.5207 3.60722 12.5207H12.6022C13.3974 12.5207 14.1601 12.2048 14.7224 11.6425C15.2847 11.0802 15.6006 10.3176 15.6006 9.52234V3.52568C15.6006 2.73047 15.2847 1.96783 14.7224 1.40554C14.1601 0.843239 13.3974 0.527344 12.6022 0.527344H3.60722ZM3.60722 2.02651H12.6022C13.3578 2.02651 13.9822 2.5812 14.0856 3.3083C13.3675 3.97768 12.3001 4.79922 11.5948 5.30594C9.97193 6.47154 8.54398 7.27359 8.10472 7.27359C7.66546 7.27359 6.23751 6.47154 4.61466 5.30594C3.95516 4.8312 3.31428 4.3311 2.69348 3.80677C2.5163 3.65679 2.34453 3.50053 2.17851 3.33828C2.28196 2.61119 2.85164 2.02651 3.60722 2.02651ZM2.11555 5.2902C4.01799 6.82909 6.80569 8.76377 8.10472 8.77276C8.951 8.77876 10.3984 7.97071 11.8751 6.95052C12.639 6.42207 13.489 5.79467 14.1021 5.27895L14.1014 9.52234C14.1014 9.91995 13.9434 10.3013 13.6623 10.5824C13.3811 10.8636 12.9998 11.0215 12.6022 11.0215H3.60722C3.20962 11.0215 2.8283 10.8636 2.54715 10.5824C2.266 10.3013 2.10805 9.91995 2.10805 9.52234L2.11555 5.2902Z" fill="black" fill-opacity="0.65"/>
                        </svg>

                        <span>Feedback</span>
                </li>
                </ul>
                <div className='mt-auto w-full text-left'>
                    <button className='w-full ring-0 hover:border-transparent text-sm font-semibold px-0 text-left py-2 d-flex justify-start' onClick={() => navigate('/home')}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.83712 3.06017C8.95293 3.16229 9.02351 3.30618 9.03334 3.46028C9.04318 3.61437 8.99147 3.76607 8.88958 3.88208L6.1522 6.99486L8.89074 10.1076C8.94308 10.1648 8.98347 10.2319 9.00957 10.3049C9.03566 10.3779 9.04693 10.4554 9.04271 10.5328C9.0385 10.6102 9.01888 10.686 8.98501 10.7558C8.95114 10.8255 8.9037 10.8878 8.84546 10.939C8.78723 10.9901 8.71937 11.0292 8.64585 11.0538C8.57234 11.0785 8.49465 11.0882 8.41734 11.0824C8.34002 11.0766 8.26463 11.0555 8.19558 11.0203C8.12653 10.985 8.06521 10.9363 8.0152 10.8771L5.2242 7.70485C5.0511 7.50885 4.95557 7.25636 4.95557 6.99486C4.95557 6.73336 5.0511 6.48087 5.2242 6.28487L8.0152 3.11205C8.06578 3.05453 8.1272 3.00754 8.19595 2.97377C8.2647 2.94 8.33943 2.92012 8.41587 2.91524C8.49231 2.91037 8.56896 2.92061 8.64144 2.94538C8.71392 2.97015 8.78081 3.00896 8.83828 3.05959" fill="black" fill-opacity="0.65"/>
                        </svg> Back to Seezitt
                    </button>
                    <hr/>
                    <div className='text-xs opacity-60 mt-2 flex flex-col gap-2'>
                        <span className='cursor-pointer' onClick={() => navigate('/about/terms-conditions')}>Terms of Service</span>
                        <span className='cursor-pointer' onClick={() => navigate('/about/privacy-policy')}>Privacy Policy</span>
                        <span className='cursor-pointer'>Copyright &copy; {(new Date()).getFullYear()} Seezitt</span>
                    </div>
                </div>
               </div>
            </div>
            <div className='w-[calc(100%-14rem)]  ml-auto '>
            {/* <Layout> */}
                <ThemeProvider theme={darkTheme === '' ? lightThemePalette : darkThemePalette}>
                    <header className={`text-gray-600 body-font ${darkTheme === '' ? 'bg-white' : styles.header} border-b px-4`}>
                        <div className="flex flex-wrap flex-col md:flex-row items-center justify-between">
                            <nav className="flex flex-wrap items-center text-base text-gray-400">
                                <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.OVERVIEW ? 'text-black font-semibold border-b-2 border-gray-800' : ''} py-3 mr-5 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.OVERVIEW.toString()}>Overview</a>
                                <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.CONTENT ? 'text-black font-semibold border-b-2 border-gray-800' : ''} py-3 mr-5 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.CONTENT.toString()}>Content</a>
                                {/* <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.VIEWERS ? 'text-gray-500 font-semibold border-b border-gray-800' : ''} py-3 mr-5 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.VIEWERS.toString()}>Viewers</a> */}
                                {/* <a onClick={switchTab} className={`${currentTab === ANALYTICSTABS.FOLLOWERS ? 'text-gray-500 font-semibold border-b border-gray-800' : ''} py-3 ${darkTheme === '' ? 'hover:text-gray-900' : 'hover:text-white'} cursor-pointer`} id={ANALYTICSTABS.FOLLOWERS.toString()}>Followers</a> */}
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
                                        Last {selectedPeriod} Days
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
                                            {isSelected && <CheckIcon fontSize="small" sx={{ color: '#ff3b5c' }} />}
                                            {period}
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
                                    Download data
                                </button>
                            </div>
                        </div>
                    </header>

                   <div className='px-3'>
                        {(() => {
                                switch (currentTab) {
                                    case ANALYTICSTABS.OVERVIEW:
                                        return <OverviewTab analyticsData={analyticsData} isDarkTheme={!!darkTheme} />
                                    case ANALYTICSTABS.CONTENT:
                                        return <ContentTab isDarkTheme={darkTheme} />
                                    case ANALYTICSTABS.VIEWERS:
                                        return <ViewersTab />
                                    case ANALYTICSTABS.FOLLOWERS:
                                        return <FollowersTab />
                                    default:
                                        return <OverviewTab analyticsData={analyticsData} isDarkTheme={!!darkTheme} />
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
                        <DialogTitle component="div" sx={{ fontWeight: 600 }}>Download Overview data</DialogTitle>
                        <DialogContent>
                            <Typography sx={{ mb: 1 }}>Select a file format:</Typography>
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
                            Cancel
                            </Button>
                            <Button onClick={handleDownload} variant="contained" sx={{boxShadow: 'none', backgroundColor: '#f50057', color: '#fff', textTransform: 'capitalize'}}>
                            Download
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
