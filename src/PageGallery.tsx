import React from "react"
import { Box, Grid, ImageList, Rating, Typography } from '@mui/material';
import ImageListed from './ImageListed';

const Gallery = ({...props}) => {
    return <React.Fragment>
        <Box sx={{
            color: '#fff',
            justifyContent: 'space-around',
            padding: '1rem'
        }}>
            <ImageListed/>
        </Box>
    </React.Fragment>
}

export default Gallery;