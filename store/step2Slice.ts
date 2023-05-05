import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {numInput, numInputAndDot} from '../../components/Helper/EEScoreBetterUI/utils/inputRule'

export type ScoreInputType = [string, string, string, string]

export interface LangType {
    test: string
    testScore: ScoreInputType
    enTest?: string
    frTest?: string
}

export interface Step2State {
    age: string
    education: string
    firstLang: LangType
    storedFirstLang: {
        [key: string]: [string, string, string, string]
        ielts: [string, string, string, string]
        celpip: [string, string, string, string]
        tef: [string, string, string, string]
        tcf: [string, string, string, string]
    }
    secondLangChoice: string
    secondLang: LangType
    storedSecondLang: {
        [key: string]: [string, string, string, string]
        ielts: [string, string, string, string]
        celpip: [string, string, string, string]
        tef: [string, string, string, string]
        tcf: [string, string, string, string]
    }
    exInCA: string
    exOutCA: string
    certification: string
}

const initialState: Step2State = {
    age: '',
    education: '',
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
    secondLangChoice: 'no',
    secondLang: {
        test: '',
        enTest: '',
        frTest: '',
        testScore: ['', '', '', '']
    },
    storedSecondLang: {
        ielts: ['', '', '', ''],
        celpip: ['', '', '', ''],
        tef: ['', '', '', ''],
        tcf: ['', '', '', '']
    },
    exInCA: '',
    exOutCA: '',
    certification: 'no'
}

type ChangeAge = (state: Step2State, action: PayloadAction<string>) => void
type ChangeEducation = (state: Step2State, action: PayloadAction<string>) => void
type ChangeFirstLangTest = (state: Step2State, action: PayloadAction<string>) => void
type ChangeFirstLangTestScore = (state: Step2State, action: PayloadAction<[string, number]>) => void
type ChangeSecondLangTest = (state: Step2State, action: PayloadAction<string>) => void
type ChangeSecondLangTestScore = (state: Step2State, action: PayloadAction<[string, number]>) => void
type ChangeExInCA = (state: Step2State, action: PayloadAction<string>) => void
type ChangeExOutCA = (state: Step2State, action: PayloadAction<string>) => void
type ChangeCertification = (state: Step2State, action: PayloadAction<string>) => void
type SetStoredFirstLang = (state: Step2State) => void
type SetSecondLangChoice = (state: Step2State, action: PayloadAction<string>) => void
type SetStoredSecondLang = (state: Step2State) => void

const step2Slice = createSlice<
    Step2State,
    {
        changeAge: ChangeAge
        changeEducation: ChangeEducation
        changeFirstLangTest: ChangeFirstLangTest
        changeFirstLangTestScore: ChangeFirstLangTestScore
        changeSecondLangTest: ChangeSecondLangTest
        changeSecondLangTestScore: ChangeSecondLangTestScore
        changeExInCA: ChangeExInCA
        changeExOutCA: ChangeExOutCA
        changeCertification: ChangeCertification
        setStoredFirstLang: SetStoredFirstLang
        setSecondLangChoice: SetSecondLangChoice
        setStoredSecondLang: SetStoredSecondLang
    }
>({
    name: 'step2Slice',
    initialState,
    reducers: {
        changeAge: (state, action) => {
            let value = numInput(action.payload, 3)
            if (+value > 150) {
                value = '150'
            }
            state.age = value
        },
        changeEducation: (state, action) => {
            state.education = action.payload
        },
        changeFirstLangTest: (state, action) => {
            const testName = action.payload
            state.firstLang.test = testName
            state.firstLang.testScore = [...state.storedFirstLang[`${testName}`]]
            // English or French
            if (testName.charAt(0) === 't') {
                if (state.secondLang.enTest != null) {
                    state.secondLang.test = state.secondLang.enTest
                }
            } else {
                if (state.secondLang.frTest != null) {
                    state.secondLang.test = state.secondLang.frTest
                }
            }
            // second lang score
            if (state.secondLang.test) {
                state.secondLang.testScore = [...state.storedSecondLang[`${state.secondLang.test}`]]
            }
        },
        changeFirstLangTestScore: (state, action) => {
            const value = numInputAndDot(action.payload[0], 3)
            const index = action.payload[1]
            state.firstLang.testScore[index] = value
        },
        changeSecondLangTest: (state, action) => {
            const testName = action.payload
            state.secondLang.test = testName
            if (testName.charAt(0) === 't') {
                state.secondLang.frTest = testName
            } else {
                state.secondLang.enTest = testName
            }
            state.secondLang.testScore = [...state.storedSecondLang[`${testName}`]]
        },
        changeSecondLangTestScore: (state, action) => {
            const value = numInputAndDot(action.payload[0], 3)
            const index = action.payload[1]
            state.secondLang.testScore[index] = value
        },
        changeExInCA: (state, action) => {
            state.exInCA = numInput(action.payload, 1)
        },
        changeExOutCA: (state, action) => {
            state.exOutCA = numInput(action.payload, 1)
        },
        changeCertification: (state, action) => {
            state.certification = action.payload
        },
        setStoredFirstLang: state => {
            const testName = state.firstLang.test
            const testScore: [string, string, string, string] = [...state.firstLang.testScore]
            state.storedFirstLang[`${testName}`] = [...testScore]
        },
        setSecondLangChoice: (state, action) => {
            state.secondLangChoice = action.payload
        },
        setStoredSecondLang: state => {
            const testName = state.secondLang.test
            const testScore: [string, string, string, string] = [...state.secondLang.testScore]
            state.storedSecondLang[`${testName}`] = [...testScore]
        }
    }
})

export const {
    changeAge,
    changeEducation,
    changeFirstLangTest,
    changeFirstLangTestScore,
    changeSecondLangTest,
    changeSecondLangTestScore,
    changeExInCA,
    changeExOutCA,
    changeCertification,
    setStoredFirstLang,
    setSecondLangChoice,
    setStoredSecondLang
} = step2Slice.actions

export default step2Slice.reducer
