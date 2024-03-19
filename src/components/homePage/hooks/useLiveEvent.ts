import { useEffect, useState } from "react"
import { get } from "../../../axios/axiosClient";

function useLiveEvent() {
    const [gifts, setGifts] = useState([])

    const getGifts = async () => {
        try {
            const response: any = await get(`/gift/`);
            setGifts(response?.data?.data);
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getGifts();
    }, []);
    return { gifts }
}

export default useLiveEvent