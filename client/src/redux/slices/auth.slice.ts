import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthConfig from '@/app/config/auth.config'
import { getCookie, setCookie, unsetCookie } from '@lib/utils'

type User = {
  id: number
  phone: string
  role: string
  avatar: string
  fullName: string
  firstName: string
  lastName: string
  address: string
  email: string
}

const initialState = {
  user: {} as User,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const login = createAsyncThunk(
  'auth/login',
  async (input: any, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        },
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      setCookie(AuthConfig.accessTokenKey, data.data.accessToken)
      setCookie(AuthConfig.refreshTokenKey, data.data.refreshToken)
      return data.data.user
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie(AuthConfig.accessTokenKey)}`,
          },
        },
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      return data.data
    } catch (error: any) {
      unsetCookie(AuthConfig.accessTokenKey)
      unsetCookie(AuthConfig.refreshTokenKey)
      return rejectWithValue(error.message)
    }
  },
)

export default authSlice
