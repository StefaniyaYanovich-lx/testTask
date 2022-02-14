import {INewsData, INewsDataResponse} from "../types/types";

export const mapNewsItem = (item: INewsDataResponse): INewsData => {
    return {
        ...item,
        publicationDate: new Date(item.publicationDate).toLocaleDateString(),
        topics: item.topics.map(t=> t.title),
        organization: item.organization.map(o=> o.fields.name)
    }
}