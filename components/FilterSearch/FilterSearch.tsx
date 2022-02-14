import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
import styles from "../FilterSearch/FilterSearch.module.css";
import React, {Dispatch, SetStateAction, useState} from "react";
import clientNews from "../../lib/algoliaService";
import {mapNewsItem} from "../../utils/utils";
import {INewsData, INewsDataResponse} from "../../types/types";


export const FilterSearch = ({setFilteredNews, view, searchLabel}: {setFilteredNews: Dispatch<SetStateAction<INewsData[]>>; view: string, searchLabel?:string;}) => {
    const [query, setQuery] = useState('');

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const getFilteredNews = async () =>{
        //TODO: remove data fetching to utils or use react query
        const { hits } = await clientNews.initIndex('news').search("", {
            filters: `topics.title:${query}`,
        })
        const mappedHits = hits.map((i)=>mapNewsItem(i as INewsDataResponse))
        setFilteredNews(mappedHits)
    }


//TODO: styles to be adjusted
    return (
        <div className={`${styles.filter_container} ${styles[view]}`}>
            {view === 'list' && <span>{searchLabel}</span>}
            <TextField
                label={"Search"}
                onInput={handleInput}
                value={query}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={getFilteredNews} disabled={!query}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

