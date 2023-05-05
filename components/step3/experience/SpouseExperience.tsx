import React, {useEffect} from 'react'
import {Grid, InputLabel, Paper} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {changeExInCA} from '../../../../../../src/store/step3Slice'
import ScorePad from '../../scorePad/ScorePad'
import CustomTextField from '../../../utils/CustomTextField'
import useTotalScore from '../../../utils/useTotalScore'

const SpouseExperience: React.FC = () => {
    const dispatch = useAppDispatch()
    const exInCa = useAppSelector(state => state.step3Slice.exInCA)
    const handleExInCaChange = (value: string) => {
        dispatch(changeExInCA(value))
    }
    // spouse work experience in Canada score
    const calculateScore = useTotalScore()
    useEffect(() => {
        calculateScore()
    }, [exInCa])
    const score: number = useAppSelector(state => state.scoreSlice.spouseExInCaScore)
    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <InputLabel style={{color: '#1975d1'}}>配偶工作经验</InputLabel>
                <ScorePad text={String(score)} paddingRight="1rem" />
            </div>
            <p style={{marginBottom: '1rem'}}>工作经验必须是NOC的O、A或者B类</p>
            <Grid container spacing={0} marginBottom="0.5rem">
                <Grid item xs={4}>
                    <InputLabel>
                        加拿大工作经验
                        <br />
                        （可以不连续）
                    </InputLabel>
                </Grid>
                <Grid item xs={8}>
                    <CustomTextField
                        name="spouse-work-ex-in-CA"
                        handleChange={evt => {
                            handleExInCaChange(evt.target.value)
                        }}
                        placeholder="0"
                        value={exInCa}
                        inputAdornment="年"
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}
export default SpouseExperience
