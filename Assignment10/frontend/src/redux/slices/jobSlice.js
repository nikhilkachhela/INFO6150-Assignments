import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const initialState = {
    jobs: [],
    pagination: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

// Get all jobs
export const getAllJobs = createAsyncThunk(
    'jobs/getAll',
    async ({ page = 1, limit = 10 }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const response = await axios.get(`${API_URL}/jobs?page=${page}&limit=${limit}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create job
export const createJob = createAsyncThunk(
    'jobs/create',
    async (jobData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const response = await axios.post(`${API_URL}/create/job`, jobData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.jobs = action.payload.jobs;
                state.pagination = action.payload.pagination;
            })
            .addCase(getAllJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(createJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer;