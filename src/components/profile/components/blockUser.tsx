import style from './blockUser.module.scss';

function BlockUser({ onclose, popupH, userId, darkTheme }: any) {
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
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
        <div className={`${style.parent} ${darkTheme?'bg-[#181818]':'bg-white'}`}>
            <p className={`${style.title} ${darkTheme?'text-white':''}`}>{`Block ${userId?.name} ?`}</p>
            <p className={`${style.desc} ${darkTheme?'text-white':''}`}>
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
