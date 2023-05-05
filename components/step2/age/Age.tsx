import {InputLabel, Paper} from '@mui/material'
import CustomTextField from '../../../utils/CustomTextField'
import type {DeepMap, DeepRequired, FieldError, FieldValues, UseFormRegister} from 'react-hook-form'
import type {FormValues} from '../Step2'
import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../../../../../src/store/hooks'
import {changeAge} from '../../../../../../src/store/step2Slice'
import useTotalScore from '../../../utils/useTotalScore'
import ScorePad from '../../scorePad/ScorePad'

interface AgeProps {
    register: UseFormRegister<FormValues>
    errors: DeepMap<DeepRequired<FieldValues>, FieldError> & {
        root?: Record<string, DeepMap<DeepRequired<FieldValues>, FieldError>>
    }
}

const Age: React.FC<AgeProps> = ({register, errors}) => {
    const dispatch = useAppDispatch()
    const value: string = useAppSelector(state => state.step2Slice.age)

    const handleChange = (value: string) => {
        dispatch(changeAge(value))
    }

    // age score
    const calculateScore = useTotalScore()
    const ageScore: number = useAppSelector(state => state.scoreSlice.ageScore)
    useEffect(() => {
        calculateScore()
    }, [value])

    return (
        <Paper elevation={3} style={{padding: '1rem', margin: '1rem 0'}}>
            <InputLabel style={{color: '#1975d1'}}>年龄</InputLabel>
            <CustomTextField
                name="age"
                value={value}
                handleChange={evt => {
                    handleChange(evt.target.value)
                }}
                placeholder="请输入您的年龄"
                error={!!errors.age}
                helperText={errors.age?.message || ''}
                customInputProps={{
                    inputProps: {...register('age', {required: '年龄不能为空'})}
                }}
                inputAdornment={<ScorePad text={String(ageScore)} paddingRight="0" paddingTop={true} />}
            />
        </Paper>
    )
}
export default Age
