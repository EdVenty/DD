import { Checkbox, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function ImageListed(){
    return <ImageListItem>
        <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'/>
        <ImageListItemBar
            title="Sunset"
            position="top"
            actionIcon={
                <Checkbox
                    icon={<StarBorderIcon sx={{color: '#fff'}}/>}
                    checkedIcon={<StarIcon sx={{color: '#fff'}}/>}
                />
            }
            actionPosition="left"
        />
    </ImageListItem>
}