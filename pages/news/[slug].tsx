import {useRouter} from "next/router";
import client from "../../lib/algoliaService";
import {mapNewsItem} from "../../utils/utils";
import {INewsDataResponse} from "../../types/types";
import styles from "../../components/MainGallery/MainGallery.module.css";
import React from "react";


const NewsPage = ({hits} : { hits:INewsDataResponse }) => {
    const router = useRouter();
    return (
        <article className={`${styles.card_container} ${styles.news}`} key={hits.name}>
            <h2>{hits.name}</h2>
            <img className={`${styles.card_image} ${styles.gallery}`} src={hits.imageUrl} alt="image"/>
            <div className={`${styles.card_info}`}>
                {hits.topics.map(topic => <span className={styles.sub_info}>{topic}</span>)}
                <h4 className={styles.description}>{hits.description}</h4>
                <div className={styles.card_footer}>
                    <time dateTime={hits.publicationDate}>{hits.publicationDate}</time>
                    {hits.organization.map(org=> <span className={styles.sub_info}>{org}</span>)}
                </div>
            </div>
        </article>
    )
}

export const getServerSideProps = async ({params:{slug}}: { params: { slug: string }}) => {
    const { hits } = await client.initIndex('news').search("", {
           filters:`slug:${slug}`,
            attributesToRetrieve: [
                "slug",
                "imageUrl",
                "topics",
                "name",
                "description",
                "organization",
                "publicationDate",
            ],
        })
    return {props:{hits: mapNewsItem(hits[0] as INewsDataResponse)}}
}

export default NewsPage;
