import React, {useEffect} from 'react'
import {Grid, InputLabel, Paper} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {changePnp} from '../../../../../../src/store/step4Slice'
import ScorePad from '../../scorePad/ScorePad'
import SelectionBtn from '../../selectionBtn/SelectionBtn'
import useTotalScore from '../../../utils/useTotalScore'

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

const Pnp: React.FC = () => {
    const dispatch = useAppDispatch()
    const selectedValue: string = useAppSelector(state => state.step4Slice.pnp)
    const handleClick = (value: string) => {
        dispatch(changePnp(value))
    }
    // PNP score
    const calculateScore = useTotalScore()
    useEffect(() => {
        calculateScore()
    }, [selectedValue])
    const score: number = useAppSelector(state => state.scoreSlice.pnpScore)

    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <InputLabel style={{color: '#1975d1'}}>省提名</InputLabel>
                <ScorePad text={String(score)} paddingRight="1rem" />
            </div>

            <Grid container spacing={2} marginTop="0.1rem" marginBottom="0.1rem">
                {options.map((option, index) => (
                    <Grid item xs={6} sm={6} md={6} key={`pnp-option-${index}`}>
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
export default Pnp
