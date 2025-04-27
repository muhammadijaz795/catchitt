import React, { useEffect, useRef, useState } from 'react'
import { API_KEY } from '../../utils/constants';
import { analyticsOutline, analyticsOutlineWhite, commentOutline, commentOutlineDark, commentOutlineWhite, deleteVideoIcon, deleteVideoIconWhite, heartOutline, heartOutlineWhite, moreBlack, moreInWhite, pencilOutline, pencilOutlineWhite, playOutline, playOutlineWhite } from '../../icons';
import style from './contentTab.module.scss';
import { formatCustomDate } from '../../utils/helpers';
import ReactPaginate from 'react-paginate';
import PopupForDeleteVideo from '../profile/popups/popupForDeleteVideo';
import { useNavigate } from 'react-router-dom';
import {CircularProgress, Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, Tooltip } from "@mui/material";
import { HTML5_FMT } from 'moment';



function ContentTab({ isDarkTheme }: any) {
  
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  const tabTexts = ["Most views", "Most new viewers", "Most likes", "New followers"];

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

  useEffect(() => {
    fetchPosts();
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    }
  }, [posts.page]);
  const renderTable = (data: any[]) => (
    <TableContainer sx={{ mt: 2 }}>
  <Table>
    <TableHead>
    <TableRow >
      <TableCell sx={{ fontSize: '12px', color: '#0000007A' }}></TableCell>
      <TableCell sx={{ fontSize: '12px', color: '#0000007A' }}>Posts</TableCell>
      <TableCell align="center" sx={{ fontSize: '12px', color: '#0000007A' }}>Views in the last 7 days</TableCell>
      <TableCell align="center" sx={{ fontSize: '12px', color: '#0000007A' }}>All views</TableCell>
      <TableCell align="center" sx={{ fontSize: '12px', color: '#0000007A' }}>Posted on</TableCell>
      <TableCell align="center" sx={{ fontSize: '12px', color: '#0000007A' }}>Action</TableCell>
    </TableRow>
    </TableHead>

    <TableBody>
      {data.map((post, index) => (
        <TableRow className='font-bold' key={index}>
          <TableCell>1</TableCell>
          <TableCell align="center">
            <Box display="flex" alignItems="center">
              <Avatar
                variant="square"
                src={post.thumbnail}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Typography variant="body2" fontWeight={600}>
                {post.title}
              </Typography>
            </Box>
          </TableCell>
          <TableCell align="center"  sx={{fontWeight: '600'}} >{post.viewsLast7Days}</TableCell>
          <TableCell align="center"  sx={{fontWeight: '600'}} >{post.allViews}</TableCell>
          <TableCell align="center" sx={{fontWeight: '600'}} >{post.postedOn}</TableCell>
          <TableCell align="center">
            <Button variant="contained" sx={{backgroundColor: '#F2F2F2', px: 2, boxShadow: 'none', py: 1, color: 'black', textTransform: 'capitalize', fontWeight: '700'}}  size="small">
              View data
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );

  return (
    <>
    <div className="p-6 min-h-screen">
      {/* Header */}
      {/* <div className="flex justify-between items-center mb-6"> */}
        {/* <h1 className="text-2xl font-semibold">Manage your posts</h1> */}
        {/* <input
          type="text"
          placeholder="Search for post description"
          className={`border border-gray-300 rounded-lg p-2 w-64 ${isDarkTheme?'':'bg-white'}`}
        /> */}
      {/* </div> */}
      {/* Filters */}
      {/* <div className="flex space-x-4 mb-4">
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>Sort by</option>
        </select>
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>All video views</option>
        </select>
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>All comments</option>
        </select>
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>All likes</option>
        </select>
        <select className={`border border-gray-300 rounded-lg p-2 ${isDarkTheme?'':'bg-white'}`}>
          <option>All privacy</option>
        </select>
      </div> */}
      {/* Posts Table */}
      <div className={`${isDarkTheme?'bg-[#181818]':'bg-white'} shadow rounded-lg`}>
        <table className="w-full text-left">
          <thead className="border-b text-gray-400">
            <tr>
              <th className="p-4">Posts</th>
              <th className="p-4">Time posted</th>
              <th className="p-4">Privacy</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.isLoading === false ? posts.items.map((post: any, index: number) => (
              <tr key={index} className={`border-b ${isDarkTheme?'hover:bg-gray-900':'hover:bg-gray-50'}`}>
                <td className="p-4 flex items-center space-x-4">
                  <div className="w-14 h-24 bg-gray-200 rounded overflow-hidden">
                    <img src={post.thumbnailUrl||'https://placehold.co/67x67'} className='w-full h-full' alt="post-thumbnail" />
                  </div>
                  <div>
                    <span>{post.description.length > 30 ? post.description.slice(0, 30) + '...' : ''}</span>
                    <div className='flex gap-4'>
                      <div className="text-gray-400 inline-flex"><img src={isDarkTheme ? playOutlineWhite : playOutline} alt="like" /> &nbsp; {post.views}</div>
                      <div className="text-gray-400 inline-flex"><img src={isDarkTheme ? heartOutlineWhite : heartOutline} alt="like" /> &nbsp; {post.likes}</div>
                      <div className="text-gray-400 inline-flex"><img src={isDarkTheme ? commentOutlineWhite : commentOutline} alt="like" /> &nbsp; {post.comments.length}</div>
                    </div>
                  </div>
                </td>
                {/* <td className="p-4">Nov 3, 2024, 9:57 PM</td> */}
                {/* write down td in with post createdTime in above time format */}
                <td className="p-4">{formatCustomDate(post.createdTime)}</td>
                <td className="p-4">
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3c3.5 0 7 2.5 7 6s-3.5 6-7 6-7-2.5-7-6 3.5-6 7-6z"
                        />
                      </svg>
                    </span>
                    Everyone
                  </span>
                </td>
                <td className="p-4">
                  <div className='h-full flex items-center space-x-6'>
                    <img onClick={()=>deletePost(post)} className='cursor-pointer h-5' src={isDarkTheme ? deleteVideoIconWhite : deleteVideoIcon} alt="edit" />
                    <img onClick={()=>navigate(`/analytics/post/${post.mediaId}`)} className='cursor-pointer' src={isDarkTheme ? analyticsOutlineWhite : analyticsOutline} alt="analytics" />
                    <img onClick={()=>navigate(`/analytics/comment/${post.mediaId}`)} className='cursor-pointer w-5' src={isDarkTheme ? commentOutlineWhite : commentOutlineDark} alt="comments" />
                  </div>
                </td>
              </tr>
            )):
            <tr>
              <td colSpan={4} className="text-center p-4"><CircularProgress /></td>
            </tr>
            }
          </tbody>
        </table>
        <div className='py-4'>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(posts.totalItems / posts.pageSize)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(data) => {
              setPosts((prev: any) => ({ ...prev, page: data.selected + 1, isLoading: true }))
            }}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
      <PopupForDeleteVideo
        openBlock={Boolean(mediaToDelete)}
        onBlockClose={() => setMediaToDelete(null)}
        info={mediaToDelete}
        darkTheme={!!isDarkTheme}
        // @ts-ignore
        userId={{ id: userId, name: '' }}
      />
    </div>
    <Box className="text-left">
        <h5 className="font-bold text-[19px] flex mb-4 cursor-pointer">
          Your top posts
          <Tooltip slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "#000",
              fontSize: "1rem",
              padding: "8px 12px",
              borderRadius: "6px",
            },
          },
        }} title="Top performing posts based on views, likes, and followers" placement="bottom" >
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

            {tabValue === 0 && renderTable(postData)}
          {tabValue === 1 && renderTable(newViewersData)}
          {tabValue === 2 && renderTable(mostLikesData)}
          {tabValue === 3 && renderTable(newFollowersData)}
          <Box textAlign={'center'} my={3}>
          <h5 className='text-lg font-semibold'>No top posts</h5>
          <p className='text-sm text-[#0000007A]'>Your posts haven't received an increase in likes during the selected period.</p>
        </Box>
        </div>
      </Box>
      
    </Box>
    
  </>
  )
}

export default ContentTab