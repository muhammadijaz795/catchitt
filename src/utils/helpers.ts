import { useSelector } from 'react-redux';
import { BASE_URL_FRONTEND, showToast } from './constants';

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