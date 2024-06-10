import { Box, Modal } from '@mui/material';
import styles from './story-preview.module.scss';
import { useEffect, useState } from 'react';
const StoryPreview = ({ open, onCancel, onPost, url, isPosting }: any) => {


    const [isVideo, setIsVideo] = useState(false);
    useEffect(() => {
        console.log("comming in preview")
        // console.log(url)
        if (url.startsWith('data:image/')) {
            console.log("Base64 image");
            setIsVideo(false)

        } else if (url.startsWith('blob:http') || url.startsWith('blob:https')) {
            console.log("Video blob");
            // Handle video blob
             setIsVideo(true)

        } else {
            console.log("Unknown URL format");
        }
        // const imageUrl = URL.createObjectURL(blob);
    }, [url]);
    return (
        <div>
            <Modal
                open={open}
                onClose={onCancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={popupStyle}>
                    <div className="flex flex-col gap-2 relative">
                        {
                            isVideo ? 
                            <video
                                className="h-[600px]  "
                                src={url}
                                width={340}
                                height={600}
                                autoPlay
                                preload='auto'
                                playsInline
                            ></video> 
                            :
                             <img  width={340}
                                height={600} 
                                src={url} alt="" />
                        }

                        {isPosting?
                            <div className="w-[330px] h-[560px] flex  justify-center items-center text-white absolute top-0 left-0 bg-[#5448B299]">
                                Posting...

                            </div>
                            :
                            ""
                        }
                        
                       
                        <div className="flex justify-between w-[325px] h-[40px]">
                            <button onClick={onCancel} style={secondaryBtn}>
                                Discard
                            </button>
                            <button
                                onClick={onPost}
                                className="bg-[#5448B2] text-[white]"
                                style={{ ...filledButton, textTransform: 'none' }}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default StoryPreview



const popupStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    
    borderRadius: '8px',
    width: '359px',
    height: '680px',
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}



var filledButton = {
    fontFamily: 'Poppins !important',
    display: 'flex !important',
    width: '100% !important',
    height: '48px !important',
    padding: '0 16px !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    borderRadius: '50% !important',
    background: 'var(--foundation-primary-primary-500, #5448B2) !important',
    // textTransform: 'none !important'
};

var secondaryBtn = {
    ...filledButton, 
    color: 'var(--foundation-primary-primary-500, #5448B2) !important',
    background: 'white',
    border: '1px solid var(--foundation-primary-primary-500, #5448B2)'

}