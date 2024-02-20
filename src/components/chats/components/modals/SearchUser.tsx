import { Button, ClickAwayListener, Modal } from '@mui/material';
import style from './SearchUser.module.scss';
import Search from '../../../../shared/navbar/components/Search';
import { avatar, threeDotsInChatModalPopup as moreOptions } from '../../../../icons';
import { useState } from 'react';
import SimpleListMenu from './Btn';

function SearchUser(props: any) {
    const { onOpen, onClose, blockPopupHandler, reportPopupHandler } = props || {};
    // const [dropdown, setDropdown] = useState(false);

    const data = [
        {
            name: 'Mohamed Farag',
            id: 1,
            dropdown: false,
        },
        {
            name: 'Mohamed Farag',
            id: 2,
            dropdown: false,
        },
        {
            name: 'Mohamed Farag',
            id: 3,
            dropdown: false,
        },
        {
            name: 'Mohamed Farag',
            id: 4,
            dropdown: false,
        },
        {
            name: 'Mohamed Farag',
            id: 5,
            dropdown: false,
        },
        {
            name: 'Mohamed Farag',
            id: 6,
            dropdown: false,
        },
        {
            name: 'Mohamed Farag',
            id: 7,
            dropdown: false,
        },
    ];

    const dropdownHandler = (user: any) => {};

    return (
        <Modal
            open={onOpen}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ClickAwayListener onClickAway={onClose}>
                <div className={style.parent}>
                    <div>
                        <Search placeholder="Search" />
                    </div>
                    <div className={style.users}>
                        {data.map((user: any, i: number) => {
                            return (
                                <div className={style.user}>
                                    <div className={style.sec1}>
                                        <img src={avatar} alt="" />
                                        <p>Mohamed Farag</p>
                                    </div>
                                    <div className={style.sec2}>
                                        <button style={{ position: 'relative', zIndex: 1 , cursor:'pointer'}}>
                                            Message
                                        </button>
                                        <div
                                            style={{ position: 'relative' }}
                                            onClick={() => dropdownHandler(user)}
                                        >
                                            <img
                                                style={{ position: 'relative', zIndex: -1 }}
                                                src={moreOptions}
                                                alt=""
                                            />
                                            <SimpleListMenu
                                                blockPopupHandler={blockPopupHandler}
                                                reportPopupHandler={reportPopupHandler}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    );
}

export default SearchUser;
