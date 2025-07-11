import { useState, useEffect } from 'react';
import CustomButton from '../../../shared/buttons/CustomButton';
import style from '../index.module.scss';
import DndContainer from './DndContainer';
import { Box, Button, Typography, Paper } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
    VideocamOutlined,
    VideoFileOutlined,
    FourKOutlined,
    CropOutlined,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function UploadFile({ changeFileHandler }: any) {
    const [darkTheme, setdarkTheme] = useState('');
    const [lightTheme, setlightTheme] = useState('bg-custom-light');
    const { t: translate } = useTranslation();

    useEffect(() => {
        // var themeColor = window.localStorage.getItem('theme');
        // setlightTheme('bg-custom-light');
        // if (themeColor == 'dark') {
        //     setdarkTheme(style.darkTheme);
        //     setlightTheme('');
        // } else {
        //     setlightTheme('bg-custom-light');
        // }
    });

   

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center px-5 gap-2.5">
            <div className={`w-[calc(100%-14rem)] ml-auto bg-white h-4/6 flex flex-col items-center px-[1rem] py-[1.5rem] gap-4 justify-center shadow-sm rounded-2xl`}>
                <DndContainer
                    className="w-full h-full cursor-pointer"
                    text={translate('Select video to upload')}
                    orText={translate('drag and drop it here')}
                    accept="video/*"
                    onChangeFile={changeFileHandler}
                >
                    <CustomButton
                        text={translate('Select video')}
                        width="16.938rem !important"
                        rounded="0.5rem"
                    />
                </DndContainer>
                <div className="w-full flex items-center justify-around">
                    <div className="relative flex items-start flex-row text-left gap-1.5 pl-10">
                        <svg className='w-6 pt-1' width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.08968 0.75C2.24885 0.75 0.756348 2.24165 0.756348 4.08165C0.756348 5.08998 1.1905 5.98252 1.89883 6.59335C1.1905 7.20421 0.756348 8.07001 0.756348 9.07831V12.41C0.756348 14.2492 2.24885 15.75 4.08968 15.75H9.92213C11.6538 15.75 13.093 14.435 13.2563 12.7475L15.9896 15.5067C16.5146 16.0317 17.4221 15.65 17.4221 14.9083V6.57997C17.4221 6.20914 17.1913 5.91918 16.9013 5.79918C16.6113 5.67918 16.2521 5.71914 15.9896 5.98081C15.6413 6.32914 14.3688 7.65411 13.2496 8.77331C13.1438 7.68661 12.543 6.75581 11.6471 6.22831C12.1513 5.64498 12.4221 4.91248 12.4221 4.08165C12.4221 2.24165 10.9296 0.75 9.08884 0.75C8.08051 0.75 7.20051 1.21336 6.58968 1.92085C5.97801 1.21336 5.09801 0.75 4.08968 0.75ZM4.08968 2.41585C5.00968 2.41585 5.75635 3.16165 5.75635 4.08165C5.75635 5.00082 5.00968 5.74664 4.08968 5.74664C3.16885 5.74664 2.42301 5.00165 2.42301 4.08165C2.42301 3.16165 3.16885 2.41585 4.08968 2.41585ZM9.08884 2.41585C10.0096 2.41585 10.7555 3.16165 10.7555 4.08165C10.7555 5.00082 10.0096 5.74664 9.08884 5.74664C8.16884 5.74664 7.42301 5.00165 7.42301 4.08165C7.42301 3.16165 8.16884 2.41585 9.08884 2.41585Z" fill="black"/>
                        </svg>
                        <div>
                            <p className="font-semibold text-sm">{translate('Size and duration')}</p>
                            <p className="text-gray-500 text-xs">{translate('Maximum size 10GB, video duration 60 minutes')}</p>
                        </div>
                    </div>
                    <div className="relative flex flex-row items-start text-left gap-1.5 pl-10">
                        <svg className='w-6 pt-1' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.51855 0.5625C1.1378 0.5625 0.0185547 1.68166 0.0185547 3.0625V4.72916V12.2292C0.0185547 14.07 1.51096 15.5625 3.35188 15.5625H11.6852C13.5261 15.5625 15.0185 14.07 15.0185 12.2292V4.72916C15.0185 4.26916 14.6455 3.89583 14.1852 3.89583C14.1852 3.89583 11.7662 3.89583 10.0185 3.89583C9.38961 3.89583 9.1873 3.69166 8.6904 2.69749C7.9373 1.19166 7.3063 0.5625 5.85188 0.5625H2.51855ZM2.51855 2.22916H5.85188C6.4808 2.22916 6.68314 2.43333 7.18005 3.4275C7.28879 3.645 7.33388 3.71416 7.44038 3.89583C4.5688 3.89583 2.50605 3.89583 1.68521 3.89583V3.0625C1.68521 2.6025 2.05831 2.22916 2.51855 2.22916ZM5.85188 8.89581H9.1852C9.6455 8.89581 10.0185 9.26921 10.0185 9.72921C10.0185 10.1892 9.6455 10.5625 9.1852 10.5625H5.85188C5.39163 10.5625 5.01855 10.1892 5.01855 9.72921C5.01855 9.26921 5.39163 8.89581 5.85188 8.89581Z" fill="black"/>
                        </svg>
                        <div>
                            <p className="font-semibold text-sm">{translate('File formats')}</p>
                            <p className="text-gray-500 text-xs">{translate("Recommended: '.mp4' but other major formats are supported.")}</p>
                        </div>
                    </div>
                    <div className="relative flex flex-row items-start text-left gap-1.5 pl-10">
                        <svg className='w-6 pt-0.5' width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.84521 4.07031C2.80968 4.07031 1.97021 4.92657 1.97021 5.98281V17.4578C1.97021 18.514 2.80968 19.3703 3.84521 19.3703H18.0952C19.1307 19.3703 19.9702 18.514 19.9702 17.4578V5.98281C19.9702 4.92657 19.1307 4.07031 18.0952 4.07031H3.84521Z" fill="black"/>
                            <path d="M6.2427 13.7219C5.94986 13.7219 5.75387 13.5132 5.75387 13.1899V10.9094H5.73542L5.38263 11.1792C5.29962 11.2428 5.24659 11.2632 5.15435 11.2632C4.97219 11.2632 4.83154 11.113 4.83154 10.8992C4.83154 10.7491 4.88688 10.6269 5.016 10.5302L5.62013 10.0848C5.81382 9.94224 5.98214 9.92188 6.17122 9.92188C6.52401 9.92188 6.73154 10.156 6.73154 10.5251V13.1899C6.73154 13.5132 6.53554 13.7219 6.2427 13.7219Z" fill="white"/>
                            <path d="M8.91731 13.7219C8.0431 13.7219 7.49121 13.0038 7.49121 11.8144C7.49121 10.6175 8.04973 9.92188 8.91731 9.92188C9.78489 9.92188 10.3412 10.615 10.3412 11.8119C10.3412 12.9988 9.79152 13.7219 8.91731 13.7219ZM8.91731 12.909C9.2043 12.909 9.38753 12.5674 9.38753 11.8144C9.38753 11.0589 9.2043 10.7347 8.91731 10.7347C8.63032 10.7347 8.44489 11.0589 8.44489 11.8144C8.44489 12.5674 8.63032 12.909 8.91731 12.909Z" fill="white"/>
                            <path d="M12.525 13.7219C11.6763 13.7219 11.1011 13.2927 11.1011 12.6465C11.1011 12.1475 11.4427 11.8181 11.9012 11.7358V11.7158C11.5022 11.6285 11.2157 11.3191 11.2157 10.9149C11.2157 10.3385 11.7447 9.92188 12.525 9.92188C13.3052 9.92188 13.8342 10.3385 13.8342 10.9174C13.8342 11.3141 13.5477 11.6285 13.1531 11.7158V11.7358C13.6116 11.8181 13.9511 12.15 13.9511 12.649C13.9511 13.2927 13.3692 13.7219 12.525 13.7219ZM12.525 11.4289C12.7498 11.4289 12.9129 11.2642 12.9129 11.0247C12.9129 10.7852 12.7476 10.623 12.525 10.623C12.3023 10.623 12.1392 10.7852 12.1392 11.0247C12.1392 11.2642 12.3001 11.4289 12.525 11.4289ZM12.525 13.0183C12.7873 13.0183 12.9636 12.8286 12.9636 12.5691C12.9636 12.3146 12.7873 12.13 12.525 12.13C12.2627 12.13 12.0863 12.3146 12.0863 12.5691C12.0863 12.8286 12.2627 13.0183 12.525 13.0183Z" fill="white"/>
                            <path d="M16.137 13.7219C15.2628 13.7219 14.7109 13.0038 14.7109 11.8144C14.7109 10.6175 15.2694 9.92188 16.137 9.92188C17.0046 9.92188 17.5609 10.615 17.5609 11.8119C17.5609 12.9988 17.0112 13.7219 16.137 13.7219ZM16.137 12.909C16.424 12.909 16.6072 12.5674 16.6072 11.8144C16.6072 11.0589 16.424 10.7347 16.137 10.7347C15.85 10.7347 15.6646 11.0589 15.6646 11.8144C15.6646 12.5674 15.85 12.909 16.137 12.909Z" fill="white"/>
                        </svg>
                        {/* <FourKOutlined className="text-gray-300 absolute left-2.5 -top-0.5"/> */}
                       <div>
                        <p className="font-semibold text-sm">{translate('Video resolutions')}</p>
                            <p className="text-gray-500 text-xs">{translate('Minimum resolution: 720p, 2K adn 4K supported')}</p>
                       </div>
                    </div>
                    <div className="relative flex flex-row items-start text-left gap-1.5 pl-10">
                    <svg className='w-5 pt-1' width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.4078 0.699219C3.18613 0.699219 0.574463 3.31088 0.574463 6.53255C0.574463 7.56421 0.852793 8.54671 1.35612 9.42341C1.36529 9.44001 2.93446 11.9059 3.07446 12.3659H9.7411C9.8786 11.9084 11.4428 9.46001 11.4336 9.47501C11.9528 8.58921 12.2411 7.58091 12.2411 6.53255C12.2411 3.31088 9.6295 0.699219 6.4078 0.699219ZM6.4078 4.03255C6.8678 4.03255 7.2411 4.40588 7.2411 4.86588C7.2411 5.32588 6.8678 5.69922 6.4078 5.69922C5.9478 5.69922 5.57446 6.07255 5.57446 6.53255C5.57446 6.99255 5.20113 7.36591 4.74113 7.36591C4.28113 7.36591 3.9078 6.99255 3.9078 6.53255C3.9078 5.15172 5.02696 4.03255 6.4078 4.03255ZM3.07446 14.0325C3.07446 15.8734 4.56696 17.3659 6.4078 17.3659C8.2486 17.3659 9.7411 15.8734 9.7411 14.0325H3.07446Z" fill="black"/>
                    </svg>

                        {/* <CropOutlined className="text-gray-300 absolute left-2.5 -top-0.5" /> */}
                        <div>
                            <p className="font-semibold text-sm">{translate('Aspect Ratios')}</p>
                            <p className="text-gray-500 text-xs">{translate('Recommended: 16:9 for landscape, 9:16 for vertical')}</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="w-[calc(100%-14rem)] text-left ml-auto">
                <Paper 
                        elevation={0}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid #eee',
                            backgroundColor: '#fff',
                        }}
                        >
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600}>{translate('Create high quality videos on CapCut Online')}</Typography>
                            <Typography fontSize={'12px'} color="text.secondary">{translate('Automatically shorten your videos and create videos from scripts with AI-powered features.')}</Typography>
                        </Box>
                        <Box 
                            component="a" 
                            href='https://www.capcut.com/' 
                            target='_blank'
                            className='flex py-2'
                            sx={{ 
                                textTransform: 'none', 
                                fontWeight: 500, 
                                backgroundColor: '#0000000D', 
                                color: '#000', 
                                px: 2,
                                '&:hover': {
                                    background: 'rgba(0,0,0,.1)',
                                    color: '#000' // optional: change text color for contrast
                                }
                            }}
                        >
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9616 5.25653V3.45437L11.7297 4.59363V4.52701C11.7297 3.80415 11.2001 3.37109 10.4339 3.37109H3.36516C2.55902 3.37109 2.06934 3.80415 2.06934 4.52368V6.34583L5.19064 7.91814L2.06934 9.50044V11.3193C2.06934 12.0321 2.55902 12.4652 3.36849 12.4652H10.4306C11.1967 12.4652 11.7297 12.0321 11.7297 11.3259V11.2326L13.9616 12.3852V10.5531L8.77497 7.92147L13.9583 5.25987L13.9616 5.25653ZM6.97281 8.81422L10.8037 10.7663H3.13198L6.97948 8.81422H6.97281ZM10.777 5.06666L6.97281 7.00873L3.12532 5.06666H10.777Z" fill="black"/>
                            </svg>

                            {translate('Try now')}
                        </Box>
                </Paper>
            </div>
        </div>
    );
}

export default UploadFile;
