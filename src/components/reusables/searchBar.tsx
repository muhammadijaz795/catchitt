// import { IconButton, Box, useTheme } from '@mui/material';
// import { tokens } from '../theme';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, Modal, styled } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import './components-styles.css';

interface InputFieldProps {
    onChange?: any;
    placeholder?: string;
}

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

const GroupItems = styled('ul')({
    background: 'url(../../assets/Search.svg)',
    margin: 0,
    padding: 0,
    zIndex: 1,
    listStyle: 'none',
    overflow: 'auto',
});

const SearchBar: React.FC<InputFieldProps> = ({ onChange, placeholder }, props: SimpleDialogProps) => {

    const [searchText, setSearchText] = useState('');
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const { onClose, selectedValue, open } = props;
    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
        // Load recent searches from local storage
        const storedSearches = localStorage.getItem('recentSearches');
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    }, []);

    const handleSearch = () => {
        if (searchText.trim() === '') {
            return;
        }

        // Add the new search to recent searches
        const updatedSearches = [...recentSearches, searchText];
        setRecentSearches(updatedSearches);

        // Update local storage
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

        // Clear the search input
        setSearchText('');
    };

    // const handleClearAll = () => {
    //     // Clear all recent searches
    //     setRecentSearches([]);
    //     localStorage.removeItem('recentSearches');
    // };
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };


    const handleClearAll = () => {
        // Open the confirmation dialog
        setOpenDialog(true);
    };

    const handleConfirmClearAll = () => {
        // Clear all recent searches
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
        setOpenDialog(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={recentSearches}
                    groupBy={() => 'Recent Searches'}
                    value={searchText}
                    onInputChange={(e, newInputValue) => setSearchText(newInputValue)}
                    sx={{
                        width: { xs: 100, sm: 130, md: 150, lg: 170 },
                        // 👇 Select the hover item here
                        '& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover': {
                            // 👇 Customize the hover bg color here
                            backgroundColor: 'hotpink',
                        },
                        // 👇 Optional: keep this one to customize the selected item when hovered
                        "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
                        {
                            backgroundColor: 'hotpink',
                        },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={placeholder}
                            onSubmit={handleSearch}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton size="small" onClick={handleSearch}>

                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small">
                                            {/* <ClearIcon /> */}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '4px',
                                    position: 'static',
                                    margin: '0',
                                    padding: '0px 5px 0px 16px',
                                    marginBottom: '0',
                                    height: '40px',
                                    maxHeight: '40px',
                                    top: '-120px',
                                    border: '0 solid black',
                                    boxShadow: '0 3px 4px rgba(0, 0, 0, 0)',
                                    fontSize: '16px',
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: '21px',
                                    color: '#acacac',
                                    background:
                                        'no-repeat padding-box border-box 20px center / auto scroll url(../../assets/Search.svg) #f8f8f8',
                                    backgroundSize: '3%',
                                    width: '602px',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    width: '602px',
                                },
                            }}
                        />
                    )} renderGroup={(params) => (
                        <li key={params.key}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 10px', }}>
                                <div style={{
                                    color: 'var(--default-body, #222)',
                                    fontFamily: 'Poppins',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: '150%', // This is equivalent to 'line-height: 27px;'
                                }}>Recent Searches</div>
                                <IconButton size="small">
                                    <div
                                        onClick={handleClearAll}
                                        style={{
                                            color: 'var(--foundation-body-body-300, #6B6B6B)',
                                            fontFamily: 'Poppins',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            lineHeight: '150%',
                                        }}>Clear All</div>
                                </IconButton>
                            </div>
                            <GroupItems>
                                {React.Children.toArray(params.children).map((child, index) => (
                                    <div key={index} style={{
                                        width: '100%',
                                    }}>
                                        {child}
                                    </div>
                                ))}
                            </GroupItems>
                        </li>
                    )}
                />
            </Stack >
            {/* Confirmation Dialog */}
            <Modal open={openDialog} onClose={handleCloseDialog}>
                <div className="modal-container">
                    <h6>Clear search history?</h6>
                    <p>
                        All search history will be deleted
                    </p>
                    <button onClick={handleConfirmClearAll} className='clear-btn'>
                        Clear All
                    </button>
                    <button onClick={handleCloseDialog} className='cancel-btn'>
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
};

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
]

export default SearchBar;
