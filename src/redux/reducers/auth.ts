import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from '../../axios/axiosClient';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../utils/db';

const loginSlice: any = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        logoutUser: () => {
            localStorage.setItem('token', '');
            return {};
        },
        updateProfile: (_state, action) => {
            return action.payload;
        },

         updateProfileType: (_state, action) => {
            console.log("updating profile type")
            console.log("state")
            console.log(_state)
              console.log("type")
            console.log(action.type)
            localStorage.setItem('accountType',action.payload.type);
            // _state.accountType = action.type;
            return _state;
        }

        
    },
    extraReducers: (builder: any) => {
        builder.addCase(loginService.fulfilled, (_state: any, action: any) => {
             
            localStorage.setItem('userId', action?.payload?.data?._id || '');
            localStorage.setItem('token', action?.payload?.data?.token || '');
            localStorage.setItem('profile', JSON.stringify(action?.payload?.data) || '');
            db.profile.add(action?.payload?.data); 
            useAuthStore.setState(action?.payload?.data);
            console.log("actionaction")
            console.log(action)
            
            return action?.payload?.data;
        });
        builder.addCase(signupService.fulfilled, (_state: any, action: any) => {
            localStorage.setItem('userId', action?.payload?.data?._id || '');
            localStorage.setItem('token', action?.payload?.data?.token || '');
            localStorage.setItem('profile', action?.payload?.data || '');
            db.profile.add(action?.payload?.data);
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
            let res = await post('/auth/sign-in', {
                type: 'application/json',
                data: { isLoggedIn: true, ...values },
            });

            if (res?.status === 200) {
                return res?.data;
            } else {
                console.log('rejecting');
                return rejectWithValue('Invalid status code');
            }
        } catch (error: any) {
            console.log('rejecting in catch');

            return rejectWithValue(error?.message);
        }
    }
);

export const signupService = createAsyncThunk('auth/signupService', async (values: any) => {
    if (!values) return;
    try {
        let res = await post('/auth/sign-up', {
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

export default loginSlice.reducer;
