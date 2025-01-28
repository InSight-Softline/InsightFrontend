import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/system";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export function BaseDialog({children, actions, title, onClose, open}) {
    return (
        <BootstrapDialog
            data-cy="base-dialog"
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title" data-cy="base-dialog-title">
                {title}
            </DialogTitle>
            <IconButton
                aria-label="close"
                data-cy="base-dialog-close-button"
                onClick={onClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon/>
            </IconButton>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </BootstrapDialog>

    )
}