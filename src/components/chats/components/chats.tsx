import React, { useState } from 'react';
import { addChat } from '../../../icons';
import Search from '../../../shared/navbar/components/Search';
// import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import UserChat from './chat';
import style from './chats.module.scss';
import ResponsiveDialog from './ResponsiveDialog';

function UserChats({ data, OnChatClick, id, onUsersInputChangeHandler }: any) {
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

  const handleOpenSettingsDialog = () => {
    setOpenSettingsDialog(true);
  };

  const handleCloseSettingsDialog = () => {
    setOpenSettingsDialog(false);
  };

  return (
    <div className={style.chats}>
      <div className={style.chatHeader}>
        <p className={style.headingText}>Messages</p>
        <ResponsiveDialog 
        // open={openSettingsDialog} 
        // onClose={handleCloseSettingsDialog} 
        />
      </div>
      {/* <div className={style.chatSearch}>
        <Search onInputChangeHandler={onUsersInputChangeHandler} placeholder={'Search'} />
      </div> */}
      {/* <div className={style.chatBlankMessage}>
        No messages yet
      </div> */}
      <div className={style.userChats}>
        {data?.map((chat: any, index: number) => {
          return <UserChat id={id} {...chat} OnChatClick={OnChatClick} />;
        })}
      </div>
    </div>
  );
}

export default UserChats;