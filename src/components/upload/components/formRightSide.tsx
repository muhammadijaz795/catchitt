import { Box, Chip, CircularProgress, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Stack, styled, SvgIcon, Tooltip, SelectChangeEvent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useEffect, useMemo, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAvatar, downArrow, search } from '../../../icons';
import CustomButton from '../../../shared/buttons/CustomButton';
import BasicCheckBox from '../../../shared/checkbox/BasicCheckBox';
import Text from '../../../shared/components/Text';
import BasicInput from '../../../shared/input/BasicInput';
import CustomChip from '../../../shared/input/CustomChip';
import TagsInput from '../../../shared/input/TagsInput';
import CustomModel from '../../../shared/popups/CustomModel';
import CustomPopup from '../../../shared/popups/CustomPopup';
import BasicSwitch from '../../../shared/switch/BasicSwitch';
import { API_KEY } from '../../../utils/constants';
import { loadFollowers } from '../../../redux/AsyncFuncs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Tab } from 'react-tabs';
import styles from './index.module.scss';
import DndContainer from './DndContainerNew';
import CoverImageUploadPage from './CoverImageUploadPage';
import ThumbnailEditorModal from './ThumbnailEditorModal';
import CloseIcon from '@mui/icons-material/Close';
import { message } from 'antd';
import { useUpdateEffect } from 'react-use';
import { setSelectedFile } from '../../../redux/reducers/upload';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';

import CheckIcon from '@mui/icons-material/Check';
import { copyLinkHandler, facebookShareHandler, getCaretCoordinates, searchUserToAnnotate, shareToLinkedIn, shareToTwitter, whatsappShareHandler } from '../../../utils/helpers';


const options = [
  { label: 'Everyone', value: 'everyone' },
  { label: 'Followers', value: 'followers' },
  { label: 'Only Me', value: 'onlyme' },
];
function FormRightSide(props: any) {
    const {
        uploadState,
        onCancelUpload,
        onReplaceFile,
        thumbnails,
        updateState,
        state,
        SubmitHandler,
        isPosting,
        // videoInfo,
        // updateMediaHandler,
    } = props;
    const [dropDown, setdropDown] = useState(false);
    const [videoThumbnails, setVideoThumbnails] = useState<any[]>([]);
    const [selectedThumb, setSelectedThumb] = useState(0);
    const [discardPostPopup, setDiscardPostPopup] = useState(false);
    const [tagUsersPopup, setTagUsersPopup] = useState(false);
    const [postLocationsPopup, setPostLocationsPopup] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [taggedUsers, setTaggedUser] = useState<any[]>([]);
    const [customCover, setCustomCover] = useState<string | null>(null);
    const [isMentioning, setIsMentioning] = useState<boolean>(false);
    const [filteredUsers, setFilteredUsers] = useState<any>([]);
    const abortController = useRef<AbortController | null>(null);
    const [comment, setComment] = useState('');
    const [isFetchingUsers, setIsFetchingUsers] = useState(false);
    const [mentionIndex, setMentionIndex] = useState(0);
    const inputRef = useRef<any>(null);
    const popupRef = useRef<any>(null);

    const [showDndContainer, setShowDndContainer] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);


    const [showChecking, setShowChecking] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const dispatch = useDispatch();

    const handleSelectThumbnail = (index: number) => {
        setSelectedThumb(index);
        updateState('thumbnailUrl', videoThumbnails[index]);
      };
      
      const handleCustomThumbnail = (file: File) => {
        if (!/\.(jpg|jpeg|png|webp)$/i.test(file.name)) {
          message.error('You can only upload supported file!');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          updateState('thumbnailUrl', e.target.result);
        };
        reader.readAsDataURL(file);
      };

    useEffect(() => {
        if (state?.thumbnailUrl) {
          setThumbnailUrl(state.thumbnailUrl);
        }
      }, [state?.thumbnailUrl]);

    // Add this function to handle file selection
    const handleFileSelect = (file: File) => {
    if (!/\.(jpg|jpeg|png|webp)$/i.test(file.name)) {
        message.error('You can only upload supported file!');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
        setThumbnailUrl(e.target.result);
        updateState('thumbnailUrl', e.target.result);
        setShowDndContainer(false); // Hide the DndContainer after selection
    };
    reader.readAsDataURL(file);
    };

    const loadMoreFollowers = () => {
        dispatch(loadFollowers(followersPage));
        // Fetch more data for the next page
    };

    useEffect(() => {
        if (state?.copyRightCheck) {
            setShowResult(false);
            setShowChecking(true);
    
            const timer = setTimeout(() => {
                setShowChecking(false);
                setShowResult(true);
            }, 2000); // 2 seconds
    
            return () => clearTimeout(timer); // Cleanup on unmount or rerun
        } else {
            setShowChecking(false);
            setShowResult(false);
        }
    }, [state?.copyRightCheck]);

    const LocationIcon = () => (
        <svg  width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.97716 1.48047C8.09368 1.48047 7.24639 1.83143 6.62167 2.45614C5.99696 3.08086 5.646 3.92816 5.646 4.81164C5.646 6.41326 6.80258 7.75239 8.3096 8.07152L8.31093 11.474C8.31093 11.6507 8.38112 11.8201 8.50606 11.9451C8.63101 12.07 8.80047 12.1402 8.97716 12.1402C9.15386 12.1402 9.32332 12.07 9.44826 11.9451C9.5732 11.8201 9.6434 11.6507 9.6434 11.474L9.6354 8.06818C11.1411 7.74972 12.3083 6.41326 12.3083 4.81164C12.3083 3.92816 11.9574 3.08086 11.3327 2.45614C10.7079 1.83143 9.86064 1.48047 8.97716 1.48047ZM8.97716 2.81294C9.23964 2.81294 9.49954 2.86463 9.74203 2.96508C9.98453 3.06552 10.2049 3.21274 10.3905 3.39834C10.5761 3.58394 10.7233 3.80427 10.8237 4.04677C10.9242 4.28926 10.9759 4.54916 10.9759 4.81164C10.9759 5.07411 10.9242 5.33401 10.8237 5.57651C10.7233 5.819 10.5761 6.03933 10.3905 6.22493C10.2049 6.41053 9.98453 6.55775 9.74203 6.65819C9.49954 6.75864 9.23964 6.81034 8.97716 6.81034C8.44707 6.81034 7.9387 6.59976 7.56387 6.22493C7.18904 5.8501 6.97846 5.34172 6.97846 4.81164C6.97846 4.28155 7.18904 3.77317 7.56387 3.39834C7.9387 3.02351 8.44707 2.81294 8.97716 2.81294ZM8.97716 4.1454C8.80047 4.1454 8.63101 4.21559 8.50606 4.34054C8.38112 4.46548 8.31093 4.63494 8.31093 4.81164C8.31093 4.98833 8.38112 5.15779 8.50606 5.28273C8.63101 5.40768 8.80047 5.47787 8.97716 5.47787C9.15386 5.47787 9.32332 5.40768 9.44826 5.28273C9.5732 5.15779 9.6434 4.98833 9.6434 4.81164C9.6434 4.63494 9.5732 4.46548 9.44826 4.34054C9.32332 4.21559 9.15386 4.1454 8.97716 4.1454Z" fill="black" fillOpacity="0.34"/>
          <path d="M6.08516 9.26714C4.60946 9.78347 3.64941 10.6869 3.64941 11.8068C3.64941 13.5883 6.08316 14.8049 8.97928 14.8049C11.8754 14.8049 14.3091 13.5883 14.3091 11.8068C14.3091 10.6842 13.3331 9.7828 11.8521 9.26714C11.505 9.14589 11.1405 9.33576 11.0193 9.68287C10.9892 9.76344 10.9757 9.84922 10.9794 9.93513C10.9831 10.021 11.004 10.1053 11.0409 10.183C11.0779 10.2607 11.13 10.3301 11.1942 10.3873C11.2585 10.4444 11.3336 10.4881 11.415 10.5157C12.4217 10.8668 12.9767 11.3844 12.9767 11.8068C12.9767 12.601 11.2345 13.4724 8.97928 13.4724C6.72408 13.4724 4.98188 12.601 4.98188 11.8068C4.98188 11.3858 5.5202 10.8668 6.52288 10.5157C6.86932 10.3944 7.06053 10.0306 6.93861 9.68287C6.87975 9.51531 6.75723 9.3777 6.59759 9.29988C6.43796 9.22206 6.25341 9.2103 6.08516 9.26714Z" fill="black" fillOpacity="0.34"/>
        </svg>
      );
    useMemo(() => {
        setVideoThumbnails(thumbnails);
        setSelectedThumb(0);
    }, [thumbnails]);
    const categories = useSelector((store: any) => store?.reducers?.videoCategories) || [];
    const followers = useSelector((state: any) => state.reducers?.followers.data);
    const followersPage = useSelector((state: any) => state?.reducers?.followers?.page);
    const totalFollowers = useSelector((state: any) => state.reducers?.followers.total);

    const [postCategories, setPostCategories] = useState(categories);
    const [countries, setCountries] = useState<any>([]);
    const [filteredCountries, setFilteredCountries] = useState<any>([]);
    const [filteredFollowers, setFilteredFollowers] = useState<any>(followers);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const [coverTab, setCoverTab] = useState<string>('suggestion');

    
    const [canView, setCanView] = useState("everyone");
    // updateState('canView', "everyone");
    const [postTimeOption, setPostTimeOption] = useState('now');
    const [showSchedule, setShowSchedule] = useState(false);
    const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
  
    const handleTimeChange = (e) => setTime(e.target.value);
    const handleDateChange = (e) => setDate(e.target.value);
  
    const handleChange = (e) => {
      const value = e.target.value;
      setPostTimeOption(value);
  
      if (value === 'schedule') {
        setPermissionDialogOpen(true); // Ask for permission
      } else {
        setShowSchedule(false); // Hide schedule section if "Now" is selected
      }
    };
  
    const handleAllowSchedule = () => {
        console.log('hello schedule.')
      setShowSchedule(true);
      setPermissionDialogOpen(false);
    };
  
    const handleDenySchedule = () => {
      setPostTimeOption('now'); // Revert selection
      setPermissionDialogOpen(false);
    };

     useEffect(() => {
            if (isMentioning) {
                // Filter users based on the current input
                const query = comment.slice(comment.lastIndexOf('@') + 1).toLowerCase();
                if (query.length) setIsFetchingUsers(true);
                if (query.length > 2) {
                    if (abortController.current) abortController.current.abort();
                    const controller = new AbortController();
                    abortController.current = controller;
                    // const filtered = dummyUsers.filter((user) =>
                    //     user.username.toLowerCase().includes(query)
                    // );
                    // setFilteredUsers(filtered.slice(0, 5)); // Limit to 5 users
                    (async ()=>{
                        const searchResultArr = await searchUserToAnnotate(query, controller.signal);
                        console.log(searchResultArr);
                        if (!Array.isArray(searchResultArr)) return;
                        console.log('searchResultArr')
                        console.log(searchResultArr)
                        setFilteredUsers(searchResultArr);
                        setIsFetchingUsers(false);
                    })()
                } else {
                    setFilteredUsers([]);
                }
            } else {
                setFilteredUsers([]);
                setMentionIndex(0);
            }
            
            return () => {
                if (abortController.current) abortController.current.abort();
            }
        }, [comment, isMentioning]);

    // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newDate = event.target.value;
    //     setDate(newDate);
    // };

    useEffect(() => {
        if (postTimeOption === "schedule" && date && time) {
            const localDateTime = new Date(`${date}T${time}`);
            const utcDateTime = localDateTime.toISOString();
            updateState('scheduledAt', utcDateTime);
        }
    }, [date, time]);


      

    const StyledSelect = styled(Select)(({ theme }) => ({
        backgroundColor: '#f3f3f3',
        borderRadius: 12,
        height: 48,
        width: '100%',
        color: '#8c8c8c',
        fontWeight: 500,
        fontSize: '0.95rem',
        paddingLeft: 0,
      
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiSelect-icon': {
          color: '#000',
          right: 12,
        },
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8,
        }
      }));

    const loadCountries = () => {
        setLoading(true);
        try {
            fetch(`${API_KEY}/util/countries`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    let response = data?.data;
                    const countriesList = response?.countries?.map(
                        (country: { name: string; code: string }) => {
                            const name = country?.name;
                            const code = country?.code;
                            return {
                                name,
                                code,
                            };
                        }
                    );
                    setCountries(countriesList);
                    setFilteredCountries(countriesList);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCountries();
        if (totalFollowers === null) dispatch(loadFollowers(1));
        updateState('canView', "everyone");
    }, []);

    useEffect(() => {
        setFilteredFollowers(followers)
    }, [followers])
    

    useEffect(() => {
        const taggedFollowers = taggedUsers.map((user: any) => user?._id);
        updateState('taggedUsers', taggedFollowers);
    }, [taggedUsers]);

    const dropDownH = (e: any) => {
        const filteredCategories = categories.filter((item: any) => {
            if (item?.name?.toLowerCase().includes(e.target.value.toLowerCase())) {
                return item;
            }
        });
        setPostCategories(filteredCategories);
    };

    const handleDescriptionChange = (e: any) => {
        const inputValue = e.target.value;
        setComment(inputValue);

        const mentionTrigger = inputValue.match(/@(\w*)$/);
        if (mentionTrigger && mentionTrigger[1].length > 0) {
            setIsMentioning(true);
        } else {
            setIsMentioning(false);
        }

        if (e.target.value.length <= 2200) {
            updateState('description', e.target.value);
        }
    }

    const handleUserSelect = (user: { username: any }) => {
        setComment((prevComment) => {
            const lastMentionStart = prevComment.lastIndexOf('@');
            const newComment = `${prevComment.slice(0, lastMentionStart)}@${user.username} `;
            updateState('description', newComment);

            return newComment;
        });
        setIsMentioning(false);
    };


    useUpdateEffect(() => {
            if (!isMentioning) return;
            const positionObj = getCaretCoordinates(inputRef.current, inputRef.current.selectionStart, inputRef.current.parentNode);
            popupRef.current.style.left = `${positionObj?.left ?? 0 + window.scrollX}px`;
        }, [isMentioning])

   

    const filterCountries = (e: any) => {
        const filteredCountriesArr = countries.filter((country: any) => {
            if (country?.name?.toLowerCase().includes(e.target.value.toLowerCase())) {
                return country;
            }
        });
        setFilteredCountries(filteredCountriesArr);
    }

    const filterFollowers = (e: any) => {
        const filteredFollowersArr = followers.filter((follower: any) => {
            if (follower?.follower_userID?.name?.toLowerCase().includes(e.target.value.toLowerCase())) {
                return follower;
            }
        });
        setFilteredFollowers(filteredFollowersArr);
    }
    var themeColor = window.localStorage.getItem('theme');


    useUpdateEffect(() => {
        setFilteredCountries(countries);
    }, [postLocationsPopup]);

    useUpdateEffect(()=>{
        setFilteredFollowers(followers)
    },[tagUsersPopup]);

    const handleCanViewChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setCanView(value);
        updateState('canView', value);
    };

    // console.log('uploadState');
    // console.log(uploadState);


    
    

    return (
        <div className="flex-[1.7] flex flex-col items-start pl-[2.5rem] md:pl-0 pr-[2.5rem]">
            <div className="w-[100%]">
                <div className="w-[100%] flex flex-col gap-[1rem] pb-[2rem]">
                    <p className="text-start text-base pt-2 font-semibold leading-[1.5rem] text-custom-dark-222">Details</p>
                    <div className='bg-white p-3 rounded-sm shadow-sm position-relative'>
                        <div className=''>
                            
                        <div className="w-[100%] flex flex-col gap-[1rem] relative">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-sm font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Description
                                </p>
                                
                            </div>
                            {/* <BasicInput
                                value={state?.description || ''}
                                endAdornment={
                                    <p className="text-custom-color-000 leading-[1.5rem] text-[1rem] font-normal">
                                        # @
                                    </p>
                                }
                                onChange={handleDescriptionChange}
                            /> */}
                            <textarea ref={inputRef} value={state?.description || ''} onChange={handleDescriptionChange} id="message" name="message" className="w-full  rounded bg-[#0000000D] focus:border-white focus:ring-1 focus:ring-white h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                            <p className="text-gray-500 text-sm leading-[1.5rem] text-[1rem] font-normal absolute left-4 bottom-1">
                                #hashtag @Mention
                            </p>

                            
                            
                            <p className="text-[1rem] text-sm text-custom-color-999 leading-[1.1rem] absolute right-4 bottom-1">
                                {state?.description?.length || 0}/2200
                            </p>
                        </div>
                        {isMentioning && (
                                <div
                                    ref={popupRef}
                                    className="absolute w-[96%] bottom-[12.25rem]  !left-[2%] bg-white border rounded-lg shadow-lg  z-10 min-h-40 max-h-80 overflow-y-auto "
                                >
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map(
                                            (
                                                user: {
                                                    id?: any;
                                                    avatar?: any;
                                                    name?: any;
                                                    username: any;
                                                },
                                                index: number
                                            ) => (
                                                <div
                                                    key={user.id}
                                                    className={`flex flex-row justify-start items-center cursor-pointer px-2 pt-2 hover:bg-gray-200 gap-3 border-b border-gray-100 pb-2 ${index === mentionIndex
                                                        ? 'bg-gray-300'
                                                        : ''
                                                        } ${index === 0 ? 'rounded-t-lg' : ''} ${filteredUsers.length - 1 === index
                                                            ? 'rounded-b-lg'
                                                            : ''
                                                        }`}
                                                    onClick={() => handleUserSelect(user)}
                                                >
                                                    <img
                                                        className="object-contain w-10 h-10 rounded-full"
                                                        src={user.avatar||defaultAvatar}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                            (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                                        }}
                                                    />
                                                    <div className="text-left text-black">
                                                        <p className="text-base font-medium">
                                                            {user.name}
                                                        </p>
                                                        <p className="text-xs font-normal">
                                                            {user.username}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div className="px-4 py-2 text-white min-w-32 text-center">
                                            {isFetchingUsers? <CircularProgress style={{width:'20px',height:'20px',padding:'0px',marginBottom:'-4px'}}/>:'No users found'} 
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="w-[100%] flex flex-col gap-1.5 py-3">
                            {/* <div className="w-full flex items-center justify-start gap-2.5 no-underline list-none h-[46px] cursor-pointer">
                                <Tab
                                    onClick={() => setCoverTab('suggestion')}
                                    className={`${styles.coverTab} 
                                        ${coverTab === 'suggestion'
                                            ? `${styles.coverTabSelected} text-[var(--primary-color)]`
                                            : ''
                                        } 
                                        leading-[1.7rem] text-[0.875rem] font-medium
                                    `}
                                >
                                    Suggestions
                                </Tab>
                                <Tab
                                    onClick={() => setCoverTab('custom')}
                                    className={`${styles.coverTab}
                                        ${coverTab === 'custom'
                                            ? `${styles.coverTabSelected} text-[var(--primary-color)]`
                                            : ''
                                        } 
                                        leading-[1.7rem] text-[0.875rem] font-medium
                                    `}
                                >
                                    Cover
                                </Tab>
                            </div> */}
                            {/* {coverTab === 'suggestion' && (
                                <>
                                    {videoThumbnails?.length > 0 ? (
                                        <div className="flex  overflow-x-auto px-[10px] justify-start  rounded-[5px] bg-[var(--secondaty-color)] left-0 gap-[1px] h-[285px] pt-[10px] w-100 slider-container">
                                            {videoThumbnails?.map((imageUrl: any, index: number) => (
                                                <img
                                                    key={index}
                                                    onClick={() => {
                                                        updateState('thumbnailUrl', imageUrl);
                                                        setSelectedThumb(index);
                                                    }}
                                                    className={`ease-in-out duration-200 block ${imageUrl === selectedThumb ||
                                                            index === selectedThumb
                                                            ? 'h-[254px] opacity-100'
                                                            : 'h-[224px] '
                                                        } w-[124px] pointer opacity-50 my-[auto] rounded-[5px]`}
                                                    src={imageUrl}
                                                    alt=""
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex  overflow-x-scroll border px-[10px] justify-center  rounded-[5px] border-gray-500 mt-[16px] border-solid left-0 gap-[1px] h-[285px] pt-[10px] slider-container">
                                            <CircularProgress
                                                style={{ display: 'block', margin: 'auto' }}
                                            />
                                        </div>
                                    )}
                                </>
                            )} */}
                            {/* {coverTab === 'custom' && !customCover && ( */}
                            <div className="w-full h-[285px]">
  <div className="w-full h-full relative flex items-start">
    {state?.thumbnailUrl ? (
      <div className="relative h-full max-w-[20%]">
        <img
          src={state.thumbnailUrl}
          alt="Video thumbnail"
          className="h-full w-full object-cover rounded-md"
        />
       <button
            onClick={() => setThumbnailModalOpen(true)}
            style={{ fontSize: '9px' }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1.5 rounded-md shadow-sm hover:bg-black/70 transition-colors"
            >
        Edit Cover
</button>
      </div>
    ) : (
      <div className="w-full h-full flex items-center justify-start border-2 border-dashed border-gray-300 rounded-lg px-4">
        {/* <button
          onClick={() => setThumbnailModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Thumbnail
        </button> */}
      </div>
    )}

    <ThumbnailEditorModal
      open={thumbnailModalOpen}
      onClose={() => setThumbnailModalOpen(false)}
      videoThumbnails={videoThumbnails}
      selectedThumb={selectedThumb}
      onSelectThumbnail={handleSelectThumbnail}
      onCustomThumbnail={handleCustomThumbnail}
      currentThumbnail={state?.thumbnailUrl}
      aspectRatio={62 / 127}
    />
  </div>
</div>


                            {/* )} */}
                            {coverTab === 'custom' && customCover && (
                                <div className="flex px-[10px] justify-start  rounded-[5px]  left-0 gap-[1px] h-[285px] pt-[10px] w-100 slider-container">
                                    <div className="relative">
                                        <img
                                            className="ease-in-out duration-200 block h-[254px] w-[124px] pointer my-[auto] rounded-[5px]"
                                            src={customCover}
                                            alt=""
                                        />
                                        <button
                                            className="h-[20px] w-[20px] p-0 flex items-center justify-center absolute top-1.5 right-1.5 rounded-full border border-solid !border-[var(--primary-color)]"
                                            onClick={() => {
                                                setCustomCover(null);
                                                updateState('thumbnailUrl', videoThumbnails[0]);
                                            }}
                                        >
                                            <SvgIcon fontSize="small">
                                                <CloseIcon className="text-[10px] text-[var(--primary-color)]" />
                                            </SvgIcon>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <div className="w-[100%] flex flex-col pt-2">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-[0.875rem]  font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Category
                                </p>
                            </div>
                            <div className="relative flex flex-col">
                                <BasicInput
                                    editable={false}
                                    onClick={() => setdropDown(!dropDown)}
                                    value={state?.category?.name || ''}
                                    endAdornment={
                                        <img
                                            src={downArrow}
                                            alt=""
                                            className={`cursor-pointer transition-all duration-200 transform ${dropDown ? 'rotate-180' : 'rotate-0'
                                                }`}
                                        />
                                    }
                                />
                                {dropDown ? (
                                    <div className="p-[1rem]  rounded-[0.3rem] flex flex-col relative  border  border-custom-gray-300 ">
                                        <BasicInput
                                            type="search"
                                            onChange={dropDownH}
                                            placeholder="Choose category"
                                            width="100% !important"
                                        />
                                        <div
                                            className="flex max-h-[200px] overflow-y-scroll flex-col pt-[1rem] justify-start items-start"
                                            onClick={() => setdropDown(!dropDown)}
                                        >
                                            {postCategories?.map((category: any, i: number) => {
                                                return (
                                                    <p
                                                        className="h-[2.3rem] py-[1rem] gap-2 px-[0.63rem] w-[100%] flex items-center cursor-pointer text-custom-dark-222 text-[0.87rem] text-left font-normal hover:text-custom-primary hover:bg-custom-gray-300"
                                                        onClick={() => {
                                                            updateState('category', category);
                                                            setPostCategories(categories);
                                                        }}
                                                        key={i}
                                                    >
                                                        <img
                                                            className="max-w-[14px]  max-h-[14px]"
                                                            src={category?.icon}
                                                            alt=""
                                                        />
                                                        {category?.name}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="max-w-[100%] flex flex-col pt-2">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-[0.875rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Tag people
                                </p>
                            </div>
                            <TagsInput
                                startAdornment={taggedUsers.map((user, index) => {
                                    return (
                                        <CustomChip
                                            key={index}
                                            onDelete={() => {
                                                const filteredUsers = taggedUsers.filter(
                                                    (user2: any) => user2?.id !== user?.id
                                                );
                                                setTaggedUser(filteredUsers);
                                            }}
                                            tabIndex={-1}
                                            className="w-[200px] h-[48px] bg-custom-gray-400"
                                            label={user?.name}
                                        />
                                    );
                                })}
                                onClick={() => setTagUsersPopup(true)}
                                placeholder="Tag people"
                            />
                        </div> */}
                        <div className="w-[100%] flex flex-col pt-2">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-[0.875rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                    {/* {videoInfo ? 'Edit' : 'Add'} location */} Location
                                    <Tooltip title="Set a time to publish later">
                                    <IconButton size="small">
                                    <svg className='ml-1' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.989" d="M6.33905 0.511719C3.11961 0.511719 0.509888 3.12144 0.509888 6.34089C0.509888 9.56033 3.11961 12.1701 6.33905 12.1701C9.5585 12.1701 12.1682 9.56033 12.1682 6.34089C12.1682 3.12144 9.5585 0.511719 6.33905 0.511719ZM6.33905 1.67755C7.57585 1.67755 8.76198 2.16887 9.63653 3.04341C10.5111 3.91796 11.0024 5.10409 11.0024 6.34089C11.0024 7.57768 10.5111 8.76382 9.63653 9.63836C8.76198 10.5129 7.57585 11.0042 6.33905 11.0042C5.10226 11.0042 3.91612 10.5129 3.04158 9.63836C2.16704 8.76382 1.67572 7.57768 1.67572 6.34089C1.67572 5.10409 2.16704 3.91796 3.04158 3.04341C3.91612 2.16887 5.10226 1.67755 6.33905 1.67755ZM6.33905 3.4263C6.18446 3.4263 6.03619 3.48772 5.92687 3.59703C5.81755 3.70635 5.75614 3.85462 5.75614 4.00922C5.75614 4.16382 5.81755 4.31208 5.92687 4.4214C6.03619 4.53072 6.18446 4.59214 6.33905 4.59214C6.49365 4.59214 6.64192 4.53072 6.75124 4.4214C6.86056 4.31208 6.92197 4.16382 6.92197 4.00922C6.92197 3.85462 6.86056 3.70635 6.75124 3.59703C6.64192 3.48772 6.49365 3.4263 6.33905 3.4263ZM5.75614 5.17505C5.60154 5.17505 5.45327 5.23647 5.34395 5.34578C5.23464 5.4551 5.17322 5.60337 5.17322 5.75797C5.17322 6.03893 5.38249 6.24878 5.64655 6.30474L5.30088 7.98005C5.16564 8.65681 5.64946 9.25547 6.33847 9.25547H6.92139C7.07599 9.25547 7.22425 9.19406 7.33357 9.08474C7.44289 8.97542 7.50431 8.82715 7.50431 8.67255C7.50431 8.51795 7.44289 8.36969 7.33357 8.26037C7.22425 8.15105 7.07599 8.08964 6.92139 8.08964H6.46671L6.9039 5.86756C6.92146 5.78366 6.92004 5.6969 6.89973 5.61363C6.87942 5.53036 6.84075 5.45268 6.78654 5.38629C6.73233 5.3199 6.66396 5.26647 6.58643 5.22992C6.5089 5.19337 6.42418 5.17462 6.33847 5.17505H5.75614Z" fill="black" fill-opacity="0.34"/>
                                        </svg>
                                    </IconButton>
                                    </Tooltip>

                                </p>
                            </div>
                            <FormControl sx={{ width: '18rem', marginBottom: '1rem'}}>
                                <StyledSelect
                                    defaultValue=""
                                    displayEmpty
                                    IconComponent={KeyboardArrowDownIcon}
                                    sx={{paddingLeft: '0.75rem'}}
                                    input={
                                    <OutlinedInput
                                        startAdornment={
                                        <InputAdornment position="start">
                                            <LocationIcon />
                                        </InputAdornment>
                                        }
                                    />
                                    }
                                    renderValue={(selected) => {
                                    return selected ? selected : <span style={{ color: '#999' }}>Search locations</span>;
                                    }}
                                >
                                    <MenuItem value="new_york">New York</MenuItem>
                                    <MenuItem value="los_angeles">Los Angeles</MenuItem>
                                    <MenuItem value="chicago">Chicago</MenuItem>
                                </StyledSelect>
                            </FormControl>
                            <Stack direction="row" spacing={2}>
                                <Chip label="Lahore Fort" sx={{ borderRadius: "8px", fontWeight: 500 }}  variant="outlined" />
                            </Stack>
{/*                             
                            <BasicInput
                                value={selectedLocation}
                                onClick={() => setPostLocationsPopup(true)}
                                placeholder="Search location"
                                endAdornment={
                                    <img
                                        src={downArrow}
                                        alt=""
                                        className={`cursor-pointer transition-all duration-200 transform -rotate-90`}
                                    />
                                }
                            /> */}
                        </div>
                    </div>

                    <p className="text-start text-base pt-2 font-semibold leading-[1.5rem] text-custom-dark-222">Settings</p>

                    <div className='bg-white p-3 rounded-md shadow-sm'>
                    <div className="text-left mb-2">
                        <FormControl>
                                <p className="text-sm font-medium text-custom-dark-222 leading-[1.7rem]">
                                    When to post
                                </p>
                                <RadioGroup
                                    row
                                    value={postTimeOption}
                                    onChange={(e) => setPostTimeOption(e.target.value)}
                                    name="when-to-post"
                                >
                                    <FormControlLabel
                                        name="when-to-post1"
                                        value="now"
                                        onClick={() => setShowSchedule(false)}
                                        control={<Radio sx={{ color: '#FF2C55', '&.Mui-checked': { color: '#FF2C55' } }} />}
                                        label="Now"
                                    />
                                    <FormControlLabel
                                        name="when-to-post1"
                                        value="schedule"
                                        onClick={handleAllowSchedule}                                        
                                        control={<Radio sx={{ color: '#ccc', '&.Mui-checked': { color: '#FF2C55' } }} />}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                Schedule
                                                <Tooltip title="Set a time to publish later">
                                                    <IconButton size="small">{/* your icon */}</IconButton>
                                                </Tooltip>
                                            </Box>
                                        }
                                    />
                                </RadioGroup>

                        </FormControl>

                        {/* Schedule Section */}
                        {showSchedule && (
                            <div className='flex gap-2'>
                            <input
                                type="time"
                                value={time}
                                onChange={handleTimeChange}
                                className="w-auto p-2 h-10 border bg-transparent  border-gray-300 rounded-md mt-2 cursor-pointer hover:border-gray-400"
                            />
                            <input
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                className="w-auto p-2 h-10 border bg-transparent border-gray-300 rounded-md mt-2 cursor-pointer hover:border-gray-400"
                            />
                            </div>
                        )}

                        {/* Permission Popup */}
                        <Dialog
                            open={permissionDialogOpen}
                            onClose={handleDenySchedule}
                        >
                            <DialogTitle>Enable Scheduling</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Scheduling posts requires permission. Would you like to allow it?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button sx={{backgroundColor: 'lightgray', color: '#000', width: '6rem'}} onClick={handleDenySchedule}>Cancel</Button>
                            <Button sx={{backgroundColor: '#ff3b5c',width: '6rem'}}  onClick={handleAllowSchedule} variant="contained" >
                                Allow
                            </Button>
                            </DialogActions>
                        </Dialog>
                        </div>
                        <div className='text-left mb-2'>
                        <FormControl fullWidth>
                            <p className="text-sm font-medium pb-2 text-custom-dark-222 leading-[1.7rem]">
                                Who can watch this video
                            </p>
                            <Select
                                    value={canView}
                                    onChange={handleCanViewChange}
                                    IconComponent={KeyboardArrowDownIcon}
                                    renderValue={(selected) => {
                                    const selectedOption = options.find(opt => opt.value === selected);
                                    return selectedOption?.label || '';
                                    }}
                                    sx={{
                                    width: '15rem',
                                    backgroundColor: '#f3f3f3',
                                    borderRadius: 2,
                                    height: 48,
                                    boxShadow: 'none',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '.MuiSelect-icon': {
                                        color: '#000',
                                        right: 12,
                                    },
                                    }}
                                >
                                    {options.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                        sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>{option.label}</span>
                                        {canView === option.value && <CheckIcon fontSize="small" />}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-[100%] flex flex-col gap-[0.5rem]">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-sm font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Allow users to:
                                </p>
                            </div>
                            <div className="flex gap-10">
                                <div className="flex gap-2 items-center">
                                    <BasicCheckBox
                                        onChange={(e: any) =>
                                            updateState('replyOnComment', e?.target?.checked)
                                        }
                                        checked={state?.replyOnComment}
                                    />
                                    <p className="text-xs font-medium text-custom-dark-222 leading-[1.1rem]">
                                        Comment
                                    </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <BasicCheckBox
                                        onChange={(e: any) =>
                                            updateState('allowDuet', e?.target?.checked)
                                        }
                                        checked={state?.allowDuet}
                                    />
                                    <p className="text-xs font-medium text-custom-dark-222 leading-[1.1rem]">
                                        Duet
                                    </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <BasicCheckBox
                                        onChange={(e: any) =>
                                            updateState('allowStitch', e?.target?.checked)
                                        }
                                        checked={state?.allowStitch || false}
                                    />
                                    <p className="text-xs font-medium text-custom-dark-222 leading-[1.1rem]">
                                        Stitch
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center pt-3 gap-[1.5rem]">
                            <p className="text-[13px] font-medium text-custom-dark-222 leading-[1.7rem]">
                                Save video to device
                            </p>
                            <BasicSwitch
                                checked={state?.saveToPhone || false}
                                onChange={(e: any) => updateState('saveToPhone', e?.target?.checked)}
                            />
                        </div>
                        <div className="flex justify-start items-center pt-3 gap-[1.5rem]">
                            <p className="text-[13px] font-medium text-custom-dark-222 leading-[1.7rem]">
                                Private Video
                            </p>
                            <BasicSwitch
                                checked={state?.isOnlyMe || false}
                                onChange={(e: any) => updateState('isOnlyMe', e?.target?.checked)}
                            />
                        </div>
                        <div className="flex flex-col items-start justify-between">
                            <div className="flex justify-start items-center pt-3 gap-[1.5rem]">
                                <p className="text-[13px] font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Video downloads
                                </p>
                                <BasicSwitch
                                    checked={state?.allowDownload || false}
                                    onChange={(e: any) =>
                                        updateState('allowDownload', e?.target?.checked)
                                    }
                                />
                            </div>
                            <p className="text-xs text-custom-color-999 leading-[1.1rem] text-start">
                                Allow other people to download your videos and share to other platforms.
                                If this setting is off, a link to your video can still be shared.
                            </p>
                        </div>
                    </div>


                    <p className="text-start text-base pt-2 font-semibold leading-[1.5rem] text-custom-dark-222">Checks</p>

                    <div className='bg-white p-3 rounded-md shadow-sm'>                        
                        <div className="flex flex-col items-start justify-between">
                            <div className="flex justify-start items-center gap-[1rem]">
                                <p className="text-xs font-medium flex text-custom-dark-222 leading-[1.7rem]">
                                    Run a copyright check 
                                    <svg className='ml-1' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.989" d="M6.33905 0.511719C3.11961 0.511719 0.509888 3.12144 0.509888 6.34089C0.509888 9.56033 3.11961 12.1701 6.33905 12.1701C9.5585 12.1701 12.1682 9.56033 12.1682 6.34089C12.1682 3.12144 9.5585 0.511719 6.33905 0.511719ZM6.33905 1.67755C7.57585 1.67755 8.76198 2.16887 9.63653 3.04341C10.5111 3.91796 11.0024 5.10409 11.0024 6.34089C11.0024 7.57768 10.5111 8.76382 9.63653 9.63836C8.76198 10.5129 7.57585 11.0042 6.33905 11.0042C5.10226 11.0042 3.91612 10.5129 3.04158 9.63836C2.16704 8.76382 1.67572 7.57768 1.67572 6.34089C1.67572 5.10409 2.16704 3.91796 3.04158 3.04341C3.91612 2.16887 5.10226 1.67755 6.33905 1.67755ZM6.33905 3.4263C6.18446 3.4263 6.03619 3.48772 5.92687 3.59703C5.81755 3.70635 5.75614 3.85462 5.75614 4.00922C5.75614 4.16382 5.81755 4.31208 5.92687 4.4214C6.03619 4.53072 6.18446 4.59214 6.33905 4.59214C6.49365 4.59214 6.64192 4.53072 6.75124 4.4214C6.86056 4.31208 6.92197 4.16382 6.92197 4.00922C6.92197 3.85462 6.86056 3.70635 6.75124 3.59703C6.64192 3.48772 6.49365 3.4263 6.33905 3.4263ZM5.75614 5.17505C5.60154 5.17505 5.45327 5.23647 5.34395 5.34578C5.23464 5.4551 5.17322 5.60337 5.17322 5.75797C5.17322 6.03893 5.38249 6.24878 5.64655 6.30474L5.30088 7.98005C5.16564 8.65681 5.64946 9.25547 6.33847 9.25547H6.92139C7.07599 9.25547 7.22425 9.19406 7.33357 9.08474C7.44289 8.97542 7.50431 8.82715 7.50431 8.67255C7.50431 8.51795 7.44289 8.36969 7.33357 8.26037C7.22425 8.15105 7.07599 8.08964 6.92139 8.08964H6.46671L6.9039 5.86756C6.92146 5.78366 6.92004 5.6969 6.89973 5.61363C6.87942 5.53036 6.84075 5.45268 6.78654 5.38629C6.73233 5.3199 6.66396 5.26647 6.58643 5.22992C6.5089 5.19337 6.42418 5.17462 6.33847 5.17505H5.75614Z" fill="black" fill-opacity="0.34"/>
                                    </svg>
                                </p>
                                <BasicSwitch
                                    checked={state?.copyRightCheck || false}
                                    onChange={(e: any) =>
                                        updateState('copyRightCheck', e?.target?.checked)
                                    }
                                />
                            </div>

                            {showChecking && (
                                <div className='p-2 mt-2 rounded-sm bg-[#0000000D] text-xs'>
                                    Checking in progress. This will take about 1 minute.
                                </div>
                            )}

                            {showResult && (
                                <div className='p-2 mt-2 rounded-sm bg-[#E1FBF3] flex text-xs'>
                                    No issue detected 
                                    <svg className='pl-1' width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.11768 4.41146L4.45101 7.74479L11.1177 1.07812" stroke="#1B959D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* <div className="flex justify-start items-center gap-[1rem]">
                        <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                            Allow Others to Add to Story
                        </p>
                        <BasicSwitch
                            checked={state?.allowAddStory || false}
                            onChange={(e: any) => updateState('allowAddStory', e?.target?.checked)}
                        />
                    </div> */}
                    <div className="flex gap-[1rem]">
                    <CustomButton
                            rounded="16px"
                            textSize="16px "
                            width="169px !important"
                            height="40px !important"
                            text="Post" //{videoInfo ? 'Update' : 'Post'}
                            onClick={SubmitHandler}
                            loading={isPosting}
                        />
                        {/* <CustomButton
                            width="169px !important"
                            textSize="16px "
                            islight
                            backgroundColor='#0000000D'
                            border='0'
                            color="black"
                            text="Save draft"
                            height="40px !important"
                            onClick={() => setDiscardPostPopup(true)}
                        /> */}
                        <CustomButton
                            width="100px !important"
                            textSize="16px "
                            islight
                            backgroundColor='#0000000D'
                            border='0'
                            color="black"
                            text="Discard"
                            height="40px !important"
                            onClick={() => setDiscardPostPopup(true)}
                        />
                        
                    </div>
                </div>
            </div>
            <CustomPopup
                open={discardPostPopup}
                title="Discard this post?"
                description="The video and all edits will be discarded."
                primaryBtnText="Discard"
                btnText="Continue editing"
                onClose={() => setDiscardPostPopup(false)}
                onPrimaryBtnClick={() => { setDiscardPostPopup(false); dispatch(setSelectedFile({ file: null }))} }
                onBtnClick={() => setDiscardPostPopup(false)}
            />
            {/* Search Locations Popup*/}
            <CustomModel open={postLocationsPopup} onClose={() => setPostLocationsPopup(false)}>
                <div className="bg-custom-light p-[2rem] rounded-[8px] w-[570px]">
                    <div className="mb-[1rem]">
                        <BasicInput
                            autoFocus
                            onChange={filterCountries}
                            startAdornment={
                                <img className="w-[1.5rem] h-[1.5rem]" src={search} alt="" />
                            }
                            placeholder="Search"
                        />
                    </div>
                    <div className="flex flex-col h-[60vh] overflow-y-scroll gap-2">
                        {filteredCountries.map((country: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col justify-between gap-[0.5rem] hover:bg-custom-gray-400 cursor-pointer"
                                    onClick={() => {
                                        updateState('place', country?.name);
                                        setSelectedLocation(country?.name);
                                        setPostLocationsPopup(false);
                                    }}
                                >
                                    <Text fontWeight={400} lineHeight="24px" text={country?.name} />
                                    {/* <Text
                                        fontSize="12px"
                                        fontWeight={400}
                                        lineHeight="15px"
                                        color="#6B6B6B"
                                        text="Alexandria, Egypt"
                                    /> */}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CustomModel>

            {/* Tag Users Popup */}
            <CustomModel open={tagUsersPopup} onClose={() => setTagUsersPopup(false)}>
                <div className="bg-custom-light p-[2rem] rounded-[8px] w-[570px]">
                    <div className="mb-[1rem]">
                        <BasicInput
                            autoFocus
                            onChange={filterFollowers}
                            startAdornment={
                                <img className="w-[1.5rem] h-[1.5rem]" src={search} alt="" />
                            }
                            placeholder="Search"
                        />
                    </div>
                    <div
                        className="flex flex-col h-[60vh] overflow-y-scroll no-scrollbar"
                        id="taggedUsersScrollableDiv"
                    >
                        <InfiniteScroll
                            dataLength={filteredFollowers?.length}
                            next={loadMoreFollowers}
                            hasMore={filteredFollowers.length < totalFollowers || totalFollowers === null}
                            loader={
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '1rem',
                                        width: 'inherit',
                                    }}
                                >
                                    <CircularProgress />
                                </div>
                            }
                            className="mb-20"
                            // scrollThreshold={0.6}
                            scrollableTarget="taggedUsersScrollableDiv"
                            endMessage={
                                <div className="flex flex-row justify-center items-center mt-3">
                                    <p className="font-bold text-xl">
                                        {totalFollowers === 0 && 'No followers available.'}
                                    </p>
                                </div>
                            }
                        >
                            {filteredFollowers.map((follower: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex py-[1rem] items-center gap-3 hover:bg-custom-gray-400 cursor-pointer"
                                        onClick={() => {
                                            const isAlreadyTagged = taggedUsers.some((user)=>user._id===follower?.follower_userID?._id);
                                           if(!isAlreadyTagged) setTaggedUser([
                                                ...taggedUsers,
                                                {
                                                    name: follower?.follower_userID?.name,
                                                    _id: follower?.follower_userID?._id,
                                                    id: taggedUsers?.length || 0,
                                                },
                                            ]);
                                            setTagUsersPopup(false);
                                        }}
                                    >
                                        <img
                                            className="w-[48px] h-[48px] rounded-[50%]"
                                            src={follower?.follower_userID?.avatar || defaultAvatar}
                                            alt=""
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                            }}
                                        />
                                        <Text
                                            fontWeight={500}
                                            lineHeight="20px"
                                            text={follower?.follower_userID?.name}
                                        />
                                    </div>
                                );
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
            </CustomModel>
            {/* <CustomPopup
                open={leaveSitePopup}
                title="Leave site?"
                description="Changes you made may not be saved."
                primaryBtnText="Leave"
                btnText="Cancel"
                onClose={() => setLeaveSitePopup(false)}
                onBtnClick={() => setLeaveSitePopup(false)}
                onPrimaryBtnClick={() => setLeaveSitePopup(false)}
            />
            <CustomPopup
                open={cancelPostPopup}
                title="Are you sure you want to cancel?"
                primaryBtnText="Yes, start over"
                btnText="Continue uploading"
                onClose={() => setCancelPostPopup(false)}
                onBtnClick={() => setCancelPostPopup(false)}
                // onPrimaryBtnClick={}
            /> */}
        </div>
    );
}

export default FormRightSide;
