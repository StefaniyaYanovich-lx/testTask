import {INewsData, INewsDataResponse} from "../types/types";

export const mapNewsItem = (item: INewsDataResponse): INewsData => {
    return {
        ...item,
        publicationDate: new Date(item.publicationDate).toLocaleDateString(),
        topics: item.topics.map(t=> t.title),
        organization: item.organization.map(o=> o.fields.name)
    }
}

export const configCarousel = () => {
    return {
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
}