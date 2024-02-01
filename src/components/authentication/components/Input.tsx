import style from './Input.module.scss';
import visible from '../../../assets/visible.svg';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
function Input(props: any) {
    const { placeholder, value, name, onChange, type, passwordToggler, showPasswordH } =
        props || {};
    return (
        <div className={style.parent}>
            <input
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={style.input}
                type={type}
            />
            {!passwordToggler ? null : type === 'password' ? (
                <img className={style.icon} src={visible} alt="" onClick={showPasswordH} />
            ) : (
                <VisibilityOffOutlinedIcon
                    color="primary"
                    className={style.icon}
                    onClick={showPasswordH}
                />
            )}
        </div>
    );
}

export default Input;
