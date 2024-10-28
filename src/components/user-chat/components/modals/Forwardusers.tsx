import { ClickAwayListener, Modal } from '@mui/material';
import { avatar } from '../../../../icons';
import Search from '../../../../shared/navbar/components/Search';
import style from './forwardUsers.module.scss';
import { useState } from 'react';

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
                                <div key={i} className={style.user}>
                                    <div className={style.sec1}>
                                        <input
                                            onChange={() => selectUserHandler(user)}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                background: 'rgb(255, 59, 92)',
                                                borderRadius: 4,
                                                cursor: 'pointer',
                                                margin: '1rem',
                                                marginRight: '0rem',
                                            }}
                                            type="checkbox"
                                        />
                                        <img src={avatar} alt="" />
                                        <p>{user?.name}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            {selecedUsers.map((user: any, index: number) => {
                                return (
                                    <span className={style.text_500}>
                                        {user.name}
                                        {selecedUsers?.length === index + 1 ? '' : ' , '}
                                    </span>
                                );
                            })}
                            {/* <p className={style.text_400}>Mohamed Forag</p> */}
                        </div>
                        <button
                            className={style.primaryBtn}
                            style={{ position: 'relative', zIndex: 1, cursor: 'pointer' }}
                        >
                            Forward
                        </button>
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    );
}

export default Forwardusers;
