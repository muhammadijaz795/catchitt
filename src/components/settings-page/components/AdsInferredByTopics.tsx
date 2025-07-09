import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Typography, Modal, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { styled } from "@mui/material";
import styles from '../account.module.scss';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
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

const AdsInferredByTopics: React.FC = () => {
  const { t, i18n } = useTranslation();  
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false); 
  const [openIntrest, setOpenIntrest] = useState(false); 
  const [openList, setOpenList] = useState(false); 
  const [gender, setGender] = useState("male");
  const [customGender, setCustomGender] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [allCategories, setAllCategories] = useState<{
    items: Topic[];
    isLoading: boolean;
    canLoadMore: boolean;
  }>({
    items: [],
    isLoading: false,
    canLoadMore: false,
  });
  interface Topic {
    _id: string;
    name: string;
  }
  
  // const [selectedTopic, setSelectedTopic] = useState({});
  const [selectedTopic, setSelectedTopic] = useState<Topic>({ _id: '', name: '' });

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
 const handleOpenInferred = () => setOpenIntrest(true);
 const handleCloseIntrest = () => {
    setOpenIntrest(false);
 };
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

  function openModalList(category: Topic)
  {
      setSelectedTopic(category);
      setOpenList(true);
  };

  useEffect(fetchCategories, []);

  return (
    <>
    <Box>
        <h4 className={`${darkTheme ? 'text-white' : 'text-black'} mb-0 font-semibold text-xl p-3`}>{t('ads.inferredBy')}</h4>
        <span className='text-left px-3 text-[#000000A6] d-block text-sm'>{t('ads.personalizedDescription')}</span>
        <span className='text-left px-3 text-[#000000A6] font-semibold d-block text-sm mt-3'>{t('ads.manageTopics')}</span>
        {allCategories.items.map((category, index) => (
        <div className="px-3" key={index}>
          <div className={styles.accountCards} onClick={() => openModalList(category)}>
              <div className={styles.settingName}>
                  <div className='text-left'>
                  <p className='d-flex mt-3 mb-1 font-medium'>{category?.name}</p>
                  </div>
              </div>
              <div className='d-flex'>
                  {/* <span className='text-md text-[#000] font-medium'>Inferred</span> */}
                  <svg style={{marginLeft: '4px'}} width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73018 5.86844L1.29921 0.437474C1.16905 0.3073 0.957981 0.3073 0.827814 0.437474L0.356414 0.90888C0.226247 1.03905 0.226247 1.25011 0.356414 1.38028L5.31598 6.33984L0.356414 11.2994C0.226247 11.4296 0.226247 11.6406 0.356414 11.7708L0.827814 12.2422C0.957981 12.3724 1.16905 12.3724 1.29921 12.2422L6.73018 6.81124C6.99055 6.55091 6.99055 6.12878 6.73018 5.86844Z" fill="#161823" fill-opacity="0.5"/>
                  </svg>
              </div>
          </div>
        </div>
        ))}
{/* modal for list */}
  <Modal open={openList} onClose={closeListModal} className={`${darkTheme}`} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={{ ...style,
                        bgcolor: darkTheme ? "#121212" : "background.paper",
                        color: darkTheme ? "#fff" : "#000",
                      }} >
            <span onClick={closeListModal}>
              <svg fill={`${darkTheme ? '#fff' : '#000'}`} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 'auto'}} width="2em" height="2em">
              <path d="M38.7 12.12a1 1 0 0 0 0-1.41l-1.4-1.42a1 1 0 0 0-1.42 0L24 21.17 12.12 9.3a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41L21.17 24 9.3 35.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0L24 26.83 35.88 38.7a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41L26.83 24 38.7 12.12Z"></path>
              </svg>
            </span>
            <Typography id="modal-modal-title" sx={{ textAlign: 'center'}} variant="h5" component="p">{selectedTopic?.name}</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '16px' }}>
              {t('ads.personalizedInferenceDelay')}
            </Typography>
            <RadioGroup value={isInterested} onChange={(event) => setIsInterested(event.target.value == 'true')}>
            <Box className="mt-3" display="flex" alignItems="center" justifyContent="space-between">
            <span>
                <Typography>{t('interested')}</Typography>
                <span className="text-sm">{t('show.more.ads')}</span>
              </span>
              <FormControlLabel value="true" control={<Radio sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} label="" />
            </Box>
            <Box className="mt-3" display="flex" alignItems="center" justifyContent="space-between">
              <span>
                <Typography>{t('not.interested')}</Typography>
                <span className="text-sm">{t('show.less.ads')}</span>
              </span>
              <FormControlLabel value="false" control={<Radio sx={{ color: '#FE2C55', '&.Mui-checked': { color: '#FE2C55' } }} />} label="" />
            </Box>
            
          </RadioGroup>
          </Box>
        </Modal>
    </Box>
    </>
  );
};

export default AdsInferredByTopics;
