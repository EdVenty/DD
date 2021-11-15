import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Skeleton, Typography } from '@mui/material';
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { addLikeToNews, AuthContext, getLikesFromNews, removeLikeFromNews } from "./fire";
import useGlobalAuthNeeded from "./useAuthNeededProvider";

interface ICardProps{
    title?: string,
    media?: string,
    content?: string,
    timestamp?: string,
    newsId?: string
}
export const NewsCard = ({title, media, content, timestamp, newsId, ...props}: ICardProps) => {
    const { auth } = useContext(AuthContext); 
    const [ likesLoaded, setLikesLoaded ] = useState(false);
    const [ likeGot, setLikeGot ] = useState(false);
    const [ authNeeded, setAuthNeeded ] = useGlobalAuthNeeded();
    useEffect(() => {
        if(!likesLoaded){
            if(auth.currentUser){
                getLikesFromNews(auth.currentUser!, newsId!)
                    .then((value) => {
                        for(let like of value){
                            console.log(like);
                            if(like.uid === auth.currentUser!.uid){
                                setLikeGot(true);
                                console.log(`User has like on post #${newsId}`);
                                break;
                            }
                        }
                        setLikesLoaded(true);
                    });
            }
            else{
                setLikesLoaded(true);
            }
        }
    }, [setLikesLoaded, setLikeGot, auth, likesLoaded, newsId]);
    return <Card sx={{ minWidth: 150 }}>
            <CardHeader
                // avatar={
                //     <Avatar src='https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'/>
                // }
                title={title}
                subheader={timestamp}
            />
            <CardMedia
                component="img"
                height="194"
                image={media}
                alt={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                {likesLoaded ?
                <React.Fragment>
                <Checkbox
                    icon={<FavoriteBorder/>}
                    checkedIcon={<Favorite/>}
                    checked={likeGot}
                    onClick={(event) => {
                        if (auth.currentUser){
                            console.log(likeGot);
                            if(!likeGot){
                                setLikeGot(true);
                                addLikeToNews(auth.currentUser!, newsId!);
                                console.log(`Like added to news #${newsId}`);
                            }
                            else{
                                setLikeGot(false);
                                removeLikeFromNews(auth.currentUser!, newsId!);
                                console.log(`Like removed from news #${newsId}`);
                            }
                        }
                        else{
                            setAuthNeeded(true);
                        }
                    }}  
                />
                <Button size="small" sx={{marginLeft: 'auto'}}>Читать далее</Button>
                </React.Fragment>
                :
                <Skeleton variant='rectangular' width={200} height={20}/>
                }
                {/* <IconButton sx={{marginLeft: 'auto'}}>
                    <ReadMoreIcon/>
                </IconButton> */}
            </CardActions>
        </Card>
}

// export default function NewsCard(){
//     return <Box sx={{ minWidth: 275, maxWidth: 'unset', marginLeft: '0.5rem' }}>
//         <Card>{card}</Card>
//     </Box>
// }