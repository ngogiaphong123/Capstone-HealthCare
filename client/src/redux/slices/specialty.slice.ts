import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Specialty } from './types/type'
import { handleAxiosError, privateApi } from '@lib/axios'

const initialState = {
  specialties: {} as Specialty[],
}

const specialtySlice = createSlice({
  name: 'specialty',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchSpecialties.fulfilled, (state, action) => {
      state.specialties = action.payload
    })
  },
})

export const searchSpecialties = createAsyncThunk(
  'specialty/search',
  async (name: string, { rejectWithValue }) => {
    try {
      const { data } = await privateApi.post('/specialty/search', {
        name,
      })
      return data.data
    } catch (error: any) {
      const { message } = handleAxiosError(error)
      return rejectWithValue(message)
    }
  },
)

export default specialtySlice
