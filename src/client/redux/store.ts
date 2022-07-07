import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ServiceClient } from '../api/ServiceClient';
import { budgetsSlice } from './slices';

const API_ROOT = 'http://localhost:8080'; //TODO: do not hard code

export type AppThunkExtra = { serviceClient: ServiceClient };

const store = configureStore({
  reducer: {
    budgets: budgetsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          serviceClient: new ServiceClient(API_ROOT),
        } as AppThunkExtra,
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
