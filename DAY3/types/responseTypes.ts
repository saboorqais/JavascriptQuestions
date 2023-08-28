export interface Id {
    id: number;
}

export interface Name {
    name: string;
}

export interface Comment extends Id, Name {
    postId: number;
    email: string;
    body: string;
}

export interface Post extends Id {
    userId: number;
    title: string;
    body: string;
}

export interface PostComment extends Post {
    comments: Comment[];
}

export interface UserDataPostObject extends UserDataObject {
    posts: Post[];
}

export interface UserDataObject extends Name, Id {
    username: string;
    email: string;
    address: AddressObject;
    phone: string;
    website: string;
    company: CompanyData;
}

type AddressObject = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoLocationObject;
};

type GeoLocationObject = {
    lat: string;
    lng: string;
};

export interface CompanyData extends Name {
    catchPhrase: string;
    bs: string;
}

export type DynamicStringObject = {
    [key: string]: string | DynamicStringObject;
};




