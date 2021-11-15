import React, {useState, useEffect} from "react"
import {NewsCard} from "./NewsCard";
import { Box, Skeleton, Typography } from '@mui/material';
import { getNews, NewsFirestore } from "./fire";

const News = ({...props}) => {
    const [news, setNews] = useState<NewsFirestore[]>([]);
    useEffect(() => {
        if(news.length === 0)
            getNews()
                .then((newsRaw) => {
                    console.log(newsRaw);
                    setNews(newsRaw);
                });
    });
    return <React.Fragment>
        <Box sx={{
            color: '#fff',
            justifyContent: 'space-around',
            padding: '1rem'
        }}>
            <Typography variant='h3'>
                Новости Дороги Добра
            </Typography>
            {news.length > 0 ? 
            <div className="news-grid">
                {news.map((newsOne) => 
                    <NewsCard content={newsOne.content} media={newsOne.headerImage} timestamp={'Опубликовано ' + newsOne.timestamp?.toDate().toLocaleDateString()} title={newsOne.title} newsId={newsOne.newsId} key={newsOne.newsId!}/>)
                }
            </div>
            :
            <div className="news-grid">
                <Skeleton variant="rectangular" width={275} height={433}/>
                <Skeleton variant="rectangular" width={275} height={433}/>
                <Skeleton variant="rectangular" width={275} height={433}/>
            </div>
            }
            
        </Box>
    </React.Fragment>
}

export default News;