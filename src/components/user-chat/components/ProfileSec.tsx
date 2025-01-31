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
import { Phone, VideoCall } from '@mui/icons-material';


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
    useEffect(() => {
      console.log("data response 👋🚀🚀", data);
    }, [data])
    
    return (
        <div className={style.parent}>
            <div className={style.header}>
                <div>
                    <img onClick={onClose} src={isDarkTheme?crossClose:crossCloseDark} alt="" />
                </div>
            </div>
            <div className={style.contentParent}>
                <div className='flex flex-col items-center'>
                    <img className='w-32 rounded-full' src={data.userImage||defaultAvatar} alt="avatar" />
                    <span className='text-xl font-bold mt-4'>{data.userName}</span>
                </div>
                {/* <div className='flex gap-3 justify-center items-center mt-4'>
                    <div className='flex flex-col items-center'>
                        <Phone sx={{fontSize:'27px'}}/>
                        <span className='ml-2 text-sm mt-1'>Audio</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <VideoCall sx={{fontSize:'30px'}} />
                        <span className='ml-2 text-sm mt-1'>Video</span>
                    </div>
                 
                </div> */}
            </div>
        </div>
    );
}

export default ProfileSec;
