import { alpha, createTheme, styled, ThemeProvider } from '@mui/material';
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png';
import thumbnail from '../../../assets/thumbnail.png'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { defaultAvatar, goldCoin, logoutSvg, settingsDark, switchAcount, viewProfile } from '../../../icons';
import style from './notifications.module.scss';
import { useAuthStore } from '../../../store/authStore';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteBorder, AlternateEmail, ChatBubbleOutlineSharp } from '@mui/icons-material';
const options = ['View profile', 'Get Coins', 'Settings', 'Switch Account', 'Logout'];
import { useEffect, useState } from 'react';
import { get, post } from '../../../axios/axiosClient';
import { useNavigate } from 'react-router-dom';
import { setNotificationsCount } from '../../../redux/reducers';

export default function NavbarMunu({ onViewProfile, Onlogout, onSettings }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [darkTheme, setdarkTheme] = useState('');
    const [darkThemeblack, setdarkThemeblack] = useState('');
    const [themeColor, setThemeColor] = useState('');
    const [allSection, setAllSection] = useState(true);
    const [likeSection, setLikeSection] = useState(false);
    const [commentSection, setCommentSection] = useState(false);
    const [tagSection, setTagSection] = useState(false);
    const [followerSection, setFollowerSection] = useState(false);
    const [activeClass, setActiveClass] = useState(style.active);
    const [messageRequest, setMessageRequest] = useState(false);
    const [receiveMessageRequest, setReceiveMessageRequest] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page to fetch
    const [hasMoreData, setHasMoreData] = useState(true); // To track if there is more data



    const [notifications, setNotifications] = useState([]);
    type Notification = {
        type: string;
        triggeredUser: {
            avatar: string;
            name: string;
        };
        message?: string;
    };

    type Notify = {
        all: Notification[],
        like: Notification[],
        comment: Notification[],
        tag: Notification[],
        follow: Notification[],
        unknown: Notification[],
        message_requests: []
    }

    const dispatch = useDispatch()

    const [notification, setNotification] = useState<Notify>({ all: [], like: [], comment: [], tag: [], follow: [], unknown: [], message_requests: [] });
    // const [notification, setNotification] = useState<Notification[]>([{type: 'like', triggeredUser: {avatar: defaultAvatar, name: 'dummy'}, message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}, {type: 'Comment', triggeredUser: {avatar: defaultAvatar, name: 'dummy'}, message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }, {type: 'Follow', triggeredUser: {avatar: defaultAvatar, name: 'dummy'}, message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}, {type: 'Tag', triggeredUser: {avatar: defaultAvatar, name: 'dummy'}, message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}, {type: 'Unknown Device Signin', triggeredUser: {avatar: defaultAvatar, name: 'dummy'}, message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}]);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    

    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 8,
            marginTop: theme.spacing(1),
            minWidth: 380,
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px -4px 32px',
            left: '1320px',
            transform: 'translate(65px, 0px) !important',
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity
                    ),
                },
            },
        },
    }));

    const API_KEY = process.env.VITE_API_URL;
    // const token = useSelector((state: any) => state?.reducers?.profile?.token);
    const token = localStorage.getItem('token');

    // const handleGetNotifications = async () => {
    //     console.log("notifcation data");
    //     const res: any = await fetch(`${API_KEY}/notification`, {
    //         method: 'GET',
    //         headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
    //     });
    //     const resData: any = await res.json();
    //     const newNotifications = Array.isArray(resData.data.data)
    //     setNotifications(resData.data.data);
    //     setNotification(resData.data.data);
    //     // console.log("notifcation data",resData,typeof(resData.data.data), notifications, notification);
    // };

    const handleAllSection = async () => {
        setAllSection(true);
        setLikeSection(false);
        setCommentSection(false);
        setTagSection(false);
        setFollowerSection(false);
        setMessageRequest(false);
    }

    const handleLike = async () => {
        setLikeSection(true);
        setAllSection(false);
        setCommentSection(false);
        setTagSection(false);
        setFollowerSection(false);
        setMessageRequest(false);
    }

    const handleComment = async () => {
        setCommentSection(true);
        setAllSection(false);
        setLikeSection(false);
        setTagSection(false);
        setFollowerSection(false);
        setMessageRequest(false);
    }

    const handleTag = async () => {
        setTagSection(true);
        setAllSection(false);
        setLikeSection(false);
        setCommentSection(false);
        setFollowerSection(false);
        setMessageRequest(false);
    }

    const handlefollower = async () => {
        setFollowerSection(true);
        setAllSection(false);
        setLikeSection(false);
        setCommentSection(false);
        setTagSection(false);
        setMessageRequest(false);
    }

    const handleMessageRequest = async () => {
        setMessageRequest(true);
        setFollowerSection(false);
        setAllSection(false);
        setLikeSection(false);
        setCommentSection(false);
        setTagSection(false);
        
    }

    const handleFollowBack = async (userId: any) => {
        console.log("handleFollowBack", userId)
        try {
            const response = await fetch(
                API_KEY + `/profile/${userId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            }
            );
            const responseData = await response.json();
            if (responseData.isFollowed == false) {
                const res = await post(`/profile/follow/${userId}`);
                console.log("handleFollowBack", res);
                if (res?.data) {
                    console.log("handleFollowBack", res?.data)
                }
            }
            const LoggedInUserId = localStorage.getItem('userId');
            const result = await post(`/chat/messages`, {
                type: 'application/json',
                data: {
                    from: LoggedInUserId,
                    to: userId,
                    message: "Hi",
                },
            });
            if (result?.data) {
                console.log("Message sent");
            }
            navigate(`/profile/${userId}`);
        } catch (error) {
            console.log(error);
        }
    };

    // Load more data when user scrolls to the bottom
    const handleScroll = (event: React.UIEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const scrollHeight = target.scrollHeight;
        const scrollTop = target.scrollTop;
        const clientHeight = target.clientHeight;

        console.log('handleScroll....');
        console.log('scrollHeight:', scrollHeight);
        console.log('scrollTop:', scrollTop);
        console.log('clientHeight:', clientHeight);

        // Add a small buffer to ensure it's within 10px of the bottom
        const threshold = 20;
        const isBottom = scrollHeight - scrollTop <= clientHeight + threshold;

        console.log('isBottom:', isBottom, 'hasMoreData:', hasMoreData);

        // Fetch more data if the user is at the bottom and more data is available
        if (isBottom && hasMoreData) {
            console.log('Fetching more data...');
            handleReceiveReqeusts(); // Fetch more data
        }
    };

    const handleReceiveReqeusts = async () => {
        try {
            const response = await fetch(
                API_KEY + `/chat/received-requests?page=${currentPage}&pageSize=5`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            }
            );
            // const responseData = await response.json();
            const responseData = {
                "status": 200,
                "message": "",
                "data": {
                    "data": [
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        },
                        {
                            "_id": "67b721076608a55336d1555b",
                            "createdTime": 1740054791263,
                            "isDeleted": false,
                            "users": [
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "67855e3f0e6f817ae851e2fe",
                                    "name": "Umar Nawaz",
                                    "avatar": "https://cdn.wnsocial.com/images/6EXfI8EgSPcUApV12J8Vg70GsMZPpcV7GbysjCBv.png",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                },
                                {
                                    "activityStatus": {
                                        "isActive": false
                                    },
                                    "_id": "664f7d78552159318a2fd636",
                                    "name": "Ehsan ul haq",
                                    "avatar": "",
                                    "mutedUsers": [],
                                    "blockedUsers": []
                                }
                            ],
                            "pinnedBy": [],
                            "deletedBy": [],
                            "requestStatus": "pending",
                            "senderId": "67855e3f0e6f817ae851e2fe",
                            "receiverId": "664f7d78552159318a2fd636",
                            "nickName": null,
                            "themeColor": null,
                            "emoji": null,
                            "restrict": false,
                            "block": false,
                            "mute": false,
                            "lastModifiedTime": 1740054791264,
                            "__v": 0,
                            "lastMessage": {
                                "_id": "67b721076608a55336d1555e",
                                "createdTime": 1740054791296,
                                "isDeleted": false,
                                "senderId": "67855e3f0e6f817ae851e2fe",
                                "receiverId": "664f7d78552159318a2fd636",
                                "conversationId": "67b721076608a55336d1555b",
                                "starredBy": [],
                                "clearedBy": [],
                                "fileName": null,
                                "message": "Hi",
                                "thumbnail": null,
                                "repliedMessage": null,
                                "type": "Text",
                                "isRead": false,
                                "isForwarded": false,
                                "lastModifiedTime": 1740054791296,
                                "reactions": [],
                                "__v": 0
                            },
                            "unReadMsgsCount": 1,
                            "isPinned": false,
                            "isMuted": false,
                            "isBlocked": false,
                            "isBlockedByOtherUser": false
                        }
                    ],
                    "total": 5
                }
            }
            // setReceiveMessageRequest(responseData.data.data);
            const newMessageRequests = responseData.data.data;

            // Append new data to the existing state
            setReceiveMessageRequest((prevData) => [
                ...prevData,
                ...responseData.data.data,
            ]);

            // Update the message_requests part of the notification state
            setNotification((prevState: any) => {
                return {
                    ...prevState, // Keep the previous notification state intact
                    message_requests: [
                        ...prevState.message_requests, // Add previous message_requests
                        ...newMessageRequests,         // Append new data from API
                    ]
                };
            });
            
            // If we have more data to load, we can keep incrementing the page number
            // if (responseData.data.total <= receiveMessageRequest.length + responseData.data.data.length) {
                setHasMoreData(true); // No more data to load
            // } else {
            //     setCurrentPage((prevPage) => prevPage + 1); // Increment the page number
            // }
            console.log('my all notifications');
            console.log(notification)
            console.log("received requests", receiveMessageRequest);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const acceptRequest = async (notification: any) => {
        console.log('accept request...');
        console.log(notification);
        console.log(notification._id);
    
        const noti_id = notification._id;
        const sender_id = notification.senderId;
        const receiver_id = notification.receiverId;
    
        try {
            const response = await fetch(API_KEY + `/chat/request/accept/${noti_id}`, {
                method: 'POST',
                headers: { 
                    'Content-type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                },
            });
            
            const responseData = await response.json();
            const LoggedInUserId = localStorage.getItem('userId');
            // Sending a message after accepting the request
            const result = await post(`/chat/messages`, {
                type: 'application/json',
                data: {
                    from: receiver_id,
                    to: sender_id,
                    message: "Hi",
                },
            });
    
            if (result?.data) {
                console.log("Message sent");
            }
    
            // Navigate to the receiver's profile after accepting the request
            navigate(`/profile/${receiver_id}`);
    
            // Calling the function to handle further request updates
            // handleReceiveReqeusts();
        } catch (error) {
            console.log(error);
        }
    };

    

    const rejectRequest = async (notification: any) => {
        console.log('rejecct request...');
        console.log(notification);
        console.log(notification._id);
    
        const noti_id = notification._id;
        const sender_id = notification.senderId;
        const receiver_id = notification.receiverId;
        try {
            const response = await fetch(API_KEY + `/chat/request/reject/${noti_id}`, {
                method: 'POST',
                headers: { 
                    'Content-type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                },
            });
            
            const responseData = await response.json();
            const LoggedInUserId = localStorage.getItem('userId');
            // Navigate to the receiver's profile after accepting the request
            navigate(`/profile/${receiver_id}`);
    
            // Calling the function to handle further request updates
            // handleReceiveReqeusts();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        const handleGetNotifications = async () => {
            //   setLoading(true);
            try {
                const response = await fetch(
                    API_KEY + `/notification/web`, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
                }
                );
                const responseData = await response.json();
                const newNotificationList = Array.isArray(responseData.data.data.allActivities)
                ? (responseData.data.data.allActivities as Notification[])
                : [];
                dispatch(setNotificationsCount(newNotificationList));
                // setNotification(responseData.data.data);
                const likeNotifications = responseData.data.data.likes;
                const commentNotifications = responseData.data.data.comments;
                const tagNotifications = responseData.data.data.tags;
                const followNotifications = responseData.data.data.followers;
                const unknownNotifications = newNotificationList.filter((noti:any) => noti.type === 'Unknown Device Signin');
                setNotification({
                    all: newNotificationList, like: likeNotifications, comment: commentNotifications, tag: tagNotifications, follow: followNotifications, unknown: unknownNotifications, message_requests: []
                });
                handleReceiveReqeusts();
                console.log("notification", notification);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        handleGetNotifications();
        

        // handleReceiveReqeusts();
        if (themeColor == "dark") {
            // setdarkThemeWhite(style.darkThemeWhite);
            setActiveClass(style.activeBlack);
            setdarkTheme(style.darkTheme);
            setThemeColor(themeColor);
        } else {
            // setdarkThemeWhite('');
            setdarkTheme('');
            setThemeColor('');
            setActiveClass(style.active);
        }

        return () => {
            setNotification({ all: [], like: [], comment: [], tag: [], follow: [], unknown: [], message_requests: [] });
        };

    }, []);

    useEffect(() => {
        console.log("notification", notification);
    }, [notification])
    


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
        <ThemeProvider theme={darkTheme === '' ? lightThemePalette : darkThemePalette}>
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '0%',
                    zIndex: 200,
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                }}
            >
                <List component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
                    <ListItemButton
                        id="lock-button"
                        aria-haspopup="listbox"
                        aria-controls="lock-menu"
                        //   aria-label="when device is locked"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickListItem}
                        style={{ background: 'transparent' }}
                    ></ListItemButton>
                </List>
                <StyledMenu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    classes={{ paper: 'no-scrollbar' }}
                    MenuListProps={{
                        'aria-labelledby': 'lock-button',
                    }}
                    style={{
                        top: 10,
                        right: 0,
                        width: 200,
                    }}
                >
                    <div className={`${style.notificationsContainer}`}>
                        <span className={`${style.inboxTitle}`}>Notifications</span>
                        <div className={`${style.inboxTabs}`}>
                            <button className={`${style.buttontab} ${allSection ? activeClass : ''} `} onClick={handleAllSection}>All activity</button>
                            <button className={`${style.buttontab} ${likeSection ? activeClass : ''} `} onClick={handleLike}>Likes</button>
                            <button className={`${style.buttontab} ${commentSection ? activeClass : ''} `} onClick={handleComment}>Comments</button>
                            <button className={`${style.buttontab} ${tagSection ? activeClass : ''} `} onClick={handleTag}>Mentions and tags</button>
                            <button className={`${style.buttontab} ${followerSection ? activeClass : ''}`} onClick={handlefollower}>Followers</button>
                            <button className={`${style.buttontab} ${messageRequest ? activeClass : ''} `} onClick={handleMessageRequest}>Message Requests</button>
                        </div>

                        <div className={`${style.inboxList} no-scrollbar`}>
                            {likeSection && (notification.like?.length > 0 ?
                                notification.like.map((noti: any, key: number) => (<div key={key} className={`${style.notificationList}`}>
                                    <div className={`${style.inboxListItem}`}>
                                        <div className={`${style.inboxListInner}`}>
                                            <div className={`${style.avatar}`}>
                                                <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                            </div>
                                            <div className={`${style.gridLine}`}>
                                                {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                <p className={`${style.notificationContent}`}>{noti.message||'liked your video.'}</p>
                                            </div>
                                        </div>
                                        {/* <button className={`${style.inboxFollow}`}>Follow back</button> */}
                                    </div>
                                </div>)) :
                                (<div className={`${style.inboxNoLikes}`}>
                                    <div className={`${style.inboxNoLikesInner}`}>
                                        <FavoriteBorder style={{ fontSize: 60 }} />
                                        <p className={`${style.inboxBoldText}`}>Likes on your videos</p>
                                        <p>When someone likes one of your videos, you'll see it here</p>
                                    </div>
                                </div>))
                            }

                            {commentSection && (notification.comment?.length > 0 ?
                                notification.comment.map((noti: any, key: number) => (<div key={key} className={`${style.notificationList}`}>
                                    <div className={`${style.inboxListItem}`}>
                                        <div className={`${style.inboxListInner}`}>
                                            <div className={`${style.avatar}`}>
                                                <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                            </div>
                                            <div className={`${style.gridLine}`}>
                                                {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                <p className={`${style.notificationContent}`}>{noti.message||'commented on your video.'}</p>
                                            </div>
                                        </div>
                                        {/* <button className={`${style.inboxFollow}`}>Follow back</button> */}
                                    </div>
                                </div>)) :
                                (<div className={`${style.inboxNoComments}`}>
                                    <div className={`${style.inboxNoCommentsInner}`}>
                                        <ChatBubbleOutlineSharp style={{ fontSize: 60 }} />
                                        <p className={`${style.inboxBoldText}`}>Comments on your videos</p>
                                        <p>When someone likes one of your comments, you'll see it here</p>
                                    </div>
                                </div>))
                            }

                            {tagSection && (notification.tag?.length > 0 ?
                                notification.tag.map((noti: any, key: number) => (<div key={key} className={`${style.notificationList}`}>
                                    <div className={`${style.inboxListItem}`}>
                                        <div className={`${style.inboxListInner}`}>
                                            <div className={`${style.avatar}`}>
                                                <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                            </div>
                                            <div className={`${style.gridLine}`}>
                                                {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                <p className={`${style.notificationContent}`}>{noti.message || 'mention you'}</p>
                                            </div>
                                        </div>
                                        {/* <button className={`${style.inboxFollow}`}>Follow back</button> */}
                                    </div>
                                </div> )) :
                                (<div className={`${style.inboxNoMentions}`}>
                                    <div className={`${style.inboxNoMentionsInner}`}>
                                        <AlternateEmail style={{ fontSize: 60 }} />
                                        <p className={`${style.inboxBoldText}`}>Mentions of you</p>
                                        <p>When someone mentions you, you'll see it here</p>
                                    </div>
                                </div>
                                ))
                            }

                            {followerSection && (notification.follow?.length > 0 ?
                                notification.follow.map((noti: any, key: number) => (<div key={key} className={`${style.notificationList}`}>
                                    <div className={`${style.inboxListItem}`}>
                                        <div className={`${style.inboxListInner}`}>
                                            <div className={`${style.avatar}`}>
                                                <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                            </div>
                                            <div className={`${style.gridLine}`}>
                                                {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                <p className={`${style.notificationContent}`}>{noti.message||'Follows you.'}</p>
                                            </div>
                                        </div>
                                        <button className={`${style.inboxFollow}`} onClick={() => { handleFollowBack(noti?.triggeredUser?._id) }}>Follow back</button>
                                    </div>
                                </div> )) :
                                (<div className={`${style.inboxNoMentions}`}>
                                    <div className={`${style.inboxNoMentionsInner}`}>
                                        <AlternateEmail style={{ fontSize: 60 }} />
                                        <p className={`${style.inboxBoldText}`}>Follow of you</p>
                                        <p>When someone follows you, you'll see it here</p>
                                    </div>
                                </div>
                                ))
                            }
                            <div  className={`${style.inboxList}`}  onScroll={(event)=>handleScroll(event)}>
                                {messageRequest && (receiveMessageRequest && receiveMessageRequest.length > 0 ? (
                                    receiveMessageRequest.map((noti: any, key: number) => {
                                        // Print the notification object for debugging
                                        const user = noti?.users?.[0]; // Accessing the first user
                                        const userName = user?.name ? `${user.name} sent request.` : 'User sent request.'; // Fallback name
                                        const userAvatar = user?.avatar || defaultProfileIcon; // Fallback avatar

                                        return (
                                            <div key={key}>
                                                <div className={`${style.inboxListItem}`}>
                                                    <div className={`${style.inboxListInner}`}>
                                                        <div className={`${style.avatar}`}>
                                                            <img src={userAvatar} alt="Profile image" />
                                                        </div>
                                                        <div className={`${style.gridLine}`}>
                                                            <p className={`${style.notificationContent}`}>{userName}</p>
                                                        </div>
                                                    </div>
                                                    <div className={`${style.buttonContainer}`}>
                                                        <button style={{ margin: '5px' }} onClick={() => acceptRequest(noti)} className={`${style.inboxFollow}`}>Accept</button>
                                                        <button style={{ margin: '5px' }} onClick={() => rejectRequest(noti)} className={`${style.inboxFollow}`}>Reject</button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className={`${style.inboxNoMentions}`}>
                                        <div className={`${style.inboxNoMentionsInner}`}>
                                            <AlternateEmail style={{ fontSize: 60 }} />
                                            <p className={`${style.inboxBoldText}`}>No new requests</p>
                                            <p>You'll see your requests here when someone sends them.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>


                        {allSection && notification.all?.length > 0 ? (
                            notification.all.map((noti: any, number: number) => {
                                return (

                                    <div key={number}>
                                        <div className={`${style.inboxList} no-scrollbar`}>
                                            {/* <p className={`${style.inboxListDuration}`}>Today</p> */}
                                            {(noti.type == "like") ?
                                                (

                                                    <div className={`${style.notificationList}`}>
                                                        <div className={`${style.inboxListItem}`}>
                                                            <div className={`${style.inboxListInner}`}>
                                                                <div className={`${style.avatar}`}>
                                                                    <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                                                </div>
                                                                <div className={`${style.gridLine}`}>
                                                                    {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                                    <p className={`${style.notificationContent}`}>{noti.message||'liked your video.'}</p>
                                                                </div>
                                                            </div>
                                                            {/* <button className={`${style.inboxFollow}`}>Follow back</button> */}
                                                        </div>
                                                    </div>

                                                ) : null}


                                            {(noti.type == "Comment") ?
                                                (
                                                    // <>
                                                    //     <p className={`${style.inboxListDuration}`}>Today</p>
                                                    <div className={`${style.notificationList}`}>
                                                        <div className={`${style.inboxListItem}`}>
                                                            <div className={`${style.inboxListInner}`}>
                                                                <div className={`${style.avatar}`}>
                                                                    <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                                                </div>
                                                                <div className={`${style.gridLine}`}>
                                                                    {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                                    <p className={`${style.notificationContent}`}>{noti.message||'commented on your video.'}</p>
                                                                </div>
                                                            </div>
                                                            {/* <button className={`${style.inboxFollow}`}>Follow back</button> */}
                                                        </div>
                                                    </div>
                                                    // </>
                                                ) : null}

                                            {(noti.type == "Follow") ?
                                                (
                                                    // <>
                                                    //     <p className={`${style.inboxListDuration}`}>Today</p>
                                                    <div className={`${style.notificationList}`}>
                                                        <div className={`${style.inboxListItem}`}>
                                                            <div className={`${style.inboxListInner}`}>
                                                                <div className={`${style.avatar}`}>
                                                                    <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                                                </div>
                                                                <div className={`${style.gridLine}`}>
                                                                    {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                                    <p className={`${style.notificationContent}`}>{noti.message||'Follows you.'}</p>
                                                                </div>
                                                            </div>
                                                            <button className={`${style.inboxFollow}`} onClick={() => { handleFollowBack(noti?.triggeredUser?._id) }}>Follow back</button>
                                                        </div>
                                                    </div>
                                                    // </>
                                                ) : null}

                                            {(noti.type == "Tag") ?
                                                (
                                                    // <>
                                                    //     <p className={`${style.inboxListDuration}`}>Today</p>
                                                    <div className={`${style.notificationList}`}>
                                                        <div className={`${style.inboxListItem}`}>
                                                            <div className={`${style.inboxListInner}`}>
                                                                <div className={`${style.avatar}`}>
                                                                    <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                                                </div>
                                                                <div className={`${style.gridLine}`}>
                                                                    {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                                    <p className={`${style.notificationContent}`}>{noti.message||'mention you.'}</p>
                                                                </div>
                                                            </div>
                                                            {/* <button className={`${style.inboxFollow}`}>Follow back</button> */}
                                                        </div>
                                                    </div>
                                                    // </>
                                                ) : null}


                                            {(noti.type == "Unknown Device Signin") ?
                                                (
                                                    // <>
                                                    //     <p className={`${style.inboxListDuration}`}>Today</p>
                                                    <div className={`${style.notificationList}`}>
                                                        <div className={`${style.inboxListItem}`}>
                                                            <div className={`${style.inboxListInner}`}>
                                                                <div className={`${style.avatar}`}>
                                                                    <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                                                </div>
                                                                <div className={`${style.gridLine}`}>
                                                                    {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                                    <p className={`${style.notificationContent}`}>{noti.message||'Unknown device Signin.'}</p>
                                                                </div>
                                                            </div>
                                                            {/* <button className={`${style.inboxFollow}`}>Follow back</button> */}
                                                        </div>
                                                    </div>
                                                    // </>
                                                ) : null}

                                            {(noti.type != "Unknown Device Signin" && noti.type != "Tag" && noti.type != "Follow" && noti.type != "Comment" && noti.type != "Like") ?
                                                (
                                                    // <>
                                                    //     <p className={`${style.inboxListDuration}`}>Today</p>
                                                    <div className={`${style.notificationList}`}>
                                                        <div className={`${style.inboxListItem}`}>
                                                            <div className={`${style.inboxListInner}`}>
                                                                <div className={`${style.avatar}`}>
                                                                    <img src={noti?.triggeredUser?.avatar ? noti?.triggeredUser?.avatar : defaultProfileIcon} alt="Profile image" />
                                                                </div>
                                                                <div className={`${style.gridLine}`}>
                                                                    {/* <p className={`${style.notificationUsername}`}>{noti?.triggeredUser?.name}</p> */}
                                                                    <p className={`${style.notificationContent}`}>{noti?.message}</p>
                                                                </div>
                                                            </div>
                                                            {/* <button className={`${style.inboxFollow}`}>Follow back</button> */}
                                                        </div>
                                                    </div>
                                                    // </>
                                                ) : null}
                                        </div>
                                    </div>

                                )
                            })) : null}


                        {/* <div className={`${style.inboxList}`}>
                        <p className={`${style.inboxListDuration}`}>Today</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername} ${style.notificationFollow}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent} ${style.notificationFollow}`}>Follows you. 4h ago</p>
                                    </div>
                                </div>
                                <button className={`${style.inboxFollow}`}>Follow back</button>
                            </div>
                        </div>
                        <p className={`${style.inboxListDuration}`}>Yesterday</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>

                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername} ${style.notificationFollow}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent} ${style.notificationFollow}`}>Follows you. 4h ago</p>
                                    </div>
                                </div>
                                <button className={`${style.inboxFriends}`}><svg width="1em" data-e2e="" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M43.4143 16.5858L31.1214 4.29289C30.7309 3.90237 30.0977 3.90237 29.7072 4.29289L28.2929 5.70711C27.9024 6.09763 27.9024 6.7308 28.293 7.12132L37.1716 16H5.00006C4.44777 16 4.00006 16.4477 4.00006 17V19C4.00006 19.5523 4.44777 20 5.00006 20H42.0001C42.809 20 43.5383 19.5127 43.8478 18.7654C44.1574 18.018 43.9863 17.1578 43.4143 16.5858Z"></path><path d="M4.58584 31.4142L16.8787 43.7071C17.2693 44.0976 17.9024 44.0976 18.293 43.7071L19.7072 42.2929C20.0977 41.9024 20.0977 41.2692 19.7072 40.8787L10.8285 32L43.0001 32C43.5523 32 44.0001 31.5523 44.0001 31V29C44.0001 28.4477 43.5523 28 43.0001 28L6.00006 28C5.19113 28 4.46186 28.4873 4.1523 29.2346C3.84274 29.982 4.01385 30.8422 4.58584 31.4142Z"></path></svg> Friends</button>
                            </div>
                        </div>
                        <p className={`${style.inboxListDuration}`}>This week</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent}`}>Follows you. 4h ago</p>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                        <p className={`${style.inboxListDuration}`}>This month</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent}`}>Follows you. 4h ago</p>
                                        <div className={`${style.notificationReply}`}><p className={`${style.notificationReplyUser}`}>Sudais Ranjha: <span>❤️❤️❤️</span></p></div>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                        <p className={`${style.inboxListDuration}`}>Previous</p>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Omarranjha</p>
                                        <p className={`${style.notificationContent}`}>liked your video: 5-1</p>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Long Name With All Details & Comments</p>
                                        <p className={`${style.notificationReplyUser}`}>liked your comment: 5-1</p>
                                        <div className={`${style.notificationReply}`}><p className={`${style.notificationReplyUser}`}>Sudais Ranjha: <span>❤️❤️❤️</span></p></div>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                        <div className={`${style.notificationList}`}>
                            <div className={`${style.inboxListItem}`}>
                                <div className={`${style.inboxListInner}`}>
                                    <div className={`${style.avatar}`}>
                                        <img src={defaultProfileIcon} alt="Profile image" />
                                    </div>
                                    <div className={`${style.gridLine}`}>
                                        <p className={`${style.notificationUsername}`}>Sudais Ranjha</p>
                                        <p className={`${style.notificationReplyUser}`}>Replied to your comment: ❤️❤️❤️ 5-1</p>
                                        <div className={`${style.notificationReply}`}><p className={`${style.notificationReplyUser}`}>Sudais Ranjha: <span>❤️❤️❤️</span></p></div>
                                    </div>
                                </div>
                                <div className={`${style.mentionAvatar}`}>
                                    <img src={thumbnail} alt="Profile image" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    </div>
                </StyledMenu>
            </div>
        </ThemeProvider>
    );
}