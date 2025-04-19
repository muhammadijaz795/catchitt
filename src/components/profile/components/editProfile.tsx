import { Avatar, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCountryCode, chevronDown, defaultAvatar, search } from '../../../icons';
import { getProfileData } from '../../../redux/AsyncFuncs';
import { APP_TEXTS, END_POINTS, METHOD, showToast,showToastError } from '../../../utils/constants';

import EditProfileIcon from '../svg-components/EditProfileIcon';
import styles from './editProfile.module.scss';
import SelectProfileImgPopup from './select-profile-img';
import { getCountryPhoneLengthFromIso } from '../../../utils/helpers';

interface Props {
    onCancel: () => void;
    onSave: () => void;
}

export default function EditProfile({ onCancel, onSave }: Props) {

    const [birthDate, setBirthDate] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('Passionate about art, life, and nature.');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('');
    const API_KEY = process.env.VITE_API_URL;
    const [profileData, setProfileData] = useState<any>(null);
    const [mediaCategories, setMediaCategories] = useState<any>([]);
    const [countries, setCountries] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [newProfileImg, setNewProfileImg] = useState('');
    const [selectImagePopup, setSelectImagePopup] = useState(false);
    const [userSelectedCategory, setUserSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(-1);
    const [countryCode, setCountryCode] = useState<string>('');
    const [isoCode, setIsoCode] = useState<string>('');
    const [countryModelOpened, setCountryModelOpened] = useState<boolean>(false);
    const [countryCodes, setCountryCodes] = useState([]);


    const [fileObj, setFileObj] = useState<any>(null);
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const dispatch = useDispatch();

    const profileImg = useSelector((state: any) => state?.reducers?.profile?.avatar);
    const [imgBase64, setImgBase64] = useState(profileImg || defaultAvatar);

    const [darkTheme, setdarkTheme] = useState('');
    const [lightTheme, setlightTheme] = useState('bg-custom-light');

    const calenderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);
        }
    });

    const getMaxPhoneLength = (iso: string): number => {
            return getCountryPhoneLengthFromIso(iso); // Default to 10 if country not found
    };

    const getIsoValueFromCountryCode = (countryCode: any): string => {
        return countryPhoneCodes[countryCode] || '';
    };

    const countryPhoneCodes: Record<string, string> = {
        "+93": "af", "+355": "al", "+213": "dz", "+1684": "as", "+376": "ad",
        "+244": "ao", "+1264": "ai", "+1268": "ag", "+54": "ar", "+374": "am",
        "+297": "aw", "+61": "au", "+43": "at", "+994": "az", "+1242": "bs",
        "+973": "bh", "+880": "bd", "+1246": "bb", "+375": "by", "+32": "be",
        "+501": "bz", "+229": "bj", "+1441": "bm", "+975": "bt", "+591": "bo",
        "+387": "ba", "+267": "bw", "+55": "br", "+673": "bn", "+359": "bg",
        "+226": "bf", "+257": "bi", "+855": "kh", "+237": "cm",
        "+238": "cv", "+1345": "ky", "+236": "cf", "+235": "td", "+56": "cl",
        "+86": "cn", "+57": "co", "+269": "km", "+242": "cg", "+243": "cd",
        "+506": "cr", "+225": "ci", "+385": "hr", "+53": "cu", "+357": "cy",
        "+420": "cz", "+45": "dk", "+253": "dj", "+1767": "dm", "+1849": "do",
        "+593": "ec", "+20": "eg", "+503": "sv", "+240": "gq", "+291": "er",
        "+372": "ee", "+251": "et", "+679": "fj", "+358": "fi", "+33": "fr",
        "+241": "ga", "+220": "gm", "+995": "ge", "+49": "de", "+233": "gh",
        "+350": "gi", "+30": "gr", "+299": "gl", "+1473": "gd", "+1671": "gu",
        "+502": "gt", "+224": "gn", "+245": "gw", "+592": "gy", "+509": "ht",
        "+504": "hn", "+852": "hk", "+36": "hu", "+354": "is", "+91": "in",
        "+62": "id", "+98": "ir", "+964": "iq", "+353": "ie", "+972": "il",
        "+39": "it", "+1876": "jm", "+81": "jp", "+962": "jo",
        "+254": "ke", "+686": "ki", "+850": "kp", "+82": "kr", "+965": "kw",
        "+996": "kg", "+856": "la", "+371": "lv", "+961": "lb", "+266": "ls",
        "+231": "lr", "+218": "ly", "+423": "li", "+370": "lt", "+352": "lu",
        "+853": "mo", "+389": "mk", "+261": "mg", "+265": "mw", "+60": "my",
        "+960": "mv", "+223": "ml", "+356": "mt", "+692": "mh", "+222": "mr",
        "+230": "mu", "+52": "mx", "+691": "fm", "+373": "md", "+377": "mc",
        "+976": "mn", "+382": "me", "+1664": "ms", "+212": "ma", "+258": "mz",
        "+95": "mm", "+264": "na", "+977": "np", "+31": "nl", "+64": "nz",
        "+505": "ni", "+227": "ne", "+234": "ng", "+47": "no", "+968": "om",
        "+92": "pk", "+680": "pw", "+507": "pa", "+675": "pg", "+595": "py",
        "+51": "pe", "+63": "ph", "+48": "pl", "+351": "pt", "+1787": "pr",
        "+974": "qa", "+40": "ro", "+7": "ru", "+250": "rw", "+685": "ws",
        "+966": "sa", "+221": "sn", "+381": "rs", "+248": "sc", "+232": "sl",
        "+65": "sg", "+421": "sk", "+386": "si", "+677": "sb", "+252": "so",
        "+27": "za", "+34": "es", "+94": "lk", "+249": "sd", "+597": "sr",
        "+268": "sz", "+46": "se", "+41": "ch", "+963": "sy", "+886": "tw",
        "+992": "tj", "+255": "tz", "+66": "th", "+228": "tg", "+676": "to",
        "+1868": "tt", "+216": "tn", "+90": "tr", "+993": "tm", "+256": "ug",
        "+380": "ua", "+971": "ae", "+44": "gb", "+1": "us", "+598": "uy",
        "+998": "uz", "+678": "vu", "+58": "ve", "+84": "vn", "+967": "ye",
        "+260": "zm", "+263": "zw"
    };
    

    const modelClickHandler = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
    };

    const countryCodeModelHandler = () => {
        setCountryModelOpened(!countryModelOpened);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const countryItemClickHandler = (
        countryItem: { name: string; code: string; iso: string },
        index: number
    ) => {
        setSelectedCountryIndex(index);
        setCountryCode(countryItem?.code);
        setIsoCode(countryItem?.iso);
        countryCodeModelHandler();
    };

    const fetchCountriesList = async () => {
            try {
                const response: any = await fetch(`${API_KEY}/${END_POINTS.COUNTRY_LIST}`, {
                    method: METHOD.GET,
                    headers: {
                        'Content-type': 'application/json',
                    },
                });
                const { data }: any = await response.json();
    
                // Setting all values to countryCodes state
                setCountryCodes(data?.countries);
            } catch (error) {
                console.log('🚀 ~ fetchCountriesList ~ error:', error);
            }
        };

    // Filter country codes based on search query
    const filteredCountryCodes = countryCodes?.filter((countryItem: any) =>
        countryItem?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e: any) => {
        e.preventDefault();
        try {

            // let updatedProfileData:any = JSON.stringify({
            //     "name": name,
            //     "bio": bio,
            //     "contactEmail": email,
            //     "website": website,
            //     "businessCategory": category,
            //     "birthday": birthDate,
            //     "country": country,
            // });
            const formData = new FormData();

            // // Append other fields to the FormData object
            formData.append("avatar", fileObj);
            formData.append("name", name);
            formData.append("bio", bio);
            formData.append('contactEmail', email);
            formData.append('website', website);
            formData.append('businessCategory', category);
            formData.append('birthday', birthDate);
            formData.append('country', country);
            formData.append('phoneNumber', countryCode + '-' + phoneNumber);

            // Send the PATCH request with FormData
            fetch(`${API_KEY}/profile/`, {
                method: "PATCH",
                body: formData,
                headers: { 'Authorization': `Bearer ${token}` },
            })
            .then(async (res) => {
                const data = await res.json();
    
                if (!res.ok) {
                    throw new Error(data.message || "Something went wrong");
                }
    
                dispatch(getProfileData());
                showToast('Profile Updated Successfully!');
                onSave();
            })
            .catch((err) => {
                console.error("Error updating profile:", err);
                showToastError(err.message || "Failed to update profile");
            });;
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

    const bioChangeHandler = (e: any) => {
        if (e.target.value.length <= 80) {
            setBio(e.target.value);
        }
    }

    useEffect(() => {
        fetchCountriesList();
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
                    setBirthDate(response?.dateOfBirth?.split('T')[0]);
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
                    
                    const phone = response?.phoneNumber;

                    // Match the country code and the number separately
                    const match = phone?.match(/^\+(\d+)-(\d+)$/);
                    //+92-3061922300

                    if (match) {
                        const countryCode = `+${match[1]}`;  // +92
                        const number = match[2];         // 3061922300
                        setCountryCode(countryCode);
                        setPhoneNumber(number);
                        setIsoCode(getIsoValueFromCountryCode(countryCode)?.toUpperCase())
                    } else {
                        console.log("Phone not saved for user.");
                    }
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

            return file;
        } catch (error) {
            console.error('Error fetching base64 image:', error);
        }
    };

    const showSiblingCalender = () => {
        if (calenderRef.current) {
            calenderRef.current.showPicker();
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={`${darkTheme}`}>
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
                            onChange={bioChangeHandler}
                        />
                        <div className={styles['div-11']}>{bio.length}/80</div>
                        <div className={styles['div-12']}>Business Phone number</div>
                        {/* <input
                            className={styles['input-3']}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        /> */}
                        <div className={`${styles['input-4']} flex flex-row items-center border  mt-2 rounded-md p-2.5`}>
                            <div
                                className="flex flex-row items-center gap-2  cursor-pointer relative text-black"
                                onClick={
                                    countryCodeModelHandler
                                }
                            >
                                <p>
                                    {isoCode +
                                        ' ' +
                                        countryCode}
                                </p>
                                <img
                                    className={`object-contain h-2.5 w-2.5 chevron ${countryModelOpened
                                        ? 'rotate'
                                        : ''
                                        }`}
                                    src={chevronDown}
                                />
                                <p className="text-gray-400 ">
                                    {' '}
                                    |{' '}
                                </p>
                                {countryModelOpened && (
                                    <div
                                        onClick={
                                            modelClickHandler
                                        }
                                        className={`absolute ${filteredCountryCodes.length ===
                                            0
                                            ? 'h-fit'
                                            : 'h-80'
                                            }  w-80 bg-white top-11 -left-2.5 rounded-md shadow-md cursor-default z-10`}
                                    >
                                        <div className="flex flex-row items-center p-2 gap-2 border rounded-t-lg">
                                            <img
                                                className="object-contain h-3 w-3 m-2"
                                                src={search}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="w-full text-sm font-normal caret-red-500 bg-white"
                                                value={
                                                    searchQuery
                                                }
                                                onChange={
                                                    handleSearchChange
                                                }
                                            />
                                        </div>
                                        <div className="w-full h-[1px] bg-gray-300" />
                                        <div
                                            className={`overflow-y-auto ${filteredCountryCodes.length ===
                                                0
                                                ? 'h-fit'
                                                : 'max-h-[17.188rem]'
                                                } `}
                                        >
                                            {filteredCountryCodes.map(
                                                (
                                                    countryItem: any,
                                                    index: number
                                                ) => (
                                                    <div
                                                        onClick={() =>
                                                            countryItemClickHandler(
                                                                countryItem,
                                                                index
                                                            )
                                                        }
                                                        key={
                                                            index
                                                        }
                                                        className={`flex flex-row justify-between items-center p-2.5 cursor-pointer mb-2 rounded-b-md ${selectedCountryIndex ===
                                                            index
                                                            ? 'bg-gray-50'
                                                            : ''
                                                            }`}
                                                    >
                                                        <p
                                                            className={`font-normal text-black text-left text-xs hover:bg-gray-50`}
                                                        >
                                                            {countryItem?.name +
                                                                ' ' +
                                                                countryItem?.code}
                                                        </p>
                                                        {selectedCountryIndex ===
                                                            index && (
                                                                <img
                                                                    className="h-4 w-4 object-contain"
                                                                    alt="check-mark"
                                                                    src={
                                                                        checkCountryCode
                                                                    }
                                                                />
                                                            )}
                                                    </div>
                                                )
                                            )}
                                            {filteredCountryCodes.length ===
                                                0 && (
                                                    <p className="font-normal text-gray-400 text-xs hover:bg-gray-50 my-2">
                                                        {
                                                            APP_TEXTS.NO_RESULT_FOUND
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <input
                                className="w-2/3 bg-login-btn"
                                type="text" // ✅ Change from "number" to "text" to enforce max length
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const { value } = e.target;
                                    const maxLength = getMaxPhoneLength(isoCode.toLocaleUpperCase());

                                    // ✅ Remove non-numeric characters and enforce max length
                                    const sanitizedValue = value.replace(/\D/g, '').substring(0, maxLength);
                                    setPhoneNumber(sanitizedValue);
                                }}
                            />
                        </div>
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
                        <div className={`${styles.dateInputWrapper} mt-3`}>
                            <input
                                className={`${styles['input-5']} w-full mt-0`}
                                ref={calenderRef}
                                type='date'
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                            <span onClick={showSiblingCalender} className={styles.customIcon}>📅</span>
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
                            <button type="submit" style={{ background: '#DE0C0C', color: 'white' }}>
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
