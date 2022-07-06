import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DummyData, ServiceClient } from '../../api/ServiceClient';
import { AppThunkExtra } from '../store';

export const fetchDummyData = createAsyncThunk<
  DummyData,
  void,
  { extra: AppThunkExtra }
>('dummy/fetchDummyData', async (_, thunkAPI) => {
  const serviceClient: ServiceClient = thunkAPI.extra.serviceClient;

  const data = await serviceClient.getDummyData();
  return data;
});

interface DummyState {
  dummyData?: any[];
  error?: string;
  counter: number;
}
const initialState: DummyState = {
  counter: 0,
};

export const dummySlice = createSlice({
  name: 'dummy',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchDummyData.fulfilled, (state, action) => {
      const { response, error } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.dummyData = response;
      }
    });
  },
});
