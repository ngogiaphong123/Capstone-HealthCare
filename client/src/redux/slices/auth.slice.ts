import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthConfig from '@/config/auth.config'
import { setCookie, unsetCookie } from '@lib/utils'
import { handleAxiosError, privateApi, publicApi } from '@lib/axios'

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
  loading: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(getMe.pending, state => {
      state.loading = true
    })
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
    })
    builder.addCase(getMe.rejected, state => {
      state.loading = false
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {} as User
    })
  },
})

export const login = createAsyncThunk(
  'auth/login',
  async (input: any, { rejectWithValue }) => {
    try {
      const { data } = await publicApi.post('/auth/login', input)
      setCookie(AuthConfig.accessTokenKey, data.data.accessToken)
      setCookie(AuthConfig.refreshTokenKey, data.data.refreshToken)
      return data.data.user
    } catch (error: any) {
      const { message } = handleAxiosError(error)
      return rejectWithValue(message)
    }
  },
)

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await privateApi.get('/auth/me')
      return data.data
    } catch (error: any) {
      const { message } = handleAxiosError(error)
      return rejectWithValue(message)
    }
  },
)

export const register = createAsyncThunk(
  'auth/register',
  async (input: any, { rejectWithValue }) => {
    try {
      const { data } = await publicApi.post('/auth/register', input)
      setCookie(AuthConfig.accessTokenKey, data.data.accessToken)
      setCookie(AuthConfig.refreshTokenKey, data.data.refreshToken)
      return data.data.user
    } catch (error: any) {
      const { message } = handleAxiosError(error)
      return rejectWithValue(message)
    }
  },
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await privateApi.post('/auth/logout')
      unsetCookie(AuthConfig.accessTokenKey)
      unsetCookie(AuthConfig.refreshTokenKey)
    } catch (error: any) {
      const { message } = handleAxiosError(error)
      return rejectWithValue(message)
    }
  },
)

export default authSlice
