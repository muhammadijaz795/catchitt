import React, { useEffect } from 'react';
import { copyLink, notAllowed, report, saveVideo, send, repost, blackHeartOutline, blackCrossHeart } from '../../../icons';


function CustomContextMenu({ x, y, onClose, onDownload, onCopyLink,popupHandler, onVideoDetail }: any) {

    useEffect(() => {
            console.log('in custom context menu..')
    }, []);
    
    return (
        <div className='custom-context-menu'
            style={{
                position: 'fixed',
                top: '50px',
                left: '0 auto',
                backgroundColor: 'white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '8px 0',
                zIndex: 999009,
            }}
        >
            <div
                style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#333',
                }}
                onClick={onDownload}
            >
                <img style={{float:'left',paddingRight:'10px'}} src={saveVideo} />
                <span>Download video</span>
            </div>
            <div
                style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#333',
                }}
                onClick={onCopyLink}
            >
                <img  style={{float:'left',paddingRight:'10px'}} src={copyLink} />
                <span>Copy link</span>
            </div>
            <div
                style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#333',
                }}
                onClick={popupHandler}
            >
                {/* <img  style={{float:'left',paddingRight:'10px'}} src={send} /> */}
                <span>Send to friends</span>
            </div>
            <div
                style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#333',
                }}
                onClick={onVideoDetail}
            >
                <img  style={{float:'left',paddingRight:'10px'}} src={copyLink} />
                <span>View video details</span>
            </div>
        </div>
    );
}

export default CustomContextMenu;