import { useNavigate } from 'react-router-dom';
import { logoAuth } from '../../icons';
import { APP_TEXTS } from '../../utils/constants';

const Header = () => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-row justify-between items-center p-3">
            <img
                onClick={navigateToHome}
                className="object-contain h-12 w-24 cursor-pointer"
                src={logoAuth}
            />
            <div className="flex flex-row justify-center items-center gap-2">
                <p className="border-[2px] rounded-full w-5 h-5 text-xs text-gray-400 font-semibold border-gray-400 text-center cursor-pointer">
                    ?
                </p>
                <p className="hover:underline cursor-pointer">{APP_TEXTS.FEEDBACK}</p>
            </div>
        </div>
    );
};

export default Header;
