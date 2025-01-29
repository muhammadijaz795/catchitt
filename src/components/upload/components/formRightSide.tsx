import { CircularProgress, SvgIcon } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
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
import DndContainer from './DndContainer';
import CloseIcon from '@mui/icons-material/Close';
import { message } from 'antd';
import { useUpdateEffect } from 'react-use';

function FormRightSide(props: any) {
    const {
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

    const dispatch = useDispatch();

    const loadMoreFollowers = () => {
        dispatch(loadFollowers(followersPage));
        // Fetch more data for the next page
    };

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
        if (e.target.value.length <= 2200) {
            updateState('description', e.target.value);
        }
    }

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

    useUpdateEffect(() => {
        setFilteredCountries(countries);
    }, [postLocationsPopup]);

    useUpdateEffect(()=>{
        setFilteredFollowers(followers)
    },[tagUsersPopup])
    return (
        <div className="flex-[1.7] flex flex-col mt-[8rem] items-start pl-[2.5rem] md:pl-0 pr-[2.5rem]">
            <div className="w-[100%]">
                <div className="w-[100%] flex flex-col gap-[2rem] pb-[2rem]">
                    <div className="w-[100%] flex flex-col gap-[1rem] relative">
                        <div className="flex justify-between w-[100%]">
                            <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                Caption
                            </p>
                            <p className="text-[1rem] font-medium text-custom-color-999 leading-[1.1rem]">
                                {state?.description?.length || 0}/2200
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
                        <textarea value={state?.description || ''} onChange={handleDescriptionChange} id="message" name="message" className="w-full bg-transparent rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                        <p className="text-gray-500 leading-[1.5rem] text-[1rem] font-normal absolute right-4 bottom-1">
                            # @
                        </p>
                    </div>
                    <div className="w-[100%] flex flex-col gap-1.5">
                        <div className="w-full flex items-center justify-start gap-2.5 no-underline list-none h-[46px] cursor-pointer">
                            <Tab
                                onClick={() => setCoverTab('suggestion')}
                                className={`${styles.coverTab} 
                                    ${coverTab === 'suggestion'
                                        ? `${styles.coverTabSelected} text-[var(--primary-color)]`
                                        : ''
                                    } 
                                    leading-[1.7rem] text-[1.125rem] font-medium
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
                                    leading-[1.7rem] text-[1.125rem] font-medium
                                `}
                            >
                                Upload cover
                            </Tab>
                        </div>
                        {coverTab === 'suggestion' && (
                            <>
                                {videoThumbnails?.length > 0 ? (
                                    <div className="flex  overflow-x-auto px-[10px] justify-start  rounded-[5px] bg-[var(--secondaty-color)] left-0 gap-[1px] h-[285px] pt-[10px] slider-container">
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
                        )}
                        {coverTab === 'custom' && !customCover && (
                            <div className="w-full h-[285px]">
                                <DndContainer
                                    aspect={62 / 127}
                                    modalTitle="Crop cover"
                                    onChangeFile={(file: File) => {
                                        if (!/\.(jpg|jpeg|png|webp)$/i.test(file.name)) {
                                            message.error('You can only upload supported file!');
                                            return;
                                        }
                                        const reader = new FileReader();
                                        reader.onload = (e: any) => {
                                            setCustomCover(e.target.result);
                                            updateState('thumbnailUrl', e.target.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                    crop
                                    subtitle="Suported formats: JPG, JPEG, PNG, WEBP"
                                />
                            </div>
                        )}
                        {coverTab === 'custom' && customCover && (
                            <div className="flex px-[10px] justify-start  rounded-[5px] bg-[var(--secondaty-color)] left-0 gap-[1px] h-[285px] pt-[10px] slider-container">
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
                    <div className="w-[100%] flex flex-col gap-[1rem]">
                        <div className="flex justify-between w-[100%]">
                            <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
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
                    <div className="max-w-[100%] flex flex-col gap-[1rem]">
                        <div className="flex justify-between w-[100%]">
                            <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
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
                    </div>
                    <div className="w-[100%] flex flex-col gap-[1rem]">
                        <div className="flex justify-between w-[100%]">
                            <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                {/* {videoInfo ? 'Edit' : 'Add'} location */} Add Location
                            </p>
                        </div>
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
                        />
                    </div>
                    <div className="w-[100%] flex flex-col gap-[1rem]">
                        <div className="flex justify-between w-[100%]">
                            <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                Allow users to:
                            </p>
                        </div>
                        <div className="flex gap-10">
                            <div className="flex gap-2 items-center">
                                <BasicCheckBox
                                    onChange={(e: any) =>
                                        updateState('replyOnComment', e?.target?.checked)
                                    }
                                    checked={state?.replyOnComment || true}
                                />
                                <p className="text-[1rem] font-medium text-custom-dark-222 leading-[1.1rem]">
                                    Comment
                                </p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <BasicCheckBox
                                    onChange={(e: any) =>
                                        updateState('allowDuet', e?.target?.checked)
                                    }
                                    checked={state?.allowDuet || true}
                                />
                                <p className="text-[1rem] font-medium text-custom-dark-222 leading-[1.1rem]">
                                    Duet
                                </p>
                            </div>
                            {/* <div className="flex gap-2 items-center">
                                <BasicCheckBox
                                    onChange={(e: any) =>
                                        updateState('allowStitch', e?.target?.checked)
                                    }
                                    checked={state?.allowStitch || false}
                                />
                                <p className="text-[1rem] font-medium text-custom-dark-222 leading-[1.1rem]">
                                    Stitch
                                </p>
                            </div> */}
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-[1rem]">
                        <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                            Save video to device
                        </p>
                        <BasicSwitch
                            checked={state?.saveToPhone || false}
                            onChange={(e: any) => updateState('saveToPhone', e?.target?.checked)}
                        />
                    </div>
                    <div className="flex justify-start items-center gap-[1rem]">
                        <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                            Private Video
                        </p>
                        <BasicSwitch
                            checked={state?.isOnlyMe || false}
                            onChange={(e: any) => updateState('isOnlyMe', e?.target?.checked)}
                        />
                    </div>
                    <div className="flex flex-col items-start justify-between">
                        <div className="flex justify-start items-center gap-[1rem]">
                            <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                Video downloads
                            </p>
                            <BasicSwitch
                                checked={state?.allowDownload || false}
                                onChange={(e: any) =>
                                    updateState('allowDownload', e?.target?.checked)
                                }
                            />
                        </div>
                        <p className="text-[1rem] font-medium text-custom-color-999 leading-[1.1rem] text-start">
                            Allow other people to download your videos and share to other platforms.
                            If this setting is off, a link to your video can still be shared.
                        </p>
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
                            width="169px !important"
                            textSize="16px "
                            islight
                            text="Discard"
                            height="48px !important"
                            onClick={() => setDiscardPostPopup(true)}
                        />
                        <CustomButton
                            textSize="16px "
                            width="169px !important"
                            height="48px !important"
                            text="Post" //{videoInfo ? 'Update' : 'Post'}
                            onClick={SubmitHandler}
                            loading={isPosting}
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
                onPrimaryBtnClick={() => setDiscardPostPopup(false)}
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
