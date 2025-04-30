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
  import GroupIcon from '@mui/icons-material/Group';
  import LockIcon from '@mui/icons-material/Lock';
  import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import PushPinIcon from '@mui/icons-material/PushPin';
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


    // For the 3-dot "More Options" menu
const [anchorElMoreOptions, setAnchorElMoreOptions] = useState<null | HTMLElement>(null);
const isMoreOptionsOpen = Boolean(anchorElMoreOptions);

const handleMoreOptionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorElMoreOptions(event.currentTarget);
};

const handleMoreOptionsClose = () => {
  setAnchorElMoreOptions(null);
};




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
          sx={{ width: 300 }}
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
                                bottom: 2,
                                left: 2,
                                bgcolor: "rgba(0,0,0,0.7)",
                                color: "#fff",
                                fontSize: "10px",
                                px: 0.5,
                                py: 0.2,
                                borderRadius: "2px",
                              }}
                            >
                            {post.duration}
                          </Box>

                        </Box>
  
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            noWrap
                            width={200}>
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
                        value={post.privacy || 'everyone'}
                        onChange={(event) => handlePrivacyUpdate(post._id, event.target.value)}
                        IconComponent={() => <ExpandMoreIcon sx={{ fontSize: 18, color: '#555' }} />}
                        sx={{
                          border: '1px solid #0000000D',
                          borderRadius: '4px',
                          fontSize: '14px',
                          height: '32px',
                          backgroundColor: 'transparent',
                          minWidth: '140px',
                          '& .MuiSelect-select': {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px'
                          }
                        }}
                        renderValue={(selected) => {
                          const privacyMap: { [key: string]: { icon: JSX.Element; label: string } } = {
                            everyone: { icon: <PublicIcon sx={{ fontSize: 16 }} />, label: 'Everyone' },
                            friends: { icon: <GroupIcon sx={{ fontSize: 16 }} />, label: 'Friends' },
                            only_me: { icon: <LockIcon sx={{ fontSize: 16 }} />, label: 'Only Me' },
                            followers: { icon: <PeopleAltIcon sx={{ fontSize: 16 }} />, label: 'Followers' }
                          };
                          return (
                            <>
                              {privacyMap[selected].icon}
                              {privacyMap[selected].label}
                            </>
                          );
                        }}
                      >
                        <MenuItem value="everyone" sx={{ gap: 2 }}>
                          <PublicIcon sx={{ fontSize: 16, color: 'inherit' }} />
                          Everyone
                        </MenuItem>
                        <MenuItem value="friends" sx={{ gap: 2 }}>
                          <GroupIcon sx={{ fontSize: 16, color: 'inherit' }} />
                          Friends
                        </MenuItem>
                        <MenuItem value="only_me" sx={{ gap: 2 }}>
                          <LockIcon sx={{ fontSize: 16, color: 'inherit' }} />
                          Only Me
                        </MenuItem>
                        <MenuItem value="followers" sx={{ gap: 2 }}>
                          <PeopleAltIcon sx={{ fontSize: 16, color: 'inherit' }} />
                          Followers
                        </MenuItem>
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
                        <Tooltip title="Edit">
                          <IconButton size="small" sx={{ border: "1px solid #00000014", p: 1 }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.3335 14.0339C1.3335 13.857 1.40373 13.6875 1.52876 13.5624C1.65378 13.4374 1.82335 13.3672 2.00016 13.3672H11.3335C11.5103 13.3672 11.6799 13.4374 11.8049 13.5624C11.9299 13.6875 12.0002 13.857 12.0002 14.0339C12.0002 14.2107 11.9299 14.3802 11.8049 14.5053C11.6799 14.6303 11.5103 14.7005 11.3335 14.7005H2.00016C1.82335 14.7005 1.65378 14.6303 1.52876 14.5053C1.40373 14.3802 1.3335 14.2107 1.3335 14.0339Z" fill="black"/>
                          <path d="M11.3309 1.33603C11.1525 1.33309 10.9801 1.40037 10.8509 1.52336L8.85087 3.5247L2.17887 10.1947C2.0862 10.288 2.03887 10.42 2.0122 10.5494L1.34553 13.8847C1.32277 13.9907 1.3269 14.1007 1.35756 14.2047C1.38821 14.3087 1.44442 14.4033 1.52104 14.48C1.59767 14.5567 1.69227 14.613 1.79623 14.6437C1.90019 14.6745 2.01019 14.6787 2.1162 14.656L5.45153 13.9894C5.58087 13.9627 5.71287 13.9147 5.8062 13.8227L12.4762 7.15136C12.7729 6.85536 14.1075 5.5207 14.4782 5.15136C14.601 5.02203 14.668 4.84965 14.6649 4.67136C14.6649 3.58003 14.3869 2.80003 13.8102 2.21136C13.2295 1.61803 12.4515 1.33603 11.3309 1.33603ZM11.5942 2.6827C12.1955 2.71736 12.5862 2.85603 12.8535 3.12936C13.1269 3.40736 13.2995 3.79403 13.3362 4.38403C12.9715 4.7487 12.4362 5.27536 11.9989 5.71336L10.2889 4.00403C10.7275 3.56603 11.2289 3.04736 11.5942 2.6827ZM9.33087 4.96203L11.0395 6.67136L5.99487 11.716L4.28553 10.0067L9.33087 4.96203ZM3.32687 10.9654L5.0362 12.6747L4.97353 12.7374C4.53353 12.8254 3.64487 13.0114 2.82687 13.1754L3.2642 11.0287L3.32687 10.9654Z" fill="black"/>
                          </svg>
                          </IconButton>
                        </Tooltip>
  
                        <Tooltip onClick={()=>navigate(`/analytics/post/${post._id}`)} title="View Analytics">
                          <IconButton size="small" sx={{ border: "1px solid #00000014", p: 1 }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6669 7.61194V9.33594H12.0002V6.00927C12.0002 5.92085 11.9828 5.83329 11.9489 5.7516C11.9151 5.6699 11.8655 5.59568 11.803 5.53315C11.7405 5.47063 11.6662 5.42103 11.5845 5.38719C11.5028 5.35335 11.4153 5.33594 11.3269 5.33594H8.0002V6.66927H9.7242L8.4882 7.90527C8.42573 7.96758 8.3411 8.00259 8.25286 8.0026H6.6842C6.30567 8.0026 5.93842 8.13144 5.64286 8.36794L4.2502 9.48194C4.11211 9.59244 4.02357 9.75328 4.00407 9.92907C3.98457 10.1048 4.03569 10.2812 4.1462 10.4193C4.2567 10.5574 4.41754 10.6459 4.59333 10.6654C4.76911 10.6849 4.94544 10.6338 5.08353 10.5233L6.4762 9.40927C6.5352 9.36193 6.60855 9.33607 6.6842 9.33594H8.25286C8.47175 9.33598 8.6885 9.2929 8.89074 9.20917C9.09297 9.12544 9.27674 9.00269 9.43153 8.84794L10.6669 7.61194Z" fill="black"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.17283 2.66406H10.8275C11.3642 2.66406 11.8075 2.66406 12.1675 2.6934C12.5428 2.72406 12.8875 2.79006 13.2108 2.95473C13.7126 3.21039 14.1205 3.61832 14.3762 4.12006C14.5408 4.4434 14.6068 4.78806 14.6375 5.16273C14.6668 5.52406 14.6668 5.96673 14.6668 6.50273V9.4914C14.6668 10.0281 14.6668 10.4714 14.6375 10.8314C14.6068 11.2067 14.5408 11.5514 14.3762 11.8747C14.1205 12.3765 13.7126 12.7844 13.2108 13.0401C12.8875 13.2047 12.5428 13.2707 12.1682 13.3014C11.8075 13.3307 11.3642 13.3307 10.8282 13.3307H5.17216C4.6355 13.3307 4.19216 13.3307 3.83216 13.3014C3.45683 13.2707 3.11216 13.2047 2.78883 13.0401C2.28709 12.7844 1.87915 12.3765 1.6235 11.8747C1.45883 11.5514 1.39283 11.2067 1.36216 10.8321C1.3335 10.4707 1.3335 10.0281 1.3335 9.49206V6.50273C1.3335 5.96606 1.3335 5.52273 1.36283 5.16273C1.3935 4.7874 1.4595 4.44273 1.62416 4.1194C1.87982 3.61765 2.28775 3.20972 2.7895 2.95406C3.11283 2.7894 3.4575 2.7234 3.83216 2.69273C4.1935 2.66406 4.63683 2.66406 5.17283 2.66406ZM3.94016 4.02273C3.64816 4.04606 3.49816 4.0894 3.39416 4.14273C3.14329 4.27056 2.93933 4.47452 2.8115 4.7254C2.75816 4.8294 2.71483 4.97873 2.6915 5.2714C2.66683 5.5714 2.66683 5.9594 2.66683 6.53073V9.46406C2.66683 10.0354 2.66683 10.4234 2.69216 10.7234C2.7155 11.0154 2.75883 11.1654 2.81216 11.2694C2.93999 11.5203 3.14396 11.7242 3.39483 11.8521C3.49883 11.9054 3.64816 11.9487 3.94083 11.9721C4.24083 11.9974 4.62883 11.9974 5.20016 11.9974H10.8002C11.3715 11.9974 11.7595 11.9974 12.0595 11.9721C12.3515 11.9487 12.5015 11.9054 12.6055 11.8521C12.8564 11.7242 13.0603 11.5203 13.1882 11.2694C13.2415 11.1654 13.2848 11.0161 13.3082 10.7234C13.3328 10.4234 13.3335 10.0354 13.3335 9.46406V6.53073C13.3335 5.9594 13.3335 5.5714 13.3082 5.2714C13.2848 4.9794 13.2415 4.8294 13.1882 4.7254C13.0603 4.47452 12.8564 4.27056 12.6055 4.14273C12.5015 4.0894 12.3522 4.04606 12.0595 4.02273C11.7595 3.9974 11.3715 3.9974 10.8002 3.9974H5.20016C4.62883 3.9974 4.24016 3.9974 3.94016 4.02273Z" fill="black"/>
                          </svg>
                          </IconButton>
                        </Tooltip>
  
                        <Tooltip onClick={()=>navigate(`/analytics/comment/${post._id}`)} title="View Comments">
                          <IconButton size="small"  sx={{ border: "1px solid #00000014", p: 1 }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.66683 7.33073C2.66683 5.04606 4.9355 2.9974 8.00016 2.9974C11.0648 2.9974 13.3335 5.04606 13.3335 7.33073C13.3335 8.76273 12.6188 10.0221 11.6035 11.0767C10.9042 11.8027 10.0868 12.4047 9.3335 12.8654V11.6641H8.00016C4.9355 11.6641 2.66683 9.6154 2.66683 7.33073ZM8.00016 1.66406C4.43683 1.66406 1.3335 4.09273 1.3335 7.33073C1.3335 10.5687 4.43683 12.9974 8.00016 12.9974V13.9974C8.00022 14.111 8.02931 14.2227 8.08466 14.3219C8.14001 14.4211 8.21979 14.5045 8.31643 14.5642C8.41306 14.6239 8.52336 14.6579 8.63683 14.663C8.75031 14.6681 8.86322 14.6442 8.96483 14.5934C10.0082 14.0721 11.4115 13.1981 12.5635 12.0014C13.7148 10.8061 14.6668 9.23206 14.6668 7.33073C14.6668 4.09273 11.5628 1.66406 8.00016 1.66406ZM6.00016 7.4974C6.00016 7.71841 5.91237 7.93037 5.75609 8.08665C5.5998 8.24293 5.38784 8.33073 5.16683 8.33073C4.94582 8.33073 4.73385 8.24293 4.57757 8.08665C4.42129 7.93037 4.3335 7.71841 4.3335 7.4974C4.3335 7.27638 4.42129 7.06442 4.57757 6.90814C4.73385 6.75186 4.94582 6.66406 5.16683 6.66406C5.38784 6.66406 5.5998 6.75186 5.75609 6.90814C5.91237 7.06442 6.00016 7.27638 6.00016 7.4974ZM8.8335 7.4974C8.8335 7.71841 8.7457 7.93037 8.58942 8.08665C8.43314 8.24293 8.22118 8.33073 8.00016 8.33073C7.77915 8.33073 7.56719 8.24293 7.41091 8.08665C7.25463 7.93037 7.16683 7.71841 7.16683 7.4974C7.16683 7.27638 7.25463 7.06442 7.41091 6.90814C7.56719 6.75186 7.77915 6.66406 8.00016 6.66406C8.22118 6.66406 8.43314 6.75186 8.58942 6.90814C8.7457 7.06442 8.8335 7.27638 8.8335 7.4974ZM10.8335 8.33073C11.0545 8.33073 11.2665 8.24293 11.4228 8.08665C11.579 7.93037 11.6668 7.71841 11.6668 7.4974C11.6668 7.27638 11.579 7.06442 11.4228 6.90814C11.2665 6.75186 11.0545 6.66406 10.8335 6.66406C10.6125 6.66406 10.4005 6.75186 10.2442 6.90814C10.088 7.06442 10.0002 7.27638 10.0002 7.4974C10.0002 7.71841 10.088 7.93037 10.2442 8.08665C10.4005 8.24293 10.6125 8.33073 10.8335 8.33073Z" fill="black"/>
                          </svg>
                          </IconButton>
                        </Tooltip>
  
                          <IconButton onClick={handleMoreOptionsClick} size="small" sx={{ border: "1px solid #00000014", p: 1 }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.6665 7.9974C1.6665 7.64377 1.80698 7.30464 2.05703 7.05459C2.30708 6.80454 2.64622 6.66406 2.99984 6.66406C3.35346 6.66406 3.6926 6.80454 3.94265 7.05459C4.19269 7.30464 4.33317 7.64377 4.33317 7.9974C4.33317 8.35102 4.19269 8.69016 3.94265 8.9402C3.6926 9.19025 3.35346 9.33073 2.99984 9.33073C2.64622 9.33073 2.30708 9.19025 2.05703 8.9402C1.80698 8.69016 1.6665 8.35102 1.6665 7.9974ZM6.6665 7.9974C6.6665 7.64377 6.80698 7.30464 7.05703 7.05459C7.30708 6.80454 7.64622 6.66406 7.99984 6.66406C8.35346 6.66406 8.6926 6.80454 8.94265 7.05459C9.19269 7.30464 9.33317 7.64377 9.33317 7.9974C9.33317 8.35102 9.19269 8.69016 8.94265 8.9402C8.6926 9.19025 8.35346 9.33073 7.99984 9.33073C7.64622 9.33073 7.30708 9.19025 7.05703 8.9402C6.80698 8.69016 6.6665 8.35102 6.6665 7.9974ZM11.6665 7.9974C11.6665 7.64377 11.807 7.30464 12.057 7.05459C12.3071 6.80454 12.6462 6.66406 12.9998 6.66406C13.3535 6.66406 13.6926 6.80454 13.9426 7.05459C14.1927 7.30464 14.3332 7.64377 14.3332 7.9974C14.3332 8.35102 14.1927 8.69016 13.9426 8.9402C13.6926 9.19025 13.3535 9.33073 12.9998 9.33073C12.6462 9.33073 12.3071 9.19025 12.057 8.9402C11.807 8.69016 11.6665 8.35102 11.6665 7.9974Z" fill="black"/>
                          </svg>
                          </IconButton>
                          <Menu
                            anchorEl={anchorElMoreOptions}
                            open={isMoreOptionsOpen}
                            onClose={handleMoreOptionsClose}
                            PaperProps={{
                              sx: {
                                borderRadius: 2,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                mt: 1,
                                minWidth: 160,
                                paddingX: 0.5,
                                paddingY: 1,
                              },
                            }}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                            <MenuItem onClick={handleMoreOptionsClose}>
                              <PushPinIcon sx={{ fontSize: 18, mr: 1, color: '#000' }} />
                              <Typography variant="body2" color="text.primary">
                                Pin to top
                              </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleMoreOptionsClose}>
                              <DeleteIcon sx={{ fontSize: 18, mr: 1, color: '#f44336' }} />
                              <Typography variant="body2" sx={{ color: '#f44336' }}>
                                Delete
                              </Typography>
                            </MenuItem>
                          </Menu>
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
                  
        </Card>

        </div>
      </div>
    </>
    );
  }
  