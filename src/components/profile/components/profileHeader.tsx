import { Avatar } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../../../redux/AsyncFuncs';
import COPY_AND_SEND_MENU from '../../../shared/Menu/copyAndSend';
import { useAuthStore } from '../../../store/authStore';
import AddIcon from '../svg-components/AddIcon';
import EditButtonIcon from '../svg-components/EditButtonIcon';
import EditIcon from '../svg-components/EditIcon';
import MailIcon from '../svg-components/MailIcon';
import ProfileViewIcon from '../svg-components/ProfileViewIcon';
import ShareIcon from '../svg-components/ShareIcon';
import link from '../svg-components/link-icon.png';
import CoverImagePopup from './cover-img-popup';
import CreateStoryPopup from './createStoryPopup';
import styles from './profileHeader.module.scss';

interface Props {
    setProfileModal: (value: boolean) => void;
    setLikesModal: (value: boolean) => void;
    onFollowModalActive: (value: string) => void;
    profileData: any;
    showStory: any;
    copyHandler: any;
    onProfileEdit: any;
}

const ProfileHeader: FunctionComponent<Props> = ({
    setProfileModal,
    onFollowModalActive,
    setLikesModal,
    profileData,
    showStory,
    copyHandler,
    onProfileEdit,
}) => {
    const API_KEY = process.env.VITE_API_URL;
    const [stories, setStories] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [websiteLink, setWebsiteLink] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const navigate = useNavigate();

    // const token = useAuthStore((state) => state.token);
    const auth = useAuthStore((state) => state._id);
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    const [selectImagePopup, setSelectImagePopup] = useState(false);
    const [addStoryPopup, setAddStoryPopup] = useState<boolean>(false);

    let localProfile = null;
    const dispatch = useDispatch();
    const profileImg = useSelector((state: any) => state?.reducers?.profile?.avatar);
    const name = useSelector((state: any) => state?.reducers?.profile?.name);
    const coverImg = useSelector((state: any) => state?.reducers?.profile?.cover);
    const [imgBase64, setImgBase64] = useState(coverImg);
    try {
        const profileFromStorage = localStorage.getItem('profile');
        if (profileFromStorage) {
            localProfile = JSON.parse(profileFromStorage);
        }
    } catch (error: any) {
        console.error('Error parsing JSON from localStorage:', error?.message);
    }

    const chooseNewCoverImg = () => {
        setSelectImagePopup(true);
    };

    const onCoverImageCancel = () => {
        setSelectImagePopup(false);
    };

    const onCoverImageSelect = (img: any) => {
        setImgBase64(img);

        uploadBase64Image(img).then((file) => {
            handleCoverImageRequest(file);
        });
        setSelectImagePopup(false);
    };

    const uploadBase64Image = async (base64Url: string) => {
        try {
            // Fetch the base64 image data
            const res = await fetch(base64Url);
            const blob = await res.blob();

            // Create a FormData object and append the image file
            const fd = new FormData();
            const file = new File([blob], 'filename.jpeg');
            fd.append('image', file);

            console.log('base64 to file');
            console.log(file);
            return file;
        } catch (error) {
            console.error('Error fetching base64 image:', error);
        }
    };

    const handleCoverImageRequest = (file: any) => {
        try {
            const formData = new FormData();

            // Append other fields to the FormData object

            if (file != null) {
                formData.append('cover', file);
            }

            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            // Send the PATCH request with FormData
            fetch(`${API_KEY}/profile`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            })
                .then((res) => res.json())
                .catch((err) => {
                    console.log(err);
                });

            dispatch(getProfileData());
        } catch (error) {
            console.log(error);
        }
    };

    const addStory = () => {
        setAddStoryPopup(true);
        console.log('add story');
    };

    const loadProfile = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/`, {
                method: 'GET',
                // add bearer token to heders
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const { data } = await response.json();
                console.log('DATA UPDATED', data);
                setWebsiteLink(data?.website);
                setBio(data?.bio);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error();
        }
    };

    useEffect(() => {
        loadProfile();
        fetch(`${API_KEY}/media-content/stories/feed`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setStories(data.data[0].stories);
                console.log('stories', stories);
            })
            .catch((err) => {
                console.log('collectons error', err);
            });
    }, []);

    useEffect(() => {
        console.log('OnProfile Edit : ');
        loadProfile();
    }, [onProfileEdit]);

    const totalFollowers = useSelector((state: any) => {
        console.log('state in total followers in profile header');
        console.log(state);
        return state.reducers?.followers.total;
    });
    const totalFollwing = useSelector((state: any) => state?.reducers?.followings?.total);
    const totalLikes = useSelector((state: any) => state?.reducers?.profile?.likesNum);

    return (
        <>
            {selectImagePopup ? (
                <CoverImagePopup
                    onCancel={onCoverImageCancel}
                    open={selectImagePopup}
                    onSelect={onCoverImageSelect}
                />
            ) : (
                ''
            )}
            {addStoryPopup ? (
                <CreateStoryPopup
                    onCancel={() => setAddStoryPopup(false)}
                    open={addStoryPopup}
                    onSelect={() => {
                        setAddStoryPopup(false);
                        navigate('/create-story');
                    }}
                />
            ) : (
                ''
            )}

            <div className={styles.profileHeader}>
                <div className={styles.banner}>
                    <div onClick={chooseNewCoverImg} className={styles.banerIcon}>
                        <EditIcon />
                    </div>
                    {imgBase64 != '' && (
                        <img
                            className={styles.bannerImg}
                            src={imgBase64 != '' ? imgBase64 : coverImg}
                            alt="Banner Img"
                        />
                    )}
                </div>
                <div className={styles.bottomContainer}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                            onClick={() => {
                                if (stories?.length > 0) {
                                    showStory();
                                }
                            }}
                            className={stories?.length > 0 ? styles.avatarBox2 : styles.avatarBox}
                        >
                            <Avatar
                                style={{ width: '100%', height: '100%' }}
                                src={profileImg ? profileImg : Avatar}
                                alt={profileData?.name}
                            />
                        </div>
                        <span className={styles.addStoryIcon} onClick={addStory}>
                            <AddIcon />
                        </span>
                    </div>

                    <button
                        style={{
                            position: 'relative',
                        }}
                        className={styles.button}
                    >
                        <ShareIcon />
                        Share
                        <COPY_AND_SEND_MENU copyHandler={copyHandler} />
                    </button>
                </div>
                <div className={styles.pfContent}>
                    <div className={styles.userInfo}>
                        <p className={styles.boldText}>{profileData?.username}</p>
                        <p className={styles.text}>{name}</p>
                    </div>
                    <div className={styles.userStats}>
                        <div
                            onClick={() => onFollowModalActive('following')}
                            className={styles.statContainer}
                        >
                            <p className={styles.boldText}>{profileData?.following ?? 0}</p>
                            <p className={styles.text}>Following</p>
                        </div>
                        <div
                            onClick={() => onFollowModalActive('followers')}
                            className={styles.statContainer}
                        >
                            <p className={styles.boldText}>{profileData?.followers ?? 0}</p>
                            <p className={styles.text}>Followers</p>
                        </div>
                        <div onClick={() => setLikesModal(true)} className={styles.statContainer}>
                            <p className={styles.boldText}> {profileData?.likesNum ?? 0}</p>
                            <p className={styles.text}>Likes</p>
                        </div>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.linkContainer}>
                            <img
                                src={link}
                                className="object-contain"
                                width={16.67}
                                height={16.67}
                            />
                            <p className={styles.link}>{websiteLink}</p>
                        </div>
                        /
                        <a className={styles.linkContainer} href={`mailto:${profileData?.email}`}>
                            <MailIcon />
                            <p className={styles.link}>{profileData?.email}</p>
                        </a>
                    </div>
                    <p className={styles.about}>{bio}</p>
                    <div className={styles.actions}>
                        <button onClick={() => setProfileModal(true)} className={styles.button}>
                            <EditButtonIcon />
                            Edit Profile
                        </button>
                        <button className={styles.button2}>
                            <ProfileViewIcon />
                            Profile Views
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileHeader;
