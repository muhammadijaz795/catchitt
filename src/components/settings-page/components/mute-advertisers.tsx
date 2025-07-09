import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const MuteAdvertisers: React.FC = () => {
      const { t, i18n } = useTranslation();
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
        let endpoint = process.env.VITE_API_URL + '/profile/v2/ads-settings';
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
      <Typography className="border-top pt-3">
            <div className="d-flex justify-between py-3 d-none">
                <div >
                    <div className='text-left'>
                        <p className='text-base'>{t('smartValley')}</p>
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

export default MuteAdvertisers;
