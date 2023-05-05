import {Alert, AlertTitle} from '@mui/material'
import React, {useEffect, useState} from 'react'
import type {FieldError, FieldErrorsImpl, Merge} from 'react-hook-form'

interface InputErrAlertProps {
    error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const InputErrAlert: React.FC<InputErrAlertProps> = ({error}) => {
    const [text, setText] = useState('')
    useEffect(() => {
        if (typeof error === 'string') {
            setText(error)
        }
    }, [error])

    return (
        <Alert severity="error">
            <AlertTitle>{text}</AlertTitle>
        </Alert>
    )
}
export default InputErrAlert
