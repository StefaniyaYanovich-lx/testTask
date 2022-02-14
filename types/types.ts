export interface IHeaderData {
    ttile?: string
    logo: {
        title: string;
        url: string;
        fields?: {file:{url: string;}; title: string};
    },
    searchLabel?: string;
    menuLabel: string
};

export interface INewsData {
    imageUrl: string;
    topics: string[];
    name: string;
    description: string;
    organization: string[];
    publicationDate: string;
    slug: string;
};


export interface INewsDataResponse {
    description: string;
    imageUrl: string;
    name: string;
    objectID: string;
    organization: [
        {
            fields: {
                name: string;
                reviewStatus: string;
                slug: string;
            }
        }
        ];
    publicationDate: string;
    slug: string;
    topics: [{
        id: string;
        title: string;
    }]
}