import type {ErrorsType, FormValues, RegisterType, SetValueType} from '../Step2'
import React, {useEffect, useRef, useState} from 'react'
import {Grid, InputLabel, Paper} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {
    changeSecondLangTest,
    changeSecondLangTestScore,
    setStoredSecondLang
} from '../../../../../../src/store/step2Slice'
import autoAnimate from '@formkit/auto-animate'
import SelectionBtn from '../../selectionBtn/SelectionBtn'
import CustomTextField from '../../../utils/CustomTextField'
import InputErrAlert from '../../inputErrAlert/InputErrAlert'
import useTotalScore from '../../../utils/useTotalScore'
import type {TestScoreType} from '../../../../../../src/store/scoreSlice'
import ScorePad from '../../scorePad/ScorePad'

const firstEngOptions = [
    {
        text: 'TEF',
        value: 'tef'
    },
    {
        text: 'TCF',
        value: 'tcf'
    }
]
const firstFrOptions = [
    {
        text: '雅思',
        value: 'ielts'
    },
    {
        text: '思培',
        value: 'celpip'
    }
]
const tests = ['阅读', '写作', '听力', '口语']

interface SecondLangProps {
    register: RegisterType
    setValue: SetValueType
    errors: ErrorsType
}

const SecondLang: React.FC<SecondLangProps> = ({register, setValue, errors}) => {
    const dispatch = useAppDispatch()

    // test option
    const selectedValue = useAppSelector(state => state.step2Slice.secondLang.test)
    const handleClick = (value: string) => {
        dispatch(changeSecondLangTest(value))
        errors.secondLangTest = undefined
    }

    useEffect(() => {
        setValue('secondLangTest' as keyof FormValues, selectedValue)
    }, [selectedValue])

    // test score
    const testScore = useAppSelector(state => state.step2Slice.secondLang.testScore)
    const handleChange = (value: string, index: number) => {
        if (selectedValue) {
            dispatch(changeSecondLangTestScore([value, index]))
        }
    }

    // option state
    const firstLangTest = useAppSelector(state => state.step2Slice.firstLang.test)
    const [options, setOptions] = useState(firstEngOptions)
    useEffect(() => {
        if (firstLangTest.charAt(0) === 't') {
            setOptions(firstFrOptions)
        } else {
            setOptions(firstEngOptions)
        }
    }, [firstLangTest])

    // store test scores
    const calculateScore = useTotalScore()
    useEffect(() => {
        dispatch(setStoredSecondLang())
        calculateScore()
    }, [testScore])

    // each test score
    const languageScore: TestScoreType = useAppSelector(state => state.scoreSlice.secondLangEEScore)

    // dropdown
    const parent = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (parent.current !== null) {
            autoAnimate(parent.current)
        }
    }, [parent])

    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}} ref={parent}>
            <InputLabel style={{color: '#1975d1', marginBottom: '1rem'}}>第二语言</InputLabel>

            <Grid container spacing={2} marginBottom="0.5rem" className={errors.secondLangTest ? 'Mui-error' : ''}>
                <input type="hidden" {...register('secondLangTest', {required: '请选择一项考试'})} />
                {options.map((option, index) => (
                    <Grid item xs={6} sm={6} md={6} key={`second-language-${index}`}>
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
                    <Grid key={index} container spacing={0} alignItems="center" justifyContent="center">
                        <Grid item xs={1}>
                            <InputLabel>{option}</InputLabel>
                        </Grid>
                        <Grid item xs={11}>
                            <CustomTextField
                                name={`secondLangTestScore${index}`}
                                handleChange={evt => {
                                    handleChange(evt.target.value, index)
                                }}
                                placeholder="输入分数"
                                value={testScore[index]}
                                error={!!errors[`secondLangTestScore${index}` as keyof FormValues]}
                                helperText={errors[`secondLangTestScore${index}` as keyof FormValues]?.message}
                                customInputProps={{
                                    inputProps: {
                                        ...register(`secondLangTestScore${index}` as keyof FormValues, {
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
            {errors.secondLangTest && <InputErrAlert error={errors.secondLangTest.message} />}
        </Paper>
    )
}
export default SecondLang
