import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, Box, Typography, Modal, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { styled } from "@mui/material";
import styles from '../account.module.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: 'none',
  borderRadius: '8px',
  p: 4,
};



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
  backgroundColor: "#fff",
});

const Ads: React.FC = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false); 
  const [openList, setOpenList] = useState(false); 
  const [gender, setGender] = useState("male");
  const [customGender, setCustomGender] = useState("");
  const [allCategories, setAllCategories] = useState(
    {
      items: [],
      isLoading: false,
      canLoadMore: false
    }
  );
  const [selectedTopic, setSelectedTopic] = useState({});
  const [isInterested, setIsInterested] = useState(true);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };



  var themeColor = window.localStorage.getItem('theme');
  const [darkTheme, setdarkTheme] = useState('');
  useEffect(() => {
      var themeColor = window.localStorage.getItem('theme');
      if (themeColor == 'dark') {
           setdarkTheme(styles.darkTheme);
      }
  });

 const handleOpen = () => setOpen(true);
//  const openModalList = ()=> setOpenList(true);
 const closeListModal = () => {
    let endpoint = process.env.VITE_API_URL + '/profile/v2/inferred-by-seezitt'
    let payload =
    {
      method: 'PATCH',
      headers:
      {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token'),
      },
      body: JSON.stringify({ categoryId: selectedTopic._id, interested: isInterested })
    };
    
    fetch(endpoint, payload)
    .catch(error => console.error('ERROR: ', error));
  setOpenList(false);
 }
  const handleClose = () =>
  {
    let endpoint = process.env.VITE_API_URL + '/profile/v2/gender-choice-in-ad'
    let payload =
    {
      method: 'PATCH',
      headers:
      {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token'),
      },
      body: JSON.stringify({ genderChoice: gender })
    };
    
    fetch(endpoint, payload)
    .catch(error => console.error('Failed to update gender:', error));
    setOpen(false);
  }

  function fetchCategories()
  { 
    setAllCategories(prev => ({ ...prev, isLoading: true }));

    fetch(process.env.VITE_API_URL + '/media-content/categories')
    .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch data"))
    .then(data => setAllCategories({ items: data.data, isLoading: false, canLoadMore: data.data.length > 0 }))
    .catch(error => setAllCategories(prev => ({ ...prev, isLoading: false })));
  }

  function openModalList(category: Object)
  {
    setSelectedTopic(category);
    setOpenList(true);
  };

  useEffect(fetchCategories, []);

  return (
    <>
    <Box className={`text-left ${darkTheme ? 'bg-transparent': 'bg-transparent'}`} sx={{ width: "100%", bgcolor: "background.paper" }}>
      <AppBar className={`${darkTheme ? 'bg-transparent': 'bg-transparent'} position-relative`} color="default" sx={{ boxShadow: 'none',  }}>
        <CustomTabs className={`${darkTheme ? 'bg-transparent': ''} w-[94%] m-auto `} sx={{borderBottom: '1px solid #16182333'}} value={value} onChange={handleChange} aria-label="basic tabs example" variant="Ads">
          <Tab label="Topic" id="simple-tab-0" aria-controls="simple-tabpanel-0" sx={{ flex: 1, color: "black", textTransform: "none" }} />
          <Tab
            label="Gender"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
            sx={{ flex: 1, color: "black", textTransform: "none", "&.Mui-selected": { color: "black", borderBottom: "2px solid black" } }}
          />
        </CustomTabs>
      </AppBar>
      <TabPanel value={value} index={0}>  
        <div className='w-100 border-bottom py-3 mb-3'>
          <span className='text-sm font-medium text-[#16182399]'>
          Inferred by <br /> Seezitt
          </span>
          <div className='d-flex justify-between cursor-pointer'>
                <div >
                    <div className='text-left'>
                      <p>View all</p>
                    </div>
                </div>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4566 8.84045L8.90329 4.28378C8.8412 4.22133 8.80636 4.13684 8.80636 4.04878C8.80636 3.96072 8.8412 3.87623 8.90329 3.81378L9.51662 3.20045C9.57907 3.13836 9.66356 3.10352 9.75162 3.10352C9.83968 3.10352 9.92417 3.13836 9.98662 3.20045L15.39 8.60045C15.4212 8.63143 15.446 8.6683 15.4629 8.70892C15.4798 8.74954 15.4886 8.79311 15.4886 8.83711C15.4886 8.88112 15.4798 8.92469 15.4629 8.96531C15.446 9.00593 15.4212 9.04279 15.39 9.07378L9.98662 14.4804C9.92417 14.5425 9.83968 14.5774 9.75162 14.5774C9.66356 14.5774 9.57907 14.5425 9.51662 14.4804L8.90329 13.8671C8.87204 13.8361 8.84725 13.7993 8.83032 13.7586C8.8134 13.718 8.80469 13.6744 8.80469 13.6304C8.80469 13.5864 8.8134 13.5429 8.83032 13.5023C8.84725 13.4616 8.87204 13.4248 8.90329 13.3938L13.4566 8.84045Z" fill="#161823"/>
                </svg>

            </div>
        </div>
        <div className='w-100 border-bottom py-3 mb-3'>
          <span className='text-sm font-medium text-[#16182399]'>
            Your choices
          </span>
          <div className='d-flex justify-between cursor-pointer'>
                <div >
                    <div className='text-left'>
                      <p>View all</p>
                    </div>
                </div>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4566 8.84045L8.90329 4.28378C8.8412 4.22133 8.80636 4.13684 8.80636 4.04878C8.80636 3.96072 8.8412 3.87623 8.90329 3.81378L9.51662 3.20045C9.57907 3.13836 9.66356 3.10352 9.75162 3.10352C9.83968 3.10352 9.92417 3.13836 9.98662 3.20045L15.39 8.60045C15.4212 8.63143 15.446 8.6683 15.4629 8.70892C15.4798 8.74954 15.4886 8.79311 15.4886 8.83711C15.4886 8.88112 15.4798 8.92469 15.4629 8.96531C15.446 9.00593 15.4212 9.04279 15.39 9.07378L9.98662 14.4804C9.92417 14.5425 9.83968 14.5774 9.75162 14.5774C9.66356 14.5774 9.57907 14.5425 9.51662 14.4804L8.90329 13.8671C8.87204 13.8361 8.84725 13.7993 8.83032 13.7586C8.8134 13.718 8.80469 13.6744 8.80469 13.6304C8.80469 13.5864 8.8134 13.5429 8.83032 13.5023C8.84725 13.4616 8.87204 13.4248 8.90329 13.3938L13.4566 8.84045Z" fill="#161823"/>
                </svg>
            </div>
        </div>
        <div className='w-100 border-bottom py-3 mb-3'>
          <span className='text-sm font-medium text-[#16182399]'>
            All topics
          </span>
          {allCategories.items.map((category, index) => (
            <div className='d-flex justify-between mt-3 cursor-pointer' key={category._id} onClick={() => openModalList(category)}>
                <div >
                    <div className='text-left'>
                      <p>{category.name}</p>
                    </div>
                </div>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4566 8.84045L8.90329 4.28378C8.8412 4.22133 8.80636 4.13684 8.80636 4.04878C8.80636 3.96072 8.8412 3.87623 8.90329 3.81378L9.51662 3.20045C9.57907 3.13836 9.66356 3.10352 9.75162 3.10352C9.83968 3.10352 9.92417 3.13836 9.98662 3.20045L15.39 8.60045C15.4212 8.63143 15.446 8.6683 15.4629 8.70892C15.4798 8.74954 15.4886 8.79311 15.4886 8.83711C15.4886 8.88112 15.4798 8.92469 15.4629 8.96531C15.446 9.00593 15.4212 9.04279 15.39 9.07378L9.98662 14.4804C9.92417 14.5425 9.83968 14.5774 9.75162 14.5774C9.66356 14.5774 9.57907 14.5425 9.51662 14.4804L8.90329 13.8671C8.87204 13.8361 8.84725 13.7993 8.83032 13.7586C8.8134 13.718 8.80469 13.6744 8.80469 13.6304C8.80469 13.5864 8.8134 13.5429 8.83032 13.5023C8.84725 13.4616 8.87204 13.4248 8.90329 13.3938L13.4566 8.84045Z" fill="#161823"/>
                </svg>

            </div>
          ))}
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Box className="w-100 border-bottom py-3 mb-3 cursor-pointer" onClick={handleOpen}>
          <Typography className="text-sm font-medium text-[#16182399]">Gender</Typography>
          <Box className="d-flex justify-between mt-3 " >
            <Typography></Typography>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.4566 8.84045L8.90329 4.28378C8.8412 4.22133 8.80636 4.13684 8.80636 4.04878C8.80636 3.96072 8.8412 3.87623 8.90329 3.81378L9.51662 3.20045C9.57907 3.13836 9.66356 3.10352 9.75162 3.10352C9.83968 3.10352 9.92417 3.13836 9.98662 3.20045L15.39 8.60045C15.4212 8.63143 15.446 8.6683 15.4629 8.70892C15.4798 8.74954 15.4886 8.79311 15.4886 8.83711C15.4886 8.88112 15.4798 8.92469 15.4629 8.96531C15.446 9.00593 15.4212 9.04279 15.39 9.07378L9.98662 14.4804C9.92417 14.5425 9.83968 14.5774 9.75162 14.5774C9.66356 14.5774 9.57907 14.5425 9.51662 14.4804L8.90329 13.8671C8.87204 13.8361 8.84725 13.7993 8.83032 13.7586C8.8134 13.718 8.80469 13.6744 8.80469 13.6304C8.80469 13.5864 8.8134 13.5429 8.83032 13.5023C8.84725 13.4616 8.87204 13.4248 8.90329 13.3938L13.4566 8.84045Z"
                fill="#161823"
              />
            </svg>
          </Box>
        </Box>
      </TabPanel>

{/* modal for list */}
  <Modal open={openList} onClose={closeListModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <span onClick={closeListModal}>
              <svg fill="#000" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 'auto'}} width="2em" height="2em">
              <path d="M38.7 12.12a1 1 0 0 0 0-1.41l-1.4-1.42a1 1 0 0 0-1.42 0L24 21.17 12.12 9.3a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41L21.17 24 9.3 35.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0L24 26.83 35.88 38.7a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41L26.83 24 38.7 12.12Z"></path>
              </svg>
            </span>
            <Typography id="modal-modal-title" sx={{ textAlign: 'center'}} variant="h5" component="p">{selectedTopic?.name}</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '16px' }}>
              Personalized ads can be based on inferences that TikTok has made about you. Changes can take up to 48 hours to take effect.
            </Typography>
            <RadioGroup value={isInterested} onChange={(event) => setIsInterested(event.target.value == 'true')}>
            <Box className="mt-3" display="flex" alignItems="center" justifyContent="space-between">
            <span>
                <Typography>Interested</Typography>
                <span className="text-sm">We'll try to show you more ads related to this topic.</span>
              </span>
              <FormControlLabel value="true" control={<Radio sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} label="" />
            </Box>
            <Box className="mt-3" display="flex" alignItems="center" justifyContent="space-between">
              <span>
                <Typography>Not interested</Typography>
                <span className="text-sm">We'll try to show you less ads related to this topic.</span>
              </span>
              <FormControlLabel value="false" control={<Radio sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} label="" />
            </Box>
            
          </RadioGroup>
          </Box>
        </Modal>
        
      {/* Modal for gender*/}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <span onClick={handleClose}>
            <svg fill="#000" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 'auto'}} width="2em" height="2em">
            <path d="M38.7 12.12a1 1 0 0 0 0-1.41l-1.4-1.42a1 1 0 0 0-1.42 0L24 21.17 12.12 9.3a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41L21.17 24 9.3 35.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0L24 26.83 35.88 38.7a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41L26.83 24 38.7 12.12Z"></path>
            </svg>
          </span>
          <Typography id="modal-modal-title" sx={{ textAlign: 'center'}} variant="h5" component="p">
          Gender
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '16px' }}>
              Personalized ads can be based on inferences that Seezitt has made about you. Updates apply only to your ad settings and do not affect other Seezitt services.
          </Typography>
          <RadioGroup value={gender} onChange={handleChangeGender}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>Male</Typography>
            <FormControlLabel value="male" control={<Radio sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} label="" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>Female</Typography>
            <FormControlLabel value="female" control={<Radio sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} label="" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TextField variant="standard" placeholder="Custom" sx={{ width: '70%' }} onChange={(e) => setCustomGender(e.target.value)}/>
            <FormControlLabel value={customGender} control={<Radio sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} label="" />
          </Box>
        </RadioGroup>
        </Box>
      </Modal>
    </Box>
    <Box>

    </Box>
    </>
  );
};

export default Ads;
