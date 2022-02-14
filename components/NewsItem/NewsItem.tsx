import styles from "../MainGallery/MainGallery.module.css";
import React from "react";
import {INewsData} from "../../types/types";
import Link from 'next/link'

export const NewsItem = ({item, isGalleryView} : {item: INewsData, isGalleryView: string}) =>{
    //ref to use materialUi card component
        return (
            <article className={`${styles.card_container} ${styles[isGalleryView]}`} key={item.name}>
                {/*using next js Image is preferable, but here there are too many domains*/}
                <img className={`${styles.card_image} ${styles[isGalleryView]}`} src={item.imageUrl} alt="image"/>
                <div className={`${styles.card_info} ${styles[isGalleryView]}`}>
                {item.topics.map(topic => <span className={styles.sub_info}>{topic}</span>)}
                <Link href={`news/${item.slug}`}>
                    <a>
                        <h2>{item.name}</h2>
                    </a>
                </Link>
                {isGalleryView === 'list' && <h4 className={styles.description}>{item.description}</h4>}
                <div className={styles.card_footer}>
                    <time dateTime={item.publicationDate}>{item.publicationDate}</time>
                    {item.organization.map(org=> <span className={styles.sub_info}>{org}</span>)}
                </div>
                </div>
            </article>
        )
}