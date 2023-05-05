import type {ErrorsType, FormValues, RegisterType, SetValueType} from '../Step2'
import type {TestScoreType} from '../../../../../../src/store/scoreSlice'
import {Grid, InputLabel, Paper} from '@mui/material'
import React, {useEffect, useRef} from 'react'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {changeFirstLangTest, changeFirstLangTestScore, setStoredFirstLang} from '../../../../../../src/store/step2Slice'
import autoAnimate from '@formkit/auto-animate'
import SelectionBtn from '../../selectionBtn/SelectionBtn'
import CustomTextField from '../../../utils/CustomTextField'
import InputErrAlert from '../../inputErrAlert/InputErrAlert'
import useTotalScore from '../../../utils/useTotalScore'
import ScorePad from '../../scorePad/ScorePad'

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

interface FirstLangProps {
    register: RegisterType
    setValue: SetValueType
    errors: ErrorsType
}

const FirstLang: React.FC<FirstLangProps> = ({register, setValue, errors}) => {
    const dispatch = useAppDispatch()

    // test option
    const selectedValue: string = useAppSelector(state => state.step2Slice.firstLang.test)
    const handleClick = (value: string) => {
        dispatch(changeFirstLangTest(value))
        errors.firstLangTest = undefined
    }
    useEffect(() => {
        setValue('firstLangTest', selectedValue)
    }, [selectedValue])

    // test score
    const testScore = useAppSelector(state => state.step2Slice.firstLang.testScore)
    const handleChange = (value: string, index: number) => {
        if (selectedValue) {
            dispatch(changeFirstLangTestScore([value, index]))
        }
    }

    // store test score
    const calculateScore = useTotalScore()

    useEffect(() => {
        dispatch(setStoredFirstLang())
        calculateScore()
    }, [testScore])

    // each EE score for language test
    const languageScore: TestScoreType = useAppSelector(state => state.scoreSlice.firstLangEEScore)

    // dropdown animation
    const parent = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (parent.current !== null) {
            autoAnimate(parent.current)
        }
    }, [parent])
    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}} ref={parent}>
            <InputLabel style={{color: '#1975d1'}}>第一语言</InputLabel>
            <p style={{marginBottom: '0.7rem'}}>选择您所参加过的语言考试或培训</p>
            <Grid container spacing={2} marginBottom="0.5rem" className={errors.firstLangTest ? 'Mui-error' : ''}>
                <input type="hidden" {...register('firstLangTest', {required: '请选择一项考试'})} />
                {options.map((option, index) => (
                    <Grid item xs={12} sm={3} md={3} key={`applicant-firstLanguage-test-${index}`} marginBottom="1rem">
                        <SelectionBtn
                            variant={selectedValue === option.value ? 'contained' : 'outlined'}
                            onClick={() => {
                                handleClick(option.value)
                            }}
                            selected={selectedValue === option.value}
                            fullWidth
                        >
                            {option.text}
                        </SelectionBtn>
                    </Grid>
                ))}
                {selectedValue &&
                    tests.map((option, index) => (
                        <Grid
                            key={`applicant-test-name-${index}`}
                            container
                            spacing={0}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid item xs={2} textAlign="center">
                                <InputLabel>{option}</InputLabel>
                            </Grid>
                            <Grid item xs={10}>
                                <CustomTextField
                                    value={testScore[index]}
                                    name={`firstLangTestScore${index}`}
                                    handleChange={evt => {
                                        handleChange(evt.target.value, index)
                                    }}
                                    placeholder="输入分数"
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
            </Grid>
            {errors.firstLangTest && <InputErrAlert error={errors.firstLangTest.message} />}
        </Paper>
    )
}
export default FirstLang
