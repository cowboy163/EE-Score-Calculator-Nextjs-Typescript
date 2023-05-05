import getEmptyArray from '../../utils/getEmptyArray'
import {Step, StepLabel, Stepper} from '@mui/material'
import React from 'react'

interface CustomStepperProps {
    numOfStep: number
    activeStep: number
}

const CustomStepper: React.FC<CustomStepperProps> = ({numOfStep, activeStep}) => {
    return (
        <Stepper activeStep={activeStep}>
            {getEmptyArray(numOfStep).map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}
export default CustomStepper
