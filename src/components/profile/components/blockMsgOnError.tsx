import style from './blockUser.module.scss';

interface TYpes {
    onclose: any;
    darkTheme: boolean;
}
function BlockMsgOnError({ darkTheme, onclose }: TYpes) {
    return (
        <div className={`${style.parent3} ${darkTheme?'bg-[#181818]':'bg-white'}`}>
            <p>An error Occurred</p>
            <img src="../../../../public/images/icons/error.svg" alt="" />
            <p>Something went wrong.</p>
            <button onClick={onclose}>Done</button>
        </div>
    );
}

export default BlockMsgOnError;
