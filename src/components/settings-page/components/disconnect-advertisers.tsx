import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";


const DisconnectAdvertisers: React.FC = () => {
    const [Sponsored, setSponsored] = useState(
        {
            items: [],
            isLoading: false,
            canLoadMore: false,
        }
    );
     
    function fetchCategories()
    { 
        setSponsored(prev => ({ ...prev, isLoading: true }));
        let endpoint = process.env.VITE_API_URL + '/profile/v2/disconnect-advertiser';
        let payload =
        {
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token'),
            },
        };

        fetch(endpoint, payload)
        .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch data"))
        .then(data => setSponsored({ items: data.data, isLoading: false, canLoadMore: data.data.length > 0 }))
        .catch(error => setSponsored(prev => ({ ...prev, isLoading: false })));
    }

    useEffect(fetchCategories, []);
 

 
  return (
      <div className=" w-100 p-3">
        <div className="d-flex justify-between border-top border-bottom py-3 d-none" >
                <div className='text-left'>
                    <span className=' text-left text-sm text-[#16182399]'>Advertisers you have disconnected</span>
                </div>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5377 8.79357L8.98434 4.2369C8.92226 4.17445 8.88741 4.08997 8.88741 4.0019C8.88741 3.91384 8.92226 3.82936 8.98434 3.7669L9.59767 3.15357C9.66013 3.09149 9.74461 3.05664 9.83267 3.05664C9.92074 3.05664 10.0052 3.09149 10.0677 3.15357L15.471 8.55357C15.5023 8.58456 15.5271 8.62143 15.544 8.66205C15.5609 8.70267 15.5696 8.74623 15.5696 8.79024C15.5696 8.83424 15.5609 8.87781 15.544 8.91843C15.5271 8.95905 15.5023 8.99592 15.471 9.02691L10.0677 14.4336C10.0052 14.4957 9.92074 14.5305 9.83267 14.5305C9.74461 14.5305 9.66013 14.4957 9.59767 14.4336L8.98434 13.8202C8.9531 13.7893 8.9283 13.7524 8.91138 13.7118C8.89445 13.6711 8.88574 13.6276 8.88574 13.5836C8.88574 13.5396 8.89445 13.496 8.91138 13.4554C8.9283 13.4148 8.9531 13.3779 8.98434 13.3469L13.5377 8.79357Z" fill="#161823"/>
                </svg>
        </div>
        <Typography className="border-top pt-3">
            <div className="d-flex justify-between py-3 d-none">
                <div >
                    <div className='text-left'>
                        <p className='text-base'>Smart Valley</p>
                    </div>
                </div>
                <label className="toggle-switch !left-1">
                    <input 
                    style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                        type="checkbox"
                        name="autoScrollCheckbox" 
                        id="autoScrollCheckbox" 
                    />
                    <b className="slider"></b>
                </label>
            </div>
        </Typography>
      </div>
  );
};

export default DisconnectAdvertisers;
