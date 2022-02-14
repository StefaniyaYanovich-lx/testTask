import styles from './MainGallery.module.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, {useEffect, useState} from "react";
import {Switch} from "@material-ui/core";
import {FormControlLabel} from "@mui/material";
import {NewsItem} from "../NewsItem/NewsItem";
import {INewsData} from "../../types/types";
import {FilterSearch} from "../FilterSearch/FilterSearch";
import {configCarousel} from "../../utils/utils";


export const MainGallery = ({ newsData, title }  : {newsData: INewsData[]; title?: string;}) => {
    const [isGalleryView, setIsGalleryView] = useState(true);
    const [view, setView] = useState('gallery');
    const [news, setNews] = useState<INewsData[]>(newsData);
    const [filteredNews, setFilteredNews] = useState<INewsData[]>([]);

    const handleChange = () => {
        setIsGalleryView(!isGalleryView);
    }

    useEffect(()=>{
        setView(isGalleryView? 'gallery' : 'list')
    }, [isGalleryView])

    useEffect(()=>{
        if(filteredNews.length) setNews(filteredNews);
    }, [filteredNews])

    return (
        <>
            <h1 className={styles.header}>{title}</h1>
            <FormControlLabel control={
                <Switch
                    checked={isGalleryView}
                    onChange={handleChange}
                    color={"primary"}
                />}
                 label="Gallery" />
            <div className={`${styles.container_filter} ${styles[view]}`}>
                <FilterSearch view={view} setFilteredNews={setFilteredNews}/>
                <div className={`${styles.container} ${styles[view]}`}>
                    {isGalleryView ?
                        <Carousel showDots={false} infinite={true} responsive={configCarousel()}>
                            {news.map(item=>
                                <NewsItem key={item.slug} item={item} isGalleryView={'gallery'}/>
                            )}
                        </Carousel>
                        :
                        news.map(item=>
                                <NewsItem key={item.slug} item={item} isGalleryView={'list'}/>
                            )
                    }
                </div>
            </div>
        </>
    )
}