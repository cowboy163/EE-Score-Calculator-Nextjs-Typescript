import type {ButtonProps} from '@mui/material'
import {Button} from '@mui/material'
import React from 'react'

interface StepBtnProps {
    buttonType?: ButtonProps['type']
    onClick?: ButtonProps['onClick']
    children: React.ReactNode
    disabled?: boolean
}

const StepBtn: React.FC<StepBtnProps> = ({buttonType, onClick, children, disabled}) => {
    return (
        <Button
            variant="contained"
            type={buttonType}
            onClick={onClick ?? (() => {})}
            fullWidth={true}
            disabled={disabled ?? false}
        >
            {children}
        </Button>
    )
}

export default StepBtn
