import React, { useState } from 'react';
import { addChat } from '../../../icons';
import Search from '../../../shared/navbar/components/Search';
// import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import UserChat from './chat';
import style from './chats.module.scss';
import ResponsiveDialog from './ResponsiveDialog';

function UserChats({ data, OnChatClick, id, userPinH, onBlock, setstaredmodal, isDarkTheme}: any) {
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

  const handleOpenSettingsDialog = () => {
    setOpenSettingsDialog(true);
  };

  const handleCloseSettingsDialog = () => {
    setOpenSettingsDialog(false);
  };

  console.log("data response", data);
  return (
    <div className={style.chats}>
      <div className={style.chatHeader}>
        <p className={style.headingText}>Messages</p>
        <ResponsiveDialog isDarkTheme={isDarkTheme} />
      </div>
      <div key={id} className={style.userChats}>
        {data?.map((chat: any, index: number) => {
          return <UserChat id={chat.conversationId}  key={chat.conversationId} {...chat} OnChatClick={OnChatClick} userPinH={userPinH} onBlock={onBlock}  setstaredmodal={setstaredmodal} isDarkTheme={isDarkTheme} />;
        })}
      </div>
    </div>
  );
}

export default UserChats;