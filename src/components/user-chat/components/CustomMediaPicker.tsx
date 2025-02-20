import { useState, useRef, useEffect } from 'react'; // Add useRef and useEffect
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import style from './customMedia.module.scss';
import { ClickAwayListener } from '@mui/material';

const GIPHY_KEY = process.env.VITE_GIPHY_API_KEY;
if (!GIPHY_KEY) {
    throw new Error("GIPHY_KEY is not defined");
}
const giphyFetch = new GiphyFetch(GIPHY_KEY);

function CustomMediaPicker({ isPickerVisible, setIsPickerVisible, isDarkTheme, setMessageType, setMessage, setUploadedFile, setOpenUploadPic, setFilePreview }: any) {
    const [activeTab, setActiveTab] = useState('emoji'); // Tracks the current tab
    const modalContentRef = useRef<HTMLDivElement>(null); // Ref for the modal content
    const [gridWidth, setGridWidth] = useState(0); // State to store the calculated width

    // Calculate the width of the parent container
    useEffect(() => {
        if (modalContentRef.current) {
            const parentWidth = modalContentRef.current.offsetWidth;
            setGridWidth(parentWidth * 0.98); // 90% of the parent width (adjust as needed)
        }
    }, [isPickerVisible, activeTab]); // Recalculate when the picker or tab changes

    const onEmojiClick = (emojiObject: any) => {
        setMessageType('Text');
        setMessage((prevText: string) => prevText + emojiObject.emoji); // Append emoji to input text
    };

    const sendGif = (gif: any) => {
        setMessageType('Gif');
        setUploadedFile('Gif');
        setMessage(gif.images.fixed_height.url);
        setFilePreview(gif.images.fixed_height.url);
        setIsPickerVisible(false);
        setOpenUploadPic(true);
    };

    const sendSticker = (sticker: any) => {
        setMessageType('Sticker');
        setUploadedFile('Sticker');
        setMessage(sticker.images.fixed_height.url);
        setFilePreview(sticker.images.fixed_height.url);
        setIsPickerVisible(false);
        setOpenUploadPic(true);
    };

    return (isPickerVisible && ( <ClickAwayListener onClickAway={()=>setIsPickerVisible(false)}>
        <div className={style.pickerModal} style={{border: isDarkTheme?'1px solid #282828':'1px solid #ddd'}}>
            <div className={`${style.modalHeader} ${isDarkTheme?'bg-[#181818]':'bg-[#f1f1f1]'}`}>
                <button onClick={() => setActiveTab('emoji')} className={activeTab === 'emoji' ? style.activeTab : ''}>Emoji</button>
                <button onClick={() => setActiveTab('gif')} className={activeTab === 'gif' ? style.activeTab : ''}>GIFs</button>
                <button onClick={() => setActiveTab('sticker')} className={activeTab === 'sticker' ? style.activeTab : ''}>Stickers</button>
            </div>

            <div className={`${style.modalContent} ${isDarkTheme?'bg-[#181818]':'bg-white'}`} ref={modalContentRef}>
                {activeTab === 'emoji' && <EmojiPicker theme={isDarkTheme ? Theme.DARK : Theme.LIGHT} height={340} width="auto" onEmojiClick={onEmojiClick} />}
                {activeTab === 'gif' && (
                        <Grid
                            width={gridWidth} // Use the calculated width
                            columns={5} // Adjust the number of columns as needed
                            fetchGifs={(offset: number) => giphyFetch.trending({ offset, limit: 10 })}
                            onGifClick={(gif: any) => sendGif(gif)}
                            noLink={true}
                        />
                )}
                {activeTab === 'sticker' && (
                        <Grid
                            width={gridWidth} // Use the calculated width
                            columns={5} // Adjust the number of columns as needed
                            fetchGifs={(offset) => giphyFetch.search('stickers', { offset, limit: 10 })}
                            onGifClick={sendSticker}
                            noLink={true}
                        />
                )}
            </div>
        </div>
        </ClickAwayListener>
    ));
}

export default CustomMediaPicker;