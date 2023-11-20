import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MedicalSchool } from './types/type'
import { handleAxiosError, privateApi } from '@lib/axios'

const initialState = {
  medicalSchools: {} as MedicalSchool[],
}

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchMedicalSchools.fulfilled, (state, action) => {
      state.medicalSchools = action.payload
    })
  },
})

export const searchMedicalSchools = createAsyncThunk(
  'education/search',
  async (name: string, { rejectWithValue }) => {
    try {
      const { data } = await privateApi.post('/education/search', {
        name,
      })
      console.log(data)
      return data.data
    } catch (error: any) {
      const { message } = handleAxiosError(error)
      return rejectWithValue(message)
    }
  },
)

export default educationSlice
