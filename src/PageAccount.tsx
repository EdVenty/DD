import React, { useContext, useState } from "react"
import { Box, Button, Typography, Skeleton, Avatar, Stack, TextField, Snackbar, Alert } from '@mui/material';
import { AuthContext, getUserInFirestore, onUserInFirestoreUpdate, setUserInFirestore, UserFirestore } from "./fire";
import { onAuthStateChanged, User, browserLocalPersistence, setPersistence, signInWithPopup, signOut } from "@firebase/auth";
import { Unsubscribe } from "firebase/firestore";

export const logIn = (auth: any, provider: any) => {
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
        signInWithPopup(auth, provider)
        .then((result) => {
            console.log("User loggined in.");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    })
}

export const logOut = (auth: any) => {
    signOut(auth).then(() => {}).catch((error) => {
        console.warn("Unable to sign out!");
    }); 
}

const AuthorizedLoaded = ({userFirestore, ...props}: {userFirestore?: UserFirestore}) => {
    const { auth } = useContext(AuthContext);
    const [user] = useState(userFirestore!);
    const [snackOpen, setOpenSnack] = useState(false);
    return <React.Fragment>
        <Box sx={{
            backgroundColor: '#fff',
            padding: '2rem',
            color: "#000"
        }}>
            <Stack spacing='1rem'>
                <Avatar variant="square" src={user?.photoURL} sx={{
                    width: '200px',
                    height: '200px'
                }}/>
                <TextField id="standard-basic" label="Полное имя" variant="standard" defaultValue={user?.displayName} onChange={
                        (event) => user.displayName=event.target.value
                    }/>
                <Button variant="contained" color="primary" onClick={(() => {
                    setUserInFirestore(auth.currentUser!, user);
                    setOpenSnack(true);
                })}>
                    Сохранить
                </Button>
                <Button variant="contained" color="warning" onClick={() => {
                    logOut(auth);
                }}>
                    Выйти
                </Button>
            </Stack>
        </Box>
        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
            <Alert severity="success" onClose={() => setOpenSnack(false)} variant="filled">
                Данные аккаунта сохранены!
            </Alert>
        </Snackbar>
    </React.Fragment>
}

const AuthorizedLoading = ({...props}) => {
    return <React.Fragment>
        <Box sx={{
            backgroundColor: '#fff',
            padding: '2rem'
        }}>
            <Stack spacing='1rem'>
                <Skeleton variant="rectangular" width={200} height={200} />
                <Skeleton variant="text" />
                <Skeleton variant="rectangular" height={36.5} />
                <Skeleton variant="rectangular" height={36.5} />
            </Stack>
        </Box>
        
    </React.Fragment>
}

const Authorized = ({userFirestore, userLoaded, ...props}: {userFirestore?: UserFirestore, userLoaded: boolean}) => { 
    return <React.Fragment>
        {userLoaded ? <AuthorizedLoaded userFirestore={userFirestore}/> : <AuthorizedLoading/>}
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
    const { auth } = useContext(AuthContext); 
    const [user, setUser] = useState(auth.currentUser);
    const [userFirestore, setUserFirestore] = useState<UserFirestore | undefined>({});
    const [userFirestoreLoaded, setUserFirestoreLoaded] = useState(false);
    const [listener, setListener] = useState<Unsubscribe | undefined>(undefined);
    React.useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            if(user){
                if(listener === undefined){
                    setListener(
                        onUserInFirestoreUpdate(user, (userFirestore) => {
                            setUserFirestore(userFirestore);
                            setUserFirestoreLoaded(true);
                        })
                    );
                    getUserInFirestore(user)
                    .then(value => {
                        if (!value.userExists){
                            setUserInFirestore(user, {
                                displayName: user?.displayName?.toString(),
                                photoURL: user?.photoURL?.toString()
                            }).then(() => {
                                setUser(user);
                            });
                        }
                        else{
                            setUser(user);
                            setUserFirestore(value.userFirestore);
                            setUserFirestoreLoaded(true);
                        }
                    });
                }
            }
            else{
                setUser(user);
                setUserFirestoreLoaded(false);
                if (listener)
                    listener!();
            }
        });
    }, [listener, auth]);
    return <React.Fragment>
        <Box sx={{padding: '1rem', color: '#fff'}}>
            <Stack spacing='1.5rem'>
                <Typography variant="h3">
                    Ваш аккаунт Дороги Добра
                </Typography>
                {user ? <Authorized userFirestore={userFirestore} userLoaded={userFirestoreLoaded}/> : <NotAuthorized/>}
            </Stack>
        </Box>
    </React.Fragment>
}

export default Account;