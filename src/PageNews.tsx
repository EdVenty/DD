import React from "react"
import NewsCard from "./NewsCard";
import NewsCardGrid from "./NewsCardGrid";
import { Box, Grid, ImageList, Rating, Typography } from '@mui/material';

const News = ({...props}) => {
    return <React.Fragment>
        <Box sx={{
            color: '#fff',
            justifyContent: 'space-around',
            padding: '1rem'
        }}>
            <Typography variant='h3'>
                Новости Дороги Добра
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={8}>
                <NewsCard/>
            </Grid>
            <Grid item xs={4}>
                <NewsCard/>
            </Grid>
            <Grid item xs={4}>
                <NewsCard/>
            </Grid>
            <Grid item xs={8}>
                <NewsCard/>
            </Grid>
            </Grid>
        </Box>
    </React.Fragment>
}

export default News;