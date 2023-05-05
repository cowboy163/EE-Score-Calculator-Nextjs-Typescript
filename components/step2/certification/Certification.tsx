import {Grid, InputLabel, Paper} from '@mui/material'
import React from 'react'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {changeCertification} from '../../../../../../src/store/step2Slice'
import SelectionBtn from '../../selectionBtn/SelectionBtn'

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

const Certification: React.FC = () => {
    const dispatch = useAppDispatch()
    const selectedValue = useAppSelector(state => state.step2Slice.certification)
    const handleClick = (value: string) => {
        dispatch(changeCertification(value))
    }

    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}}>
            <InputLabel style={{color: '#1975d1'}}>加拿大联邦或省技能证书</InputLabel>
            <Grid container spacing={2} marginBottom="1rem" marginTop="1rem">
                {options.map((option, index) => (
                    <Grid item xs={12} sm={6} md={6} key={`certificationForEEOption${index}`}>
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
            <p style={{marginBottom: '0.7rem'}}>技能证书不直接产生分数，但在后续交叉项会有加分</p>
        </Paper>
    )
}
export default Certification
