import React, { useEffect } from 'react';
import { copyLink, notAllowed, report, saveVideo, send, repost, blackHeartOutline, blackCrossHeart } from '../../../icons';


function CustomContextMenu({ x, y, onClose, onDownload, onCopyLink,popupHandler, onVideoDetail,isSharedVideo, post = {} }: any) {

    useEffect(() => {
        // Close context menu when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            onClose();
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);
    
    return (
        <div className='custom-context-menu'
            style={{
                position: 'absolute',
                top: y,
                left: x,
                backgroundColor: '#FFFFFFE5',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '8px 0',
                zIndex: 9999,
                maxWidth: '14rem',
                minWidth: '10rem'
            }}
        >
            {post?.privacyOptions?.allowDownload && (
            <div
                style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#161823',
                    display: 'flex',
                    alignItems: 'center'
                }}
                onClick={onDownload}
            >
                {/* <img style={{float:'left',paddingRight:'10px'}} src={saveVideo} /> */}
                <svg 
                    width="24" 
                    height="25" 
                    viewBox="0 0 24 25" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M4 17.5488V19.5488C4 20.0793 4.21071 20.588 4.58579 20.963C4.96086 21.3381 5.46957 21.5488 6 21.5488H18C18.5304 21.5488 19.0391 21.3381 19.4142 20.963C19.7893 20.588 20 20.0793 20 19.5488V17.5488" 
                        stroke="black" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    />
                    <path 
                        d="M7 11.5488L12 16.5488L17 11.5488" 
                        stroke="black" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    />
                    <path 
                        d="M12 4.54883V16.5488" 
                        stroke="black" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    />
                </svg>

                <span className='pl-2'>Download video</span>
            </div>
            )}
            <div
                style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    color: '#161823',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center'
                }}
                onClick={onCopyLink}
            >
                {/* <img  style={{float:'left',paddingRight:'10px'}} src={copyLink} />
                 */}
                 <svg 
                    width="24" 
                    height="25" 
                    viewBox="0 0 24 25" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M9 15.5469L15 9.54688" 
                        stroke="black" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    />
                    <path 
                        d="M11 6.54718L11.463 6.01118C12.4008 5.07351 13.6727 4.54678 14.9989 4.54688C16.325 4.54697 17.5968 5.07388 18.5345 6.01168C19.4722 6.94949 19.9989 8.22137 19.9988 9.54753C19.9987 10.8737 19.4718 12.1455 18.534 13.0832L18 13.5472" 
                        stroke="black" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    />
                    <path 
                        d="M13 18.5469L12.603 19.0809C11.6543 20.0191 10.3738 20.5453 9.03952 20.5453C7.70523 20.5453 6.42477 20.0191 5.47602 19.0809C5.00838 18.6185 4.63711 18.0679 4.38373 17.461C4.13035 16.8541 3.99988 16.203 3.99988 15.5454C3.99988 14.8877 4.13035 14.2366 4.38373 13.6297C4.63711 13.0229 5.00838 12.4723 5.47602 12.0099L6.00002 11.5469" 
                        stroke="black" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    />
                </svg>

                <span className='pl-2'>Copy link</span>
            </div>
            <div
                style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    color: '#161823',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center'
                }}
                onClick={popupHandler}
            >
                {/* <img  style={{float:'left',paddingRight:'10px'}} src={send} /> */}
                <svg 
                        width="24" 
                        height="25" 
                        viewBox="0 0 24 25" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M1.09006 5.38188C1.16966 5.20737 1.29777 5.05943 1.45912 4.9557C1.62047 4.85198 1.80825 4.79685 2.00006 4.79688H22.0001C22.1759 4.79618 22.3489 4.84188 22.5015 4.92936C22.654 5.01685 22.7808 5.14302 22.8691 5.29516C22.9573 5.44729 23.0039 5.62001 23.004 5.79589C23.0042 5.97176 22.958 6.14457 22.8701 6.29688L12.8701 23.7969C12.7736 23.9666 12.6295 24.1043 12.4557 24.1931C12.2819 24.2819 12.0859 24.3179 11.8918 24.2966C11.6978 24.2754 11.5142 24.1978 11.3638 24.0734C11.2133 23.9491 11.1025 23.7834 11.0451 23.5969L8.11006 14.2969L1.24506 6.45688C1.1184 6.31168 1.03639 6.13297 1.00889 5.94226C0.981395 5.75155 1.00958 5.55695 1.09006 5.38188ZM10.1901 14.2419L12.2651 20.8169L20.2751 6.79688H4.20506L9.19506 12.5019L15.0501 8.90188C15.1058 8.86697 15.168 8.84341 15.2329 8.83256C15.2978 8.82171 15.3642 8.82377 15.4283 8.83864C15.4924 8.8535 15.5529 8.88087 15.6064 8.91918C15.6599 8.95749 15.7053 9.00599 15.7401 9.06188L16.2601 9.91188C16.295 9.96766 16.3185 10.0298 16.3294 10.0947C16.3402 10.1596 16.3382 10.226 16.3233 10.2901C16.3084 10.3542 16.2811 10.4147 16.2428 10.4682C16.2044 10.5217 16.156 10.5672 16.1001 10.6019L10.1901 14.2469V14.2419Z" 
                            fill="black"
                        />
                    </svg>

                <span className='pl-2'>Send to friends</span>
            </div>
            {isSharedVideo? '': <div
                style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    color: '#161823',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center'
                }}
                onClick={onVideoDetail}
            >
                 <svg 
                        width="24" 
                        height="25" 
                        viewBox="0 0 24 25" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M12 3.547c-1.182 0-2.352.232-3.444.685A9.99 9.99 0 0 0 5.636 6.183a9.997 9.997 0 0 0-1.951 3.92 10.04 10.04 0 0 0 0 7.272c.452 1.092 1.115 2.084 1.951 2.92a9.99 9.99 0 0 0 2.92 1.95c1.092.453 2.262.686 3.444.686 2.387 0 4.676-.949 6.364-2.637A8.985 8.985 0 0 0 21 12.547c0-2.387-.949-4.677-2.636-6.364A8.988 8.988 0 0 0 12 3.547ZM1 12.547c0-2.918 1.159-5.716 3.222-7.779C6.285 2.706 9.083 1.547 12 1.547s5.715 1.159 7.778 3.222C21.841 6.831 23 9.629 23 12.547c0 2.918-1.159 5.716-3.222 7.778C17.715 22.388 14.917 23.547 12 23.547s-5.715-1.159-7.778-3.222A10.953 10.953 0 0 1 1 12.547Zm12.5-4c0 .398-.158.78-.439 1.061a1.501 1.501 0 0 1-2.122 0A1.501 1.501 0 0 1 10.5 8.547c0-.398.158-.78.439-1.061a1.501 1.501 0 0 1 2.122 0c.281.281.439.663.439 1.061ZM11.5 11.547a.502.502 0 0 0-.354.146.502.502 0 0 0-.146.354v5.5c0 .133.052.26.146.354a.502.502 0 0 0 .354.146h1a.502.502 0 0 0 .354-.146.502.502 0 0 0 .146-.354v-5.5a.502.502 0 0 0-.146-.354.502.502 0 0 0-.354-.146h-1Z" 
                            fill="#161823"
                        />
                    </svg>

                <span className='pl-2'>View video details</span>
            </div> 
            }
        </div>
           
    );
}

export default CustomContextMenu;