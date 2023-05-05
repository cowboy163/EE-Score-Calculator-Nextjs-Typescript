import React, {useEffect, useRef} from 'react'
import {Grid, InputLabel, Paper} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import type {LangType} from '../../../../../../src/store/step2Slice'
import {changeFirstLangTest, changeFirstLangTestScore, setStoredFirstLang} from '../../../../../../src/store/step3Slice'
import type {ErrorsType, FormValues, RegisterType, SetValueType} from '../Step3'
import autoAnimate from '@formkit/auto-animate'
import SelectionBtn from '../../selectionBtn/SelectionBtn'
import CustomTextField from '../../../utils/CustomTextField'
import ScorePad from '../../scorePad/ScorePad'
import InputErrAlert from '../../inputErrAlert/InputErrAlert'
import useTotalScore from '../../../utils/useTotalScore'
import type {TestScoreType} from '../../../../../../src/store/scoreSlice'

const options = [
    {
        text: '雅思',
        value: 'ielts'
    },
    {
        text: '思培',
        value: 'celpip'
    },
    {
        text: 'TEF',
        value: 'tef'
    },
    {
        text: 'TCF',
        value: 'tcf'
    }
]
const tests = ['阅读', '写作', '听力', '口语']

interface SpouseLanguageProps {
    register: RegisterType
    setValue: SetValueType
    errors: ErrorsType
}

const SpouseLanguage: React.FC<SpouseLanguageProps> = ({register, setValue, errors}) => {
    const dispatch = useAppDispatch()
    const firstLang: LangType = useAppSelector(state => state.step3Slice.firstLang)

    // test option
    const selectedValue = firstLang.test
    const handleClick = (value: string) => {
        dispatch(changeFirstLangTest(value))
        errors.firstLangTest = undefined
    }

    useEffect(() => {
        setValue('firstLangTest' as keyof FormValues, selectedValue)
    }, [selectedValue])

    // test score
    const testScore = firstLang.testScore
    const handleChange = (value: string, index: number) => {
        if (testScore) {
            dispatch(changeFirstLangTestScore([value, index]))
        }
    }

    // store test scores
    const calculateScore = useTotalScore()
    useEffect(() => {
        dispatch(setStoredFirstLang())
        calculateScore()
    }, [testScore])

    // each test EE score
    const languageScore: TestScoreType = useAppSelector(state => state.scoreSlice.spouseLangEEScore)

    // dropdown
    const parent = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (parent.current !== null) {
            autoAnimate(parent.current)
        }
    }, [parent])

    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}} ref={parent}>
            <InputLabel style={{color: '#1975d1'}}>配偶第一语言</InputLabel>
            <p style={{marginBottom: '0.7rem'}}>选择您配偶所参加过的语言考试或培训</p>

            <Grid container spacing={2} marginBottom="0.5rem" className={errors.firstLangTest ? 'Mui-error' : ''}>
                <input type="hidden" {...register('firstLangTest' as keyof FormValues, {required: '请选择一项考试'})} />
                {options.map((option, index) => (
                    <Grid item xs={12} sm={3} md={3} key={`spouse-language-test-option-${index}`}>
                        <SelectionBtn
                            selected={selectedValue === option.value}
                            variant={selectedValue === option.value ? 'contained' : 'outlined'}
                            onClick={() => {
                                handleClick(option.value)
                            }}
                            fullWidth={true}
                        >
                            {option.text}
                        </SelectionBtn>
                    </Grid>
                ))}
            </Grid>
            {selectedValue &&
                tests.map((option, index) => (
                    <Grid
                        key={`spouse-language-score-option-${index}`}
                        container
                        spacing={0}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={1}>
                            <InputLabel>{option}</InputLabel>
                        </Grid>
                        <Grid item xs={11}>
                            <CustomTextField
                                name={`firstLangTestScore${index}`}
                                handleChange={evt => {
                                    handleChange(evt.target.value, index)
                                }}
                                placeholder={firstLang.test === 'null' ? '0' : '输入分数'}
                                value={testScore[index]}
                                error={!!errors[`firstLangTestScore${index}` as keyof FormValues]}
                                helperText={errors[`firstLangTestScore${index}` as keyof FormValues]?.message}
                                customInputProps={{
                                    inputProps: {
                                        ...register(`firstLangTestScore${index}` as keyof FormValues, {
                                            required: '分数不能为空'
                                        })
                                    }
                                }}
                                inputAdornment={
                                    <ScorePad
                                        text={String(languageScore[index])}
                                        paddingRight="0"
                                        paddingTop={true}
                                        takePlace={true}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                ))}
            {errors.firstLangTest && <InputErrAlert error={errors.firstLangTest.message} />}
        </Paper>
    )
}
export default SpouseLanguage
