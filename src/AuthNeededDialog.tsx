import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalAuthNeeded from "./useAuthNeededProvider";


export const AuthNeededDialog = ({...props}) => {
    const [ needAuth, setNeedAuth ] = useGlobalAuthNeeded();
    let navigate = useNavigate();
    return <Dialog
        open={needAuth}
        onClose={() => setNeedAuth(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
        {"Вы не зарегистрированы"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Вы должны зарегестрироваться, чтобы оставлять лайки.
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setNeedAuth(false)}>Отмена</Button>
        <Button onClick={() => {
            setNeedAuth(false);
            navigate('/DD/account');
        }} autoFocus>
            Регистрация
        </Button>
        </DialogActions>
    </Dialog>
}