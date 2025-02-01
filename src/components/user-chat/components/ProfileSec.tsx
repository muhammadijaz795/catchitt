import { useEffect, useState } from 'react';
import {
    avatar,
    cross,
    crossClose,
    crossCloseDark,
    defaultAvatar,
    deleteMsg,
    editInStaredMsg,
    forwardMsg,
    rightArrow,
    starMsg,
    unStarMsg,
} from '../../../icons';
import Search from '../../../shared/navbar/components/Search';
import style from './stared.module.scss';
import { AccountCircle, AccountCircleOutlined, DonutSmallRounded, NotificationsNoneOutlined, Phone, SearchOutlined, ThumbUpAlt, VideoCall } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


// {
//     "userId": "670f5a3bf2e43d587fa69d1b",
//     "userName": "MD Imran 1",
//     "userImage": "https://cdn.seezitt.com/1735625434709-696ego7Qh3.jpeg",
//     "lastMsg": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     "ispined": false,
//     "lastSeen": "yesterday",
//     "unReadMsgs": 0,
//     "senderId": "670f5a3bf2e43d587fa69d1b",
//     "receiverId": "67346c674bbf9c55c014049f",
//     "conversationId": "6780cbbf09f4f975d3fb3ab0",
//     "isBlocked": false
// }

function ProfileSec({ data, onClose, isDarkTheme }: any) {
    const navigate = useNavigate();
    useEffect(() => {
        const details = document.querySelectorAll("details");

        const callbackFunc = (event: Event) => {
            const targetDetail = event.currentTarget as HTMLDetailsElement;

            const marker = targetDetail.querySelector('.marker') as HTMLElement;

            if (targetDetail.open) {
                marker.style.transform = 'rotate(90deg)';
            } else {
                marker.style.transform = 'rotate(0deg)';
            }

            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                    const otherMarker = detail.querySelector('.marker') as HTMLElement;
                    if (otherMarker) {
                        otherMarker.style.transform = 'rotate(0deg)';
                    }
                }
            });
        };

        details.forEach((detail) => {
            detail.addEventListener("toggle", callbackFunc);
        });

        return () => {
            details.forEach((detail) => {
                detail.removeEventListener("toggle", callbackFunc);
            });
        };
    }, []);

    return (
        <div className={style.parent}>
            <div className={style.header}>
                <div>
                    <img onClick={onClose} src={isDarkTheme ? crossClose : crossCloseDark} alt="" />
                </div>
            </div>
            <div className={style.contentParent}>
                <div className='flex flex-col items-center'>
                    <img className='w-32 rounded-full' src={data.userImage || defaultAvatar} alt="avatar" />
                    <span className='text-xl font-bold mt-4'>{data.userName}</span>
                </div>
                <div className='flex gap-3 justify-center items-center mt-4'>
                    <div className='flex flex-col items-center cursor-pointer' onClick={() => navigate(`/profile/${data.userId}`)}>
                        <span className={`${isDarkTheme ? 'bg-gray-500' : 'bg-slate-100'} p-1 shadow-md rounded-full`}><AccountCircleOutlined sx={{ fontSize: '27px' }} /></span>
                        <span className='ml-2 text-sm mt-1'>Profile</span>
                    </div>
                    <div className='flex flex-col items-center cursor-pointer'>
                        <span className={`${isDarkTheme ? 'bg-gray-500' : 'bg-slate-100'} p-1 shadow-md rounded-full`}><NotificationsNoneOutlined sx={{ fontSize: '27px' }} /></span>
                        <span className='ml-2 text-sm mt-1'>Mute</span>
                    </div>
                    <div className='flex flex-col items-center cursor-pointer'>
                        <span className={`${isDarkTheme ? 'bg-gray-500' : 'bg-slate-100'} p-1 shadow-md rounded-full`}><SearchOutlined sx={{ fontSize: '27px' }} /></span>
                        <span className='ml-2 text-sm mt-1'>Search</span>
                    </div>
                </div>
                {/* dropdown section start */}
                <div className='mt-4 px-2'>
                    <details>
                        <summary>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <p className={isDarkTheme ? 'text-white' : ''}>Customize Chat</p>
                                <span className="marker" style={{ fontSize: '2rem' }}>&rsaquo;</span>
                            </div>
                        </summary>
                        <ul className='mt-2 space-y-4 text-left'>
                            <li className='cursor-pointer'><DonutSmallRounded sx={{ fontSize: '25px' }} /> &nbsp; Change Theme</li>
                            <li className='cursor-pointer'><ThumbUpAlt sx={{ fontSize: '25px' }} /> &nbsp; Change Emoji</li>
                            <li className='cursor-pointer'> <span className='font-semibold'>Aa</span> &nbsp; Edit Nicknames</li>
                        </ul>
                    </details>
                    <details className='mt-2'>
                        <summary>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <p className={isDarkTheme ? 'text-white' : ''}>Media and files</p>
                                <span className="marker" style={{ fontSize: '2rem' }}>&rsaquo;</span>
                            </div>
                        </summary>
                        <ul className='mt-2 space-y-4 text-left'>
                            <li className='cursor-pointer'>Dummy</li>
                            <li className='cursor-pointer'>Dummy</li>
                            <li className='cursor-pointer'>Dummy</li>
                        </ul>
                    </details>
                </div>
            </div>

        </div>
    );
}

export default ProfileSec;
