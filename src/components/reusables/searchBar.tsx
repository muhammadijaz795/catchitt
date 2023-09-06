// import { IconButton, Box, useTheme } from '@mui/material';
// import { tokens } from '../theme';
import './components-styles.css';

interface InputFieldProps {
    onChange?: any;
    placeholder?: string;
}

const SearchBar: React.FC<InputFieldProps> = ({ onChange, placeholder }) => {
    return (
        <>
            <div className={'searchBar'}>
                <input
                    className={'searchInput'}
                    placeholder="Search accounts and videos"
                    onChange={onChange}
                />
            </div>
        </>
    );
};

export default SearchBar;
