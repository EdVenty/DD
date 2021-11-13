import React, { useContext, useState } from "react"
import NewsCard from "./NewsCard";
import NewsCardGrid from "./NewsCardGrid";
import { Box, Button, ImageList, Rating, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./fire";
import { onAuthStateChanged, User, browserLocalPersistence, setPersistence, signInWithPopup, GoogleAuthProvider, signOut } from "@firebase/auth";

export const logIn = (auth: any, provider: any) => {
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            const user = result.user;
            // setUser(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    })
}

export const logOut = (auth: any) => {
    signOut(auth).then(() => {}).catch((error) => {
        console.warn("Unable to sign out!");
    }); 
}

const Authorized = ({...props}) => {
    const { auth, provider } = useContext(AuthContext); 
    return <React.Fragment>
        <Typography variant="body1">
            Имя: {auth.currentUser?.displayName}
        </Typography>
        <Button variant="contained" color="warning" onClick={() => {
            logOut(auth);
        }}>
            Выйти
        </Button>
    </React.Fragment>
}
const NotAuthorized = ({...props}) => {
    const { auth, provider } = useContext(AuthContext); 
    return <React.Fragment>
        <Typography variant="body1">
            Войдите в Google аккаунт, чтобы продолжить
        </Typography>
        <Button variant="contained" onClick={() => {
            logIn(auth, provider);
        }}>
            Войти
        </Button>
    </React.Fragment>
}
const Account = ({...props}) => {
    const { auth, provider } = useContext(AuthContext); 
    const [user, setUser] = useState(auth.currentUser);
    onAuthStateChanged(auth, (user: User | null) => {
        setUser(user);
    });
    return <React.Fragment>
        <Box sx={{padding: '1rem', color: '#fff'}}>
            <Typography variant="h3">
                Ваш аккаунт
            </Typography>
            {user ? <Authorized/> : <NotAuthorized/>}
        </Box>
    </React.Fragment>
}

export default Account;