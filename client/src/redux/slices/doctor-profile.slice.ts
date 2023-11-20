import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DoctorEducation, DoctorSpecialty } from './types/type'
import { handleAxiosError, privateApi } from '@lib/axios'

const initialState = {
  doctorEducation: {} as DoctorEducation[],
  doctorSpecialty: {} as DoctorSpecialty[],
}

const doctorProfileSlice = createSlice({
  name: 'doctorProfileSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDoctorSpecialty.fulfilled, (state, action) => {
      state.doctorSpecialty = action.payload
    })
    builder.addCase(getDoctorEducation.fulfilled, (state, action) => {
      state.doctorEducation = action.payload
    })
  },
})

export const getDoctorEducation = createAsyncThunk(
  'doctor-profile/education',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await privateApi.get('/doctor-profile/education')
      return data.data
    } catch (error: any) {
      const { message } = handleAxiosError(error)
      return rejectWithValue(message)
    }
  },
)
export const getDoctorSpecialty = createAsyncThunk(
  'doctor-profile/specialty',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await privateApi.get('/doctor-profile/specialty')
      return data.data
    } catch (error: any) {
      const { message } = handleAxiosError(error)
      return rejectWithValue(message)
    }
  },
)
export default doctorProfileSlice
