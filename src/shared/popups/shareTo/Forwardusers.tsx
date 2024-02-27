import { ClickAwayListener, Modal } from '@mui/material';
import style from './forwardUsers.module.scss';
import { useState } from 'react';
import { avatar, duet, sendSvgPopup } from '../../../icons';
import Search from '../../navbar/components/Search';

function Forwardusers(props: any) {
    const { onOpen, onClose } = props || {};
    const [selecedUsers, setSelecedUsers] = useState<any[]>([]);
    const data = [
        {
            name: 'Mohamed',
            id: 1,
            dropdown: false,
        },
        {
            name: 'Farag',
            id: 2,
            dropdown: false,
        },
        {
            name: 'Mohamed',
            id: 3,
            dropdown: false,
        },
        {
            name: 'ahmad',
            id: 4,
            dropdown: false,
        },
        {
            name: 'Enorisa',
            id: 5,
            dropdown: false,
        },
        {
            name: 'Mohamed Farag',
            id: 6,
            dropdown: false,
        },
        {
            name: 'Enorisa',
            id: 7,
            dropdown: false,
        },
    ];
    const [users, setusers] = useState<any[]>(data);

    const selectUserHandler = (receivedUser: any) => {
        if (selecedUsers.find((user: any) => user?.id === receivedUser?.id)) {
            let filterData: any = selecedUsers.filter((user: any) => user?.id !== receivedUser?.id);
            setSelecedUsers(filterData);
        } else {
            setSelecedUsers([...selecedUsers, receivedUser]);
        }
    };

    const onchangeH = (e: any) => {
        if (e.length > 0) {
            const filteredUsers: any[] = data?.filter((user: any) =>
                user?.name?.toLowerCase().includes(e.toLowerCase())
            );

            setusers(filteredUsers);
        } else {
            setusers(data);
        }
    };

    return (
        <Modal
            open={onOpen}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ClickAwayListener onClickAway={onClose}>
                <div className={style.parent}>
                    <div>
                        <Search
                            onInputChangeHandler={onchangeH}
                            placeholder="Search accounts and videos"
                        />
                    </div>
                    <div className={style.users}>
                        {users.map((user: any, i: number) => {
                            return (
                                <div className={style.user}>
                                    <div className={style.sec1}>
                                        <img src={avatar} alt="" />
                                        <p>{user?.name}</p>
                                    </div>
                                    <div className={style.btns}>
                                        <button className={style.btn1}>
                                            <img src={duet} alt="" />
                                            Duet
                                        </button>
                                        <button className={style.primaryBtn}>
                                            <img src={sendSvgPopup} alt="" />
                                            Send
                                        </button>
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

export default Forwardusers;
