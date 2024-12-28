import style from './blockUser.module.scss';

interface TYpes {
    onclose: any;
}
function BlockMsgOnSuces({ onclose , userName, darkTheme }: any) {
    return (
        <div className={`${style.parent2} ${darkTheme?'bg-[#181818]':'bg-white'}`}>
            <p className={darkTheme?'text-white':''}>Blocked Successfully</p>
            <p className={darkTheme?'text-white':''}>{`You blocked ${userName}.`}</p>
            <button onClick={onclose}>Done</button>
        </div>
    );
}

export default BlockMsgOnSuces;
