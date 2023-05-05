import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'

interface CustomDialogProps {
    control: boolean
    content: string
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const CustomDialog: React.FC<CustomDialogProps> = ({control, content, handleClose}) => {
    return (
        <Dialog open={control} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{'信息'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    确认
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default CustomDialog
