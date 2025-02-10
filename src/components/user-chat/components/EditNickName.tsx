import { AccountCircle, DriveFileRenameOutline, Palette } from '@mui/icons-material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';


export const EditNickName: React.FC<any> = ({
    isDarkTheme,
    currentNickName,
    onClose,
    onUpdateNickName,
}) => {

    const [nickName, setNickName] = React.useState(currentNickName);

    const onSubmitHandler = () => {
        onUpdateNickName(nickName);
        onClose();
    }

    return (
    <>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                <DriveFileRenameOutline className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-600'}`}>
                    Edit Nick Name
                </span>
            </div>
            <CloseIcon
                aria-label="close"
                onClick={onClose}
                sx={(theme) => ({
                    color: theme.palette.grey[500],
                })}
                style={{
                    cursor: 'pointer',
                }}
            />
        </div>
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" onChange={(e: any) => setNickName(e.target.value)} value={nickName} placeholder='Enter Nickname' style={{color: 'black'}} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md" />
                <input type="submit" value="Save" className="w-full p-2 mt-4 bg-red-700 text-white rounded-md cursor-pointer" />
            </form>
        </div>
    </>

    );
};