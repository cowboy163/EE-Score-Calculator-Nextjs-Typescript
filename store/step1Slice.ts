import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {SINGLE, NOT_SINGLE} from '../../components/Helper/EEScoreBetterUI/data/consts'

export type Single = typeof SINGLE | typeof NOT_SINGLE | null

export interface Step1State {
    single: Single
}

const initialState: Step1State = {
    single: null
}

type Step1ReducerType = (state: Step1State, action: PayloadAction<Single>) => void

const step1Slice = createSlice<
    Step1State,
    {
        changeSingle: Step1ReducerType
    }
>({
    name: 'step1Slice',
    initialState,
    reducers: {
        changeSingle: (state, action) => {
            state.single = action.payload
        }
    }
})

export const {changeSingle} = step1Slice.actions

export default step1Slice.reducer
