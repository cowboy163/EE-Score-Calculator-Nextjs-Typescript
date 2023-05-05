import {Button, styled} from '@mui/material'
import type {ButtonProps} from '@mui/material'

interface SelectionBtnProps extends ButtonProps {
    selected: boolean
}

const SelectionBtn = styled(Button)<SelectionBtnProps>(({theme, selected}) => ({
    borderRadius: '0.3rem',
    border: `2px solid ${selected ? theme.palette.primary.main : `rgba(0, 0, 0, 0.1)`}`,
    color: selected ? '#fff' : 'rgba(0, 0, 0, 0.3)',
    backgroundColor: selected ? theme.palette.primary.dark : 'transparent',
    '&:hover': {
        backgroundColor: selected ? theme.palette.primary.dark : 'rgba(0, 0, 0, 0.12)',
        border: `2px solid ${selected ? theme.palette.primary.main : `rgba(0, 0, 0, 0.2)`}`
    },
    '&.MuiButton-contained': {
        backgroundColor: '#2196f3',
        color: '#fff'
    }
}))

export default SelectionBtn
