import Head from "next/head";
import styles from "../styles/Home.module.css";
import client from "../lib/contentfulService";
import clientNews from "../lib/algoliaService";
import {Header} from "../components/Header/Header";
import {IHeaderData, INewsData, INewsDataResponse} from "../types/types";
import {mapNewsItem} from "../utils/utils";
import {MainGallery} from "../components/MainGallery/MainGallery";

const Home = ({headerData, newsData}: { headerData: IHeaderData; newsData: INewsData[] }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header {...headerData}/>
            <MainGallery newsData={newsData} title={headerData.ttile} searchLabel={headerData.searchLabel}/>
        </div>
    );
};

export const getStaticProps = async () => {
    //TODO: refactor (create const, move to utils)
    const { items } = await client.getEntries();
    const field =  (items[0].fields as IHeaderData);
    const { hits } = await clientNews.initIndex('news').search("", {
        attributesToRetrieve: [
            "slug",
            "imageUrl",
            "topics",
            "name",
            "description",
            "organization",
            "publicationDate",
        ],
    });
    const headerData =  {
        ttile: field.ttile,
        searchLabel: field.searchLabel,
        menuLabel: field.menuLabel,
        logo: {
            url: field.logo.fields?.file.url,
            title: field.logo.fields?.title
        },
    }
    const newsData = hits.map((i)=>mapNewsItem(i as INewsDataResponse));
    return {
        props: {
            headerData,
            newsData
        }
    }
}


export default Home;
