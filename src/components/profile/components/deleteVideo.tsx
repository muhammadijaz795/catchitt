import style from './blockUser.module.scss';

function DeleteVideo({ onclose, popupH, userId, info }: any) {
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const deleteVideo = async () => {
        const res: any = await fetch(`${API_KEY}/media-content/${info?.mediaId}`, {
            method: 'DELETE',
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
            <p className={style.title}>{`Delete video ?`}</p>
            <p className={style.desc}>Your video will be permanently deleted.</p>
            <button onClick={deleteVideo} className={style.block}>
                Delete
            </button>
            <button onClick={onclose} className={style.cancel}>
                Cancel
            </button>
        </div>
    );
}

export default DeleteVideo;
