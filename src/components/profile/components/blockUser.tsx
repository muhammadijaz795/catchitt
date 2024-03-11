import React, { useState } from 'react';
import style from './blockUser.module.scss';
import { useAuthStore } from '../../../store/authStore';

function BlockUser({ onclose, popupH, userId }: any) {
    const API_KEY = process.env.VITE_API_URL;
    const token = useAuthStore((state) => state.token);
    const blockUser = async () => {
        const res: any = await fetch(`${API_KEY}/profile/${userId?.id}/block`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
            popupH(true);
        } else {
            popupH(false);
        }
    };
    return (
        <div className={style.parent}>
            <p className={style.title}>{`Block ${userId?.name} ?`}</p>
            <p className={style.desc}>
                They will not be able to send you messages, see your posts, or find your profile.
                This doesn't include extended scenarios like multi-host livestreams, duets posted by
                others, or group chats you both participate in. They will not be notified that you
                blocked them.
            </p>
            <button onClick={blockUser} className={style.block}>
                Block
            </button>
            <button onClick={onclose} className={style.cancel}>
                Cancel
            </button>
        </div>
    );
}

export default BlockUser;
