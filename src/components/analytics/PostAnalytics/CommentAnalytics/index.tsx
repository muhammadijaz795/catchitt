import React, { useState } from 'react';
import Layout from '../../../../shared/layout';
import { Box, FormControl, InputBase, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const filterStyle = {
    backgroundColor: '#f5f5f5',
    fontSize: '14px',
    padding: '4px 12px',
    borderRadius: '8px',
    '& .MuiSelect-select': {
      padding: '6px 0',
    },
    '& fieldset': {
      border: 'none',
    },
  };


const CommentAnalytics = () => {
    const [commentSort, setCommentSort] = useState('latest');
    const [commentType, setCommentType] = useState('all');
    const [postedBy, setPostedBy] = useState('all');
    const [followerCount, setFollowerCount] = useState('all');
  
    const handleChange =
      (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (event: SelectChangeEvent) => {
        setter(event.target.value);
      };


    return (
        <Layout>
            
            
        <div className="min-h-screen bg-[#F8F8F8] p-6">
        <div className='flex justify-between align-items-center p-4 flex-row-reverse' >
                <div className="">
                        <button className="bg-[#F43F5E] text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-[#e03555]">
                            Select another post
                        </button>
                    </div>

                    {/* Back link */}
                    <button className="flex items-center border-0 text-sm font-bold mb-6 text-gray-800">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to posts
                    </button>
            </div>
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md px-8 py-6 relative">
                {/* Select another post button */}
                

                {/* Video section */}
                <div className="flex gap-6">
                    {/* Thumbnail */}
                    <div className="relative w-[176px] h-[320px] bg-gray-200 rounded-md">
                        <span className="absolute bottom-2 left-2 text-xs bg-black text-white px-2 py-0.5 rounded">
                            00:15
                        </span>
                    </div>
                    <div className=' flex flex-column justify-between w-[calc(100%-13rem)]'>
                        <div className='details-video'>
                            {/* Video Info */}
                            <div className="flex-1 text-left">
                                <h5 className="text-lg font-semibold">855289-hd_1920_1080_25fps</h5>
                                {/* Stats */}
                            <div className="mb-4 flex items-center gap-6 mt-6 text-sm text-gray-700">
                                <div className="flex items-center gap-1"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.9066 9.10179C15.9926 8.90932 16.037 8.70091 16.037 8.49012C16.037 8.27934 15.9926 8.07092 15.9066 7.87846C15.7739 7.61698 15.5722 7.3968 15.3233 7.24179C15.09 7.07512 14.7766 6.89512 14.3966 6.67845L7.16996 2.53512C6.79663 2.31845 6.4833 2.13845 6.22663 2.02179C5.96849 1.8855 5.67809 1.82212 5.38663 1.83845C5.17791 1.86127 4.9763 1.92766 4.79486 2.03331C4.61341 2.13896 4.45617 2.28153 4.3333 2.45179C4.15663 2.69512 4.09996 2.98512 4.0733 3.26845C4.04663 3.55179 4.04663 3.91179 4.04663 4.34179V12.6351C4.04663 13.0685 4.04663 13.4251 4.0733 13.7085C4.09996 13.9951 4.15663 14.2851 4.3333 14.5251C4.45617 14.6954 4.61341 14.8379 4.79486 14.9436C4.9763 15.0493 5.17791 15.1156 5.38663 15.1385C5.68663 15.1718 5.96663 15.0718 6.22663 14.9551C6.4833 14.8385 6.7933 14.6585 7.16996 14.4451L14.3966 10.2985C14.7766 10.0818 15.09 9.89845 15.3233 9.73512C15.5566 9.56845 15.7833 9.37512 15.9066 9.10179Z" fill="black" fill-opacity="0.32"/>
                                    </svg>
                                    <span>8</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.06995 4.55853C6.61661 2.9652 4.38661 2.9452 2.97328 4.34853C2.63445 4.68391 2.36547 5.08313 2.1819 5.52312C1.99833 5.96311 1.90381 6.43512 1.90381 6.91186C1.90381 7.38861 1.99833 7.86062 2.1819 8.30061C2.36547 8.74059 2.63445 9.13982 2.97328 9.4752L7.71661 14.1819C7.81036 14.2755 7.93744 14.3281 8.06995 14.3281C8.20245 14.3281 8.32953 14.2755 8.42328 14.1819L13.1666 9.4752C13.5054 9.13982 13.7744 8.74059 13.958 8.30061C14.1416 7.86062 14.2361 7.38861 14.2361 6.91186C14.2361 6.43512 14.1416 5.96311 13.958 5.52312C13.7744 5.08313 13.5054 4.68391 13.1666 4.34853C11.7533 2.94853 9.52328 2.9652 8.06995 4.55853Z" fill="black" fill-opacity="0.32"/>
                                    </svg>
                                    <span>2</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.7698 8.24219C14.7698 11.4189 12.0831 13.9922 8.76978 13.9922C7.91978 13.9922 7.10978 13.8222 6.37644 13.5155C5.70438 13.8748 5.00697 14.1845 4.28978 14.4422C3.90978 14.5789 3.56311 14.1422 3.72978 13.7755C3.98869 13.219 4.16284 12.6269 4.24644 12.0189C3.32644 11.0089 2.76978 9.68552 2.76978 8.24219C2.76978 5.06552 5.45644 2.49219 8.76978 2.49219C12.0831 2.49219 14.7698 5.06552 14.7698 8.24219ZM8.76978 9.24219C8.88922 9.24956 9.00892 9.23241 9.12148 9.19177C9.23405 9.15113 9.3371 9.08788 9.4243 9.0059C9.51149 8.92393 9.58098 8.82497 9.62847 8.71512C9.67597 8.60527 9.70047 8.48686 9.70047 8.36719C9.70047 8.24751 9.67597 8.1291 9.62847 8.01925C9.58098 7.90941 9.51149 7.81045 9.4243 7.72847C9.3371 7.6465 9.23405 7.58324 9.12148 7.54261C9.00892 7.50197 8.88922 7.48481 8.76978 7.49219C8.53727 7.49219 8.31429 7.58455 8.14988 7.74896C7.98547 7.91336 7.89311 8.13635 7.89311 8.36885C7.89311 8.60136 7.98547 8.82434 8.14988 8.98875C8.31429 9.15316 8.53727 9.24552 8.76978 9.24552V9.24219ZM12.6464 8.36885C12.6464 8.13635 12.5541 7.91336 12.3897 7.74896C12.2253 7.58455 12.0023 7.49219 11.7698 7.49219C11.5373 7.49219 11.3143 7.58455 11.1499 7.74896C10.9855 7.91336 10.8931 8.13635 10.8931 8.36885C10.8931 8.60136 10.9855 8.82434 11.1499 8.98875C11.3143 9.15316 11.5373 9.24552 11.7698 9.24552C12.0023 9.24552 12.2253 9.15316 12.3897 8.98875C12.5541 8.82434 12.6464 8.60136 12.6464 8.36885ZM5.76978 9.24219C5.88922 9.24956 6.00892 9.23241 6.12148 9.19177C6.23405 9.15113 6.3371 9.08788 6.4243 9.0059C6.51149 8.92393 6.58098 8.82497 6.62847 8.71512C6.67597 8.60527 6.70047 8.48686 6.70047 8.36719C6.70047 8.24751 6.67597 8.1291 6.62847 8.01925C6.58098 7.90941 6.51149 7.81045 6.4243 7.72847C6.3371 7.6465 6.23405 7.58324 6.12148 7.54261C6.00892 7.50197 5.88922 7.48481 5.76978 7.49219C5.53727 7.49219 5.31429 7.58455 5.14988 7.74896C4.98547 7.91336 4.89311 8.13635 4.89311 8.36885C4.89311 8.60136 4.98547 8.82434 5.14988 8.98875C5.31429 9.15316 5.53727 9.24552 5.76978 9.24552V9.24219Z" fill="black" fill-opacity="0.32"/>
                                    </svg>
                                    <span>0</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.78977 1.65801C8.69352 1.57345 8.57494 1.51842 8.44823 1.4995C8.32152 1.48058 8.19204 1.49857 8.07528 1.55132C7.95853 1.60407 7.85945 1.68934 7.7899 1.79694C7.72034 1.90454 7.68327 2.02989 7.68311 2.15801V5.51134C3.74977 5.81135 1.18311 8.93134 1.18311 12.8247C1.18366 12.9561 1.22306 13.0845 1.29635 13.1936C1.36964 13.3027 1.47355 13.3877 1.59502 13.438C1.7165 13.4882 1.85011 13.5014 1.97906 13.4759C2.10801 13.4504 2.22655 13.3874 2.31977 13.2947C3.69977 11.918 5.78644 11.428 7.68311 11.3347V14.658C7.6831 14.7855 7.71962 14.9102 7.78834 15.0176C7.85707 15.1249 7.95511 15.2103 8.07087 15.2636C8.18662 15.3169 8.31523 15.3359 8.44146 15.3184C8.56769 15.3009 8.68626 15.2475 8.78311 15.1647L15.9498 8.99801C16.0222 8.93591 16.0805 8.85897 16.1207 8.7724C16.1609 8.68583 16.182 8.59164 16.1826 8.4962C16.1833 8.40076 16.1634 8.3063 16.1244 8.2192C16.0854 8.1321 16.0281 8.0544 15.9564 7.99134L8.78977 1.65801Z" fill="black" fill-opacity="0.32"/>
                                    </svg>
                                    <span>0</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.04993 2.65631C5.83894 2.65455 5.62967 2.69437 5.43406 2.77349C5.23846 2.85261 5.06036 2.96949 4.90993 3.11744C4.75949 3.2654 4.63968 3.44154 4.55732 3.6358C4.47496 3.83006 4.43168 4.03865 4.42993 4.24964V13.4596C4.42993 13.6596 4.54326 13.843 4.72993 13.933C4.90993 14.023 5.12993 14.0063 5.28993 13.8863L8.92993 11.2296L12.5699 13.8863C12.7333 14.0063 12.9499 14.023 13.1333 13.933C13.3166 13.843 13.4299 13.6596 13.4299 13.4596V4.24964C13.4282 4.03865 13.3849 3.83006 13.3025 3.6358C13.2202 3.44154 13.1004 3.2654 12.9499 3.11744C12.7995 2.96949 12.6214 2.85261 12.4258 2.77349C12.2302 2.69437 12.0209 2.65455 11.8099 2.65631H6.04993Z" fill="black" fill-opacity="0.32"/>
                                    </svg>
                                    <span>0</span>
                                </div>
                            </div>
                                <p className="text-sm text-gray-400">3d ago</p>
                            </div>
                            
                        </div>
                        {/* Reply input */}
                        {/* Reply input */}
                        <div className="bg-[#F9F9F9] border border-gray-300 rounded-md px-4 py-3 relative">
                            <textarea
                                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none"
                                rows={2}
                                placeholder="Reply to comment"
                                maxLength={150}
                            ></textarea>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-400">0/150</span>
                                <div className="flex gap-2 text-xl text-gray-700">
                                    <span className="cursor-pointer">@</span>
                                    <span className="cursor-pointer">😊</span>
                                </div>
                            </div>
                        </div>

                    </div>
                        
                </div>

                

                {/* Filters */}
                <Paper
                    component="form"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: 400,
                        borderRadius: '5px',
                        backgroundColor: '#f5f5f5',
                        padding: '4px 12px',
                        boxShadow: 'none',
                        marginTop: '1rem'
                    }}
                    >
                    <span className='pr-2 mr-2' style={{borderRight: '1px solid #1618231F'}}>
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0662 2.80469C10.4924 2.80469 11.8602 3.37124 12.8687 4.37972C13.8771 5.3882 14.4437 6.75599 14.4437 8.18219C14.4437 9.60839 13.8771 10.9762 12.8687 11.9847C11.8602 12.9931 10.4924 13.5597 9.0662 13.5597C7.64 13.5597 6.27221 12.9931 5.26374 11.9847C4.25526 10.9762 3.6887 9.60839 3.6887 8.18219C3.6887 6.75599 4.25526 5.3882 5.26374 4.37972C6.27221 3.37124 7.64 2.80469 9.0662 2.80469ZM9.0662 1.30469C7.96829 1.3062 6.8867 1.57068 5.91199 2.076C4.93727 2.58132 4.09778 3.31278 3.46378 4.20914C2.82978 5.10551 2.41972 6.1407 2.26792 7.22807C2.11612 8.31545 2.22701 9.42336 2.59129 10.4591C2.95557 11.4948 3.56265 12.4282 4.36171 13.1811C5.16077 13.9341 6.12857 14.4847 7.1841 14.7868C8.23963 15.0889 9.35218 15.1338 10.4286 14.9177C11.5051 14.7016 12.5141 14.2308 13.3712 13.5447L16.7087 16.8822C16.7436 16.9173 16.785 16.9452 16.8307 16.9643C16.8764 16.9833 16.9254 16.9931 16.975 16.9931C17.0245 16.9931 17.0735 16.9833 17.1192 16.9643C17.1649 16.9452 17.2063 16.9173 17.2412 16.8822L17.7662 16.3534C17.8014 16.3186 17.8292 16.2771 17.8483 16.2314C17.8673 16.1857 17.8771 16.1367 17.8771 16.0872C17.8771 16.0377 17.8673 15.9887 17.8483 15.943C17.8292 15.8973 17.8014 15.8558 17.7662 15.8209L14.4325 12.4834C15.243 11.4722 15.7513 10.2525 15.8988 8.96488C16.0463 7.67729 15.8269 6.37424 15.2661 5.20588C14.7052 4.03752 13.8257 3.05141 12.7287 2.36119C11.6318 1.67097 10.3622 1.30473 9.0662 1.30469Z" fill="#161823" fill-opacity="0.5"/>
                    </svg>

                    </span>
                    <InputBase
                        placeholder="Search for comment or username"
                        sx={{
                        flex: 1,
                        fontSize: '14px',
                        color: '#666',
                        }}
                        inputProps={{ 'aria-label': 'search for comment or username' }}
                    />
                    </Paper>
                <div className="flex flex-wrap items-center gap-4 mt-6">
                   
                <Box display="flex" gap={2} flexWrap="wrap">
                    <FormControl size="small">
                        <Select
                        value={commentSort}
                        onChange={handleChange(setCommentSort)}
                        sx={filterStyle}
                        IconComponent={KeyboardArrowDownIcon}

                        >
                        <MenuItem value="latest">Sort by latest comments</MenuItem>
                        <MenuItem value="oldest">Sort by oldest comments</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <Select
                        value={commentType}
                        onChange={handleChange(setCommentType)}
                        sx={filterStyle}
                        IconComponent={KeyboardArrowDownIcon}

                        >
                        <MenuItem value="all">All comments</MenuItem>
                        <MenuItem value="replied">Replied</MenuItem>
                        <MenuItem value="not_replied">Not replied</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <Select
                        value={postedBy}
                        onChange={handleChange(setPostedBy)}
                        sx={filterStyle}
                        IconComponent={KeyboardArrowDownIcon}

                        >
                        <MenuItem value="all">Posted by all</MenuItem>
                        <MenuItem value="followers">Posted by followers</MenuItem>
                        <MenuItem value="non-followers">Posted by non-followers</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <Select
                        value={followerCount}
                        onChange={handleChange(setFollowerCount)}
                        sx={filterStyle}
                        IconComponent={KeyboardArrowDownIcon}
                        >
                        <MenuItem value="all">All follower counts</MenuItem>
                        <MenuItem value="<5K">Less than 5K</MenuItem>
                        <MenuItem value="5K-10K">5K–10K</MenuItem>
                        <MenuItem value="10K-100K">10K–100K</MenuItem>
                        <MenuItem value=">100K">More than 100K</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                </div>

                {/* Date range filter */}
                <div className="mt-4 text-left">
                    <div className="inline-flex gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 bg-white">
                        <span role="img" aria-label="calendar">📅</span>
                        <span>Comment date <strong>3/18/2025 - 4/17/2025</strong></span>
                    </div>
                </div>

                {/* No results */}
                <div className="text-center mt-12 text-gray-500">
                    <p className="text-sm">No results found</p>
                    <button className="mt-3 px-10 py-2 bg-white text-[#FE2C55] !border border-[#F43F5E] rounded-md hover:bg-[#fef2f4] text-sm">
                        Clear all
                    </button>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default CommentAnalytics;

