import { useEffect, useState } from 'react';
import Layout from '../../../shared/layout';
// import whiteRightArrow from './svg-components/whiteRightArrow.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { POSTANALYTICSTABS } from '../../../utils/constants';
import styles from './style.module.scss'
import OverviewTab from './tabs/OverviewTab';
import ViewersTab from './tabs/ViewersTab';
import EngagementTab from './tabs/EngagementTab';
import { isValidDocId } from '../../../utils/helpers';
import {  logo, logoAuth, logoAuthWhite } from '../../../icons';
import {
    AppBar,
    Avatar,
    Box,
    Card,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tab,
    Tabs,
    Toolbar,
    Typography,
  } from '@mui/material';
  import { ExpandMore } from '@mui/icons-material';
  
  const thumbnails = Array.from({ length: 12 }).map((_, index) => ({
    image: 'https://via.placeholder.com/60', // Replace with your thumbnail images
    description: 'No description',
  }));

const PostAnalytics = () => {
    const [currentTab, setCurrentTab] = useState(POSTANALYTICSTABS.OVERVIEW);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const [postAnalytics, setPostAnalytics] = useState<any>('');
    const [postData, setPostData] = useState();

    const navigate = useNavigate();
    const { postId } = useParams();

    const [posts, setPosts] = useState<any>(
        {
            items: [],
            page: 1,
            isLoading: false,
            canLoadMore: true,
        }
    );

    const [postAnalyticsDetails, setPostAnalyticsDetails] = useState<any>(
        {
            details: [],
            isLoading: false,
        }
    );

    function loadPosts()
    {
        let endpoint = `${process.env.VITE_API_URL}/profile/${localStorage.getItem('userId')}/videos?page=${posts.page}`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };
                
        if(!posts.canLoadMore) { return; }

        setPosts((prev: any) => ({ ...prev, isLoading: true, canLoadMore: false }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then(
            (response) =>
            {
                if(response.data.data.length)
                {
                    setPosts((prev: any) => ({ ...prev, canLoadMore: true, items: [...prev.items, ...response.data.data] }));
                }

                setPosts((prev: any) => ({ ...prev, page: prev.page + 1, isLoading: false }));
            }
        )
        .catch((error) => console.error('Fetch error:', error));
    };

    function loadPostAnalyticsDetails()
    {
        let endpoint = `${process.env.VITE_API_URL}/analytics/v2/media-analytics?mediaId=${postId}`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };

        setPostAnalyticsDetails((prev: any) => ({ ...prev, isLoading: true }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => setPostAnalyticsDetails((prev: any) => ({ ...prev, details: response.data.data, isLoading: false })))
        .catch((error) => console.error('Fetch error:', error));
    };

    const switchTab = (event:React.MouseEvent<HTMLAnchorElement>) => {
        setCurrentTab(Number(event.currentTarget.id));
    }

    const getPostAnalytics = async () => {
        try {
            const response = await fetch(
                `${API_KEY}/analytics/media?mediaId=${postId}`,
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
            setPostAnalytics(data);
        } catch (error) {
            console.log('error trendinghashtags', error);
        }
    };

    
    const fetchPost = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/videos/${postId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const responseData = await response.json();
                setPostData(responseData.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!isValidDocId(postId)) navigate('/');
        getPostAnalytics();
        fetchPost();
        loadPosts();
        loadPostAnalyticsDetails();
    }, [postId]);
    const [logo, setLogo] = useState(logoAuth);

    const [darkTheme, setdarkTheme] = useState<any>('');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        
         if (themeColor == "dark") {
                    setdarkTheme(styles.darkTheme);
                    setLogo(logoAuthWhite);
                } else {
                    setLogo(logoAuth);
            }
    });

    return (
        <>
            <header className={`text-gray-600 d-flex body-font ${darkTheme===''?'bg-white':'bg-[#181818]'} border-b `}>
                <div onClick={() => navigate('/')} className={`${styles.sec1} border-r w-[14rem] pl-3`}>
                    <img src={logo} alt="" />
                </div>
                <div className="flex flex-wrap flex-col md:flex-row items-center justify-between w-[calc(100%-14rem)] ml-auto px-4">
                    <nav className="flex flex-wrap items-center text-base text-gray-400">
                        <a onClick={switchTab} className={`${currentTab===POSTANALYTICSTABS.OVERVIEW?'text-black font-semibold border-b-2 border-black':''} py-3 mr-5 ${darkTheme===''?'hover:text-gray-900':'hover:text-white'} cursor-pointer`} id={POSTANALYTICSTABS.OVERVIEW.toString()}>Overview</a>
                         <a onClick={switchTab} className={`${currentTab===POSTANALYTICSTABS.VIEWERS?'text-black font-semibold border-b-2 border-black':''} py-3 mr-5 ${darkTheme===''?'hover:text-gray-900':'hover:text-white'} cursor-pointer`} id={POSTANALYTICSTABS.VIEWERS.toString()}>Viewers</a> 
                        {/* <a onClick={switchTab} className={`${currentTab===POSTANALYTICSTABS.ENGAGEMENT?'text-black font-semibold border-b-2 border-black':''} py-3 ${darkTheme===''?'hover:text-gray-900':'hover:text-white'} cursor-pointer`} id={POSTANALYTICSTABS.ENGAGEMENT.toString()}>Engagement</a>  */}
                    </nav>
                    <div className="inline-flex lg:justify-end ml-5 lg:ml-0 my-2">
                        {/* <button className="inline-flex mx-2 items-center bg-gray-100  border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded-full text-sm">Last 7 Days &#129087;</button> */}
                        <button onClick={()=>navigate('/upload')} className={`inline-flex gap-1 items-center ${darkTheme===''?'bg-gray-100':'bg-gray-800'}  border-0 py-2 px-3 focus:outline-none ${darkTheme===''?'hover:bg-gray-200':'hover:bg-gray-900'} rounded-full text-sm`}>
                            Upload
                        </button>
                    </div>
                </div>
            </header>
            <div className='d-flex'>
                <Box sx={{ width: '14rem', borderRightWidth: '1px' }}>
                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 2, ml: 1, display: 'flex', borderBottomWidth: '1px', py: 2, px: 1, cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <svg className='mr-2' width="8" height="12" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.90954 7.44851L8.60121 1.75267C8.67881 1.67461 8.72237 1.569 8.72237 1.45892C8.72237 1.34885 8.67881 1.24324 8.60121 1.16517L7.83454 0.398507C7.75648 0.320903 7.65087 0.277344 7.54079 0.277344C7.43072 0.277344 7.32511 0.320903 7.24704 0.398507L0.492878 7.15684C0.453825 7.19557 0.422827 7.24166 0.401674 7.29243C0.38052 7.34321 0.369629 7.39767 0.369629 7.45267C0.369629 7.50768 0.38052 7.56214 0.401674 7.61291C0.422827 7.66369 0.453825 7.70977 0.492878 7.74851L7.24288 14.5027C7.28161 14.5417 7.3277 14.5727 7.37847 14.5939C7.42925 14.615 7.48371 14.6259 7.53871 14.6259C7.59372 14.6259 7.64818 14.615 7.69895 14.5939C7.74973 14.5727 7.79581 14.5417 7.83454 14.5027L8.60121 13.736C8.67881 13.6579 8.72237 13.5523 8.72237 13.4423C8.72237 13.3322 8.67881 13.2266 8.60121 13.1485L2.90954 7.44851Z" fill="black"/>
                        </svg>
                        Back
                    </Typography>
                    <List dense>
                    {posts.items.map((item: any, idx: number) => (
                        <ListItem onClick={()=>navigate(`/analytics/post/${item.mediaId}`)} key={idx} sx={{ display: 'flex', gap: 1.5, borderRadius: 2, mb: 1, width: '90%', mx: 'auto', cursor: 'pointer','&:hover': {
                        backgroundColor: '#0000000D',
                        }, py: 1 }}>
                        <ListItemAvatar>
                            <Avatar
                            variant="rounded"
                            src={item.thumbnailUrl}
                            sx={{ width: 45, height: 50, mb: 0.5 }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                            <Typography variant="caption" color="text.secondary" textAlign="center">
                                {item.description ? item.description : 'No description'}
                            </Typography>
                            }
                        />
                        </ListItem>
                    ))}
                    </List>
                </Box>
                {(()=>{
                switch(currentTab){
                    case POSTANALYTICSTABS.OVERVIEW:
                        return <OverviewTab postAnalyticsDetails={postAnalyticsDetails} postAnalytics={postAnalytics} post={postData} isDarkTheme={darkTheme} />    
                    case POSTANALYTICSTABS.VIEWERS:
                        return <ViewersTab postAnalyticsDetails={postAnalyticsDetails} isDarkTheme={darkTheme} />
                    // switch‑case inside PostAnalytics
                    case POSTANALYTICSTABS.ENGAGEMENT:
                        return <EngagementTab isDarkTheme={darkTheme} />;
  
                    default:
                        return <OverviewTab postAnalyticsDetails={postAnalyticsDetails} postAnalytics={postAnalytics} />
                }
            })()}
            </div>
            
        </>
    )
};

export default PostAnalytics;
