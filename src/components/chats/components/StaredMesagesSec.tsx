import { useEffect, useState } from 'react';
import { avatar, editInStaredMsg, rightArrow, starMsg } from '../../../icons';
import Search from '../../../shared/navbar/components/Search';
import useChat from '../hook/useChat';
import useStaredMesages from '../hook/useStaredMesages';
import style from './stared.module.scss';
function StaredMesagesSec({ showEmptyContainer, staredMsgs: staredMsgsList , onBack }: any) {
    const [staredMsgs, setstaredMsgs] = useState<any[]>([]);
    useEffect(() => {
        const isR: any[] = [];
        const isNR: any[] = [];
        staredMsgsList?.forEach((element: any) => {
            element.chats.forEach((chat: any) => {
                console.log();
                if (chat?.isrecevied) {
                    isR.push(chat);
                } else {
                    isNR.push(chat);
                }
            });
        });

        setstaredMsgs([
            {
                userName: staredMsgsList[1]?.userName,
                userId: staredMsgsList[1]?.userId,
                chats: isR,
            },
            {
                userName: 'You',
                userId: staredMsgsList[1]?.userId,
                chats: [...isNR],
            },
        ]);
    }, [staredMsgsList]);

    return (
        <div className={style.parent}>
            <div className={style.header}>
                <div>
                    <img onClick={onBack}  src={rightArrow} alt="" />
                    <p>Starred messages</p>
                </div>
                {!showEmptyContainer && staredMsgs.length !== 0 && (
                    <img style={{ cursor: 'pointer' }} src={editInStaredMsg} alt="" />
                )}
            </div>
            {!showEmptyContainer && staredMsgs.length > 0 && (
                <div className={style.contentParent}>
                    <div>
                        <Search placeholder="Search" />
                    </div>
                    <div className={style.staredMsgsParent}>
                        {staredMsgs.map((chats: any, index: number) => {
                            return (
                                <div key={index}>
                                    {chats?.chats.length > 0 && (
                                        <div className={style.msgParent}>
                                            <div>
                                                <img className={style.avatar} src={avatar} alt="" />
                                                <p className={style.text_500}>{chats.userName}</p>
                                            </div>
                                            <p className={style.gray_300}>11:14 PM</p>
                                        </div>
                                    )}
                                    <div className={style.staredChats}>
                                        {chats?.chats?.map((chat: any, index2: number) => {
                                            return (
                                                <div key={index2} className={style.chat}>
                                                    <div>
                                                        <p
                                                            className={
                                                                chat.isreceived
                                                                    ? style.isreceived
                                                                    : style.userstarMsg
                                                            }
                                                        >
                                                            {chat.msg}
                                                        </p>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                gap: '0.38rem',
                                                                justifyContent: 'flex-end',
                                                                marginTop: '0.5rem',
                                                            }}
                                                        >
                                                            <img src={starMsg} alt="" />
                                                            <p className={style.gray_300}>
                                                                11:14 AM
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <img src={rightArrow} alt="" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {showEmptyContainer ||
                (staredMsgs.length === 0 && (
                    <div className={style.emptyContainer}>
                        <img src={starMsg} alt="" />
                        <p className={style.text_500}>No Starred Messages</p>
                        <p className={style.text_400}>
                            Tap and hold on any message to star it, so you can easily find it later.
                        </p>
                    </div>
                ))}
        </div>
    );
}

export default StaredMesagesSec;
