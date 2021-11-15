import React from "react"
import {NewsCard} from "./NewsCard";
import NewsCardGrid from "./NewsCardGrid";
import { Box, Button, ImageList, Rating, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Main = ({...props}) => {
    let navigate = useNavigate();
    return <React.Fragment>
        <Box sx={{margin: '2rem', color: '#fff'}}>
            <Typography variant="h3">
            Новости
            </Typography>
            <Typography variant='subtitle1'>
            Смотрите наши последние новости
            </Typography>
            <Button onClick={() => navigate('/DD/news')} variant="contained">
                Все новости
            </Button>
        </Box>
        <NewsCardGrid>
        </NewsCardGrid>
    </React.Fragment>
}

export default Main;