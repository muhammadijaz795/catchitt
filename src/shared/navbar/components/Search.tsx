import { useLocation, useNavigate } from 'react-router-dom';
import { search } from '../../../icons';
import { useState } from 'react';

function Search() {
    const { pathname } = useLocation();

    const [Search, setSearch] = useState<any>('');
    const navigate = useNavigate();
    const submitH = (e: any) => {
        e.preventDefault(); // navigate(`/searchPage/${searchText}/All`);
        navigate(`/searchPage/${Search}/All`);
    };
    {
        /* {!pathname.includes('/searchPage/') ? <Search /> :null} */
    }

    return (
        <div
            style={{
                flex: 1,
                height: 40,
                background: '#F8F8F8',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0px 16px',
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
                    placeholder="Search accounts and videos"
                    onChange={(e) => setSearch(e.target.value)}
                    value={Search}
                />
            </form>
        </div>
    );
}

export default Search;
