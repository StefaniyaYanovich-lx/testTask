import styles from './MainGallery.module.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, { useState} from "react";
import {Switch} from "@material-ui/core";
import {FormControlLabel} from "@mui/material";
import {NewsItem} from "../NewsItem/NewsItem";
import {INewsData} from "../../types/types";


export const MainGallery = ({ newsData, title }  : {newsData: INewsData[]; title?: string;}) => {
    const [isGalleryView, setIsGalleryView] = useState(true);

    const handleChange = () => {
        setIsGalleryView(!isGalleryView);
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

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
            <div className={`${styles.container_filter} ${isGalleryView? styles.gallery : styles.list}`}>
                <div className={styles.container}>
                    {isGalleryView ?
                        <Carousel showDots={false} infinite={true} responsive={responsive}>
                            {newsData.map(item=>
                                <NewsItem item={item} isGalleryView={'gallery'}/>
                            )}
                        </Carousel>
                        :
                        newsData.map(item=>
                                <NewsItem item={item} isGalleryView={'list'}/>
                            )
                    }
                </div>
            </div>
        </>
    )
}