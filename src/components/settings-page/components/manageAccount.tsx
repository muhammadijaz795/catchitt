import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, FormControlLabel, Radio, Checkbox, Stack, FormHelperText } from '@mui/material';
import { styled } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const CustomTabs = styled(Tabs)({
  backgroundColor: '#fff',
});

interface ManageAccountProps {
  downloadDataSettings: {
    download: string;
    download_items: string[];
    format: string;
  };
  updateAccountSettings: (data: any) => Promise<void>;
}

const FullWidthTabs: React.FC<ManageAccountProps> = ({ downloadDataSettings, updateAccountSettings }) => {
  const [value, setValue] = useState(0);
  const [selectedDownload, setSelectedDownload] = useState(downloadDataSettings.download);
  const [selectedFormat, setSelectedFormat] = useState(downloadDataSettings.format);
  const [selectedItems, setSelectedItems] = useState(downloadDataSettings.download_items);

  // Sync local state with props when `downloadDataSettings` changes
  useEffect(() => {
    setSelectedDownload(downloadDataSettings.download);
    setSelectedFormat(downloadDataSettings.format);
    setSelectedItems(downloadDataSettings.download_items);
  }, [downloadDataSettings]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDownloadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('hhh', event.target.value);
    setSelectedDownload(event.target.value);
  };

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFormat(event.target.value);
  };

  const handleItemChange = (item: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    }
  };

  const handleRequestData = async () => {
    const data = {
      downloadDataSettings: {
        download: selectedDownload,
        download_items: selectedDownload === 'custom' ? selectedItems : [],
        format: selectedFormat,
      },
    };

    await updateAccountSettings(data);
  };

  return (
    <Box className="text-left" sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <AppBar  position="static" color="default" sx={{ boxShadow: 'none', backgroundColor: 'white' }}>
        <CustomTabs className='w-[94%] m-auto' sx={{borderBottom: '1px solid #16182333'}} value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab
            label="Request data"
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
            sx={{ flex: 1, color: 'black', textTransform: 'none' }}
          />
          <Tab
            label="Download data"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
            sx={{ flex: 1, color: 'black', textTransform: 'none', '&.Mui-selected': { color: 'black', borderBottom: '2px solid black' } }}
          />
        </CustomTabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <span className="text-sm text-[#16182399]">
          Request a copy of your data from all the Seezitt apps you use to back up your account or export it to other services.
        </span>
        <span className='text-sm text-[#16182399] mt-3 d-block font-medium'>
          Select data to download
        </span>
        <div className='w-100 border-bottom py-3'>
          <FormControlLabel
            className='flex-row-reverse  justify-between w-100 pl-3'
              value="all_data"
              label={
                <Box onClick={(e) => e.stopPropagation()} sx={{ cursor: 'pointer' }}>
                  <p className='font-semibold'>All data</p>
                  <span className='text-xs text-[#16182399]'>
                    Download all available information associated with your account. This file will include more data than if
                    you select from the custom options.
                  </span>
                </Box>
              }
              control={<Radio  checked={selectedDownload === 'all_data'}
              onChange={handleDownloadChange} sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} 
          />
        </div>

        {/* All Data Radio Button */}
        {/* <div className="w-100 border-bottom py-3">
          <FormControlLabel
            className="flex-row-reverse justify-between w-100 pl-3"
            value="all_data"
            label={
              <Box onClick={(e) => e.stopPropagation()} sx={{ cursor: 'pointer' }}>
                <p className="font-semibold">All data</p>
                <span className="text-xs text-[#16182399]">
                  Download all available information associated with your account. This file will include more data than if
                  you select from the custom options.
                </span>
              </Box>
            }
            control={
              <Radio
                checked={selectedDownload === 'all_data'}
                onChange={handleDownloadChange}
              />
            }
          />
        </div> */}

        {/* Custom Radio Button */}
        <div className="w-100 border-bottom py-3">
          <FormControlLabel
            className='flex-row-reverse  justify-between w-100 pl-3'
              value="custom"
              label={
                <Box onClick={(e) => e.stopPropagation()} sx={{ cursor: 'pointer' }}>
                  <p className='font-semibold'>Custom</p>
                  <span className='text-xs text-[#16182399]'>
                    Choose which information you want to include in your file.
                  </span>
                </Box>
              }
              control={<Radio  checked={selectedDownload === 'custom'}
              onChange={handleDownloadChange} sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} 
           
          />
        </div>

        {/* Custom Checkboxes (Visible only when "Custom" is selected) */}
        {selectedDownload === 'custom' && (
          <div className="w-100 d-flex flex-column gap-3 border-bottom py-3">

<FormControlLabel
                        className='w-100 d-flex justify-between flex-row-reverse pl-3'

              control={
                <Checkbox
                  checked={selectedItems && selectedItems.includes('profile_and_posts')}
                  onChange={handleItemChange('profile_and_posts')}
                  sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }}
                />
              }
              label={
                <Stack spacing={0.5}>
                    <span>Profile and Posts</span>
                    <FormHelperText sx={{ fontSize: '12px', color: 'gray' }}>
                    Personal information, your followers, accounts you follow, your posts on Seezit
                    </FormHelperText>
                  </Stack>
              }
            />

              <FormControlLabel
                className="w-100 d-flex justify-between flex-row-reverse pl-3"
                control={
                  <Checkbox
                    checked={selectedItems && selectedItems.includes('activity')}
                    onChange={handleItemChange('activity')}
                    sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }}
                  />
                }
                label={
                  <Stack spacing={0.5}>
                    <span>Activity</span>
                    <FormHelperText sx={{ fontSize: '12px', color: 'gray' }}>
                      Likes, comments, favorites, browsing history
                    </FormHelperText>
                  </Stack>
                }
              />

            <FormControlLabel
                        className='w-100  d-flex justify-between flex-row-reverse pl-3'

              control={
                <Checkbox
                  checked={selectedItems && selectedItems.includes('messages')}
                  onChange={handleItemChange('messages')}
                  sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }}
                />
              }
              label={
                <Stack spacing={0.5}>
                    <span>Message</span>
                    <FormHelperText sx={{ fontSize: '12px', color: 'gray' }}>
                      Direct messages you’ve sent and received
                    </FormHelperText>
                  </Stack>
              }
            />
            
          </div>
        )}

        <span className="text-sm text-[#16182399] mt-3 d-block font-medium">Select file format</span>

        {/* TXT Radio Button */}
        <div className="w-100 border-bottom py-3">
          <FormControlLabel
            className="flex-row-reverse justify-between w-100 pl-3"
            value="txt"
            label={
              <Box onClick={(e) => e.stopPropagation()} sx={{ cursor: 'pointer' }}>
                <p className="font-semibold">TXT</p>
                <span className="text-xs text-[#16182399]">Easy-to-read text file</span>
              </Box>
            }
            control={
              <Radio
                checked={selectedFormat === 'txt'}
                onChange={handleFormatChange}
                sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }}
              />
            }
          />
        </div>

        {/* JSON Radio Button */}
        <div className="w-100 border-bottom py-3">
          <FormControlLabel
            className='flex-row-reverse  justify-between w-100 pl-3'
              value="json"
              label={
                <Box onClick={(e) => e.stopPropagation()} sx={{ cursor: 'pointer' }}>
                  <p className='font-semibold'>JSON</p>
                  <span className='text-xs text-[#16182399]'>
                    Allows other services to import your file
                  </span>
                </Box>
              }
              control={<Radio  checked={selectedFormat === 'json'} onChange={handleFormatChange} sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} 
           
          />
        </div>

        {/* Request Data Button */}
        <button
          className="bg-[#FE2C55] text-white font-semibold px-4 rounded-md w-full"
          onClick={handleRequestData}
        >
          <p className="text-[rgb(255, 59, 92)] font-normal">Request data</p>
        </button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="p-5 d-flex flex-col text-center">
          <svg style={{ height: '3rem' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 53 53" fill="none">
            <path d="M2.14821 26.3405C2.14821 14.7714 2.14821 8.98692 5.74225 5.39287C9.3363 1.79883 15.1208 1.79883 26.6899 1.79883C38.2589 1.79883 44.0435 1.79883 47.6375 5.39287C51.2315 8.98692 51.2315 14.7714 51.2315 26.3405C51.2315 37.9095 51.2315 43.6941 47.6375 47.2881C44.0435 50.8822 38.2589 50.8822 26.6899 50.8822C15.1208 50.8822 9.3363 50.8822 5.74225 47.2881C2.14821 43.6941 2.14821 37.9095 2.14821 26.3405Z" stroke="#141B34" stroke-width="2.5" />
            <path d="M16.3565 38.0072C15.6662 38.0072 15.1065 38.5668 15.1065 39.2572C15.1065 39.9475 15.6662 40.5072 16.3565 40.5072L16.3565 38.0072ZM37.0232 40.5072C37.7136 40.5072 38.2732 39.9475 38.2732 39.2572C38.2732 38.5668 37.7136 38.0072 37.0232 38.0072V40.5072ZM34.0468 26.7353C34.5267 26.239 34.5134 25.4477 34.0172 24.9678C33.5209 24.4879 32.7296 24.5011 32.2497 24.9974L34.0468 26.7353ZM30.1149 29.0029L31.0135 29.8718H31.0135L30.1149 29.0029ZM23.2648 29.0029L22.3663 29.8718H22.3663L23.2648 29.0029ZM21.1301 24.9974C20.6502 24.5011 19.8588 24.4879 19.3626 24.9678C18.8663 25.4477 18.8531 26.239 19.333 26.7353L21.1301 24.9974ZM27.9399 13.4238C27.9399 12.7335 27.3802 12.1738 26.6899 12.1738C25.9995 12.1738 25.4399 12.7335 25.4399 13.4238L27.9399 13.4238ZM16.3565 40.5072L37.0232 40.5072V38.0072L16.3565 38.0072L16.3565 40.5072ZM32.2497 24.9974L29.2164 28.1339L31.0135 29.8718L34.0468 26.7353L32.2497 24.9974ZM24.1634 28.1339L21.1301 24.9974L19.333 26.7353L22.3663 29.8718L24.1634 28.1339ZM29.2164 28.1339C28.3842 28.9943 27.8462 29.5468 27.3989 29.8997C26.9785 30.2314 26.7952 30.2572 26.6899 30.2572L26.6899 32.7572C27.5877 32.7572 28.3096 32.3656 28.9473 31.8624C29.5581 31.3806 30.231 30.6809 31.0135 29.8718L29.2164 28.1339ZM22.3663 29.8718C23.1487 30.6809 23.8217 31.3806 24.4324 31.8624C25.0701 32.3656 25.792 32.7572 26.6899 32.7572L26.6899 30.2572C26.5845 30.2572 26.4012 30.2314 25.9809 29.8997C25.5335 29.5468 24.9955 28.9943 24.1634 28.1339L22.3663 29.8718ZM27.9399 31.5072L27.9399 13.4238L25.4399 13.4238L25.4399 31.5072H27.9399Z" fill="#141B34" />
          </svg>
          <p className="h6 mt-4">No requests yet</p>
          <span className="text-[#0000008F]">Start a request to download your data</span>
          <button className="bg-[#FE2C55] text-white font-semibold mt-4 px-5 rounded-md">
            <p className="text-[rgb(255, 59, 92)] font-normal">Request data</p>
          </button>
        </div>
      </TabPanel>
    </Box>
  );
};

export default FullWidthTabs;