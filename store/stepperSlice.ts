import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {SingleRuleType} from '../../components/Helper/EEScoreBetterUI/utils/calculations'

export interface ruleProps {
    0: string | number
    1: number
    2?: number
    [key: string]: number | string | undefined
}

export interface ClbRuleProps {
    Level: number
    Reading: number
    Writing: number
    Listening: number
    Speaking: number
    [key: string]: number
}

export type RuleType = SingleRuleType[] | undefined

export interface StepperState {
    activeStep: number
    stepLength: number
    scoreRule: RuleType
}

const initialState: StepperState = {
    activeStep: 0,
    stepLength: 4,
    scoreRule: undefined
}

type StepperReducerTypeNumber = (state: StepperState, action: PayloadAction<number>) => void
type StepperReducerTypeRule = (state: StepperState, action: PayloadAction<RuleType>) => void

const stepperSlice = createSlice<
    StepperState,
    {
        setActiveStep: StepperReducerTypeNumber
        setStepLength: StepperReducerTypeNumber
        setScoreRule: StepperReducerTypeRule
    }
>({
    name: 'stepperSlice',
    initialState,
    reducers: {
        setActiveStep: (state, action) => {
            state.activeStep = action.payload
        },
        setStepLength: (state, action) => {
            state.stepLength = action.payload
        },
        setScoreRule: (state, action) => {
            state.scoreRule = action.payload
        }
    }
})

export const {setActiveStep, setStepLength, setScoreRule} = stepperSlice.actions

export default stepperSlice.reducer
