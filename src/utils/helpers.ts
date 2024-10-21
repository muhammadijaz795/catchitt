import { useSelector } from 'react-redux';

export const getProfile = () => {
    const token = useSelector((store: any) => store?.reducers?.profile);
    return token;
};


export const  isValidDocId = (id: any): boolean => {
    const objectIdPattern = /^[a-fA-F0-9]{24}$/;
    return objectIdPattern.test(id);
}