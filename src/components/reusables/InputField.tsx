import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';
import { Gift } from '../post/svg-components/Gift';
import { SendComment } from '../post/svg-components/SendComment';

interface InputFieldProps {
    e?: any;
    type: string;
    className?: string;
    placeholder: string;
    value?: any;
    onChange?: any;
    showcommentsIcons?: boolean;
    iconClick?: any;
    giftClick?: any;
}

const InputField: React.FC<InputFieldProps> = ({ type, className, iconClick, giftClick, placeholder, showcommentsIcons, ...restProps }) => {
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    let showCommentIcons = showcommentsIcons;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <TextField
            type={type === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
            value={value}
            onChange={handleChange}
            fullWidth
            placeholder={placeholder}
            className={className}
            InputProps={{
                style: {
                    background: '#F8F8F8',
                    borderRadius: '8px',
                    textAlign: 'right',
                    height: '48px',
                    color: '#6B6B6B'
                },
                endAdornment:
                    type === 'password' ? (
                        <InputAdornment position="end">
                            {showPassword ? (
                                <VisibilityOff onClick={handleTogglePasswordVisibility} />
                            ) : (
                                <Visibility onClick={handleTogglePasswordVisibility} />
                            )}
                        </InputAdornment>
                    ) :
                        <InputAdornment position="start">
                            {showCommentIcons && (
                                <div style={{ display: "flex", gap: '16px' }}>
                                    <Button sx={{ margin: '0px', padding: '0px', minWidth: '0px' }}
                                        onClick={giftClick}>
                                        <Gift />
                                    </Button>
                                    <Button sx={{ margin: '0px', padding: '0px', minWidth: '0px' }}
                                        onClick={iconClick}>
                                        <SendComment />
                                    </Button>
                                </div>
                            )}

                        </InputAdornment>
                ,
            }}
            {...restProps}
        />
    );
};

export default InputField;
