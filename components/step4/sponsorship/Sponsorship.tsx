import React, {useEffect} from 'react'
import {Grid, InputLabel, Paper} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {changeSponsorship} from '../../../../../../src/store/step4Slice'
import ScorePad from '../../scorePad/ScorePad'
import SelectionBtn from '../../selectionBtn/SelectionBtn'
import useTotalScore from '../../../utils/useTotalScore'

const options = [
    {
        text: '没有雇主担保',
        value: '0'
    },
    {
        text: '我有其它类的雇主担保',
        value: '1'
    },
    {
        text: '我有00类的雇主担保',
        value: '2'
    }
]

const Sponsorship: React.FC = () => {
    const dispatch = useAppDispatch()
    const selectedValue: string = useAppSelector(state => state.step4Slice.sponsorship)
    const handleClick = (value: string) => {
        dispatch(changeSponsorship(value))
    }
    // sponsorship score
    const calculateScore = useTotalScore()
    useEffect(() => {
        calculateScore()
    }, [selectedValue])
    const score: number = useAppSelector(state => state.scoreSlice.sponsorshipScore)

    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <InputLabel style={{color: '#1975d1'}}>雇主担保</InputLabel>
                <ScorePad text={String(score)} paddingRight="1rem" />
            </div>

            <Grid container spacing={2} marginTop="0.1rem" marginBottom="0.1rem">
                {options.map((option, index) => (
                    <Grid item xs={12} sm={12} md={12} key={`sponsorship-option-${index}`}>
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
        </Paper>
    )
}
export default Sponsorship
