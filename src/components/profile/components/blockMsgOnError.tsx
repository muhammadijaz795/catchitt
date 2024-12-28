import style from './blockUser.module.scss';

interface TYpes {
    onclose: any;
    darkTheme: boolean;
}
function BlockMsgOnError({ darkTheme, onclose }: TYpes) {
    return (
        <div className={`${style.parent3} ${darkTheme?'bg-[#181818]':'bg-white'}`}>
            <p className={darkTheme?'text-white':''}>An error Occurred</p>
            <img src="../../../../public/images/icons/error.svg" alt="" />
            <p className={darkTheme?'text-white':''}>Something went wrong.</p>
            <button onClick={onclose}>Done</button>
        </div>
    );
}

export default BlockMsgOnError;
