import React, {useEffect, useState} from 'react'
import {Grid, InputLabel, Paper} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {setSecondLangChoice} from '../../../../../../src/store/step2Slice'
import SelectionBtn from '../../selectionBtn/SelectionBtn'
import InputErrAlert from '../../inputErrAlert/InputErrAlert'

const options = [
    {
        text: '有',
        value: 'yes'
    },
    {
        text: '无',
        value: 'no'
    }
]

const SecondLangChoice: React.FC = () => {
    const dispatch = useAppDispatch()
    const selectedValue = useAppSelector(state => state.step2Slice.secondLangChoice)
    const firstLangTest = useAppSelector(state => state.step2Slice.firstLang.test)
    const [errorFlag, setErrorFlag] = useState(false)
    const handleClick = (value: string) => {
        if (firstLangTest) {
            dispatch(setSecondLangChoice(value))
        } else {
            dispatch(setSecondLangChoice('no'))
            setErrorFlag(true)
        }
    }
    useEffect(() => {
        if (firstLangTest) {
            setErrorFlag(false)
        }
    }, [firstLangTest])

    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}}>
            <InputLabel style={{color: '#1975d1'}}>是否有第二语言</InputLabel>

            <Grid container spacing={2} marginBottom="0.5rem" marginTop="0.5rem">
                {options.map((option, index) => (
                    <Grid item xs={6} sm={6} md={6} key={`second-language-choice-${index}`}>
                        <SelectionBtn
                            selected={selectedValue === option.value}
                            onClick={() => {
                                handleClick(option.value)
                            }}
                            variant={selectedValue === option.value ? 'contained' : 'outlined'}
                            fullWidth={true}
                        >
                            {option.text}
                        </SelectionBtn>
                    </Grid>
                ))}
            </Grid>
            {errorFlag && <InputErrAlert error="请先选择第一语言" />}
        </Paper>
    )
}
export default SecondLangChoice
