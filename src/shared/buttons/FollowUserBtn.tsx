import style from './Follow.module.scss';
function FollowUserBtn(props: any) {
    const {
        width = '87px',
        height = '32px',
        bg = '#5448B2',
        padding = '0px 16px',
        redius = '4px',
        color = '#FFF',
    } = props || {};
    return (
        <button
            className={style.btn}
            style={{ width, height, background: bg, padding, borderRadius: redius, color }}
        >
            Follow
        </button>
    );
}

export default FollowUserBtn;
