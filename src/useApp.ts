import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, followingsMethod, getRandomUsers } from "./redux/AsyncFuncs";
import { useAuthStore } from "./store/authStore";

function useApp() {
    const dispatch = useDispatch();
    const auth: any = useAuthStore((store: any) => store)
    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(followingsMethod());
        dispatch(getRandomUsers());
    }, [auth])
    console.log(useSelector((store: any) => store.reducers));
    return {}
}

export default useApp
