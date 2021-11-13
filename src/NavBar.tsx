import { AppBar, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, SwipeableDrawer, Toolbar, Typography , Avatar} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Account from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import ReceiptIcon from '@mui/icons-material/Receipt';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {NavigateFunction, useNavigate, useLocation, Location} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { AuthContext } from './fire';
import { logIn, logOut } from './PageAccount';


interface IProps{
    setDrawerWidthCallback: React.Dispatch<React.SetStateAction<string>>,
    navigate?: NavigateFunction,
    location?: Location
};
interface IState{
    accountMenuOpen: boolean,
    accountCircleAnchor: null | HTMLElement,
    drawerOpen: boolean,
    drawerWidthPx: number
};
const MyAppBar = styled(AppBar)({
    backgroundColor: '#fff',
    color: '#000',
    transition: 'margin-left 0.3s'
});

function getLocName(path: string){
    switch(path){
        case "/":
            return "Главная";
        case '/news':
            return 'Новости';
        case '/gallery':
            return "Галерея"
        case '/account':
            return 'Аккаунт';
    }
}

class NavBar extends React.PureComponent<IProps, IState>{
    static contextType = AuthContext;
    constructor(props: IProps){
        super(props);
        this.state = {
            accountMenuOpen: false,
            drawerOpen: false,
            accountCircleAnchor: null,
            drawerWidthPx: 55
        }
        this.handleAccountClick = this.handleAccountClick.bind(this);
        this.handleAccountClose = this.handleAccountClose.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }
    handleDrawerToggle(){
        this.props.setDrawerWidthCallback((this.state.drawerOpen ? 55 : 240)+ 'px');
        this.setState({
            drawerOpen: !this.state.drawerOpen,
            drawerWidthPx: (this.state.drawerOpen ? 55 : 240)
        });
    }
    handleAccountClick(event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>){
        this.setState({
            accountCircleAnchor: event.currentTarget,
            accountMenuOpen: true
        });
    }
    handleAccountClose(){
        this.setState({
            accountCircleAnchor: null,
            accountMenuOpen: false
        });
    }
    render(){
        return <Box sx={{ flexGrow: 1 }}>
            <MyAppBar position="static" className='root' sx={{
                marginLeft: this.state.drawerWidthPx + 'px'
            }}>
                <Toolbar>
                    <Stack spacing={2} direction='row'>
                        <Typography variant="h6">
                            Дорога добра
                        </Typography>
                        <Divider orientation="vertical" flexItem variant='middle'/>
                        <Typography variant="h6">
                            {getLocName(this.props.location!.pathname)}
                        </Typography>
                    </Stack>
                </Toolbar>
            </MyAppBar>
            <SwipeableDrawer
                open={this.state.drawerOpen}
                onClose={this.handleDrawerToggle}
                onOpen={this.handleDrawerToggle}
                variant="permanent"
                sx={{
                    flexShrink: 0,
                    ...({
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: this.state.drawerWidthPx + 'px',
                            transition: 'width 0.3s'
                        }
                    })
                }}
            >
                <List>
                    <ListItem button onClick={() => this.props.navigate!('/')}>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Главная'} />
                    </ListItem>
                    <ListItem button onClick={() => this.props.navigate!('/news')}>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Новости'} />
                    </ListItem>
                    <ListItem button onClick={() => this.props.navigate!('/gallery')}>
                        <ListItemIcon>
                            <PhotoAlbumIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Галерея'} />
                    </ListItem>
                    <ListItem button onClick={a => this.handleDrawerToggle()}>
                        <ListItemIcon>
                            <KeyboardArrowRightIcon sx={{
                                transform: this.state.drawerOpen ? 'rotate(0.5turn)' : 'inherit',
                                transition: 'transform 0.3s'
                            }}/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem sx={{
                        position: 'fixed',
                        bottom: '0px'
                    }}>
                        {/* {this.context.auth.currentUser !== null ? 
                        <Avatar src={this.context.auth.currentUser?.photoURL} onClick={this.handleAccountClick}
                            sx={{
                                padding: '0px'
                            }}
                        />
                        : */}
                        <IconButton 
                            sx={{
                                padding: '0px'
                            }}
                            onClick={this.handleAccountClick}>
                            <Account/>
                        </IconButton>
                        {/* } */}
                        
                    </ListItem>
                    
                <Menu
                    id="basic-menu"
                    open={this.state.accountMenuOpen}
                    onClose={this.handleAccountClose}
                    anchorEl={this.state.accountCircleAnchor}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {
                        this.handleAccountClose();
                        this.props.navigate!("/account");
                    }}>Ваш аккаунт</MenuItem>
                    {this.context.auth.currentUser !== null ? 
                    <React.Fragment>
                        <MenuItem onClick={() => {
                            logOut(this.context.auth);
                            this.handleAccountClose();
                        }}>Выйти</MenuItem>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <MenuItem onClick={() => {
                            logIn(this.context.auth, this.context.provider);
                            this.handleAccountClose();
                        }}>Войти</MenuItem>
                    </React.Fragment>
                    }
                </Menu>
                </List>
            </SwipeableDrawer>
        </Box>;
    }
}

function WithNavigate(props: IProps) {
    let navigate = useNavigate();
    let location = useLocation();
    return <NavBar {...props} navigate={navigate} location={location} />
}

export default WithNavigate;
