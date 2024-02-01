import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { avatar, createIcon, logo } from '../../icons';
import { useAuthStore } from '../../store/authStore';
import style from './Navbar.module.scss';
import Search from './components/Search';

function Navbar() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const userName = useAuthStore((state) => state.name);

    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:700px)');
    return (
        <div className={style.parent}>
            <div className={style.sec1}>
                <img src={logo} alt="" />
            </div>
            {!isMobile ? (
                <div className={style.sec2}>
                    <Search />
                    {isLoggedIn ? (
                        <div className={style.profile} >
                            <img
                                style={{ width: 36, height: 36, cursor: 'pointer' }}
                                src={createIcon}
                                alt=""
                            />
                            <div className={style.user} onClick={() => navigate('/profile')}>
                                <img
                                    style={{ width: 36, height: 36, cursor: 'pointer' }}
                                    src={avatar}
                                    alt=""
                                />
                                <p className={style.name}>{userName}</p>
                            </div>
                        </div>
                    ) : (
                        <button
                            style={{
                                background: '#5448B2',
                                color: '#FFF',
                                padding: '0px 18px',
                                borderRadius: 6,
                                height: 40,
                                fontWeight: 600,
                                fontSize: 14,
                            }}
                            onClick={() => navigate('/auth')}
                        >
                            Login
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default Navbar;
