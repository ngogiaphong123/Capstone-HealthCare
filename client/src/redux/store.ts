import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user.slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import doctorProfileSlice from './slices/doctor-profile.slice'
import specialtySlice from './slices/specialty.slice'
import educationSlice from './slices/education.slice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    doctorProfile: doctorProfileSlice.reducer,
    specialty: specialtySlice.reducer,
    education: educationSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
