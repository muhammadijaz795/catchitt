import { DriveFileRenameOutline, TaskAltOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EmojiPicker, { Theme } from 'emoji-picker-react';


export const CustomEmojis: React.FC<any> = ({
    isDarkTheme,
    onClose,
}) => {

    const [emojis, setEmojis] = useState('')

    const onEmojiClick = (emojiObject: any) => {
        setEmojis((prevEmojis) => {
            return prevEmojis + emojiObject.emoji;
        });
    };

    const mutateSelectedEmojis = (e: any) => {
        setEmojis(e.target.value);
    }

    return (<>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                <DriveFileRenameOutline className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-600'}`}>
                    Emoji Picker
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
            <div className='flex items-center gap-2 mb-2'>
                <input type="text" value={emojis} onChange={mutateSelectedEmojis} placeholder='Enter Emoji' className="w-3/4 p-2 border border-gray-300 dark:border-gray-700 rounded-md" />
                <button className="w-1/4 p-2 bg-red-700 text-white rounded-md cursor-pointer"><TaskAltOutlined /></button>
            </div>
            <EmojiPicker theme={isDarkTheme ? Theme.DARK : Theme.LIGHT} height={340} width="auto" onEmojiClick={onEmojiClick} />
        </div>
    </>

    );
};