// import { IconButton, Box, useTheme } from '@mui/material';
// import { tokens } from '../theme';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, InputAdornment, Modal, styled } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mySearchIconBlack from '../../assets/SearchBlack.svg';
import defaultProfileIcon from '../../assets/defaultProfileIcon.png';
import { useAuthStore } from '../../store/authStore';

import { search } from '../../icons';
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

interface User {
    _id: string;
    name: string;
    avatar: string;
}

interface Video {
    mediaId: string;
    description: string;
}

interface Hashtag {
    _id: string;
    name: string;
}

interface Sound {
    _id: string;
    name: string;
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
    const navigate = useNavigate()
    const tabValue = ''
    const [searchText, setSearchText] = useState('');
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const { onClose, selectedValue, open } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResultsData, setSearchResultsData] = useState({
        first3Users: [],
        first3Videos: [],
        first3Sounds: [],
        first3Hashtags: [],
    });
    const [fetchComplete, setFetchComplete] = useState(false)

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
        handleFetchSearch()
    };

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

    const handleNavigation = () => {
        navigate(`/searchPage/${searchText}/All`)
    }
    const handleSoundsNavigation = () => {
        navigate(`/searchPage/${searchText}/Sounds`)
    }
    const handleUsersNavigation = () => {
        navigate(`/searchPage/${searchText}/Users`)
    }

    const handleFetchSearch = async () => {
        try {
            const response = await fetch(`${API_KEY}/discover/search?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                const { users, videos, hashtags, sounds } = responseData.data;
                const first3Users = users.data.slice(0, 1);
                const first3Videos = videos.data.slice(0, 3);
                const first3Hashtags = hashtags.data.slice(0, 3);
                const first3Sounds = sounds.data.slice(0, 3);
                // Update the state with the extracted data
                setSearchResultsData({ first3Users, first3Videos, first3Sounds, first3Hashtags });
                console.log(`the search results: `);
                console.log(responseData.data);
                setFetchComplete(true)
                // handleFetchActivity;
            }

        } catch (error) {
            // Handle any errors here.
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchSearch()
    }, [searchQuery])

    return (
        <>
            <Stack spacing={2} sx={{ width: 300 }}>
                {fetchComplete && (
                    <Autocomplete
                        // freeSolo
                        id="free-solo-2-demo"
                        disableClearable

                        filterOptions={(x) => x}
                        options={recentSearches}
                        groupBy={() => 'Recent Searches'}
                        value={searchText}
                        onInputChange={(e, newInputValue) => setSearchText(newInputValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={placeholder}
                                onSubmit={handleSearch}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                                style={{ outline: 0 }}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton size="small" onClick={handleSearch}>
                                                {/* <SearchIcon /> */}
                                                <img src={search} alt="" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton size="small" onClick={() => setSearchQuery('')}>
                                                {searchQuery === '' ? '' :
                                                    <ClearIcon />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleNavigation();
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
                                        outline: 0,
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
                                {searchText === '' && (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 10px', }}>
                                            <div className={'header-searchDropDown'}>Recent Searches</div>
                                            <IconButton size="small">
                                                <div className={'header-secondary'} onClick={handleClearAll}>Clear All</div>
                                            </IconButton>
                                        </div>
                                        <GroupItems>
                                            {searchText === '' && (
                                                React.Children.toArray(params.children).map((child, index) => (
                                                    <div key={index} style={{
                                                        width: '100%',
                                                    }}>
                                                        {child}
                                                    </div>
                                                ))
                                            )}
                                        </GroupItems>
                                    </>
                                )}
                                {searchText !== '' && (
                                    <div className={'searchResultsDiv'}>
                                        <div className={'searchSuggestionsTextDiv'} onClick={handleNavigation}>
                                            <img src={mySearchIconBlack} /> {searchText} results
                                        </div>
                                        <div className={'searchSuggestionsTextDiv'} onClick={handleSoundsNavigation}>
                                            <img src={mySearchIconBlack} /> {searchText} sounds
                                        </div>
                                        <div className={'searchSuggestionsTextDiv'} onClick={handleNavigation}>
                                            <img src={mySearchIconBlack} /> {searchText} videos
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                                            <div className={'header-searchDropDown'} style={{ marginBottom: '24px' }}>Accounts</div>
                                        </div>
                                        <div>
                                            <div className={'suggestedItemDiv'}>
                                                {searchResultsData.first3Users.map((user: User, index) => (
                                                    <div key={index} className={'suggestedItem'}>
                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                            <img
                                                                src={user.avatar || defaultProfileIcon}
                                                                alt=""
                                                                className={'plusIconStyle'}
                                                            />
                                                            <div className={'accountName'}>
                                                                <h4 className={'nameText'}>{`@${user.name}`}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div >
                                            <div className={'seeMoreTextDiv'} onClick={handleNavigation}>View all results for {searchText}</div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        )}
                    />
                )}

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

export default SearchBar;