import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { search, cross } from '../../../icons';
import style from './search.module.scss';

function Search({
    placeholder,
    onInputChangeHandler,
    submitHandler,
    showClose = false,
    searchMsgBar,
    handleSearchChange,
    selectFirstSearch = false,
}: any) {
    const { pathname } = useLocation();

    const [Search, setSearch] = useState<any>('');
    const submitH = (e: any) => {
        e.preventDefault(); // navigate(`/searchPage/${searchText}/All`);
        setSearch('');
        // onInputChangeHandler(Search);
        submitHandler(Search);
        // handleSearchChange(Search)
        // navigate(`/searchPage/${Search}/All`);
    };
    {
        /* {!pathname.includes('/searchPage/') ? <Search /> :null} */
    }

    const [textColor, setTextColor] = useState('black');
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setTextColor('white');
        }else{
            setTextColor('black');
        }
    });

    return ( selectFirstSearch ?
        <div
            style={{
                margin: '5px 6px',
                flex: 1,
                height: 40,
                background: textColor ==='black'?'#F8F8F8':'grey',
                borderRadius: '92px',//showClose ? 0 : 4,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0px 16px',
                width:'516px',
                visibility: pathname.includes('/searchPage/') ? 'hidden' : 'visible',
            }}
        >
            <img src={search} style={{ width: 20, height: 20 }} alt="" />
            <form onSubmit={submitH} style={{ flex: 1 }}>
                <input
                    style={{
                        width: '100%',
                        height: 20,
                        outline: 0,
                        border: 0,
                        background: 'transparent',
                        color: '#A9A9A9',
                        fontSize: 14,
                        fontWeight: 400,
                    }}
                    type="search"
                    placeholder={placeholder}
                    onChange={(e) => {
                        if (onInputChangeHandler) {
                            onInputChangeHandler(e.target.value);
                        }
                        setSearch(e.target.value);
                    }}
                    value={Search}
                />
            </form>
            {showClose && (
                <img onClick={searchMsgBar} style={{ cursor: 'pointer' }} src={cross} alt="" />
            )}
        </div> :
        <div className={style.DivHeaderCenterContainer}>
            <div className={style.DivSearchFormContainer}>
                <form data-e2e="search-box" className={style.SearchFormElement} onSubmit={submitH} >
                    <input  type="search"
                    placeholder="Search"
                    onChange={(e) => {
                        if (onInputChangeHandler) {
                            onInputChangeHandler(e.target.value);
                        }
                        setSearch(e.target.value);
                    }}
                    value={Search} role="combobox" aria-controls="" aria-label="Search" aria-expanded="false" aria-autocomplete="list" data-e2e="search-user-input" style={{color: textColor}} className={style.SearchInputElement}  /><span className={style.SearchSpanSpliter}></span>
                    <button type="submit" aria-label="Search" className={style.searchButtonSearch}>
                        <div className="css-17iic05-DivSearchIconContainer e14ntknm8">
                            {/* <svg width="24" data-e2e="" height="24" viewBox="0 0 48 48" fill="rgba(22, 24, 35, .34)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clipRule="evenodd" d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"></path></svg> */}
                            <img src={search} style={{ width: 20, height: 20 }} alt="" />    
                        </div>
                    </button>
                    <div className="css-1mdii59-DivInputBorder e14ntknm1"></div></form></div></div>
    );
}

export default Search;
