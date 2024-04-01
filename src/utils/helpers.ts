import { useSelector } from 'react-redux';

export const getProfile = () => {
    const token = useSelector((store: any) => store?.reducers?.profile);
    return token;
};
