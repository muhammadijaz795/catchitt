import React, { useEffect, useRef, useState,useCallback } from "react";
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
import GiftsPostLive from "./GiftsPostLive";
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
import { useSearchParams, useNavigate } from 'react-router-dom';
import SidebarChat from './SidebarChat';
import AddLiveGoalModal from "./AddLiveGoalPost";
import {
  fetchRoomDetailsStart,
  fetchRoomDetailsSuccess,
  fetchRoomDetailsFailure,
} from '../../redux/reducers/roomDetailsSlice';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { socket } from '../../src/lib/socket';
import GoLiveTogetherPanel from "./HostGoLiveTogather";

export default function PostLive() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
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
    const [showChatSideBar, setShowChatSideBar] = useState(true);
    const [liveGoals, setLiveGoals] = useState<any>([]);
    const [pinLiveGoal, setPinLiveGoal] = useState<any>(null);
    const [addLiveGoalAutomatically, setAddLiveGoalAutomatically] = useState<any>(true);
    const [openSettings, setOpenSettings] = useState(false);
    const [openGiftsPanel, setOpenGiftsPanel] = useState(false);
    const [openAddLiveGoal, setOpenAddLiveGoal] = useState(false);
     const [righSideEnable, setRighSideEnable] = useState(false);

    // const socketRef = useRef();
    const SERVER_URL = 'https://prodapi.seezitt.com';
    // const [isConnected, setIsConnected] = useState(false);
    const [profileData, setProfileData] = useState<any>([]);
    const authUser = JSON.parse(localStorage.getItem('profile')) || null;
    const [showGoLiveTogetherPanel, setShowGoLiveTogetherPanel] = useState(false);
         const API_KEY = process.env.VITE_API_URL;
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    
        useEffect(() => {
            const profileInfo = localStorage.getItem('profile');
            if (profileInfo) {
            setProfileData(JSON.parse(profileInfo));
            }
        }, []); // ✅ empty array = only runs once
    

    const [profileDetails, setProfileDetails] = useState<any>(
        {
            details: [],
            isLoading: false,
        }
    );

    const [mutedUsers, setMutedUsers] = useState<any>(
        {
            items: [],
            isLoading: false,
        }
    );

    const [blockedUsers, setBlockedUsers] = useState<any>(
        {
            items: [],
            isLoading: false,
        }
    );

    function loadLiveGoals()
    {
        let endpoint = `${process.env.VITE_API_URL}/v2/get-latest-live-goal`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => response.data && setLiveGoals(response.data))
        .catch((error) => console.error('Fetch error:', error));
    };

    function loadMutedUsers()
    {
        let endpoint = `${process.env.VITE_API_URL}/live-stream/v2/get-muted-users`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };

        setMutedUsers((prev: any) => ({ ...prev, isLoading: true }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => setMutedUsers((prev: any) => ({ ...prev, items: response.data, isLoading: false })))
        .catch((error) => console.error('Fetch error:', error));
    };

    function loadBlockedUsers()
    {
        let endpoint = `${process.env.VITE_API_URL}/profile/blocked-users`;
        let requestOptions =
        {
            method: 'GET',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };

        setBlockedUsers((prev: any) => ({ ...prev, isLoading: true }));

        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => setBlockedUsers((prev: any) => ({ ...prev, items: response.data, isLoading: false })))
        .catch((error) => console.error('Fetch error:', error));
    };

     function joinLiveStreamRoom(streamId: any)
    {
        const payload =
        {
            accessToken: token ?? '',
            liveStreamRoomId: streamId || '',
            userId: authUser?._id || '',
            userFullName: authUser?.name || '',
            name: authUser?.name,
            userName: authUser?.username,
            userEmail: authUser?.email,
            userImage: authUser?.avatar || authUser?.cover,
        };

        socket.emit('joinLiveStreamRoom', payload);
    };

    function joinedLiveStreamRoom()
    {
        socket.on('joinedliveStreamRoom',
            (data: any) =>
            {
                const newUser =
                {
                    id: data.userId,
                    name: data.name,
                    photo: data.userImage
                };

                selectedLiveVideo.details?.id === data.liveStreamRoomId && selectedLiveVideo.details?.consumers && setSelectedLiveVideo((prev: any) => ({
                    ...prev,
                    details:
                    {
                        ...prev.details,
                        consumers:
                        [
                            ...prev.details.consumers.filter((item: any) => item.id !== newUser.id),
                            newUser
                        ]
                    }
                }));
            }
        );
    };

    function leftLiveStreamRoom()
    {
        socket.on('leftliveStreamRoom',
            (data: any) =>
            {
                selectedLiveVideo.details?.id === data.liveStreamRoomId && selectedLiveVideo.details?.consumers && setSelectedLiveVideo((prev: any) => ({
                    ...prev,
                    details:
                    {
                        ...prev.details,
                        consumers: [...prev.details.consumers.filter((item: any) => item.id !== data.userId)]
                    }
                }));
            }
        );
    };

    const acceptLiveStreamRoom = (user:any) => {    
        const payload = {
            accessToken: token,
            liveStreamRoomId: streamId,
            userId: user.id,
            name: user.name,
            username: user.username,
            avatar: user.avatar,
            id: user.id,
            status:'joined'
        };
         socket.emit('acceptJoinLiveStreamUserAsGuest', payload);
         loadRoomDetails();
    }

      const sendInviteLiveStreamUser = (user: any) => {
       
        const sendInvite = {
            userId: user.id,
            liveStreamRoomId: streamId,
            accessToken: token,
            name: user.name,
            username: user.username || '',
            avatar: user.avatar,
            id:user.id
        };

        socket.emit('sendInviteLiveStreamUser', sendInvite, (response: any) => {
            console.log('invite live stream room response:', response);
        });
    }

    const rejecctLiveStreamRoom = (user:any) => {
       const payload = {
            accessToken: token,
            liveStreamRoomId: streamId,
            userId: user.id,
            name: user.name,
            username: user.username,
            avatar: user.avatar
        };

         socket.emit('rejectJoinLiveStreamUserAsGuest', payload);
         loadRoomDetails();
    }

    function removeUserFromLiveStreamRoom(streamId: string, userId: string)
    {
        const payload =
        {
            accessToken: token,
            liveStreamRoomId: streamId,
            userId: userId,
        };

        socket.emit('removeUserFromLiveStreamRoom', payload);
    };

    function removedUserFromLiveStreamRoom()
    {
        socket.on('user-removed',
            (data: any) =>
            {
                selectedLiveVideo.details?.consumers && setSelectedLiveVideo((prev: any) => ({
                    ...prev,
                    details:
                    {
                        ...prev.details,
                        consumers: [...prev.details.consumers.filter((item: any) => item.id !== data.userId)]
                    }
                }));
            }
        );
    };

    function endLiveStreamRoom()
    {
        const payload =
        {
            accessToken: token,
            liveStreamRoomId: streamId,
        };

        socket.emit('endLiveStreamRoom', payload);
        navigate('/live/discover');
    };

    useEffect(() => {
        joinedLiveStreamRoom();
        joinLiveStreamRoom(streamId);
        leftLiveStreamRoom();
        removedUserFromLiveStreamRoom();
        socketListners();
    }, []);

    const socketListners = () => {
        socket.on('sendJoinRequestLiveStreamUserAsGuest',(response) => {
            console.log('response of join request live stream..')
            console.log(response);
            loadRoomDetails();
        });
    }


    
    //   useEffect(() => {
    //     startSocket();
    //   }, []);

      
          

    //  function startSocket() {
    //     if ((socketRef.current as any) && (socketRef.current as any).connected) {
    //         console.log('Socket already connected.');
    //         return;
    //     }
    //     (socketRef.current as any) = io(SERVER_URL, {
    //         // transports: ['websocket'],
    //         transports: ['websocket'], // Use WebSocket transport
    //         upgrade: false,            // Prevent transport upgrades
    //         reconnection: true, // Enable reconnection (default is true)
    //         reconnectionAttempts: 5, // Number of reconnection attempts before giving up
    //         reconnectionDelay: 1000, // Time (ms) to wait before trying to reconnect
    //     });

    

    
    //     (socketRef.current as any).on('connect', () => {
    //         setIsConnected(true);
    //         console.log('Connected to socket server.', (socketRef.current as any));
    //         const profileInfo1 = localStorage.getItem('profile');
    //         const profileParsed = JSON.parse(profileInfo1);
    //         if (profileInfo1) {
    //             setProfileData(JSON.parse(profileInfo1));
    //         }

    //         if(profileParsed){
    //             console.log('profile data info', profileParsed);
    //             console.log(profileParsed._id);
    //               let addUserObject = { userId: profileParsed._id, accessToken: token };
    //               let newAddUserObject = JSON.stringify(addUserObject);
    //               (socketRef.current as any).emit('add-user', newAddUserObject);

    //             let joinLiveStreamRoom: { userId: string, id: string, userFullName:string, userEmail:string, liveStreamRoomId: string; accessToken: string; name?: string; userName?: string; email?: string; userImage?: string } = {
    //                 id: streamId,
    //                 userId: profileParsed?._id || '',
    //                 liveStreamRoomId: streamId,
    //                 accessToken: token ?? '',
    //                 userFullName: profileParsed?.name || '',
    //                 name: profileParsed?.name,
    //                 userName: profileParsed?.username, 
    //                 userEmail: profileParsed?.email,
    //                 userImage: profileParsed?.avatar || profileParsed?.cover,
    //             };
                
    //             (socketRef.current as any).emit('joinLiveStreamRoom', joinLiveStreamRoom, (response: any) => {
    //                 console.log('Joined live stream room response:', response);
    //             });
    //         }
          


    //         (socketRef.current as any).on('joinedliveStreamRoom', (data: any) => {
             
    //         });

    //         (socketRef.current as any).on('sendJoinRequestLiveStreamUserAsGuest', (response: any) => {
    //           console.log('sendJoinRequestLiveStreamUserAsGuest response:', response);
    //         });
    

    //         (socketRef.current as any).on('top-viewers', (response: any) => {
    //           console.log('top viewers response:', response);
    //         });
            
           
    //     });
    
    //     (socketRef.current as any).on('connect_error', (error: any) => {
    //         console.error('Connection Error:', error);
    //     });
    
    //     (socketRef.current as any).on('disconnect', () => {
    //         setIsConnected(false);
    //         console.log('Disconnected from socket server.');
    //     });
    
    //     (socketRef.current as any).onclose = (event: any) => {
    //         console.error('WebSocket closed:', event);
    //     };
    
    
    //   }
    

    function updateSettings(payload: any)
    {
        let endpoint = `${process.env.VITE_API_URL}/live-stream/v2/settings/${streamId}`;
        let requestOptions =
        {
            method: 'PATCH',
            headers:
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };

        fetch(endpoint, requestOptions)
        .catch((error) => console.error('Fetch error:', error));
    };

    const toggleSettings = () => {
        // setOpenSettings((prev) => !prev);
        setOpenGiftsPanel((prev) => !prev);
    };

    useEffect(() => {
        loadRoomDetails();
         loadProfileDetails();
        loadLiveGoals();
        loadMutedUsers();
        loadBlockedUsers();
    }, []);

    useEffect(() => {
        let payload =
        {
            liveGoal: liveGoals.map((gift: any) => ({ giftId: gift._id, giftName: gift.name, giftImageUrl: gift.imageUrl, giftCoins: gift.price, count: gift.count })),
            addLiveGoalAutomatically,
        };

        updateSettings(payload);
    }, [liveGoals]);

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
        dispatch(fetchRoomDetailsStart());

        console.log('endpoint', endpoint);
        console.log('requestOptions', requestOptions);  
        fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((response) => { 
            console.log('response data of prelive', response.data);
            dispatch(fetchRoomDetailsSuccess(response.data));
            setSelectedLiveVideo((prev: any) => ({...prev, details: response.data, isLoading: false})); 
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            dispatch(fetchRoomDetailsFailure(error.message || 'Failed to load room details'));
        });
    }


    return (
        <div className='flex ' style={{ background: '#000' }}>
            <SideNavBar />
            <div className={` w-[calc(100%-16rem)] ml-auto bg-white pt-2`}>
                <div className="flex" >
                    {/* Live screen */}
                    <Box className={`w-[calc(100%-360px)]`}>
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
                                style={{ width: "100%", height: "600px", objectFit: "cover" }}
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
                                    gap: 1.5,
                                    justifyContent: "end",
                                }}>
                                    <Avatar src="data:image/jpeg;base64,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" sx={{ width: 24, height: 24 }} />
                                    <Box
                                        onClick={() => setShowGoLiveTogetherPanel(!showGoLiveTogetherPanel)}
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
                                        <PowerSettingsNew onClick={() => endLiveStreamRoom()} />
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
                                            gap: 1,
                                            cursor: "pointer"
                                        }}
                                        onClick={() => setOpenAddLiveGoal(!openAddLiveGoal)}
                                    >
                                        <Typography fontSize={12} color="white" sx={{ ml: 2 }}>
                                            Add Live Goal
                                        </Typography>
                                        <img src={LiveGoal} alt="" />
                                    </Box>
                                    { pinLiveGoal && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <div style={{ display: "column" }}>
                                            <Typography fontSize={14} color="white" sx={{textAlign:'start',mb:0.5}} >
                                                0/{ pinLiveGoal.count }
                                            </Typography>
                                            <img src={HorizontalLine} alt="" />
                                        </div>
                                        <div style={{ display: "column" }}>
                                            <img src={pinLiveGoal.imageUrl} alt="" style={{textAlign:'center', marginBottom:'0px', height: '40px', width: '40px'}} />
                                            {/* <Typography className="live-timer" fontSize={9}>
                                                2h11m
                                            </Typography> */}
                                        </div>
                                    </Box>
                                    )}
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
                    
                    {/* Right Sidebar */}
                                            {/* {profileDetails && showChatSideBar && <SidebarChat selectedLiveVideo={selectedLiveVideo} profileDetails={profileDetails} showFaqsSidebar={()=> {setShowFaqs(!showFaqs); setShowChatSideBar(false); console.log("back button clicked...")}} socket={socket} /> } */}

                    {/* {showFaqs && <Box sx={{ width: 400, }}>
                        <LiveGoalFAQ onBack={() => {setShowFaqs(false); setShowChatSideBar(true)}} />   
                    </Box>} */}
                    

                     <Box sx={{position: 'relative', right: 0, top: 0,width:'350px' }}>
                        {!openGiftsPanel && !openSettings && !showFaqs && profileDetails && showChatSideBar && <SidebarChat selectedLiveVideo={selectedLiveVideo} profileDetails={profileDetails} showFaqsSidebar={()=> {setShowFaqs(!showFaqs); setShowChatSideBar(false); console.log("back button clicked...")}} /> }
                        {!showEditLiveGoal && !showFaqs && !openSettings && !openGiftsPanel && !openAddLiveGoal && <Card sx={{ p: 1, boxShadow: "none" }}>
                            
                            {/* <Box sx={{ position: "absolute" }}>
                                <CardMedia
                                    sx={{
                                        maxWidth: 100,
                                        height: 100,
                                        borderRadius: 3,
                                        p: 1

                                    }}
                                    component="img"
                                    image="data:image/jpeg;base64,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" alt="Thumbnail"
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
                            </CardContent> */}
                        </Card>
                        }
                        {/* {profileDetails && showChatSideBar && <SidebarChat selectedLiveVideo={selectedLiveVideo} profileDetails={profileDetails} showFaqsSidebar={()=> {setShowFaqs(!showFaqs); setShowChatSideBar(false); console.log("back button clicked...")}} /> } */}
                        {showEditLiveGoal && <EditLiveGoal liveGoals={liveGoals} addLiveGoalAutomatically={addLiveGoalAutomatically} onConfirm={()=> setShowEditLiveGoal(!showEditLiveGoal) } onLiveGoalAdded={(goals: any, addLiveGoalAutomatically: any) => { setShowEditLiveGoal(!showEditLiveGoal); setLiveGoals(goals); setAddLiveGoalAutomatically(addLiveGoalAutomatically) }} /> }
                        {showFaqs && <LiveGoalFAQ onBack={() => console.log('Back pressed')} />}
                        {openSettings &&
                            <SettingsPanel />
                        }
                        {openGiftsPanel && 
                        <GiftsPostLive customProps={{mutedUsers, setMutedUsers, blockedUsers, setBlockedUsers}} />
                        }
                        {openAddLiveGoal && 
                        <AddLiveGoalModal
                            liveGoals={liveGoals}
                            profileDetails={ profileDetails }
                            onEdit={() => {setOpenAddLiveGoal(false); setShowEditLiveGoal(true)}}
                            onLiveGoalAdded={(goals) => setOpenAddLiveGoal(false)}
                            onPinGoal={(goal: any) => setPinLiveGoal(goal)}
                        />
                        }
                        { showGoLiveTogetherPanel && <GoLiveTogetherPanel 
                            onAcceptJoinLiveSteam={acceptLiveStreamRoom}  // Pass function reference
                            onRejecctLiveStreamRoom={rejecctLiveStreamRoom}  // Pass function reference
                            post={selectedLiveVideo} 
                            sendInviteLiveStreamUser={sendInviteLiveStreamUser}
                            onRemoveUser={(streamId: string, userId: string) => removeUserFromLiveStreamRoom(streamId, userId)} 
                            /> 
                        }
                    </Box> 
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