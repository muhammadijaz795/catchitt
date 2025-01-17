import { useSelector } from 'react-redux';
import { BASE_URL_FRONTEND, showToast } from './constants';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util'

export const getProfile = () => {
    const token = useSelector((store: any) => store?.reducers?.profile);
    return token;
};


export const isValidDocId = (id: any): boolean => {
    const objectIdPattern = /^[a-fA-F0-9]{24}$/;
    return objectIdPattern.test(id);
}


export function extractVideoId(url: string) {
    const regex = /videos\/(.*?)\/reduced/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export const whatsappShareHandler = (userName: string, videoUrl: string) => {
    let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
};

export const facebookShareHandler = (userName: string, videoUrl: string) => {
    let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

export const shareToTwitter = (userName: string, videoUrl: string, mediaDesc: string) => {
    let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;

    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${mediaDesc}`, '_blank');
};

export const shareToLinkedIn = (userName: string, videoUrl: string, mediaDesc: string) => {
    let url = `${BASE_URL_FRONTEND}/${userName}/video/${extractVideoId(videoUrl)}`;

    window.open(
        `https://www.linkedin.com/shareArticle?url=${url}&title=${mediaDesc}`,
        '_blank'
    );
};


export const copyLinkHandler = (userName: string, mediaId: string, msg: string) => {
    navigator.clipboard
        .writeText(`${BASE_URL_FRONTEND}/${userName}/video/${mediaId}`)
        .then(() => {
            showToast(msg);
            // toast.success('Link Copied');
        });
};

export const shareProfileby= {
    whatsapp:  (userName:string) => {
        window.open(`https://api.whatsapp.com/send?text=${BASE_URL_FRONTEND}/profile/${userName}`, '_blank');
    },
    facebook: (userName:string) => {
        window.open(`https://www.facebook.com/share/share.php?u=${BASE_URL_FRONTEND}/profile/${userName}`, '_blank');
    },
    twitter: (userName:string) => {
        window.open(`https://twitter.com/intent/tweet?url=${BASE_URL_FRONTEND}/profile/${userName}`, '_blank');
    },
    linkedin: (userName:string) => {
        window.open(`https://www.linkedin.com/shareArticle?url=${BASE_URL_FRONTEND}/profile/${userName}`, '_blank');
    },
    copyLink: async (userName:string): Promise<boolean> => {
        try {
            await navigator.clipboard.writeText(`${BASE_URL_FRONTEND}/profile/${userName}`);
            return true;
        } catch {
            return false;
        }
    }
}

export const createOpenDialog = (type: string | string[] = 'image', mode: string = 'file', multiple: boolean = false) => {
    let input = document.createElement('input');
    input.type = mode;
    if (type instanceof Array) {
        input.accept = type.map((t) => `${t}/*`).join(',');
    } else {
        input.accept = `${type}/*`;
    }
    input.multiple = multiple;
    return input;
};

export const formatCustomDate = (milliseconds:number) => {
    const date = new Date(milliseconds);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${month} ${day}, ${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
}



export const addAudioToVideo = async (videoBlob:Blob, audioFile: string) => {
    try {

        console.log('inside addAudioToVideo');
        const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'
        const ffmpeg = new FFmpeg();
        
        // ffmpeg.on("log", ({ type, message }) => {
        //     console.log(`${type}: ${message}`);
        // });
        
        // ffmpeg.on("progress", ({ progress, time }) => {
        //     console.log(`Processing: ${progress}% done`);
        // });
        
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
        });
        
        console.log('inside addAudioToVideo 1');
       
        console.log('inside addAudioToVideo 2', status);
    // Fetch video file from the URL and read it into FFmpeg
        // const videoArrayBuffer = await videoBlob.arrayBuffer();

    //   await ffmpeg.writeFile('input.mp4', new Uint8Array(videoArrayBuffer));
    //   await ffmpeg.writeFile('input.mp3', await fetchFile(audioFile));
        await ffmpeg.writeFile('input.mp4', await fetchFile(videoBlob));
        await ffmpeg.writeFile('input.mp3', await fetchFile(audioFile));

        await ffmpeg.exec(['-i', 'input.mp4', '-i', 'input.mp3', '-c:v', 'copy', '-c:a', 'aac', 'output.mp4']);
         
        const data = await ffmpeg.readFile('output.mp4');
        console.log(data);
        // @ts-ignore
        return URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
    } catch (error) {
        console.error(error);
    }
};


// const addAudioToVideoURL = async (videoURL, audioURL) => {
//     const ffmpeg = new FFmpeg();
//     await ffmpeg.load();
  
//     await ffmpeg.writeFile('input.mp4', await fetchFile(videoURL));
//     await ffmpeg.writeFile('input.mp3', await fetchFile(audioURL));
  
//     await ffmpeg.exec(['-i', 'input.mp4', '-i', 'input.mp3', '-c:v', 'copy', '-c:a', 'aac', 'output.mp4']);
  
//     const data = await ffmpeg.readFile('output.mp4');
//     return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
//   };


export function getCaretCoordinates(inputElement:HTMLInputElement, cursorPosition:number, parentElement:HTMLDivElement) {
    try {
        const inputStyles = window.getComputedStyle(inputElement);
        console.log(inputStyles)
        // Create a hidden mirror element
        const mirrorDiv = document.createElement('div');
        mirrorDiv.className = 'hidden-input-mirror';
        
        // Copy necessary styles
        for (let key of [
            'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
            'letterSpacing', 'textTransform', 'wordSpacing', 'lineHeight',
            'padding', 'border', 'whiteSpace'
        ]) {
            // @ts-ignore
            mirrorDiv.style[key] = inputStyles[key];
        }
        
        // Set the text content up to the cursor position
        const inputText = inputElement.value.substring(0, cursorPosition);
        mirrorDiv.textContent = inputText;
        
        // Add a marker to determine the exact position
        const markerSpan = document.createElement('span');
        markerSpan.textContent = '|';  // A placeholder for the caret
        mirrorDiv.appendChild(markerSpan);
    
        // Append the mirror div to the input's parent
        parentElement.appendChild(mirrorDiv);
        
        // Calculate the marker's position
        const rect = markerSpan.getBoundingClientRect();
        const parentRect = parentElement.getBoundingClientRect();
        
        // Remove the mirror element
        parentElement.removeChild(mirrorDiv);
        
        return {
            // top: rect.top + window.scrollY,
            left: rect.left - parentRect.left
        };
    } catch (error) {
        console.log(error);
    }
}