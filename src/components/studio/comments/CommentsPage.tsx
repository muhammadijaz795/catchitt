import Navbar from '../../../shared/navbar';
import style from './index.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { academyOutlineDark, academyOutlineWhite, analyticsOutline, analyticsOutlineWhite, bulbOutlineDark, bulbOutlineWhite, commentOutlineDark, commentOutlineWhite, commentWhite, feedbackQuestionDark, feedbackQuestionWhite, hamburger, hamburgerDark, homeDark, homeIcon } from '../../../icons';
import {
    Box,
    Button,
    Menu,
    MenuItem,
    TextField,
    Avatar,
    Typography,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    Divider,
    Checkbox,
    Tooltip,
  } from '@mui/material';
  import { PlayArrow, Check, ExpandMore, FavoriteBorder, FilterList, Search } from '@mui/icons-material';

import { relative } from 'path';
import { formatCustomDate } from '../../../utils/helpers';
import UploadSidebar from '../UploadSidebar';

type PostedByOptions = "all" | "followers" | "non-followers";

function CommentsPage() {
    const navigate = useNavigate();

    const [darkTheme, setdarkTheme] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [postedBy, setPostedBy] = useState<PostedByOptions>("all");
    const [dateRange, setDateRange] = useState(
        {
            fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            toDate: new Date()
        }
    );

    interface CommentsInterface
    {
        items: any[];
        page: number;
        isLoading: boolean;
        canLoadMore: boolean;
    }

    const [comments, setComments] = useState<CommentsInterface>(
        {
            items: [],
            page: 1,
            isLoading: false,
            canLoadMore: true,
        }
    );

    function loadComments()
    {
        let endpoint = `${process.env.VITE_API_URL}/media-content/comments?postedBy=${selectedPostedBy}&filter=${selectedAllComments}&q=${searchQuery}&from=${dateRange.fromDate.toISOString()}&to=${dateRange.toDate.toISOString()}`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };
                
        if(!comments.canLoadMore) { return; }

        setComments(prev => ({ ...prev, isLoading: true, canLoadMore: false }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then(
            (response) =>
            {
                if(response.data.data.length)
                {
                    setComments(prev => ({ ...prev, canLoadMore: true, items: [...prev.items, ...response.data.data] }));
                }

                setComments(prev => ({ ...prev, page: prev.page + 1, isLoading: false }));
            }
        )
        .catch((error) => console.error('Fetch error:', error));
    };

    function reloadComments()
    {
        setComments(
            {
                items: [],
                page: 1,
                isLoading: false,
                canLoadMore: true,
            }
        );

        loadComments();
    };

    useEffect(() => {
        loadComments();
        var themeColor = window.localStorage.getItem('theme');
        setdarkTheme('');
        // if (themeColor == 'dark') {
        //     setdarkTheme(style.darkTheme);
        // } else {
        // }
    }, []); 
    const [anchorElAllComments, setAnchorElAllComments] = useState(null);
    const [anchorElPostedBy, setAnchorElPostedBy] = useState(null);
  
    const [selectedAllComments, setSelectedAllComments] = useState<'all' | 'not_replied' | 'replied'>('all');
    const [selectedPostedBy, setSelectedPostedBy] = useState<'all' | 'followers' | 'non-followers'>('all');
  
    const filterOptionsALLComments = {
        all: 'All comments', not_replied: 'Not replied', replied: 'Replied',
    };
  
    const filterOptionsPostedBy = {
        all: 'Posted by all', followers: 'Posted by followers', 'non-followers': 'Posted by non-followers',
    };
  
    // --- Handlers for All Comments
    const handleAllCommentsClick = (event: any) => {
      setAnchorElAllComments(event.currentTarget);
    };
  
    const handleAllCommentsClose = () => {
      setAnchorElAllComments(null);
    };
  
    const handleAllCommentsSelect = (option: any) => {
      setSelectedAllComments(option);
      handleAllCommentsClose();
      reloadComments();
    };
  
    // --- Handlers for Posted By
    const handlePostedByClick = (event: any) => {
      setAnchorElPostedBy(event.currentTarget);
    };
  
    const handlePostedByClose = () => {
      setAnchorElPostedBy(null);
    };
  
    const handlePostedBySelect = (option: any) => {
      setSelectedPostedBy(option);
      handlePostedByClose();
      reloadComments();
    };

    
// New states for follower count
const [anchorElFollower, setAnchorElFollower] = useState(null);
const [selectedFollowerCounts, setSelectedFollowerCounts] = useState<any[]>([]);

// Options
const followerOptions = ['<5K', '5K-10K', '10K-100K', '>100K'];

// Handlers
const handleFollowerClick = (event: any) => {
  setAnchorElFollower(event.currentTarget);
};

const handleFollowerClose = () => {
  setAnchorElFollower(null);
};

const handleFollowerSelect = (option: string) => {
  if (selectedFollowerCounts.includes(option)) {
    setSelectedFollowerCounts(selectedFollowerCounts.filter((item) => item !== option));
  } else {
    setSelectedFollowerCounts([...selectedFollowerCounts, option]);
  }
};

const handleFollowerClear = () => {
  setSelectedFollowerCounts([]);
};

const handleFollowerApply = () => {
  handleFollowerClose();
};




  

    return (
        <div className={`flex flex-col ${darkTheme}`}>
            <Navbar />
            <UploadSidebar />
            <div className='w-[calc(100%-14rem)]  ml-auto pt-20'>
            <Box p={3}>
      {/* Filters and Search */}
      <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mb={3} gap={2}>
      <Box display="flex" gap={1.5} flexWrap="wrap">
        
        {/* All comments filter */}
        <Button
          onClick={handleAllCommentsClick}
          startIcon={<FilterList />}
          endIcon={<ExpandMore />}
          sx={{
            backgroundColor: 'white',
            color: '#000',
            border: '1px solid #e4e6eb',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          {filterOptionsALLComments[selectedAllComments]}
        </Button>

        <Menu
          anchorEl={anchorElAllComments}
          open={Boolean(anchorElAllComments)}
          onClose={handleAllCommentsClose}
          PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 180 } }}
        >
        {Object.entries(filterOptionsALLComments).map(([key, label]) => (
            <MenuItem
                key={key}
                selected={key === selectedAllComments}
                onClick={() => handleAllCommentsSelect(key)}
                sx={{ justifyContent: 'space-between' }}
            >
                {label}
                {key === selectedAllComments && <Check fontSize="small" />}
            </MenuItem>
        ))}

        </Menu>

        {/* Posted by filter */}
        <Button
          onClick={handlePostedByClick}
          startIcon={<FilterList />}
          endIcon={<ExpandMore />}
          sx={{
            backgroundColor: 'white',
            color: '#000',
            border: '1px solid #e4e6eb',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          {filterOptionsPostedBy[selectedPostedBy]}
        </Button>

        <Menu
          anchorEl={anchorElPostedBy}
          open={Boolean(anchorElPostedBy)}
          onClose={handlePostedByClose}
          PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 180 } }}
        >
          {Object.entries(filterOptionsPostedBy).map(([key, label]) => (
            <MenuItem
              key={key}
              selected={key === selectedPostedBy}
              onClick={() => handlePostedBySelect(key)}
              sx={{ justifyContent: 'space-between' }}
            >
              {label}
              {key === selectedPostedBy && <Check fontSize="small" />}
            </MenuItem>
          ))}
        </Menu>

        {/* Other static filters */}
        {/* <Button
                onClick={handleFollowerClick}
                startIcon={<FilterList />}
                endIcon={<ExpandMore />}
                sx={{
                    backgroundColor: 'white',
                    color: '#000',
                    border: '1px solid #e4e6eb',
                    borderRadius: '8px',
                    textTransform: 'none',
                }}
                >
                Follower count
                </Button> */}

                <Menu
                    anchorEl={anchorElFollower}
                    open={Boolean(anchorElFollower)}
                    onClose={handleFollowerClose}
                    PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >                
                    {followerOptions.map((option) => (
                    <MenuItem
                    key={option}
                    onClick={() => handleFollowerSelect(option)}
                    sx={{ justifyContent: 'flex-start', gap: 1,  }}
                    >
                    <Checkbox
                            checked={selectedFollowerCounts.includes(option)}
                            onChange={() => handleFollowerSelect(option)}
                            size="small"
                            sx={{
                                padding: '1px',
                                color: '#ff2c55', // unchecked color
                                '&.Mui-checked': {
                                color: '#ff2c55', // checked color
                                },
                            }}
                            />

                    {option}
                    </MenuItem>
                ))}

                <Divider />

                <Box display="flex" justifyContent="space-between" p={1}>
                    <Button
                    variant="outlined"
                    size="small"
                    onClick={handleFollowerClear}
                    sx={{
                        borderColor: '#ccc',
                        color: '#000',
                        textTransform: 'none',
                        px: 2,
                        borderRadius: '8px',
                    }}
                    >
                    Clear
                    </Button>
                    <Button
                    variant="contained"
                    size="small"
                    onClick={handleFollowerApply}
                    sx={{
                        backgroundColor: '#ff2c55',
                        color: '#fff',
                        textTransform: 'none',
                        px: 3,
                        borderRadius: '8px',
                        '&:hover': {
                        backgroundColor: '#e6003f',
                        },
                    }}
                    >
                    Apply
                    </Button>
                </Box>
                </Menu>

        {/* <Button
          startIcon={<FilterList />}
          sx={{
            backgroundColor: 'white',
            color: '#000',
            border: '1px solid #e4e6eb',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Comment date
        </Button> */}
      </Box>

        {/* Search box */}
        {/* <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '350px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '8px 8px',
            boxShadow: '0 0 0 1px #ccc inset',
            }}>
            <Search style={{ color: '#999', marginRight: '8px' }} />
            <input
                type="text"
                placeholder="Search for comment or username"
                style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                backgroundColor: 'transparent',
                fontSize: '14px',
                }}
            />
            </div> */}

      </Box>

      {/* Comments List */}
      {comments.items.map((comment, idx) => (
        <Card key={idx} variant="outlined" sx={{
            mb: 2,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            '&:hover':{
                backgroundColor: '#E6E8EA'

            },
            '&:hover .hoverArrow': {
              opacity: 1,
              transform: 'translateX(0)',
            },
          }}>
          <CardContent sx={{ display: 'flex', gap: 2, padding: '0.5rem !important' }}>
            <Avatar src={comment.user.avatar} alt={comment.user.name} />
            <Box flexGrow={1}>
                <Box display="flex" alignItems="center" >
                    <Typography variant="body2" fontSize="0.75rem" textAlign='left' color="text.secondary" mt={0.5}>
                        {comment.user.name}
                    </Typography>
                    {/* <Typography variant='body2' mx={0.5} borderRadius={0.25} fontWeight={600} px={0.25} bgcolor='#E0F4F8' fontSize="0.75rem" color='#249EB2'>Creator</Typography> */}
                    <Typography variant='body2' fontSize="0.75rem" >· {formatCustomDate(comment.createdTime)}</Typography>
                </Box>
              <Typography fontWeight={600} my={0.5} textAlign='left' fontSize="0.8375rem">
                {comment.comment}
              </Typography>
              
              <Box display="flex" alignItems="center" gap={1} sx={{ color: 'gray', fontSize: 10 }}>
                {/* Like Section */}
                <Box display="flex" alignItems="center" gap={0.5}>
                    <FavoriteBorder  sx={{ color: 'black', fontSize: '12px'}} />
                    <Typography variant="body2" sx={{ fontWeight: 400, fontSize: 12, color: 'black' }}>
                    {comment.likes}
                    </Typography>
                </Box>

                {/* Vertical Divider */}
                <Divider orientation="vertical" flexItem sx={{ mx: 0.125, borderColor: '#ccc' }} />

                {/* Reply */}
                <Typography onClick={()=>navigate(`/analytics/comment/${comment.media._id}`)}
                    variant="body2"
                    sx={{ fontWeight: 400, fontSize: 12, cursor: 'pointer', color: 'gray' }}
                >
                    Reply
                </Typography>

                {/* Vertical Divider */}
                <Divider orientation="vertical" flexItem sx={{ mx: 0.125, borderColor: '#ccc' }} />

                {/* Delete */}
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 400, fontSize: 12, cursor: 'pointer', color: 'gray' }}
                >
                    Delete
                </Typography>
                </Box>
            </Box>
            {/* Thumbnail */}
            <Box
                width={50}
                height={70}
                borderRadius={2}
                overflow="hidden"
                position="relative"
                sx={{
                    '&:hover .playOverlay': {
                    opacity: 1,
                    },
                }}
                >
                {/* Image */}
                <img
                    src={comment.thumbnail}
                    alt="Thumbnail"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Play Icon Overlay */}
                <Box
                    className="playOverlay"
                    sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    color: '#fff',
                    cursor: 'pointer',
                    }}
                >
                    <PlayArrow sx={{ fontSize: 30 }} />
                </Box>
                </Box>

            <Typography fontWeight={600} textAlign='left' m='auto' fontSize="0.75rem">
                {comment.media.description}
              </Typography>

              <div className='w-40 m-auto' onClick={()=>navigate(`/analytics/comment/${comment.media._id}`)}>
              <Tooltip  componentsProps={{
                tooltip: {
                sx: {
                    fontSize: '1rem', // 14px for example
                },
                },
            }}title="Open all comments" placement="top" >

                <Box sx={{
                    width: 30,
                    height: 30,
                    bgcolor: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    m: 'auto',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                    }} className='hoverArrow'>
                    <svg fill="black" color="inherit" font-size="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M28.74 24 15.08 10.33a1 1 0 0 1 0-1.41l1.84-1.84a1 1 0 0 1 1.41 0L34.54 23.3a1 1 0 0 1 0 1.42l-16.2 16.21a1 1 0 0 1-1.42 0l-1.84-1.84a1 1 0 0 1 0-1.41L28.74 24Z"></path></svg>
                </Box>
                </Tooltip>
              </div>
          </CardContent>
        </Card>
      ))}
    </Box>
            </div>
        </div>
    );
}

export default CommentsPage;
