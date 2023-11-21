import { Avatar } from '@mui/material';
import EditProfileIcon from '../svg-components/EditProfileIcon';
import { useState } from 'react';
import styles from './editProfile.module.scss';

interface Props {
    onCancel: () => void;
    onSave: () => void;
}

export default function EditProfile({ onCancel, onSave }: Props) {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('Passionate about art, life, and nature.');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [category, setCategory] = useState('default');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [country, setCountry] = useState('default');
    
    const handleSubmit = () => {
        console.log('Form submitted with values:', {
            username,
            name,
            bio,
            phoneNumber,
            email,
            website,
            category,
            day,
            month,
            year,
            country,
        });

        onSave();
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
            case 'country':
                setCountry('');
                break;
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.div}>
                <div className={styles['div-2']}>Edit Profile</div>
                <div className={styles.profileBox}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://thumbs.dreamstime.com/b/pink-dahlia-flower-details-macro-photo-border-frame-wide-banner-background-message-wedding-background-pink-dahlia-flower-117406512.jpg"
                        className={styles.img}
                    />
                    <div className={styles.editIcon}>
                        <EditProfileIcon />
                    </div>
                </div>
                <div className={styles['div-3']}>Username</div>
                <input
                    placeholder=""
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className={styles['div-5']}>
                    Usernames can only contain letters, numbers, underscores, and periods. Changing
                    your username will also change your profile link.
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
                    <option value={'default'}> -- Select an option -- </option>
                    <option className={styles['div-16']}>Science and Technology</option>
                </select>
                <div className={styles['div-17']}>Birth Date</div>
                <div className={styles['div-18']}>
                    <div className={styles['div-19']}>
                        <input
                            placeholder="DD"
                            className={styles['div-20']}
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                        />
                        <img
                            loading="lazy"
                            src="/images/icons/cross-icon.svg"
                            className={styles['img-5']}
                            onClick={()=> onResetField('day')}
                        />
                    </div>
                    <div className={styles['div-21']}>
                        <input
                            placeholder="MM"
                            className={styles['div-22']}
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                        <img
                            src="/images/icons/cross-icon.svg"
                            loading="lazy"
                            className={styles['img-6']}
                            onClick={()=> onResetField('month')}
                        />
                    </div>
                    <div className={styles['div-23']}>
                        <input
                            placeholder="YYYY"
                            className={styles['div-24']}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <img
                            src="/images/icons/cross-icon.svg"
                            loading="lazy"
                            className={styles['img-7']}
                            onClick={()=> onResetField('year')}
                        />
                    </div>
                </div>
                <div className={styles['div-25']}>Country</div>
                <select
                    className={styles.select}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value={'default'}> -- Select an option -- </option>
                    <option className={styles['div-26']}>Qatar</option>
                </select>
                <div className={styles['div-27']}>
                    <div onClick={onCancel} className={styles['div-28']}>
                        Cancel
                    </div>
                    <button type="submit" className={styles['div-29']}>
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
