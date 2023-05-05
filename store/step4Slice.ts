import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface Step4State {
    pnp: string
    sponsorship: string
    education: string
    relative: string
}

const initialState: Step4State = {
    pnp: 'no',
    sponsorship: '0',
    education: '0',
    relative: 'no'
}

type StringTypeReducer = (state: Step4State, action: PayloadAction<string>) => void

const step4Slice = createSlice<
    Step4State,
    {
        changePnp: StringTypeReducer
        changeSponsorship: StringTypeReducer
        changeEducation: StringTypeReducer
        changeRelative: StringTypeReducer
    }
>({
    name: 'step4Slice',
    initialState,
    reducers: {
        changePnp: (state, action) => {
            state.pnp = action.payload
        },
        changeSponsorship: (state, action) => {
            state.sponsorship = action.payload
        },
        changeEducation: (state, action) => {
            state.education = action.payload
        },
        changeRelative: (state, action) => {
            state.relative = action.payload
        }
    }
})

export const {changePnp, changeSponsorship, changeEducation, changeRelative} = step4Slice.actions

export default step4Slice.reducer
