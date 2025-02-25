import { useSelector } from 'react-redux';
import { API_KEY, BASE_URL_FRONTEND, showToast } from './constants';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import moment from 'moment';

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

export function getCountryPhoneLengthFromIso(iso : string) {

    const countryPhoneLengths: Record<string, number> = {
            "AF": 9,   "AL": 8,   "DZ": 9,   "AS": 7,   "AD": 6,   "AO": 9,   "AI": 7,  
            "AG": 7,   "AR": 10,  "AM": 8,   "AW": 7,   "AU": 9,   "AT": 10,  "AZ": 9,  
            "BS": 7,   "BH": 8,   "BD": 10,  "BB": 7,   "BY": 9,   "BE": 9,   "BZ": 7,  
            "BJ": 8,   "BM": 7,   "BT": 8,   "BO": 8,   "BA": 8,   "BW": 7,   "BR": 11,  
            "BN": 7,   "BG": 8,   "BF": 8,   "BI": 8,   "KH": 9,   "CM": 9,   "CA": 10,  
            "CV": 7,   "KY": 7,   "CF": 8,   "TD": 8,   "CL": 9,   "CN": 11,  "CO": 10,  
            "KM": 7,   "CG": 9,   "CD": 9,   "CR": 8,   "CI": 8,   "HR": 9,   "CU": 8,  
            "CY": 8,   "CZ": 9,   "DK": 8,   "DJ": 6,   "DM": 7,   "DO": 10,  "EC": 9,  
            "EG": 10,  "SV": 8,   "GQ": 9,   "ER": 7,   "EE": 7,   "ET": 9,   "FJ": 7,  
            "FI": 10,  "FR": 9,   "GA": 7,   "GM": 7,   "GE": 9,   "DE": 10,  "GH": 9,  
            "GI": 8,   "GR": 10,  "GL": 6,   "GD": 7,   "GU": 7,   "GT": 8,   "GN": 9,  
            "GW": 7,   "GY": 7,   "HT": 8,   "HN": 8,   "HK": 8,   "HU": 9,   "IS": 7,  
            "IN": 10,  "ID": 10,  "IR": 10,  "IQ": 10,  "IE": 9,   "IL": 9,   "IT": 10,  
            "JM": 7,   "JP": 10,  "JO": 9,   "KZ": 10,  "KE": 9,   "KI": 5,   "KP": 9,  
            "KR": 9,   "KW": 8,   "KG": 9,   "LA": 9,   "LV": 8,   "LB": 8,   "LS": 8,  
            "LR": 7,   "LY": 10,  "LI": 7,   "LT": 8,   "LU": 9,   "MO": 8,   "MK": 8,  
            "MG": 9,   "MW": 7,   "MY": 9,   "MV": 7,   "ML": 8,   "MT": 8,   "MH": 7,  
            "MR": 7,   "MU": 7,   "MX": 10,  "FM": 7,   "MD": 8,   "MC": 8,   "MN": 8,  
            "ME": 8,   "MS": 7,   "MA": 9,   "MZ": 9,   "MM": 9,   "NA": 8,   "NP": 10,  
            "NL": 9,   "NZ": 9,   "NI": 8,   "NE": 8,   "NG": 10,  "NO": 8,   "OM": 8,  
            "PK": 10,  "PW": 7,   "PA": 8,   "PG": 8,   "PY": 9,   "PE": 9,   "PH": 10,  
            "PL": 9,   "PT": 9,   "PR": 10,  "QA": 8,   "RO": 10,  "RU": 10,  "RW": 9,  
            "WS": 7,   "SA": 9,   "SN": 9,   "RS": 9,   "SC": 7,   "SL": 8,   "SG": 8,  
            "SK": 9,   "SI": 9,   "SB": 7,   "SO": 8,   "ZA": 9,   "ES": 9,   "LK": 9,  
            "SD": 9,   "SR": 7,   "SZ": 8,   "SE": 9,   "CH": 9,   "SY": 9,   "TW": 9,  
            "TJ": 9,   "TZ": 9,   "TH": 9,   "TG": 8,   "TO": 5,   "TT": 7,   "TN": 8,  
            "TR": 10,  "TM": 8,   "UG": 9,   "UA": 9,   "AE": 9,   "GB": 10,  "US": 10,  
            "UY": 9,   "UZ": 9,   "VU": 7,   "VE": 10,  "VN": 9,   "YE": 9,   "ZM": 9,  
            "ZW": 9
          };

        return countryPhoneLengths[iso] || 10;
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

export const shareProfileby = {
    whatsapp: (userName: string) => {
        window.open(`https://api.whatsapp.com/send?text=${BASE_URL_FRONTEND}/profile/${userName}`, '_blank');
    },
    facebook: (userName: string) => {
        window.open(`https://www.facebook.com/share/share.php?u=${BASE_URL_FRONTEND}/profile/${userName}`, '_blank');
    },
    twitter: (userName: string) => {
        window.open(`https://twitter.com/intent/tweet?url=${BASE_URL_FRONTEND}/profile/${userName}`, '_blank');
    },
    linkedin: (userName: string) => {
        window.open(`https://www.linkedin.com/shareArticle?url=${BASE_URL_FRONTEND}/profile/${userName}`, '_blank');
    },
    copyLink: async (userName: string): Promise<boolean> => {
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

export const formatCustomDate = (milliseconds: number) => {
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



export const addAudioToVideo = async (videoBlob: Blob, audioFile: string) => {
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
        return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
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


export function getCaretCoordinates(inputElement: HTMLInputElement, cursorPosition: number, parentElement: HTMLDivElement) {
    try {
        const inputStyles = window.getComputedStyle(inputElement);
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

        mirrorDiv.style.maxWidth = inputStyles.width;
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
        // const rect = markerSpan.getBoundingClientRect();
        // const parentRect = parentElement.getBoundingClientRect();
        const mirrorRect = mirrorDiv.getBoundingClientRect();
        // Remove the mirror element
        parentElement.removeChild(mirrorDiv);

        return {
            // top: rect.top + window.scrollY,
            // left: rect.left - parentRect.left
            left: mirrorRect.right - mirrorRect.left
        };
    } catch (error) {
        console.log(error);
    }
}

export const searchUserToAnnotate = async (query: string, signal: AbortSignal) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(
            `${API_KEY}/discover/search?searchQuery=${query}&page=${1}&pageSize=30`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                signal
            }
        );

        if (response.ok) {
            const responseData = await response.json();
            const { users, videos, hashtags, sounds } = responseData.data;
            return users.data;
            // Update the state with the extracted data
        }
    } catch (error) {
        console.log(error);
    }
}

export const getLatestMsgDateFormat = (timeStamp: any) => {
    const msgTimestamp = new Date(timeStamp);
    const today = new Date()
    const todayDate = today.toISOString().split('T')[0];
    const msgDate = msgTimestamp.toISOString().split('T')[0];
    today.setDate(today.getDate() - 1);
    const previousDate = today.toISOString().split('T')[0];
    let conversationTimeStamp;
    if (todayDate === msgDate) {
        // Format the date using moment.js
        conversationTimeStamp = moment(msgTimestamp).format('h:mm A');
    }
    else if (msgDate === previousDate) {
        conversationTimeStamp = 'yesterday';
    }
    else {
        conversationTimeStamp = moment(msgTimestamp).format('ll');
    }
    return conversationTimeStamp;
}