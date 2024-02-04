import { Visibility, VisibilityOff } from '@mui/icons-material';
import style from './Input.module.scss';
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
                style={{backgroundColor:'white'}}
                className={`bg-transparent ${style.input}`}
                type={type}
            />
            {!passwordToggler ? null : type === 'password' ? (
                <Visibility style={{cursor:'pointer'}} onClick={showPasswordH} />
            ) : (
                <VisibilityOff style={{cursor:'pointer'}} onClick={showPasswordH} />
            )}
        </div>
    );
}

export default Input;
