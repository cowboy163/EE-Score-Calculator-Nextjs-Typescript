import {configureStore} from '@reduxjs/toolkit'
import type {Store} from '@reduxjs/toolkit'
import stepperSlice from './stepperSlice'
import scoreSlice from './scoreSlice'
import step1Slice from './step1Slice'
import step2Slice from './step2Slice'
import step3Slice from './step3Slice'
import step4Slice from './step4Slice'
import {createWrapper} from 'next-redux-wrapper'
import type {Context} from 'next-redux-wrapper'

const store = configureStore({
    reducer: {
        stepperSlice,
        scoreSlice,
        step1Slice,
        step2Slice,
        step3Slice,
        step4Slice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const makeStore = (context: Context) => store

const wrapper = createWrapper<Store>(makeStore, {debug: false})

export default wrapper
