import type {ErrorsType, RegisterType, SetValueType} from '../Step2'
import {Grid, InputLabel, Paper} from '@mui/material'
import ScorePad from '../../scorePad/ScorePad'
import React, {useEffect} from 'react'
import SelectionBtn from '../../selectionBtn/SelectionBtn'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {changeEducation} from '../../../../../../src/store/step2Slice'
import InputErrAlert from '../../inputErrAlert/InputErrAlert'
import useTotalScore from '../../../utils/useTotalScore'

const options = [
    '高中以下',
    '高中',
    '1年大专',
    '2年大专',
    '3年以上大专或本科',
    '双专业（3 + 1年以上）',
    '硕士学位或专业学位',
    '博士学位'
]

interface EducationProps {
    register: RegisterType
    setValue: SetValueType
    errors: ErrorsType
}

const Education: React.FC<EducationProps> = ({register, setValue, errors}) => {
    const dispatch = useAppDispatch()
    const calculateScore = useTotalScore()
    const selectedValue: string = useAppSelector(state => state.step2Slice.education)
    const educationScore: number = useAppSelector(state => state.scoreSlice.educationScore)
    const handleChange = (value: string) => {
        dispatch(changeEducation(value))
        errors.education = undefined
    }
    useEffect(() => {
        setValue('education', selectedValue)
        calculateScore()
    }, [selectedValue])

    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                <InputLabel style={{color: '#1975d1'}}>学历</InputLabel>
                <ScorePad text={String(educationScore)} paddingRight="0.7rem" />
            </div>
            <Grid container spacing={2} className={errors.education ? 'Mui-error' : ''}>
                <input type="hidden" {...register('education', {required: '请选择一个选项'})} />
                {options.map((option, index) => (
                    <Grid item xs={12} sm={6} md={6} key={`applicant-education-${index}`}>
                        <SelectionBtn
                            variant={selectedValue === String(index) ? 'contained' : 'outlined'}
                            onClick={() => {
                                handleChange(String(index))
                            }}
                            selected={selectedValue === String(index)}
                            fullWidth
                        >
                            {option}
                        </SelectionBtn>
                    </Grid>
                ))}
            </Grid>
            <br />
            {errors.education && <InputErrAlert error={errors.education.message} />}
        </Paper>
    )
}
export default Education
