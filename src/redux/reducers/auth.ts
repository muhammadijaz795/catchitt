import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from '../../axios/axiosClient';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../utils/db';
import { getProfileData } from '../AsyncFuncs';
import { STATUS_CODE } from '../../utils/constants';

const loginSlice: any = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        logoutUser: (_state, action) => {
            localStorage.setItem('token', '');
            action.payload.navigate('/'); // Use navigate here
            window.location.reload();
            return {};
        },
        updateProfile: (_state, action) => {
            return action.payload;
        },
        updateProfileType: (_state, action) => {
            localStorage.setItem('accountType', action.payload.type);
            return _state;
        },
        updateAvatar: (_state: any, action: any) => {
            console.log('updating the avatar');
            _state.avatar = action?.payload;
            return _state;
        },
    },

    extraReducers: (builder: any) => {
        builder.addCase(loginService.fulfilled, (_state: any, action: any) => {
            localStorage.setItem('userId', action?.payload?.data?._id || '');
            localStorage.setItem('token', action?.payload?.data?.token || '');
            localStorage.setItem('profile', JSON.stringify(action?.payload?.data) || '');
            db.profile.add(action?.payload?.data);
            useAuthStore.setState(action?.payload?.data);

            return action?.payload?.data;
        });

        builder.addCase(loginWithGoogleService.fulfilled, (_state: any, action: any) => {
            localStorage.setItem('userId', action?.payload?.data?._id || '');
            localStorage.setItem('token', action?.payload?.data?.token || '');
            localStorage.setItem('profile', JSON.stringify(action?.payload?.data) || '');
            db.profile.add(action?.payload?.data);
            useAuthStore.setState(action?.payload?.data);

            return action?.payload?.data;
        });

        builder.addCase(getProfileData.fulfilled, (_state: any, action: any) => {
            _state.avatar = action?.payload?.avatar;
            _state.cover = action?.payload?.cover;
            _state.name = action?.payload?.name;
            _state.likesNum = action?.payload?.likesNum;
            return _state;
        });

        builder.addCase(loginService.rejected, (_state: any, action: any) => {
            // Handle login service rejection (error) here
            console.error('Login rejected:', action.error.message);
            // Optionally, you can return an error state or handle the error in some other way.
            return _state; // Return the previous state or any error handling state
        });
        builder.addCase(signupService.fulfilled, (_state: any, action: any) => {
            useAuthStore.setState(action?.payload?.data);
            return action?.payload?.data;
        });
    },
});

export const { logoutUser, updateProfile, updateProfileType } = loginSlice.actions;

export const loginService = createAsyncThunk(
    'auth/loginService',
    async (values: any, { rejectWithValue }) => {
        try {
            let res: any = await post('/auth/sign-in', {
                type: 'application/json',
                data: { isLoggedIn: true, ...values },
            });

            if (res?.status === 200) {
                return res?.data;
            } else {
                return rejectWithValue(res?.message || 'Invalid status code');
            }
        } catch (error: any) {
            return rejectWithValue(error?.message);
        }
    }
);

export const loginWithGoogleService = createAsyncThunk(
    'auth/loginWithGoogleService',
    async (values: any, { rejectWithValue }) => {
        try {
            let res: any = await post('/auth/social/google-access-token', {
                type: 'application/json',
                data: { isLoggedIn: true, ...values },
            });

            if (res?.status === STATUS_CODE.OK) {
                return res?.data;
            } else {
                return rejectWithValue(res?.message || 'Invalid status code');
            }
        } catch (error: any) {
            return rejectWithValue(error?.message);
        }
    }
);

export const signupService = createAsyncThunk('auth/signupService', async (values: any) => {
    if (!values) return;
    try {
        let res = await post('/auth/web-sign-up', {
            type: 'application/json',
            data: {
                isLoggedIn: true,
                ...values,
            },
        });
        return res?.data;
    } catch (error) {
        return;
    }
});

export const signupOTPService = createAsyncThunk('auth/signupOTPService', async (values: any) => {
    if (!values) return;
    try {
        let res = await post('/auth/request-verify-email', {
            type: 'application/json',
            data: {
                // isLoggedIn: true,
                ...values,
            },
        });
        return res?.data;
    } catch (error) {
        return;
    }
});

export const signupVerifyOTPService = createAsyncThunk('auth/signupVerifyOTPService', async (values: any) => {
    if (!values) return;
    try {
        let res = await post('/auth/verifyOtp', {
            type: 'application/json',
            data: {
                // isLoggedIn: true,
                ...values,
            },
        });
        return res?.data;
    } catch (error) {
        return;
    }
});

export default loginSlice.reducer;
