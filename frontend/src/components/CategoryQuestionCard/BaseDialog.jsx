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
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle
                sx={{
                    p: 2,
                    width: '600px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                id="customized-dialog-title"
            >
                {title}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'secondary',
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