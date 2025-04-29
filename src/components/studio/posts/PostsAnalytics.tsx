import {
    Avatar,
    Box,
    Card,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    Checkbox,
    Divider

  } from "@mui/material";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
  import PublicIcon from "@mui/icons-material/Public";
  import UploadSidebar from "../UploadSidebar";
  import { useEffect, useState, useRef } from 'react';
  import Header from "../header/Header";
  import { head } from "lodash";
  import { PlayArrow, Pause, Check, ExpandMore, FavoriteBorder, FilterList, Search } from '@mui/icons-material';
  import { API_KEY } from '../../../utils/constants';
  import { formatCustomDate } from '../../../utils/helpers';
  import ReactPaginate from 'react-paginate';
  import { useNavigate } from 'react-router-dom';
  import { TableSortLabel } from "@mui/material";
  import { InputAdornment, TextField } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import PopupForDeleteVideo from '../../profile/popups/popupForDeleteVideo'; 

  
  const posts1 = [
    {
      thumbnail: "thumbnail_url_1", // replace with real URL
      title: "Quran pak with Urdu translation... #ahsanadventure #muslimcontent",
      date: "Apr 23, 5:04 PM",
      duration: "00:17",
      privacy: "Everyone",
      views: 0,
      likes: 0,
      comments: 0,
    },
    {
      thumbnail: "thumbnail_url_2",
      title: "Rishtay Bewafa Hotay Hain... Emotional Reminder",
      date: "Apr 22, 11:35 AM",
      duration: "00:57",
      privacy: "Everyone",
      views: 0,
      likes: 0,
      comments: 0,
    },
    {
      thumbnail: "thumbnail_url_3",
      title: "videoplayback",
      date: "Feb 24, 11:40 AM",
      duration: "00:49",
      privacy: "Everyone",
      views: 0,
      likes: 0,
      comments: 0,
    },
  ];
  
  export default function PostsAnalytics() {
    const [darkTheme, setdarkTheme] = useState<any>('');
    const abortController = useRef<AbortController | null>(null);
    
    const [anchorElView, setAnchorElView] = useState(null);
    const [anchorElComment, setAnchorElComment] = useState(null);
    const [anchorElLike, setAnchorElLike] = useState(null);
    const [anchorElPrivacy, setAnchorElPrivacy] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();  
  
    const filterOptionsALLComments = {
        all: 'All comments', not_replied: 'Not replied', replied: 'Replied',
    };

    const filterOptionsPostedBy = {
        all: 'Posted by all', followers: 'Posted by followers', 'non-followers': 'Posted by non-followers',
    };

    const [selectedViewsCounts, setSelectedViewsCounts] = useState<string[]>([]);
    const [selectedCommentCounts, setSelectedCommentCounts] = useState<string[]>([]);
    const [selectedLikeCounts, setSelectedLikeCounts] = useState<string[]>([]);
    const [selectedPrivacyCounts, setSelectedPrivacyCounts] = useState<string[]>([]);
    interface Post {
      _id: string;
      thumbnailUrl?: string;
      category?: { name: string };
      createdTime?: string;
      watched_users?: any[];
      likes?: any[];
      commentsCount?: number;
      privacyOptions?: { canView: string };
    }
    
    const [posts, setPosts] = useState<{ items: Post[]; page: number; pageSize: number; totalItems: number; isLoading: boolean }>({
      items: [],
      page: 1,
      pageSize: 10,
      totalItems: 0,
      isLoading: true,
    });
    const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [mediaToDelete, setMediaToDelete] = useState<any>(null);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Options
    const followerOptions = ['<5K', '5K-10K', '10K-100K', '>100Klikes'];
    const viewsOptions = [
      { label: '<1K', value: '0-1000' },
      { label: '1K-10K', value: '1000-10000' },
      { label: '10K-100K', value: '10000-100000' },
      { label: '>100K', value: '100000-99999999' }
    ];
    const likesOptions = viewsOptions;
    const commentsOptions = viewsOptions;
    const privacyOptions = [
      { label: 'Everyone', value: 'everyone' },
      { label: 'Only Me', value: 'onlyme' },
      { label: 'Friends', value: 'friends' },
      { label: 'Followers', value: 'followers' },
    ];

    const buildQueryString = () => {
      let query = [];
    
      if (selectedViewsCounts.length)
        query.push(`viewsCount=${selectedViewsCounts.join(',')}`);
      if (selectedLikeCounts.length)
        query.push(`likesCount=${selectedLikeCounts.join(',')}`);
      if (selectedCommentCounts.length)
        query.push(`commentsCount=${selectedCommentCounts.join(',')}`);
      if (selectedPrivacyCounts.length)
        query.push(`privacy=${selectedPrivacyCounts.join(',')}`);
    
      query.push(`page=${posts.page}`);
      query.push(`pageSize=${posts.pageSize}`);
    
      if (searchQuery.trim()) {
        query.push(`q=${encodeURIComponent(searchQuery.trim())}`);
      }
    
      return query.join('&');
    };
    

    
    const requestSort = (key: string) => {
      let direction: 'asc' | 'desc' = 'asc';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    // Add sorted items calculation
    const getSortedItems = () => {
      if (!sortConfig) return posts.items;
      
      return [...posts.items].sort((a, b) => {
        // Get the values to compare based on sort key
        let aValue, bValue;
    
        switch (sortConfig.key) {
          case 'viewsCount':
            aValue = a.watched_users?.length || 0;
            bValue = b.watched_users?.length || 0;
            break;
          case 'likesCount':
            aValue = a.likes?.length || 0;
            bValue = b.likes?.length || 0;
            break;
          case 'commentsCount':
            aValue = a.commentsCount || 0;
            bValue = b.commentsCount || 0;
            break;
          case 'createdTime':
            aValue = a.createdTime ? new Date(a.createdTime).getTime() : 0;
            bValue = b.createdTime ? new Date(b.createdTime).getTime() : 0;
            break;
          default:
            aValue = a[sortConfig.key as keyof Post];
            bValue = b[sortConfig.key as keyof Post];
        }
    
        // Numeric comparison for counts
        if (sortConfig.key === 'viewsCount' || sortConfig.key === 'likesCount' || sortConfig.key === 'commentsCount') {
          const aNum = typeof aValue === 'number' ? aValue : 0;
          const bNum = typeof bValue === 'number' ? bValue : 0;
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // Date comparison for createdTime
        if (sortConfig.key === 'createdTime') {
          const aNum = typeof aValue === 'number' ? aValue : 0;
          const bNum = typeof bValue === 'number' ? bValue : 0;
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
    
        // Default string comparison
        if (aValue !== undefined && bValue !== undefined && aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if ((aValue ?? 0) > (bValue ?? 0)) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    };

    const deletePost = (post:any) => {
      setMediaToDelete(post);
    }

    const VideoThumbnail = ({ src, originalUrl }: { src: string; originalUrl: string }) => {
      const [isPlaying, setIsPlaying] = useState(false);
      const [hasInteracted, setHasInteracted] = useState(false);
      const videoRef = useRef<HTMLVideoElement>(null);
    
      const togglePlayPause = () => {
        if (!videoRef.current) return;
        
        setHasInteracted(true); // Mark that user has interacted
        
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          // First ensure the video is loaded
          if (videoRef.current.readyState < 3) { // 3 = HAVE_FUTURE_DATA
            videoRef.current.load();
          }
          
          videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(e => {
              console.error("Video play failed:", e);
              // Fallback to showing thumbnail if play fails
              setIsPlaying(false);
              videoRef.current?.pause();
            });
        }
        setIsPlaying(!isPlaying);
      };
    
      return (
        <Box 
          position="relative" 
          sx={{
            width: 56,
            height: 56,
            overflow: 'hidden',
            borderRadius: '4px',
            backgroundColor: '#000',
            cursor: 'pointer'
          }}
          onClick={togglePlayPause}
        >
          {/* Always render video element but control visibility */}
          <video
            ref={videoRef}
            src={originalUrl}
            muted
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: isPlaying && hasInteracted ? 'block' : 'none'
            }}
          />
          
          {/* Thumbnail image */}
          <img
            src={src}
            alt="Video thumbnail"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: !isPlaying || !hasInteracted ? 'block' : 'none'
            }}
          />
          
          {/* Play/Pause overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isPlaying && hasInteracted ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
          </Box>
          
          {/* Duration indicator */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              bgcolor: "rgba(0,0,0,0.7)",
              color: "#fff",
              fontSize: "10px",
              px: 0.5,
              borderRadius: "2px",
            }}
          >
            {/* Duration can go here if needed */}
          </Box>
        </Box>
      );
    };


    const handleViewSelect = (option: string) => {
      if (selectedViewsCounts.includes(option)) {
        setSelectedViewsCounts(selectedViewsCounts.filter((item) => item !== option));
      } else {
        setSelectedViewsCounts([...selectedViewsCounts, option]);
      }
    };

    const handleViewsClear = () => {
      setSelectedViewsCounts([]);
    };
    
    const handleViewsApply = () => {
      handleViewsClose();
      fetchPosts();
    };

    const handleViewsClose = () => {
      setAnchorElView(null);
    };

    const handleViewsClick = (event: any) => {
      setAnchorElView(event.currentTarget);
    };

    const handleCommentClick = (event: any) => {
      setAnchorElComment(event.currentTarget);
    };

    const handleCommentSelect = (option: string) => {
      if (selectedCommentCounts.includes(option)) {
        setSelectedCommentCounts(selectedCommentCounts.filter((item) => item !== option));
      } else {
        setSelectedCommentCounts([...selectedCommentCounts, option]);
      }
    };

    const handleCommentClear = () => {
      setSelectedCommentCounts([]);
    };
    
    const handleCommentApply = () => {
      handleCommentClose();
      fetchPosts();
    };

    const handleCommentClose = () => {
      setAnchorElComment(null);
    };
    

    const handleLikeClick = (event: any) => {
      setAnchorElLike(event.currentTarget);
    };

    const handleLikeSelect = (option: string) => {
      if (selectedLikeCounts.includes(option)) {
        setSelectedLikeCounts(selectedLikeCounts.filter((item) => item !== option));
      } else {
        setSelectedLikeCounts([...selectedLikeCounts, option]);
      }
    };

    const handleLikeClear = () => {
      setSelectedLikeCounts([]);
    };
    
    const handleLikeApply = () => {
      handleLikeClose();
      fetchPosts();
    };

    const handleLikeClose = () => {
      setAnchorElLike(null);
    };

    const handlePrivacyClick = (event: any) => {
      setAnchorElPrivacy(event.currentTarget);
    };

    const handlePrivacySelect = (option: string) => {
      if (selectedPrivacyCounts.includes(option)) {
        setSelectedPrivacyCounts(selectedPrivacyCounts.filter((item) => item !== option));
      } else {
        setSelectedPrivacyCounts([...selectedPrivacyCounts, option]);
      }
    };

    const handlePrivacyClear = () => {
      setSelectedPrivacyCounts([]);
    };
    
    const handlePrivacyApply = () => {
      handlePrivacyClose();
      fetchPosts();
    };

    const handlePrivacyClose = () => {
      setAnchorElPrivacy(null);
    };

    const updatePrivacy = async (postId: string, canView: string) => {
      try {
        const response = await fetch(`${API_KEY}/media-content/${postId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            privacyOptions: {
              canView: canView
            }
          }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update privacy settings');
        }
    
        // Optionally refresh the data or update local state
        const updatedPost = await response.json();
        
        // Update local state without refetching
        setPosts((prev: typeof posts) => ({
          ...prev,
          items: prev.items.map(post => 
            post._id === postId 
              ? { ...post, privacyOptions: { ...post.privacyOptions, canView } } 
              : post
          )
        }));
    
      } catch (error) {
        console.error('Error updating privacy:', error);
        // Optionally show error to user
      }
    };

    const fetchPosts = async () => {
      try {
        const controller = new AbortController();
        abortController.current = controller;
        const queryString = buildQueryString();
    
        const response = await fetch(
          `${API_KEY}/profile/v2/${userId}/videos?${queryString}`,
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );
        const data = await response.json();
    
        setPosts((prev: any) => ({
          ...prev,
          items: data.data.data,
          totalItems: data.data.total,
          isLoading: false
        }));
      } catch (error) {
        console.log(error);
      } finally {
        abortController.current = null;
      }
    };
    
    
      useEffect(() => {
        fetchPosts();
        return () => {
          if (abortController.current) {
            abortController.current.abort();
          }
        }
      }, [posts.page]);

      const handleSort = (column: string) => {
        if (sortColumn === column) {
          // Toggle sort direction
          setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
          setSortColumn(column);
          setSortOrder('asc');
        }
        // Re-fetch data after sort
        fetchPosts();
      };
      
    
    
    
    return (
      <>
      <Header />
     
    
      <div className={`mt-24 flex flex-col ${darkTheme}`}>
        <UploadSidebar />
        <div className='w-[calc(100%-14rem)] ml-auto p-4'>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mb={3} gap={2}>
        <Box display="flex" gap={1.5} flexWrap="wrap">

         {/* Views filter */}
         <Button
            onClick={handleViewsClick}
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
            Views
          </Button>
    
          <Menu
            anchorEl={anchorElView}
            open={Boolean(anchorElView)}
            onClose={handleViewsClose}
            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >                
            {viewsOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => handleViewSelect(option.value)}
                sx={{ justifyContent: 'flex-start', gap: 1 }}
              >
                <Checkbox
                  checked={selectedViewsCounts.includes(option.value)}
                  onChange={() => handleViewSelect(option.value)}
                  size="small"
                  sx={{
                    padding: '1px',
                    color: '#ff2c55',
                    '&.Mui-checked': {
                      color: '#ff2c55',
                    },
                  }}
                />
                {option.label}
              </MenuItem>
            ))}
    
            <Divider />
    
            <Box display="flex" justifyContent="space-between" p={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleViewsClear}
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
                onClick={handleViewsApply}
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

          {/* Like filter */}
         <Button
            onClick={handleLikeClick}
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
            Likes
          </Button>
    
          <Menu
            anchorEl={anchorElLike}
            open={Boolean(anchorElLike)}
            onClose={handleLikeClose}
            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >                
            {likesOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => handleLikeSelect(option.value)}
                sx={{ justifyContent: 'flex-start', gap: 1 }}
              >
                <Checkbox
                  checked={selectedLikeCounts.includes(option.value)}
                  onChange={() => handleLikeSelect(option.value)}
                  size="small"
                  sx={{
                    padding: '1px',
                    color: '#ff2c55',
                    '&.Mui-checked': {
                      color: '#ff2c55',
                    },
                  }}
                />
                {option.label}
              </MenuItem>
            ))}
    
            <Divider />
    
            <Box display="flex" justifyContent="space-between" p={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleLikeClear}
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
                onClick={handleLikeApply}
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

           {/* Privacy filter */}
         <Button
            onClick={handlePrivacyClick}
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
            Privacy
          </Button>
    
          <Menu
            anchorEl={anchorElPrivacy}
            open={Boolean(anchorElPrivacy)}
            onClose={handlePrivacyClose}
            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >                
            {privacyOptions.map((option, index) => (
              <MenuItem
                key={option.value}
                onClick={() => handlePrivacySelect(option.value)}
                sx={{ justifyContent: 'flex-start', gap: 1 }}
              >
                <Checkbox
                  checked={selectedPrivacyCounts.includes(option.value)}
                  onChange={() => handlePrivacySelect(option.value)}
                  size="small"
                  sx={{
                    padding: '1px',
                    color: '#ff2c55',
                    '&.Mui-checked': {
                      color: '#ff2c55',
                    },
                  }}
                />
                {option.label}
              </MenuItem>
            ))}
    
            <Divider />
    
            <Box display="flex" justifyContent="space-between" p={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handlePrivacyClear}
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
                onClick={handlePrivacyApply}
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

            {/* Comments filter */}
         <Button
            onClick={handleCommentClick}
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
            All comments
          </Button>
    
          <Menu
            anchorEl={anchorElComment}
            open={Boolean(anchorElComment)}
            onClose={handleCommentClose}
            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >                
            {commentsOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => handleCommentSelect(option.value)}
                sx={{ justifyContent: 'flex-start', gap: 1 }}
              >
                <Checkbox
                  checked={selectedCommentCounts.includes(option.value)}
                  onChange={() => handleCommentSelect(option.value)}
                  size="small"
                  sx={{
                    padding: '1px',
                    color: '#ff2c55',
                    '&.Mui-checked': {
                      color: '#ff2c55',
                    },
                  }}
                />
                {option.label}
              </MenuItem>
            ))}
    
            <Divider />
    
            <Box display="flex" justifyContent="space-between" p={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCommentClear}
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
                onClick={handleCommentApply}
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


          
        
        </Box>

        <TextField
          placeholder="Search posts..."
          size="small"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              // Explicit search on Enter
              fetchPosts();
            } else {
              // Search on other keys too
              fetchPosts();
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: { borderRadius: 8, backgroundColor: "#fff" },
          }}
          sx={{ width: 250 }}
        />

      </Box>
          <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                    <TableSortLabel
                        active={sortConfig?.key === 'createdTime'}
                        direction={sortConfig?.key === 'createdTime' ? sortConfig.direction : 'asc'}
                        onClick={() => requestSort('createdTime')}
                      >
                    Posts (Created on) 
                    </TableSortLabel>
                    </TableCell>
                    <TableCell>Privacy</TableCell>
                    <TableCell align="center">
                    <TableSortLabel
                        active={sortConfig?.key === 'viewsCount'}
                        direction={sortConfig?.key === 'viewsCount' ? sortConfig.direction : 'asc'}
                        onClick={() => requestSort('viewsCount')}
                      >
                    Views
                    </TableSortLabel>

                    </TableCell>
                    <TableCell align="center">
                    <TableSortLabel
                      active={sortConfig?.key === 'likesCount'}
                      direction={sortConfig?.key === 'likesCount' ? sortConfig.direction : 'asc'}
                      onClick={() => requestSort('likesCount')}
                    >
                      Likes
                    </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                    <TableSortLabel
                     active={sortConfig?.key === 'commentsCount'}
                     direction={sortConfig?.key === 'commentsCount' ? sortConfig.direction : 'asc'}
                     onClick={() => requestSort('commentsCount')}
                    >
                      Comments
                    </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
    
                <TableBody>
                {getSortedItems().map((post:any, index:any) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index === 0 ? "#f5f5f5" : "inherit",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box position="relative" mr={2}>
                            {/* <Avatar
                              variant="rounded"
                              src={post.thumbnailUrl}
                              sx={{ width: 56, height: 56 }}
                            /> */}
                             <VideoThumbnail 
                                src={post.thumbnailUrl} 
                                originalUrl={post.originalUrl} 
                              />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                bgcolor: "rgba(0,0,0,0.7)",
                                color: "#fff",
                                fontSize: "10px",
                                px: 0.5,
                                borderRadius: "2px",
                              }}
                            >
                              {/* {post.duration} */}
                            </Box>
                          </Box>
    
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              noWrap
                              width={200}
                            >
                              {post?.category?.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatCustomDate(post?.createdTime)}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
    
                      {/* Privacy Dropdown */}
                      <TableCell>
                        <Select
                          size="small"
                          value={post?.privacyOptions.canView}
                          onChange={(e) => updatePrivacy(post._id, e.target.value)}
                          IconComponent={PublicIcon}
                          sx={{
                            backgroundColor: "#f1f3f4",
                            fontSize: "12px",
                            height: "32px"
                          }}
                        >
                          <MenuItem value="everyone">Everyone</MenuItem>
                          <MenuItem value="friends">Friends</MenuItem>
                          <MenuItem value="only_me">Only Me</MenuItem>
                          <MenuItem value="followers">Followers</MenuItem>
                        </Select>
                      </TableCell>
    
                      {/* Views */}
                      <TableCell align="center">{post?.watched_users && post?.watched_users?.length}</TableCell>
    
                      {/* Likes */}
                      <TableCell align="center">{post?.likes && post?.likes.length}</TableCell>
    
                      {/* Comments */}
                      <TableCell align="center">{post?.commentsCount}</TableCell>
    
                      {/* Actions */}
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" gap={1}>
                          
                          <Tooltip onClick={()=>deletePost(post)}  title="Delete">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
    
                          <Tooltip onClick={()=>navigate(`/analytics/post/${post._id}`)} title="View Analytics">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <InsertPhotoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
    
                          <Tooltip onClick={()=>navigate(`/analytics/comment/${post._id}`)} title="View Comments">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <ChatBubbleOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
    
                          <Tooltip title="More Options">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <MoreHorizIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </TableContainer>

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

            <PopupForDeleteVideo
              openBlock={Boolean(mediaToDelete)}
              onBlockClose={() => setMediaToDelete(null)}
              info={mediaToDelete}
              darkTheme={false}
              // @ts-ignore
              userId={{ id: userId, name: '' }}
            />
                    
          </Card>
        </div>
      </div>
    </>
    );
  }
  