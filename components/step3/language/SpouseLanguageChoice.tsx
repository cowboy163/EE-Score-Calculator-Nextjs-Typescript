import {Grid, InputLabel, Paper} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {setFirstLangChoice} from '../../../../../../src/store/step3Slice'
import SelectionBtn from '../../selectionBtn/SelectionBtn'
import React from 'react'

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

const SpouseLanguageChoice: React.FC = () => {
    const dispatch = useAppDispatch()
    const selectedValue = useAppSelector(state => state.step3Slice.firstLangChoice)
    const handleClick = (value: string) => {
        dispatch(setFirstLangChoice(value))
    }
    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}}>
            <InputLabel style={{color: '#1975d1'}}>配偶是否有语言成绩</InputLabel>
            <Grid container spacing={2} marginBottom="0.5rem" marginTop="0.5rem">
                {options.map((option, index) => (
                    <Grid item xs={6} sm={6} md={6} key={`spouse-language-choice-option-${index}`}>
                        <SelectionBtn
                            selected={selectedValue === option.value}
                            variant={selectedValue === option.value ? 'contained' : 'outlined'}
                            onClick={() => {
                                handleClick(option.value)
                            }}
                            value={option.value}
                            fullWidth={true}
                        >
                            {option.text}
                        </SelectionBtn>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}
export default SpouseLanguageChoice
