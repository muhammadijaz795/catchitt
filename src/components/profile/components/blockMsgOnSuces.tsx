import style from './blockUser.module.scss';

interface TYpes {
    onclose: any;
}
function BlockMsgOnSuces({ onclose , userName }: any) {
    return (
        <div className={style.parent2}>
            <p>Blocked Successfully</p>
            <p>{`You blocked ${userName}.`}</p>
            <button onClick={onclose}>Done</button>
        </div>
    );
}

export default BlockMsgOnSuces;
