import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export type TestScoreType = [number, number, number, number]

export interface ScoreState {
    ageScore: number
    educationScore: number
    firstLangEEClbScore: TestScoreType
    firstLangEEScore: TestScoreType
    secondLangEEClbScore: TestScoreType
    secondLangEEScore: TestScoreType
    exInCaScore: number
    spouseEducationScore: number
    spouseLangEEClbScore: TestScoreType
    spouseLangEEScore: TestScoreType
    spouseExInCaScore: number
    pnpScore: number
    sponsorshipScore: number
    educationInCaScore: number
    relativeScore: number
}

const initialState: ScoreState = {
    ageScore: 0,
    educationScore: 0,
    firstLangEEClbScore: [0, 0, 0, 0],
    firstLangEEScore: [0, 0, 0, 0],
    secondLangEEClbScore: [0, 0, 0, 0],
    secondLangEEScore: [0, 0, 0, 0],
    exInCaScore: 0,
    spouseEducationScore: 0,
    spouseLangEEClbScore: [0, 0, 0, 0],
    spouseLangEEScore: [0, 0, 0, 0],
    spouseExInCaScore: 0,
    pnpScore: 0,
    sponsorshipScore: 0,
    educationInCaScore: 0,
    relativeScore: 0
}

type ScoreReducerType = (state: ScoreState, action: PayloadAction<number>) => void
type TestScoreReducerType = (state: ScoreState, action: PayloadAction<TestScoreType>) => void

const scoreSlice = createSlice<
    ScoreState,
    {
        setAgeScore: ScoreReducerType
        setEducationScore: ScoreReducerType
        setFirstLangEEClbScore: TestScoreReducerType
        setFirstLangEEScore: TestScoreReducerType
        setSecondLangEEClbScore: TestScoreReducerType
        setSecondLangEEScore: TestScoreReducerType
        setExInCaScore: ScoreReducerType
        setSpouseEducationScore: ScoreReducerType
        setSpouseLangEEClbScore: TestScoreReducerType
        setSpouseLangEEScore: TestScoreReducerType
        setSpouseExInCaScore: ScoreReducerType
        setPnpScore: ScoreReducerType
        setSponsorshipScore: ScoreReducerType
        setEducationInCaScore: ScoreReducerType
        setRelativeScore: ScoreReducerType
    }
>({
    name: 'scoreSlice',
    initialState,
    reducers: {
        setAgeScore: (state, action) => {
            state.ageScore = action.payload
        },
        setEducationScore: (state, action) => {
            state.educationScore = action.payload
        },
        setFirstLangEEClbScore: (state, action) => {
            state.firstLangEEClbScore = action.payload
        },
        setFirstLangEEScore: (state, action) => {
            state.firstLangEEScore = action.payload
        },
        setSecondLangEEClbScore: (state, action) => {
            state.secondLangEEClbScore = action.payload
        },
        setSecondLangEEScore: (state, action) => {
            state.secondLangEEScore = action.payload
        },
        setExInCaScore: (state, action) => {
            state.exInCaScore = action.payload
        },
        setSpouseEducationScore: (state, action) => {
            state.spouseEducationScore = action.payload
        },
        setSpouseLangEEClbScore: (state, action) => {
            state.spouseLangEEClbScore = action.payload
        },
        setSpouseLangEEScore: (state, action) => {
            state.spouseLangEEScore = action.payload
        },
        setSpouseExInCaScore: (state, action) => {
            state.spouseExInCaScore = action.payload
        },
        setPnpScore: (state, action) => {
            state.pnpScore = action.payload
        },
        setSponsorshipScore: (state, action) => {
            state.sponsorshipScore = action.payload
        },
        setEducationInCaScore: (state, action) => {
            state.educationInCaScore = action.payload
        },
        setRelativeScore: (state, action) => {
            state.relativeScore = action.payload
        }
    }
})

export const {
    setAgeScore,
    setEducationScore,
    setFirstLangEEClbScore,
    setFirstLangEEScore,
    setSecondLangEEClbScore,
    setSecondLangEEScore,
    setExInCaScore,
    setSpouseEducationScore,
    setSpouseLangEEClbScore,
    setSpouseLangEEScore,
    setSpouseExInCaScore,
    setPnpScore,
    setSponsorshipScore,
    setEducationInCaScore,
    setRelativeScore
} = scoreSlice.actions

export default scoreSlice.reducer
