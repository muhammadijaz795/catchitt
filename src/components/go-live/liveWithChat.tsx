import { SideNavBar } from './goLiveSidebar';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { notification } from 'antd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box,  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl, IconButton, Chip, AppBar, Typography, Collapse, CardMedia, Stack, Avatar, Grid, CardContent, Button, Toolbar, Paper, Divider, TextField, InputAdornment, Menu, MenuItem, ListItemIcon, ListItemText, 
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Popover,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Popper} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { WhatsApp, Facebook, Telegram, LinkedIn, Pinterest, Email, Reddit} from '@mui/icons-material';
import XIcon from '@mui/icons-material/Close'; // 
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RankingSettingsModal from './popuprating';
import { io } from 'socket.io-client';

import { emoji, mic, paperClip } from '../../icons';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { shareProfileby, socialShareText } from '../../utils/helpers';
import CustomMediaPicker from '../user-chat/components/CustomMediaPicker';
// import { ClickAwayListener, Modal } from '@mui/material';
import { get, post } from '../../axios/axiosClient';

import FlagIcon from '@mui/icons-material/Flag';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useNavigate, useSearchParams } from 'react-router-dom';
import  styles  from './GoLive.module.scss';
import { caesium,defaultGreyBackground } from '../../icons';
import { abs } from 'mathjs';
import  GamingLiveUI  from './categories';
import { dark } from '@mui/material/styles/createPalette';
import { socket } from '../../src/lib/socket';
import GuestRequestCard from './GuestRequestCard';
import LiveInviteCard from './InviteGuestLive';



const reasons = [
  'Violent extremism',
  'Hateful behavior',
  'Illegal activities and regulated goods',
  'Frauds and scams',
  'Violent and graphic content',
  'Suicide, self-harm, and dangerous acts',
  'Harassment or bullying',
  'Adult nudity and sexual activity',
  'Minor safety',
  'Spam and fake engagement',
  'False information',
  'Intellectual property infringement',
];


const shareOptions = [
  { action: 'whatsapp', label: 'Share on WhatsApp', icon: <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.0897 25.4557C19.9702 25.4557 25.548 19.8779 25.548 12.9974C25.548 6.11688 19.9702 0.539062 13.0897 0.539062C6.20916 0.539062 0.631348 6.11688 0.631348 12.9974C0.631348 19.8779 6.20916 25.4557 13.0897 25.4557Z" fill="#25D366"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.8289 13.871C16.6541 13.7836 15.7951 13.361 15.635 13.3026C15.4749 13.2443 15.3584 13.2152 15.2419 13.39C15.1254 13.565 14.7906 13.9585 14.6887 14.0752C14.5868 14.1917 14.4849 14.2063 14.3102 14.1189C14.1354 14.0314 13.5725 13.8469 12.9051 13.2517C12.3858 12.7884 12.0351 12.2163 11.9332 12.0414C11.8313 11.8665 11.9223 11.7719 12.0098 11.6848C12.0884 11.6065 12.1846 11.4807 12.2719 11.3787C12.3592 11.2767 12.3884 11.2038 12.4466 11.0872C12.5048 10.9706 12.4758 10.8686 12.432 10.7812C12.3883 10.6937 12.039 9.83368 11.8934 9.48382C11.7515 9.14317 11.6075 9.18932 11.5003 9.18395C11.3984 9.17886 11.2819 9.17778 11.1654 9.17778C11.049 9.17778 10.8596 9.22149 10.6995 9.3964C10.5394 9.5713 10.088 9.99402 10.088 10.8539C10.088 11.714 10.714 12.5447 10.8014 12.6613C10.8888 12.778 12.0334 14.5427 13.786 15.2994C14.2029 15.4795 14.5283 15.5869 14.7821 15.6674C15.2006 15.8005 15.5815 15.7817 15.8825 15.7367C16.2182 15.6866 16.9162 15.3141 17.0618 14.906C17.2074 14.4978 17.2074 14.148 17.1637 14.0752C17.1201 14.0022 17.0035 13.9585 16.8289 13.871ZM13.6412 18.223H13.6388C12.5959 18.2226 11.5731 17.9424 10.6807 17.4129L10.4685 17.2869L8.2689 17.8639L8.85601 15.7193L8.71784 15.4994C8.13609 14.5741 7.8288 13.5047 7.82923 12.4065C7.83053 9.20215 10.4377 6.59517 13.6434 6.59517C15.1958 6.59571 16.6549 7.20102 17.7523 8.29958C18.8495 9.39808 19.4535 10.8583 19.4529 12.4112C19.4516 15.6158 16.8444 18.223 13.6412 18.223ZM18.5872 7.4647C17.267 6.14304 15.5114 5.41482 13.6409 5.41406C9.78676 5.41406 6.64997 8.55064 6.64845 12.4059C6.64796 13.6383 6.96993 14.8412 7.5818 15.9017L6.58984 19.525L10.2966 18.5527C11.3179 19.1097 12.4678 19.4034 13.6381 19.4037H13.6409C17.4947 19.4037 20.6317 16.2668 20.6333 12.4115C20.634 10.5432 19.9073 8.78637 18.5872 7.4647Z" fill="white"/>
</svg>
 },
  { action: 'facebook', label: 'Share on Facebook', icon: <Facebook sx={{ color: '#1877F2' }} /> },
  { action: 'twitter', label: 'Share on X', icon: <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_2018_20200" maskUnits="userSpaceOnUse" x="0" y="0" width="27" height="26">
<path d="M0.0898438 0H26.0898V26H0.0898438V0Z" fill="white"/>
</mask>
<g mask="url(#mask0_2018_20200)">
<path d="M13.0898 26C20.2695 26 26.0898 20.1797 26.0898 13C26.0898 5.8203 20.2695 0 13.0898 0C5.91014 0 0.0898438 5.8203 0.0898438 13C0.0898438 20.1797 5.91014 26 13.0898 26Z" fill="black"/>
<path d="M17.2932 6.39062H19.5357L14.639 11.9915L20.4023 19.6073H15.8903L12.3532 14.9869L8.31234 19.6073H6.06443L11.3078 13.6219L5.77734 6.39062H10.4032L13.599 10.6156L17.2932 6.39062ZM16.5078 18.264H17.7536L9.73151 7.66354H8.39359L16.5078 18.264Z" fill="white"/>
</g>
</svg>
 },
  { action: 'copyLink', label: 'Copy link', icon: 
    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.0898 26C20.2695 26 26.0898 20.1797 26.0898 13C26.0898 5.8203 20.2695 0 13.0898 0C5.91014 0 0.0898438 5.8203 0.0898438 13C0.0898438 20.1797 5.91014 26 13.0898 26Z" fill="#FE2C55"/>
<path d="M12.3345 16.483C11.4577 17.3599 10.1697 17.3507 9.45439 16.6353C8.73914 15.9201 8.7299 14.632 9.60676 13.7552C9.90537 13.4566 9.90537 12.9724 9.60676 12.6738C9.30814 12.3751 8.82399 12.3751 8.52538 12.6738C7.13099 14.0683 6.98384 16.3276 8.37301 17.7168C9.76219 19.106 12.0215 18.9589 13.4159 17.5644L14.525 16.4553C15.6972 15.2831 15.9838 13.5203 15.2334 12.1532C15.0302 11.7829 14.5655 11.6475 14.1952 11.8507C13.825 12.0539 13.6896 12.5187 13.8928 12.889C14.2917 13.6159 14.1717 14.6458 13.4437 15.3739L12.3345 16.483ZM13.8451 9.51697C14.722 8.6401 16.0101 8.64933 16.7253 9.3646C17.4405 10.0799 17.4498 11.368 16.573 12.2448C16.2743 12.5434 16.2743 13.0276 16.573 13.3262C16.8715 13.6249 17.3557 13.6249 17.6544 13.3262C19.0487 11.9317 19.1958 9.67241 17.8067 8.2832C16.4175 6.89399 14.1582 7.04113 12.7638 8.43557L11.6546 9.54471C10.4825 10.7169 10.1959 12.4797 10.9463 13.8468C11.1495 14.2171 11.6142 14.3525 11.9845 14.1493C12.3547 13.9461 12.4901 13.4812 12.2869 13.111C11.888 12.3841 12.008 11.3542 12.736 10.6261L13.8451 9.51697Z" fill="white"/>
</svg>

   },
  { action: 'telegram', label: 'Share on Telegram', icon: <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.0898 26C20.2695 26 26.0898 20.1797 26.0898 13C26.0898 5.82032 20.2695 0 13.0898 0C5.91016 0 0.0898438 5.82032 0.0898438 13C0.0898438 20.1797 5.91016 26 13.0898 26Z" fill="#37AEE2"/>
<path d="M8.25342 13.5944L9.97814 18.1839C9.97814 18.1839 10.1937 18.6126 10.4241 18.6126C10.6545 18.6126 14.0891 15.1779 14.0891 15.1779L17.908 8.08594L8.31376 12.4089L8.25342 13.5944Z" fill="#C8DAEA"/>
<path d="M10.5412 14.7734L10.2098 18.156C10.2098 18.156 10.0719 19.1923 11.1486 18.156C12.2253 17.1197 13.2589 16.3202 13.2589 16.3202" fill="#A9C6D8"/>
<path d="M8.28504 13.7613L4.73707 12.6503C4.73707 12.6503 4.31328 12.4845 4.45003 12.1103C4.47836 12.0332 4.53503 11.9669 4.7038 11.8532C5.48978 11.3262 19.2529 6.57096 19.2529 6.57096C19.2529 6.57096 19.6422 6.4454 19.8713 6.52833C19.976 6.56624 20.0438 6.61006 20.0992 6.76758C20.1202 6.8244 20.1312 6.94758 20.13 7.06837C20.1288 7.15601 20.1177 7.23656 20.1091 7.3645C20.0253 8.66493 17.5171 18.3696 17.5171 18.3696C17.5171 18.3696 17.3668 18.9369 16.8297 18.957C16.6338 18.9641 16.3961 18.9263 16.1115 18.6906C15.0557 17.8177 11.4092 15.4608 10.6035 14.9432C10.5579 14.9136 10.5456 14.8757 10.537 14.839C10.5259 14.7845 10.5875 14.717 10.5875 14.717C10.5875 14.717 16.9381 9.29029 17.1069 8.72056C17.1204 8.67674 17.0711 8.65426 17.0046 8.67322C16.5833 8.82245 9.27055 13.2615 8.46368 13.7518C8.41683 13.7802 8.28504 13.7613 8.28504 13.7613Z" fill="white"/>
</svg>
 },
  { action: 'linkedin', label: 'Share on LinkedIn', icon: <LinkedIn sx={{ color: '#0077b5' }} /> },
  { action: 'reddit', label: 'Share on Reddit', icon: <Reddit sx={{ color: '#FF4500' }} /> },
  { action: 'pinterest', label: 'Share on Pinterest', icon: <Pinterest sx={{ color: '#E60023' }} /> },
  { action: 'line', label: 'Share on Line', icon: <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.0897 25.4557C19.9703 25.4557 25.548 19.8779 25.548 12.9974C25.548 6.11683 19.9703 0.539062 13.0897 0.539062C6.20916 0.539062 0.631348 6.11683 0.631348 12.9974C0.631348 19.8779 6.20916 25.4557 13.0897 25.4557Z" fill="#00B900"/>
<path d="M21.7567 12.1503C21.7567 8.27222 17.869 5.11719 13.09 5.11719C8.31153 5.11719 4.42334 8.27222 4.42334 12.1503C4.42334 15.627 7.50661 18.5386 11.6714 19.0892C11.9537 19.15 12.3378 19.2753 12.435 19.5165C12.5224 19.7357 12.4922 20.0789 12.4629 20.3002C12.4629 20.3002 12.3612 20.9118 12.3393 21.0421C12.3016 21.2612 12.1652 21.899 13.09 21.5093C14.0151 21.1195 18.0812 18.5703 19.8995 16.4774C21.1555 15.1001 21.7567 13.7024 21.7567 12.1503Z" fill="white"/>
<path d="M11.3291 10.2734H10.7212C10.628 10.2734 10.5522 10.3491 10.5522 10.4419V14.2183C10.5522 14.3113 10.628 14.3868 10.7212 14.3868H11.3291C11.4223 14.3868 11.4979 14.3113 11.4979 14.2183V10.4419C11.4979 10.3491 11.4223 10.2734 11.3291 10.2734Z" fill="#00B900"/>
<path d="M15.5134 10.2734H14.9055C14.8123 10.2734 14.7367 10.3491 14.7367 10.4419V12.6855L13.0061 10.3484C13.0022 10.3424 12.9977 10.3368 12.993 10.3313L12.9919 10.3303C12.9885 10.3265 12.9852 10.3231 12.9817 10.3198C12.9807 10.3188 12.9797 10.318 12.9786 10.317C12.9757 10.3143 12.9728 10.3118 12.9696 10.3095C12.9683 10.3082 12.9667 10.3072 12.9653 10.306C12.9623 10.304 12.9594 10.3019 12.9565 10.3C12.9548 10.2989 12.9532 10.2979 12.9513 10.2971C12.9483 10.2952 12.9454 10.2934 12.9423 10.2919C12.9405 10.291 12.9389 10.2901 12.937 10.2894C12.9339 10.2879 12.9307 10.2864 12.9274 10.2852C12.9254 10.2846 12.9237 10.2839 12.9219 10.2832C12.9186 10.2821 12.9153 10.2809 12.9118 10.2801C12.9099 10.2795 12.908 10.2791 12.906 10.2784C12.9026 10.2778 12.8995 10.277 12.8963 10.2763C12.894 10.2759 12.8915 10.2756 12.8892 10.2754C12.8862 10.2748 12.8832 10.2746 12.8802 10.2743C12.8774 10.274 12.8746 10.274 12.8716 10.2738C12.8694 10.2738 12.8677 10.2734 12.8656 10.2734H12.2578C12.1646 10.2734 12.0889 10.3491 12.0889 10.4419V14.2183C12.0889 14.3113 12.1646 14.3868 12.2578 14.3868H12.8656C12.9589 14.3868 13.0346 14.3113 13.0346 14.2183V11.9754L14.7672 14.3155C14.7792 14.3325 14.794 14.3462 14.8101 14.3572L14.8118 14.3585C14.8152 14.3607 14.8188 14.3629 14.8222 14.3649C14.8239 14.3658 14.8254 14.3665 14.827 14.3674C14.8295 14.3689 14.8324 14.3702 14.835 14.3714C14.8379 14.3725 14.8404 14.3737 14.8434 14.3748C14.845 14.3755 14.8467 14.3762 14.8483 14.3767C14.8523 14.3781 14.856 14.3793 14.8598 14.3805L14.8623 14.381C14.8761 14.3846 14.8905 14.3868 14.9055 14.3868H15.5134C15.6068 14.3868 15.6822 14.3113 15.6822 14.2183V10.4419C15.6822 10.3491 15.6068 10.2734 15.5134 10.2734Z" fill="#00B900"/>
<path d="M9.86341 13.4413H8.21165V10.4422C8.21165 10.3491 8.13603 10.2734 8.04297 10.2734H7.4349C7.34173 10.2734 7.26611 10.3491 7.26611 10.4422V14.218C7.26611 14.2634 7.2842 14.3047 7.31329 14.335C7.31394 14.3358 7.31465 14.3366 7.31562 14.3375C7.31643 14.3383 7.3173 14.3389 7.31811 14.3398C7.3485 14.369 7.3894 14.387 7.43473 14.387H9.86341C9.95663 14.387 10.0319 14.3112 10.0319 14.218V13.6101C10.0319 13.5169 9.95663 13.4413 9.86341 13.4413Z" fill="#00B900"/>
<path d="M18.8702 11.2191C18.9634 11.2191 19.0387 11.1437 19.0387 11.0503V10.4424C19.0387 10.3492 18.9634 10.2734 18.8702 10.2734H16.4417C16.3962 10.2734 16.3548 10.2917 16.3244 10.3211C16.3238 10.3218 16.3229 10.3223 16.3225 10.3229C16.3214 10.3239 16.3206 10.3249 16.3198 10.3259C16.2909 10.3561 16.2729 10.397 16.2729 10.4422V14.2181C16.2729 14.2635 16.291 14.3047 16.3201 14.335C16.3208 14.3358 16.3216 14.3368 16.3225 14.3375C16.3231 14.3383 16.3241 14.3391 16.3249 14.3398C16.3552 14.3688 16.3962 14.387 16.4414 14.387H18.8702C18.9634 14.387 19.0387 14.3112 19.0387 14.2181V13.6101C19.0387 13.517 18.9634 13.4413 18.8702 13.4413H17.2186V12.803H18.8702C18.9634 12.803 19.0387 12.7274 19.0387 12.6341V12.0262C19.0387 11.933 18.9634 11.8573 18.8702 11.8573H17.2186V11.2191H18.8702Z" fill="#00B900"/>
</svg>
 },
  { action: 'email', label: 'Share on Email', icon: <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.0898 26C20.2695 26 26.0898 20.1797 26.0898 13C26.0898 5.82032 20.2695 0 13.0898 0C5.91016 0 0.0898438 5.82032 0.0898438 13C0.0898438 20.1797 5.91016 26 13.0898 26Z" fill="#0DBEF3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.47442 8.07031C6.8489 8.07031 6.3418 8.57737 6.3418 9.20288V16.8006C6.3418 17.4261 6.8489 17.9331 7.47442 17.9331H18.7058C19.3313 17.9331 19.8383 17.4261 19.8383 16.8006V9.20288C19.8383 8.57737 19.3313 8.07031 18.7058 8.07031H7.47442ZM18.3558 9.41646L13.0901 13.0637L7.82439 9.41646C7.6366 9.28635 7.38001 9.4208 7.38001 9.64922V10.3446L13.0901 14.2996L18.8002 10.3446V9.64922C18.8002 9.4208 18.5436 9.28635 18.3558 9.41646Z" fill="white"/>
</svg>
 },
];

function LiveWithChat({ darkTheme }: { darkTheme?: any }) {
  const navigate = useNavigate();
  const [showTopViewers, setShowTopViewers] = useState(false);


    const [showSidebar, setShowSidebar] = useState(true);
    const [sentGuestRequest, setSentGuestRequest] = useState(false);
    const [receiveHostRequest, setReceiveHostRequest] = useState(false);
    const [receiverInfo, setReceiverInfo] = useState(null);

    const handleHideSidebar = () => {
        setShowSidebar(false);
    };
    const handleShowSidebar = () => {
        setShowSidebar(true);
    };

    const [isFollowed, setIsFollowed] = useState(false);
    const [showFollowDiv, setShowFollowDiv] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowFollowDiv(true);
      }, 10000); // 10 seconds (10000 ms)
  
      return () => clearTimeout(timer); // cleanup on unmount
    }, []);
  

      const handleFollow = async (userId:any='') => {
        if(userId == '')
          userId = selectedLiveVideo?.details?.owner?.id;

        try {
          const res = await post(`/profile/follow/${userId}`);
          console.log("handleFollow", res);
          if (res?.data) {
            setIsFollowed(!isFollowed);
            console.log("handleFollow", res?.data)
          }                
        } catch (error) {
            console.log(error);
        }
    };

    interface Message {
      id: string;
      name: string;
      userName: string;
      userImage: string;
      text: string;
      timestamp: Date;
    }
    

    const [openRating, setOpenRating] = useState(false);
    const [unfollowAnchorEl, setUnfollowAnchorEl] = useState(null);
    interface Stream {
        _id: string;
        [key: string]: any; // Add other properties as needed
    }
    const [currentStream, setCurrentStream] = useState<Stream | null>(null);
    const [isSwitchingStreams, setIsSwitchingStreams] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [profileData, setProfileData] = useState<any>('');
    const [inSuceedCase, setInSuceedCase] = useState(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const authUser = JSON.parse(localStorage.getItem('profile') || '{}') || null;

    const [uploadedFile, setUploadedFile] = useState<string>('');
    const [openUploadPic, setOpenUploadPic] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [filePreview, setFilePreview] = useState<string>('');
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false); 
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [messageType, setMessageType] = useState('text');
    const loggedInUserId = localStorage.getItem('userId');
    const [isUserMuted, setIsUserMuted] = useState(false);

    const [searchParams] = useSearchParams();
    const streamId = searchParams.get('streamId');

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      console.log('Messages updated:', messages);
    }, [messages]);

    const submitReport = async () => {
      if (selectedReason) {
          try {
              const response: any = await fetch(
                  `${API_KEY}/media-content/reports/63d0a04dbf17138077e2cdbe`,
                  {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({ reason: selectedReason }),
                  }
              );
              if (response.status === 200) {
                  setOpenReport(false);
                  setOpenReport(false);
                  setInSuceedCase(true);
                  setSelectedReason('');
              } else {
                setOpenReport(false);
                setInSuceedCase(true);
                setSelectedReason('');
              }
              // if (response?.data) {
              //     const responseData = await response.json();

              // }
          } catch (error) {
              console.error(error);
              setOpenReport(false);  
              setSelectedReason('');
              setInSuceedCase(true);
          }
      }
  };
  const [currentMessageUserData, setCurrentMessageUserData] = useState<any>({});

  const fetchProfileData = async (msg: any) => {
    console.log('Fetching profile data for:', msg);
    try {
        const profileResponse = await fetch(`${API_KEY}/profile/public/${msg.userName}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const profileData = await profileResponse.json();
        setCurrentMessageUserData(profileData.data);
        console.log('Fetched profile data:', profileData.data);
    } catch (error) {
        console.log(error);
    }
};

    const loadProfile = async () => {
      try {
          const response = await fetch(`${API_KEY}/profile/`, {
              method: 'GET',
              headers: {
                  'Content-type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
          });

          if (response.ok) {
              const { data } = await response.json();
              setProfileData(data);
          } else {
              console.log(response);
          }
      } catch (error) {
          console.error();
      }
    };

    const location = useLocation();

    const streamIdFromUrl = useMemo(() => {
      const params = new URLSearchParams(location.search);
      return params.get('streamId');
    }, [location.search]);


    const joinAsGuest = () => {
        const liveStreamRoomId = currentStream?._id || streamIdFromUrl;
        const userData = {
        userFullName: profileData?.name || '',
        name: profileData?.name,
        userName: profileData?.username, 
        userEmail: profileData?.email,
        avatar: profileData?.avatar || profileData?.cover,
        accessToken: localStorage.getItem('token'),
        id: profileData?._id || '',
        liveStreamRoomId
      };
      console.log('joinLiveStreamUserAsGuest', userData);
      socket.emit('joinLiveStreamUserAsGuest', userData, (response: any) => {
        console.log('Joined live stream room response:', response);
      });
    }

    const handleSendMessage = () => {
      if (!message.trim()) return; // Don't send empty messages
      console.log('handle send message')
      console.log(localStorage.getItem('token'));
      console.log('profileData', profileData);
      const userData = {
        userId: profileData?._id || '',
        userFullName: profileData?.name || '',
        name: profileData?.name,
        userName: profileData?.username, 
        userEmail: profileData?.email,
        userImage: profileData?.avatar || profileData?.cover,
        accessToken: localStorage.getItem('token')
      };

       const liveStreamRoomId = currentStream?._id || streamIdFromUrl;
        const messageData = {
          userId: profileData?._id || '',
          userFullName: profileData?.name || '',
          userName: profileData?.username, 
          userEmail: profileData?.email,
          userImage: profileData?.avatar || profileData?.cover,
          accessToken: localStorage.getItem('token'),
          message: message,
          liveStreamRoomId: liveStreamRoomId
        };

        console.log('here.. send message', messageData);
        socket.emit('sendMessageToliveStreamRoom', messageData, (response:any) => {
          console.log('Callback Response:', response);
          if (!response) {
            console.warn('No response received from server');
          }
        });
    
      if (socketRef.current && isConnected) {
        (socketRef.current as any).emit('sendMessageToliveStreamRoom', { 
          liveStreamRoomId: liveStreamRoomId, 
          data: {
            ...userData,
            message,
            liveStreamRoomId: liveStreamRoomId, 
          }
        }, (response:any) => {
          console.log('Callback Response:', response);
        });

        // socketRef.on('liveStreamMessage', (data) => {
        //   console.log(${data});
        // });
        
        // Clear the input after sending
        setMessage('');
        setCurrentStream(null);
        // setMessages(prev => [...prev, {
        //   id: Date.now().toString(),
        //   name: profileData.name,
        //   userName: profileData.userName,
        //   userImage: profileData?.avatar || profileData?.cover,
        //   text: message,
        //   timestamp: new Date()
        // }]);
      } else {
        console.error('Socket not connected');
      }

      // (socketRef.current as any).on('liveStreamMessage', (data: any) => {
      //   console.log(`Received message: ${JSON.stringify(data)}`);
      // });

    };
    
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    };



  const handleUnfollowClick = (event: any) => {
    setUnfollowAnchorEl(event.currentTarget);
  };

  const handleUnfollowClose = () => {
    setUnfollowAnchorEl(null);
  };

  const openUnfollow = Boolean(unfollowAnchorEl);
  const id = openUnfollow ? "unfollow-popover" : undefined;


    // model popup report

  const [openReport, setOpenReport] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const handleOpenReport = () => {
        setMoreAnchorEl(null);
        setOpenReport(true);
  }
  const handleCloseReport = () => setOpenReport(false);
const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSelectedReason(event.target.value);
};

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuMsgId, setMenuMsgId] = useState<null | string>(null);
  const [hoveredMsgId, setHoveredMsgId] = useState<null | string>(null);
  const [isShowRanking, setIsShowRanking] = useState(true);
  
  const rankingClick = () => {
    setIsShowRanking(prev => !prev);
  };


  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, msgId: string) => {
    setMenuAnchor(event.currentTarget);
    setMenuMsgId(msgId);
  };

  const handleReport = (msgId: string) => {
    console.log('Reported message ID:', msgId);
    handleMenuClose();
  };

  const handleReply = (msgId: string) => {
    setMessage(prev => prev + `@${msgId} `);
    console.log('Reply to message ID:', msgId);
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuMsgId(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
    const isMoreMenuOpen = Boolean(moreAnchorEl);
    const [newJoiner, setNewJoiner] = useState(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    if(moreAnchorEl == null) {
      setMoreAnchorEl(event.currentTarget);
    }else{
      setMoreAnchorEl(null);
    }
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };



  const onAcceptHostRequest = () => {
    if (!profileData) return;
    console.log('profileData',profileData);

    const acceptLiveStreamRom = {
      id: profileData?._id || '',
      liveStreamRoomId: streamIdFromUrl || '',
      accessToken: token ?? '',
      userFullName: profileData?.name || '',
      name: profileData?.name,
      userName: profileData?.username,
      avatar: profileData?.avatar || profileData?.cover,
    };

    console.log('acceptInviteLiveStreamUserAsGuest', acceptLiveStreamRom);
    socket.emit('acceptInviteLiveStreamUserAsGuest', acceptLiveStreamRom, (response: any) => {
      console.log('left live stream room response:', response);
    });
    setReceiveHostRequest(!receiveHostRequest);
  }

   const onDeclineHostRequest = () => {
    if (!profileData) return;
    console.log('profileData',profileData);

    const rejectLiveStreamRom = {
      id: profileData?._id || '',
      liveStreamRoomId: streamIdFromUrl || '',
      accessToken: token ?? '',
      name: profileData?.name,
      userName: profileData?.username,
      avatar: profileData?.avatar || profileData?.cover,
    };

    console.log('rejectInviteLiveStreamUserAsGuest', rejectLiveStreamRom);
    socket.emit('rejectInviteLiveStreamUserAsGuest', rejectLiveStreamRom, (response: any) => {
      console.log('left live stream room response:', response);
    });
    setReceiveHostRequest(!receiveHostRequest);
  }

  

  const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 0,
};

  type LiveStream = {
    id: string;
    title: string;
    username: string;
    viewers: number;
    imageUrl: string;
    userAvatar: string;
  };
  
  const Esports: LiveStream[] = [
    {
      id: '1',
      title: 'Watch now and interact ',
      username: '🔥G u j  ج ﻟ آ r x S I M B 🔺🔥',
      viewers: 9,
      imageUrl: '  https://plus.unsplash.com/premium_photo-1671379041175-782d15092945?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1619365647820-cf41703f74faimage?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
    },
    {
      id: '2',
      title: 'lag ke',
      username: 'jia ( ͡° ͜ʖ ͡°)',
      viewers: 4,
      imageUrl: 'https://images.unsplash.com/photo-1509909756405-be0199881695?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1550087903695-7c004a4e6a85?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '3',
      title: 'Event ws 9.50k',
      username: 'ROOM TARKAM MAS R',
      viewers: 7,
      imageUrl: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1611689283666-173278c4384eimage?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  const socketRef = useRef();
  const SERVER_URL = 'https://prodapi.seezitt.com';
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const joinRoom = () => {
      if (!profileData) return;
      console.log('profileData',profileData);
  
      const joinLiveStreamRoom = {
        userId: profileData?._id || '',
        liveStreamRoomId: streamIdFromUrl || '',
        accessToken: token ?? '',
        userFullName: profileData?.name || '',
        name: profileData?.name,
        userName: profileData?.username,
        userEmail: profileData?.email,
        userImage: profileData?.avatar || profileData?.cover,
      };
  
      console.log('joinLiveStreamRoom', joinLiveStreamRoom);
      (socketRef.current as any).emit('joinLiveStreamRoom', joinLiveStreamRoom, (response: any) => {
        console.log('Joined live stream room response:', response);
      });
    };
  
    joinRoom();
  }, [profileData]); 

  function joinLiveStreamRoom(streamId: any)
  {
    const joinLiveStreamRoomPayload =
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

    socket.emit('joinLiveStreamRoom', joinLiveStreamRoomPayload);
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

        selectedLiveVideo?.details?.consumers && setSelectedLiveVideo((prev: any) => ({
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

  function leaveLiveStreamRoom(streamId: any)
  {
    const Payload =
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

    socket.emit('leaveLiveStreamRoom', Payload);
  };

  function leftLiveStreamRoom()
  {
    socket.on('leftliveStreamRoom',
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

        authUser?._id === data.userId && navigate('/live/discover');
      }
    );
  };

  function liveStreamRoomEnded()
  {
    socket.on('liveStreamRoomEnded',
      (data: any) =>
      {
        navigate('/live/discover');
      }
    );
  };

  function onUserMuted()
  {
    socket.on('user-muted', (data: any) => {
      setIsUserMuted(true);
    });
  };

  function onUserBlocked()
  {
    socket.on('user-blocked',
      (data: any) =>
      {
        navigate('/live/discover');
      }
    );
  };

  function onSendGift()
  {
    socket.on('send-gift',
      (data: any) =>
      {
        data.sender.id !== authUser?._id && sendGift1(data.id, data);
      }
    );
  };

  function onTopViewers()
  {
      socket.on('top-viewers',
          (data: any) =>
          {
              setSelectedLiveVideo((prev: any) => ({
                  ...prev,
                  details:
                  {
                      ...prev.details,
                      topViewersGifts: data.topViewersGiftsObj
                  }
              }));
          }
      );
  };

  useEffect(() => {
    joinedLiveStreamRoom();
    leftLiveStreamRoom();
    removedUserFromLiveStreamRoom();
    liveStreamRoomEnded();
    socketListeners();
    onUserMuted();
    onUserBlocked();
    onSendGift();
    onTopViewers();
  }, []);

  useEffect(() => {
    streamId && joinLiveStreamRoom(streamId);
    
    return () =>
    {
      streamId && leaveLiveStreamRoom(streamId);
    };
  }, [streamId]);

  const socketListeners = () => {
      socket.on('acceptJoinRequestLiveStreamUserAsGuest', (response: any) => {
          console.log('sendJoinRequestLiveStreamUserAsGuest response:', response);
          setSentGuestRequest(false);
      });

      socket.on('invitedLiveStreamUserAsGuest', (data: any) => {
        console.log(`Received message admin invited..: ${JSON.stringify(data)}`);
        setReceiverInfo(data);
        setReceiveHostRequest(true);
      });

      socket.on('inviteRemovedByLiveStreamUserAsGuest', (response: any) => {
          console.log('sendJoinRequestLiveStreamUserAsGuest response:', response);
          setReceiveHostRequest(false);
      });
      
  }

  
  function startSocket() {
    if ((socketRef.current as any) && (socketRef.current as any).connected) {
        console.log('Socket already connected.');
        return;
    }
    (socketRef.current as any) = io(SERVER_URL, {
        // transports: ['websocket'],
        transports: ['websocket'], // Use WebSocket transport
        upgrade: false,            // Prevent transport upgrades
        reconnection: true, // Enable reconnection (default is true)
        reconnectionAttempts: 5, // Number of reconnection attempts before giving up
        reconnectionDelay: 1000, // Time (ms) to wait before trying to reconnect
    });

    (socketRef.current as any).on('connect', () => {
        setIsConnected(true);
        console.log('Connected to socket server.', (socketRef.current as any));
        // let addUserObject = { userId: sender, accessToken: token };
        // let newAddUserObject = JSON.stringify(addUserObject);

          const profileInfo1 = localStorage.getItem('profile');
          const profileParsed = JSON.parse(profileInfo1 || '{}');
           let addUserObject = { userId: profileParsed?._id || '', accessToken: token };
          // console.log('addUserObject',addUserObject)
          let newAddUserObject = JSON.stringify(addUserObject);
          (socketRef.current as any).emit('add-user', newAddUserObject);
        // },5000);

        (socketRef.current as any).on('sendJoinRequestLiveStreamUserAsGuest', (response: any) => {
          console.log('sendJoinRequestLiveStreamUserAsGuest response:', response);
        });

        (socketRef.current as any).on('acceptJoinRequestLiveStreamUserAsGuest', (response: any) => {
          console.log('sendJoinRequestLiveStreamUserAsGuest response:', response);
          setSentGuestRequest(false);
        });

        (socketRef.current as any).on('invitedLiveStreamUserAsGuest', (data: any) => {
          setReceiverInfo(data);
          console.log(`Received message admin invited..: ${JSON.stringify(data)}`);
          setReceiveHostRequest(true);
        });

        (socketRef.current as any).on('inviteRemovedByLiveStreamUserAsGuest', (response: any) => {
            console.log('sendJoinRequestLiveStreamUserAsGuest response:', response);
            setReceiveHostRequest(false);
        });

        (socketRef.current as any).on('rejectJoinRequestLiveStreamUserAsGuest', (response: any) => {
            setReceiveHostRequest(false);
        });

        (socketRef.current as any).on('getMessageFromLiveStreamRoom', (data: any) => {
          console.log(`Received message: ${JSON.stringify(data)}`);
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            name: data?.userFullName,
            userName: data?.userName,
            userImage: data?.userImage,
            text: data.message,
            timestamp: new Date()
          }]);
        });

        (socketRef.current as any).on('joinedliveStreamRoom', (data: any) => {
          console.log('joined listner called..')
          // setTotalMembers(totalMembers+1);
          setNewJoiner(data);
          setTimeout(()=>{
            setNewJoiner(null);
          },10000)
          console.log(`Received message of joinedliveStreamRoom: ${JSON.stringify(data)}`);
          // handleNewMessage(data); // Handle the incoming message
        });

        // const topViewers = {
        //   giftId: "640399f0aef73acc3bbca33e",
        //   roomId: "8c29aab4-eb2e-4328-9089-4130148a932b"
        // };
        (socketRef.current as any).on('top-viewers', (response: any) => {
          console.log('top viewers response:', response);
        });
        
        // const topViewers = {
        //   giftId: "640399f0aef73acc3bbca33e",
        //   roomId: "8c29aab4-eb2e-4328-9089-4130148a932b"
        // };
        // (socketRef.current as any).emit('top-viewers', topViewers, (response: any) => {
        //   console.log('top viewers response:', response);
        // });
    });

    (socketRef.current as any).on('connect_error', (error: any) => {
        console.error('Connection Error:', error);
    });

    (socketRef.current as any).on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from socket server.');
    });

    (socketRef.current as any).onclose = (event: any) => {
        console.error('WebSocket closed:', event);
    };

    (socketRef.current as any).on('newMessage', (data: any) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        name: data.name,
        userName: data.userName,
        userImage: data.userImage,
        text: data.text,
        timestamp: new Date()
      }]);
    });

  }

  useEffect(() => {
    loadProfile();
    startSocket();
  }, []);
      
  useEffect(() => {
    // Your existing socket setup code...
  
    return () => {
      if (socketRef.current) {
        (socketRef.current as any).off('newMessage');
        (socketRef.current as any).off('messageError');
        (socketRef.current as any).disconnect();
      }
    };
  }, []);
  const LiveStreamCard = ({ stream, onClick }: { stream: any, onClick: (streamId: string) => void }) => (
    <Box sx={{ borderRadius: 2, width: "100%", position: 'relative', mr: 2, textAlign: 'left' }}>
      <Box sx={{ position: 'relative' }}  onClick={() => onClick(stream._id)}>
      <CardMedia
        component="img"
        image={stream.thumbnail || defaultGreyBackground} // fallback if null/undefined
        height="160"
        alt={stream.streamTitle}
        sx={{ borderRadius: 2, maxHeight: 260, height: 260 }}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          target.src = defaultGreyBackground; // fallback if broken URL
        }}
      />
        <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', gap: 0 }}>
            <span   className='w-9 rounded-sm text-sm ml-3 text-center text-white ' style={{ background: 'linear-gradient(113.02deg, #FF1764 0%, #ED3495 94.15%)'}}>
                Live
            </span>
          
          <span
          className='px-2'
            style={{borderRadius: 'none', background: '#00000080', fontSize: '13px', color: 'white', height: 20, display: 'flex', alignItems: 'center' }}
          >
            <PersonIcon sx={{ fontSize: 14 }} />
            {stream.consumers.length}
            </span>
        </Box>
      </Box>
      <Box sx={{ mt: 1, px: 0.5, pb: 1.5 }}>
      <Stack direction="row" spacing={1} mt={0.5}>
        <Avatar src={stream.owner.photo} sx={{ width: 24, height: 24 }} />
        <Box>
            <Typography variant="body2" fontWeight={500} noWrap>
            {stream.streamTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
            {stream.owner.name}
            </Typography>
        </Box>
        </Stack>
      </Box>
    </Box>
  );

  const [giftsDetails, setGiftsDetails] = useState<any>(
    {
      details: [],
      isLoading: false,
    }
  );

  function loadGiftsDetails()
  {
    let endpoint = `${process.env.VITE_API_URL}/gift`;
    let requestOptions =
    {
      method: 'GET',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    setGiftsDetails((prev: any) => ({ ...prev, isLoading: true }));

    fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((response) => setGiftsDetails((prev: any) => ({ ...prev, details: response.data, isLoading: false })))
    .catch((error) => console.error('Fetch error:', error));
  };

  const [recommendedLiveVideos, setRecommendedLiveVideos] = useState<any>(
    {
      items: [],
      isLoading: false,
    }
  );

  const loadRoomMessages = () => {
    const liveStreamRoomId = currentStream?._id || streamIdFromUrl;
    let endpoint = `${process.env.VITE_API_URL}/live-stream/${liveStreamRoomId}`;
    let requestOptions =
    {
      method: 'GET',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };
  console.log('endpoint', endpoint);
  console.log('requestOptions', requestOptions);  
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((response) => { 
      if(response.data && response.data.data) {
        console.log('response from live-stream get rooms', response);
        setMessages(response.data.data);
      }
    })
    .catch((error) => console.error('Fetch error:', error));
  }
  
  function loadRecommendedLiveVideos()
  {
    let endpoint = `${process.env.VITE_API_URL}/live-stream`;
    let requestOptions =
    {
      method: 'GET',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    setRecommendedLiveVideos((prev: any) => ({ ...prev, isLoading: true }));

    fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((response) => setRecommendedLiveVideos((prev: any) => ({ ...prev, items: response.data, isLoading: false })))
    .catch((error) => console.error('Fetch error:', error));
  };

  function sendGift(gift: any)
  {
      if(gift.price > profileData?.balance)
      {
          notification.error({message: 'Do not have enough balance.',});
          return;
      }

      let endpoint = `${process.env.VITE_API_URL}/gift/live-stream/send`;
      let requestOptions =
      {
        method: 'POST',
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ giftId: gift._id, roomId:  streamIdFromUrl}),
      };
      
      fetch(endpoint, requestOptions)
      .catch((error) => console.error('Fetch error:', error));

      sendGift1(gift._id, gift);
      setProfileData((prev: any) => ({ ...prev, balance: profileData?.balance -  gift.price}));
  };

  const [selectedLiveVideo, setSelectedLiveVideo] = useState<any>(
    {
      details: null,
      isLoading: false,
    }
  );

  function loadLiveVideo()
  {
    if(!streamId) return;

    const endpoint = `${process.env.VITE_API_URL}/live-stream/${streamId}`;
    const requestOptions =
    {
      method: 'GET',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    setSelectedLiveVideo((prev: any) => ({ ...prev, isLoading: true }));
    fetch(endpoint, requestOptions)
    .then((response) => response.json())
    // .then((response) => {
    //   const details = response.data.details;
    //   setSelectedLiveVideo((prev: any) => ({ ...prev, details, isLoading: false }));
    //   console.log('Live video details:', response.data.topViewersGifts.length);
    //   console.log(details);
    //   const totalMembers = response.data.topViewersGifts.length || 0;
    //   setTotalMembers(totalMembers);
    // })
    .then((response) => { setSelectedLiveVideo((prev: any) => ({...prev, details: response.data, isLoading: false})); setTotalMembers(response.data.topViewersGifts.length || 0); })
    .catch((error) => { console.error('Fetch error:', error); });
  };

  useEffect(() => {
    loadGiftsDetails();
    loadRecommendedLiveVideos();
    loadLiveVideo();
  }, []);
  useEffect(() => {
    if (currentStream?._id || streamIdFromUrl) {
      loadRoomMessages();
      loadLiveVideo();
    }
  }, [currentStream, streamIdFromUrl]);

const [expanded, setExpanded] = useState(false);

const [flyingGifts, setFlyingGifts] = useState<any[]>([]);

  const sendGift1 = (giftId: string, gift: any) => {
    console.log(giftId);
    console.log(gift);
    // Send gift logic (e.g. emit via socket or API)
    const flyingId = `${giftId}-${Date.now()}`;
    setFlyingGifts(prev => [...prev, { ...gift, flyingId }]);

    // Remove the animated gift after 5 seconds
    setTimeout(() => {
      setFlyingGifts(prev => prev.filter(g => g.flyingId !== flyingId));
    }, 5000);
  };

  const [showHeart, setShowHeart] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [totalHearts, setTotalHearts] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);


  const handleClickHeart = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: rect.left + rect.width / 2, y: rect.top });
    setShowHeart(true);
    setTotalHearts(totalHearts + 1);

    // Hide after 5 seconds
    setTimeout(() => {
      setShowHeart(false);
    }, 5000);
  };

const renderGiftRow = (gifts: any[]) => (
    <Box
      sx={{
        display: 'flex',
        pb: 0.5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {gifts.map((gift, index) => (
        <Box
          key={index}
          sx={{
            minWidth: 100,
            mx: 1,
            textAlign: 'center',
            flexShrink: 0,
            position: 'relative',
            bgcolor: '#1c1c1c',
            borderRadius: 2,
            height: '7.8rem',
            overflow: 'hidden',
            cursor: 'pointer',
            pt: 1,
            pb: 0,
            '&:hover': { background: 'rgba(59, 59, 59, 1)' },
            '&:hover .coin-info': { display: 'none' },
            '&:hover .send-button': { visibility: 'visible', position: 'relative' },
          }}
        >
          <Box sx={{ fontSize: 32, justifyItems: 'center' }}>
            {gift.imageUrl.endsWith('.mp4') ? (
              <video src={gift.imageUrl} autoPlay loop muted style={{ width: 50, height: 50 }} />
            ) : (
              <img src={gift.imageUrl} alt={gift.name} style={{ width: 50, height: 50 }} />
            )}
          </Box>
          <Typography className="coin-info" sx={{ fontSize: 13, mt: 0.5, whiteSpace: 'nowrap' }}>
            {gift.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 0.5,
            }}
          >
            <Box component="span" sx={{ color: 'gold', fontSize: 13, mr: 0.5 }}>
              <img style={{ height: '15px' }} src={caesium} alt="Coin Icon" />
            </Box>
            <Typography sx={{ fontSize: 13 }}>{gift.price}</Typography>
          </Box>
          <Button
            className="send-button"
            variant="contained"
            sx={{
              position: 'absolute',
              visibility: 'hidden',
              bottom: '-9%',
              bgcolor: '#FE2C55',
              color: '#fff',
              fontSize: 12,
              borderRadius: 0,
              width: '100%',
              px: 2,
              textTransform: 'none',
              minHeight: 28,
              '&:hover': {
                bgcolor: '#d62949',
              },
            }}
            onClick={() => {sendGift(gift);}}
          >
            Send
          </Button>
        </Box>
      ))}
    </Box>
  );

 
const [openFaq, setOpenFaq] = useState(false);

  const handleClickOpenFaq = () => setOpenFaq(true);
  const handleCloseFaq = () => setOpenFaq(false);

// drpdown chat details
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

// gift up menu
  const [menuGiftAnchorEl, setGiftMenuAnchorEl] = useState<null | HTMLElement>(null);
const isGiftOpenMenu = Boolean(menuGiftAnchorEl);

 const OpenGiftPopup = (event: React.MouseEvent<HTMLElement>) => {
    setGiftMenuAnchorEl(event.currentTarget);
  };
   const closeGiftMenu = () => {
    setGiftMenuAnchorEl(null);
  };


  
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const openProfile = Boolean(anchorElProfile);


  const handleToggle = (event: any, msg={}) => {
    fetchProfileData(msg);    
    setAnchorElProfile(event.currentTarget);

  };

  const handleCloseProfile = () => {
      setAnchorElProfile(null);
  };



  return (

        <Box className={`${darkTheme}`} sx={{display: 'flex', flexDirection: 'column' }}>
          {/* Main Content Grid */}
          <Grid container sx={{ display: 'flex',}}>
            
            {/* Video Section */}
            <Grid item sx={{ height: '100vh', position: 'relative',
                width: showSidebar ? "calc(100% - 20rem)" : "100%",
                transition: "width 0.4s ease", }}>
                {selectedLiveVideo?.details && (
                <>
                <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1,
                      bgcolor: '#fff',
                      borderBottom: '1px solid #eee',
                      margin: '0 auto',
                    }}>
                    {/* Left Side: Avatar and Info */}
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        alt="User"
                        src={selectedLiveVideo?.details?.owner?.photo}
                        sx={{ width: 48, height: 48 }}
                      />
                      <Box>
                        <Typography variant="subtitle2"  textAlign={'left'} fontWeight="bold">{selectedLiveVideo?.details?.owner?.name}</Typography>
                        <Typography variant="body2"sx={{ display: 'flex', alignItems: 'center' }} color="text.secondary">
                          {selectedLiveVideo?.details?.streamTitle} &nbsp;&nbsp;
                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.72998 2.9974C4.57841 2.9974 3.64155 3.9342 3.64155 5.0939C3.64155 6.2536 4.57841 7.19036 5.72998 7.19036C6.88158 7.19036 7.81845 6.2536 7.81845 5.0939C7.81845 3.9342 6.88158 2.9974 5.72998 2.9974ZM2.30821 5.0939C2.30821 3.20148 3.83835 1.66406 5.72998 1.66406C7.62161 1.66406 9.15178 3.20148 9.15178 5.0939C9.15178 6.9863 7.62161 8.5237 5.72998 8.5237C3.83835 8.5237 2.30821 6.9863 2.30821 5.0939ZM12.0633 5.33073C11.3719 5.33073 10.7912 5.90463 10.7912 6.63776C10.7912 7.37086 11.3719 7.94476 12.0633 7.94476C12.7547 7.94476 13.3354 7.37086 13.3354 6.63776C13.3354 5.90463 12.7547 5.33073 12.0633 5.33073ZM9.45788 6.63776C9.45788 5.1908 10.6132 3.9974 12.0633 3.9974C13.5134 3.9974 14.6688 5.1908 14.6688 6.63776C14.6688 8.0847 13.5134 9.2781 12.0633 9.2781C10.6132 9.2781 9.45788 8.0847 9.45788 6.63776ZM5.72998 10.9799C3.94881 10.9799 2.44182 12.1714 1.96334 13.8061C1.91162 13.9828 1.73713 14.1 1.55669 14.0635L0.903278 13.9313C0.722841 13.8948 0.605161 13.7183 0.653061 13.5406C1.25727 11.2984 3.29959 9.64653 5.72998 9.64653C8.16038 9.64653 10.2027 11.2984 10.8069 13.5406C10.8548 13.7183 10.7371 13.8948 10.5567 13.9313L9.90328 14.0635C9.72285 14.1 9.54835 13.9828 9.49665 13.8061C9.01815 12.1714 7.51118 10.9799 5.72998 10.9799ZM11.73 11.6992C11.3781 11.6992 11.0859 11.7467 10.8415 11.8254C10.6663 11.8819 10.4656 11.8192 10.3818 11.6553L10.0782 11.0618C9.99435 10.8979 10.0588 10.6955 10.2302 10.6284C10.6702 10.4561 11.1693 10.3658 11.73 10.3658C12.9603 10.3658 13.8643 10.8023 14.4912 11.5098C15.0137 12.0994 15.3057 12.8343 15.4785 13.5416C15.5221 13.7205 15.4041 13.8962 15.2235 13.9322L14.5697 14.0626C14.3892 14.0986 14.2148 13.9811 14.1694 13.8027C14.0261 13.2403 13.8113 12.7528 13.4933 12.394C13.1392 11.9944 12.6096 11.6992 11.73 11.6992Z" fill="#161823"/>
                          </svg>

                           {selectedLiveVideo?.details?.consumers?.length} &nbsp;&nbsp;
                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.95659 2.89709C4.24213 3.09789 3.62277 3.54704 3.20993 4.16376C2.71659 4.89042 2.42326 5.99042 3.02326 7.55709C3.48993 8.78376 4.55659 10.0338 5.75659 11.1038C6.6603 11.91 7.64178 12.6246 8.68659 13.2371C9.73141 12.6246 10.7129 11.91 11.6166 11.1038C12.8166 10.0338 13.8833 8.78376 14.3499 7.55709C14.9499 5.99042 14.6599 4.89042 14.1666 4.16376C13.7546 3.54768 13.1365 3.0986 12.4233 2.89709C10.5999 2.52709 9.57659 3.69709 8.68659 4.95709C7.79659 3.69709 6.76326 2.53042 4.95326 2.89709H4.95659ZM8.68993 3.14709C9.75659 1.80709 11.2266 1.29376 12.6899 1.59042C13.4599 1.74376 14.5533 2.35042 15.2733 3.41709C16.0266 4.52376 16.3433 6.08042 15.5999 8.03376C15.0166 9.55709 13.7666 10.9771 12.5066 12.1004C11.4364 13.0614 10.2599 13.8968 8.99993 14.5904L8.68993 14.7538L8.37993 14.5904C7.11995 13.8968 5.94342 13.0614 4.87326 12.1004C3.61326 10.9771 2.36326 9.55709 1.77993 8.03376C1.03659 6.08042 1.35326 4.52376 2.10659 3.41709C2.82326 2.35042 3.91993 1.74376 4.68993 1.59042C6.15326 1.29042 7.62326 1.80709 8.68993 3.14709Z" fill="#161823"/>
                          </svg>
                           {totalHearts}
                           {/* Heart sum */}
                        </Typography>
                      </Box>
                    </Stack>
                    {/* Right Side: Buttons */}
                    <Stack direction="row" spacing={1}>
                      <IconButton 
                        onClick={handleClick}
                        sx={{borderRadius: '4px', color: '#000', border: '1px solid #1618231F'}}>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_2018_18635"  maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                            <path d="M20.6599 0H0.659912V20H20.6599V0Z" fill="white"/>
                            </mask>
                            <g mask="url(#mask0_2018_18635)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5976 3.17495C11.5976 2.58272 12.3069 2.27873 12.7358 2.68715L19.2621 8.90241C19.8364 9.44937 19.8164 10.3717 19.2188 10.8931L12.7141 16.5689C12.2784 16.9491 11.5976 16.6397 11.5976 16.0614V13.4894C11.5976 13.4894 4.61344 12.2312 2.3731 16.3434C2.16423 16.7268 1.35008 16.8609 1.51557 14.948C2.20761 11.4273 3.62196 5.93084 11.5976 5.93084V3.17495Z" fill="#161823"/>
                            <path opacity="0.03" fill-rule="evenodd" clip-rule="evenodd" d="M16.4137 6.21094L17.7085 8.80069C17.9376 9.2588 17.8276 9.81386 17.4411 10.1499L11.6423 15.1923C11.6423 15.1923 11.3616 16.5957 12.2036 16.5957C13.0456 16.5957 19.7817 10.421 19.7817 10.421C19.7817 10.421 20.0624 9.57897 19.2204 8.73696C18.3784 7.89496 16.4137 6.21094 16.4137 6.21094Z" fill="#161823"/>
                            <path opacity="0.09" fill-rule="evenodd" clip-rule="evenodd" d="M11.5974 6.22916V13.5265C11.5974 13.5265 4.91355 12.5847 2.82022 15.7719C0.805979 18.8387 0.990969 12.3084 4.02327 9.05644C7.05557 5.80443 11.5974 6.22916 11.5974 6.22916Z" fill="#161823"/>
                            </g>
                        </svg>
                      </IconButton>
                                <Menu
                                      anchorEl={anchorEl}
                                      open={open}
                                      onClose={handleClose}
                                      PaperProps={{
                                        sx: {
                                          mt: 1,
                                          borderRadius: '12px',
                                          px: 1,
                                          py: 0.5,
                                          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
                                          width: 220,
                                          backgroundColor: darkTheme ? '#121212' : '#fff', // dark or light bg
                                          color: darkTheme ? '#fff' : 'inherit', // text color
                                        },
                                        className: '{{root}}',
                                      }}
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                      }}
                                      transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                      }}
                                    >
                                      {shareOptions.map((option, index) => (
                                        <MenuItem
                                          key={index}
                                          onClick={() => {
                                            socialShareText[option.action as keyof typeof socialShareText](
                                              `${window.location.origin}/golive?streamId=${selectedLiveVideo?.details?.id}`
                                            );
                                            handleClose();
                                          }}
                                          sx={{
                                            color: darkTheme ? '#fff' : 'inherit',
                                            '&:hover': {
                                              backgroundColor: darkTheme ? '#1f1f1f' : '#f5f5f5',
                                            },
                                          }}
                                        >
                                          <ListItemIcon sx={{ color: darkTheme ? '#fff' : 'inherit' }}>
                                            {option.icon}
                                          </ListItemIcon>
                                          <ListItemText>{option.label}</ListItemText>
                                        </MenuItem>
                                      ))}
                                    </Menu>

                            <IconButton
                                     onMouseEnter={handleMoreClick}
                                     onMouseLeave={handleMoreClick}
                                        sx={{borderRadius: '4px', color: '#000', border: '1px solid #1618231F', padding: '7.5px 6px'}}>
                                <svg width="25" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.65991 12C2.65991 10.8954 3.55534 10 4.65991 10C5.76446 10 6.65991 10.8954 6.65991 12C6.65991 13.1045 5.76446 14 4.65991 14C3.55534 14 2.65991 13.1045 2.65991 12ZM10.6599 12C10.6599 10.8954 11.5554 10 12.6599 10C13.7645 10 14.6599 10.8954 14.6599 12C14.6599 13.1045 13.7645 14 12.6599 14C11.5554 14 10.6599 13.1045 10.6599 12ZM18.6599 12C18.6599 10.8954 19.5554 10 20.6599 10C21.7645 10 22.6599 10.8954 22.6599 12C22.6599 13.1045 21.7645 14 20.6599 14C19.5554 14 18.6599 13.1045 18.6599 12Z" fill="#161823"/>
                                </svg>
                                <Menu
                                        anchorEl={moreAnchorEl}
                                        open={isMoreMenuOpen}
                                        onClose={handleMoreClose}
                                        PaperProps={{
                                        sx: {
                                            mt: 1.75,
                                            borderRadius: '6px',
                                            py: 2,
                                            px: 1,
                                            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
                                             backgroundColor: darkTheme ? '#121212' : '#fff', // dark or light bg
                                          color: darkTheme ? '#fff' : 'inherit', // text color
                                        }
                                        }}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                        }}
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                        }}
                                    >
                                        <MenuItem onClick={handleOpenReport}>
                                        <ListItemIcon>
                                            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.74528 5.04475V14.6592C6.27982 14.4833 6.92828 14.3026 7.64696 14.1695C9.59734 13.8083 12.2551 13.7653 14.5 15.3688C16.0468 16.4736 17.9932 16.5166 19.699 16.2007C20.536 16.0457 21.2696 15.812 21.7943 15.6162C21.8654 15.5896 21.9325 15.5639 21.9953 15.5392V5.92471C21.4607 6.1007 20.8123 6.2814 20.0936 6.41448C18.1432 6.77567 15.4855 6.81868 13.2406 5.21518C11.6938 4.11035 9.74738 4.06733 8.04151 4.38324C7.20453 4.53824 6.471 4.77197 5.94627 4.96776C5.87512 4.9943 5.80804 5.02007 5.74528 5.04475ZM22.5947 3.36438C22.9304 3.19678 23.329 3.21482 23.6482 3.4121C23.9675 3.60949 24.1619 3.95818 24.1619 4.33364V16.2503C24.1619 16.6607 23.9301 17.0358 23.5631 17.2193L23.0786 16.2503C23.5631 17.2193 23.5624 17.2196 23.5624 17.2196L23.5616 17.22L23.5595 17.2211L23.5539 17.2238L23.5369 17.2322C23.5287 17.2361 23.5189 17.2409 23.5073 17.2464C23.499 17.2504 23.4897 17.2548 23.4795 17.2596C23.4312 17.2824 23.363 17.314 23.2765 17.3522C23.1039 17.4286 22.8576 17.532 22.5517 17.6462C21.9424 17.8735 21.0847 18.1476 20.0936 18.3312C18.1432 18.6923 15.4855 18.7353 13.2406 17.1318C11.6938 16.027 9.74738 15.984 8.04151 16.2999C7.20453 16.4549 6.471 16.6887 5.94627 16.8844C5.87512 16.911 5.80804 16.9367 5.74528 16.9614V23.8337C5.74528 24.1328 5.50277 24.3753 5.20361 24.3753H4.12028C3.82113 24.3753 3.57861 24.1328 3.57861 23.8337V4.33364C3.57861 3.9233 3.81045 3.54818 4.17747 3.36467L4.66195 4.33364C4.17747 3.36467 4.17817 3.36432 4.17817 3.36432L4.17901 3.3639L4.18105 3.36289L4.18663 3.36013L4.20372 3.35176C4.21771 3.34495 4.2369 3.33572 4.26104 3.32431C4.30933 3.30151 4.37756 3.26998 4.46399 3.23176C4.63672 3.15538 4.883 3.05191 5.18883 2.9378C5.79822 2.71042 6.65582 2.43634 7.64696 2.2528C9.59734 1.89163 12.2551 1.84861 14.5 3.45209C16.0468 4.55693 17.9932 4.59994 19.699 4.28403C20.536 4.12903 21.2696 3.8953 21.7943 3.69951C22.0555 3.60204 22.2621 3.51508 22.4003 3.45392C22.4695 3.42338 22.5213 3.39937 22.5542 3.38382C22.5706 3.37605 22.5823 3.37041 22.5891 3.36713L22.5941 3.36467L22.5947 3.36438Z" 
                                             fill={darkTheme ? '#ffffff' : '#161823'}
                                            />
                                            </svg>
                                        </ListItemIcon>
                                        <ListItemText 
                                         sx={{
                                            color: darkTheme ? '#fff' : 'inherit',
                                            '&:hover': {
                                              backgroundColor: darkTheme ? '#1f1f1f' : '#f5f5f5',
                                            },
                                          }}
                                        >Report</ListItemText>
                                        </MenuItem>

                                        <MenuItem onClick={() => {
                                            handleMoreClose();
                                            setOpenRating(true);
                                        }}>
                                        <ListItemIcon>
                                            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.86249 15.0773C9.7522 15.0773 9.64455 15.1109 9.55391 15.1739L5.62842 17.8949C5.44881 18.0193 5.20329 17.8909 5.20329 17.6723V6.04449C5.20329 5.74534 5.44581 5.50282 5.74496 5.50282H18.7449C19.0442 5.50282 19.2866 5.74534 19.2866 6.04449V14.5357C19.2866 14.8348 19.0442 15.0773 18.7449 15.0773H9.86249ZM19.2866 17.3302H10.3491L4.29982 21.5233C3.75988 21.8976 3.03662 21.4952 3.03662 20.8204V5.50282C3.03662 4.25862 4.00668 3.25 5.20329 3.25H19.2866C20.4833 3.25 21.4533 4.25862 21.4533 5.50282V10.2372H23.3491C24.5458 10.2372 25.5158 11.2003 25.5158 12.3883V22.4841C25.5158 23.0585 24.9284 23.4489 24.3935 23.2298L20.4165 21.0599H13.0575C11.8608 21.0599 10.8908 20.0968 10.8908 18.9088V17.3333H13.0575V18.3671C13.0575 18.6663 13.3 18.9088 13.5991 18.9088H20.6901C20.7918 18.9088 20.8913 18.9374 20.9774 18.9913L23.1834 20.3717C23.2555 20.4169 23.3491 20.365 23.3491 20.2799V12.93C23.3491 12.6308 23.1067 12.3883 22.8074 12.3883H21.4533V15.0773C21.4533 16.3215 20.4833 17.3302 19.2866 17.3302Z" 
                                              fill={darkTheme ? '#ffffff' : '#161823'}
                                            />
                                            </svg>
                                        </ListItemIcon>
                                        <ListItemText 
                                         sx={{
                                            color: darkTheme ? '#fff' : 'inherit',
                                            '&:hover': {
                                              backgroundColor: darkTheme ? '#1f1f1f' : '#f5f5f5',
                                            },
                                          }}
                                        >Ranking settings</ListItemText>
                                        </MenuItem>
                                    </Menu>
                            </IconButton>

                            <Button className={`${styles.SUBSCRIBEbTN}`} variant="outlined" sx={{color: '#000', borderColor: '#1618231F', textTransform : 'capitalize'}}>Subscribe</Button>
                             <Button onClick={()=> setSentGuestRequest(!sentGuestRequest)} variant="contained" sx={{ background: '#FE2C55',  boxShadow: 'none', color: '#fff' , textTransform : 'capitalize'}} >
                                          Join as Guest
                            </Button>

                            <Button className={`${styles.SUBSCRIBEbTN}`} variant="outlined" sx={{color: '#000', borderColor: '#1618231F', textTransform : 'capitalize'}}>Subscribe</Button>
                            {!isFollowed && <Button onClick={() => handleFollow(selectedLiveVideo?.details?.owner?.id)} variant="contained" sx={{ background: '#FE2C55',  boxShadow: 'none', color: '#fff' , textTransform : 'capitalize'}} >
                                {isFollowed ? 'Followed': 'Follow'}&nbsp;
                                <Box className={`${styles.components}`} component="span" sx={{ bgcolor: '#fff', color: '#000', borderRadius: '50%', px: 0.5,py: 0.5, fontSize: 12, ml: 0.5 }}>
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.45422 4.32C8.25155 3.94667 7.95822 3.664 7.57422 3.472C7.20089 3.26933 6.75822 3.168 6.24622 3.168C5.36089 3.168 4.65155 3.46133 4.11822 4.048C3.58489 4.624 3.31822 5.39733 3.31822 6.368C3.31822 7.40267 3.59555 8.21333 4.15022 8.8C4.71555 9.376 5.48889 9.664 6.47022 9.664C7.14222 9.664 7.70755 9.49333 8.16622 9.152C8.63555 8.81067 8.97689 8.32 9.19022 7.68H5.71822V5.664H11.6702V8.208C11.4676 8.89067 11.1209 9.52533 10.6302 10.112C10.1502 10.6987 9.53689 11.1733 8.79022 11.536C8.04355 11.8987 7.20089 12.08 6.26222 12.08C5.15289 12.08 4.16089 11.84 3.28622 11.36C2.42222 10.8693 1.74489 10.192 1.25422 9.328C0.774221 8.464 0.534221 7.47733 0.534221 6.368C0.534221 5.25867 0.774221 4.272 1.25422 3.408C1.74489 2.53333 2.42222 1.856 3.28622 1.376C4.15022 0.885333 5.13689 0.639999 6.24622 0.639999C7.59022 0.639999 8.72089 0.965333 9.63822 1.616C10.5662 2.26667 11.1796 3.168 11.4782 4.32H8.45422Z" fill="#323442" fill-opacity="0.8"/>
                                </svg>
                                </Box>
                            </Button>
                            }
                            {isFollowed && <Button onClick={handleUnfollowClick} sx={{borderRadius: '4px', color: '#000', border: '1px solid #1618231F', padding: '7.5px 0px'}}>
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.07713 5.41667C6.07713 4.03595 7.19642 2.91667 8.57713 2.91667C9.95788 2.91667 11.0771 4.03595 11.0771 5.41667C11.0771 6.79738 9.95788 7.91667 8.57713 7.91667C7.19642 7.91667 6.07713 6.79738 6.07713 5.41667ZM8.57713 1.25C6.27596 1.25 4.41048 3.11548 4.41048 5.41667C4.41048 7.71783 6.27596 9.58333 8.57713 9.58333C10.8783 9.58333 12.7438 7.71783 12.7438 5.41667C12.7438 3.11548 10.8783 1.25 8.57713 1.25ZM2.82473 17.07C3.45272 14.7977 4.864 13.4313 6.45884 12.8075C8.04063 12.1888 9.842 12.2847 11.3298 13.0203C11.536 13.1223 11.7909 13.0575 11.9075 12.8591L12.3301 12.1409C12.4468 11.9425 12.381 11.686 12.1764 11.5807C10.2503 10.5891 7.91184 10.4495 5.85171 11.2554C3.73303 12.0841 1.94933 13.896 1.19721 16.7036C1.13767 16.9259 1.27947 17.1497 1.50398 17.2002L2.31698 17.3831C2.54149 17.4337 2.76344 17.2918 2.82473 17.07ZM19.2885 12.5505C19.4512 12.3878 19.4512 12.124 19.2885 11.9613L18.6993 11.372C18.5365 11.2093 18.2727 11.2093 18.11 11.372L13.1605 16.3215L11.1278 14.2887C10.965 14.126 10.7012 14.126 10.5385 14.2887L9.94925 14.8779C9.7865 15.0406 9.7865 15.3045 9.94925 15.4672L12.5713 18.0892C12.8967 18.4147 13.4243 18.4147 13.7498 18.0892L19.2885 12.5505Z" fill="#161823"/>
                            </svg>
                            </Button> }
                                
                            <Popover
                                    id={id}
                                    open={openUnfollow}
                                    anchorEl={unfollowAnchorEl}
                                    onClose={handleUnfollowClose}
                                    anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                    }}
                                    transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                    }}
                                    PaperProps={{
                                    sx: { borderRadius: 2, p: 2, boxShadow: 3, mt: 1.5,
                                       backgroundColor: darkTheme ? '#121212' : '#fff', // dark or light bg
                                          color: darkTheme ? '#fff' : 'inherit', // text color
                                     },
                                    }}
                                >
                                    <Typography sx={{ mb: 1,  color: darkTheme ? '#fff' : 'inherit', }}>Unfollow {selectedLiveVideo?.details?.owner?.name}?</Typography>
                                    <Button 
                                    variant="outlined" 
                                    fullWidth 
                                    onClick={()=> {handleUnfollowClose(); handleFollow(selectedLiveVideo?.details?.owner?.id)}}
                                    sx={{ color: darkTheme ? '#fff' : 'inherit', textTransform: "none", borderRadius: 2,  fontWeight: 500 }}
                                    >
                                    Unfollow
                                    </Button>
                            </Popover>

                                {!showSidebar && (
                                    <IconButton
                                        onClick={handleShowSidebar}>
                                        <svg width="16" height="16" viewBox="0 0 48 48" fill="#000" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M33.4132 39.1714L21.2417 26.9999L44.9991 26.9999C45.5514 26.9999 45.9991 26.5522 45.9991 25.9999V21.9999C45.9991 21.4476 45.5514 20.9999 44.9991 20.9999L21.2416 20.9999L33.4132 8.82825C33.8038 8.43773 33.8038 7.80456 33.4132 7.41404L30.5848 4.58562C30.1943 4.19509 29.5611 4.19509 29.1706 4.58562L11.8777 21.8785C10.7061 23.0501 10.7061 24.9496 11.8777 26.1211L29.1706 43.414C29.5611 43.8046 30.1943 43.8046 30.5848 43.414L33.4132 40.5856C33.8038 40.1951 33.8038 39.5619 33.4132 39.1714ZM6.99902 7.99978C6.99902 7.44749 6.55131 6.99978 5.99902 6.99978L1.99902 6.99978C1.44674 6.99978 0.999023 7.4475 0.999023 7.99978V39.9998C0.999023 40.5521 1.44674 40.9998 1.99902 40.9998H5.99902C6.55131 40.9998 6.99902 40.5521 6.99902 39.9998L6.99902 7.99978Z"></path></svg>
                                    </IconButton>
                                    )}
                    </Stack>
                </Box>
                <Box sx={{ width: '100%', height: '95%', background:'black' }}>
                    {/* Placeholder for Video */}
                    <Typography color="white" align="center" height="100%" >
                      Video Player Area
                    </Typography>
                    

                    {/* Gift Bar */}
                    <Box sx={{ position: 'absolute', bottom: 0, width: '100%', bgcolor: '#111', p: 1, display: 'flex', justifyContent: 'space-around' }}>
                         <Box
                                sx={{
                                    bgcolor: '#1c1c1c',
                                    color: '#fff',
                                    borderRadius: 2,
                                    p: 0.5,
                                    width: '100%',
                                    mx: 'auto',
                                }}
                                >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
                                {flyingGifts.map(gift => (
                                  <Box
                                    key={gift.flyingId}
                                    className={`${styles.floatingGift}`}
                                    
                                  >
                                    {gift.mediaFileUrl.endsWith('.mp4') ? (
                                      <video src={gift.mediaFileUrl} autoPlay loop muted style={{ width: 60, height: 60 }} />
                                    ) : (
                                      <img src={gift.mediaFileUrl} alt={gift.name} style={{ width: 60, height: 60 }} />
                                    )}
                                  </Box>
                                ))}
                                    {/* {renderGiftRow(giftsDetails.details.slice(0, 7))} */}
                                    {renderGiftRow(giftsDetails.details.slice(0, 7))}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
                                        <IconButton
                                        onClick={OpenGiftPopup}
                                        sx={{
                                            transition: 'transform 0.2s ease',
                                            color: '#fff',
                                            border: '1px solid #555',
                                            borderRadius: 1,
                                            mt: -1,
                                            height: '7rem',
                                            px: 0.75
                                        }}
                                        >
                                        <ExpandMoreIcon sx={{transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',}} />
                                        </IconButton>
                                    </Box>
                                        <Menu
                                            anchorEl={menuGiftAnchorEl}
                                            open={isGiftOpenMenu}
                                            onClose={closeGiftMenu}
                                            PaperProps={{
                                            elevation: 4,
                                            sx: {
                                                pt: 1,
                                                mt: -2.25,
                                                borderRadius: 1,
                                                minWidth: 350,
                                                maxHeight: 300,
                                                overflowY: 'auto',
                                                boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                                                backgroundColor: '#1c1c1c', 
                                                color: '#fff'
                                            },
                                            }}
                                            anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                            }}
                                        >
                                            {renderGiftRow(giftsDetails.details.slice(6))}
                                        </Menu>
                                </Box>

                                {/* {expanded && (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
                                        {renderGiftRow(giftsDetails.details.slice(6))}
                                    </Box>
                                )} */}

                            {/* Bottom: Coin Balance and Get Coins */}
                            <Box
                                sx={{
                                display: 'flex',
                                alignItems: 'center',
                                px: 1,
                                pt: 1,
                                borderTop: '1px solid #333',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    Coin Balance:
                                </Typography>
                                <Box
                                    component="span"
                                    sx={{ color: 'gold', fontSize: 18, mx: 0.5 }}
                                >
                                    <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />

                                </Box>
                                <Typography variant="body2" fontWeight="500">
                                    { profileData?.balance }
                                </Typography>
                                </Box>
                                <Link to="/coins/recharge" reloadDocument={false} style={{ textDecoration: 'none' }}>
                                <Button
                                variant="outlined"
                                sx={{
                                    borderColor: '#FE2C55',
                                    color: '#FE2C55',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    px: 2,
                                    py: 0,
                                    mx: 1,
                                    '&:hover': {
                                    borderColor: '#d62949',
                                    backgroundColor: '#2a2a2a',
                                    },
                                }}
                                >
                                Get Coins
                                </Button>
                                </Link>
                            </Box>
                         </Box>
                    </Box>
                </Box>
                </>
                )}
                <Box sx={{px: 2}}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" pt={3} mb={2}>
                        <Typography variant="h6" fontSize={'22px'} color={'#161823'} fontWeight={600}>
                        Recommended LIVE videos
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {recommendedLiveVideos.items.map((stream: any) => (
                            <Grid item xs={12} sm={6} key={stream.id}>
                                <LiveStreamCard 
                                  stream={stream} 
                                  onClick={(streamId: any) => {
                                    setIsSwitchingStreams(true);
  
                                    if (!socketRef.current || !isConnected) {
                                      console.log('Socket not connected, reconnecting...');
                                      startSocket();
                                      setIsSwitchingStreams(false);
                                      return;
                                    }
                                    // First leave the current room
                                    (socketRef.current as any).emit('leaveRoom', currentStream?._id || '651c880a8ac697cffc082dbf', (response: any) => {
                                      console.log('Left room response:', response);
                                    });

                                    // let joinRoomInput: { liveStreamRoomId: string; accesstoken: string } = {
                                    //   liveStreamRoomId: streamId,
                                    //   accesstoken: token ?? '',
                                    // };

                                    // setCurrentStream(stream);
                                    // (socketRef.current as any).emit('joinRoom', joinRoomInput, (response: any) => {
                                    //   console.log('Joined new room response:', response);
                                    // });

                                    let joinLiveStreamRoom: { userId: string, id: string, userFullName:string, userEmail:string, liveStreamRoomId: string; accessToken: string; name?: string; userName?: string; email?: string; userImage?: string } = {
                                      id: stream.id,
                                      userId: profileData?._id || '',
                                      liveStreamRoomId: streamId,
                                      accessToken: token ?? '',
                                      userFullName: profileData?.name || '',
                                      name: profileData?.name,
                                      userName: profileData?.username, 
                                      userEmail: profileData?.email,
                                      userImage: profileData?.avatar || profileData?.cover,
                                    };
                                    
                                    (socketRef.current as any).emit('joinLiveStreamRoom', joinLiveStreamRoom, (response: any) => {
                                      console.log('Joined live stream room response:', response);
                                    });
                                    console.log('current stream');
                                    console.log(stream);
                                   

                                    // setTotalMembers(stream.consumers?.length || 0);
                                    
                                    // setSelectedLiveVideo((prev: any) => ({ ...prev, details: stream }));
                                    // Navigate to the new stream page
                                    navigate(`/golive?streamId=${stream.id}`);

                                    setIsSwitchingStreams(false);

                                  }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box> 
            </Grid>
            {receiveHostRequest && <LiveInviteCard receiverInfo={receiverInfo ?? {}} onAcceptHostRequest={onAcceptHostRequest} onDeclineHostRequest={onDeclineHostRequest} />}
            {!receiveHostRequest &&  sentGuestRequest  && <GuestRequestCard joinAsGuest={joinAsGuest} />}
            {/* Right Sidebar */}
            {!receiveHostRequest && !sentGuestRequest && showSidebar &&(
            <Grid item  sx={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '20.5rem', bgcolor: '#fafafa', transform: showSidebar ? "translateX(0)" : "translateX(100%)", borderLeft: '1px solid #ddd', p: 0 }}>
              <Box
                sx={{
                    bgcolor: '#fff',
                    borderRadius: 1,
                    boxShadow: 1,
                    position: 'relative'
                }}>
                <Box sx={{ display: 'flex', justifyContent: 'center',position: 'relative', p: 1, borderBottom: '1px solid rgba(22, 24, 35, 0.2)' }}>
                     <span className='absolute left-3 top-3.5' onClick={handleHideSidebar}>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5005 8.62453H13.4095L8.84513 13.1889C8.6987 13.3353 8.6987 13.5728 8.84513 13.7192L9.90578 14.7799C10.0523 14.9263 10.2897 14.9263 10.4361 14.7799L16.921 8.29505C17.3603 7.8557 17.3603 7.14339 16.921 6.70404L10.4361 0.219212C10.2897 0.0727628 10.0523 0.0727628 9.90578 0.219212L8.84513 1.27987C8.6987 1.42632 8.6987 1.66375 8.84513 1.8102L13.4094 6.37453H4.5005C4.29338 6.37453 4.1255 6.54242 4.1255 6.74953V8.24953C4.1255 8.4566 4.29338 8.62453 4.5005 8.62453ZM3.00049 1.49951C3.00049 1.29241 2.83259 1.12451 2.62549 1.12451H1.12549C0.91838 1.12451 0.750488 1.29241 0.750488 1.49951V13.4995C0.750488 13.7066 0.91838 13.8745 1.12549 13.8745H2.62549C2.83259 13.8745 3.00049 13.7066 3.00049 13.4995V1.49951Z" fill="#161823"/>
                        </svg>
                    </span>
                    <Typography fontWeight={700} fontSize={18}>
                    LIVE chat
                    </Typography>
                </Box>
                     {
                    showTopViewers && isShowRanking ? (
                        <Box sx={{ width: '20.5rem', bgcolor: "#fff", height: "100vh", borderLeft: "1px solid #ddd" }}>
                            {/* Header */}
                            <Box
                                sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                px: 2,
                                py: 1.5,
                                borderBottom: "1px solid #eee",
                                height: "3rem",
                                }}
                            >
                                <IconButton size="small" onClick={() => setShowTopViewers(!showTopViewers)}>   
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.93934 6L0.859825 1.92048C0.713392 1.77405 0.713392 1.5366 0.859825 1.39016L1.39019 0.859834C1.53663 0.713389 1.77404 0.713389 1.92051 0.859834L5.99999 4.93935L10.0795 0.859834C10.2259 0.713389 10.4634 0.713389 10.6098 0.859834L11.1402 1.39016C11.2866 1.5366 11.2866 1.77405 11.1402 1.92048L7.06067 6L11.1402 10.0795C11.2866 10.2259 11.2866 10.4634 11.1402 10.6098L10.6098 11.1402C10.4634 11.2866 10.2259 11.2866 10.0795 11.1402L5.99999 7.06065L1.92051 11.1402C1.77404 11.2866 1.53663 11.2866 1.39019 11.1402L0.859825 10.6098C0.713392 10.4634 0.713392 10.2259 0.859825 10.0795L4.93934 6Z" fill="#161823"/>
                                    </svg>
    
                                </IconButton>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Top viewers
                                </Typography>
                                <Box>
                                <Tooltip title="Help" arrow 
                                slotProps={{
                                    tooltip: {
                                    sx: {
                                        bgcolor: 'rgba(16, 162, 197, 1)',
                                        fontSize: '1rem',
                                        color: '#fff',
                                        },
                                    },
                                }}
                                >
                                <IconButton size="small" onClick={handleClickOpenFaq}>
                                    <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                                </Tooltip>

                                </Box>
                            </Box>
                            {/* Content */}
                            <Box p={2}> 
                              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography sx={{fontSize: 14}}>Name</Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", fontSize: 14 }}>
                                  <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                  Coins
                                </Typography>
                              </Box>
                              <Stack spacing={1}>
                                {selectedLiveVideo?.details?.topViewersGifts?.map((viewer: any, index: number) => {
                                  const numberColor =
                                    index === 0
                                      ? "#f33"  
                                      : index === 1
                                      ? "#d99900" 
                                      : index === 2
                                      ? "#eab308"  
                                      : "#000"; 
                                  
                                  return (
                                    <Box
                                      key={viewer.userId}
                                      sx={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 2fr 1fr",
                                        justifyContent: "space-between",
                                        fontSize: 14,
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          textAlign: "left",
                                          color: numberColor,
                                          fontWeight: 400,
                                        }}
                                      >
                                        {index + 1}
                                      </Typography>
                                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                        <Typography sx={{ color: "#000", fontWeight: 400 }}>
                                          {viewer.name}
                                        </Typography>
                                      </Box>
                                      <Typography sx={{ fontSize: 14, textAlign: "right" }} fontWeight={500}>
                                        {viewer.totalCoins}
                                      </Typography>
                                    </Box>
                                  );
                                })}
                              </Stack>
                            </Box>
                            {/* <Box sx={{ px: 2, pt: 2, height: "calc(100vh - 14rem)",  overflowY: "auto", }}>

                                {showTopViewers ? (
                                <Box> 
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography sx={{fontSize: 14}}>Name</Typography>
                                        <Typography sx={{ display: "flex", alignItems: "center", fontSize: 14 }}>
                                             <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                            Coins
                                        </Typography>
                                    </Box>
                                    <Stack spacing={1}>
                                        {[
                                            ["Ade Zed25", 132],
                                            ["Arek Probolinggo", 39],
                                            ["iwan69kurniawan", 22],
                                            ["Q noy Bae", 15],
                                            ["PRIHARTONO", 12],
                                            ["🥇punito lee🥰", 11],
                                            ["AA taufiqi", 10],
                                            ["HerLinA", 8],
                                            ["Epol .hokki..", 6],
                                            ["riswantinggala", 6],
                                            ["Yan Datuck", 6],
                                            ["VANN", 4],
                                            ["Ade Zed25", 132],
                                            ["Arek Probolinggo", 39],
                                            ["iwan69kurniawan", 22],
                                            ["Q noy Bae", 15],
                                            ["PRIHARTONO", 12],
                                            ["🥇punito lee🥰", 11],
                                            ["AA taufiqi", 10],
                                            ["HerLinA", 8],
                                            ["Epol .hokki..", 6],
                                            ["riswantinggala", 6],
                                            ["Yan Datuck", 6],
                                            ["VANN", 4],
                                        ].map(([name, coins], index) => {
                                            // Color logic for top 3
                                            const numberColor =
                                            index === 0
                                                ? "#f33" // red
                                                : index === 1
                                                ? "#d99900" // reddish gold
                                                : index === 2
                                                ? "#eab308" // more gold
                                                : "#000"; // default black
                                            return (
                                            <Box
                                                key={index}
                                                sx={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 2fr 1fr",
                                                justifyContent: "space-between",
                                                fontSize: 14,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                    textAlign: "left",
                                                    color: numberColor,
                                                    fontWeight: 400,
                                                    }}
                                                    >
                                                    {index + 1}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                                <Typography sx={{ color: "#000", fontWeight:  400 }}>
                                                    {name}
                                                </Typography>
                                                </Box>
                                                <Typography sx={{ fontSize: 14, textAlign: "right" }} fontWeight={500}>
                                                    {coins}
                                                </Typography>
                                            </Box>
                                            );
                                        })}
                                        </Stack>
                                </Box>
                                ) : (
                                <Box>
                                    <Typography variant="body2">This is another panel view!</Typography>
                                  
                                </Box>
                                )}
                            </Box> */}
                            {/* Footer */}
                            <Box sx={{bgcolor: "#fff", position: "absolute", bottom: '2.5rem', width: "100%", p: 2, borderTop: "1px solid #eee" }}>
                                <Typography variant="body2" fontWeight={500} gutterBottom>
                                {selectedLiveVideo?.details?.owner?.name || ''}
                                </Typography>
                                <Button onClick={() => setShowTopViewers(false)}
                                variant="outlined"
                                fullWidth
                                sx={{ textTransform: "none", borderColor: "#f33", color: "#f33" }}
                                >
                                Send Gifts
                                </Button>
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                                💗 Send Gifts to support and help desiLiv***
                                </Typography>
                            </Box>
                        </Box>
                      
                     ): (                       
                        <Box>
                            {isShowRanking && <Box
                                sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                mt: 1.5,
                                mb: 1,
                                p: 1,
                                }}
                            onClick={() => setShowTopViewers(true)}
                            >
                                <Typography fontWeight={500} fontSize={16}>
                                Top viewers
                                </Typography>
                                <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
                            </Box>
                          } 

                            {/* Top Viewers Section */}
                           
                            
                            {isShowRanking &&  (<Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid rgba(22, 24, 35, 0.2)' }}>
                            {selectedLiveVideo?.details?.topViewersGifts?.[0] && (
                                    <Box textAlign="center" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                      <Typography sx={{ pl: 2 }}>
                                        <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M4.854 7.03912C13.931 6.58712 16.2 3.45913 16.797 1.95312H26.052V44.9061H16.632V13.2561C13.048 14.6691 9.332 15.2341 4.854 15.2341V7.03912Z" fill="url(#paint0_linear_2018_18436)"/>
                                          <mask id="mask0_2018_18436" maskUnits="userSpaceOnUse" x="4" y="1" width="23" height="44">
                                            <path d="M4.854 6.69412C13.931 6.21912 16.2 3.53813 16.797 1.95312H26.052V44.9861H16.632V13.1091C13.048 14.5961 9.332 15.3151 4.854 15.3151V6.69412Z" fill="url(#paint1_linear_2018_18436)"/>
                                          </mask>
                                          <g mask="url(#mask0_2018_18436)">
                                            <path d="M16.0239 30.7789L25.6969 10.2109L35.2399 48.6629L18.3329 50.7469L16.0239 30.7789Z" fill="url(#paint2_linear_2018_18436)"/>
                                            <path opacity="0.7" d="M21.5439 10.6244C19.6419 11.9704 17.3829 12.7744 16.4909 13.1474C15.4009 16.2304 13.2209 22.8454 13.2209 23.5174C13.2209 24.1904 21.7419 23.2374 26.0029 22.6774L27.1929 5.85938C25.4089 7.54138 23.4469 9.27938 21.5439 10.6244Z" fill="url(#paint3_linear_2018_18436)"/>
                                          </g>
                                          <defs>
                                            <linearGradient id="paint0_linear_2018_18436" x1="15.453" y1="-0.836875" x2="34.42" y2="58.2941" gradientUnits="userSpaceOnUse">
                                              <stop stop-color="#FCF4D6"/>
                                              <stop offset="0.469" stop-color="#F2CC83"/>
                                              <stop offset="1" stop-color="#EEB865"/>
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_2018_18436" x1="20.119" y1="72.4851" x2="-3.785" y2="24.1631" gradientUnits="userSpaceOnUse">
                                              <stop stop-color="#FF88C1"/>
                                              <stop offset="1" stop-color="white"/>
                                            </linearGradient>
                                            <linearGradient id="paint2_linear_2018_18436" x1="21.1489" y1="20.6129" x2="27.5279" y2="38.8819" gradientUnits="userSpaceOnUse">
                                              <stop stop-color="#FBE0AE"/>
                                              <stop offset="1" stop-color="#F6DBA8" stop-opacity="0"/>
                                            </linearGradient>
                                            <linearGradient id="paint3_linear_2018_18436" x1="16.7879" y1="12.8674" x2="20.3649" y2="15.3684" gradientUnits="userSpaceOnUse">
                                              <stop stop-color="#DFA874"/>
                                              <stop offset="1" stop-color="#F4D7A2" stop-opacity="0"/>
                                            </linearGradient>
                                          </defs>
                                        </svg>
                                      </Typography>
                                      <Box>
                                        <Avatar
                                          src={selectedLiveVideo.details.topViewersGifts[0].avatar || "https://i.pravatar.cc/50"}
                                          alt={selectedLiveVideo.details.topViewersGifts[0].name}
                                          sx={{
                                            width: 48,
                                            height: 48,
                                            mx: 'auto',
                                            border: '2px solid rgba(245, 214, 151, 1)',
                                          }}
                                        />
                                        <Typography fontSize={13} fontWeight={600} mt={0.5}>
                                          {selectedLiveVideo.details.topViewersGifts[0].name}
                                        </Typography>
                                        <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                          <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                            <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                          </Box>
                                          <Typography fontSize={13}>{selectedLiveVideo.details.topViewersGifts[0].totalCoins}</Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  )}

                                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2}}>
                                    {selectedLiveVideo?.details?.topViewersGifts?.[1] && (
                                        <Box textAlign="center" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                          <Typography sx={{ px: 0 }}>
                                            <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M1.06 9.91016H5.823C5.823 9.25683 5.88133 8.6035 5.998 7.95017C6.138 7.27217 6.35967 6.66483 6.663 6.12817C6.96633 5.56817 7.36333 5.12483 7.854 4.79817C8.36733 4.44817 8.986 4.27283 9.71 4.27217C10.784 4.27217 11.6597 4.61083 12.337 5.28817C13.037 5.94217 13.387 6.86416 13.387 8.05416C13.387 8.8015 13.212 9.46716 12.862 10.0512C12.5294 10.6408 12.1039 11.1729 11.602 11.6272C11.1113 12.0938 10.5623 12.5255 9.955 12.9222C9.37277 13.2796 8.80055 13.6531 8.239 14.0422C7.22527 14.7402 6.2215 15.4526 5.228 16.1792C4.29467 16.8792 3.47733 17.6495 2.776 18.4902C2.06618 19.3258 1.49861 20.2724 1.096 21.2922C0.698667 22.3422 0.5 23.5795 0.5 25.0042H18.5V20.7302H6.909C7.50332 19.901 8.21009 19.1586 9.009 18.5242C9.803 17.8942 10.6203 17.3108 11.461 16.7742C12.3017 16.2135 13.1303 15.6528 13.947 15.0922C14.787 14.5322 15.5343 13.9135 16.189 13.2362C16.8433 12.5359 17.376 11.7311 17.765 10.8552C18.1617 9.96783 18.36 8.9055 18.36 7.66817C18.36 6.47817 18.1267 5.40417 17.66 4.44617C17.2361 3.51762 16.6142 2.69303 15.838 2.03017C15.043 1.36242 14.1285 0.851703 13.143 0.525165C12.1176 0.171314 11.0397 -0.00619922 9.955 0.000165257C8.485 0.000165257 7.17767 0.256832 6.033 0.770165C4.9446 1.23663 3.98404 1.95748 3.232 2.87217C2.484 3.75883 1.92333 4.80917 1.55 6.02317C1.17667 7.2145 1.01333 8.5105 1.06 9.91117" fill="url(#paint0_linear_2018_18458)"/>
                                              <defs>
                                                <linearGradient id="paint0_linear_2018_18458" x1="3.412" y1="1.59617" x2="10.969" y2="25.0042" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#ECEFF1"/>
                                                  <stop offset="1" stop-color="#BDC5CC"/>
                                                </linearGradient>
                                              </defs>
                                            </svg>
                                          </Typography>
                                          <Box display={'flex'}>
                                            <Avatar
                                              src={selectedLiveVideo.details.topViewersGifts[1].avatar || "https://i.pravatar.cc/50"}
                                              alt={selectedLiveVideo.details.topViewersGifts[1].name}
                                              sx={{
                                                width: 48,
                                                height: 48,
                                                mx: 'auto',
                                                border: '2px solid rgba(245, 214, 151, 1)',
                                              }}
                                            />
                                            <Box pl={1}>
                                              <Typography fontSize={13} fontWeight={600} mt={0.5}>
                                                {selectedLiveVideo.details.topViewersGifts[1].name}
                                              </Typography>
                                              <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                                <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                                  <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                                </Box>
                                                <Typography fontSize={13}>{selectedLiveVideo.details.topViewersGifts[1].totalCoins}</Typography>
                                              </Box>
                                            </Box>
                                          </Box>
                                        </Box>
                                      )}

                                      {selectedLiveVideo?.details?.topViewersGifts?.[2] && (
                                        <Box textAlign="center" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                          <Typography sx={{ px: 0 }}>
                                            <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              {/* Bronze crown icon SVG for 3rd place */}
                                              <path d="M7.76986 10.28V13.74C8.36986 13.74 8.9932 13.7633 9.63986 13.81C10.3085 13.8333 10.9199 13.96 11.4739 14.19C12.0191 14.3914 12.49 14.7542 12.8239 15.23C13.1925 15.714 13.3769 16.4173 13.3769 17.34C13.3769 18.5173 12.9962 19.452 12.2349 20.144C11.4735 20.814 10.5392 21.1487 9.43186 21.148C8.71586 21.148 8.09253 21.0213 7.56186 20.768C7.06927 20.5267 6.63311 20.1843 6.28186 19.763C5.92707 19.3074 5.65742 18.7914 5.48586 18.24C5.29998 17.6335 5.19507 17.005 5.17386 16.371H0.501862C0.478528 17.779 0.674528 19.0253 1.08986 20.11C1.52853 21.194 2.1402 22.1167 2.92486 22.878C3.70886 23.6167 4.65486 24.182 5.76286 24.574C6.89353 24.9673 8.13953 25.1637 9.50086 25.163C10.6775 25.163 11.8082 24.9897 12.8929 24.643C13.9367 24.3185 14.911 23.8024 15.7659 23.121C16.5965 22.451 17.2539 21.6203 17.7379 20.629C18.2459 19.6363 18.4999 18.5057 18.4999 17.237C18.4999 15.8523 18.1192 14.664 17.3579 13.672C16.5959 12.68 15.5459 12.0337 14.2079 11.733V11.664C15.3385 11.3413 16.1809 10.73 16.7349 9.83C17.3115 8.93 17.5999 7.89167 17.5999 6.715C17.5999 5.63033 17.3575 4.67267 16.8729 3.842C16.392 3.01354 15.7439 2.29428 14.9699 1.73C14.192 1.14511 13.3115 0.710971 12.3739 0.45C11.4039 0.15 10.4345 0 9.46586 0C8.22053 0 7.08986 0.207667 6.07386 0.623C5.08769 0.997112 4.19152 1.57502 3.44386 2.319C2.7292 3.05767 2.16386 3.946 1.74786 4.984C1.35586 5.99933 1.13653 7.13 1.08986 8.376H5.76286C5.73953 7.12933 6.03953 6.10267 6.66286 5.296C7.30886 4.46533 8.25453 4.05 9.49986 4.05C10.3999 4.05 11.1959 4.32667 11.8879 4.88C12.5799 5.43333 12.9262 6.22967 12.9269 7.269C12.9269 7.96167 12.7535 8.515 12.4069 8.929C12.0835 9.345 11.6569 9.66833 11.1269 9.899C10.596 10.1113 10.0352 10.2395 9.46486 10.279C8.86486 10.3257 8.29953 10.3257 7.76886 10.279" fill="url(#paint0_linear_2018_18473)"/>
                                              <defs>
                                                <linearGradient id="paint0_linear_2018_18473" x1="9.49486" y1="25.442" x2="9.49486" y2="2.306" gradientUnits="userSpaceOnUse">
                                                  <stop stop-color="#D7B5A2"/>
                                                  <stop offset="1" stop-color="#FBDFCC"/>
                                                </linearGradient>
                                              </defs>
                                            </svg>
                                          </Typography>
                                          <Box display={'flex'}>
                                            <Avatar
                                              src={selectedLiveVideo.details.topViewersGifts[2].avatar || "https://i.pravatar.cc/50"}
                                              alt={selectedLiveVideo.details.topViewersGifts[2].name}
                                              sx={{
                                                width: 48,
                                                height: 48,
                                                mx: 'auto',
                                                border: '2px solid rgba(245, 214, 151, 1)',
                                              }}
                                            />
                                            <Box pl={1}>
                                              <Typography fontSize={11} fontWeight={600} mt={0.5}>
                                                {selectedLiveVideo.details.topViewersGifts[2].name}
                                              </Typography>
                                              <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                                <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                                  <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                                </Box>
                                                <Typography fontSize={12}>{selectedLiveVideo.details.topViewersGifts[2].totalCoins}</Typography>
                                              </Box>
                                            </Box>
                                          </Box>
                                        </Box>
                                      )}
                                    </Box>        
                            </Box>
                      )}      

                            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid rgba(22, 24, 35, 0.2)' }}>
                                    <Box textAlign="center" sx={{display: 'flex' , alignItems: 'center', gap: 2}}>
                                        <Typography
                                        sx={{
                                            pl: 2,
                                        }}
                                        >
                                            <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.854 7.03912C13.931 6.58712 16.2 3.45913 16.797 1.95312H26.052V44.9061H16.632V13.2561C13.048 14.6691 9.332 15.2341 4.854 15.2341V7.03912Z" fill="url(#paint0_linear_2018_18436)"/>
                                                <mask id="mask0_2018_18436"  maskUnits="userSpaceOnUse" x="4" y="1" width="23" height="44">
                                                <path d="M4.854 6.69412C13.931 6.21912 16.2 3.53813 16.797 1.95312H26.052V44.9861H16.632V13.1091C13.048 14.5961 9.332 15.3151 4.854 15.3151V6.69412Z" fill="url(#paint1_linear_2018_18436)"/>
                                                </mask>
                                                <g mask="url(#mask0_2018_18436)">
                                                <path d="M16.0239 30.7789L25.6969 10.2109L35.2399 48.6629L18.3329 50.7469L16.0239 30.7789Z" fill="url(#paint2_linear_2018_18436)"/>
                                                <path opacity="0.7" d="M21.5439 10.6244C19.6419 11.9704 17.3829 12.7744 16.4909 13.1474C15.4009 16.2304 13.2209 22.8454 13.2209 23.5174C13.2209 24.1904 21.7419 23.2374 26.0029 22.6774L27.1929 5.85938C25.4089 7.54138 23.4469 9.27938 21.5439 10.6244Z" fill="url(#paint3_linear_2018_18436)"/>
                                                </g>
                                                <defs>
                                                <linearGradient id="paint0_linear_2018_18436" x1="15.453" y1="-0.836875" x2="34.42" y2="58.2941" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FCF4D6"/>
                                                <stop offset="0.469" stop-color="#F2CC83"/>
                                                <stop offset="1" stop-color="#EEB865"/>
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_2018_18436" x1="20.119" y1="72.4851" x2="-3.785" y2="24.1631" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FF88C1"/>
                                                <stop offset="1" stop-color="white"/>
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_2018_18436" x1="21.1489" y1="20.6129" x2="27.5279" y2="38.8819" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FBE0AE"/>
                                                <stop offset="1" stop-color="#F6DBA8" stop-opacity="0"/>
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_2018_18436" x1="16.7879" y1="12.8674" x2="20.3649" y2="15.3684" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#DFA874"/>
                                                <stop offset="1" stop-color="#F4D7A2" stop-opacity="0"/>
                                                </linearGradient>
                                                </defs>
                                            </svg>

                                        </Typography>
                                        <Box>
                                                <Avatar
                                                    src="https://i.pravatar.cc/50?img=1"
                                                    alt="Alinuska"
                                                    sx={{
                                                    width: 48,
                                                    height: 48,
                                                    mx: 'auto',
                                                    border: '2px solid rgba(245, 214, 151, 1)',
                                                    }}
                                                />
                                                <Typography onClick={handleToggle} fontSize={13} fontWeight={600} mt={0.5}>
                                                    Alinuska
                                                </Typography>
                                                <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                                    <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                                          <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                                    </Box>
                                                    <Typography fontSize={13}>1</Typography>
                                                </Box>
                                                            <Menu
                                                                anchorEl={anchorElProfile}
                                                                open={openProfile}
                                                                onClose={handleCloseProfile}
                                                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                                                transformOrigin={{ vertical: "top", horizontal: "left" }}
                                                                PaperProps={{
                                                                elevation: 3,
                                                                sx: {
                                                                    width: 300,
                                                                    borderRadius: 2,
                                                                    p: 2,
                                                                    overflow: "visible",
                                                                },
                                                                }}
                                                            >
                                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                                    <Box display="flex" alignItems="center">
                                                                    <Avatar
                                                                src={currentMessageUserData?.avatar}
                                                                alt="Profile"
                                                                sx={{ width: 40, height: 40, mr: 1 }}
                                                            />
                                                                    <Box>
                                                                        <Typography fontWeight="bold">{currentMessageUserData?.username ||''}</Typography>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                        {currentMessageUserData?.name ||''}
                                                                        </Typography>
                                                                    </Box>
                                                                    </Box>
                                                                    <IconButton size="small" onClick={handleCloseProfile}>
                                                                    <CloseIcon />
                                                                    </IconButton>
                                                                </Box>

                                                                <Box display="flex" alignItems="center" gap={2} mt={2} mb={2}>
                                                                    <Typography fontWeight="bold">{currentMessageUserData?.followersNumber ||0}</Typography>
                                                                    <Typography color="text.secondary">Followers</Typography>
                                                                    <Typography fontWeight="bold">{currentMessageUserData?.likesNum ||0}</Typography>
                                                                    <Typography color="text.secondary">Likes</Typography>
                                                                </Box>

                                                                <Box display="flex" gap={2}>
                                                                    <Button
                                                                    fullWidth
                                                                    variant="contained"
                                                                    sx={{ bgcolor: "#ff2d55", "&:hover": { bgcolor: "#e6264f" } }}
                                                                    onClick={()=>handleFollow(currentMessageUserData?._id)}
                                                                    >
                                                                    {currentMessageUserData?.isFollowed ? 'UnFollow':'Follow'}
                                                                    </Button>
                                                                    <Button fullWidth variant="outlined" onClick={()=> submitReport()}>
                                                                    Report
                                                                    </Button>
                                                                </Box>
                                                            </Menu>


                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2}}>
                                        <Box textAlign="center" sx={{display: 'flex' , alignItems: 'center', gap: 2}}>
                                            <Typography
                                            sx={{
                                                px: 0
                                            }}
                                            >
                                            <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.06 9.91016H5.823C5.823 9.25683 5.88133 8.6035 5.998 7.95017C6.138 7.27217 6.35967 6.66483 6.663 6.12817C6.96633 5.56817 7.36333 5.12483 7.854 4.79817C8.36733 4.44817 8.986 4.27283 9.71 4.27217C10.784 4.27217 11.6597 4.61083 12.337 5.28817C13.037 5.94217 13.387 6.86416 13.387 8.05416C13.387 8.8015 13.212 9.46716 12.862 10.0512C12.5294 10.6408 12.1039 11.1729 11.602 11.6272C11.1113 12.0938 10.5623 12.5255 9.955 12.9222C9.37277 13.2796 8.80055 13.6531 8.239 14.0422C7.22527 14.7402 6.2215 15.4526 5.228 16.1792C4.29467 16.8792 3.47733 17.6495 2.776 18.4902C2.06618 19.3258 1.49861 20.2724 1.096 21.2922C0.698667 22.3422 0.5 23.5795 0.5 25.0042H18.5V20.7302H6.909C7.50332 19.901 8.21009 19.1586 9.009 18.5242C9.803 17.8942 10.6203 17.3108 11.461 16.7742C12.3017 16.2135 13.1303 15.6528 13.947 15.0922C14.787 14.5322 15.5343 13.9135 16.189 13.2362C16.8433 12.5359 17.376 11.7311 17.765 10.8552C18.1617 9.96783 18.36 8.9055 18.36 7.66817C18.36 6.47817 18.1267 5.40417 17.66 4.44617C17.2361 3.51762 16.6142 2.69303 15.838 2.03017C15.043 1.36242 14.1285 0.851703 13.143 0.525165C12.1176 0.171314 11.0397 -0.00619922 9.955 0.000165257C8.485 0.000165257 7.17767 0.256832 6.033 0.770165C4.9446 1.23663 3.98404 1.95748 3.232 2.87217C2.484 3.75883 1.92333 4.80917 1.55 6.02317C1.17667 7.2145 1.01333 8.5105 1.06 9.91117" fill="url(#paint0_linear_2018_18458)"/>
                                                <defs>
                                                <linearGradient id="paint0_linear_2018_18458" x1="3.412" y1="1.59617" x2="10.969" y2="25.0042" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#ECEFF1"/>
                                                <stop offset="1" stop-color="#BDC5CC"/>
                                                </linearGradient>
                                                </defs>
                                                </svg>


                                            </Typography>
                                            <Box display={'flex'}>
                                                    
                                                        <Avatar
                                                            src="https://i.pravatar.cc/50?img=1"
                                                            alt="Alinuska"
                                                            sx={{
                                                            width: 48,
                                                            height: 48,
                                                            mx: 'auto',
                                                            border: '2px solid rgba(245, 214, 151, 1)',
                                                            }}
                                                        />
                                                    <Box pl={1}>
                                                        <Typography fontSize={13} fontWeight={600} mt={0.5}>
                                                            MK6
                                                        </Typography>
                                                    
                                                        <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                                            <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                                                <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                                            </Box>
                                                            <Typography fontSize={13}>1</Typography>
                                                        </Box>
                                                    </Box>
                                            </Box>
                                            
                                        </Box>

                                        <Box textAlign="center" sx={{display: 'flex' , alignItems: 'center', gap: 2}}>
                                            <Typography
                                            sx={{
                                                px: 0
                                            }}
                                            >
                                            <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.76986 10.28V13.74C8.36986 13.74 8.9932 13.7633 9.63986 13.81C10.3085 13.8333 10.9199 13.96 11.4739 14.19C12.0191 14.3914 12.49 14.7542 12.8239 15.23C13.1925 15.714 13.3769 16.4173 13.3769 17.34C13.3769 18.5173 12.9962 19.452 12.2349 20.144C11.4735 20.814 10.5392 21.1487 9.43186 21.148C8.71586 21.148 8.09253 21.0213 7.56186 20.768C7.06927 20.5267 6.63311 20.1843 6.28186 19.763C5.92707 19.3074 5.65742 18.7914 5.48586 18.24C5.29998 17.6335 5.19507 17.005 5.17386 16.371H0.501862C0.478528 17.779 0.674528 19.0253 1.08986 20.11C1.52853 21.194 2.1402 22.1167 2.92486 22.878C3.70886 23.6167 4.65486 24.182 5.76286 24.574C6.89353 24.9673 8.13953 25.1637 9.50086 25.163C10.6775 25.163 11.8082 24.9897 12.8929 24.643C13.9367 24.3185 14.911 23.8024 15.7659 23.121C16.5965 22.451 17.2539 21.6203 17.7379 20.629C18.2459 19.6363 18.4999 18.5057 18.4999 17.237C18.4999 15.8523 18.1192 14.664 17.3579 13.672C16.5959 12.68 15.5459 12.0337 14.2079 11.733V11.664C15.3385 11.3413 16.1809 10.73 16.7349 9.83C17.3115 8.93 17.5999 7.89167 17.5999 6.715C17.5999 5.63033 17.3575 4.67267 16.8729 3.842C16.392 3.01354 15.7439 2.29428 14.9699 1.73C14.192 1.14511 13.3115 0.710971 12.3739 0.45C11.4039 0.15 10.4345 0 9.46586 0C8.22053 0 7.08986 0.207667 6.07386 0.623C5.08769 0.997112 4.19152 1.57502 3.44386 2.319C2.7292 3.05767 2.16386 3.946 1.74786 4.984C1.35586 5.99933 1.13653 7.13 1.08986 8.376H5.76286C5.73953 7.12933 6.03953 6.10267 6.66286 5.296C7.30886 4.46533 8.25453 4.05 9.49986 4.05C10.3999 4.05 11.1959 4.32667 11.8879 4.88C12.5799 5.43333 12.9262 6.22967 12.9269 7.269C12.9269 7.96167 12.7535 8.515 12.4069 8.929C12.0835 9.345 11.6569 9.66833 11.1269 9.899C10.596 10.1113 10.0352 10.2395 9.46486 10.279C8.86486 10.3257 8.29953 10.3257 7.76886 10.279" fill="url(#paint0_linear_2018_18473)"/>
                                                <defs>
                                                <linearGradient id="paint0_linear_2018_18473" x1="9.49486" y1="25.442" x2="9.49486" y2="2.306" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#D7B5A2"/>
                                                <stop offset="1" stop-color="#FBDFCC"/>
                                                </linearGradient>
                                                </defs>
                                            </svg>



                                            </Typography>
                                            <Box display={'flex'}>
                                                    
                                                        <Avatar
                                                            src="https://i.pravatar.cc/50?img=1"
                                                            alt="Alinuska"
                                                            sx={{
                                                            width: 48,
                                                            height: 48,
                                                            mx: 'auto',
                                                            border: '2px solid rgba(245, 214, 151, 1)',
                                                            }}
                                                        />
                                                    <Box pl={1}>
                                                        <Typography fontSize={11} fontWeight={600} mt={0.5}>
                                                            Timus Marina
                                                        </Typography>
                                                    
                                                        <Box display="flex" justifyContent="center" alignItems="center" mt={0.2}>
                                                            <Box component="span" sx={{ color: 'gold', fontSize: 16, mr: 0.5 }}>
                                                              <img style={{height: '15px'}} src={caesium} alt="Coin Icon" />
                                                            </Box>
                                                            <Typography fontSize={12}>2</Typography>
                                                        </Box>
                                                    </Box>
                                            </Box>
                                        </Box>
                                    </Box>        
                            </Box> */}

                            <Box sx={{ bgcolor: '#fff', height: '100%', fontFamily: 'sans-serif' }}>
                            </Box>
                            <>
                            <Box
                              onClick={handleClickHeart}
                              sx={{bottom:'12rem'}}
                              className="cursor-pointer absolute bottom-40 bg-white h-16 flex items-center justify-center w-16 shadow-xl rounded-full right-3 z-50"
                            >
                              <svg
                                style={{ transform: 'scale(1.25)' }}
                                width="80"
                                height="80"
                                viewBox="0 0 80 80"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="25" x2="40" y2="55" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#CF4C49" />
                                    <stop offset="1" stopColor="#CE201B" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M40.6499 54.7851C40.458 54.9149 40.2316 54.9843 39.9999 54.9843C39.7682 54.9843 39.5418 54.9149 39.3499 54.7851C36.2733 52.7301 23.3333 43.5851 23.3333 34.9567C23.3333 23.8234 36.4166 22.04 39.9999 29.5401C43.5833 22.04 56.6666 23.8234 56.6666 34.9567C56.6666 43.5867 43.7266 52.7301 40.6499 54.7817V54.7851Z"
                                  fill="url(#paint0_linear)"
                                />
                              </svg>
                            </Box>

                            {/* Floating Heart Animation */}
                            {showHeart && (
                              <Box className={styles.floatingGift} sx={{ fontSize: 40 }}>
                                <svg
                                style={{ transform: 'scale(1.25)' }}
                                width="80"
                                height="80"
                                viewBox="0 0 80 80"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <defs>
                                  <linearGradient id="paint0_linear" x1="40" y1="25" x2="40" y2="55" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#CF4C49" />
                                    <stop offset="1" stopColor="#CE201B" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M40.6499 54.7851C40.458 54.9149 40.2316 54.9843 39.9999 54.9843C39.7682 54.9843 39.5418 54.9149 39.3499 54.7851C36.2733 52.7301 23.3333 43.5851 23.3333 34.9567C23.3333 23.8234 36.4166 22.04 39.9999 29.5401C43.5833 22.04 56.6666 23.8234 56.6666 34.9567C56.6666 43.5867 43.7266 52.7301 40.6499 54.7817V54.7851Z"
                                  fill="url(#paint0_linear)"
                                />
                              </svg>
                              </Box>
                            )}
                            </>
                              {/* <Box className='cursor-pointer absolute bottom-20 bg-white h-16 flex items-center justify-center w-16 shadow-xl rounded-full right-3 '>
                                  <svg style={{ transform:' scale(1.25)'}} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <defs>
                                        <filter id="filter0_d_2018_18602" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                          <feOffset dy="2"/>
                                          <feGaussianBlur stdDeviation="4"/>
                                          <feComposite in2="hardAlpha" operator="out"/>
                                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
                                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2018_18602"/>
                                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2018_18602" result="shape"/>
                                        </filter>
                                        <linearGradient id="paint0_linear_2018_18602" x1="39.9999" y1="25" x2="39.9999" y2="54.9843" gradientUnits="userSpaceOnUse">
                                          <stop stop-color="#CF4C49"/>
                                          <stop offset="1" stop-color="#CE201B"/>
                                        </linearGradient>
                                      </defs>

                                      <g filter="url(#filter0_d_2018_18602)">
                                        <rect x="8" y="6" width="64" height="64" rx="32" fill="white" fill-opacity="0.75" shape-rendering="crispEdges"/>
                                        <rect x="8.5" y="6.5" width="63" height="63" rx="31.5" stroke="#F2F2F2" shape-rendering="crispEdges"/>
                                        <path d="M40.6499 54.7851C40.458 54.9149 40.2316 54.9843 39.9999 54.9843C39.7682 54.9843 39.5418 54.9149 39.3499 54.7851C36.2733 52.7301 23.3333 43.5851 23.3333 34.9567C23.3333 23.8234 36.4166 22.04 39.9999 29.5401C43.5833 22.04 56.6666 23.8234 56.6666 34.9567C56.6666 43.5867 43.7266 52.7301 40.6499 54.7817V54.7851Z" fill="url(#paint0_linear_2018_18602)"/>
                                      </g>
                                    </svg>
                              </Box>       */}
                            <Box sx={{  height: 'calc(100vh - 14.5rem)', overflowY: 'auto' }}>
                                      <Box sx={{ px: 2, py: 1, height: 'calc(100vh - 14.5rem)', overflowY: 'auto' }}>
                                        <>
                                          {messages && messages.map((msg: any) => (
                                            <Box
                                              key={msg.id}
                                              display="flex"
                                              alignItems="flex-start"
                                              mb={1}
                                              position="relative"
                                              sx={{
                                                '&:hover .options-button': {
                                                  visibility: 'visible',
                                                },
                                              }}
                                            >
                                              
                                              <Avatar onClick={(e:any) => handleToggle(e, msg)} src={msg.userImage} sx={{ width: 24, height: 24, mr: 1 }} />
                                              <Box flex="1" sx={{textAlign: 'left', wordBreak: 'break-word'}}>
                                                <Typography  fontSize={13} fontWeight={600}>{msg.name}</Typography>
                                                <Typography fontSize={13}>{msg.text}</Typography>
                                              </Box>

                                              {/* Always mounted, just hidden unless hovered */}
                                              {/* <IconButton
                                                className="options-button"
                                                size="small"
                                                onClick={(e) => handleMenuOpen(e, msg.name)}
                                                sx={{
                                                  ml: 1,
                                                  visibility: 'hidden', // hidden by default
                                                }}
                                              >
                                                <MoreVertIcon fontSize="small" />
                                              </IconButton> */}
                                              <Menu
                                                        anchorEl={anchorElProfile}
                                                        open={openProfile}
                                                        onClose={handleCloseProfile}
                                                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                                        transformOrigin={{ vertical: "top", horizontal: "left" }}
                                                        PaperProps={{
                                                        elevation: 3,
                                                        sx: {
                                                            width: 300,
                                                            borderRadius: 2,
                                                            p: 2,
                                                            overflow: "visible",
                                                        },
                                                        }}
                                                    >
                                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                                            <Box display="flex" alignItems="center">
                                                          
                                                            <Avatar
                                                                src={currentMessageUserData?.avatar}
                                                                alt="Profile"
                                                                sx={{ width: 40, height: 40, mr: 1 }}
                                                            />
                                                            <Box>
                                                                <Typography fontWeight="bold">{currentMessageUserData?.username ||''}</Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                {currentMessageUserData?.name ||''}
                                                                </Typography>
                                                            </Box>
                                                            </Box>
                                                            <IconButton size="small" onClick={handleCloseProfile}>
                                                            <CloseIcon />
                                                            </IconButton>
                                                        </Box>

                                                        
                                                          <Box display="flex" alignItems="center" gap={2} mt={2} mb={2}>
                                                              <Typography fontWeight="bold">{currentMessageUserData?.followersNumber ||0}</Typography>
                                                              <Typography color="text.secondary">Followers</Typography>
                                                              <Typography fontWeight="bold">{currentMessageUserData?.likesNum ||0}</Typography>
                                                              <Typography color="text.secondary">Likes</Typography>
                                                          </Box>
                                                        <Box display="flex" gap={2}>
                                                            <Button
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{ bgcolor: "#ff2d55", "&:hover": { bgcolor: "#e6264f" } }}
                                                            onClick={()=> {
                                                              handleFollow(currentMessageUserData?._id); 
                                                              setCurrentMessageUserData({...currentMessageUserData, isFollowed: !currentMessageUserData?.isFollowed}); 
                                                              }}
                                                            >
                                                            {currentMessageUserData?.isFollowed ? 'UnFollow':'Follow'}
                                                            </Button>
                                                            <Button fullWidth variant="outlined" onClick={()=> setOpenReport(true)}>
                                                            Report
                                                            </Button>
                                                        </Box>
                                                    </Menu>

                                              <Box
                                                className="options-button"
                                                  sx={{
                                                    cursor: 'pointer',
                                                    ml: 1,
                                                    visibility: 'hidden', // hidden by default
                                                  }} ml="auto"  onClick={(e:any) => handleMenuOpen(e, msg.name)}>
                                                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.66016 12C2.66016 10.8954 3.55559 10 4.66016 10C5.76471 10 6.66016 10.8954 6.66016 12C6.66016 13.1045 5.76471 14 4.66016 14C3.55559 14 2.66016 13.1045 2.66016 12ZM10.6602 12C10.6602 10.8954 11.5556 10 12.6602 10C13.7647 10 14.6602 10.8954 14.6602 12C14.6602 13.1045 13.7647 14 12.6602 14C11.5556 14 10.6602 13.1045 10.6602 12ZM18.6602 12C18.6602 10.8954 19.5556 10 20.6602 10C21.7647 10 22.6602 10.8954 22.6602 12C22.6602 13.1045 21.7647 14 20.6602 14C19.5556 14 18.6602 13.1045 18.6602 12Z" fill="#161823"/>
                                                  </svg>
                                              </Box>

                                            </Box>
                                          ))}
                                          <div ref={messagesEndRef} />
                                          <Menu
                                            anchorEl={menuAnchor}
                                            open={Boolean(menuAnchor)}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                              elevation: 4,
                                              sx: {
                                                  mt: 1,
                                                  borderRadius: 2,
                                                  minWidth: 250,
                                                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
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

                                            {/* <MenuItem onClick={() => handleReport(menuMsgId!)}>Report</MenuItem> */}

                                            <MenuItem onClick={() => handleReply(menuMsgId!)} sx={{ py: 1.25 , '&:hover': { bgcolor: '#f5f5f5'}}}>
                                                        <ListItemIcon>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.7727 18.8672C8.97271 18.8672 7.39771 18.5047 6.05188 17.7839C4.74007 17.1113 3.65482 16.0681 2.93104 14.7839C2.18855 13.3963 1.81683 11.8405 1.85188 10.2672C1.85188 8.58385 2.21438 7.11302 2.93521 5.84635C3.65857 4.57576 4.73362 3.54123 6.03104 2.86719C7.36438 2.15885 8.89771 1.80469 10.631 1.80469C12.3144 1.80469 13.7935 2.12552 15.0727 2.76302C16.3644 3.39219 17.3644 4.29219 18.0727 5.46719C18.8128 6.69691 19.1884 8.11149 19.156 9.54635C19.156 11.013 18.8144 12.213 18.131 13.1464C17.4519 14.063 16.4935 14.5255 15.256 14.5255C14.481 14.5255 13.8644 14.3589 13.4144 14.0255C13.1836 13.8414 12.9985 13.6065 12.8735 13.3391C12.7484 13.0717 12.6869 12.779 12.6935 12.4839L12.9727 12.6089C12.78 13.1936 12.3915 13.694 11.8727 14.0255C11.3012 14.3728 10.6411 14.5465 9.97271 14.5255C9.28713 14.5518 8.60862 14.3789 8.01926 14.0276C7.42991 13.6764 6.95496 13.1619 6.65188 12.5464C6.32154 11.8742 6.15723 11.1326 6.17271 10.3839C6.17271 9.57135 6.32688 8.85885 6.63104 8.24635C6.93266 7.63416 7.40435 7.12188 7.98962 6.77087C8.5749 6.41985 9.24894 6.24498 9.93104 6.26719C10.681 6.26719 11.306 6.43802 11.8144 6.78385C12.331 7.11719 12.6894 7.59219 12.8727 8.20469L12.5935 8.54635V6.86302C12.5935 6.75251 12.6374 6.64653 12.7156 6.56839C12.7937 6.49025 12.8997 6.44635 13.0102 6.44635H13.956C14.0666 6.44635 14.1725 6.49025 14.2507 6.56839C14.3288 6.64653 14.3727 6.75251 14.3727 6.86302V11.8839C14.3727 12.2464 14.4644 12.5089 14.6519 12.6839C14.8519 12.8464 15.1185 12.9255 15.4519 12.9255C16.0269 12.9255 16.4727 12.613 16.7935 11.9839C17.1269 11.3464 17.2935 10.5505 17.2935 9.60885C17.2935 8.33802 17.0144 7.23802 16.4519 6.30469C15.9135 5.38042 15.1131 4.63656 14.1519 4.16719C13.0768 3.63967 11.8908 3.37817 10.6935 3.40469C9.31854 3.40469 8.09771 3.69219 7.03104 4.26719C6.00107 4.81853 5.14863 5.65075 4.57271 6.66719C3.96934 7.76191 3.66604 8.99667 3.69354 10.2464C3.69354 11.6589 3.98521 12.8922 4.57271 13.9464C5.15604 14.988 5.98938 15.7839 7.07271 16.3464C8.26001 16.93 9.57099 17.2173 10.8935 17.1839H15.0977C15.2082 17.1839 15.3142 17.2278 15.3923 17.3059C15.4705 17.384 15.5144 17.49 15.5144 17.6005V18.4505C15.5144 18.561 15.4705 18.667 15.3923 18.7451C15.3142 18.8233 15.2082 18.8672 15.0977 18.8672H10.7727ZM10.356 12.9839C11.0727 12.9839 11.6394 12.7505 12.0519 12.2839C12.481 11.8172 12.6935 11.1839 12.6935 10.3839C12.6935 9.58385 12.481 8.95052 12.0519 8.48385C11.8377 8.24898 11.5742 8.06441 11.2803 7.94339C10.9864 7.82237 10.6693 7.76788 10.3519 7.78385C9.64354 7.78385 9.08104 8.01719 8.65188 8.48385C8.23938 8.95052 8.03104 9.58385 8.03104 10.3839C8.03104 11.1839 8.23938 11.8172 8.65604 12.2839C8.87135 12.5161 9.13443 12.699 9.42719 12.8198C9.71995 12.9407 10.0354 12.9966 10.3519 12.9839H10.356Z" fill="#161823"/>
                                                            </svg>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Reply" />
                                                    </MenuItem>

                                          </Menu>
                                        </>
                                        {/* <Typography fontSize={13} mb={0.5} color="text.secondary">
                                        Ap uitetė
                                        </Typography> */}

                                        {/* <Box display="flex" alignItems="flex-start" mb={1}>
                                            <Avatar  onClick={handleToggle} src="https://i.pravatar.cc/50?img=2" sx={{ width: 24, height: 24, mr: 1 }} />
                                                    <Menu
                                                        anchorEl={anchorElProfile}
                                                        open={openProfile}
                                                        onClose={handleCloseProfile}
                                                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                                        transformOrigin={{ vertical: "top", horizontal: "left" }}
                                                        PaperProps={{
                                                        elevation: 3,
                                                        sx: {
                                                            width: 300,
                                                            borderRadius: 2,
                                                            p: 2,
                                                            overflow: "visible",
                                                        },
                                                        }}
                                                    >
                                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                                            <Box display="flex" alignItems="center">
                                                            <Avatar
                                                                src="https://i.pravatar.cc/40"
                                                                alt="Profile"
                                                                sx={{ width: 40, height: 40, mr: 1 }}
                                                            />
                                                            <Box>
                                                                <Typography fontWeight="bold">prihartono20</Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                PRIHARTONO
                                                                </Typography>
                                                            </Box>
                                                            </Box>
                                                            <IconButton size="small" onClick={handleCloseProfile}>
                                                            <CloseIcon />
                                                            </IconButton>
                                                        </Box>

                                                        <Box display="flex" alignItems="center" gap={2} mt={2} mb={2}>
                                                            <Typography fontWeight="bold">269</Typography>
                                                            <Typography color="text.secondary">Followers</Typography>
                                                            <Typography fontWeight="bold">33</Typography>
                                                            <Typography color="text.secondary">Likes</Typography>
                                                        </Box>

                                                        <Box display="flex" gap={2}>
                                                            <Button
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{ bgcolor: "#ff2d55", "&:hover": { bgcolor: "#e6264f" } }}
                                                            >
                                                            Follow
                                                            </Button>
                                                            <Button fullWidth variant="outlined">
                                                            Report
                                                            </Button>
                                                        </Box>
                                                    </Menu>
                                            <Box>
                                                <Typography fontSize={13} fontWeight={600}>Mk6</Typography>
                                                <Typography fontSize={13}>Uai</Typography>
                                            </Box>
                                            <Box ml="auto" sx={{cursor: 'pointer'}}  onClick={handleOpenMenu}>
                                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.66016 12C2.66016 10.8954 3.55559 10 4.66016 10C5.76471 10 6.66016 10.8954 6.66016 12C6.66016 13.1045 5.76471 14 4.66016 14C3.55559 14 2.66016 13.1045 2.66016 12ZM10.6602 12C10.6602 10.8954 11.5556 10 12.6602 10C13.7647 10 14.6602 10.8954 14.6602 12C14.6602 13.1045 13.7647 14 12.6602 14C11.5556 14 10.6602 13.1045 10.6602 12ZM18.6602 12C18.6602 10.8954 19.5556 10 20.6602 10C21.7647 10 22.6602 10.8954 22.6602 12C22.6602 13.1045 21.7647 14 20.6602 14C19.5556 14 18.6602 13.1045 18.6602 12Z" fill="#161823"/>
                                                </svg>
                                            </Box>

                                            <Menu
                                                    anchorEl={menuAnchorEl}
                                                    open={isMenuOpen}
                                                    onClose={handleCloseMenu}
                                                    PaperProps={{
                                                    elevation: 4,
                                                    sx: {
                                                        mt: 1,
                                                        borderRadius: 2,
                                                        minWidth: 250,
                                                        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
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
                                                    <MenuItem sx={{ py: 1.25 , '&:hover': { bgcolor: '#f5f5f5'}}} onClick={handleCloseMenu}>
                                                        <ListItemIcon>
                                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4.40592 4.1924V11.5882C6.60176 10.8674 9.17676 10.7341 11.1393 12.1341C12.8184 13.3341 15.1059 12.9716 16.9059 12.2674V4.87156C14.7101 5.59239 12.1351 5.72573 10.1726 4.32573C8.50592 3.13406 6.20176 3.48823 4.40592 4.1924ZM18.5726 3.64656V12.8132C18.5729 12.9678 18.5302 13.1195 18.4492 13.2512C18.3683 13.3829 18.2523 13.4895 18.1143 13.5591C15.6851 14.7674 12.4893 15.1507 10.1726 13.4924C8.48926 12.2924 6.20592 12.6466 4.40592 13.3549V18.6466C4.40592 18.7571 4.36203 18.863 4.28389 18.9412C4.20575 19.0193 4.09976 19.0632 3.98926 19.0632H3.15592C3.04542 19.0632 2.93944 19.0193 2.8613 18.9412C2.78316 18.863 2.73926 18.7571 2.73926 18.6466V3.64656C2.73926 3.33406 2.92259 3.0424 3.19759 2.90073C5.59342 1.7049 8.87259 1.34656 11.1393 2.9674C12.9601 4.27156 15.4851 3.8174 17.3684 2.90073C17.9059 2.6299 18.5726 3.03823 18.5726 3.64656Z" fill="#161823"/>
                                                            </svg>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Report" />
                                                    </MenuItem>

                                                    <MenuItem sx={{ py: 1.25 , '&:hover': { bgcolor: '#f5f5f5'}}} onClick={handleCloseMenu}>
                                                        <ListItemIcon>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.7727 18.8672C8.97271 18.8672 7.39771 18.5047 6.05188 17.7839C4.74007 17.1113 3.65482 16.0681 2.93104 14.7839C2.18855 13.3963 1.81683 11.8405 1.85188 10.2672C1.85188 8.58385 2.21438 7.11302 2.93521 5.84635C3.65857 4.57576 4.73362 3.54123 6.03104 2.86719C7.36438 2.15885 8.89771 1.80469 10.631 1.80469C12.3144 1.80469 13.7935 2.12552 15.0727 2.76302C16.3644 3.39219 17.3644 4.29219 18.0727 5.46719C18.8128 6.69691 19.1884 8.11149 19.156 9.54635C19.156 11.013 18.8144 12.213 18.131 13.1464C17.4519 14.063 16.4935 14.5255 15.256 14.5255C14.481 14.5255 13.8644 14.3589 13.4144 14.0255C13.1836 13.8414 12.9985 13.6065 12.8735 13.3391C12.7484 13.0717 12.6869 12.779 12.6935 12.4839L12.9727 12.6089C12.78 13.1936 12.3915 13.694 11.8727 14.0255C11.3012 14.3728 10.6411 14.5465 9.97271 14.5255C9.28713 14.5518 8.60862 14.3789 8.01926 14.0276C7.42991 13.6764 6.95496 13.1619 6.65188 12.5464C6.32154 11.8742 6.15723 11.1326 6.17271 10.3839C6.17271 9.57135 6.32688 8.85885 6.63104 8.24635C6.93266 7.63416 7.40435 7.12188 7.98962 6.77087C8.5749 6.41985 9.24894 6.24498 9.93104 6.26719C10.681 6.26719 11.306 6.43802 11.8144 6.78385C12.331 7.11719 12.6894 7.59219 12.8727 8.20469L12.5935 8.54635V6.86302C12.5935 6.75251 12.6374 6.64653 12.7156 6.56839C12.7937 6.49025 12.8997 6.44635 13.0102 6.44635H13.956C14.0666 6.44635 14.1725 6.49025 14.2507 6.56839C14.3288 6.64653 14.3727 6.75251 14.3727 6.86302V11.8839C14.3727 12.2464 14.4644 12.5089 14.6519 12.6839C14.8519 12.8464 15.1185 12.9255 15.4519 12.9255C16.0269 12.9255 16.4727 12.613 16.7935 11.9839C17.1269 11.3464 17.2935 10.5505 17.2935 9.60885C17.2935 8.33802 17.0144 7.23802 16.4519 6.30469C15.9135 5.38042 15.1131 4.63656 14.1519 4.16719C13.0768 3.63967 11.8908 3.37817 10.6935 3.40469C9.31854 3.40469 8.09771 3.69219 7.03104 4.26719C6.00107 4.81853 5.14863 5.65075 4.57271 6.66719C3.96934 7.76191 3.66604 8.99667 3.69354 10.2464C3.69354 11.6589 3.98521 12.8922 4.57271 13.9464C5.15604 14.988 5.98938 15.7839 7.07271 16.3464C8.26001 16.93 9.57099 17.2173 10.8935 17.1839H15.0977C15.2082 17.1839 15.3142 17.2278 15.3923 17.3059C15.4705 17.384 15.5144 17.49 15.5144 17.6005V18.4505C15.5144 18.561 15.4705 18.667 15.3923 18.7451C15.3142 18.8233 15.2082 18.8672 15.0977 18.8672H10.7727ZM10.356 12.9839C11.0727 12.9839 11.6394 12.7505 12.0519 12.2839C12.481 11.8172 12.6935 11.1839 12.6935 10.3839C12.6935 9.58385 12.481 8.95052 12.0519 8.48385C11.8377 8.24898 11.5742 8.06441 11.2803 7.94339C10.9864 7.82237 10.6693 7.76788 10.3519 7.78385C9.64354 7.78385 9.08104 8.01719 8.65188 8.48385C8.23938 8.95052 8.03104 9.58385 8.03104 10.3839C8.03104 11.1839 8.23938 11.8172 8.65604 12.2839C8.87135 12.5161 9.13443 12.699 9.42719 12.8198C9.71995 12.9407 10.0354 12.9966 10.3519 12.9839H10.356Z" fill="#161823"/>
                                                            </svg>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Reply" />
                                                    </MenuItem>
                                                </Menu>
                                        </Box> */}

                                        {/* <Box display="flex" alignItems="flex-start" mb={1}>
                                          <Avatar src="https://i.pravatar.cc/50?img=4" sx={{ width: 24, height: 24, mr: 1 }} />
                                          <Box>
                                              <Box display="flex" alignItems="center" gap={0.5}>
                                              <Typography fontSize={13} fontWeight={600}>arthouseconstruct1</Typography>
                                              <Chip label="10" size="small" sx={{ height: 18, fontSize: 10 }} />
                                              <Chip label="1" size="small" color="error" sx={{ height: 18, fontSize: 10 }} />
                                              </Box>
                                              <Typography fontSize={13}>
                                              Ca alina mio trimis laifu si imi spune ca nui si nu pot sa intru nici sa ma uit in laiw la tine
                                              </Typography>
                                          </Box>
                                        </Box>

                                        {/* Message 3 with badge */}
                                        {/* <Box display="flex" alignItems="flex-start" mb={1}>
                                        <Avatar src="https://i.pravatar.cc/50?img=5" sx={{ width: 24, height: 24, mr: 1 }} />
                                            <Box>
                                                <Box display="flex" alignItems="center" gap={0.5}>
                                                <Typography fontSize={13} fontWeight={600}>arthouseconstruct1</Typography>
                                                <Chip label="10" size="small" sx={{ height: 18, fontSize: 10 }} />
                                                <Chip label="No. 2" size="small" color="error" sx={{ height: 18, fontSize: 10 }} />
                                                </Box>
                                                <Typography fontSize={13}>Teai uitat</Typography>
                                            </Box>
                                        </Box> */}

                                        {/* Message 4 */}
                                        {/* <Box display="flex" alignItems="flex-start" mb={1}>
                                        <Avatar src="https://i.pravatar.cc/50?img=6" sx={{ width: 24, height: 24, mr: 1 }} />
                                            <Box>
                                                <Box display="flex" alignItems="center" gap={0.5}>
                                                <Typography fontSize={13} fontWeight={600}>💎 Dorina</Typography>
                                                <Chip label="16" size="small" color="primary" sx={{ height: 18, fontSize: 10 }} />
                                                </Box>
                                                <Typography fontSize={13}>Privetik</Typography>
                                            </Box>
                                        </Box> */}

                                        {/* <Box display="flex" alignItems="flex-start" mb={2}>
                                        <Avatar src="https://i.pravatar.cc/50?img=4" sx={{ width: 24, height: 24, mr: 1 }} />
                                        <Box>
                                            <Box display="flex" alignItems="center" gap={0.5}>
                                            <Typography fontSize={13} fontWeight={600}>arthouseconstruct1</Typography>
                                            <Chip label="10" size="small" sx={{ height: 18, fontSize: 10 }} />
                                            <Chip label="1" size="small" color="error" sx={{ height: 18, fontSize: 10 }} />
                                            </Box>
                                            <Typography fontSize={13}>Da da</Typography>
                                        </Box>
                                        </Box> */}

                                         {currentStream?._id && newJoiner && <Divider textAlign="center" sx={{ fontSize: 12, mb: 1 }}>
                                        New
                                        </Divider>
                                        }

                                        {currentStream?._id && <Box
                                          sx={{
                                              bgcolor: '#f8f8f8',
                                              px: 2,
                                              py: 1,
                                              borderRadius: 1,
                                              mb: 2,
                                          }}
                                        >
                                        {newJoiner && <Typography fontSize={12} color="text.secondary">🌿 {(newJoiner as {name: string}).name} joined</Typography>}
                                        <Typography fontSize={12} fontWeight={500}>
                                        {newJoiner && (newJoiner as { from: string })?.from == loggedInUserId && <>💲 Welcome to Seezitt LIVE! Have fun interacting with others in real time. Creators must be 18 or older to go LIVE. Viewers must be 18 or older to recharge and send Gifts. Remember to follow our Community Guidelines.</>}
                                        </Typography>
                                        
                                        </Box>}
                                        
                                    </Box>

                                    {/* Floating Banner */}
                                    {!isFollowed && showFollowDiv && <Paper
                                        elevation={3}
                                        sx={{
                                        position: 'absolute',
                                        bottom: '3.5rem',
                                        zIndex: 2,
                                        left: '2.5%',
                                        width: '95%',
                                        p: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: 2,
                                        border: '1px solid #eee',
                                        mb: 1,
                                        flexDirection: 'column',
                                        }}
                                    >
                                        <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} mb={1}>
                                            <Avatar src={selectedLiveVideo?.details?.owner?.photo} sx={{ width: 40, height: 40, mr: 1 }} />

                                            <Box flexGrow={1}>
                                            <Typography fontSize={13} fontWeight={600}>Hi {profileData?.username},</Typography>
                                            <Typography fontSize={12} color="text.secondary">
                                                Stay tuned for my LIVE!
                                            </Typography>
                                            </Box>
                                            <IconButton onClick={() => setShowFollowDiv(false)} size="small" sx={{position: 'absolute', top: 8, right: 4}}>
                                            <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>

                                         <Box px={2} mb={1} width={'100%'} m={'auto'} onClick={()=>handleFollow(selectedLiveVideo?.details?.owner?.id)}>
                                            <Box
                                            sx={{
                                                bgcolor: '#ff2e63',
                                                color: '#fff',
                                                py: 1,
                                                borderRadius: 1.5,
                                                textAlign: 'center',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                            >
                                            + Follow
                                            </Box>
                                        </Box>
                                    </Paper>}

                                    {/* Follow Button */}
                                    <CustomMediaPicker isDarkTheme={false} isPickerVisible={isPickerVisible} setIsPickerVisible={setIsPickerVisible} setMessageType={setMessageType} setMessage={setMessage} setUploadedFile={setUploadedFile} setOpenUploadPic={setOpenUploadPic} setFilePreview={setFilePreview} />

                                    {/* Chat Input */}
                                  
                                    <Box
                                        px={2}
                                        pb={2}
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          position: 'absolute',
                                          bottom: 0,
                                          left: 0,
                                          background: '#fff',
                                          pt: 2,
                                          gap: 1,
                                        }}
                                      >
                                        <TextField
                                          fullWidth
                                          placeholder="Say something nice"
                                          variant="outlined"
                                          size="small"
                                          value={message}
                                          disabled={isUserMuted}
                                          onChange={(e) => setMessage(e.target.value)}
                                          onKeyPress={handleKeyPress}
                                          InputProps={{
                                            endAdornment: (
                                              <InputAdornment position="end">
                                                {/* Emoji button inside TextField */}
                                                <IconButton onClick={() => setIsPickerVisible(!isPickerVisible)} disabled={isUserMuted}>
                                                  <img
                                                    className="w-6 h-6 object-contain rounded-full"
                                                    src={emoji}
                                                    alt="emoji-icon"
                                                  />
                                                </IconButton>
                                              </InputAdornment>
                                            ),
                                            sx: { borderRadius: 2, color: darkTheme ? '#fff' : '#000', },
                                          }}
                                        />

                                        {/* Send button outside TextField */}
                                        <IconButton onClick={handleSendMessage} disabled={isUserMuted}>
                                          <SendIcon />
                                        </IconButton>
                                      </Box>
                            </Box>
                        </Box>  
                        )}
              </Box>
            </Grid>
            )}
          </Grid>

           {/* <Modal open={inSuceedCase}>
                <ClickAwayListener
                    onClickAway={() => {
                        setInSuceedCase(false);
                    }}
                >
                    <div>
                        <ThanksForReport onclose={() => setInSuceedCase(false)} />
                    </div>
                </ClickAwayListener>
            </Modal> */}

            {/* model popup report */}
           <Modal open={openReport} onClose={handleCloseReport}>
                <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 0,
                    borderRadius: 2,
                    maxHeight: '90vh',
                    overflowY: 'auto', 
                    background : darkTheme ? '#0e0e0e' : '#fff',
                }}
                >
                <Typography variant="h6" textAlign={'center'} sx={{ mb: 2, fontWeight: 'bold', p:2 }}>
                    Report
                </Typography>
                <FormControl component="fieldset" >
                    <RadioGroup value={selectedReason} onChange={handleReasonChange}>
                    <Grid container spacing={1} sx={{border: '1px solid #ccc'}}>
                        {reasons.map((reason, index) => (
                        <Grid 
                            sx={{
                                    borderTop: index > 1 ? '1px solid #ccc' : 'none',
                                    borderLeft: index % 2 === 1 ? '1px solid #ccc' : 'none',
                                    padding: 1.5,
                                    
                                }}
                                    item xs={12} sm={6} key={index}>
                                    <FormControlLabel
                                    sx={{paddingLeft: 2}}
                                    value={reason}
                                    control={<Radio size="small" />}
                                    label={reason}
                                    />
                        </Grid>
                        ))}
                    </Grid>
                    </RadioGroup>
                </FormControl>

                <Typography variant="caption" color="text.secondary" sx={{ p: 2, display: 'flex', textAlign: 'center' }}>
                    If you know someone that is in immediate physical danger, contact local law enforcement right away.
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" justifyContent="space-between " borderTop={'1px solid #ccc'}>
                    <Button variant="outlined" sx={{
                      color : darkTheme ? '#fff' : '#000',width: '50%', borderRadius: 0, border: 'none', py: 2, '&:hover': { backgroundColor: 'rgba(22, 24, 35, 0.12)', border: 'none'}}} onClick={handleCloseReport}>
                    Cancel
                    </Button>
                    <Button variant="contained" onClick={()=> submitReport()} sx={{  color : darkTheme ? '#fff' : 'inherit', width: '50%', borderRadius: 0, backgroundColor: 'rgba(22, 24, 35, 0.12)', fontWeight: '600', height: '100%', py: 2, '&:hover': { backgroundColor: 'rgba(22, 24, 35, 0.12)', border: 'none'}}} disabled={!selectedReason}>
                    Submit
                    </Button>
                </Box>
                </Box>
           </Modal>
            {/* Modal Dialog */}
            <Dialog open={openFaq} onClose={handleCloseFaq} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2, position: 'relative',       backgroundColor: darkTheme ? '#121212' : '#fff',
 }}>
                    <Typography variant="h6" sx={{color: '#000', fontSize: '1.75rem'}}>FAQ</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseFaq}
                        sx={{
                        position: 'absolute',
                        right: 8,
                        top: 20,
                        color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{      backgroundColor: darkTheme ? '#121212' : '#fff',
}}>
                <Accordion defaultExpanded sx={{ boxShadow: 'none',       backgroundColor: darkTheme ? '#121212' : '#fff',
 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Top Viewers FAQ</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography fontWeight={600}>What is a top viewer?</Typography>
                    <Typography variant="body2" mb={2}>
                        Top viewers are ranked based on Gifts count and watch time. Viewers who send Gifts that are worth more Coins will rank higher. Viewers with no Gift counts will be ranked based on how long they have been watching the LIVE.
                    </Typography>

                    <Typography fontWeight={600}>What can I get if I am a top viewer?</Typography>
                    <Typography variant="body2" mb={2}>
                        The top 2 viewers will have their profile photos shown on the top right corner of the LIVE. Ranking list will show the top 99 viewers.
                    </Typography>

                    <Typography fontWeight={600}>What if I do not wish to be seen as a top viewer on the ranking list?</Typography>
                    <Typography variant="body2">
                        Top viewers can choose not to show their info on the list. You can change your visibility setting in “Ranking settings”.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                </DialogContent>
            </Dialog>
           <RankingSettingsModal rankingClick={rankingClick} isShowRanking={isShowRanking} open={openRating} onClose={() => setOpenRating(false)} />

            
        </Box>
  );
}

export default LiveWithChat;
