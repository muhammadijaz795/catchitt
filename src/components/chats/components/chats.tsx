import { addChat } from '../../../icons';
import Search from '../../../shared/navbar/components/Search';
import UserChat from './chat';
import style from './chats.module.scss';

function UserChats({ data, OnChatClick, id , onUsersInputChangeHandler}: any) {
    return (
        <div className={style.chats}>
            <div className={style.chatHeader}>
                <p className={style.headingText}>Chat</p>
                <img src={addChat} alt="" />
            </div>
            <div>
                <Search onInputChangeHandler={onUsersInputChangeHandler} placeholder={'Search'} />
            </div>
            <div className={style.userChats}>
                {data?.map((chat: any, index: number) => {
                    return <UserChat id={id} {...chat} OnChatClick={OnChatClick} />;
                })}
            </div>
        </div>
    );
}

export default UserChats;
