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
import { AccountCircle, AccountCircleOutlined, DonutSmallRounded, NotificationsNoneOutlined, NotificationsOffOutlined, Phone, SearchOutlined, ThumbUpAlt, VideoCall, Link, FileCopy, Image, Block, Report } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeColorPicker } from './ThemeColorPicker';
import { EditNickName } from './EditNickName';
import { Modal } from './Modal';
import { CUSTOMIZE_COMPONENT } from '../../../utils/constants';
import { CustomEmojis } from './CustomEmojis';


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

function ProfileSec({ data, onClose, isDarkTheme, searchMessage, manipulateUsers, manipulateActiveUser }: any) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState(CUSTOMIZE_COMPONENT.THEME_COLOR_PICKER);

    const allCustomizeComponents: { [key in CUSTOMIZE_COMPONENT]: JSX.Element } = {
        [CUSTOMIZE_COMPONENT.THEME_COLOR_PICKER]: <ThemeColorPicker isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} currentColor={data?.themeColor} onColorSelect={(color) => updateSettings({ 'themeColor': color })} />,
        [CUSTOMIZE_COMPONENT.EMOJI_PICKER]: <CustomEmojis emoji={data?.emoji} isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} onEmojiChange={(emoji: any) => updateSettings({ 'emoji': emoji })} />,
        [CUSTOMIZE_COMPONENT.EDIT_NICKNAME]: <EditNickName currentNickName={data?.nickName} isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} onUpdateNickName={(nickName: any) => updateSettings({ 'nickName': nickName })} />,
        [CUSTOMIZE_COMPONENT.MEDIA]: <EditNickName currentNickName={data?.nickName} isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} onUpdateNickName={(nickName: any) => updateSettings({ 'nickName': nickName })} />,
        [CUSTOMIZE_COMPONENT.FILES]: <EditNickName currentNickName={data?.nickName} isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} onUpdateNickName={(nickName: any) => updateSettings({ 'nickName': nickName })} />,
        [CUSTOMIZE_COMPONENT.LINKS]: <EditNickName currentNickName={data?.nickName} isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} onUpdateNickName={(nickName: any) => updateSettings({ 'nickName': nickName })} />,
        [CUSTOMIZE_COMPONENT.MUTE_NOTIFICATION]: <EditNickName currentNickName={data?.nickName} isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} onUpdateNickName={(nickName: any) => updateSettings({ 'nickName': nickName })} />,
        [CUSTOMIZE_COMPONENT.RESTRCIT]: <EditNickName currentNickName={data?.nickName} isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} onUpdateNickName={(nickName: any) => updateSettings({ 'nickName': nickName })} />,
        [CUSTOMIZE_COMPONENT.BLOCK]: <EditNickName currentNickName={data?.nickName} isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} onUpdateNickName={(nickName: any) => updateSettings({ 'nickName': nickName })} />,
        [CUSTOMIZE_COMPONENT.REPORT]: <EditNickName currentNickName={data?.nickName} isDarkTheme={isDarkTheme} onClose={() => setIsModalOpen(false)} onUpdateNickName={(nickName: any) => updateSettings({ 'nickName': nickName })} />,
    }

    const updateSettings = async (parameters: any) => {
        try {
            if (!data?.conversationId) return;
            let response = await fetch("https://prodapi.seezitt.com/chat/conversation/update", {
                method: "PATCH",
                body: JSON.stringify({
                    'conversationId': data.conversationId,
                    ...parameters
                }),
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (!response.ok) return;
            let resp = await response.json();
            console.log('🥳🥳🚀🚀🚀',resp);
            manipulateUsers((users:any)=>{
                let newUsers = users.map((user:any)=>{
                    if(user.conversationId === data.conversationId){
                        return {...user,...parameters}
                    }
                    return user;
                }
                )
                return newUsers;
            })
            manipulateActiveUser((user:any)=>{
                return {...user,...parameters}
            })
        } catch (error) {
            console.log(error);
        }
    }

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

    const switchActiveComponent = (component: CUSTOMIZE_COMPONENT) => {
        setActiveComponent(component);
        setIsModalOpen(true);
    }

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
                    <span className='text-sm'>{data.nickName}</span>
                </div>
                <div className='flex gap-3 justify-center items-center mt-4'>
                    <div className='flex flex-col items-center cursor-pointer' onClick={() => navigate(`/profile/${data.userId}`)}>
                        <span className={`${isDarkTheme ? 'bg-gray-500' : 'bg-slate-100'} p-1 shadow-md rounded-full`}><AccountCircleOutlined sx={{ fontSize: '27px' }} /></span>
                        <span className='ml-2 text-sm mt-1'>Profile</span>
                    </div>
                    <div className='flex flex-col items-center cursor-pointer' onClick={() => updateSettings({'mute':data.mute?false:true})}>
                        <span className={`${isDarkTheme ? 'bg-gray-500' : 'bg-slate-100'} p-1 shadow-md rounded-full`}>{data.mute? <NotificationsOffOutlined sx={{ fontSize: '27px' }} /> :<NotificationsNoneOutlined sx={{ fontSize: '27px' }} />}</span>
                        <span className='ml-2 text-sm mt-1'>Mute</span>
                    </div>
                    <div className='flex flex-col items-center cursor-pointer' onClick={(e) => { searchMessage(true), onClose() }}>
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
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.THEME_COLOR_PICKER)} className='cursor-pointer'><DonutSmallRounded sx={{ fontSize: '25px' }} /> &nbsp; Change Theme</li>
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.EMOJI_PICKER)} className='cursor-pointer'><ThumbUpAlt sx={{ fontSize: '25px' }} /> &nbsp; Change Emoji</li>
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.EDIT_NICKNAME)} className='cursor-pointer'> <span className='font-semibold'>Aa</span> &nbsp; Edit Nicknames</li>
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
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.MEDIA)} className='cursor-pointer'><Image sx={{ fontSize: '25px' }} /> &nbsp;Media</li>
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.FILES)} className='cursor-pointer'><FileCopy sx={{ fontSize: '25px' }} /> &nbsp;Files</li>
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.LINKS)} className='cursor-pointer'><Link sx={{ fontSize: '25px' }} /> &nbsp;Links</li>
                        </ul>
                    </details>
                    <details className='mt-2'>
                        <summary>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <p className={isDarkTheme ? 'text-white' : ''}>Privacy and Support</p>
                                <span className="marker" style={{ fontSize: '2rem' }}>&rsaquo;</span>
                            </div>
                        </summary>
                        <ul className='mt-2 space-y-4 text-left'>
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.MUTE_NOTIFICATION)} className='cursor-pointer'><NotificationsOffOutlined sx={{ fontSize: '25px' }} /> &nbsp;Mute Notifications</li>
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.RESTRCIT)} className='cursor-pointer'><AccountCircle sx={{ fontSize: '25px' }} /> &nbsp;Restrict</li>
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.BLOCK)} className='cursor-pointer'><Block sx={{ fontSize: '25px' }} /> &nbsp;Block</li>
                            <li onClick={() => switchActiveComponent(CUSTOMIZE_COMPONENT.REPORT)} className='cursor-pointer'><Report sx={{ fontSize: '25px' }} /> &nbsp;Report</li>
                        </ul>
                    </details>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isDarkTheme={isDarkTheme}>
                {allCustomizeComponents[activeComponent]}
            </Modal>
        </div>
    );
}

export default ProfileSec;
