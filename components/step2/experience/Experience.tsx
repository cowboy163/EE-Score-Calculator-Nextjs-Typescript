import {Grid, InputLabel, Paper} from '@mui/material'
import React, {useEffect} from 'react'
import ScorePad from '../../scorePad/ScorePad'
import CustomTextField from '../../../utils/CustomTextField'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {changeExInCA, changeExOutCA} from '../../../../../../src/store/step2Slice'
import useTotalScore from '../../../utils/useTotalScore'

const Experience: React.FC = () => {
    const dispatch = useAppDispatch()
    const exInCA: string = useAppSelector(state => state.step2Slice.exInCA)
    const exOutCA: string = useAppSelector(state => state.step2Slice.exOutCA)
    const handleExInCaChange = (value: string) => {
        dispatch(changeExInCA(value))
    }
    const handleExOutChange = (value: string) => {
        dispatch(changeExOutCA(value))
    }

    // experience in CA score
    const calculateScore = useTotalScore()
    useEffect(() => {
        calculateScore()
    }, [exInCA])
    const score = useAppSelector(state => state.scoreSlice.exInCaScore)

    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <InputLabel style={{color: '#1975d1'}}>工作经验</InputLabel>
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
                        name="workEx-In-CA"
                        handleChange={evt => {
                            handleExInCaChange(evt.target.value)
                        }}
                        placeholder="0"
                        value={exInCA}
                        inputAdornment="年"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <InputLabel>
                        非加拿大工作经验
                        <br />
                        （可以不连续）
                    </InputLabel>
                </Grid>
                <Grid item xs={8}>
                    <CustomTextField
                        name="workEx-Out-CA"
                        handleChange={evt => {
                            handleExOutChange(evt.target.value)
                        }}
                        placeholder="0"
                        value={exOutCA}
                        inputAdornment="年"
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}
export default Experience
