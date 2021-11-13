import { Grid } from "@mui/material";
import React from "react";
import './newsCardGrid.css';

export default function NewsCardGrid({
    ...props
}){
    return <div className="news-card-grid">
        {props.children}
    </div>
}