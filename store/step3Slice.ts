import type {PayloadAction} from '@reduxjs/toolkit'
import type {LangType, ScoreInputType} from './step2Slice'
import {createSlice} from '@reduxjs/toolkit'
import {numInput, numInputAndDot} from '../../components/Helper/EEScoreBetterUI/utils/inputRule'

export interface Step3State {
    education: string
    firstLangChoice: string
    firstLang: LangType
    storedFirstLang: {
        [key: string]: ScoreInputType
        ielts: ScoreInputType
        celpip: ScoreInputType
        tef: ScoreInputType
        tcf: ScoreInputType
    }
    exInCA: string
}

const initialState: Step3State = {
    education: '',
    firstLangChoice: 'no',
    firstLang: {
        test: '',
        testScore: ['', '', '', '']
    },
    storedFirstLang: {
        ielts: ['', '', '', ''],
        celpip: ['', '', '', ''],
        tef: ['', '', '', ''],
        tcf: ['', '', '', '']
    },
    exInCA: ''
}

type StringTypeReducer = (state: Step3State, action: PayloadAction<string>) => void
type ScoreTypeReducer = (state: Step3State, action: PayloadAction<[string, number]>) => void
type NoActionReducer = (state: Step3State) => void

const step3Slice = createSlice<
    Step3State,
    {
        changeEducation: StringTypeReducer
        changeFirstLangTest: StringTypeReducer
        changeFirstLangTestScore: ScoreTypeReducer
        changeExInCA: StringTypeReducer
        setStoredFirstLang: NoActionReducer
        setFirstLangChoice: StringTypeReducer
    }
>({
    name: 'step3Slice',
    initialState,
    reducers: {
        changeEducation: (state, action) => {
            state.education = action.payload
        },
        changeFirstLangTest: (state, action) => {
            const testName = action.payload
            state.firstLang.test = testName
            state.firstLang.testScore = [...state.storedFirstLang[`${testName}`]]
        },
        changeFirstLangTestScore: (state, action) => {
            const value = numInputAndDot(action.payload[0], 3)
            const index = action.payload[1]
            state.firstLang.testScore[index] = value
        },
        changeExInCA: (state, action) => {
            state.exInCA = numInput(action.payload, 1)
        },
        setStoredFirstLang: state => {
            const testName = state.firstLang.test
            const testScore: [string, string, string, string] = [...state.firstLang.testScore]
            state.storedFirstLang[`${testName}`] = [...testScore]
        },
        setFirstLangChoice: (state, action) => {
            state.firstLangChoice = action.payload
        }
    }
})

export const {
    changeEducation,
    changeFirstLangTest,
    changeFirstLangTestScore,
    changeExInCA,
    setStoredFirstLang,
    setFirstLangChoice
} = step3Slice.actions

export default step3Slice.reducer
