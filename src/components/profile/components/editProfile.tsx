import { Avatar, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAvatar } from '../../../icons';
import { getProfileData } from '../../../redux/AsyncFuncs';
import { showToast } from '../../../utils/constants';
import EditProfileIcon from '../svg-components/EditProfileIcon';
import styles from './editProfile.module.scss';
import SelectProfileImgPopup from './select-profile-img';

interface Props {
    onCancel: () => void;
    onSave: () => void;
}

export default function EditProfile({ onCancel, onSave }: Props) {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('Passionate about art, life, and nature.');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const API_KEY = process.env.VITE_API_URL;
    const [year, setYear] = useState('');
    const [profileData, setProfileData] = useState<any>(null);
    const [mediaCategories, setMediaCategories] = useState<any>([]);
    const [countries, setCountries] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [newProfileImg, setNewProfileImg] = useState('');
    const [selectImagePopup, setSelectImagePopup] = useState(false);
    const [userSelectedCategory, setUserSelectedCategory] = useState('');

    const [fileObj, setFileObj] = useState<any>(null);
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const dispatch = useDispatch();

    const profileImg = useSelector((state: any) => state?.reducers?.profile?.avatar);
    const [imgBase64, setImgBase64] = useState(profileImg || defaultAvatar);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        try {
            let updatedProfileData: any = {
                name,
                bio,
                birthday: `${month}-${day}-${year}`,
                countries,
                contactEmail: email,
                website,
                businessCategory: category,
            };

            // const formData = new FormData();

            // // Append other fields to the FormData object
            // formData.append('name', name);
            // formData.append('bio', bio);
            // formData.append('birthday', `${month}-${day}-${year}`);
            // formData.append('countries', countries);
            // formData.append('website', website);
            // formData.append('businessCategory', category);

            // Send the PATCH request with FormData
            fetch(`${API_KEY}/profile/`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify(updatedProfileData),
            })
                .then((res) => res.json())
                .then((res) => {
                    dispatch(getProfileData());
                    showToast('Profile Updated Successfully!');
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
        onSave();
    };

    const chooseNewProfileImg = () => {
        setSelectImagePopup(true);
    };

    const onProfileImageCancel = () => {
        setSelectImagePopup(false);
    };

    const onProfileImageSelect = (img: any) => {
        setImgBase64(img);

        uploadBase64Image(img).then((file) => {
            setFileObj(file);
        });

        setSelectImagePopup(false);
    };

    useEffect(() => {
        loadProfile();
        loadCountries();
        loadMediaCategories();
    }, []);

    const loadProfile = () => {
        setLoading(true);
        try {
            fetch(`${API_KEY}/profile`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    let response = data?.data;
                    setProfileData(response);
                    setUsername(response?.username);
                    setName(response?.name);
                    setBio(response?.bio);
                    setEmail(response?.email);
                    setWebsite(response?.website);
                    setAvatar(response?.avatar);
                    setYear(response?.dateOfBirth?.slice(0, 4));
                    setMonth(response?.dateOfBirth?.slice(5, 7));
                    setDay(response?.dateOfBirth?.slice(8, 10));
                    setUserSelectedCategory(
                        response?.businessCategory !== null && response?.businessCategory !== ''
                            ? response?.businessCategory
                            : '-- Select an option --'
                    );
                    setCountry(
                        response?.country !== null && response?.country !== ''
                            ? response?.country
                            : '-- Select an option --'
                    );
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

    const loadMediaCategories = () => {
        setLoading(true);
        try {
            fetch(`${API_KEY}/media-content/categories`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    let response = data?.data;
                    const mediaCategoryList = response?.map((mediaItem: { name: string }) => {
                        const name = mediaItem?.name;
                        return {
                            name,
                        };
                    });
                    setMediaCategories(mediaCategoryList);
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

    const onResetField = (name: string) => {
        switch (name) {
            case 'category':
                setCategory('');
                break;
            case 'day':
                setDay('');
                break;
            case 'month':
                setMonth('');
                break;
            case 'year':
                setYear('');
                break;
            case 'countries':
                setCountries([]);
                break;
        }
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
    return (
        <>
            <form onSubmit={handleSubmit}>
                {loading && <CircularProgress />}
                {!loading && (
                    <div className={styles.div}>
                        <div className={styles['div-2']}>Edit Profile</div>
                        <div className={styles.profileBox}>
                            <Avatar
                                alt="Remy Sharp"
                                src={imgBase64 != '' ? imgBase64 : profileImg}
                                // src="https://thumbs.dreamstime.com/b/pink-dahlia-flower-details-macro-photo-border-frame-wide-banner-background-message-wedding-background-pink-dahlia-flower-117406512.jpg"
                                className={styles.img}
                            />
                            <div onClick={chooseNewProfileImg} className={styles.editIcon}>
                                <EditProfileIcon />
                            </div>
                        </div>
                        <div className={styles['div-3']}>Username</div>
                        <input
                            disabled
                            placeholder=""
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className={styles['div-5']}>
                            Usernames can only contain letters, numbers, underscores, and periods.
                            Changing your username will also change your profile link.
                        </div>
                        <div className={styles['div-6']}>Name</div>
                        <input
                            className={styles['input-2']}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className={styles['div-9']}>
                            Your nickname can only be changed once every 7 days.
                        </div>
                        <div className={styles['div-10']}>Bio</div>
                        <textarea
                            className={styles.textarea}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <div className={styles['div-11']}>{bio.length}/80</div>
                        <div className={styles['div-12']}>Business Phone number</div>
                        <input
                            className={styles['input-3']}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <div className={styles['div-13']}>Email</div>
                        <input
                            disabled
                            type="email"
                            className={styles['input-4']}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className={styles['div-14']}>Website</div>
                        <input
                            className={styles['input-5']}
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                        <div className={styles['div-15']}>Category</div>
                        <select
                            className={styles.select}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value={'default'}>{userSelectedCategory}</option>
                            {mediaCategories.map((category: { name: string }, index: number) => (
                                <option key={index} className={styles['div-16']}>
                                    {category?.name}
                                </option>
                            ))}
                        </select>
                        <div className={styles['div-17']}>Birth Date</div>
                        <div className={styles['div-18']}>
                            <div className={styles['div-19']}>
                                <input
                                    placeholder="DD"
                                    className={styles['div-20']}
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    maxLength={2}
                                />
                                <img
                                    loading="lazy"
                                    src="/images/icons/cross-icon.svg"
                                    className={styles['img-5']}
                                    onClick={() => onResetField('day')}
                                />
                            </div>
                            <div className={styles['div-21']}>
                                <input
                                    placeholder="MM"
                                    className={styles['div-22']}
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    maxLength={2}
                                />
                                <img
                                    src="/images/icons/cross-icon.svg"
                                    loading="lazy"
                                    className={styles['img-6']}
                                    onClick={() => onResetField('month')}
                                />
                            </div>
                            <div className={styles['div-23']}>
                                <input
                                    placeholder="YYYY"
                                    className={styles['div-24']}
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    maxLength={4}
                                />
                                <img
                                    src="/images/icons/cross-icon.svg"
                                    loading="lazy"
                                    className={styles['img-7']}
                                    onClick={() => onResetField('year')}
                                />
                            </div>
                        </div>
                        <div className={styles['div-25']}>Country</div>
                        <select
                            className={styles.select}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value={'default'}>{country}</option>
                            {countries?.map(
                                (country: { name: string; code: string }, index: number) => (
                                    <option key={index} className={styles['div-16']}>
                                        {country?.name}
                                    </option>
                                )
                            )}
                        </select>
                        <div className={styles['div-27']}>
                            <div onClick={onCancel} className={styles['div-28']}>
                                Cancel
                            </div>
                            <button type="submit" className="bg-[#5448B2] text-white">
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </form>
            {selectImagePopup ? (
                <SelectProfileImgPopup
                    onCancel={onProfileImageCancel}
                    open={selectImagePopup}
                    onSelect={onProfileImageSelect}
                />
            ) : (
                ''
            )}
        </>
    );
}
