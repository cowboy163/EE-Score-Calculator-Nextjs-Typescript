import React from 'react'
import type {InputProps} from '@mui/material'
import {InputAdornment, TextField} from '@mui/material'

interface CustomTextFieldProps {
    name: string
    value?: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    inputAdornment?: React.ReactNode
    error?: boolean
    helperText?: string | undefined
    customInputProps?: InputProps
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    name,
    value,
    handleChange,
    placeholder,
    inputAdornment,
    error,
    helperText,
    customInputProps
}) => {
    return (
        <TextField
            name={name}
            hiddenLabel={true}
            type="text"
            value={value}
            onChange={handleChange}
            InputProps={{
                style: {
                    background: '#f5f5f5',
                    height: '2.2rem',
                    borderRadius: '0.3rem'
                },
                endAdornment: <InputAdornment position="end">{inputAdornment && inputAdornment}</InputAdornment>,
                ...customInputProps
            }}
            placeholder={placeholder}
            fullWidth={true}
            margin="dense"
            error={error ?? false}
            helperText={helperText && helperText}
        />
    )
}
export default CustomTextField
