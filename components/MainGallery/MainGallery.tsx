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


export const MainGallery = ({ newsData, title, searchLabel }  : {newsData: INewsData[]; title?: string; searchLabel: string;}) => {
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
                <FilterSearch view={view} setFilteredNews={setFilteredNews} searchLabel={searchLabel}/>
                <div className={`${styles.container} ${styles[view]}`}>
                    {isGalleryView ?
                        <Carousel showDots={false} keyBoardControl={true} infinite={true} responsive={configCarousel()}>
                            {news.map(item=>
                                <NewsItem key={item.slug} item={item} isGalleryView={'gallery'}/>
                            )}
                        </Carousel>
                        :
                        <div className={styles.list_results}
                        ><p className={styles.list_results_header}>{`${news.length} Resources found`}</p>
                            {news.map(item=>
                                <NewsItem key={item.slug} item={item} isGalleryView={'list'}/>
                            )}
                        </div>
                    }
                </div>
            </div>
        </>
    )
}