import React, { useEffect, useRef, useState } from 'react'
import { API_KEY } from '../../utils/constants';
import { analyticsOutline, analyticsOutlineWhite, commentOutline, commentOutlineDark, commentOutlineWhite, deleteVideoIcon, deleteVideoIconWhite, heartOutline, heartOutlineWhite, moreBlack, moreInWhite, pencilOutline, pencilOutlineWhite, playOutline, playOutlineWhite } from '../../icons';
import style from './contentTab.module.scss';
import { formatCustomDate } from '../../utils/helpers';
import ReactPaginate from 'react-paginate';
import PopupForDeleteVideo from '../profile/popups/popupForDeleteVideo';
import { useNavigate, Link } from 'react-router-dom';
import {CircularProgress, Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, Tooltip } from "@mui/material";
// import { HTML5_FMT } from 'moment';
// import PostsAnalytics from './PostsAnalytics';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


function ContentTab({ isDarkTheme, selectedPeriod }: any) {
    const { t: translate } = useTranslation();
    const [mostViewedPosts, setMostViewedPosts] = useState<any>(
        {
            items: [],
            page: 1,
            isLoading: false,
            canLoadMore: true,
        }
    );

    const [mostNewViewedPosts, setMostNewViewedPosts] = useState<any>(
        {
            items: [],
            page: 1,
            isLoading: false,
            canLoadMore: true,
        }
    );

    const [mostLikedPosts, setMostLikedPosts] = useState<any>(
        {
            items: [],
            page: 1,
            isLoading: false,
            canLoadMore: true,
        }
    );

    const [mostFollowedPosts, setMostFollowedPosts] = useState<any>(
        {
            items: [],
            page: 1,
            isLoading: false,
            canLoadMore: true,
        }
    );
  
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

    const states =
    [
        { selectedState: mostViewedPosts, setSelectedState: setMostViewedPosts },
        { selectedState: mostNewViewedPosts, setSelectedState: setMostNewViewedPosts },
        { selectedState: mostLikedPosts, setSelectedState: setMostLikedPosts },
        { selectedState: mostFollowedPosts, setSelectedState: setMostFollowedPosts }
    ];
    const { selectedState, setSelectedState} = states[tabValue];

  const postData = [
    {
      thumbnail: "https://via.placeholder.com/80", // Replace with your image
      title: "Gym_workout_Bellyfat_9ad564vd_6d",
      viewsLast7Days: 3,
      allViews: 26,
      postedOn: "2w ago",
    },
  ];

  const newViewersData = [
    {
      thumbnail: "https://via.placeholder.com/80",
      title: "NewViewer_Content_Example",
      viewsLast7Days: 5,
      allViews: 40,
      postedOn: "1w ago",
    },
  ];

  const mostLikesData = [
    {
      thumbnail: "https://via.placeholder.com/80",
      title: "MostLiked_Post",
      viewsLast7Days: 7,
      allViews: 50,
      postedOn: "3d ago",
    },
  ];

  const newFollowersData = [
    {
      thumbnail: "https://via.placeholder.com/80",
      title: "NewFollower_Special",
      viewsLast7Days: 2,
      allViews: 15,
      postedOn: "4d ago",
    },
  ];
  const tabs = [
    { label: "Most views", data: postData },
    { label: "Most new viewers", data: postData },
    { label: "Most likes", data: postData },
    { label: "New followers", data: postData },
  ];

  let types = ['viewers', 'new_viewers', 'likes', 'new_followers'];

  const abortController = useRef<AbortController | null>(null);

  const [posts, setPosts] = useState<any>({ items: [], page: 1, pageSize: 10, totalItems: 0, isLoading: true });
  const [mediaToDelete, setMediaToDelete] = useState<any>(null)

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  
  const navigate = useNavigate();

  const deletePost = (post:any) => {
    setMediaToDelete(post);
  }

  const fetchPosts = async () => {
    try {
      const controller = new AbortController();
      abortController.current = controller;
      const response = await fetch(
        `${API_KEY}/profile/${userId}/videos?page=${posts.page}&pageSize=${posts.pageSize}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })
        .then((res) => res.json())
        .then((data) => {
          setPosts((prev: any) => ({
            ...prev,
            items: [...data.data.data],
            totalItems: data.data.total,
            isLoading:false
          }));
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    } finally {
      abortController.current = null;
    }
  }

    function loadPosts()
    {
        let endpoint = `${process.env.VITE_API_URL}/profile/v2/top-posts?page=${posts.page}&type=${types[tabValue]}&days=${selectedPeriod}`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };

        if (!selectedState.canLoadMore || selectedState.items.length > 0) return;
      
        setSelectedState((prev: any) => ({ ...prev, isLoading: true, canLoadMore: false  }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then(
            (response) =>
            {
                if(response.data.length)
                {
                    setSelectedState((prev: any) => ({ ...prev, canLoadMore: true, items: [...prev.items, ...response.data] }));
                }

                setSelectedState((prev: any) => ({ ...prev, page: prev.page + 1, isLoading: false }));
            }
        )
        .catch((error) => console.error('Fetch error:', error));
    };

  useEffect(() => {
    loadPosts()
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    }
  }, [tabValue]);
  const renderTable = (data: any[]) => (
    <TableContainer sx={{ mt: 2 }}>
  <Table>
    <TableHead>
    <TableRow >
      <TableCell sx={{ fontSize: '12px', color: '#0000007A' }}></TableCell>
      <TableCell sx={{ fontSize: '12px', color: '#0000007A' }}>{translate('Posts')}</TableCell>
      <TableCell align="center" sx={{ fontSize: '12px', color: '#0000007A' }}>{types[tabValue].charAt(0).toUpperCase() + types[tabValue].slice(1).replace(/_/g, ' ')} {translate('in the last')} {selectedPeriod} {translate('days')}</TableCell>
      <TableCell align="center" sx={{ fontSize: '12px', color: '#0000007A' }}>{translate('All views')}</TableCell>
      <TableCell align="center" sx={{ fontSize: '12px', color: '#0000007A' }}>{translate('Posted on')}</TableCell>
      <TableCell align="center" sx={{ fontSize: '12px', color: '#0000007A' }}>{translate('Action')}</TableCell>
    </TableRow>
    </TableHead>

    <TableBody>
      {data.map((post, index) => (
        <TableRow className='font-bold' key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell align="center">
            <Box display="flex" alignItems="center">
              <Avatar
                variant="square"
                src={post.thumbnailUrl}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Typography variant="body2" fontWeight={600}>
                {post.title}
              </Typography>
            </Box>
          </TableCell>
          <TableCell align="center"  sx={{fontWeight: '600'}} >{post.viewsLast7Days ?? 0}</TableCell>
          <TableCell align="center"  sx={{fontWeight: '600'}} >{post.views}</TableCell>
          <TableCell align="center" sx={{fontWeight: '600'}} >{post.postedOn}{moment(post.createdTime).format('D-MM')}</TableCell>
          <TableCell align="center">
            <Link to={`/analytics/post/${post.mediaId}`} reloadDocument={false} style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{backgroundColor: '#F2F2F2', px: 2, boxShadow: 'none', py: 1, color: 'black', textTransform: 'capitalize', fontWeight: '700'}}  size="small">
              {translate('View data')}
            </Button>
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );

  return (
    <>
    <Box className="text-left mt-6">
        <h5 className="font-semibold text-[19px] flex mb-4 cursor-pointer">
          {translate('Your top posts')}
          <Tooltip slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "#000",
              fontSize: "1rem",
              padding: "8px 12px",
              borderRadius: "6px",
            },
          },
        }} title={translate('Top performing posts based on views, likes, and followers')} placement="bottom" >
            <svg className='ml-1' width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.04997 1.7487C6.36053 1.7487 5.67784 1.88449 5.04088 2.14833C4.40392 2.41217 3.82516 2.79888 3.33766 3.28639C2.85015 3.77389 2.46344 4.35265 2.1996 4.98961C1.93576 5.62657 1.79997 6.30926 1.79997 6.9987C1.79997 7.68814 1.93576 8.37083 2.1996 9.00779C2.46344 9.64474 2.85015 10.2235 3.33766 10.711C3.82516 11.1985 4.40392 11.5852 5.04088 11.8491C5.67784 12.1129 6.36053 12.2487 7.04997 12.2487C8.44235 12.2487 9.77771 11.6956 10.7623 10.711C11.7468 9.72644 12.3 8.39108 12.3 6.9987C12.3 5.60631 11.7468 4.27095 10.7623 3.28639C9.77771 2.30182 8.44235 1.7487 7.04997 1.7487ZM0.633301 6.9987C0.633301 5.29689 1.30934 3.66479 2.5127 2.46143C3.71606 1.25807 5.34816 0.582031 7.04997 0.582031C8.75177 0.582031 10.3839 1.25807 11.5872 2.46143C12.7906 3.66479 13.4666 5.29689 13.4666 6.9987C13.4666 8.7005 12.7906 10.3326 11.5872 11.536C10.3839 12.7393 8.75177 13.4154 7.04997 13.4154C5.34816 13.4154 3.71606 12.7393 2.5127 11.536C1.30934 10.3326 0.633301 8.7005 0.633301 6.9987ZM7.92497 4.66536C7.92497 4.89743 7.83278 5.11999 7.66869 5.28408C7.50459 5.44818 7.28203 5.54036 7.04997 5.54036C6.8179 5.54036 6.59534 5.44818 6.43125 5.28408C6.26715 5.11999 6.17497 4.89743 6.17497 4.66536C6.17497 4.4333 6.26715 4.21074 6.43125 4.04665C6.59534 3.88255 6.8179 3.79036 7.04997 3.79036C7.28203 3.79036 7.50459 3.88255 7.66869 4.04665C7.83278 4.21074 7.92497 4.4333 7.92497 4.66536ZM6.7583 6.41536C6.68095 6.41536 6.60676 6.44609 6.55206 6.50079C6.49736 6.55549 6.46663 6.62968 6.46663 6.70703V9.91536C6.46663 9.99272 6.49736 10.0669 6.55206 10.1216C6.60676 10.1763 6.68095 10.207 6.7583 10.207H7.34163C7.41899 10.207 7.49318 10.1763 7.54787 10.1216C7.60257 10.0669 7.6333 9.99272 7.6333 9.91536V6.70703C7.6333 6.62968 7.60257 6.55549 7.54787 6.50079C7.49318 6.44609 7.41899 6.41536 7.34163 6.41536H6.7583Z" fill="black"/>
            </svg>
          </Tooltip>

        </h5>
      <Box className="py-3 bg-white  rounded-lg shadow-md">
      <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { backgroundColor: "#000" } }}
          className="border-b border-gray-200 pl-4" // pl-4 means padding-left: 1rem
          sx={{
            '& .MuiTabs-flexContainer': {
              position: 'relative',
            },
            '& .MuiTab-root': {
              textTransform: 'initial',
              fontWeight: 500,
              fontSize: '13px',
              color: '#4B5563', // gray-700
              paddingBottom: '12px',
              
            },
            '& .Mui-selected': {
              color: '#000 !important',
              fontWeight: 700,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>

        {/* <Tabs
          value={tabValue}
          onChange={handleTabChange}
          className="border-b border-gray-200 "
          TabIndicatorProps={{ style: { backgroundColor: "#000" } }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              className="capitalize font-medium text-gray-700"
            />
          ))}
        </Tabs> */}

        <div className="mt-4">
          {/* <Typography variant="subtitle1" className="font-medium text-gray-700 mb-2">
            {tabs[tabValue].label}
          </Typography> */}

            {tabValue === 0 && renderTable(mostViewedPosts.items)}
          {tabValue === 1 && renderTable(mostNewViewedPosts.items)}
          {tabValue === 2 && renderTable(mostNewViewedPosts.items)}
          {tabValue === 3 && renderTable(mostFollowedPosts.items)}
          <Box textAlign={'center'} my={3}>
          {!selectedState.isLoading && selectedState.items.length == 0 && <h5 className='text-lg font-semibold'>{translate('No top posts')}</h5>}
          {/* <p className='text-sm text-[#0000007A]'>Your posts haven't received an increase in likes during the selected period.</p> */}
        </Box>
        </div>
      </Box>
      
    </Box>
    
  </>
  )
}

export default ContentTab