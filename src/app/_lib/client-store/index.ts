import {configureStore} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from './_lib/slices/user'
import scheduleReducer from './_lib/slices/schedule'

const rootReducer = {
    user: userReducer,
    schedule: scheduleReducer
};

const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store