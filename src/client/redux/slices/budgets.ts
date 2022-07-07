import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetBudgetsResponse, ServiceClient } from '../../api/ServiceClient';
import { AppThunkExtra } from '../store';

interface Budget {
  id: string;
  name: string;
  amount: number;
}

interface BudgetsState {
  budgets: Budget[];
}

const initialState: BudgetsState = {
  budgets: [],
};

export const fetchBudgets = createAsyncThunk<
  GetBudgetsResponse,
  void,
  { extra: AppThunkExtra }
>('budges/fetchBudgets', async (_, thunkAPI) => {
  const serviceClient: ServiceClient = thunkAPI.extra.serviceClient;

  const data = await serviceClient.getBudgetData();
  return data;
});

export const addBudget = createAsyncThunk<
  void,
  { name: string; amount: number },
  { extra: AppThunkExtra }
>('budges/addBudget', async (payload, thunkAPI) => {
  const serviceClient: ServiceClient = thunkAPI.extra.serviceClient;

  await serviceClient.addBudgetData(payload);
});

export const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBudgets.fulfilled, (state, action) => {
      const { response } = action.payload;
      if (response) {
        state.budgets = response.map((b) => ({
          id: b._id,
          name: b.name,
          amount: b.amount,
        }));
      }
    });
  },
});
