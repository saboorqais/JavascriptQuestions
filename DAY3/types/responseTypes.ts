export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface UserDataObject  {
    id: number,
    name: string
    username: string,
    email: string,
    address: AddressObject,
    phone: string,
    website: string,
    company: CompanyData}

type AddressObject = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: GeoLocationObject
  }

type GeoLocationObject = {
    lat:string,
    lng: string
  }
  type CompanyData = {
    name: string,
    catchPhrase: string,
    bs: string
}
